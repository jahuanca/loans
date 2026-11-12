const quotaRoutes = require("./routes/quota_routes")

const setModuleQuota = (server)=> {
    server.use('/quota', quotaRoutes)
}   

module.exports = setModuleQuota