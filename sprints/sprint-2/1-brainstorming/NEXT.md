# NEXT.md — Plano de Melhoria + GO/NO-GO

**Sprint**: sprint-2-baseline
**Data da análise**: 2026-03-10
**Média de nota geral**: 5.0/10

---

## Plano de Melhoria — Próximo Sprint

### Melhoria #1 (CRÍTICA): Implementar UI de Ataque de Territórios

**O que mudar**: Criar fluxo de ataque no frontend:
1. Ao clicar em território inimigo/neutro adjacente → exibir sheet/modal com opção "Atacar"
2. Seleção de unidades a enviar (com quantidade)
3. Preview de combate (usando `/api/game/combat/preview`) mostrando: poder de ataque, poder de defesa, outcome estimado, modificadores
4. Confirmação → chama `/api/game/combat/execute`
5. Resultado exibido com evento no log + animação

**Por que mudar**: 6/6 agentes não conseguiram atacar. O backend (CombatSystem.ts) está completo. É o gap mais crítico entre o que o jogo promete e o que entrega. Sem isso, estratégias militares são impossíveis e a "Era da Guerra" não existe para o jogador.

**Como implementar**:
- Adicionar route `/api/game/[gameId]/attack` (POST) que chama `combatSystem.executeCombat()`
- Adicionar route `/api/game/[gameId]/attack/preview` (POST) que chama `combatSystem.previewCombat()`
- Na tela do território (`/game/territory/[id]`) ou no mapa: adicionar botão "Atacar" para territórios não-próprios adjacentes
- Modal com seleção de unidades + preview + confirmação

**Como validar**: Na próxima rodada, ≥ 4/6 agentes conseguem realizar pelo menos 1 ataque por conta própria sem procurar em menus obscuros.

---

### Melhoria #2 (ALTA): Timer de turno configurável + modo "turno manual"

**O que mudar**:
1. Adicionar botão "Encerrar Turno" que avança o turno imediatamente (independente do timer)
2. Aumentar TURN_INTERVAL_MS para 60.000ms (1 minuto) como padrão
3. Manter o timer auto-avance como fallback (para jogadores que querem tempo real)

**Por que mudar**: TURN_INTERVAL_MS = 10s era o valor de teste para desenvolvimento. Em playtesting, 5/6 agentes tiveram turnos avançando enquanto tomavam decisões. Jogadores de estratégia precisam de tempo para planejar.

**Como implementar**:
- EndTurnButton já existe (`src/components/game/hud/EndTurnButton.tsx`) — verificar se chama processTurn() via API
- Mudar TURN_INTERVAL_MS = 60 * 1000 no gameStore
- Adicionar configuração de "turno manual vs automático" nas settings

**Como validar**: Na próxima rodada, 0 agentes reportam "perdi turno por estar navegando".

---

### Melhoria #3 (ALTA): Tooltip de aviso de custo alto + "isso usa X% de Y"

**O que mudar**: Ao hover no botão "Construir" de uma estrutura que vai consumir ≥ 80% de um recurso, exibir aviso:

> ⚠️ "Esta construção usará 100% da sua Madeira. Sem madeira, você não poderá construir estruturas por vários turnos."

**Por que mudar**: 4/6 agentes cometeram o erro de zerar um recurso inadvertidamente (Agent-B zera madeira com Muralha, Agent-C zera madeira com Quartel, etc.). O jogo permite erros fatais de early-game sem aviso. Para novatos (Agent-F) e veteranos analíticos (Agent-A) igualmente, a informação de custo proporcional é essencial.

**Como implementar**:
- Na tela de `/game/territory/[id]`, calcular `cost.resource / currentResource * 100` antes de renderizar o botão "Construir"
- Se > 80%, adicionar badge de aviso ⚠️ com tooltip explicativo
- Adicionar texto informativo em linha (ex: "Usará 100% da sua madeira") abaixo do custo

**Como validar**: Na próxima rodada, 0 agentes ficam travados por lock de recursos no early game por erro de informação.

---

### Melhoria #4 (MÉDIO): Mini-ranking durante o jogo

**O que mudar**: Adicionar sidebar/panel com posição estimada de cada clã baseada em territórios + recursos (calculado client-side sem DB call extra).

**Por que mudar**: 4/6 agentes não sabiam sua posição relativa durante o jogo. A campeã descobriu que ganhou apenas ao somar pontos ao final — sem tensão durante a partida.

**Como implementar**:
- Adicionar componente `RankingPanel` na sidebar do mapa
- Calcular score em tempo real: `territories.length × 100 + clan.gold`
- Exibir ranking de 3 clãs com posição atual

**Como validar**: Na próxima rodada, ≥ 3/6 agentes mencionam usar o ranking para tomar decisões estratégicas.

---

### Melhoria #5 (MÉDIO): Visibilidade do bônus de facção na produção

**O que mudar**: No ResourcePanel e na tela de território, mostrar o bônus de facção explicitamente:

> "🌾 Grãos: +10/turno (**+12** com bônus Verdâneos +20%)"

**Por que mudar**: 3/6 agentes escolheram facção por bônus mas nunca perceberam o efeito. Facção sem feedback de impacto perde significado estratégico.

**Como implementar**:
- No `ResourcePanel.tsx`, adicionar linha de "produção estimada com bônus"
- No `ResourceSystem.ts`, retornar breakdown de produção (base + bônus)

**Como validar**: Na próxima rodada, ≥ 2/6 agentes mencionam espontaneamente o bônus de facção como fator na estratégia.

---

## Decisão GO/NO-GO

### Verificação das condições de GO

- [x] Há ao menos 3 melhorias de impacto alto ou médio-alto → **SIM** (5 melhorias identificadas: 2 de impacto alto/crítico, 3 de médio)
- [x] As melhorias atacam pains confirmados por ≥ 2 agentes → **SIM** (todas as 5 melhorias atacam pains de 3+ agentes)
- [x] As melhorias são implementáveis → **SIM** (o backend de combate já existe; as melhorias de UI são incrementais)

### Verificação das condições de NO-GO

- [ ] Média de nota geral ≥ 8.0 → **NÃO** (média: 5.0/10)
- [ ] Nenhum item no backlog com impacto alto → **NÃO** (há 2 itens críticos)
- [ ] ≥ 5/6 agentes respondem "sim" à pergunta 20 (replay intent) → **NÃO** (4/6 disseram sim, 2 disseram não — Agent-A e Agent-C, bloqueados pela falta de ataque)
- [ ] Não é possível montar plano com 3 melhorias concretas → **NÃO** (há 5 melhorias claras)

---

## **DECISÃO: GO ✅**

O jogo tem pains críticos mas são endereçáveis com implementação de médio esforço. O backend está bem construído — o gap está na exposição das mecânicas via interface. O próximo sprint deve priorizar:

1. **CRÍTICO**: Implementar UI de ataque (a ausência invalida o conceito do jogo)
2. **ALTA**: Timer de turno configurável (qualidade de vida essencial)
3. **ALTA**: Avisos de custo proporcional (previne travamentos de early game)

A meta do próximo sprint é chegar em nota média ≥ 6.5/10 com ≥ 5/6 agentes conseguindo atacar pelo menos 1 território por conta própria.

---

## Bugs Técnicos Identificados (para o time dev, além das melhorias de UX)

1. **`territory.ownerId !== "player"`** — hardcode de string "player" na página `/game/territory/[id]/page.tsx:105`. Isso quebrará quando integrado com auth real (onde `ownerId` será um UUID).

2. **Dois sistemas de custos conflitantes**: `gameStore.ts` e `balance.ts` têm tabelas de custos diferentes (ex: FARM em gameStore: {wood:20, gold:10} vs balance.ts: {wood:10, gold:5}). Qual é a fonte da verdade?

3. **`MAP_COLUMNS = 4, MAP_ROWS = 3` em gameStore.ts** — mas o mapa renderiza `grid-cols-3` (3 colunas, 4 linhas). As constantes estão invertidas.

4. **Facção "Áureos" referenciada no TASK.md não existe** — o código tem apenas FERRONATOS, VERDANEOS, UMBRAL. O TASK.md precisa ser corrigido.
