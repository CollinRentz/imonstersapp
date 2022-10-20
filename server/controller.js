const path = require('path')
const monsters = require('./db.json')
let globalId = 4
module.exports = {
    
    getHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    },
    getMonsters: (req, res) => res.status(200).send(monsters),
    deleteMonster: (req, res) => {
        let index = monsters.findIndex(elem => elem.id === +req.params.id)
        monsters.splice(index, 1)
        res.status(200).send(monsters)
    },
    createMonster: (req, res) => {
        let { name, price, imageURL } = req.body
        let newMonster = {
            id: globalId,
            name, 
            price,
            imageURL
        }
        monsters.push(newMonster)
        res.status(200).send(monsters)
        globalId++
    },
    updateMonster: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = monsters.findIndex(elem => +elem.id === +id)

        if (monsters[index].price <= 10000 && type === 'minus') {
            monsters[index].price = 0
            res.status(200).send(monsters)
        } else if (type === 'plus') {
            monsters[index].price += 10000
            res.status(200).send(monsters)
        } else if (type === 'minus') {
            monsters[index].price -= 10000
            res.status(200).send(monsters)
        } else {
            res.sendStatus(400)
        }
    },
    getRollbar: (req,res) => {
        try {
            nonExistentFunction();
          } catch {
            rollbar.error('This didnt work');
    }
    }
}