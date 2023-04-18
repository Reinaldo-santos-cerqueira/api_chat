const User = require('../model/user')
const bcrypt = require('bcrypt')
const messageModel = require('../model/message')
module.exports.addMessage = async (req, res, next) => {
    try {

        const { from, to, message } = req.body
        
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })
        if (data) {
            return res.status(200).json({
                error: false,
                status: 200,
                message: 'Message added sucessfully'
            })
        }
        return res.status(200).json({
            error: true,
            status: 400,
            message: 'Failed to add message to the database'
        })
    } catch(e) {
        next(e)
    }
}

module.exports.getAllMessage = async (req, res, next) => {
    try {

        const { from, to } = req.body

        const messages = await messageModel
            .find({
                users: {
                    $all: [from, to]
                },
            })

        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })

        res.json(projectMessages)
 
    } catch (e) {
        next(e)
    }
}