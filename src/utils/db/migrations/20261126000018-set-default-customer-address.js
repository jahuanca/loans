'use strict';

/**
 * customers.address: default '' (sigue NOT NULL).
 * Las direcciones ahora viven en customer_addresses y se agregan desde el detalle
 * del cliente, asi que el alta ya no envia address. Con el default, el INSERT
 * sin address deja '' en vez de fallar por NOT NULL.
 */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('customers', 'address', {
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: '',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('customers', 'address', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },
};
