'use strict';

/** Migración generada a partir de activity_log_model.js */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_logs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      table_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type_operation: {
        type: Sequelize.CHAR(1),
        allowNull: true,
      },
      descriptionOperation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      new_registry: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      old_registry: {
        type: Sequelize.JSON,
        allowNull: true,
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
    await queryInterface.dropTable('activity_logs');
  },
};
