const { ErrorApp } = require("../../../utils/core/error/errors")
const { paymentProviderCategories } = require("../../../utils/core/default_values")
const { BANK, WALLET } = paymentProviderCategories

// Regla de negocio que el modelo delega al use case (depende del proveedor):
// - BANK (banco): exige CCI o numero de cuenta; no lleva telefono.
// - WALLET (billetera digital): exige telefono; no lleva CCI ni numero de cuenta.
// Devuelve los identificadores limpios segun la categoria.
const normalizeAccountByCategory = ({ provider, accountNumber, cci, phone }) => {
    if (provider == null) throw new ErrorApp('El proveedor de pago no existe')
    if (!provider.isActive) throw new ErrorApp('El proveedor de pago no esta activo')

    if (provider.category === BANK) {
        if (!cci && !accountNumber) {
            throw new ErrorApp('Una cuenta bancaria requiere CCI o numero de cuenta')
        }
        return { accountNumber: accountNumber ?? null, cci: cci ?? null, phone: null }
    }

    if (provider.category === WALLET) {
        if (!phone) throw new ErrorApp('Una billetera digital requiere telefono')
        return { accountNumber: null, cci: null, phone }
    }

    throw new ErrorApp(`Categoria de proveedor no soportada: ${provider.category}`)
}

module.exports = normalizeAccountByCategory
