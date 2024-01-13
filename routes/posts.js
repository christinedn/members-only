var express = require('express');
var router = express.Router();
const postController = require('../controller/postController')

router.get('/create', postController.create_post_get)
  
router.post('/create', postController.create_post_post)

router.delete('/:id', postController.delete_post)

module.exports = router