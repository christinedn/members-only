const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    author: {
        type: String,
        required: true,
    },
    authorID: {
        type: mongoose.SchemaTypes.ObjectID,
        required: true,
    }
}, { timestamps: true, })

const Post = mongoose.model('Post', postSchema)
module.exports = Post