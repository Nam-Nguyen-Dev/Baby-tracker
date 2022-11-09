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
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('weights').find().toArray()
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(err => console.error(err))
})

app.post('/addWeight', (req, res) => {
    let dateTime = new Date()
    db.collection('weights').insertOne({pounds: req.body.pounds, reps: req.body.reps, sets: req.body.sets, date: dateTime.toLocaleDateString('en-us'), completed: false})
        .then(result => {
            console.log('Weight added')
            res.redirect('/')
        })
        .catch(err => console.error(err))
})

app.delete('/deleteWeight', (req, res) => {
    const query = {
        'pounds': req.body.poundsFromJS,
        'reps': req.body.repsFromJS,
        'sets': req.body.setsFromJS
    }
    console.log(query)
    db.collection('weights').deleteOne(query)
    .then(result => {
        console.log('Weight deleted')
        res.json('Weight Deleted')
    })
    .catch(err => console.error(err)) 
})

app.put('/markComplete', (req, res) => {
    const query = {
        'pounds': req.body.poundsFromJS,
        'reps': req.body.repsFromJS,
        'sets': req.body.setsFromJS
    }
    console.log(query)
    db.collection('weights').updateOne(query, {
        $set: {
            completed: true
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        res.json('Marked Complete')
    })
    .catch(err => console.error(err)) 
})

app.listen(process.env.PORT || PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}. You better go catch it!`)
})