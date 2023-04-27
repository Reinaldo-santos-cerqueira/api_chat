const { register, login, setAvatar, getAllContacts, getTest, setToken } = require('../controllers/user')

const routerUser = require('express').Router()

routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.patch('/setAvatar', setAvatar)
routerUser.patch('/setToken', setToken)
routerUser.get('/allContacts/:email', getAllContacts)
routerUser.get('/', getTest)

module.exports = routerUser