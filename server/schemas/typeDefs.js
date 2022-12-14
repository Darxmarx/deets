// set up GraphQL
const { gql } = require('apollo-server-express');

// set up the typeDefs using GraphQL
const typeDefs = gql`
    # user details
    type User {
        _id: ID
        username: String:
        email: String
        password: String
        # queryable field to retrieve array of mains
        mains: [Main]
    }
    
    # main details
    type Main {
        _id: ID
        url: String
    }
    
    # available queries to be resolved in resolvers
    type Query {
        users: [User]
        mains: [Main]
    }
`;

// export typeDefs for use elsewhere
module.exports = typeDefs;
