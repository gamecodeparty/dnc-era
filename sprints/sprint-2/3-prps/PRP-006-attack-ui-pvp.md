# PRP-006 — UI de Ataque PvP

**Specs:** S-007
**Prioridade:** Score 10/10 (D-016 — ausência total de UI de ataque, 6/6 agentes afetados)
**Dependências:** Nenhuma

---

## Objetivo

Implementar o fluxo completo de ataque PvP iniciado pelo jogador: clicar em território inimigo no mapa → botão "Atacar" no bottom sheet → abrir ExpeditionModal em modo ataque → selecionar unidades → preview → confirmar → resultado no log. O backend de combate já existe (`CombatSystem.ts`), o store já tem `sendExpedition()`, e o `ExpeditionModal` já exibe preview. Falta o ponto de entrada na UI.

---

## Escopo

- **Store:** Evento detalhado de resultado de ataque em `gameStore`
- **Tela:** Botão "Atacar" no `TerritoryBottomSheet`, abertura do `ExpeditionModal` em modo ataque
- **Mapa:** Indicador visual de territórios atacáveis em `Territory.tsx`
- **Game page:** Estado `attackMode` para conectar bottom sheet ao modal

---

## Features

### F-020 — Botão "Atacar" no TerritoryBottomSheet

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:

Quando o território selecionado pertence a um inimigo:
- Exibir botão "Atacar" (vermelho, ícone de espada) abaixo das informações do território
- Condições de exibição: Era == WAR ou INVASION, território pertence a outro clã, jogador tem ≥1 território com unidades militares
- Quando desabilitado (exibir cinza com tooltip):
  - Era == PEACE → "Ataques disponíveis na Era da Guerra"
  - Jogador sem tropas → "Recrute unidades para atacar"
- Ao clicar, emitir callback `onAttack(territory)` para o componente pai

**Critérios de aceite:**
- Botão aparece em territórios inimigos durante Era da Guerra/Invasão
- Botão desabilitado com tooltip explicativo na Era da Paz ou sem tropas
- Clique no botão dispara callback (não abre modal diretamente)

### F-021 — Fluxo de ataque via ExpeditionModal

Em `/src/app/(game)/page.tsx` (ou componente que gerencia estado do mapa):

- Adicionar estado `attackTarget: Territory | null`
- Ao receber callback `onAttack(territory)` do bottom sheet:
  1. Fechar bottom sheet
  2. Definir `attackTarget` = território inimigo
  3. Abrir `ExpeditionModal` pré-configurado com `toTerritory` = território alvo, modo ATTACK
- `fromTerritory` = território do jogador mais próximo com unidades (ou primeiro da lista)
- Jogador seleciona unidades (controles +/- já existentes no ExpeditionModal)
- Preview de combate atualiza em tempo real (já implementado)
- Confirmar → `sendExpedition()` chamado com unidades selecionadas

**Critérios de aceite:**
- Clicar "Atacar" no bottom sheet abre ExpeditionModal pré-configurado
- Território de origem pré-selecionado automaticamente
- Preview de combate funciona com unidades selecionadas
- Confirmar ataque chama `sendExpedition()` com tipo ATTACK

### F-022 — Indicador visual de territórios atacáveis no mapa

Em `/src/components/game/map/Territory.tsx`:

Durante Era da Guerra/Invasão, territórios inimigos exibem indicador visual:
- Borda com animação pulse vermelha suave (`animate-pulse` com `ring-red-500/30`)
- Apenas se o jogador tem tropas disponíveis em algum território
- Hover tooltip: "Clique para ver opções de ataque"

**Critérios de aceite:**
- Territórios inimigos têm borda pulsante durante eras de combate
- Indicador não aparece se jogador não tem tropas
- Indicador não aparece na Era da Paz

### F-023 — Feedback pós-ataque no log de eventos

Em `/src/stores/gameStore.ts`:

Quando uma expedição ATTACK é resolvida em `processTurn()`:
- Adicionar evento no log com resultado detalhado:
  - Vitória: "Você atacou [território] de [clã]. VITÓRIA! Conquistou o território. Saqueou: +X grão, +Y madeira, +Z ouro. Perdas: N unidades."
  - Derrota: "Você atacou [território] de [clã]. DERROTA. Perdeu N soldados, M arqueiros."
- Incluir todos os campos de `CombatResult` no evento para display

**Critérios de aceite:**
- Resultado de ataque aparece como evento detalhado no log
- Evento inclui resultado (vitória/derrota), recursos saqueados (se vitória), e perdas
- Estilo visual distingue vitória (verde) de derrota (vermelho)

---

## Limites

- NÃO implementa integração de cartas no modal de ataque — isso é PRP-007
- NÃO altera a lógica de combate em `CombatSystem.ts` — apenas conecta a UI existente
- NÃO implementa ataque entre AIs — apenas ataques iniciados pelo jogador
- NÃO implementa seleção de múltiplos territórios de origem

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

PRP-007 (Cartas no Combate) depende deste PRP para integrar cartas ao modal de ataque.
