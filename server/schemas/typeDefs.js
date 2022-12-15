// set up GraphQL
const { gql } = require('apollo-server-express');

// set up the typeDefs using GraphQL
const typeDefs = gql`
    # user details
    type User {
        _id: ID
        username: String
        email: String
        password: String
        # queryable field to retrieve array of mains
        mains: [Main]
    }
    
    # main details
    type Main {
        _id: ID
        mainName: String
        mainUser: String
    }

    # authorization using jwt
    type Auth {
        token: ID
        user: User
    }
    
    # available queries to be resolved in resolvers
    type Query {
        users: [User]
        # grab single user based on their username
        user(username: String): User
        # grab all of one user's mains
        mains(username: String): [Main]
        # personal profile
        me: User
    }

    # mutations available to modify data
    type Mutation {
        # both addUser and login require use of jwt
        addUser(username: String, email: String, password: String): Auth
        login(email: String, password: String): Auth
        # add and remove mains based on url of image
        addMain(mainName: String): Main
        removeMain(mainId: ID): Main
    }
`;

// export typeDefs for use elsewhere
module.exports = typeDefs;
