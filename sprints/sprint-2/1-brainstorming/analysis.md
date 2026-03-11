# Análise Pain/Gain — Sprint-2-Baseline

---

## 1. Cruzamento Log vs Entrevista — Divergências Identificadas

| Agente | O que disse no log | O que disse na entrevista | Diagnóstico |
|--------|-------------------|--------------------------|-------------|
| Agent-A | "Vencer foi entediante" | Deu nota 4/10 | Alinhados — frustração confirmada |
| Agent-B | No log: "erro estratégico me travou" | Na entrevista: "derrota justa" + quero jogar de novo | **DIVERGÊNCIA**: No log a frustração foi intensa; na entrevista racionalizou positivamente. O sofrimento real foi maior que a entrevista sugere. |
| Agent-C | "Raiva" no log, pico de frustração T3 | Nota 3/10 e "não voltaria" | Alinhados — consistente com frustração |
| Agent-D | Satisfação genuína na defesa T10 | Nota 6/10 + quer jogar de novo | **DIVERGÊNCIA POSITIVA**: A satisfação defensiva foi o único momento de agência real em toda a sessão. Isso funciona. |
| Agent-E | "Satisfação genuína" com ícone espionagem | Nota 6/10 + quer jogar de novo | **DIVERGÊNCIA POSITIVA**: A espionagem funcionou emocionalmente mais do que a entrevista reconhece. |
| Agent-F | "Expedições salvaram minha experiência" | Nota 6/10 + quer tentar Wyrm Cave de novo | **ALINHADOS** — Expedições foram a revelação da sessão para o novato. |

**Conclusão do cruzamento**: Os dois sistemas mais satisfatórios (Defesa com Muralha + Ferronatos, Espionagem visual com Umbral) geram intenção de replay. O bloqueio de ataque gera frustração universal. As Expedições são o sistema com melhor recepção de todos.

---

## 2. Mapa Pain/Gain

### PAINS (Problemas)

---

#### PAIN-01: Ausência de ação de ataque para o jogador
**Descrição**: Não há UI para o jogador iniciar ataque a territórios rivais ou neutros. A IA ataca; o jogador não pode. O CombatSystem.ts está implementado no backend mas sem exposição na interface.
**Frequência**: 6/6 agentes reportaram (unanimidade)
**Impacto no objetivo final**: ALTO — invalida estratégias militares inteiras e quebra a promessa da "Era da Guerra"
**Esforço de implementação**: MÉDIO — o backend existe (CombatSystem.ts, previewCombat, executeCombat). Falta a UI de seleção de território-alvo + seleção de unidades + confirmação de ataque.
**Prioridade**: CRÍTICO (ALTO IMPACTO / MÉDIO ESFORÇO)

---

#### PAIN-02: Turnos auto-avançam em 10 segundos — muito rápido
**Descrição**: TURN_INTERVAL_MS = 10.000ms. Jogadores não têm tempo de ler o log, navegar entre telas, e tomar decisões. O timer pressiona mesmo durante navegação.
**Frequência**: 5/6 agentes reportaram (Agent-D não mencionou — estava em território único e não precisava navegar muito)
**Impacto no objetivo final**: ALTO — jogadores perdem turnos por navegação, não por escolhas estratégicas
**Esforço de implementação**: BAIXO — mudar constante + adicionar opção de "confirmar turno manualmente"
**Prioridade**: ALTO (ALTO IMPACTO / BAIXO ESFORÇO)

---

#### PAIN-03: Custos de estrutura não têm lógica intuitiva para novatos
**Descrição**: Serraria (que produz madeira) não usa madeira para ser construída. Muralha usa madeira mas não produz nada. A relação custo-tipo não é intuitiva. Múltiplos agentes assumiram custos errados.
**Frequência**: 4/6 agentes (Agent-A, Agent-B, Agent-C, Agent-F)
**Impacto no objetivo final**: MÉDIO — causa erros estratégicos no early game que podem travar a partida
**Esforço de implementação**: BAIXO — adicionar tooltip de custo total + aviso de "isso usará X% do seu recurso Y" antes de confirmar
**Prioridade**: ALTO (MÉDIO IMPACTO / BAIXO ESFORÇO)

---

#### PAIN-04: Placar/posição relativa invisível durante o jogo
**Descrição**: Não há indicador de posição no ranking durante a partida. A campeã (Agent-A) não sabia que estava ganhando até calcular pontos ao final.
**Frequência**: 4/6 agentes mencionaram
**Impacto no objetivo final**: MÉDIO — sem visibilidade de posição, não há pressão estratégica de "estou perdendo, preciso agir diferente"
**Esforço de implementação**: BAIXO — adicionar mini-ranking sidebar com pontuação estimada em tempo real
**Prioridade**: MÉDIO-ALTO (MÉDIO IMPACTO / BAIXO ESFORÇO)

---

#### PAIN-05: Diplomacia como caixa preta — sem feedback de aceitação
**Descrição**: Propor aliança não tem resposta visível. O jogador não sabe se a proposta foi aceita, rejeitada, ou ignorada.
**Frequência**: 2/6 agentes (Agent-E, Agent-A mencionou lateralmente)
**Impacto no objetivo final**: MÉDIO — bloqueia estratégias diplomáticas por incerteza
**Esforço de implementação**: MÉDIO — implementar lógica de aceitação/rejeição da IA + notificação ao jogador
**Prioridade**: MÉDIO (MÉDIO IMPACTO / MÉDIO ESFORÇO)

---

#### PAIN-06: Sistema de cartas sem contexto de uso
**Descrição**: Cartas existem mas não há UI clara de "use esta carta agora" fora de um contexto de batalha ativa. Cartas ficam acumulando inutilizadas.
**Frequência**: 5/6 agentes
**Impacto no objetivo final**: MÉDIO — sistema de cartas é investimento de design que não gera retorno de engajamento
**Esforço de implementação**: MÉDIO — criar fluxo "selecionar carta → selecionar alvo → confirmar"
**Prioridade**: MÉDIO (MÉDIO IMPACTO / MÉDIO ESFORÇO)

---

#### PAIN-07: Servidor offline bloqueia acesso ao jogo
**Descrição**: O jogo requer servidor rodando para auth (NextAuth), mesmo que a gameplay seja client-side (Zustand). Sem servidor, a tela de login falha silenciosamente.
**Frequência**: 6/6 agentes (bloqueio no T1 de todos)
**Impacto no objetivo final**: ALTO — impede qualquer playtesting real
**Esforço de implementação**: MÉDIO — criar modo "demo/offline" sem auth ou simplificar setup de desenvolvimento
**Prioridade**: CRÍTICO para desenvolvimento (não necessariamente para jogador final)

---

#### PAIN-08: Log de eventos sem categorização/filtragem
**Descrição**: Eventos de "turno avançou", "construção realizada" e "ataque da Horda" têm o mesmo peso visual no log. Jogadores perderam eventos críticos.
**Frequência**: 4/6 agentes
**Impacto no objetivo final**: BAIXO-MÉDIO — reduz qualidade de informação estratégica
**Esforço de implementação**: BAIXO — adicionar categorias (COMBATE | ECONÔMICO | SISTEMA) com filtros visuais
**Prioridade**: BAIXO-MÉDIO (BAIXO-MÉDIO IMPACTO / BAIXO ESFORÇO)

---

#### PAIN-09: Bônus de facção invisível — não percebido pelos jogadores
**Descrição**: Verdâneos +20% grãos e Ferronatos +20% militar existem no código mas nenhum agente percebeu o efeito. Não há indicação visual de "você produziu X, com bônus de facção = Y".
**Frequência**: 3/6 agentes mencionaram a invisibilidade
**Impacto no objetivo final**: MÉDIO — a escolha de facção perde significado estratégico
**Esforço de implementação**: BAIXO — adicionar detalhe no ResourcePanel: "Grãos: +10 (+20% Verdâneos = +12/turno)"
**Prioridade**: MÉDIO (MÉDIO IMPACTO / BAIXO ESFORÇO)

---

#### PAIN-10: Pontuação de população estática — não diferencia jogadores
**Descrição**: Todos os 6 agentes terminaram com população = 100 (valor inicial, sem crescimento). Isso significa 1.000 pontos fixos para todos — a maior fatia da pontuação é idêntica para todos, tornando a corrida real em apenas 300 pontos variáveis.
**Frequência**: Identificado por análise pós-jogo (não reportado diretamente pelos agentes)
**Impacto no objetivo final**: MÉDIO — escore final não diferencia estratégias adequadamente
**Esforço de implementação**: ALTO — requer mecânica de crescimento de população (Fazendas alimentam população, estruturas aumentam capacidade)
**Prioridade**: BAIXO (MÉDIO IMPACTO / ALTO ESFORÇO) — redesign de mecânica

---

### GAINS (Pontos Fortes — Não Mexer)

---

#### GAIN-01: Indicador X/4 de slots nos tiles do mapa (F-017)
**Descrição**: O indicador de estruturas em cada tile permite monitorar o desenvolvimento inimigo sem clicar. Implementação de F-017.
**Frequência de elogio**: 5/6 agentes mencionaram positivamente
**Recomendação**: MANTER e expandir (adicionar indicador de unidades com mais granularidade)

#### GAIN-02: Sistema de Expedições com narrativa
**Descrição**: As narrativas de exploração (Mina Abandonada, Wyrm Cave, etc.) são imersivas e criam momentos de risco/recompensa claros.
**Frequência de elogio**: 4/6 agentes (foi a descoberta mais positiva da sessão para Agent-F)
**Recomendação**: MANTER como feature core — é o sistema mais completo e satisfatório disponível

#### GAIN-03: Ícone de olho com hover para espionagem revelada
**Descrição**: O tile inimigo espionado mostra ícone de Eye (👁) com hover revelando tropas e estruturas. Design elegante.
**Frequência de elogio**: 3/6 agentes (todos que testaram espionagem)
**Recomendação**: MANTER — referência de qualidade de UX para outros sistemas

#### GAIN-04: Banners de transição de era
**Descrição**: Os banners animados de "Era da Guerra" e "Era da Invasão" criaram impacto emocional real.
**Frequência de elogio**: 6/6 agentes mencionaram positivamente
**Recomendação**: MANTER — é o pico emocional atual do jogo

#### GAIN-05: Sistema de Horda escalante
**Descrição**: Horda de força 50→100→150→200→300 atacando quem tem mais territórios cria pressão estratégica natural e justa.
**Frequência de elogio**: 5/6 agentes (Agent-D teve a derrota mais satisfatória por causa disso)
**Recomendação**: MANTER como é — excelente design de loop de jogabilidade

#### GAIN-06: Feedback de custos com cores vermelhas
**Descrição**: Preços em vermelho quando o jogador não pode pagar. Evita confusão.
**Frequência de elogio**: 4/6 agentes
**Recomendação**: MANTER

---

## 3. Backlog Priorizado

| # | Problema | Frequência | Impacto | Esforço | Prioridade |
|---|----------|-----------|---------|---------|-----------|
| 1 | PAIN-01: Ausência de ação de ataque | 6/6 | ALTO | MÉDIO | **CRÍTICO** |
| 2 | PAIN-02: Timer de 10s muito agressivo | 5/6 | ALTO | BAIXO | **P1** |
| 3 | PAIN-03: Custos contraintuitivos sem aviso | 4/6 | MÉDIO | BAIXO | **P1** |
| 4 | PAIN-04: Placar invisível durante jogo | 4/6 | MÉDIO | BAIXO | **P2** |
| 5 | PAIN-09: Bônus de facção invisível | 3/6 | MÉDIO | BAIXO | **P2** |
| 6 | PAIN-06: Cartas sem contexto de uso | 5/6 | MÉDIO | MÉDIO | **P2** |
| 7 | PAIN-05: Diplomacia como caixa preta | 2/6 | MÉDIO | MÉDIO | **P3** |
| 8 | PAIN-08: Log sem categorização | 4/6 | BAIXO | BAIXO | **P3** |
| 9 | PAIN-07: Servidor offline bloqueia playtesting | 6/6 | ALTO | MÉDIO | **P1 (dev)** |
| 10 | PAIN-10: População estática no scoring | análise | MÉDIO | ALTO | **BACKLOG** |
