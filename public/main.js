const monstersContainer = document.querySelector('#monsters-container')
const form = document.querySelector('form')

const baseURL = ("http://localhost:4004/api/monsters")

const monstersCallback = ({ data: monsters }) => displayMonsters(monsters)
const errCallback = err => console.log(err)

const getAllMonsters = () => axios.get(baseURL).then(monstersCallback).catch(errCallback)
const createMonster = body => axios.post(baseURL, body).then(monstersCallback).catch(errCallback)
const deleteMonster = id => axios.delete(`${baseURL}/${id}`).then(monstersCallback).catch(errCallback)
const updateMonster = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(monstersCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let price = document.querySelector('#price')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        price: price.value, 
        imageURL: imageURL.value
    }

    createMonster(bodyObj)

    name.value = ''
    price.value = ''
    imageURL.value = ''
}

function createMonsterCard(monster) {
    const monsterCard = document.createElement('div')
    monsterCard.classList.add('monster-card')

    monsterCard.innerHTML = `<img alt='monster cover image' src=${monster.imageURL} class="monster-cover-image"/>
    <p class="name">${monster.name}</p>
    <div class="btns-container">
        <button onclick="updateMonster(${monster.id}, 'minus')">-</button>
        <p class="monster-price">$${monster.price}</p>
        <button onclick="updateMonster(${monster.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteMonster(${monster.id})">delete</button>`


    monstersContainer.appendChild(monsterCard)
}

function displayMonsters(arr) {
    monstersContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMonsterCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllMonsters()