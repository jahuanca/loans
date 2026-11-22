'use_strict'

const defaultTypeUsers = [
    {
        name: 'Super-Admin',
        description: 'Puede hacer casi el 100%',
    },
    {
        name: 'Administrador',
        description: 'Puede hacer casi el 80%',
    }
]

const defaultUsers = [
    {
        name: 'José Antonio',
        lastName: 'Huanca Ancajima',
        email: 'huancaancajima@gmail.com',
        password: '123456',
        phoneNumber: '989743471',
        idTypeUser: 1,
    }
]

const defaultCustomers = [
    {
        name: 'Nuevo',
        description: 'Cliente nuevo',
    },
    {
        name: 'Antiguo',
        description: 'Cliente rentable',
    },
]

const defaultTypesDocument = [
    {
        name: 'DNI',
        description: 'Documento nacional de identidad',
    },
    {
        name: 'CE',
        description: 'Carnet de extranjeria',
    }
]

const defaultPaymentFrequency = [
    {
        name: 'Diaria',
        description: '28 cobros.',
        recommendedPercentage: 10,
        monthlyInstallments: 28,
        daysInstallment: 1,
    },
    {
        name: 'Semanal',
        description: '4 cobros.',
        recommendedPercentage: 20,
        monthlyInstallments: 4,
        daysInstallment: 7,
    },
    {
        name: 'Quincenal',
        description: '2 cobros.',
        recommendedPercentage: 22,
        monthlyInstallments: 2,
        daysInstallment: 14,
    },
    {
        name: 'Mensual',
        description: '1 cobro.',
        recommendedPercentage: 25,
        monthlyInstallments: 1,
        daysInstallment: 28,
    },
    {
        name: 'Especial',
        description: 'Cuotas y porcentaje a definir.',
        recommendedPercentage: 30,
        monthlyInstallments: 1,
        daysInstallment: 30,
    },
]

const defaultPaymentMethod = [
    {
        name: 'Billetera digital',
        description: 'Plin, Yape, Agora, Falabella, Otro.',
    },
    {
        name: 'Deposito a cuenta',
        description: 'Deposito a una cuenta bancaria.',
    },
    {
        name: 'Efectivo',
        description: 'Se realizo el pago con dinero en efectivo.',
    },
]

const typeOperationLog = Object.freeze({
    INSERT: 'I',
    UPDATE: 'U',
    DELETE: 'D',
})

const typeRenewal = Object.freeze({
    SAME_AMOUNT: 'S',
    INCREASE: 'I',
    DECREASE: 'D',
})

const operationsOfLog = Object.freeze({
    CREATE_CUSTOMER: 'CREATE_CUSTOMER',
    UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
    CREATE_CUSTOMER_PAYMENT_ACCOUNT: 'CREATE_CUSTOMER_PAYMENT_ACCOUNT',
    UPDATE_CUSTOMER_PAYMENT_ACCOUNT: 'UPDATE_CUSTOMER_PAYMENT_ACCOUNT',
    CREATE_CUSTOMER_ADDRESS: 'CREATE_CUSTOMER_ADDRESS',
    UPDATE_CUSTOMER_ADDRESS: 'UPDATE_CUSTOMER_ADDRESS',
    CREATE_LOAN: 'CREATE_LOAN',
    CREATE_SPECIAL_LOAN: 'CREATE_SPECIAL_LOAN',
    PAY_QUOTA: 'PAY_QUOTA',
    COMPLETE_LOAN: 'COMPLETE_LOAN',
})

const idLoanStates = Object.freeze({
    PENDING: 1,
    COMPLETE: 2,
})

const idQuotaStates = Object.freeze({
    PENDING: 1,
    COMPLETE: 2,
})

const keysCache = Object.freeze({
    CUSTOMER_KEY: 'customer_key',
    LOANS_KEY: 'loans_key',
})

const typeMovements = Object.freeze({
    INCOME: 'I',
    OUT: 'O',
})

const defaultActions = Object.freeze({
    CUSTOMER_GET_ALL: 'CUSTOMER.get',
    CUSTOMER_CREATE: 'CUSTOMER.create',
    CUSTOMER_UPDATE: 'CUSTOMER.update',
    CUSTOMER_DELETE: 'CUSTOMER.delete',

    LOAN_GET_ALL: 'LOAN.get',
    LOAN_CREATE: 'LOAN.create',
    LOAN_UPDATE: 'LOAN.update',
    LOAN_DELETE: 'LOAN.delete',
})

const nameOfModelsAI = Object.freeze({
    GEMINI: 'google:gemini-3.5-flash-lite',
})

const paymentProviderCategories = Object.freeze({
    BANK: 'BANK',
    WALLET: 'WALLET',
})

const customerAddressTypes = Object.freeze({
    HOME: 'HOME',
    BUSINESS: 'BUSINESS',
    FAMILY: 'FAMILY',
    OTHER: 'OTHER',
})

module.exports = {
    customerAddressTypes,
    paymentProviderCategories,
    defaultActions,
    defaultTypeUsers,
    defaultTypesDocument,
    defaultPaymentFrequency,
    defaultPaymentMethod,
    defaultUsers,
    defaultCustomers,
    typeOperationLog,
    operationsOfLog,
    typeRenewal,
    idLoanStates,
    idQuotaStates,
    keysCache,
    nameOfModelsAI,
    typeMovements,
}