const mongoose = require('mongoose');
require("dotenv").config()

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/dog-meet-dog-db'

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}


//DB connection
const db = mongoose.connection

mongoose.connect(connectionString, configOptions)

db.on('connected', () => console.log('Mongoose connected to ', connectionString))
db.on('disconnected', () => console.log('Mongoose disconnected'))
db.on('error', (err) => console.log('Mongoose error', err))

module.exports = {
    // Message: require('./Message'),
    Pet: require('./Pet')
}