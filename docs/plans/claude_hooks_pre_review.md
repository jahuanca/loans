# Plan: hook PostToolUse + skill pre-review

**Estado:** en revisión (PR abierto)

## Objetivo
Revisar el código localmente antes del PR (rápido y barato), antes de sumar un agente de review en el PR con `claude-code-action`. Paso 1 del plan de revisión por capas: hook → skill pre-review → CI → agente en PR.

## Decisiones
- Hook `PostToolUse` con matcher `Edit|Write|MultiEdit` en `.claude/settings.json` (versionado, compartido). Script en Node para que funcione igual en Windows y Linux.
- Solo revisa el archivo tocado, para que sea rápido (~1 s): `node --check` + `jest --findRelatedTests --passWithNoTests`. Ignora archivos fuera de `src/` y `tests/`.
- Exit 0 = silencio; exit 2 = Claude recibe el error por stderr y lo corrige. Si no hay `node_modules`, se salta Jest.
- Skill `.claude/skills/pre-review/` de solo lectura (`allowed-tools` limitado a git, lectura y tests). Reporta bloqueantes / recomendados / menores con `archivo:línea`.
- Lo mismo en `loansFlutter` con `dart analyze` del archivo editado.

## Pendiente / siguientes pasos
- Agregar ESLint y sumarlo al hook.
- Hook `PreToolUse` que bloquee leer `.env` (ejemplo de bloqueo antes de ejecutar).
- Correr `pre-review` en un subagente (`context: fork`) para no llenar el contexto principal.
- Agente de review en el PR con `claude-code-action`.
