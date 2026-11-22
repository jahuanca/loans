'use strict';

const TypeDocument = require('./models/type_document_model');
const Loan = require('../../loan/db/loan_model');
const Quota = require('../../quota/db/quota_model');
const ActivityLog = require('./models/activity_log_model');
const PaymentMethod = require('./models/payment_method_model');
const PaymentFrequency = require('./models/payment_frequency_model');
const User = require('../../user/db/user_model');
const Customer = require('../../customer/db/customer_model');
const TypeCustomer = require('../../customer/db/type_customer_model');
const TypeUser = require('../../user/db/type_user_model');
const Action = require('../../user/db/action_model');
const TypeUserAction = require('../../user/db/type_user_action_model');

const { Model } = require('sequelize');
const CapitalMovements = require('../../loan/db/capital_movements_model');
const PaymentProvider = require('./models/payment_provider_model');
const CustomerPaymentAccount = require('../../customer/db/customer_payment_account_model');
const CustomerAddress = require('../../customer/db/customer_address_model');

/**
 * @type {Object.<string, typeof Model>}
 */
const db = {};

[
  Loan,
  Action,
  CapitalMovements, 
  TypeUser,
  User,
  TypeUserAction,
  PaymentFrequency,
  PaymentMethod,
  ActivityLog,
  TypeDocument,
  TypeCustomer,
  Quota,
  Customer,
  PaymentProvider,
  CustomerPaymentAccount,
  CustomerAddress,
].forEach(model => {
    db[model.options.modelName ?? model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

module.exports = {
  models: db,
}
