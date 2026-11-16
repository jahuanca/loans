'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_payment_accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      id_payment_provider: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'payment_providers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      account_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      cci: {
        type: Sequelize.CHAR(20),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(9),
        allowNull: true,
      },
      holder_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      is_default: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      observation: {
        type: Sequelize.STRING(200),
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

    await queryInterface.addIndex('customer_payment_accounts', ['id_customer'], {
      name: 'ix_customer_payment_accounts_id_customer',
    });

    // Una sola cuenta principal activa por cliente
    await queryInterface.addIndex('customer_payment_accounts', ['id_customer'], {
      name: 'ux_customer_payment_accounts_default',
      unique: true,
      where: { is_default: true, deleted_at: null },
    });

    // El mismo CCI no se registra dos veces
    await queryInterface.addIndex('customer_payment_accounts', ['cci'], {
      name: 'ux_customer_payment_accounts_cci',
      unique: true,
      where: { deleted_at: null },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE customer_payment_accounts
      ADD CONSTRAINT ck_customer_payment_accounts_identifier
      CHECK (cci IS NOT NULL OR account_number IS NOT NULL OR phone IS NOT NULL)
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('customer_payment_accounts');
  },
};
