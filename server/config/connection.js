// set up mongoose
const mongoose = require('mongoose');

// connect to the MongoDB
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/deets',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// export the mongoose connection for use elsewhere
module.exports = mongoose.connection;
