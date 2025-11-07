const express = require('express')
const route = express.Router()
const messageController = require('../controller/message.controller')

route.get('/history', messageController.getMessages)


module.exports = route