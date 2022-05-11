const express = require('express');
const  { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')
const mongoose = require('mongoose')
const mongooseURI = 'mongodb+srv://Adam:Adam@cluster0.suxg1.mongodb.net/sample_analytics?retryWrites=true&w=majority'
mongoose.connect(mongooseURI)



const app = express();


app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
}));

app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 

