const express = require('express')
const userRoute = express.Router()

const userController = require('../controllers/user.controller')

module.exports = (serverCore) => {

    userRoute.post('/create',userController.createUser)

    // Link Particular Route with serverCore (@GetMapping)
    serverCore.use('/api/user',userRoute)
}

