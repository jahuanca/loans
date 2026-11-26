# Plan: catálogo de proveedores de pago

**Estado:** implementado (PR abierto)

## Objetivo
Que la app Flutter obtenga la lista de proveedores de pago (bancos y billeteras) del backend, en vez de una lista fija en el código, y que el formulario de cuenta de pago muestre los campos según la categoría.

## Decisiones
- Endpoint de solo lectura `GET /utils/payment-provider` (mismo estilo que `/utils/payment-method`). Protegido por el `checkTokenController` global.
- Devuelve solo proveedores `isActive = true`, con `id`, `name`, `category` (`BANK` | `WALLET`), ordenados por categoría y nombre.
- Sin CRUD por ahora: los proveedores se cargan con el seeder `20261122000001-seed-payment-providers`.
- Flutter: `BANK` → número de cuenta + CCI; `WALLET` → solo celular. La regla de validación es la misma de `normalizeAccountByCategory`.

## Pendiente
- CRUD de proveedores (admin) si hace falta gestionarlos desde la app.
- Caché offline (Hive) del catálogo.
