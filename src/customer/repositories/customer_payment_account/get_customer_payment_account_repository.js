// Se usa `models` de utils/db: al cargarlo se ejecutan todos los associate(),
// requisito para que el include de PaymentProvider funcione.
const { models } = require("../../../utils/db")
const { CustomerPaymentAccount, PaymentProvider } = models

const getCustomerPaymentAccountRepository = ({ id }) => CustomerPaymentAccount.findByPk(id, {
    include: [{ model: PaymentProvider, attributes: ['id', 'name', 'category'] }],
})

module.exports = getCustomerPaymentAccountRepository
