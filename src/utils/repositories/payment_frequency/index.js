const getPaymentsFrequencyRepository = require("./get_payments_frequency_repository");
const createPaymentFrequencyRepository = require("./create_payment_frequency_repository");
const updatePaymentFrequencyRepository = require("./update_payment_frequency_repository");
const deletePaymentFrequencyRepository = require("./delete_payment_frequency_repository");

module.exports = {
    getPaymentsFrequencyRepository,
    createPaymentFrequencyRepository,
    updatePaymentFrequencyRepository,
    deletePaymentFrequencyRepository,
}