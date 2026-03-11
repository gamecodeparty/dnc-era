# PRP-004 — Sistema de Espionagem SPY

**Specs:** S-004
**Prioridade:** Score 8/10 (D-003 — facção Umbral sem espiões, promessa falsa na seleção)
**Dependências:** PRP-001 (Preview de Combate) — para integração de info revelada no preview

---

## Objetivo

Implementar o ciclo completo da unidade SPY: recrutar → enviar para território inimigo → revelar tropas/estruturas → aplicar bônus Umbral (+30% eficiência). A unidade SPY já existe em `/src/game/constants/units.ts` com stats definidos mas não está integrada no fluxo client-side.

---

## Escopo

- **Tipos:** Novos tipos de expedição (SPY, RETURN_SPY), interface `RevealedTerritory`
- **Store:** Actions `sendSpy()`, resolução de espionagem em `processTurn()`, state `revealedTerritories`
- **Tela território:** SPY na lista de recrutamento quando SHADOW_GUILD presente
- **Mapa:** Indicador visual de território revelado
- **Expedição:** Opção "Enviar Espião" ao selecionar território inimigo

---

## Features

### F-010 — Recrutamento de SPY

Em `/src/stores/gameStore.ts`:
- Garantir que `trainUnit()` aceita tipo SPY
- Validar que território tem SHADOW_GUILD construído
- Deduzir custo: 5 grain, 10 gold

Em `/src/app/game/territory/[id]/page.tsx`:
- Adicionar SPY na lista de unidades treináveis quando SHADOW_GUILD presente

**Critérios de aceite:**
- SPY aparece na lista de recrutamento quando SHADOW_GUILD está construído
- Custos corretos (5 grain, 10 gold)
- Não aparece sem SHADOW_GUILD

### F-011 — Expedição de espionagem (sendSpy)

Em `/src/game/types/index.ts`:
- Adicionar tipos `SPY` e `RETURN_SPY` ao enum/union de expedição

Em `/src/stores/gameStore.ts`:
- Nova action `sendSpy(fromTerritoryId, toTerritoryId)`
- Validar que origem tem ≥1 SPY
- Criar expedição tipo SPY com 1 unidade SPY
- Travel time = distância Manhattan em turnos

**Critérios de aceite:**
- Jogador pode enviar SPY para território inimigo
- SPY viaja por N turnos (distância Manhattan)
- Validação impede envio sem SPY disponível

### F-012 — Resolução de espionagem em processTurn

Em `/src/stores/gameStore.ts` (dentro de `processTurn()`):

Quando expedição SPY chega ao destino:
- Calcular sucesso: base 70% chance
- Bônus Umbral: +30% = 100% para Umbral (sempre sucesso)
- Sucesso: adicionar território alvo a `revealedTerritories`
- Falha: SPY capturado (perdido), evento no log
- Criar expedição RETURN_SPY para voltar (se sucesso)

State novo:
```typescript
revealedTerritories: Record<string, {
  units: Unit[];
  structures: Structure[];
  revealedAt: number;   // turno em que foi revelado
  expiresAt: number;    // revealedAt + 5
}>
```

Informação expira após 5 turnos (limpar em `processTurn`).

**Critérios de aceite:**
- Chance base 70% de sucesso
- Umbral tem 100% de sucesso (+30% bônus)
- Informação revelada expira após 5 turnos
- SPY capturado gera evento no log

### F-013 — Indicador visual de território revelado

Em `/src/components/game/map/Territory.tsx`:
- Se território está em `revealedTerritories` e não expirou: ícone de olho + tooltip com tropas e estruturas
- Se expirado: remover indicador

Em `/src/app/game/page.tsx` ou `ExpeditionModal.tsx`:
- Ao selecionar território inimigo, se jogador tem SPY: opção "Enviar Espião" além de "Atacar"
- Modal simplificado: "Enviar espião para [território]? Chance de sucesso: X%"

**Critérios de aceite:**
- Território revelado mostra ícone visual no mapa
- Tooltip mostra tropas e estruturas reveladas
- Opção "Enviar Espião" disponível quando jogador tem SPY

### F-014 — Integração SPY com preview de combate

Em `/src/components/game/expedition/ExpeditionModal.tsx`:
- Se território alvo está em `revealedTerritories`: mostrar defesa exata no preview (sem "~")
- Requer que PRP-001 (F-003 fog-of-war) esteja implementado

**Critérios de aceite:**
- Preview de combate usa informação exata quando território está revelado
- Sem revelação, mantém valor aproximado "~X" (comportamento de PRP-001)

---

## Limites

- NÃO implementa contra-espionagem (detecção de SPY inimigo)
- NÃO implementa SPY para AI (AIs não usam espionagem neste sprint)
- NÃO altera carta Informante — integração futura
- NÃO adiciona SPY a facções que não são Umbral ao bônus — todas podem recrutar, mas Umbral tem +30%

---

## Dependências

- **PRP-001** (Preview de Combate) — F-014 requer que o painel de preview exista para integrar informação revelada. Se PRP-001 não estiver pronto, F-014 fica pendente mas o resto do PRP funciona.
