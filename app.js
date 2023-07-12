const express = require('express')
const app = express()
const configRoutes = require('./routes')
const session = require('express-session')


app.use(express.json())
app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

configRoutes(app)

app.listen(3000, ()=> {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
})