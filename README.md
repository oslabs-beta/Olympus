# Olympus
(add more info here) A hybrid caching library for GraphQL written for Javascript Express

---
## Table of Contents
- [Install](#install)
- [Server Setup](#server)
- Client-side
  - [Making Queries](#queries)
  - [Making Mutations](#mutations)
- [The Team ](#team )
---

## <a name="install"/> Install Olympus
Install our Express library via npm

```bash
npm install olympus // update this name possibly
```

 ## <a name="server"/> Set up your Express server
1. Import our Redis Middleware

```javascript
const RedisCache = require('./redisCache') // pretty sure we change the part after require to 'olympus'
```

2. Set up your Redis Server

```javascript
const redis = require('redis');
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
  });
redisClient.connect() 
const redisInstance = new RedisCache(redisClient)

// REQUIRED
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
```

3. Add the following endpoints

```javascript
app.use('/olympus', redisInstance.cacheResponse, (req, res) => {
    res.status(200).send(res.locals)
})
app.use('/graphql', graphqlHTTP({schema, graphiql: true}));
```

### <a name="queries"/> Making Queries
1. Import `Olympus` in files that make GraphQL queries

```javascript
import { Olympus } from 'olympus'; // MIGHT NEED TO CHANGE THIS
```

2. Olympus is designed to make it easy to switch over from the Fetch API. All you have to do is replace the word `fetch` with the word `Olympus`. Remove the endpoint argument, and adjust the 'body' key inside the second arugment.

For example, here's how you might send a GraphQL request using the Fetch API:

```javascript
    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/graphql' },
      body: // query string
    })
    .then(/* code */)
```

And here's what that same request looks like using Olympus:

```javascript
    Olympus({
      method: 'POST',
      headers: { 'Content-Type': 'application/graphql' },
      body: JSON.stringify({query: // query string})
    })
    .then(/* code */)
```

Simply replace `fetch` with `olympus-fetch` wherever the client-side code queries the GraphQL API, and you're done! You've set up caching inside your client's browser Local Storage.

### <a name="mutations"/> Making Mutations
(FILL IN)

## <a name="team "/> The Team
Adam Lang   | [GitHub](https://github.com/AdamLang96) | [LinkedIn](https://www.linkedin.com/in/adam-lang-573a2b149/)
<br>
Bryan Kim   | [GitHub](https://github.com/Bkimmm) | [LinkedIn](https://www.linkedin.com/in/bkimmm/)
<br>
Kevin Le    | [GitHub](https://github.com/kle160) | [LinkedIn](https://www.linkedin.com/in/kevin-le-3ab05971/)
<br>
Marshall Kim    | [GitHub](https://github.com/marshallkkim) | [LinkedIn](https://www.linkedin.com/in/marshallkkim/)
