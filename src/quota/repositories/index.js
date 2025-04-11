const createQuotaRepository = require("./create_quota_repository");
const deleteQuotaRepository = require("./delete_quota_repository");
const getQuotasRepository = require("./get_quotas_repository");
const updateQuotaRepository = require("./update_quota_repository");

module.exports = {
    getQuotasRepository,
    createQuotaRepository,
    updateQuotaRepository,
    deleteQuotaRepository,
}