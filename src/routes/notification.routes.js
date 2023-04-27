const { sendNotifcation } = require('../controllers/notification')
const routerNotification = require('express').Router()

routerNotification.post('/', sendNotifcation)

module.exports = routerNotification