// set up mongoose model
const { Schema, model } = require('mongoose');

// set up schema
const mainSchema = new Schema({
    mainName: {
        type: String,
        required: true
    }
});

// define Main model using schema
const Main = model('Main', mainSchema);

// export model for use elsewhere
module.exports = Main;
