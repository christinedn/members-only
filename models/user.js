const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required:[true, 'Last name is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    }, 
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    isMember: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User