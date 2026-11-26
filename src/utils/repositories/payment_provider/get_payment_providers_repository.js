const PaymentProvider = require("../../db/models/payment_provider_model")

// Solo proveedores activos: los inactivos no se pueden usar al crear una cuenta
// (normalizeAccountByCategory los rechaza). Se ordena por categoria y nombre
// para que el frontend los muestre agrupados (bancos / billeteras).
const getPaymentProvidersRepository = () => PaymentProvider.findAll({
    where: { isActive: true },
    attributes: ['id', 'name', 'category'],
    order: [['category', 'ASC'], ['name', 'ASC']],
})

module.exports = getPaymentProvidersRepository
