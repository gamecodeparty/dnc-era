# PRP-009 — Clareza e Avisos de Custo

**Specs:** S-010, S-011
**Prioridade:** Score 7/10 (D-019 — custos contraintuitivos, 4/6 + D-020 — sem aviso proporcional, 3/6)
**Dependências:** Nenhuma

---

## Objetivo

Tornar os custos de construção e treino auto-explicativos e seguros. Dois eixos complementares: (1) labels que explicam o que cada estrutura produz/desbloqueia e nomes de recurso nos custos (S-010), e (2) modal de confirmação quando custo > 80% do estoque de algum recurso (S-011). Ambos atuam no mesmo componente (`TerritoryBottomSheet`) e resolvem dores de informação do mesmo fluxo.

---

## Escopo

- **Tela:** Labels de produção e custos nomeados no menu de construção em `TerritoryBottomSheet.tsx`
- **Store:** Função utilitária `getProportionalCostWarnings()` em `gameStore.ts`
- **Tela:** Modal de confirmação de custo elevado em `TerritoryBottomSheet.tsx`
- **Referência:** Dados de `structures.ts` (sem alteração)

---

## Features

### F-029 — Labels "Produz X / Desbloqueia Y" no menu de construção

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx` (ou componente de construção associado):

Para cada estrutura no menu de construção, adicionar label abaixo do nome:
- Farm: "Produz: Grão (+X/turno)"
- Sawmill: "Produz: Madeira (+X/turno)"
- Mine: "Produz: Ouro (+X/turno)"
- Barracks: "Desbloqueia: Soldado, Arqueiro"
- Stable: "Desbloqueia: Cavaleiro"
- Wall: "Defesa: +20% por nível"
- Tavern: "Gera cartas a cada X turnos"
- Shadow Guild: "Desbloqueia: Espião"

Buscar dados de `produces` e `productionPerLevel` em `/src/game/constants/structures.ts`.

**Critérios de aceite:**
- Cada estrutura exibe o que produz/desbloqueia abaixo do nome
- Informações visíveis sem hover em mobile (labels diretos)
- Dados vêm de `structures.ts` (não hardcoded no componente)

### F-030 — Nomes e ícones nos custos de construção

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:

Substituir display numérico puro por ícone + nome do recurso + quantidade:
- Cores consistentes: Grão = amber, Madeira = emerald, Ouro = gold
- Quando recurso insuficiente: custo em vermelho com texto "(insuficiente)"
- Para estruturas de produção (Farm, Sawmill, Mine): tooltip "Serraria produz Madeira mas não custa Madeira para construir"

**Critérios de aceite:**
- Custos exibem nome do recurso + ícone + quantidade
- Cores consistentes por tipo de recurso
- Insuficiente: vermelho com "(insuficiente)"
- Tooltip de diferenciação "produz vs consome" em estruturas de produção

### F-031 — Modal de confirmação de custo proporcional

Em `/src/stores/gameStore.ts`:
- Criar função `getProportionalCostWarnings(cost, resources)` que retorna warnings quando custo > 80% do estoque

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:
- Ao clicar "Construir" ou "Treinar", calcular warnings
- Se `warnings.length > 0`: exibir modal de confirmação com percentuais por recurso
- Visual: fundo amber, ícone ⚠, botão "Cancelar" proeminente, "Confirmar" neutro
- Se `warnings.length === 0`: executar ação diretamente

**Critérios de aceite:**
- Modal aparece quando custo > 80% de qualquer recurso
- Percentual exato por recurso afetado exibido
- Cancelar retorna sem penalidade
- Custo ≤ 80%: ação executa diretamente (sem modal)
- Funciona para construção E treino de unidades

### F-032 — Indicador ⚠ inline no botão de construção

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:

Antes de abrir o modal, indicar visualmente no botão:
- Se custo > 80% de algum recurso: ícone ⚠ ao lado do botão "Construir"/"Treinar"
- Tooltip: "Custo elevado — usa X% do seu estoque de [recurso]"

**Critérios de aceite:**
- Ícone ⚠ visível no botão quando custo > 80%
- Tooltip indica qual recurso e percentual
- Funciona para construção e treino

---

## Limites

- NÃO altera custos de construção ou balanceamento — apenas exibição
- NÃO implementa demolição de estruturas
- NÃO modifica `/src/game/constants/structures.ts` — apenas lê dados existentes
- NÃO adiciona confirmação para ações com custo < 80%

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
