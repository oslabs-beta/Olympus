const axios = require("axios");
const { parse } = require("graphql/language/parser");
class RedisCache {
  constructor(redisClient, expiration = 3600) {
    this.redisClient = redisClient;
    this.expiration = expiration;
  }
  // method to cache response of graphql query
  cacheResponse = async (req, res, next) => {
    let result;
    const headers = {
      "content-type": "application/json",
      Authorization: "<token>",
    };
    /// pull arguments from queries or mutations here
    /// set keys based on query
    // if mutation
    // get all keys
    // run through parser
    // invalidate keys that match with mutation

        const parsed = this.queryParser(req.body.query)
        if(parsed.operationType === "mutation") {
         await this.checkMutation(parsed)
        }
        let query = {query: req.body.query}
        let cacheResponseBoolean = await this.redisClient.exists(JSON.stringify(query))
        
        // if true  pull from redis layer
        if(cacheResponseBoolean) {
         console.log("CACHE HIT")
          result = await this.redisClient.get(JSON.stringify(query));
          res.locals.result = result;
          res.locals.operationType = parsed.operationType;
        //   console.log(res.locals.result) // for testing
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
    const argsObject = {};
    let parsedQuery = parse(queryString);
    const operationType = parsedQuery["definitions"][0].operation;
    const args =
      parsedQuery["definitions"][0].selectionSet.selections[0].arguments;
    args.forEach((el) => {
      argsObject[el.name.value] = el.value.value;
    });
    return { args: argsObject, operationType: operationType };
  };

  checkMutation = async (mutationObj) => {
    const allRedisKeys = await this.redisClient.keys("*");
    let gqlParsed;
    let matchingKey = false;
    let counter = 0;
    let matchingKeysArray = [];
    const argsArray = [];
    allRedisKeys.forEach((el) => {
      el = JSON.parse(el);
      gqlParsed = this.queryParser(el.query);
      argsArray.push(gqlParsed.args);
    });
    const mutationArgs = mutationObj.args;
    // loop over argsArray
    for (let i = 0; i < argsArray.length; i++) {
      const cachedKeyObject = argsArray[i];
      console.log(cachedKeyObject);
      // loop over object keys
      for (let j = 0; j < Object.keys(cachedKeyObject).length; j++) {
        // if object[key[i]] == mutation[key[i]]
        if (
          cachedKeyObject[Object.keys(cachedKeyObject)[j]] ===
          mutationArgs[Object.keys(cachedKeyObject)[j]]
        ) {
          matchingKey = true;
        }
        //  save that key
        // move to next iteration in argsArray
      }
      if (matchingKey) {
        matchingKeysArray.push(counter);
        matchingKey = false;
      }
      counter++;
    }
    if (matchingKeysArray.length) {
      for (let i = 0; i < matchingKeysArray.length; i++) {
        console.log("deleted this key", allRedisKeys[matchingKeysArray[i]]);
        await this.redisClient.del(allRedisKeys[matchingKeysArray[i]]);
      }
    }
  };
}


module.exports = RedisCache;
