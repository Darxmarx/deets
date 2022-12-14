// require authentication and the User and Main models
const { AuthenticationError } = require('apollo-server-express');
const { User, Main } = require('../models');
const { signToken } = require('../utils/auth');

// set up resolvers for the typeDefs queries and mutations
const resolvers = {
    // queries
    Query: {
        // find all users and populate data with their mains
        users: async () => {
            return User.find().populate('mains');
        },

        // find a specific user by their username and populate data with their mains
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('mains');
        },

        // finds all mains based on the username who owns said mains
        mains: async (parent, { username }) => {
            // checks if valid username exists
            const params = username ? { username } : {};
            return Main.find(params);
        },

        // finds a specific user and populates data with their mains
        me: async (parent, args, context) => {
            // context checks if the user is logged in
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('mains');
            }
            // returns authentication error if not logged in
            throw new AuthenticationError('You must be logged in.');
        }
    },

    
}