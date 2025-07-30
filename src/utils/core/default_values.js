'use_strict'

const defaultUsers = [
    {
        name: 'José Antonio',
        lastName: 'Huanca Ancajima',
        email: 'huancaancajima@gmail.com',
        password: '123456',
        phoneNumber: '989743471',
    }
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
        recommended_percentage: 10,
        monthly_installments: 28,
        days_installment: 1,
    },
    {
        name: 'Semanal',
        description: '4 cobros.',
        recommended_percentage: 20,
        monthly_installments: 4,
        days_installment: 7,
    },
    {
        name: 'Quincenal',
        description: '2 cobros.',
        recommended_percentage: 22,
        monthly_installments: 2,
        days_installment: 14,
    },
    {
        name: 'Mensual',
        description: '1 cobro.',
        recommended_percentage: 25,
        monthly_installments: 1,
        days_installment: 28,
    },
    {
        name: 'Especial',
        description: 'Cuotas y porcentaje a definir.',
        recommended_percentage: 30,
        monthly_installments: 1,
        days_installment: 30,
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

const operationsOfLog = Object.freeze({
    INSERT: 'I',
    UPDATE: 'U',
    DELETE: 'D',
})

module.exports = {
    defaultTypesDocument,
    defaultPaymentFrequency,
    defaultPaymentMethod,
    defaultUsers,
    operationsOfLog,
}