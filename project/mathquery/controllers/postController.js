const Post = require("../models/Post")
const Comment = require("../models/Comment")

// @desc    Get posts
// @route   GET api/posts
// @access  Public
const getPosts = async (req, res) => {

    // exclude body from response
    const posts = await Post.find().select('-body')

    res.status(200).json({
        success: true,
        posts
    })
}

// @desc    Get single post
// @route   GET api/posts/:id
// @access  Public
const getPost = async (req, res) => {

    // https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({success: false, msg: "Invalid post id"})
    }
      
    const post = await Post.findById(req.params.id)

    if (!post) {
        return res.status(400).json({success: false, msg: "Couldn't find post"})
    } 

    const comments = await Comment.findById(post.id)

    res.status(200).json({
        success: true,
        post,
        comments: comments ? comments : null
    })
}


// @desc    Set post
// @route   POST api/posts
// @access  Private
const setPost = async (req, res) => {
    
    const {body, title} = req.body

    if (!body || !title) {
        return res.status(400).json({success: false, msg: 'Please add all fields'})
    }

    if (!req.user) {
        res.status(400).json({success: false, msg: 'Invalid user data'})
    }

    // Create post 
    const post = await Post.create({
        title,
        body,
        author: req.user.name,
        userId: req.user
    })
    
    if (post) {
        res.status(201).json({
            success: true,
            _id: post.id,
            title: post.title,
            body: post.body,
            author: post.author
        })
    } else {
        res.status(400).json({success: false, msg: "Couldn't create post"})
    }

}

// @desc    Update post
// @route   PUT api/posts/:id
// @access  Private
const updatePost = (req, res) => {
    res.json({message: 'Update post'})
}

// @desc    Delete post
// @route   DELETE api/posts/:id
// @access  Private
const deletePost = (req, res) => {
    res.json({message: 'Delete post'})
}

// @desc    Create a post comment
// @route   POST api/posts/:id/comment
// @access  Private
const commentPost = (req, res) => {
    res.json({message: `Comment post ${req.params.id}`})
}

module.exports = {
    getPosts,
    getPost,
    setPost,
    updatePost,
    deletePost,
    commentPost
}