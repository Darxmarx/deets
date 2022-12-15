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

        // create all users
        await User.create(userSeeds);

        // iterate through all main seeds to create mains associated with specific users
        for (let i = 0; i < mainSeeds.length; i++) {
            const { _id, mainUser } = await Main.create(mainSeeds[i]);

            const user = await User.findOneAndUpdate(
                { username: mainUser },
                {
                    $addToSet: {
                        mains: _id
                    }
                }
            );
        }
    } catch (err) { // return error if seeds invalid
        console.error(err);
        process.exit(1);
    }

    // confirms seed implementation was successful and exit script
    console.log('Seeds successfully planted.');
    process.exit(1);
});
