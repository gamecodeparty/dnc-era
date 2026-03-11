# S-038 — Mostrar Territorio-Alvo da Horda

**Discovery:** D-044 (score 9/10, frequencia 4/6, persistente por 3 sprints)
**Tipo:** Pain — Defesa contra Horda eh jogo de azar sem informacao de localizacao

---

## Objetivo

Mostrar QUAL territorio sera atacado pela Horda com 1 turno de antecedencia no modal da Horda e no mapa. Atualmente o sistema informa QUEM sera atacado (clan com mais territorios), mas nao QUAL territorio especifico. Jogadores distribuem tropas aleatoriamente — a defesa contra a Horda eh literalmente sorte.

ARIA concentrou forcas em T6, Horda atacou T0. CAIUS com 5 territorios nao sabia onde reforcar. O pain afeta 4/6 jogadores e persiste por 3 sprints consecutivos.

A logica de selecao de territorio ja existe em `GameEngine.ts` (`findWeakestTerritory`) — o problema eh que essa informacao nao eh comunicada ao jogador.

---

## Implementacao

### 1. Expor territorio-alvo na preview da Horda

**Arquivo:** `/src/game/engine/GameEngine.ts`

A funcao `processHordaAttack()` ja calcula o territorio-alvo via `findWeakestTerritory()`. O calculo deve ser feito 1 turno ANTES do ataque e armazenado no estado do jogo para exibicao.

Adicionar ao estado da Horda (no turno anterior ao ataque):

```typescript
interface HordaPreview {
  targetClanId: string;
  targetTerritoryPosition: number;  // NOVO — posicao do territorio-alvo
  targetDefensePower: number;       // NOVO — poder defensivo atual
  attackStrength: number;
  turnsUntilAttack: number;
}
```

O calculo do territorio-alvo deve usar a mesma logica de `findWeakestTerritory()` — territorio com menor poder defensivo (units × defense values + wall bonus). Se o jogador reforcar o territorio entre a preview e o ataque, a Horda recalcula no turno do ataque (comportamento atual mantido).

### 2. Atualizar InvasionInfoModal

**Arquivo:** `/src/components/game/fx/InvasionInfoModal.tsx`

Adicionar secao no modal mostrando o territorio-alvo:

```
⚔️ Alvo Previsto: Territorio {position + 1}
🛡️ Defesa atual: {defensePower} poder
⚠️ Reforce este territorio — ou a Horda pode mudar para outro alvo mais fraco
```

O aviso de que a Horda pode mudar de alvo eh importante: se o jogador reforcar o territorio previamente mais fraco, a Horda recalcula e ataca o NOVO mais fraco. Isso cria uma decisao estrategica real (reforcar o alvo previsto vs distribuir uniformemente).

### 3. Indicacao visual no mapa

**Arquivo:** `/src/components/game/map/Territory.tsx`

No territorio-alvo da Horda (quando `hordaPreview.targetTerritoryPosition === territory.position`):

- Badge pulsante: `💀 Alvo da Horda` com `animate-pulse` e borda `border-red-500`
- Tooltip ao hover: "A Horda planeja atacar este territorio. Reforce a defesa ou redistribua tropas."

Isto ja existe parcialmente (linhas 158-197 do Territory.tsx mostram icone de caveira). Estender para usar a posicao especifica do `hordaPreview` em vez de apenas marcar o clan-alvo.

### 4. Timing da revelacao

A informacao do territorio-alvo deve ser revelada **1 turno antes** do ataque da Horda (quando `turnsUntilAttack === 1`). Revelar antes daria tempo demais para otimizar; revelar no mesmo turno nao permite reacao.

Se o jogador tiver espiao ativo em territorio inimigo, a informacao pode ser revelada com 2 turnos de antecedencia (bonus de inteligencia — reforca o valor da espionagem).

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/game/engine/GameEngine.ts` | Calcular territorio-alvo 1 turno antes; expor `targetTerritoryPosition` e `targetDefensePower` no `HordaPreview` |
| `/src/components/game/fx/InvasionInfoModal.tsx` | Exibir territorio-alvo, defesa atual e aviso de recalculo |
| `/src/components/game/map/Territory.tsx` | Badge pulsante no territorio-alvo especifico + tooltip |
| `/src/game/types/index.ts` | Estender interface `HordaPreview` com campos de territorio |
| `/src/stores/gameStore.ts` | Propagar `hordaPreview` atualizado para o estado reativo |

---

## Criterios de Aceite

1. Modal da Horda mostra qual territorio sera atacado (posicao + nome)
2. Modal mostra poder defensivo atual do territorio-alvo
3. Modal inclui aviso de que reforcar o alvo pode mudar a escolha da Horda
4. Mapa exibe badge pulsante `💀 Alvo da Horda` no territorio especifico
5. Tooltip no badge explica a situacao e sugere acao
6. Informacao eh revelada 1 turno antes do ataque (nao antes, nao no mesmo turno)
7. Se jogador reforcar o territorio-alvo, Horda recalcula no turno do ataque
8. Calculo de territorio-alvo usa mesma logica existente (`findWeakestTerritory`)
