const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/error-middleware')
const path = require('path')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000


app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use('/public', express.static('public'))
app.use(errorMiddleware)

// Serve static assets if in production

const uri = process.env.ATLAS_URI

const start = async () => {
    try {
        console.log('123123123123')
        await mongoose.connect(uri, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(port, () => console.log(`Port  ${port}`))
    } catch (e) {
        console.log(e)
    }
}

start()