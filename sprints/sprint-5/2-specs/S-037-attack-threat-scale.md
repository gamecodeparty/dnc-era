# S-037 — Escala de Ameaca no Alerta de Ataque

**Discovery:** D-056 (score 6/10, frequencia 2/6)
**Tipo:** Pain — Alerta "Ataque Chegando" nao indica tamanho da ameaca

---

## Objetivo

Adicionar indicacao de escala de ameaca ao alerta "Ataque Chegando" (implementado em S5, confirmado como feature de alto valor por G-022). O alerta atual informa QUE um ataque vem, mas nao QUAO serio eh. ARIA ficou ansiosa sem saber se eram 2 soldados ou 20 cavaleiros.

Esta spec amplifica uma feature ja consolidada como gain (3/6 elogiaram), adicionando a informacao que 2/6 pediram explicitamente.

---

## Implementacao

### 1. Classificar escala de ameaca

Definir thresholds baseados no poder de ataque relativo a defesa do territorio alvo:

```typescript
type ThreatScale = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

function classifyThreat(attackPower: number, defensePower: number): ThreatScale {
  const ratio = attackPower / Math.max(defensePower, 1);
  if (ratio < 0.8) return 'LOW';        // ataque fraco
  if (ratio < 1.2) return 'MEDIUM';     // combate equilibrado
  if (ratio < 1.5) return 'HIGH';       // provavel derrota
  return 'CRITICAL';                     // provavel conquista
}
```

### 2. Aplicar fog of war na estimativa

Para manter consistencia com o CombatPreview (que tem ±20% de erro para AI), a escala deve usar valor estimado com mesma margem:

```typescript
const estimatedAttackPower = actualAttackPower * (1 + (Math.random() * 0.4 - 0.2)); // ±20%
```

Isso evita que o alerta seja uma fonte de informacao perfeita (o que invalidaria o sistema de espionagem).

### 3. Indicacao visual no mapa

**Arquivo:** `/src/components/game/map/Territory.tsx`

No alerta de ataque existente, adicionar icone e cor por escala:

| Escala | Icone | Cor | Texto |
|--------|-------|-----|-------|
| LOW | ⚔️ | `text-yellow-400` | "Expedição pequena detectada" |
| MEDIUM | ⚔️⚔️ | `text-orange-400` | "Expedição média detectada" |
| HIGH | ⚔️⚔️⚔️ | `text-red-400` | "Expedição grande detectada" |
| CRITICAL | 💀 | `text-red-500 animate-pulse` | "Força esmagadora detectada!" |

### 4. Tooltip com estimativa numerica

Ao hover no alerta de ataque, tooltip mostra:

```
~{estimatedPower} de poder de ataque estimado
Sua defesa: {defensePower}
Estimativa: ±20% (envie Espião para valor exato)
```

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/map/Territory.tsx` | Icone e cor de escala no alerta de ataque + tooltip |
| `/src/game/engine/GameEngine.ts` ou store relevante | Funcao `classifyThreat()` + estimativa com fog of war |
| `/src/game/types/index.ts` | Tipo `ThreatScale` (se necessario) |

---

## Criterios de Aceite

1. Alerta "Ataque Chegando" exibe indicacao de escala (LOW/MEDIUM/HIGH/CRITICAL)
2. Escala eh baseada na relacao poder de ataque estimado vs defesa do territorio alvo
3. Estimativa tem margem de erro ±20% (fog of war) — nao eh valor exato
4. Cada escala tem icone e cor distintos
5. CRITICAL (ratio >= 1.5) usa animacao pulsante para urgencia visual
6. Tooltip no alerta mostra poder estimado vs defesa do jogador
7. Tooltip sugere enviar espiao para informacao precisa
8. Espiao (spy) revelado overrule a estimativa com valor exato (sem fog of war)
