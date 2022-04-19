const express = require("express")
const route = express.Router()
const UserController = require('../controller/UserController')

route.get('/dashboard', UserController.getAllData)
route.get('/profile/:id', UserController.getSingleData)
route.put('/score/:id', UserController.pushScore)
route.put('/update/:id', UserController.updateInfo)

module.exports = route