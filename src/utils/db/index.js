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
const db = {};

const listOfModels = [
  Loan,
  User,
  PaymentFrequency,
  PaymentMethod,
  ActivityLog,
  TypeDocument,
  TypeCustomer,
  Quota,
  Customer,
].forEach(model => {
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

module.exports = {
  models: db,
}
