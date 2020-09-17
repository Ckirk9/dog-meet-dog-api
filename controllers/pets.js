const db = require('../models')

// controllers
const index = (req, res) => {
    db.Pet.find({}, (err, foundPets) => {
        if (err) console.log('Error in pets#index:', err)
        if(!foundPets.length) return res.json({
            message: 'No saved pets'
        })
        res.json({ pets: foundPets})
    })
}

const results = (req, res) => {
    db.Pet.find(req.body), (err, foundPets) => {
        if (err) console.log(`err in pets#filter: ${err}`)
        res.status(200).json({ pets: foundPets})
    }
}

const show = (req, res) => {
    db.Pet.findById(req.params.id, (err, foundPet) => {
        if (err) console.log('Error in pets show:', err)
        if (!foundPet) return res.json({
            message: "no pet found by that id"
        })
        res.json({ pet: foundPet})
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
    show,
    create,
    update,
    destroy,
    results
}