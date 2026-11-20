---
name: loans-node-submodulo
description: Crea un submódulo CRUD (maestro, detalle o de sistema) dentro de un módulo existente de loans_node. Úsalo cuando Jose pida un submódulo; para módulos nuevos usa loans-node-crud.
---

# Creación de submódulo en loans_node

## Requisito previo
El módulo padre (ej. `customer/`) ya debe existir con `controllers/`, `use_cases/`, `repositories/`, `routes/`, `validations/` e `index.js`. Si no existe, detente y sugiere usar `loans-node-crud` primero.
El modelo Sequelize debe existir en `utils/db/`. Léelo (campos, FKs, hooks, índices únicos) antes de escribir código.

## Paso 1: identificar el tipo de tabla
Si Jose no lo dice, dedúcelo del modelo y confírmalo:
- **Maestro**: entidad propia con muchos registros (ej. customer). Necesita búsqueda y paginación.
- **Detalle**: depende de un padre por FK (ej. customer_payment_account). Se lista por padre.
- **Sistema / catálogo**: pocos registros, casi estáticos (ej. type_customer, payment_provider). Se lista completo, a menudo solo activos.

## Paso 2: endpoints según el tipo (todos con token)
Comunes a todos:
- `GET /id/:id`
- `POST /create`
- `PUT /update`
- `DELETE /delete/:id` borrado lógico

Listados:
| Endpoint | Maestro | Detalle | Sistema |
|---|---|---|---|
| `GET /all` lista todo (activos) | opcional | no | sí |
| `GET /paginated?limit=&offset=` (+ filtros opcionales) | sí | opcional | no |
| `GET /<padre>/:id<Padre>` lista por padre | no | sí | no |

Paginación: validar `limit` y `offset` como enteros (`limit` con máximo, ej. 100, y valor por defecto), usar `findAndCountAll` y responder `{ rows, count, limit, offset }`.
Detalle: en update no permitir cambiar la FK del padre; validar que el padre exista.
Sistema: considerar si create/update/delete deben restringirse a administradores; preguntar a Jose.

## Estructura a crear
Dentro del módulo padre, con `<sub>` en snake_case:
- `controllers/<sub>/index.js` + un archivo por acción
- `use_cases/<sub>/index.js` + un archivo por acción
- `repositories/<sub>/index.js` + un archivo por acción
- `routes/<sub>_routes.js`
- `validations/<sub>_validation.js`
- Registrar la ruta en `<modulo>/index.js` bajo `/<sub-en-kebab-case>`

Toma como referencia un submódulo existente (ej. `customer/type_customer` o `customer/customer_payment_account`).

## Reglas
1. Reglas de negocio en los use cases, no en controllers ni repositorios.
2. Repositorios que usan `include` importan `const { models } = require('<ruta>/utils/db')` para garantizar que `associate()` se ejecutó. Los que no usan `include` pueden importar el modelo directo.
3. Respetar índices únicos (ej. un solo registro principal por padre) usando transacciones.
4. Revisar hooks de auditoría del modelo (`idUserOfOperation`) y que el campo virtual coincida.
5. No usar `actionUser` en rutas nuevas si las acciones no están sembradas en la BD; avisar a Jose.

## Tests
Un archivo por pieza en `tests/<modulo>/controllers`, `use_cases` y `repositories`. Cada capa simula solo la de abajo. Todo `jest.mock` de módulos que tocan la BD lleva factory. Incluir casos de paginación (límites por defecto, máximo, valores inválidos). Correr toda la suite.

## Cierre
No hacer commit sin OK de Jose. Resumir tipo de tabla, endpoints, estructura y decisiones con su porqué (es un proyecto de aprendizaje) y sugerir `/code-review`.
