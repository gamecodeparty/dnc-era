# S-004 — Implementar Unidade SPY para Faccao Umbral

**Discovery:** D-003 (score 8/10, frequencia 1/6 mas impacta integridade do produto)
**Tipo:** Pain — Faccao Umbral sem espioes

---

## Objetivo

A unidade SPY ja existe em `/src/game/constants/units.ts` (linhas 48-60) com stats definidos (atk: 0, def: 0, cost: 5 grain + 10 gold, requer SHADOW_GUILD). Porem nao esta integrada no fluxo client-side (Zustand gameStore). Implementar o ciclo completo: recrutar SPY → enviar para territorio inimigo → revelar tropas/estruturas → aplicar bonus Umbral (+30% eficiencia).

---

## Implementacao

### 1. Recrutamento de SPY

**Arquivo:** `/src/stores/gameStore.ts`

A action `trainUnit()` ja existe e recruta SOLDIER, ARCHER, KNIGHT. Garantir que tambem aceita `SPY`:
- Validar que territorio tem SHADOW_GUILD construido
- Deduzir custo (5 grain, 10 gold)
- Adicionar unidade SPY ao territorio

**Arquivo:** `/src/app/game/territory/[id]/page.tsx`

Na UI de recrutamento, adicionar SPY na lista de unidades treinaveis quando SHADOW_GUILD esta presente no territorio.

### 2. Enviar SPY em expedicao de reconhecimento

**Arquivo:** `/src/stores/gameStore.ts`

Adicionar novo tipo de expedicao:

```typescript
// No tipo Expedition, adicionar:
type: "ATTACK" | "RETURN_VICTORY" | "RETURN_DEFEAT" | "EXPLORE" | "RETURN_EXPLORE" | "REINFORCE" | "SPY" | "RETURN_SPY"
```

Nova action:

```typescript
sendSpy(fromTerritoryId: string, toTerritoryId: string): {
  success: boolean;
  message: string;
}
```

**Logica:**
- Validar que territorio de origem tem pelo menos 1 SPY
- Criar expedicao tipo `SPY` com 1 unidade SPY
- Travel time = distancia (Manhattan) / speed (1) = distancia em turnos
- Ao chegar: revelar composicao de tropas e estruturas do territorio alvo
- Criar expedicao `RETURN_SPY` para voltar

### 3. Resolucao de espionagem

**Arquivo:** `/src/stores/gameStore.ts` (dentro de `processTurn()`)

Quando expedicao SPY chega ao destino:
- Calcular sucesso: base 70% chance de sucesso
- Bonus Umbral: +30% = 100% para Umbral (sempre sucesso)
- Sucesso: adicionar territorio alvo a `revealedTerritories` no state
- Falha: SPY eh capturado (perdido), evento no log

```typescript
// Adicionar ao state:
revealedTerritories: Record<string, {
  units: Unit[];
  structures: Structure[];
  revealedAt: number;  // turno em que foi revelado
  expiresAt: number;   // turno em que informacao expira (revealedAt + 5)
}>
```

### 4. Exibicao de informacao revelada

**Arquivo:** `/src/components/game/map/Territory.tsx`

- Se territorio esta em `revealedTerritories` e nao expirou: mostrar icone de olho + tooltip com tropas e estruturas
- Se expirado: remover indicador

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

- Se territorio alvo esta revelado: mostrar defesa exata no preview de combate (S-001)

### 5. UI para enviar SPY

**Arquivo:** `/src/app/game/page.tsx` ou `ExpeditionModal.tsx`

- Ao selecionar territorio inimigo, se jogador tem SPY, exibir opcao "Enviar Espiao" alem de "Atacar"
- Modal simplificado: "Enviar espiao para [territorio]? Chance de sucesso: X%"

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | `sendSpy()`, resolver espionagem em `processTurn()`, `revealedTerritories` |
| `/src/game/types/index.ts` | Tipo `SPY`/`RETURN_SPY` em Expedition, interface `RevealedTerritory` |
| `/src/app/game/territory/[id]/page.tsx` | Exibir SPY na UI de recrutamento |
| `/src/components/game/map/Territory.tsx` | Indicador visual de territorio revelado |
| `/src/components/game/expedition/ExpeditionModal.tsx` | Opcao "Enviar Espiao", integrar com preview |

---

## Criterios de Aceite

1. SPY aparece na lista de recrutamento quando SHADOW_GUILD esta construido
2. Jogador pode enviar SPY para territorio inimigo
3. SPY viaja por N turnos (distancia) e ao chegar revela tropas e estruturas
4. Bonus Umbral (+30%) eh aplicado na chance de sucesso
5. Informacao revelada expira apos 5 turnos
6. Territorio revelado mostra icone visual no mapa
7. Preview de combate (S-001) usa informacao exata quando territorio esta revelado
8. SPY capturado gera evento no log
