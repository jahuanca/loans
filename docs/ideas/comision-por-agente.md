# Comisión por agente

> Estado: idea (sin implementar)
> Fecha: 2026-11-21
> Módulo: `loans_node`

## Contexto

Los usuarios ya tienen clientes asignados mediante el campo `idAssignedRecoveryAgent`. Se quiere que, al terminar un préstamo, se registre un porcentaje de la ganancia como comisión para el agente asignado, y llevar un registro de cuánto le toca cobrar por mes.

## Propuesta de diseño

### 1. Tabla de reglas `commission_rule`

El porcentaje por agente, con vigencia:

| Campo | Descripción |
|---|---|
| `idUser` | Agente al que aplica la regla |
| `percentage` | Porcentaje de comisión |
| `validFrom` | Inicio de vigencia |
| `validTo` | Fin de vigencia (null = vigente) |

Así, si mañana cambias el porcentaje, los préstamos antiguos se siguen calculando con el anterior.

### 2. Tabla detalle `agent_commission`

Se crea una fila cuando el préstamo pasa a estado *pagado*.

| Campo | Descripción |
|---|---|
| `idLoan` | Préstamo que generó la comisión |
| `idUser` | Agente (copia de `idAssignedRecoveryAgent` al momento del cierre) |
| `profit` | Ganancia del préstamo (intereses cobrados) |
| `percentage` | Copia del porcentaje vigente en ese momento |
| `amount` | Monto de la comisión (`profit * percentage / 100`) |
| `period` | Mes al que pertenece, por ejemplo `2026-11` |
| `status` | `pendiente` / `liquidada` |

### 3. Tabla `commission_payout`

Es el cierre del mes por agente, con el total y la fecha de pago. Cuando se le paga al agente, las comisiones de ese mes pasan a `liquidada`.

## Ideas clave

- Calcular la comisión en el use case que cierra el préstamo, dentro de la misma transacción, para que no se pierda ninguna.
- Tomar como agente el `idAssignedRecoveryAgent` del momento del cierre y guardarlo en la fila, por si después se reasigna el cliente.
- Agregar un endpoint `GET /agent-commission/summary?period=2026-11` que agrupe por agente.
- Más adelante se puede calcular la comisión sobre lo cobrado en cada pago, y no solo al terminar el préstamo, pero eso es más complejo.

## Siguiente paso sugerido

Implementarlo en `loans_node` usando el skill `loans-node-submodulo` (`commission_rule` como tabla de sistema, `agent_commission` como detalle del préstamo).
