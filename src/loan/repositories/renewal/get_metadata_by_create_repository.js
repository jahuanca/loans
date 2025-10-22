const { idLoanStates } = require("../../../utils/core/default_values")
const Loan = require("../../db/loan_model")
const Renewal = require("../../db/renewal_model")

const getMetadataByCreateRepository = async ({
    id_customer,
}) => {
    const loansByCustomer = await Loan.findAll({
        where: {
            id_customer: id_customer
        },
        include: [{ all: true }],
        order: [['start_date', 'DESC']],
    })

    const loansNews = [...loansByCustomer]
    const loansPrevious = [...loansByCustomer.filter((e) => {
        const { id_state_loan } = e.dataValues
        return id_state_loan == idLoanStates.COMPLETE
    })];

    const renews = await Renewal.findAll({
        where: { id_customer: id_customer }
    })

    const previous = _getPrevious({
        renews,
        allLoans: loansPrevious,
    })

    const news = _getNews({
        renews,
        allLoans: loansNews,
    })

    return {
        previous_loans: previous,
        new_loans: news,
    }
}

const _getPrevious = ({
    renews,
    allLoans,
}) => {
    const previous = [...allLoans]
    for (let i = 0; i < renews.length; i++) {
        const { id_previous_loan } = renews[i].dataValues
        for (let j = 0; j < previous.length; j++) {
            const { id } = previous[j].dataValues;

            if (id_previous_loan == id) {
                previous.splice(j, 1)
                break;
            }
        }
    }
    return previous
}

const _getNews = ({
    renews,
    allLoans,
}) => {
    const news = [...allLoans]
    for (let i = 0; i < renews.length; i++) {
        const { id_new_loan } = renews[i].dataValues
        for (let j = 0; j < news.length; j++) {
            const { id } = news[j].dataValues;
            if (id_new_loan == id) {
                news.splice(j, 1)
                break;
            }
        }
    }
    return news
}

module.exports = getMetadataByCreateRepository