import express from "express"
import mongoose from "mongoose"


// App config
const app = express()
const port = process.env.PORT || 5000
const connection_url = `mongodb+srv://admin:WrEO4EORK3lbXFO5@cluster0.mibfd.mongodb.net/dog-meet-dog-db?retryWrites=true&w=majority`

// middleware


// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true,
})

// API endpoints
app.get('/', (req, res) => res.status(200).send("sanity check"))


// Listener 
app.listen(port, () => console.log(`listening on localhost: ${port}`))