const Customer = require("../../customer/db/customer_model");
const TypeCustomer = require("../../customer/db/type_customer_model");
const Loan = require("../../loan/db/loan_model");
const Renewal = require("../../loan/db/renewal_model");
const Quota = require("../../quota/db/quota_model");
const Action = require("../../user/db/action_model");
const TypeUserAction = require("../../user/db/type_user_action_model");
const TypeUser = require("../../user/db/type_user_model");
const User = require("../../user/db/user_model");
const Activity_Log = require("../../utils/db/models/activity_log_model");
const {
    defaultUsers,
    defaultCustomers,
    defaultPaymentFrequency,
    defaultPaymentMethod,
    defaultTypeUsers,
    defaultActions,
} = require("../core/default_values");
const PaymentFrequency = require("./models/payment_frequency_model");
const PaymentMethod = require("./models/payment_method_model");
const TypeDocument = require("./models/type_document_model");

const syncCustomer = async () => await Customer.sync({ alter: false, })

const syncTypeCustomer = async () => {
    await TypeCustomer.sync({ alter: false, })
        .then(async () => {
            const size = await TypeCustomer.count()
            if (size > 0) return
            await TypeCustomer.bulkCreate(defaultCustomers)
        })
}

const syncLoan = async () => await Loan.sync({ alter: false })

const syncRenewal = async () => await Renewal.sync({ alter: false })

const syncQuota = async () => await Quota.sync({ alter: false, })

const syncUser = async () => {
    await User.sync({ alter: true })
        .then(async () => {
            const size = await User.count()
            if (size > 0) return
            await User.bulkCreate(defaultUsers)
        })
    User.associate()
}

const syncTypeUser = async () => {
    await TypeUser.sync({ alter: true })
        .then(async () => {
            const size = await TypeUser.count()
            if (size > 0) return
            await TypeUser.bulkCreate(defaultTypeUsers)
        })
}

const syncActivityLog = async () => await ActivityLog.sync({ alter: false })

const syncPaymentFrequency = async () => {
    await PaymentFrequency.sync({ alter: false, })
        .then(async () => {
            const size = await PaymentFrequency.count()
            if (size > 0) return;
            await PaymentFrequency.bulkCreate(
                defaultPaymentFrequency
            )
        })
}

const syncPaymentMethod = () => {
    PaymentMethod.sync({ alter: false, })
        .then(async () => {
            const size = await PaymentMethod.count()
            if (size > 0) return;
            await PaymentMethod.bulkCreate(
                defaultPaymentMethod
            )
        })
}

const syncTypeDocument = () => {
    TypeDocument.sync({ alter: false, })
        .then(async () => {
            const size = await TypeDocument.count()
            if (size > 0) return;
            await TypeDocument.bulkCreate(
                defaultTypesDocument
            )
        })
}

const syncAction = () => Action.sync({ alter: true, })
    .then(async () => {
        const size = await Action.count()
        if (size > 0) return;
        const values = Object.values(defaultActions)
        const actions = []
        for (let i = 0; i < values.length; i++) {
            const e = values[i];
            actions.push({ name: e })
        }
        await Action.bulkCreate(actions)
    })

const syncTypeUserCustomer = () => {
    TypeUserAction.sync({ alter: true })
        .then(async () => {

            const size = await TypeUserAction.count()
            if (size > 0) return;

            const actions = await Action.findAll({ raw: true })
            const typeUsers = await TypeUser.findAll({ raw: true })
            
            const data = []
            const { id: idSuperAdmin } = typeUsers[0]
            const { id: idAdmin } = typeUsers[1]

            for (let i = 0; i < actions.length; i++) {
                const { id: idAction, name } = actions[i];
                data.push({
                    idTypeUser: idSuperAdmin,
                    idAction: idAction,
                })

                if (name.includes('get')) {
                    data.push({
                        idTypeUser: idAdmin,
                        idAction: idAction,
                    })
                }

            }

            await TypeUserAction.bulkCreate(data)

        })
}

// syncTypeDocument()
// syncPaymentMethod()
// syncPaymentFrequency()
// syncActivityLog()
// syncTypeUser()
// syncUser()
// syncQuota()
// syncRenewal()
// syncLoan()
// syncTypeCustomer()
// syncCustomer()
// syncAction()
syncTypeUserCustomer()