'use strict';

/** Migración generada a partir de customer_address_model.js */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_addresses', {
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
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      reference: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      is_primary: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.addIndex('customer_addresses', ['id_customer'], {
      name: 'ix_customer_addresses_id_customer',
    });

    // Una sola dirección principal activa por cliente
    await queryInterface.addIndex('customer_addresses', ['id_customer'], {
      name: 'ux_customer_addresses_primary',
      unique: true,
      where: { is_primary: true, deleted_at: null },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE customer_addresses
      ADD CONSTRAINT ck_customer_addresses_type
      CHECK (type IN ('HOME', 'BUSINESS', 'FAMILY', 'OTHER'))
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE customer_addresses
      ADD CONSTRAINT ck_customer_addresses_image
      CHECK (length(trim(image)) > 0)
    `);

    // Latitud y longitud: las dos o ninguna, y dentro de rango
    await queryInterface.sequelize.query(`
      ALTER TABLE customer_addresses
      ADD CONSTRAINT ck_customer_addresses_coordinates
      CHECK (
        (latitude IS NULL AND longitude IS NULL)
        OR (
          latitude IS NOT NULL AND longitude IS NOT NULL
          AND latitude BETWEEN -90 AND 90
          AND longitude BETWEEN -180 AND 180
        )
      )
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('customer_addresses');
  },
};
