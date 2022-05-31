const axios = require("axios");
const { parse } = require("graphql/language/parser");
class RedisCache {

    
    constructor(redisClient, expiration = 3600) {
        this.redisClient = redisClient
        this.expiration = expiration

    }
       // method to cache response of graphql query
      cacheResponse = async (req, res, next)  => {
        let result
        const headers = {
            "content-type": "application/json",
            "Authorization": "<token>"
        };

        const parsed = this.queryParser(req.body.query)
        if(parsed.operationType === "mutation") {
         await this.checkMutation(parsed)
        }
        let query = {query: req.body.query}
        let cacheResponseBoolean = await this.redisClient.exists(JSON.stringify(query))
        
        // if true  pull from redis layer
        if(cacheResponseBoolean) {
         console.log("CACHE HIT")
          result = await this.redisClient.get(JSON.stringify(query))
          res.locals.result = result
          res.locals.operationType = parsed.operationType
          return next()
              //if false query database and set in cache
        } else {
            console.log("CACHE MISS")
            //make fetch request to /graphql
            result = await axios({
                url:'http://localhost:3000/graphql',
                method: 'post',
                headers : headers,
                data: query})
              // const norm = this.normalize(result.data)
            // set redis layer 
            
            //if mutation do not run redisClient.set or redisClient.expire
              //parse mutation
              // parse all keys in redis layer
              //remove matching mutation/query pairs
            if(parsed.operationType == "query") {
              // console.log("queryhere", this.normalize(query))
              let norm = this.normalize(result.data)
              // console.log("norm", norm)
              const key = `${parsed.schemaType}.${Object.keys(parsed.args)[0]}.${Object.values(parsed.args)[0]}`
              // console.log(key)
              // console.log(norm)
              // let unnorm = this.denormalize(norm)
              // console.log("unnorm", unnorm)
              

            // this.redisClient.set(JSON.stringify(query), JSON.stringify(result.data))
            // this.redisClient.expire(JSON.stringify(query), this.expiration)
            }
            res.locals.result = JSON.stringify(result.data)
            res.locals.operationType = parsed.operationType
            // send back
            return next()
        }
    }

     queryParser = (queryString) => {
        const argsObject = {} 
        let parsedQuery = parse(queryString)
        const operationType = parsedQuery['definitions'][0].operation
        const args = parsedQuery["definitions"][0].selectionSet.selections[0].arguments
        args.forEach(el => {
            argsObject[el.name.value] = el.value.value
        })
         const schemaType = parsedQuery["definitions"][0].selectionSet.selections[0].name.value
         const fields =  parsedQuery["definitions"][0].selectionSet.selections[0].selectionSet.selections
         const fieldNames = []
        fields.forEach(field => {fieldNames.push(field.name.value)})
        console.log({"schemaType": schemaType, "args": argsObject, "operationType": operationType, fieldNames: fieldNames})
         return {"schemaType": schemaType, "args": argsObject, "operationType": operationType, fieldNames: fieldNames}     
    }



     normalize(object) {
        return Object.assign(
          {},
          ...(function flattener(objectBit, path = "") {
            return [].concat(
              ...Object.keys(objectBit).map(key => {
                // console.log(objectBit)
                return typeof objectBit[key] === "object" && objectBit[key] !== null
                  ? flattener(objectBit[key], `${path}.${key}`)
                  : { [`${path}.${key}`]: objectBit[key] };
              })
            );
          })(object)
        );
      }

       denormalize = (pathsObject) => {
        const payload = {};
        for (let key in pathsObject) {
          let workingObj = payload;
          let path = key.split('.');
          for (let i = 1; i < path.length; i += 1) {
            const e = path[i];
            // if we're at the end of the array, we can do the value assignment! yay!!
            if (i === path.length - 1) workingObj[e] = pathsObject[key];
            // only construct a sub-object if one doesn't exist with that name yet
            if (!workingObj[e]) {
              // if the item following this one in path array is a number, this nested object must be an array
              if (Number(path[i + 1]) || Number(path[i + 1]) === 0) {
                workingObj[e] = [];
              }
              else workingObj[e] = {};
            }
            // dive further into the object
            workingObj = workingObj[e];
          }
        }
        return payload;
      }

    


    checkMutation = async (mutationObj) => {
        const allRedisKeys = await this.redisClient.keys('*')
        let gqlParsed
        let matchingKey = false
        let counter = 0
        let matchingKeysArray = []
        const argsArray = []
        allRedisKeys.forEach(el => {
            el = JSON.parse(el)
            gqlParsed = this.queryParser(el.query)
            argsArray.push(gqlParsed.args)
        })
        const mutationArgs = mutationObj.args
        // loop over argsArray
        for(let i = 0; i < argsArray.length; i++) {
            const cachedKeyObject = argsArray[i]
            console.log(cachedKeyObject)
          // loop over object keys
            for(let j = 0; j < Object.keys(cachedKeyObject).length; j++) {
           // if object[key[i]] == mutation[key[i]]
              if(cachedKeyObject[Object.keys(cachedKeyObject)[j]] === mutationArgs[Object.keys(cachedKeyObject)[j]]) {
                matchingKey = true
              }
           //  save that key
           // move to next iteration in argsArray
            }
            if(matchingKey) {
              matchingKeysArray.push(counter)
              matchingKey = false
            }
            counter++
        }
        if(matchingKeysArray.length) {
        for(let i = 0; i < matchingKeysArray.length; i++) {
            console.log("deleted this key", allRedisKeys[matchingKeysArray[i]])
            await this.redisClient.del(allRedisKeys[matchingKeysArray[i]])
        }
    }
    }
}

module.exports = RedisCache



