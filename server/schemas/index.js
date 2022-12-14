// set up typeDefs and resolvers for modularity
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// export typeDefs and resolvers for use elsewhere
module.exports = { typeDefs, resolvers };
