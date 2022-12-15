// set up mongoose model and bcrypt for password encryption
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// set up schema
const userSchema = new Schema({
    // username is required, and blank space when typed in is removed
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // email is required, checks for email syntax
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must be valid email address.']
    },

    // password is required, checks password is at least 8 characters long
    password: {
        type: String,
        required: true,
        minlength: 8
    },

    // mains is an array populated from data set up within the Main model
    mains: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Main'
        }
    ]
});

// before password is saved, encrypt the password using bcrypt
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// applies bcrypt's encryption to whenever password is inputted for verification
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

// define User model using schema
const User = model('User', userSchema);

// export model for use elsewhere
module.exports = User;
