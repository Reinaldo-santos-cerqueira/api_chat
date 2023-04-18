const { register, login, setAvatar, getAllContacts } = require('../controllers/user')

const routerUser = require('express').Router()

routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.patch('/setAvatar', setAvatar)
routerUser.get('/allContacts/:email', getAllContacts)

module.exports = routerUser