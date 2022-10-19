const express = require('express')
const cors = require('cors')
const app = express ()

app.use(express.json())
app.use(cors())
app.use(express.static('client'))

const {getHTML} = require('./controller')

app.get('/', getHTML)

const port = process.env.PORT || 4004 

app.listen(port, console.log(`Server running on ${port}`))