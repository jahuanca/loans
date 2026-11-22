'use strict';

/**
 * Seed de proveedores de pago (bancos y billeteras digitales de Perú).
 *
 * - Cada proveedor tiene un id fijo (desde 1) para poder referenciarlo
 *   de forma estable desde el código, los tests o el frontend.
 * - Las categorías usan los valores permitidos por el CHECK de la migración
 *   20261116000015-create-payment-providers ('BANK' | 'WALLET').
 *
 * Ejecutar:   npm run seed
 * Revertir:   npm run seed:undo
 */

const TABLE = 'payment_providers';

const providers = [
  // Billeteras digitales
  { id: 1, name: 'Yape', category: 'WALLET' },
  { id: 2, name: 'Plin', category: 'WALLET' },

  // Bancos
  { id: 3, name: 'BCP', category: 'BANK' },
  { id: 4, name: 'Interbank', category: 'BANK' },
  { id: 5, name: 'BBVA', category: 'BANK' },
  { id: 6, name: 'Scotiabank', category: 'BANK' },
  { id: 7, name: 'Banco de la Nación', category: 'BANK' },
  { id: 8, name: 'BanBif', category: 'BANK' },
  { id: 9, name: 'Banco Pichincha', category: 'BANK' },

  // Cajas municipales (entidades financieras con cuentas de ahorro)
  { id: 10, name: 'Caja Arequipa', category: 'BANK' },
  { id: 11, name: 'Caja Huancayo', category: 'BANK' },
  { id: 12, name: 'Caja Piura', category: 'BANK' },
  { id: 13, name: 'Caja Sullana', category: 'BANK' },
  { id: 14, name: 'Caja Trujillo', category: 'BANK' },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Solo se ejecuta si la tabla está vacía; si ya tiene datos, no hace nada.
    const [{ total }] = await queryInterface.sequelize.query(
      `SELECT COUNT(*)::int AS total FROM ${TABLE}`,
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );
    if (total > 0) return;

    const now = new Date();
    await queryInterface.bulkInsert(TABLE, providers.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      is_active: true,
      created_at: now,
      updated_at: now,
    })));

    // Al insertar ids a mano, la secuencia de Postgres no avanza.
    // La movemos al último id para que el próximo INSERT sin id no choque.
    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('${TABLE}', 'id'), ${providers.length})`,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE, {
      id: { [Sequelize.Op.in]: providers.map(p => p.id) },
    });
  },
};
