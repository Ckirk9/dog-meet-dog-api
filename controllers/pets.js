const db = require('../models')

// controllers

const index = (req, res) => {
    console.log(req.params.username)
    db.Pet.find({ username:{$ne:req.params.username}}, (err, foundPets) => {
        if (err) console.log('Error in pets#index:', err)
        if(!foundPets.length) return res.json({
            message: 'No saved pets'
        })
        res.json({ pets: foundPets})
    })
}

const create = (req, res) => {
    db.Pet.create(req.body, (err, savedPet) => {
        if (err) console.log("error in pets create:", err)
        res.json({ pet: savedPet})
    })
}

const update = (req, res) => {
    db.Pet.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPet) => {
        if (err) console.log('error in pet update:', err)
        res.json({
            pet: updatedPet,
            message: `${updatedPet.username} preferences were updated successfully`
        })
    })
}

const destroy = (req, res) => {
    db.Pet.findByIdAndDelete(req.params.id, (err, deletedPet) => {
        if (err) console.log(`error in pets#destroy: ${err}`)
        res.send(`pet succesfully deleted`)
    })
}

module.exports = {
    index,
    create,
    update,
    destroy
}