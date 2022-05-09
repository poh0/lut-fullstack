const express = require('express')
const router = express.Router()
const { getPosts, getPost, setPost, updatePost, deletePost, commentPost } = require('../controllers/postController')
const passport = require('passport')

router.get('/', getPosts)
router.get('/:id', getPost)

router.post('/', passport.authenticate("jwt", {session:false}) ,setPost)
router.put('/:id', passport.authenticate("jwt", {session:false}) , updatePost)
router.delete('/:id', passport.authenticate("jwt", {session:false}), deletePost)
router.post('/:id/comment', passport.authenticate("jwt", {session:false}), commentPost)

module.exports = router