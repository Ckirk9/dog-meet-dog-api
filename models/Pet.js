const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const PetSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: {type: String, required: true}, 
    pictureUrl: {type: String, required: false}, 
    petsLiked: [{type: String,
                ref: 'Pet',
                required: false
    }],
    petsWhoLikeYou: [{ type: String,
                ref: 'Pet',
                required: false
    }],
    matches: [{type: String,
            ref: 'Pet',
            required: false
    }]
})

PetSchema.methods = {
    verifyPassword: function (passwordInput) {
        return bcrypt.compareSync(passwordInput, this.password)
    },

    hashPassword: function (plainTextPassword) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(plainTextPassword, salt)
    }
}

PetSchema.pre('save', function(next) {
    if (!this.password) {
        next()
    } else {
        this.password = this.hashPassword(this.password)
        next()
    }
})


const Pet = mongoose.model('Pet', PetSchema)
module.exports = Pet