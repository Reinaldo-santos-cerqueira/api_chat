const routerMessage = require('./message.routes')
const routerNotification = require('./notification.routes')
const routerUser = require('./user.routes')
const router = require('express').Router()

router.use('/user', routerUser)
router.use('/message', routerMessage)
router.use('/notification', routerNotification)

module.exports = router