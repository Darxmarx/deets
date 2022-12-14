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

    // mutations
    Mutation: {
        // adds brand new user to users array
        addUser: async (parent, { username, email, password }) => {
            // new user created as long as username, email, and password are all valid
            const user = await User.create({ username, email, password });
            // sets up a jwt for new user
            const token = signToken(user);
            return { token, user };
        },

        // user login based on email and password
        login: async (parent, { email, password }) => {
            // finds user by their email address
            const user = await User.findOne({ email });

            // if user does not exist, throw error
            if (!user) {
                throw new AuthenticationError('No user found with this email address.');
            }

            // checks if inputted password is correct
            const correctPassword = await user.isCorrectPassword(password);

            // if password is invalid, throw error
            if (!correctPassword) {
                throw new AuthenticationError('Incorrect password.');
            }

            // if all credentials are valid, set up jwt for user
            const token = signToken(user);
            return { token, user };
        },

        
    }
}