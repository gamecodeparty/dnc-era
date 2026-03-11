# PRP-022 — Dicas de Onboarding Expandidas

**Specs:** S-023, S-028
**Prioridade:** Score 8/10 (D-041 — deadlock econômico, 2/6) + Score 7/10 (D-030 — cartas ignoradas, 2/6)
**Dependências:** Nenhuma

---

## Objetivo

Expandir o sistema de TipBanner (PRP-017, F-053/F-054/F-055) com novas dicas que resolvem dois problemas persistentes: (1) deadlock econômico por ordem de build errada — Beto e Felix construíram Wall ou Barracks antes de Farm/Sawmill/Mine e ficaram sem recursos; (2) cartas descobertas tardiamente — Felix só usou cartas no turno 18.

O sistema de tips já existe e funciona. Esta PRP apenas adiciona novos triggers e um alerta inline contextual no menu de construção.

---

## Escopo

- **Hook:** `/src/hooks/useTips.ts` — 4 novos tips (tip-07, tip-08, tip-09, tip-10)
- **Tela:** `/src/components/game/mobile/TerritoryBottomSheet.tsx` — alerta inline no menu de construção

---

## Features

### F-071 — Tips de deadlock econômico

Em `/src/hooks/useTips.ts`:

Adicionar ao array `TIP_DEFINITIONS`:

**tip-07-deadlock-warning** (prioridade alta):
- Trigger: jogador construiu estrutura mas NENHUMA é produtiva, turnos 1-5
- Mensagem: "⚠ Atenção: você não tem estruturas de produção! Sem Farm, Sawmill ou Mine, seus recursos não vão crescer. Construa uma estrutura produtiva o quanto antes."
- Priority: 10 (sobrepõe tips normais)

**tip-08-zero-production** (urgência):
- Trigger: turno >= 3 E produção de grão, madeira E ouro = 0
- Mensagem: "🚨 Produção zerada! Você não está gerando nenhum recurso. Construa Farm (grão), Sawmill (madeira) ou Mine (ouro) para sair do deadlock."
- Priority: 15

Requer adicionar `playerGrainProduction`, `playerWoodProduction`, `playerGoldProduction` e `playerStructureTypes` ao estado do trigger (calcular a partir de estruturas do jogador).

**Critérios de aceite:**
- TipBanner aparece quando jogador construiu estrutura não-produtiva sem ter nenhuma produtiva (turnos 1-5)
- TipBanner de urgência aparece quando produção total é zero a partir do turno 3
- Tips respeitam lógica de dismissal existente (localStorage, mostrar 1 vez)

### F-072 — Alerta inline no menu de construção

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:

Quando jogador seleciona estrutura não-produtiva (Wall, Barracks, Stable, Tavern, Shadow Guild) e não tem NENHUMA estrutura produtiva em NENHUM território:

- Exibir alerta inline acima do botão "Construir":
  ```
  ⚠ Sem estruturas produtivas! Seus recursos não vão crescer.
     Considere construir Farm, Sawmill ou Mine primeiro.
  ```
- Estilo: `bg-amber-900/60 border-amber-500/40 text-amber-200`
- O alerta é informativo — NÃO bloqueia a construção (jogador pode ter estratégia válida)
- Alerta não aparece se jogador já tem ao menos 1 estrutura produtiva em qualquer território

**Critérios de aceite:**
- Alerta inline aparece no menu de construção ao selecionar estrutura não-produtiva sem ter produtivas
- Alerta NÃO bloqueia a construção — apenas informa
- Alerta desaparece se jogador já tem ao menos 1 Farm, Sawmill ou Mine

### F-073 — Tips de cartas no early game

Em `/src/hooks/useTips.ts`:

Adicionar ao array `TIP_DEFINITIONS`:

**tip-09-cards-intro** (proativo T3-5):
- Trigger: turno 3-5, jogador tem cartas, nunca usou nenhuma
- Mensagem: "🃏 Você tem cartas na mão! Cartas dão vantagem em batalha — use ao enviar expedições de ataque. Toque no ícone de cartas para ver suas opções."

**tip-10-cards-reminder** (lembrete T10+):
- Trigger: turno 10+, 3+ cartas acumuladas, nunca usou nenhuma
- Mensagem: "🃏 Você tem cartas acumuladas sem uso! Use-as em expedições para vantagem estratégica."

Requer adicionar `playerCards: number` e `hasUsedCard: boolean` ao estado do trigger, derivados do game store.

**Critérios de aceite:**
- TipBanner de cartas aparece nos turnos 3-5 se jogador tem cartas e nunca usou nenhuma
- TipBanner de lembrete aparece no turno 10+ se jogador tem 3+ cartas sem uso
- Cada tip aparece no máximo 1 vez (persistido em localStorage)
- Tips não aparecem se jogador já usou ao menos 1 carta
- Tips respeitam prioridade e fila do sistema existente (máximo 1 visível por vez)

---

## Limites

- NÃO bloqueia ações do jogador — apenas sugere
- NÃO implementa tutorial interativo ou sequência guiada
- NÃO altera comportamento de tips existentes (tip-01 a tip-06)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

Requer que PRP-017 (Sistema de Dicas Contextuais) esteja implementado — o sistema de TipBanner e useTips já deve existir.
