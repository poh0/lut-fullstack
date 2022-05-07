
// @desc    Register user
// @route   POST api/users/register
// @access  Public
const register = (req, res) => {
    res.json({message: 'Register user'})
}

// @desc    Authenticate user
// @route   POST api/users/authenticate
// @access  Public
const authenticate = (req, res) => {
    res.json({message: 'Auth user'})
}

// @desc    Get user profile
// @route   GET api/users/profile
// @access  Private
const profile = (req, res) => {
    res.json({message: 'Get user profile'})
}

module.exports = {
    register,
    authenticate,
    profile
}