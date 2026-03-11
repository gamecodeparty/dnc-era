# PRP-031 — Exibição do Território-Alvo da Horda

**Specs:** S-038
**Prioridade:** Score 9/10 (D-044 — Horda sem localização de território-alvo, 4/6, persistente por 3 sprints)
**Dependências:** Nenhuma

---

## Objetivo

Mostrar QUAL território será atacado pela Horda com 1 turno de antecedência, tanto no modal da Horda quanto no mapa. Atualmente o sistema informa QUEM será atacado (clã com mais territórios), mas não QUAL território específico. ARIA concentrou forças em T6 e a Horda atacou T0. CAIUS com 5 territórios não sabia onde reforçar. A defesa contra a Horda é literalmente um jogo de azar.

A lógica de seleção de território já existe em `GameEngine.ts` (`findWeakestTerritory`) — o problema é que essa informação não é comunicada ao jogador.

---

## Escopo

- **Engine:** `/src/game/engine/GameEngine.ts` — calcular território-alvo 1 turno antes e armazená-lo no estado
- **Tipos:** `/src/game/types/index.ts` — estender `HordaPreview` com `targetTerritoryPosition` e `targetDefensePower`
- **Store:** `/src/stores/gameStore.ts` — propagar `hordaPreview` atualizado para o estado reativo
- **Tela:** `/src/components/game/fx/InvasionInfoModal.tsx` — exibir território-alvo, defesa atual e aviso de recálculo
- **Tela:** `/src/components/game/map/Territory.tsx` — badge pulsante no território-alvo específico

---

## Features

### F-098 — Calcular e expor território-alvo da Horda 1 turno antes

Em `/src/game/engine/GameEngine.ts` e `/src/game/types/index.ts`:

Estender a interface `HordaPreview` com campos de território:

```typescript
interface HordaPreview {
  targetClanId: string;
  targetTerritoryPosition: number;  // NOVO — posição do território-alvo
  targetDefensePower: number;       // NOVO — poder defensivo atual
  attackStrength: number;
  turnsUntilAttack: number;
}
```

Na lógica de `processHordaAttack()`, calcular o território-alvo via `findWeakestTerritory()` 1 turno ANTES do ataque e armazenar no estado da Horda. Se `turnsUntilAttack === 1`, popular os campos `targetTerritoryPosition` e `targetDefensePower`.

**Critérios de aceite:**
- `HordaPreview` inclui `targetTerritoryPosition` e `targetDefensePower`
- Campos populados quando `turnsUntilAttack === 1`
- Cálculo usa mesma lógica de `findWeakestTerritory()` (território com menor poder defensivo)
- Se jogador reforçar o território entre preview e ataque, Horda recalcula no turno do ataque

### F-099 — Exibir território-alvo no InvasionInfoModal

Em `/src/components/game/fx/InvasionInfoModal.tsx`:

Adicionar seção no modal mostrando o território-alvo quando disponível (`turnsUntilAttack === 1`):

```
⚔️ Alvo Previsto: Território {position + 1}
🛡️ Defesa atual: {defensePower} poder
⚠️ Reforce este território — ou a Horda pode mudar para outro alvo mais fraco
```

O aviso de que a Horda pode mudar de alvo é importante: se o jogador reforçar o território previamente mais fraco, a Horda recalcula e ataca o NOVO mais fraco. Isso cria uma decisão estratégica real.

**Critérios de aceite:**
- Modal mostra qual território será atacado (posição + nome)
- Modal mostra poder defensivo atual do território-alvo
- Modal inclui aviso de que reforçar o alvo pode mudar a escolha da Horda
- Seção só aparece quando `turnsUntilAttack === 1` (não antes)

### F-100 — Badge pulsante no mapa para território-alvo da Horda

Em `/src/components/game/map/Territory.tsx`:

No território-alvo da Horda (quando `hordaPreview.targetTerritoryPosition === territory.position`):

- Badge pulsante: `💀 Alvo da Horda` com `animate-pulse` e borda `border-red-500`
- Tooltip ao hover: "A Horda planeja atacar este território. Reforce a defesa ou redistribua tropas."

Estender a lógica existente de ícone de caveira (linhas 158-197) para usar a posição específica do `hordaPreview` em vez de apenas marcar o clã-alvo.

**Critérios de aceite:**
- Badge pulsante `💀 Alvo da Horda` aparece no território específico (não em todos do clã)
- Borda vermelha (`border-red-500`) com animação `animate-pulse`
- Tooltip explica a situação e sugere ação
- Badge aparece apenas quando `turnsUntilAttack === 1`
- Badge desaparece após o ataque da Horda ser processado

---

## Limites

- NÃO altera a lógica de seleção de território da Horda — apenas expõe informação já calculada
- NÃO revela território-alvo com mais de 1 turno de antecedência (exceto com espião — feature futura)
- NÃO mostra território-alvo de outros clãs (apenas do jogador)
- NÃO adiciona animação de ataque da Horda no mapa

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

F-099 e F-100 dependem de F-098 (dados de território-alvo disponíveis no estado).
