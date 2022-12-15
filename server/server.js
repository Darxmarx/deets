// set up express, apollo server, path, and authentication middleware for logging in
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

// set up typeDefs, resolvers, and the MongoDB database
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// set up port to listen to, app for express use, and apollo server
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

// allow app to accept both urlencoded and json formats
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// uses path to utilize files on the client side
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// redirects to index.html when no other path is in place
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// create a new instance of an apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

// call the async function to start the server
startApolloServer(typeDefs, resolvers);
