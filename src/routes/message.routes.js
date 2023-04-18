const { addMessage, getAllMessage } = require('../controllers/message')
const routerMessage = require('express').Router()

routerMessage.post('/add', addMessage)
routerMessage.post('/getMsg', getAllMessage)

module.exports = routerMessage