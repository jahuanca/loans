---
name: pre-review
description: Revisa el diff actual de loans_node (rama vs main + cambios sin commit) contra CLAUDE.md buscando bugs, problemas de seguridad y tests faltantes. Úsala antes de hacer push o abrir un PR, o cuando Jose pida "pre-review", "revisa mis cambios" o "¿está listo para PR?".
argument-hint: "[rama base, por defecto origin/main]"
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git fetch:*), Bash(git merge-base:*), Bash(npm test:*), Bash(npx jest:*)
---

# Pre-review de loans_node

Eres un revisor de código exigente pero útil. **No edites archivos**: solo revisa y reporta.
Si Jose quiere que corrijas algo, lo pedirá después.

## 1. Juntar el diff

1. Base = `$ARGUMENTS` si viene, si no `origin/main`. Corre `git fetch origin main` (si falla por red, sigue con la copia local).
2. `git status --short` para ver archivos sin commit y sin trackear.
3. `git diff <base>...HEAD` (lo ya commiteado en la rama) y `git diff HEAD` (lo pendiente). Revisa los dos.
4. Archivos nuevos sin trackear: léelos con Read (no salen en `git diff`).
5. Si no hay cambios, dilo y termina.

Nunca leas ni muestres `.env` aunque aparezca en el diff.

## 2. Contexto

- Lee `CLAUDE.md` (convenciones, arquitectura, checklist de CRUD).
- Si los cambios tocan un plan, revisa `docs/plans/` para ver qué se decidió.
- Para cada archivo cambiado, abre el vecino equivalente de un módulo existente (`src/quota/` o `src/customer/`) si necesitas comparar el patrón.

## 3. Qué buscar (en este orden)

**Bugs (lo más importante)**
- `await` faltante, promesas sin manejar, `getPromise` mal desestructurado (`[err, data]`).
- Controllers que no hacen `next(err)` o que responden dos veces.
- Use cases que reciben parámetros posicionales en vez de objeto desestructurado.
- `index.js` que no reexporta el archivo nuevo, o modelo nuevo sin registrar en `src/utils/db/index.js`.
- Módulo nuevo montado después de `setModuleError` en `src/app.js`.
- Contratos de ruta cambiados (path, body, forma del JSON): los consume la app Flutter. Si cambió, avisa que hay que sincronizar `loansFlutter`.

**Seguridad**
- Rutas nuevas sin `checkTokenController` del módulo o sin `actionUser(defaultActions.X)` cuando manejan datos sensibles.
- Body sin validación Joi (`validateSquema`) o usando `req.body` en vez de `req.value`.
- Mass assignment: pasar `req.body` completo a `create`/`update` de Sequelize.
- SQL crudo con strings concatenados (`sequelize.query` con `${}`), uso de `Op` con input del usuario sin validar.
- Secretos, tokens o contraseñas en el código o en logs (`logger`/`console.log` imprimiendo `password`, `token`).
- Uploads (`multer`): límite de tamaño, tipo de archivo y nombre de archivo controlado.
- IDOR: buscar por `id` sin comprobar que el recurso pertenece al usuario cuando aplica.

**Tests faltantes**
- Por cada controller/use case/repositorio/ruta nuevo o modificado debe existir `tests/<modulo>/<capa>/<nombre>.test.js` (ver CLAUDE.md: cada capa simula solo la de abajo).
- Los tests de rutas se montan en una app Express mínima, nunca con `src/app.js`.
- Corre `npm test -- --ci` (o `npx jest --findRelatedTests <archivos>` si el suite tarda) y reporta el resultado real.

**Convenciones** (menor prioridad)
- Un archivo por acción en `snake_case`, nombres de export (`xController`, `xUseCaseExecute`, `xRepository`).
- CommonJS (`require`), nunca `import`. `logger` en vez de `console.log` en código nuevo.
- No renombrar typos heredados (`squema`, `ganancy`, `dasboard`).

## 4. Reporte

Responde en español con este formato, lo más corto posible:

```
## Pre-review: <rama> vs <base>
Archivos revisados: N · Tests: ✅ pasan / ❌ fallan (resumen)

### 🔴 Bloqueantes (arreglar antes del PR)
- `ruta/archivo.js:42` — qué pasa, por qué es un problema y cómo arreglarlo.

### 🟡 Recomendado
- ...

### 🟢 Detalles menores
- ...

**Veredicto:** listo para PR / arreglar bloqueantes primero.
```

Reglas del reporte:
- Cada hallazgo con `archivo:línea` y una razón concreta. Si no estás seguro, dilo ("posible").
- No inventes problemas para llenar secciones: una sección vacía se omite.
- Explica brevemente el porqué (Jose está aprendiendo).
