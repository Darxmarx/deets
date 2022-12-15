// set up database, models, and seeds
const db = require('../config/connection');
const { User, Main } = require('../models');
const userSeeds = require('./userSeeds.json');
const mainSeeds = require('./mainSeeds.json');

// set up actions to modify the MongoDB
db.once('open', async () => {
    try {
        // delete all user and main data to avoid duplicates
        await User.deleteMany({});
        await Main.deleteMany({});
        
    }
})