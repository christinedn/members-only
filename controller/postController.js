const Post = require('../models/post');

const create_post_get = (req, res) => {
    res.render('create', ({ title: "Create a message"}))
}

// post method for creating a post
const create_post_post = (req, res) => {
    const post = new Post({
        title: req.body.title,
        message: req.body.message,
        author: req.user.username,
        authorID: req.user.id
    })
    post.save()
    .then(result => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
}

const delete_post = (req, res) => {
    const postId = req.params.id
    Post.findByIdAndDelete(postId)
    .then(result => {
        res.json({ redirect: '/'})
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    create_post_get,
    create_post_post,
    delete_post
}