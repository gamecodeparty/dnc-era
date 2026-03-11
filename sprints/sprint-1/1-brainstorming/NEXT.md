# NEXT — Sprint 01 Baseline → Sprint 02

---

## Decisão: GO ✅

**Condições verificadas:**
- [x] Há ao menos 3 melhorias de impacto alto ou médio-alto (PAIN-01, PAIN-02, PAIN-04 são P1)
- [x] As melhorias atacam pains confirmados por ≥ 2 agentes (PAIN-01 por 6/6, PAIN-04 por 3/6, PAIN-02 estruturalmente óbvio)
- [x] As melhorias são implementáveis (não dependem de refactor total)

**NPS atual: 5.5/10** — Abaixo da meta de 8.0 para encerrar o loop. Necessita ao menos 1 sprint adicional.

---

## Plano de Melhoria — Sprint 02

### Melhoria 1: Preview de Combate no Modal de Ataque

**O que mudar:**
Antes de enviar uma expedição de ataque, mostrar no modal:
- Poder de ataque estimado das tropas selecionadas
- Poder de defesa estimado do território alvo (baseado em unidades VISÍVEIS + Wall)
- Indicador de resultado provável: "VITÓRIA PROVÁVEL / INCERTO / DERROTA PROVÁVEL"

**Por que mudar:**
PAIN-01 foi reportado por 6/6 agentes. Combate às cegas elimina a sensação de agência — derrota parece injusta mesmo quando é resultado de estratégia inferior.

**Como implementar:**
A função `CombatSystem.previewCombat()` já existe no backend. No client (Zustand), criar função `getAttackPreview(fromTerritoryId, toTerritoryId, units)` usando as fórmulas de `getAttackPower()` e `getDefensePower()` já disponíveis em gameStore.ts. Exibir no modal `ExpeditionModal` componente já existente.

**Como validar:**
No próximo sprint, agentes devem ser capazes de descrever "sabia que ia ganhar/perder" antes de enviar o ataque. Eliminar instâncias de "derrota surpresa" nos logs.

---

### Melhoria 2: Tutorial Contextual nos Primeiros 3 Turnos

**O que mudar:**
Sistema de "missões guia" para os turnos 1-3:
- Turno 1: Highlight em "Gerenciar Território" com tooltip: "Construa estruturas para produzir recursos"
- Turno 2: Após construção, highlight em recrutamento: "Construa Barracks para treinar soldados"
- Turno 3: Introduzir exploração com contador: "Era da Guerra começa no turno 16 — use a paz para preparar"

Adicionalmente: badge permanente "Turno X/15 → Era da Guerra" na header durante a Era da Paz.

**Por que mudar:**
PAIN-04 e PAIN-06 simultâneos. Agent-F foi eliminado por falta de onboarding. Agent-B perdeu planejamento por não saber do limite de 4 slots.

**Como implementar:**
Estado `onboardingStep: 1|2|3|null` no gameStore. Componente `OnboardingTooltip` sobreposto ao mapa nas primeiras interações. Countdown de era no header (já tem turno atual, falta label condicional "→ Era da Guerra em X").

**Como validar:**
No próximo sprint, novatos devem construir Barracks antes do turno 8 sem precisar de tutorial externo. Taxa de eliminação no turno <25 deve reduzir de 2/6 para 0/6 ou 1/6.

---

### Melhoria 3: Resultado de Exploração + Resultado de Batalhas AI no Log

**O que mudar (exploração):**
Evento de retorno de exploração deve incluir:
```
[T12] Floresta dos Espíritos: SUCESSO — +72 graos, +0 madeira, +0 ouro
      "Os espíritos guiaram suas tropas até clareiras sagradas!"
```
Em vez do atual:
```
[T12] 3 tropas retornaram ao território de origem.
```

**O que mudar (batalhas AI):**
Eventos de combate entre AIs devem incluir resultado:
```
[T19] Cla do Leste conquistou Território 5 de Cla do Sul. (15 vs 8, VITÓRIA)
```

**Por que mudar:**
PAIN-05 e PAIN-07. O log é a única fonte de histórico do jogo. Sem resultados, é ruído. Com resultados, é inteligência.

**Como implementar:**
Em `processTurn()` do gameStore, o código de exploração já calcula `result: "success" | "partial" | "failure"`. Apenas passar esse resultado para o evento de retorno. Para batalhas AI: o código AI atual (AIController.ts) precisa emitir eventos de resultado via GameEngine.logEvent() — já existe, apenas não está exposto no client.

**Como validar:**
No próximo sprint, 100% das expedições de exploração que retornam devem ter resultado (sucesso/parcial/falha) legível no log. Agentes não devem mais reportar confusão sobre resultado de exploração.

---

## Sprint 02 — Título Sugerido: `sprint-02-combat-clarity`

**Objetivo:** Reduzir NPS de 5.5 para 7.0+ com foco em clareza de combate e onboarding.

**Hipótese:** As 3 melhorias acima atacam os maiores bloqueadores de satisfação sem tocar no loop central (que já funciona). Jogadores que entendem o que fazem antes de agir sentem mais agência, e agência é o coração do objetivo final ("cada derrota foi uma lição").

**Meta de validação:**
- Nenhum agente novato eliminado antes do turno 30
- Preview de combate usado em ≥ 4/6 ataques nos logs
- Zero instâncias de "não sabia o resultado da exploração" nas entrevistas
- NPS médio ≥ 7.0

---

## Notas de Implementação

**Não implementar ainda (backlog futuro):**
- Facção Umbral completa (PAIN-02) — esforço médio, mas mudança sistêmica. Deixar para sprint 03.
- Bônus de facção no client (PAIN-10) — requer integração client-server. Deixar para sprint 03.
- Cartas no modal de combate (PAIN-08) — melhoria importante mas não crítica para NPS agora.

**Riscos do Sprint 02:**
- Tutorial contextual pode ser intrusivo para jogadores experientes → implementar com opção de "dispensar" após turno 3
- Preview de combate mostra informações que deveriam ser "escondidas" (tropas inimigas) → expor apenas tropas VISÍVEIS no território selecionado, não inteligência total
