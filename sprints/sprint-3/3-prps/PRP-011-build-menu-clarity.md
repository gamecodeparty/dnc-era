# PRP-011 — Clareza do Menu de Construção

**Specs:** S-013, S-014
**Prioridade:** Score 10/10 (D-028 — botões habilitados sem recursos, 6/6) + Score 9/10 (D-029 — sem preview de produção, 6/6)
**Dependências:** Nenhuma

---

## Objetivo

Tornar o menu de construção e treinamento informativo e honesto. Atualmente os botões aparecem clicáveis sem recursos (desperdiçando turnos em tentativas impossíveis) e não mostram o que cada estrutura produz (forçando decisão às cegas). Esta PRP resolve ambos os problemas no mesmo componente: desabilitar ações impossíveis com tooltip explicativo E mostrar produção/benefício antes de construir.

---

## Escopo

- **Tela:** `TerritoryBottomSheet` — seção de construção e treinamento
- **Tela:** `ExpeditionModal` — consistência visual dos botões "+" desabilitados
- **Dados:** `structures.ts` — referência de produção (sem alteração)

---

## Features

### F-033 — Desabilitar botões de construção quando custo > estoque

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:

Implementar função `canAfford(cost)` que compara custo da estrutura com recursos atuais do jogador.

**Quando `canAfford` retorna `false`:**
- Botão "Construir" recebe `disabled={true}`
- Cursor muda para `cursor-not-allowed`, opacidade `opacity-50`
- Label abaixo do botão: "Faltam: X madeira, Y ouro" (apenas recursos insuficientes)
- Cor do texto do custo insuficiente muda para vermelho (`text-red-400`)

**Quando `canAfford` retorna `true`:**
- Comportamento atual mantido (aviso proporcional F-032 se >80%)

Quando território já tem 4 estruturas (limite máximo):
- Desabilitar TODOS os botões de construção
- Mensagem no topo: "Território lotado (4/4 estruturas)"

**Critérios de aceite:**
- Botão "Construir" desabilitado (cinza, cursor not-allowed) sem recursos
- Tooltip mostra exatamente quais recursos faltam e quanto
- Território com 4/4 estruturas mostra mensagem e desabilita construção
- Aviso proporcional (F-032) continua funcionando para ações possíveis mas caras

### F-034 — Desabilitar botões de treinamento quando custo > estoque ou sem pré-requisito

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx` (seção de treinamento):

Mesma lógica `canAfford` para botões de treinar unidades (Soldado, Arqueiro, Cavaleiro, Espião):
- Verificar custo da unidade vs recursos atuais
- Desabilitar botão + tooltip "Faltam: X ouro, Y grão"
- Verificar pré-requisito de estrutura (ex: Barracks para Soldado)
  - Se estrutura ausente: tooltip "Requer: Quartel" ao invés de listar recursos

Consistência visual com botões "+" no `ExpeditionModal` (`/src/components/game/expedition/ExpeditionModal.tsx`).

**Critérios de aceite:**
- Botão "Treinar" desabilitado sem recursos ou sem estrutura pré-requisito
- Tooltip diferencia "recursos insuficientes" de "estrutura ausente"
- Botões "+" no ExpeditionModal seguem mesmo padrão visual

### F-035 — Labels de produção visíveis no card de estrutura

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx` (seção de construção):

Adicionar linha de produção abaixo do nome de cada estrutura no menu, usando dados de `/src/game/constants/structures.ts`:

**Estruturas de produção:**
- Farm: "+10 grão/turno"
- Sawmill: "+8 madeira/turno"
- Mine: "+5 ouro/turno"

**Estruturas militares:**
- Quartel: "Desbloqueia: Soldado, Arqueiro"
- Estábulo: "Desbloqueia: Cavaleiro"

**Estruturas especiais:**
- Muralha: "Defesa: +20% por nível"
- Taverna: "Gera cartas a cada X turnos"
- Guilda Sombras: "Desbloqueia: Espião"

Se a estrutura já existe no território (upgrade), mostrar produção do próximo nível: "+15 grão/turno (atual: +10)".

Cor da label de produção: usar cor do recurso (amber para grão, emerald para madeira, yellow para ouro).

**Critérios de aceite:**
- Cada estrutura no menu exibe o que produz/desbloqueia em texto visível (não apenas tooltip)
- Estruturas de produção mostram valor numérico: "+X recurso/turno"
- Upgrade mostra produção do próximo nível E produção atual
- Cores dos recursos consistentes (amber=grão, emerald=madeira, yellow=ouro)

### F-036 — Resumo de produção atual do território

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:

Abaixo da lista de estruturas disponíveis, adicionar resumo de produção atual do território:

```
Produção atual: 🌾10/t  🪵8/t  💰0/t
```

Isso dá contexto para o jogador decidir qual estrutura construir a seguir.

**Critérios de aceite:**
- Resumo de produção atual do território aparece na seção de construção
- Mostra produção de grão, madeira e ouro por turno
- Atualiza se o jogador construir uma estrutura (reflete nova produção)

---

## Limites

- NÃO altera a lógica de construção/treinamento no gameStore — apenas bloqueia na UI
- NÃO altera custos ou valores de produção — apenas exibe informação existente
- NÃO implementa preview para upgrades de nível 3 (se existirem)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
