import mongoose from 'mongoose'
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const petSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: {type: String, required: true}, 
    pictureUrl: {type: String, required: false}, 
    petsLiked: [{type: mongoose.Schema.Types.ObjectId,
                ref: 'Pet',
                required: false
    }],
    petsWhoLikeYou: [{ type: mongoose.Schema.Types.ObjectId,
                ref: 'Pet',
                required: false
    }],
    matches: [{type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: false
    }]
})


const Pet = mongoose.model('Pet', PetSchema)
module.exports = Pet