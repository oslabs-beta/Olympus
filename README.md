<p align="center">
  <img 
    src="OlympusHouse.png"
  >
</p>

<h1 align="center">Welcome to <a href="https://github.com/oslabs-beta/olympus" target="_blank">Olympus</a></h1>
# [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)]() [![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE) [![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)]() [![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@marshallkkim29/olympus-an-intuitive-hybrid-caching-solution-for-graphql-b18a08c5045d) [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/olympus-caching/)

Olympus is a hybrid caching library for GraphQL written for Javascript Express

## Features
- Automatically creates and caches GraphQL queries.
- Integrates with any server running on Express/Node.js.
- Includes caching with Redis and in the browser's local storage.

Check out [our demo site](https://github.com/oslabs-beta/olympus) to see what Olympus can do. (fix link here + in welcome)

---
## Table of Contents
- [Install](#install)
- [Server Setup](#server)
- [Making Queries (Client-side)](#queries)
- [Making Mutations (Client-side)](#mutations)
- [The Team ](#team )
- [License](#license )
---

## <a name="install"/> Install Olympus
Install our Express library via npm

```bash
npm install olympus // update this name possibly
```

## <a name="server"/> Set up your Express server
1. Import our Redis Middleware

```javascript
const RedisCache = require('./redisCache'); // pretty sure we change the part after require to 'olympus'
```

2. Set up your Redis Server

```javascript
const redis = require('redis');
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
  });
redisClient.connect();
const redisInstance = new RedisCache(redisClient);

// REQUIRED
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
```

3. Add the following endpoints

```javascript
app.use('/olympus', redisInstance.cacheResponse, (req, res) => {
    res.status(200).send(res.locals)
});
app.use('/graphql', graphqlHTTP({schema, graphiql: true}));
```

## <a name="queries"/> Making Queries
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

Simply replace `fetch` with `Olympus` wherever the client-side code queries the GraphQL API, and you're done! You've set up caching inside your client's browser Local Storage.

## <a name="mutations"/> Making Mutations
In order to make a mutation, follow the same steps above. Simply replace `fetch` with `Olympus` wherever the client-side code makes mutations using the GraphQL API, and you're done! Simply enter your string containing the mutation inside of the key "query".

```javascript
Olympus({
  method: 'POST',
  headers: { 'Content-Type': 'application/graphql' },
  body: JSON.stringify({query: // mutation string})
})
.then(/* code */)
```

## <a name="team "/> The Team
Adam Lang   | [GitHub](https://github.com/AdamLang96) | [LinkedIn](https://www.linkedin.com/in/adam-lang-573a2b149/)
<br>
Bryan Kim   | [GitHub](https://github.com/Bkimmm) | [LinkedIn](https://www.linkedin.com/in/bkimmm/)
<br>
Kevin Le    | [GitHub](https://github.com/kle160) | [LinkedIn](https://www.linkedin.com/in/kevin-le-3ab05971/)
<br>
Marshall Kim    | [GitHub](https://github.com/marshallkkim) | [LinkedIn](https://www.linkedin.com/in/marshallkkim/)

## <a name="license"/> License
This product is licensed under the MIT License - see the LICENSE file for details.

This is an open source product.

This product is accelerated by [OS Labs](https://opensourcelabs.io/).
