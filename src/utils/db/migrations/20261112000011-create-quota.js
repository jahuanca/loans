'use strict';

/** Migración generada a partir de quota_model.js */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quota', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      id_loan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Loans', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      ganancy: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      date_to_pay: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      paid_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      amount_delinquency: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      id_state_quota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_last: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('Quota');
  },
};
