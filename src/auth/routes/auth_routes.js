const { Router } = require("express");
const { loginController } = require("../controllers");


const authRoutes = Router()

authRoutes.post('/login', loginController)

module.exports = authRoutes