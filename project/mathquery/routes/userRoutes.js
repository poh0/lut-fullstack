const express = require('express')
const router = express.Router()
const { register, authenticate, profile } = require('../controllers/userController')

router.post('/register', register)
router.post('/authenticate', authenticate)
router.get('/profile', profile)

module.exports = router