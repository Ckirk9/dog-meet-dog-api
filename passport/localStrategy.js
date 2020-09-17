const Pet = require('../models/Pet')
const passport = require('passport')
// strategy refers to the way we log a user in the site 
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
    { usernameField: 'username' },
    // verifiy the user
    function(username, password, done) {
        // find the user via their userName
        Pet.findOne({ username: username }, (err, foundPet) => {
            if (err) return done(err)
            if (!foundPet) return done(null, false, {message: 'credentials invalid'})
            if (!foundPet.verifyPassword(password)) return done(null, false, {message: 'credentials invalid'})
            return done(null, foundPet)
        })
    }
)

module.exports = strategy