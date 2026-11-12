'use strict';

/** Migración generada a partir de loan_model.js */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Loans', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      id_payment_frequency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Payment_Frequencies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      percentage: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ganancy: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      id_payment_method: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Payment_Methods', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      number_of_installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      days_between_installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      observation: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      id_state_loan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      evidence: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Loans');
  },
};
