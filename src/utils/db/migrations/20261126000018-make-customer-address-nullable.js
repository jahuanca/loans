'use strict';

/**
 * customers.address pasa a aceptar NULL.
 * Las direcciones ahora viven en customer_addresses y se agregan desde el detalle
 * del cliente, asi que el alta ya no envia address (ver customer_model.js: allowNull: true).
 */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('customers', 'address', {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Volver a NOT NULL falla si hay clientes sin direccion: se rellenan con '' antes.
    await queryInterface.sequelize.query(
      "UPDATE customers SET address = '' WHERE address IS NULL"
    );
    await queryInterface.changeColumn('customers', 'address', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },
};
