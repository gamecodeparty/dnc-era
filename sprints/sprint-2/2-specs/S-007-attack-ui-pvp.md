# S-007 — UI de Ataque PvP

**Discoveries:** D-016 (score 10/10, frequencia 6/6), D-001 (score 10/10, frequencia 6/6)
**Tipo:** Pain — Ausencia total de UI de ataque + combate as cegas

---

## Objetivo

Permitir que o jogador ataque territorios inimigos clicando neles no mapa durante a Era da Guerra e Era da Invasao. O backend de combate ja existe (`CombatSystem.ts` com `executeCombat()`), o store ja tem `sendExpedition()` que cria expedições de tipo ATTACK, e o `ExpeditionModal` ja exibe preview de combate. O que falta eh o **ponto de entrada**: o jogador clicar num territorio inimigo e abrir o modal de ataque.

Atualmente, clicar num territorio inimigo abre o `TerritoryBottomSheet` que mostra informacoes do territorio mas nao oferece acao de ataque. A spec S-001 (sprint 1) ja definiu o preview de combate no `ExpeditionModal` — esta spec foca em conectar o fluxo de clique no mapa ao modal de expedicao/ataque.

---

## Implementacao

### 1. Botao "Atacar" no TerritoryBottomSheet para territorios inimigos

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx`

Quando o territorio selecionado pertence a um inimigo E a era atual eh WAR ou INVASION:

- Exibir botao "Atacar" proeminente (vermelho, icone de espada) abaixo das informacoes do territorio
- Ao clicar, fechar o bottom sheet e abrir o `ExpeditionModal` com:
  - `toTerritory` = territorio inimigo selecionado
  - `fromTerritory` = territorio do jogador mais proximo com unidades (ou primeiro da lista)
  - modo ATTACK

**Condicoes de exibicao:**
- Era atual == WAR ou INVASION
- Territorio pertence a outro clan (nao ao jogador, nao neutro)
- Jogador possui pelo menos 1 territorio com unidades militares

**Quando desabilitado (exibir mas cinza com tooltip):**
- Era == PEACE → tooltip: "Ataques disponiveis na Era da Guerra"
- Jogador sem tropas → tooltip: "Recrute unidades para atacar"

### 2. Fluxo de ataque via mapa (atalho)

**Arquivo:** `/src/app/(game)/page.tsx` ou componente que gerencia estado do mapa

Adicionar estado `attackMode`:

```typescript
const [attackMode, setAttackMode] = useState(false);
const [selectedAttackFrom, setSelectedAttackFrom] = useState<Territory | null>(null);
```

**Fluxo:**
1. Jogador clica em territorio inimigo → abre TerritoryBottomSheet
2. Jogador clica "Atacar" → fecha bottom sheet, abre ExpeditionModal pre-configurado
3. Jogador seleciona territorio de origem (dropdown no ExpeditionModal — ja existe)
4. Jogador seleciona unidades (controles +/- — ja existem)
5. Preview de combate atualiza em tempo real (ja implementado em ExpeditionModal)
6. Jogador confirma → `sendExpedition()` eh chamado com as unidades selecionadas
7. Resultado da expedicao resolvido no `processTurn()` quando tropas chegam

### 3. Indicacao visual no mapa de territorios atacaveis

**Arquivo:** `/src/components/game/map/Territory.tsx`

Durante Era da Guerra/Invasao, territorios inimigos devem ter indicador visual sutil:
- Borda com animacao pulse vermelha suave (CSS: `animate-pulse` com `ring-red-500/30`)
- Apenas se o jogador tem tropas disponiveis
- Hover tooltip: "Clique para ver opcoes de ataque"

### 4. Feedback pos-ataque

**Arquivo:** `/src/stores/gameStore.ts`

Quando uma expedicao ATTACK eh resolvida em `processTurn()`:
- Adicionar evento no log com resultado detalhado:
  - "Voce atacou [territorio] de [clan]. VITORIA! Conquistou o territorio. Saqueou: +X grao, +Y madeira, +Z ouro. Perdas: 2 soldados."
  - "Voce atacou [territorio] de [clan]. DERROTA. Perdeu 3 soldados, 1 arqueiro."
- O evento deve incluir todos os campos de `CombatResult` para display

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/mobile/TerritoryBottomSheet.tsx` | Adicionar botao "Atacar" condicional |
| `/src/app/(game)/page.tsx` | Gerenciar abertura do ExpeditionModal a partir do bottom sheet |
| `/src/components/game/map/Territory.tsx` | Indicador visual de territorio atacavel |
| `/src/stores/gameStore.ts` | Evento detalhado de resultado de ataque no log |

---

## Criterios de Aceite

1. Na Era da Guerra ou Invasao, clicar num territorio inimigo mostra botao "Atacar" no bottom sheet
2. Clicar "Atacar" abre o ExpeditionModal pre-configurado com o territorio alvo
3. Preview de combate (ataque vs defesa, chance de vitoria) aparece ao selecionar unidades
4. Confirmar ataque chama `sendExpedition()` e cria expedicao de tipo ATTACK
5. Resultado do combate aparece como evento detalhado no log quando tropas chegam
6. Na Era da Paz, botao "Atacar" aparece desabilitado com tooltip explicativo
7. Territorios inimigos tem indicador visual sutil durante eras de combate
8. Jogador sem tropas ve botao "Atacar" desabilitado com tooltip "Recrute unidades"
