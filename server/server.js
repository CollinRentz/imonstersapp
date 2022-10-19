const express = require('express')
const cors = require('cors')
const app = express ()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const {getHTML} = require('./controller')

app.get('/', getHTML)

const {
    getMonsters,
    deleteMonster, 
    createMonster, 
    updateMonster,
    getCompliment,
    getFortune
} = require('./controller')

app.get(`/api/monsters`, getMonsters)
app.delete(`/api/monsters/:id`, deleteMonster)
app.post(`/api/monsters`, createMonster)
app.put(`/api/monsters/:id`, updateMonster)

const port = process.env.PORT || 4004 

app.listen(port, console.log(`Server running on ${port}`))