const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const Holiday = new GraphQLObjectType({
    name:'Holiday',
    fields:() => ({
        id: {type: GraphQLString},
        date: {type: GraphQLString},
        day: {type: GraphQLString},
        holiday: {type: GraphQLString},
        state:{type: GraphQLString},
    })
});


// Root query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        holiday: {
            type: Holiday,
            args:{
                date:{type:GraphQLString},
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/holidays?date='+ args.date).then(res => res.data);
            }
        },
        holidays: {
            type: new GraphQLList(Holiday),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/holidays/').then(res => res.data);
            }
        }
        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});