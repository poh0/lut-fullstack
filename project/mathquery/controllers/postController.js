
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
const setPost = (req, res) => {
    res.json({message: 'Set post'})
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