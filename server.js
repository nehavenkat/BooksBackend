const express = require("express")
const booksRouter = require("./source/books")
const commentsRouter =require("./source/comments")
const cors = require("cors")
require('dotenv').config()

const server = express();

var whitelist = ['http://localhost:3000', 'http://localhost:3001', 
              'http://m5-d7-oct19-fe.herokuapp.com', 'https://m5-d7-oct19-fe.herokuapp.com', process.env.FE_URL]
var corsOptions = {
  origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
       } else {
           callback(new Error('Not allowed by CORS'))
       }
    }
}

// this allows HEROKU (or whatever else cloud system) to select the PORT that is free for him
const port = process.env.PORT || 3000

console.log(process.env.USER)
console.log(process.env.FE_URL)

//server.use()
server.use(express.json())

server.use("/books", cors(corsOptions), booksRouter)
server.get("/test", (req, res) => {
    res.send("Books are working!!!")
})
server.use("/comments", cors(corsOptions), commentsRouter)
server.get("/test", (req, res) => {
    res.send("Commnents are working!!!")
})

server.listen(port, () => {
    console.log("I'm listening on port " + port)
})