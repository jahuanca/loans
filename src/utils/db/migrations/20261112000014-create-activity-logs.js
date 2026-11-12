'use strict';

/** Migración generada a partir de activity_log_model.js */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activity_Logs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
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
      description_operation: {
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
    await queryInterface.dropTable('Activity_Logs');
  },
};
