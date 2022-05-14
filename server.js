const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')
const mongoose = require('mongoose')
const RedisCache = require('./redisCache')
const app = express();
const mongooseURI = 'mongodb+srv://Adam:Adam@cluster0.suxg1.mongodb.net/sample_analytics?retryWrites=true&w=majority'
mongoose.connect(mongooseURI)
const redis = require('redis')
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
  });
 
redisClient.connect() 
const redisInstance = new RedisCache(redisClient)  
app.use(express.json())

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
  


app.use('/olympus', redisInstance.cacheResponse, (req, res) => {
    res.status(200).send(res.locals.result)
})

app.use('/graphql', graphqlHTTP({schema, graphiql: true}));


app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 

