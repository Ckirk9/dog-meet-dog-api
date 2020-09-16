const db = require('../models')

// controllers
const index = (req, res) => {
    db.Pet.find({}, (err, foundPets) => {
        if (err) console.log(`error in pets#index: ${err}`)
        res.status(200).json({ pets: foundPets})
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
        if (err) console.log(`error in pets#show: ${err}`)
        res.status(200).json({ pet: foundPet})
    })
}

const create = (req, res) => {
    db.Pet.create(req.body, (err, createdPet) => {
        if (err) console.log(`error in pets#create: ${err}`)
        res.status(200).json({pet: createdPet})
    })
}

const update = (req, res) => {
    db.Pet.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPet) => {
        if (err) console.log(`error in pets#update: ${err}`)
        res.status(200).json({
            pet: updatedPet
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