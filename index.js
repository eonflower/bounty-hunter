const express = require("express")
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
// const {v4: uuidv4} = require("uuid")

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/bountydb',{useNewUrlParser: true})
.then(()=> console.log("Connected to MongoDB"))
.catch(err => console.error(err));

app.get("/", (req, res) => {
    res.send("this is the server")
})
app.use("/bounties", require("./routes/bountyRouter.js"))

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err)
    res.send({errMsg: err.message})
})



app.listen(6000, () => { 
    console.log("the server works")
})

