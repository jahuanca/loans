# Roadmap: aprender agentes, harness e IA con loans

**Estado:** en pausa (Jose está trabajando en funcionalidades de la app). Para retomarlo, escribe en el proyecto: **"retomemos el roadmap"**.

Este archivo es el índice de todo el camino. Cada paso tiene (o tendrá) su propio plan detallado en `docs/plans/`.

## Hecho

| # | Paso | Qué aprendiste | Dónde vive |
|---|---|---|---|
| ✅ | `CLAUDE.md` en ambos repos | Darle contexto permanente al agente: arquitectura, convenciones, comandos y reglas | `CLAUDE.md` |
| ✅ | Skill `loans-node-crud` (y `loans-node-submodulo`, `loans-flutter-feature`) | Empaquetar un procedimiento repetible en una skill que el agente carga cuando la necesita | `.claude/skills/` |
| ✅ | CI con GitHub Actions + ruleset `proteger-main` | Un filtro automático en cada PR; checks obligatorios "Tests (Jest)" / "Analyze y tests" | `.github/workflows/ci.yml`, `docs/plans/ci_github_actions.md` |
| ✅ | Hook `PostToolUse` + skill `/pre-review` | El harness corre checks solo (exit 2 = Claude ve el error y lo corrige); revisión local antes del PR | `.claude/settings.json`, `.claude/hooks/`, `docs/plans/claude_hooks_pre_review.md` |

## Pendiente (en este orden)

### 1. Agente revisor de PRs con `claude-code-action` ⏸️ (en pausa, sin commits todavía)
Lo que ya quedó decidido y preparado:
- Autenticación con la suscripción de Claude: Jose corre `claude setup-token` en su máquina y guarda el token como secreto del repo `CLAUDE_CODE_OAUTH_TOKEN` (Settings → Secrets and variables → Actions). Lo hace Jose; Claude no puede crear secretos.
- Acción: `anthropics/claude-code-action@v1`. Requiere la GitHub App de Claude instalada en el repo.
- Dos workflows por repo (`loans` y `loansFlutter`), un PR por repo:
  - `.github/workflows/claude-review.yml`: review automático en `pull_request` con `types: [opened, reopened, ready_for_review]` (no en cada push, para ahorrar uso), filtro `paths` para que solo corra si cambia código (`src/**`, `tests/**` en loans; `lib/**`, `test/**` en Flutter), `concurrency` por PR, permisos `contents: read`, `pull-requests: write`, `id-token: write`, y `--max-turns` para limitar el consumo.
  - Prompt corto en español: solo bugs y seguridad según `CLAUDE.md` (el `/pre-review` local ya filtra lo demás), comentarios inline solo para problemas importantes (`mcp__github_inline_comment__create_inline_comment`) y un comentario resumen con `gh pr comment`. `--allowedTools` limitado a esas herramientas + `gh pr diff` / `gh pr view`.
  - `.github/workflows/claude.yml`: responde cuando alguien escribe `@claude` en un comentario del PR (`issue_comment`, `pull_request_review_comment`, `pull_request_review`). La acción solo obedece a usuarios con permiso de escritura en el repo. Sirve para pedir "@claude revisa otra vez" tras nuevos commits o "@claude arregla esto".
- Los hooks de `.claude/settings.json` también corren dentro de la acción; ya se degradan bien (sin `node_modules` se salta Jest; sin `dart` el hook de Flutter no bloquea).
- En `loansFlutter` hay que pedir OK de Jose antes de cada commit.
- Ojo: la rama por defecto de `loans` es `trunk`, no `main`.

### 2. Subagentes propios en `.claude/agents/`
- `security-auditor`: solo lectura, busca vulnerabilidades (auth, inyección, secretos, permisos `actionUser`).
- `test-writer`: escribe tests de Jest siguiendo la estructura `tests/<modulo>/{controllers,use_cases,repositories,routes}/`.
- Aprender: frontmatter (`tools`, `model`), contexto aislado y cuándo delegar.

### 3. MCP hacia la BD de loans
- Conectar un servidor MCP de PostgreSQL (idealmente con un usuario de solo lectura) para que el agente consulte datos reales sin tocar código.

### 4. IA dentro del producto con la API de Claude
- Scoring de riesgo de un préstamo (historial de cuotas, renovaciones, atrasos).
- Resumen de un cliente (préstamos, pagos, comportamiento).
- Hoy el chat usa LangChain + Gemini; evaluar agregar Claude como proveedor.

## Sugerencias extra (pequeñas, buenas para aprender)
- Hook `PreToolUse` que bloquee leer `.env` (ejemplo de bloquear *antes* de ejecutar, con exit 2).
- Mover `/pre-review` a un subagente (`context: fork`) para no llenar el contexto principal.
- ESLint + script `lint` (el CI y el hook ya lo usarían).
- Versionar `package-lock.json` para usar `npm ci`.
