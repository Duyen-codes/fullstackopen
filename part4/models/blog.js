// database configuration into its own module inside models directory
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    author: String,
    url: String,
    likes: Number,
    // note contains info about the user who created it, the functionality of populate method of Mongoose is based on the fact that we have defined 'types' to the references in the Mongoose scheme with the ref option:
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)