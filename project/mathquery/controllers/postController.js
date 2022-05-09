const Post = require("../models/Post")

// @desc    Get posts
// @route   GET api/posts
// @access  Public
const getPosts = (req, res) => {
    res.json({message: 'Get posts'})
}

// @desc    Get single post
// @route   GET api/posts/:id
// @access  Public
const getPost = (req, res) => {
    res.json({message: 'Get posts'})
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
        user: req.user
    })
    
    if (post) {
        res.status(201).json({
            success: true,
            _id: post.id,
            title: post.title,
            body: post.body,
            user: post.user.name
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