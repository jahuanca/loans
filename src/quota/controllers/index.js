const createQuotaController = require("./create_quota");
const getQuotasController = require("./get_quotas");
const updateQuotaController = require("./update_quota");
const deleteQuotaController = require("./delete_quota");

module.exports = {
    getQuotasController,
    createQuotaController,
    updateQuotaController,
    deleteQuotaController,
}