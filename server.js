const express = require('express')
const dotenv = require('dotenv')
const hbs = require('express-handlebars')
const colors = require('colors')
const path = require('path')
const session = require('express-session')
const connectMongodbSimple = require('connect-mongodb-session')(session)
const mongodbConnect = require('./config/db')

dotenv.config()
const app=express()
const PORT=process.env.PORT

// MongoDB Database Connected
mongodbConnect()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    store: new connectMongodbSimple({
        uri: process.env.MONGODB_URI_SESSION,
        collection: 'mySession'
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    resave: true
}))

// Initilize express-handlebars
app.engine('.hbs', hbs.engine({extname: ".hbs"}))
app.set('view engine', '.hbs')

// Registration
app.use('/auth', require('./routers/auth.router'))

// User Profile
app.use('/user', require('./routers/user.router'))


// Home Page
app.use(require('./routers/home.router'))

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`.bgMagenta)
})
