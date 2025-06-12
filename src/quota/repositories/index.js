const createQuotaRepository = require("./create_quota_repository");
const deleteQuotaRepository = require("./delete_quota_repository");
const getQuotaRepository = require("./get_quota_repository");
const getQuotasRepository = require("./get_quotas_repository");
const payQuotaRepository = require("./pay_quota_repository");
const updateQuotaRepository = require("./update_quota_repository");

module.exports = {
    getQuotasRepository,
    getQuotaRepository,
    createQuotaRepository,
    updateQuotaRepository,
    payQuotaRepository,
    deleteQuotaRepository,
}