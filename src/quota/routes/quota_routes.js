const { Router } = require("express");
const {
    getQuotasController,
    getQuotaController,
    createQuotaController,
    updateQuotaController,
    deleteQuotaController,
    payQuotaController,
} = require("../controllers");

const quotaRoutes = Router()

quotaRoutes.get('/', getQuotasController)
quotaRoutes.get('/id/:id', getQuotaController)
quotaRoutes.post('/create', createQuotaController)
quotaRoutes.post('/pay', payQuotaController)
quotaRoutes.put('/update', updateQuotaController)
quotaRoutes.delete('/delete', deleteQuotaController)

module.exports = quotaRoutes