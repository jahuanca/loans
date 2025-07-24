const { checkTokenController } = require("../utils/controllers/app/app_controller")
const quotaRoutes = require("./routes/quota_routes")

const setModuleQuota = (server)=> {
    server.use(checkTokenController)
    server.use('/quota', quotaRoutes)
}   

module.exports = setModuleQuota