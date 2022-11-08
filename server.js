const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const PORT = 8000
app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}. You better go catch it!`)
})