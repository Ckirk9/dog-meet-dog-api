const db = require('../models')

const show = (req, res) => {
    db.Pet.findOne({ username: req.params.username }, (err, foundPet) => {
        if (err) console.log('Error in pets show:', err)
        if (!foundPet) return res.json({
            message: "no pet found by that username"
        })
        res.json({ pet: foundPet})
    })
}

module.exports = {
    show,
}