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
    //     const queryType = req.body.query.split(' ')[0]
    //   let thisdata = parse(req.body.query)
    //   console.log(thisdata["definitions"][0].selectionSet.selections[0].selectionSet.selections)

    /// pull arguments from queries or mutations here
        /// set keys based on query
        // if mutation
           // get all keys
           // run through parser
           // invalidate keys that match with mutation

    //   console.log(thisdata["definitions"][0].selectionSet.selections[0].arguments)

        let query = {query: req.body.query}
        let cacheResponseBoolean = await this.redisClient.exists(JSON.stringify(query))

        // if true  pull from redis layer
        if(cacheResponseBoolean) {
         console.log("CACHE HIT")
          result = await this.redisClient.get(JSON.stringify(query))
          res.locals.result = result
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
                        
            // set redis layer
            this.redisClient.set(JSON.stringify(query), JSON.stringify(result.data))
            this.redisClient.expire(JSON.stringify(query), this.expiration)
            res.locals.result = JSON.stringify(result.data)
            // send back
            return next()
        }
    }
}

module.exports = RedisCache



