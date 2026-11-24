# Plan: CI con GitHub Actions

**Estado:** en revisión (PR abierto)

## Objetivo
Que cada PR pase por un filtro automático antes de que Jose lo revise (paso 2 del plan de revisión por capas).

## Decisiones
- Un workflow por repo en `.github/workflows/ci.yml`, disparado en `pull_request` y en `push` a `main`.
- `loans`: Node 22, `npm install` (no hay `package-lock.json` versionado; está en `.gitignore`), caché de `~/.npm` con llave en `package.json`, `npm run lint --if-present` y `npm test -- --ci`.
- `loansFlutter`: Flutter 3.35.6 (igual que `.fvmrc`) con caché del SDK y de pub, `flutter analyze` y `flutter test` solo si existe `test/`.
- Los tests no tocan la BD (todo con `jest.mock`), así que CI no necesita Postgres ni `.env`.

## Pendiente / siguientes pasos
- Agregar un linter (ESLint) y un script `lint`.
- Versionar `package-lock.json` para usar `npm ci` (instalación reproducible).
- Marcar los checks como obligatorios en la protección de la rama `main`.
