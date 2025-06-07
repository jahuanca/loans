const createQuotaController = require("./create_quota");
const getQuotasController = require("./get_quotas");
const getQuotaController = require("./get_quota");
const updateQuotaController = require("./update_quota");
const deleteQuotaController = require("./delete_quota");
const getQuotasByDateController = require("./get_quotas_by_date");
const payQuotaController = require("./pay_quota");

module.exports = {
    getQuotasController,
    getQuotaController,
    getQuotasByDateController,
    createQuotaController,
    payQuotaController,
    updateQuotaController,
    deleteQuotaController,
}