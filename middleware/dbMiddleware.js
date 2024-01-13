const User = require('../models/user')
const Post = require('../models/post')

// middleware that includes user information
const usersMiddleware = (req, res, next) => {
    console.log('User Middleware - currentUser:', req.user);
    res.locals.user = req.user;
    next();
}

const postsMiddleware = (req, res, next) => {
    Post.find().sort({ createdAt: -1 }) // newest post at top of page
    .then((posts) => {
        req.posts = posts
        next()
    })
    .catch((err) => {
        console.log(err)
        next();
    })
}

module.exports = {
    usersMiddleware,
    postsMiddleware
}
  