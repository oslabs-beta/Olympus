const graphql = require('graphql');
const Accounts = require('./models')

const { GraphQLObjectType, GraphQLString, 
       GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

var fakeBookDatabase = [
    { name:"Book 1", pages:432 , id:1},
    { name: "Book 2", pages: 32, id: 2},
    { name: "Book 3", pages: 532, id: 3 }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        pages: { type: GraphQLInt }
    })
});

const accountType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        account_id: {type: GraphQLInt},
        limit: {type: GraphQLInt},
        products: {type: new GraphQLList(GraphQLString)}
    })
})



//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return fakeBookDatabase.find((item) => { return item.id == args.id});
            }
        },
        allBooks: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return fakeBookDatabase
            }
        },
        account: {
            type: accountType,
            args: {account_id: {type: GraphQLInt}},
            async resolve(parent, args) {
                const whacky = await Accounts.findOne({account_id: args.account_id})
                return whacky      
            }
        }
    }
});


const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        createAccount:{
            type: accountType, 
            args: {
                account_id: {type: GraphQLInt},
                limit: {type: GraphQLInt},
                products: {type: new GraphQLList(GraphQLString)}        
            },
            async resolve(parent,args){
                const data = await Accounts.create({account_id: args.account_id, limit: args.limit, products: args.products})
                return data
            }
        },
        deleteAccount:{
            type: accountType, 
            args: {
                account_id: {type: GraphQLInt},
                limit: {type: GraphQLInt},
                products: {type: new GraphQLList(GraphQLString)}        
            },
            async resolve(parent, args){
                const data = await Accounts.findOneAndDelete({...args})
                return data
            }
        },
    }
 })
//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});