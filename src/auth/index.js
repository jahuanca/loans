const authRoutes = require("./routes/auth_routes")

const setModuleAuth = (server)=>{
    server.use('/auth', authRoutes)
}

module.exports = setModuleAuth