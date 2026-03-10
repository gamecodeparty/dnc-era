# PRP-001 — Preview de Combate

**Specs:** S-001
**Prioridade:** Score 10/10 (D-001 — combate às cegas, 6/6 agentes afetados)
**Dependências:** Nenhuma

---

## Objetivo

Implementar preview de resultado de combate no `ExpeditionModal` para que o jogador veja poder de ataque vs defesa estimada antes de confirmar um ataque. Resolve a principal dor do playtesting: toda batalha ser uma caixa preta.

---

## Escopo

- **Tipos:** Interface `CombatPreview` em `game/types`
- **Lógica:** Função `calculateCombatPreview()` no gameStore
- **Tela:** Painel de preview no `ExpeditionModal` (expedições tipo ATTACK)
- **UX:** Fog-of-war leve (valores aproximados sem reconhecimento SPY)

---

## Features

### F-001 — Interface CombatPreview e função de cálculo

Criar interface `CombatPreview` em `/src/game/types/index.ts` com campos: `attackPower`, `defensePower`, `ratio`, `outcome` (decisive_victory | victory | uncertain | defeat), `attackerModifiers[]`, `defenderModifiers[]`.

Implementar `calculateCombatPreview(attackingUnits, defenderTerritory, attackerOrigin, defenderOrigin)` como função utilitária (não action do store) em `/src/stores/gameStore.ts`.

Lógica:
- `attackPower` = soma de `unit.atk` × bônus de facção atacante (Ferronatos: ×1.2)
- `defensePower` = soma de `unit.def` defensoras + bônus Wall (20%/nível) + bônus facção defensor
- `outcome`: ratio > 1.5 → decisive_victory, > 1.0 → victory, > 0.7 → uncertain, ≤ 0.7 → defeat
- Listar modificadores ativos de cada lado

**Critérios de aceite:**
- Valores coerentes com resultado real do combate (mesma fórmula)
- Modificadores de facção e Wall listados quando aplicáveis

### F-002 — Painel de preview no ExpeditionModal

Renderizar painel de preview em `/src/components/game/expedition/ExpeditionModal.tsx` quando tipo = ATTACK e ≥1 unidade selecionada.

Comportamento:
- Recalcular em tempo real conforme jogador adiciona/remove unidades
- Cores: verde (decisive_victory/victory), amarelo (uncertain), vermelho (defeat)
- Barra de proporção visual (attackPower vs defensePower)
- Exibir lista de modificadores ativos

**Critérios de aceite:**
- Preview aparece assim que ≥1 unidade selecionada
- Atualiza em tempo real ao mudar seleção
- Indicação qualitativa com cor correspondente

### F-003 — Fog-of-war (valores aproximados)

Quando o território defensor pertence a AI e o jogador NÃO tem reconhecimento (SPY), exibir defesa como "~X" (aproximado) com ícone de interrogação e texto "(sem reconhecimento)".

Quando o jogador tem informação revelada (futuro: S-004 SPY / carta Informante), mostrar valor exato sem "~".

Implementar verificação em `calculateCombatPreview`: se território não está em `revealedTerritories` (campo a ser criado pelo PRP-004), usar margem de erro.

**Critérios de aceite:**
- Defesa de territórios sem reconhecimento mostra "~X"
- Preparado para integração com `revealedTerritories` do PRP-004

---

## Limites

- NÃO implementa o sistema SPY — isso é PRP-004
- NÃO altera a lógica de combate em si — apenas exibe preview
- NÃO afeta combates entre AIs — apenas combates iniciados pelo jogador

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

PRP-004 (SPY) depende deste PRP para integrar informação revelada no preview.
