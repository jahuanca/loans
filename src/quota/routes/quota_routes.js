const { Router } = require("express");
const {
    getQuotasController,
    createQuotaController,
    updateQuotaController,
    deleteQuotaController,
} = require("../controllers");

const quotaRoutes = Router()

quotaRoutes.get('/', getQuotasController)
quotaRoutes.post('/create', createQuotaController)
quotaRoutes.put('/update', updateQuotaController)
quotaRoutes.delete('/delete', deleteQuotaController)

module.exports = quotaRoutes