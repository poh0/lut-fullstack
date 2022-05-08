const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../models/User')

// @desc    Register user
// @route   POST api/users/register
// @access  Public
const register = async (req, res) => {

    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({success: false, msg: 'Please add all fields'})
    }

    // Check if an user exists with the same email
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({success: false, msg: 'User already exists'})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: 'JWT ' + generateToken(user._id),
        })
    } else {
        res.status(400).json({success: false, msg: 'Invalid user data'})
    }
}

// @desc    Authenticate user
// @route   POST api/users/authenticate
// @access  Public
const authenticate = async (req, res) => {

    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({success: false, msg: 'Please add all fields'})
    }

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: 'JWT '+ generateToken(user._id),
        })
    } else {
        return res.status(400).json({msg: 'Invalid credentials'})
    }
}

// @desc    Get user profile
// @route   GET api/users/profile
// @access  Private
const profile = (req, res) => {
    res.json({message: 'Get user profile'})
}

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}

module.exports = {
    register,
    authenticate,
    profile
}