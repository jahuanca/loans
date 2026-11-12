---
name: "loans-node-crud"
description: "Genera un CRUD completo (modelo, repositorios, use cases, controllers, validaciones, rutas y registro) para una entidad nueva en el backend loans_node."
---

# CRUD nuevo en loans_node

Proyecto Express 4 + Sequelize 6 (PostgreSQL), CommonJS. Arquitectura por módulo en `src/<modulo>/`:
`routes → validations → controllers → use_cases → repositories → db`.

## 1. Recoger datos antes de escribir

Pregunta (o deduce del pedido):
- Nombre de la entidad (singular, snake_case, ej. `guarantee`) y si es módulo nuevo o submódulo de uno existente (ej. dentro de `loan/` → usar subcarpetas `controllers/<entidad>/`, etc.).
- Campos: nombre, tipo, longitud, obligatorio o no.
- Asociaciones (`belongsTo` / `hasMany`) y foreign keys `id_<entidad>`.
- Si las rutas requieren permiso (`actionUser`) y qué acciones.

Antes de generar, lee un módulo de referencia para copiar el estilo exacto: `src/quota/` (simple) o `src/customer/` (con validaciones y permisos).

## 2. Nombres

Para entidad `foo_bar` (PascalCase `FooBar`, camel `fooBar`):

| Capa | Archivo | Export |
|---|---|---|
| modelo | `db/foo_bar_model.js` | `FooBar` |
| repositorio | `repositories/create_foo_bar_repository.js` | `createFooBarRepository` |
| use case | `use_cases/create_foo_bar_use_case.js` | `createFooBarUseCaseExecute` |
| controller | `controllers/create_foo_bar.js` | `createFooBarController` |
| validación | `validations/foo_bar_validation.js` | `createFooBarValidation`, `updateFooBarValidation` |
| rutas | `routes/foo_bar_routes.js` | `fooBarRoutes` |
| módulo | `index.js` | `setModuleFooBar` |

Acciones estándar: `create`, `get_foo_bars` (lista), `get_foo_bar` (uno), `update`, `delete`. Cada carpeta lleva un `index.js` que reexporta todo.

## 3. Plantillas

### Modelo
```js
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/db/connection');
const { typeOperationLog } = require('../../utils/core/default_values');
const { setLog } = require('../../utils/db/utils');

class FooBar extends Model {
    static associate(models) {
        // FooBar.belongsTo(models.Loan, { foreignKey: { name: 'id_loan', allowNull: false } })
    }
}

FooBar.init(
    {
        name: { type: DataTypes.STRING(100), allowNull: false },
        description_operation: { type: DataTypes.VIRTUAL },
        idUser: { type: DataTypes.VIRTUAL },
    },
    { paranoid: true, sequelize, modelName: 'FooBar' },
);

FooBar.afterUpdate((record) => {
    const { dataValues, _previousDataValues } = record
    setLog({
        tableName: FooBar.tableName,
        newValues: dataValues,
        oldValues: _previousDataValues,
        typeOperation: typeOperationLog.UPDATE,
        descriptionOperation: dataValues.description_operation,
        idUser: dataValues.idUser,
    })
})

module.exports = FooBar
```

### Repositorio
```js
const FooBar = require("../db/foo_bar_model");

const createFooBarRepository = ({ name }) => FooBar.create({ name })

module.exports = createFooBarRepository
```
Update: `FooBar.update({ ...campos }, { where: { id } })`. Delete: `FooBar.destroy({ where: { id } })` (borrado lógico por `paranoid`).

### Use case
```js
const { createFooBarRepository } = require("../repositories");

const createFooBarUseCaseExecute = ({ name }) => createFooBarRepository({ name })

module.exports = createFooBarUseCaseExecute
```

### Controller
```js
const { getPromise } = require("../../utils/core/helpers")
const createFooBarUseCaseExecute = require("../use_cases/create_foo_bar_use_case")

const createFooBarController = async (req, res, next) => {
    const { name } = req.value ?? req.body
    const [err, data] = await getPromise(createFooBarUseCaseExecute({ name }))
    if (err) {
        return next(err)
    }
    return res.status(200).json(data)
}

module.exports = createFooBarController
```
El id viene de `req.params.id` en get/delete y de `req.body.id` en update.

### Validación
```js
const Joi = require("joi")
const { joiString, joiId } = require("../../utils/validations/joi_values")
const validateSquema = require("../../utils/validations/validation")

const _squemaFooBar = {
    name: joiString(100).required(),
}

const squemaCreate = Joi.object(_squemaFooBar)
const squemaUpdate = Joi.object({ ..._squemaFooBar, id: joiId.required() })

const createFooBarValidation = (req, res, next) => validateSquema(req, res, next, squemaCreate)
const updateFooBarValidation = (req, res, next) => validateSquema(req, res, next, squemaUpdate)

module.exports = { createFooBarValidation, updateFooBarValidation }
```
Antes de crear un helper Joi nuevo, revisa `utils/validations/joi_values.js`.

### Rutas
```js
const { Router } = require("express")
const {
    getFooBarsController, getFooBarController, createFooBarController,
    updateFooBarController, deleteFooBarController,
} = require("../controllers")
const { createFooBarValidation, updateFooBarValidation } = require("../validations/foo_bar_validation")

const fooBarRoutes = Router()

fooBarRoutes.get('/', getFooBarsController)
fooBarRoutes.get('/id/:id', getFooBarController)
fooBarRoutes.post('/create', createFooBarValidation, createFooBarController)
fooBarRoutes.put('/update', updateFooBarValidation, updateFooBarController)
fooBarRoutes.delete('/delete/:id', deleteFooBarController)

module.exports = fooBarRoutes
```
Con permisos: `actionUser(defaultActions.FOO_BAR_GET_ALL)` (de `utils/core/action_user_middleware` y `utils/core/default_values`). Las acciones nuevas se añaden a `defaultActions` en `default_values.js`.

### Módulo
```js
const { checkTokenController } = require("../utils/controllers/app/app_controller")
const fooBarRoutes = require("./routes/foo_bar_routes")

const setModuleFooBar = (server) => {
    server.use(checkTokenController)
    server.use('/foo-bar', fooBarRoutes)
}

module.exports = setModuleFooBar
```

## 4. Registros obligatorios

1. Añadir el modelo al array de `src/utils/db/index.js` (y a `sync_models.js` si aplica).
2. Si es módulo nuevo: `require` en `src/app.js` y llamar a `setModuleFooBar(app)` **antes** de `setModuleError(app)`.
3. Si es submódulo: montar el router en el `index.js` del módulo padre.

## 5. Reglas

- Solo CommonJS (`require` / `module.exports`). Parámetros como objeto desestructurado.
- Sin try/catch en controllers: usar `getPromise` + `next(err)`. Lanzar `ErrorApp` / `ErrorServer` para errores de negocio.
- Columnas y FKs en snake_case; `modelName` en PascalCase.
- No ejecutar `npm run sync` ni tocar la BD sin confirmación del usuario. No leer `.env`.
- No modificar módulos existentes salvo los registros del paso 4.

## 6. Verificación final

- `node -e "require('./src/app.js')"` (o `node --check` en cada archivo nuevo) para detectar errores de require y sintaxis.
- Comprobar que cada `index.js` exporta todo lo que importan las rutas.
- Entregar al usuario la lista de archivos creados/modificados y los endpoints resultantes (método + URL).