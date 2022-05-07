const express = require('express')
const router = express.Router()
const { getPosts, getPost, setPost, updatePost, deletePost, commentPost } = require('../controllers/postController')

router.get('/', getPosts)
router.post('/', setPost)

router.put('/:id', updatePost)
router.get('/:id', getPost)
router.delete('/:id', deletePost)

router.post('/:id/comment', commentPost)

module.exports = router