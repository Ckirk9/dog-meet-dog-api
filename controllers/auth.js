const db = require('../models')
const bcrypt = require('bcrypt')

const login = (req, res) => {
    res.json({ user: req.body.username })
}

const signUp = (req, res) => {
    const { username, password, bio, pictureUrl } = req.body 
    if (!username || !password) {
        return res.json({
            message: 'Please enter a username and a password'
        })
    }
    // make sure pet doesn't already have an account 
    db.Pet.findOne({ username: username }, (err, foundPet) => {
        if (err)     
            return res.json({
                message: 'error'
            })
        
        if (foundPet) 
            return res.json({
                message: 'this username is already in use'
            })
        
        const newPet = new db.Pet({
            username,
            password,
            bio,
            pictureUrl
        })
        console.log("Begin save pet");
        newPet.save((err, savedPet) => {
            if (err) {
                res.json(err)
            }
            delete savedPet.password
            res.json(savedPet)
        })
        console.log("End save pet");
    })
}

const signOut = (req, res) => {
    if (!req.pet) return res.json({
        message: 'no pet to sign out'
    })
    req.logout()
    res.json({ message: 'pet signed out'})
}

module.exports = {
    login, 
    signUp,
    signOut, 
}