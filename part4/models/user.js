//Mongoose schema for users
// store ids of notes created by the user in the user document. 

const mongoose = require('mongoose');

// define the model for user
const userSchema = new mongoose.Schema({
    // both username and password must be given, at least 3 characters long
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
        minLength: 3
    },
    // the ids of the notes are stored within the user document as an array of Mongo ids
    // the type of the field is ObjectId that references note-style documents
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User 