const express = require('express');
const  { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')
const mongoose = require('mongoose')
const app = express();
const mongooseURI = 'mongodb+srv://Adam:Adam@cluster0.suxg1.mongodb.net/sample_analytics?retryWrites=true&w=majority'
mongoose.connect(mongooseURI)
const Redis = require('redis')
const redisClient = Redis.createClient()
app.use(express.json())


// console.log("query", schema.getQueryType);
// console.log(schema.);

app.use('/graphql', 
(req, res, next) => {
    console.log(req.body);
    return next()},
graphqlHTTP({schema, graphiql: true}));


app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 

