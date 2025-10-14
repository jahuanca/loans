const Loan = require("../../../loan/db/loan_model")
const { sequelize } = require("../../db/connection")
const { col, fn, literal } = sequelize
const Quota = require("../../../quota/db/quota_model")
const Customer = require("../../../customer/db/customer_model")

const getNuevosAndAdded = async () => {
    // BUSCAR TODOS LOS ACTIVADOS EN OCTUBRE
    // BUSCAR UNO ANTERIOR A ESE ACTIVADO PERO QUE SEA DEL MISMO CLIENTE
    // RESTAR PARA SABER QUE SE ACTIVO LO MISMO.

    // SI EL ACTIVADO ANTERIOR ES EN EL MISMO MES, VOLVER A BUSCAR UNO ANTERIOR.
    // const customers = await Customer.findAll()
}

const getSummaryMonthsRepository = async () => {

    // BUSCAR PRESTAMOS NUEVOS EN LA FECHA
    // BUSCAR RENOVACIONES QUE AUMENTARON
    getNuevosAndAdded()

    const loan = await Quota.findAll({
        attributes: [
            [fn('SUM', col('Quota.ganancy')), 'ganancy'],
            [fn('SUM', col('Quota.amount')), 'amount'],
            'id_state_quota',
            [fn('EXTRACT', literal('MONTH FROM COALESCE(paid_date, date_to_pay)')), 'month'],
            [fn('EXTRACT', literal('YEAR FROM COALESCE(paid_date, date_to_pay)')), 'year'],
        ],
        group: ['month', 'year', 'id_state_quota'],
        order: [['year', 'DESC'], ['month', 'DESC']],
        include: [
            { model: Loan, required: true, attributes: [] }
        ],
        raw: true,
    })

    return loan
}

module.exports = getSummaryMonthsRepository