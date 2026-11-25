#!/usr/bin/env node
// Hook PostToolUse: corre DESPUÉS de que Claude edita/crea un archivo (Edit, Write o MultiEdit).
//
// Cómo funciona un hook "command":
//   1. Claude Code ejecuta este script y le pasa por stdin un JSON con el evento,
//      por ejemplo: { "hook_event_name": "PostToolUse", "tool_name": "Edit",
//                     "tool_input": { "file_path": "D:/.../src/quota/x.js", ... }, "cwd": "..." }
//   2. El script decide qué revisar y termina con un código de salida:
//        exit 0 -> todo bien, Claude sigue sin enterarse (no molesta).
//        exit 2 -> "bloqueo": lo que escribamos en stderr se le muestra a Claude
//                  para que corrija el error en el siguiente paso.
//        otro   -> error no bloqueante: solo se ve en modo verbose (ctrl+o).
//
// Qué revisa aquí (rápido, solo el archivo tocado):
//   - Que el .js tenga sintaxis válida (`node --check`).
//   - Los tests de Jest relacionados con ese archivo (`jest --findRelatedTests`).
//     Si node_modules no existe, se salta Jest para no estorbar.

const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const readStdin = () => {
  try {
    return fs.readFileSync(0, 'utf8')
  } catch {
    return ''
  }
}

const run = (cmd, args, cwd) => {
  const result = spawnSync(cmd, args, {
    cwd,
    encoding: 'utf8',
    // En Windows `npx` es un .cmd y necesita shell.
    shell: process.platform === 'win32',
    timeout: 90_000
  })
  return {
    ok: result.status === 0,
    output: `${result.stdout || ''}${result.stderr || ''}`.trim()
  }
}

// Recorta la salida para no llenarle el contexto a Claude.
const tail = (text, lines = 40) => text.split('\n').slice(-lines).join('\n')

const main = () => {
  let event = {}
  try {
    event = JSON.parse(readStdin() || '{}')
  } catch {
    process.exit(0) // JSON raro: no bloqueamos nada.
  }

  const filePath = event.tool_input && event.tool_input.file_path
  if (!filePath || !filePath.endsWith('.js')) process.exit(0)

  const projectDir = process.env.CLAUDE_PROJECT_DIR || event.cwd || process.cwd()
  const relative = path.relative(projectDir, filePath).split(path.sep).join('/')

  // Solo código del proyecto: src/ y tests/. Nada de node_modules, config, etc.
  if (!/^(src|tests)\//.test(relative)) process.exit(0)
  if (!fs.existsSync(filePath)) process.exit(0)

  const problems = []

  const syntax = run(process.execPath, ['--check', filePath], projectDir)
  if (!syntax.ok) {
    problems.push(`Error de sintaxis en ${relative}:\n${tail(syntax.output)}`)
  }

  const jestBin = path.join(projectDir, 'node_modules', 'jest', 'bin', 'jest.js')
  if (syntax.ok && fs.existsSync(jestBin)) {
    const tests = run(
      process.execPath,
      [jestBin, '--findRelatedTests', filePath, '--passWithNoTests', '--silent'],
      projectDir
    )
    if (!tests.ok) {
      problems.push(`Fallan tests relacionados con ${relative}:\n${tail(tests.output)}`)
    }
  }

  if (problems.length > 0) {
    process.stderr.write(
      `[hook check_edited_js] ${problems.join('\n\n')}\n\n` +
        'Corrige el problema antes de seguir (no desactives ni saltes tests).\n'
    )
    process.exit(2)
  }

  process.exit(0)
}

main()
