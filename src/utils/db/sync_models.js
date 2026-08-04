const Customer = require("../../customer/db/customer_model");
const TypeCustomer = require("../../customer/db/type_customer_model");
const Loan = require("../../loan/db/loan_model");
const Renewal = require("../../loan/db/renewal_model");
const Quota = require("../../quota/db/quota_model");
const User = require("../../user/db/user_model");
const { defaultUsers, defaultCustomers, defaultPaymentFrequency, defaultPaymentMethod } = require("../core/default_values");
const ActivityLog = require("./activity_log_model");
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

const syncPaymentMethod = async () => {
    await PaymentMethod.sync({ alter: false, })
        .then(async () => {
            const size = await PaymentMethod.count()
            if (size > 0) return;
            await PaymentMethod.bulkCreate(
                defaultPaymentMethod
            )
        })
}

const syncTypeDocument = async () => {
    await TypeDocument.sync({ alter: false, })
        .then(async () => {
            const size = await TypeDocument.count()
            if (size > 0) return;
            await TypeDocument.bulkCreate(
                defaultTypesDocument
            )
        })
}

syncTypeDocument()
syncPaymentMethod()
syncPaymentFrequency()
syncActivityLog()
syncUser()
syncQuota()
syncRenewal()
syncLoan()
syncTypeCustomer()
syncCustomer()