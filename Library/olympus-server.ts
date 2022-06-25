// require in imports
const axios = require("axios");
const { parse } = require("graphql/language/parser");
class RedisCache {

  // define constructor function to take in redisclient, expiration, and endpoint as arguments
  constructor(redisClient, expiration = 3600, GQLEndpoint) {
    this.redisClient = redisClient;
    this.expiration  = expiration;
    this.GQLEndpoint = GQLEndpoint
  }
  // method to cache response of graphql query
  cacheResponse = async (req, res, next) => {
    let result;

    // define headers to allow for graphql queries
    const headers = {
      "content-type": "application/json",
      Authorization: "<token>",
    };

        // run parser function over graphql query to extract relevant information
        const parsed = this.queryParser(req.body.query)

        // check to see if user is running a query or a mutation
        if(parsed.operationType === "mutation") {
         await this.checkMutation(parsed)
        }
        
        // format query to make it compatible with graphql API
        let query = {query: req.body.query}

        // define T/F variable dependant one whether or not the key of the query exists in the cache
        let cacheResponseBoolean = await this.redisClient.exists(JSON.stringify(query))
        
        // if the key exists pull the query from Redis layer
        if(cacheResponseBoolean) {
          result = await this.redisClient.get(JSON.stringify(query));

          // send back query to client from Redis
          res.locals.result = result;
          res.locals.operationType = parsed.operationType;
          return next()

        } else {

            // if query does not exist in Redis, send a request to GraphQL endpoint
            result = await axios({
                url:  this.GQLEndpoint,
                method: 'post',
                headers : headers,
                data: query})

            // check that the operation is a query
            if(parsed.operationType == "query") {
            
            // add query and result as key value pair into redis cache
            this.redisClient.set(JSON.stringify(query), JSON.stringify(result.data))
            this.redisClient.expire(JSON.stringify(query), this.expiration)
            }
            
            // send back result to client
            res.locals.result = JSON.stringify(result.data)
            res.locals.operationType = parsed.operationType
            return next()
        }
    }

  // method to parse GraphQL query string 
  queryParser = (queryString) => {
    const argsObject = {};

    // run GraphQL parser over the query string
    let parsedQuery = parse(queryString);

    // determine whether string pertains to query or mutation via parser
    const operationType = parsedQuery["definitions"][0].operation;

    // extract arguments from either the mutation or query from the parser
    const args =
      parsedQuery["definitions"][0].selectionSet.selections[0].arguments;
    args.forEach((el) => {
      argsObject[el.name.value] = el.value.value;
    });

    // return the array of arguments and if its a mutation or a query
    return { args: argsObject, operationType: operationType };
  };


  // method to handle mutation logic in Redis caching
  checkMutation = async (mutationObj) => {
    
    // pull all keys inside Redis cache
    const allRedisKeys = await this.redisClient.keys("*");
    let gqlParsed;
    let matchingKey = false;
    let counter = 0;
    let matchingKeysArray = [];
    const argsArray = [];

    // run keys through the queryParser method to determine arguments of cached queries 
    allRedisKeys.forEach((el) => {
      el = JSON.parse(el);
      gqlParsed = this.queryParser(el.query);
      argsArray.push(gqlParsed.args);
    });

    // extract arguments from mutation
    const mutationArgs = mutationObj.args;
    // loop over array of arguments from cached queries

    for (let i = 0; i < argsArray.length; i++) {
      const cachedKeyObject = argsArray[i];
      
      for (let j = 0; j < Object.keys(cachedKeyObject).length; j++) {

        // check to see if any arguments in our mutation match arguments of cached keys
        if (
          cachedKeyObject[Object.keys(cachedKeyObject)[j]] ===
          mutationArgs[Object.keys(cachedKeyObject)[j]]
        ) {
          matchingKey = true;
        }
        
        // if there is a match push the key to our array
      }
      if (matchingKey) {
        matchingKeysArray.push(counter);
        matchingKey = false;
      }
      counter++;
    }
    /// loop through array of keys and delete each key from Redis cache
    if (matchingKeysArray.length) {
      for (let i = 0; i < matchingKeysArray.length; i++) {
        await this.redisClient.del(allRedisKeys[matchingKeysArray[i]]);
      }
    }
  };
}


module.exports = RedisCache;
