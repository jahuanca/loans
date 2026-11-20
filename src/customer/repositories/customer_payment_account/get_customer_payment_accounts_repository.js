// Se usa `models` de utils/db: al cargarlo se ejecutan todos los associate(),
// requisito para que el include de PaymentProvider funcione.
const { models } = require("../../../utils/db")
const { CustomerPaymentAccount, PaymentProvider } = models

const getCustomerPaymentAccountsRepository = ({ idCustomer }) => CustomerPaymentAccount.findAll({
    where: { idCustomer },
    include: [{ model: PaymentProvider, attributes: ['id', 'name', 'category'] }],
    order: [['isDefault', 'DESC'], ['id', 'ASC']],
})

module.exports = getCustomerPaymentAccountsRepository
