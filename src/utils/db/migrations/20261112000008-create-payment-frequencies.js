'use strict';

/** Migración generada a partir de payment_frequency_model.js */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_frequencies', {
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
        allowNull: true,
      },
      recommended_percentage: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      monthly_installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      days_installment: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_type_customer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: { model: 'type_customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('payment_frequencies');
  },
};
