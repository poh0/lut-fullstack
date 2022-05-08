const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const config = require("./config/database")
const mongoose = require("mongoose")


// Connect to db
mongoose.connect(config.database)

mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${config.database}`)
})

mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`)
})

const app = express()

// express bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))