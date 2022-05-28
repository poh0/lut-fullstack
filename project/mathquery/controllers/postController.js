const Post = require("../models/Post")
const Comment = require("../models/Comment")

// @desc    Get posts
// @route   GET api/posts
// @access  Public
const getPosts = async (req, res) => {

    const posts = await Post.find()
        .select('-body')      // exclude body from response
        .sort([['createdDate', -1]]) // Sort by date

    res.status(200).json({
        success: true,
        posts
    })
}

// @desc    Get single post
// @route   GET api/posts/:id
// @access  Public
const getPost = async (req, res) => {
    try {
        // https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({success: false, msg: "Invalid post id"})
        }
        
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(400).json({success: false, msg: "Couldn't find post"})
        } 

        const comments = await Comment.find({post: post._id})

        res.status(200).json({
            success: true,
            post,
            comments: comments ? comments : null
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal error")
    }

}


// @desc    Set post
// @route   POST api/posts
// @access  Private
const setPost = async (req, res) => {
    
    try {

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

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal error")
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
const commentPost = async (req, res) => {
    
    try {

        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({success: false, msg: "Invalid post id"})
        }
    
        const body = req.body.body
    
        if (!body) {
            return res.status(400).json({success: false, msg: "Please add all fields"})
        }
    
        const post = await Post.findById(req.params.id)
    
        if (!post) {
            return res.status(400).json({success: false, msg: "Couldn't find post"})
        } 
        const comment = await Comment.create({
            body: body,
            post: post._id,
            userId: req.user.id,
            author: req.user.name
        })  

        if (!comment) {
            return res.status(400).json({success: false, msg: "Couldn't create comment"})
        }
    
        res.status(201).json({
            success: true,
            _id: comment._id,
            body: comment.body,
            author: comment.author
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal error")
    }


}

module.exports = {
    getPosts,
    getPost,
    setPost,
    updatePost,
    deletePost,
    commentPost
}