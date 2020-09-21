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
    db.Pet.findOneAndUpdate({ username: req.params.username }, req.body, {new: true}, (err, updatedPet) => {
        if (err) console.log('error in pet update:', err)
        res.json({
            pet: updatedPet,
            message: `${updatedPet.username} profile updated successfully`
        })
    })
}

const destroy = (req, res) => {
    db.Pet.findByIdAndDelete(req.params.id, (err, deletedPet) => {
        if (err) console.log(`error in pets#destroy: ${err}`)
        res.send(`pet succesfully deleted`)
    })
}

const likes = (req, res) => {
    db.Pet.updateOne(
        { username: req.params.username }, 
        { 
            $push: { 
            petsLiked: req.body.likedPet
        }, 
            $set: {
                [`conversations.${req.body.likedPet}`]: [],
            }
        },
        (err, updatedPet) => {
            if (err) console.log('error in pet update:', err)
            res.json({
                pet: updatedPet,
                message: `${req.params.username} now likes ${req.body.likedPet}`
            })
        }
    );
}

const message = (req, res) => {
    console.log('Req params: ', req.params);
    console.log('Req.body: ', req.body);
    db.Pet.updateOne(
        { username: req.params.username }, 
        { 
            $push: { 
                [`conversations.${req.body.likedPet}`]: { message: req.body.message, sender: req.params.username }
            }, 
        },
        (err, updatedPet) => {
            if (err) console.log('error in pet update:', err)
        }
    );
    db.Pet.updateOne(
        { username: req.body.likedPet }, 
        { 
            $push: { 
                [`conversations.${req.params.username}`]: { message: req.body.message, sender: req.params.username }
            }, 
        },
        (err) => {
            if (err) console.log('error in pet update:', err)
            res.json({
                message: 'Success!'
            })
        }
    );
}

module.exports = {
    index,
    create,
    update,
    destroy,
    likes,
    message,
}