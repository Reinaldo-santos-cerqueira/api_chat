const { register, login, setAvatar, getAllContacts, getTest } = require('../controllers/user')

const routerUser = require('express').Router()

routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.patch('/setAvatar', setAvatar)
routerUser.get('/allContacts/:email', getAllContacts)
routerUser.get('/', getTest)

module.exports = routerUser