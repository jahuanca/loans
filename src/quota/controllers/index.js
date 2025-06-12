const createQuotaController = require("./create_quota");
const getQuotasController = require("./get_quotas");
const getQuotaController = require("./get_quota");
const updateQuotaController = require("./update_quota");
const deleteQuotaController = require("./delete_quota");
const payQuotaController = require("./pay_quota");

module.exports = {
    getQuotasController,
    getQuotaController,
    createQuotaController,
    payQuotaController,
    updateQuotaController,
    deleteQuotaController,
}