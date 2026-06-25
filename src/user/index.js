const { checkTokenController } = require("../utils/controllers/app/app_controller")
const userRoutes = require("./routes/user_routes")

const setModuleUser = (server)=> {
    server.use(checkTokenController)
    server.use('/user', userRoutes)
}   

module.exports = setModuleUser