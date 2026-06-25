const { Router } = require("express");
const {
    getUsersController,
    createUserController,
    updateUserController,
    deleteUserController,
    updatePasswordController,
} = require("../controllers");

const userRoutes = Router()

userRoutes.get('/', getUsersController)
userRoutes.post('/create', createUserController)
userRoutes.put('/update', updateUserController)
userRoutes.put('/update-password', updatePasswordController)
userRoutes.delete('/delete/:id', deleteUserController)

module.exports = userRoutes