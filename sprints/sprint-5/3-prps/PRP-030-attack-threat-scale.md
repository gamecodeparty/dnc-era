# PRP-030 — Escala de Ameaça no Alerta de Ataque

**Specs:** S-037
**Prioridade:** Score 6/10 (D-056 — alerta ataque sem escala de ameaça, 2/6)
**Dependências:** Nenhuma

---

## Objetivo

Adicionar indicação de escala de ameaça ao alerta "Ataque Chegando" (implementado em sprint anterior, confirmado como feature de alto valor por G-022 com 3/6 elogiando). O alerta atual informa QUE um ataque vem, mas não QUÃO sério é. ARIA ficou ansiosa sem saber se eram 2 soldados ou 20 cavaleiros.

Esta PRP amplifica uma feature já consolidada como gain, adicionando a informação que 2/6 pediram explicitamente.

---

## Escopo

- **Tela:** `/src/components/game/map/Territory.tsx` — ícone e cor de escala no alerta + tooltip
- **Engine:** `/src/game/engine/GameEngine.ts` ou store — função `classifyThreat()` + estimativa com fog of war
- **Tipos:** `/src/game/types/index.ts` — tipo `ThreatScale`

---

## Features

### F-095 — Classificação de escala de ameaça com fog of war

Em `/src/game/engine/GameEngine.ts` ou store relevante:

```typescript
type ThreatScale = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

function classifyThreat(attackPower: number, defensePower: number): ThreatScale {
  const ratio = attackPower / Math.max(defensePower, 1);
  if (ratio < 0.8) return 'LOW';
  if (ratio < 1.2) return 'MEDIUM';
  if (ratio < 1.5) return 'HIGH';
  return 'CRITICAL';
}
```

Aplicar fog of war (±20%) na estimativa para consistência com CombatPreview:

```typescript
const estimatedAttackPower = actualAttackPower * (1 + (Math.random() * 0.4 - 0.2));
```

Espião ativo no território overrule a estimativa com valor exato (sem fog of war).

**Critérios de aceite:**
- Escala calculada baseada em ratio ataque estimado vs defesa do território
- Estimativa tem margem ±20% (fog of war)
- Espião ativo revela valor exato sem fog of war
- Tipo `ThreatScale` definido em types

### F-096 — Indicação visual de escala no mapa

Em `/src/components/game/map/Territory.tsx`:

No alerta de ataque existente, aplicar ícone e cor por escala:

| Escala | Ícone | Cor | Texto |
|--------|-------|-----|-------|
| LOW | ⚔️ | `text-yellow-400` | "Expedição pequena detectada" |
| MEDIUM | ⚔️⚔️ | `text-orange-400` | "Expedição média detectada" |
| HIGH | ⚔️⚔️⚔️ | `text-red-400` | "Expedição grande detectada" |
| CRITICAL | 💀 | `text-red-500 animate-pulse` | "Força esmagadora detectada!" |

**Critérios de aceite:**
- Cada escala tem ícone e cor distintos
- CRITICAL usa animação pulsante para urgência visual
- Escala LOW/MEDIUM/HIGH/CRITICAL visualmente distinguível

### F-097 — Tooltip com estimativa numérica no alerta

Em `/src/components/game/map/Territory.tsx`:

Ao hover no alerta de ataque, tooltip mostra:

```
~{estimatedPower} de poder de ataque estimado
Sua defesa: {defensePower}
Estimativa: ±20% (envie Espião para valor exato)
```

Com espião ativo, tooltip mostra valor exato sem a ressalva de ±20%.

**Critérios de aceite:**
- Tooltip mostra poder estimado vs defesa do jogador
- Tooltip sugere enviar espião para informação precisa
- Com espião ativo, tooltip mostra valor exato
- Tooltip aparece ao hover no badge de alerta

---

## Limites

- NÃO altera lógica de detecção de ataques iminentes — apenas enriquece a visualização
- NÃO revela identidade do clã atacante (exceto com espião)
- NÃO revela composição detalhada de tropas (apenas poder total estimado)
- NÃO implementa contra-ataque automático baseado na escala

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

Complementa o sistema de alerta de ataque iminente implementado em sprints anteriores (F-058/F-059 do PRP-018).
