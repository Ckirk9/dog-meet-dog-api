const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const Pet = require('../models/Pet')
const { deserializeUser } = require('passport')

// function to save the logged in userID 
passport.serializeUser((user, done) => {
    console.log('passport/index.js: serializedUser function is called')
    console.log(user)
    done(null, user._id)
})

// function that is called anytime a logged in user makes a request to the app
// passport adds the user into to req.user and we can use that to verify the authenticated user
passport.deserializeUser((id, done) => {
    console.log('passport/index.js: deserializeUser function is invoked') 
    User.findById(id, 'userName', (err, user) => {
        if (err) return done(err, null)
        console.log(user)
        done(null, user)
    })
})

passport.use(LocalStrategy)
module.exports = passport