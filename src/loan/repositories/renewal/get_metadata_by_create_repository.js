const { idLoanStates } = require("../../../utils/core/default_values")
const Loan = require("../../db/loan_model")
const Renewal = require("../../db/renewal_model")

const getMetadataByCreateRepository = async ({
    idCustomer,
}) => {
    const loansByCustomer = await Loan.findAll({
        where: {
            idCustomer: idCustomer
        },
        include: [{ all: true }],
        order: [['startDate', 'DESC']],
    })

    const loansNews = [...loansByCustomer]
    const loansPrevious = [...loansByCustomer.filter((e) => {
        const { idStateLoan } = e.dataValues
        return idStateLoan == idLoanStates.COMPLETE
    })];

    const renews = await Renewal.findAll({
        where: { idCustomer: idCustomer }
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
        previousLoans: previous,
        newLoans: news,
    }
}

const _getPrevious = ({
    renews,
    allLoans,
}) => {
    const previous = [...allLoans]
    for (let i = 0; i < renews.length; i++) {
        const { idPreviousLoan } = renews[i].dataValues
        for (let j = 0; j < previous.length; j++) {
            const { id } = previous[j].dataValues;

            if (idPreviousLoan == id) {
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
        const { idNewLoan } = renews[i].dataValues
        for (let j = 0; j < news.length; j++) {
            const { id } = news[j].dataValues;
            if (idNewLoan == id) {
                news.splice(j, 1)
                break;
            }
        }
    }
    return news
}

module.exports = getMetadataByCreateRepository