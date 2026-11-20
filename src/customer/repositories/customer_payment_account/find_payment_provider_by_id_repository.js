const PaymentProvider = require("../../../utils/db/models/payment_provider_model")

const findPaymentProviderByIdRepository = ({ id }) => PaymentProvider.findByPk(id, { raw: true })

module.exports = findPaymentProviderByIdRepository
