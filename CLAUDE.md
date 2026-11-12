# loans_node — Backend de préstamos

API REST en **Node.js + Express 4 (CommonJS)** con **Sequelize 6 + PostgreSQL**. Gestiona clientes, préstamos, cuotas, renovaciones, movimientos de capital, usuarios/permisos y un chat con IA (LangChain + Gemini).

## Comandos

- `npm run dev` — levanta el servidor con `--watch` y carga `.env` (entrada: `main.js`).
- `npm run sync` — sincroniza los modelos con la BD (`src/utils/db/sync_models.js`). **No ejecutar sin pedir confirmación**: modifica la base de datos.
- No hay tests configurados todavía.
- No leer ni mostrar el contenido de `.env`.

## Arquitectura (Clean Architecture por módulo)

Cada módulo vive en `src/<modulo>/` (auth, user, customer, loan, quota, chat, video, utils, ai) y sigue este flujo:

```
routes → [validations] → controllers → use_cases → repositories → db (modelo Sequelize)
```

| Carpeta | Responsabilidad |
|---|---|
| `index.js` | `setModuleX(server)`: registra middlewares (p. ej. `checkTokenController`) y monta el router en `/<modulo>` |
| `routes/` | `Router()` de Express. Rutas tipo `GET /`, `GET /id/:id`, `POST /create`, `PUT /update`, `DELETE /delete/:id` |
| `validations/` | Esquemas Joi + middleware vía `validateSquema` |
| `controllers/` | Extrae datos de `req`, llama al use case con `getPromise`, responde `res.status(200).json(...)` o `next(err)` |
| `use_cases/` | Lógica de negocio; recibe un objeto con parámetros nombrados y llama a repositorios |
| `repositories/` | Acceso a datos con modelos Sequelize. Sin lógica HTTP |
| `db/` | Modelos Sequelize (`class X extends Model` + `X.init(...)`) |

Los módulos se registran en `src/app.js` (el orden importa: `setModuleError` va al final).

## Convenciones

- **Un archivo por acción** en controllers/use_cases/repositories, en `snake_case`:
  - `create_quota.js` → exporta `createQuotaController`
  - `create_quota_use_case.js` → exporta `createQuotaUseCaseExecute`
  - `create_quota_repository.js` → exporta `createQuotaRepository`
- Cada carpeta tiene un `index.js` que reexporta todo con `module.exports = { ... }`.
- Si el módulo tiene submódulos (ej. `loan/`), se usan subcarpetas: `controllers/loan/`, `controllers/renewal/`, etc.
- Usar siempre `require`/`module.exports` (CommonJS), nunca `import`.
- Parámetros como objeto desestructurado: `({ name, description, date }) => ...`.
- Controllers async con `const [err, data] = await getPromise(...)` (de `utils/core/helpers`); nunca try/catch suelto.
- Errores: lanzar `ErrorApp` / `ErrorServer` (`utils/core/error/errors.js`); el handler global responde.
- Validaciones: reutilizar helpers de `utils/validations/joi_values.js` (`joiString(n)`, `joiId`, `joiPhone`, `joiLatLong`). Esquema base `_squemaX`, `squemaCreate` y `squemaUpdate` (= base + `id`). Los valores validados quedan en `req.value`.
- Permisos: `actionUser(defaultActions.X)` (de `utils/core/action_user_middleware`) en la ruta; las acciones se definen en `utils/core/default_values.js`.
- Logs: usar `logger` de `utils/core/winston.js`, no `console.log`, en código nuevo.

## Modelos (Sequelize)

- Nuevos modelos en `src/<modulo>/db/<nombre>_model.js`, con `sequelize` importado de `utils/db/connection`.
- `paranoid: true` (borrado lógico) y `modelName` en PascalCase.
- Asociaciones en `static associate(models)` con `foreignKey` `id_<entidad>`.
- Columnas en `snake_case`; campos virtuales `description_operation` e `idUser` + hook `afterUpdate` con `setLog(...)` para la auditoría (ver `quota_model.js`).
- **Todo modelo nuevo debe registrarse** en el array de `src/utils/db/index.js` y, si aplica, en `sync_models.js`.

## Checklist: crear un CRUD nuevo para `<entidad>`

1. `db/<entidad>_model.js` y registrarlo en `utils/db/index.js`.
2. `repositories/` (create, get_all, get, update, delete) + `index.js`.
3. `use_cases/` (uno por repositorio) + `index.js`.
4. `controllers/` (uno por use case) + `index.js`.
5. `validations/<entidad>_validation.js` (create/update).
6. `routes/<entidad>_routes.js` con validaciones y `actionUser` si corresponde.
7. `index.js` del módulo (`setModule<Entidad>`) y registrarlo en `src/app.js` antes de `setModuleError`.

## Al trabajar en este repo

- Seguir exactamente el patrón de un módulo existente (`quota/` es el más simple; `customer/` incluye validaciones y permisos).
- No cambiar contratos de rutas existentes sin avisar (los consume un frontend).
- Ojo con nombres heredados con typos (`squema`, `ganancy`, `dasboard`): no renombrarlos salvo que se pida.
