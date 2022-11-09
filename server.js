const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'baby-tracker'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db=client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(exppress.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/addWeight', (req, res) => {

})


app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}. You better go catch it!`)
})