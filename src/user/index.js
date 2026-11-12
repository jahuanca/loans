const userRoutes = require("./routes/user_routes")

const setModuleUser = (server)=> {
    server.use('/user', userRoutes)
}   

module.exports = setModuleUser