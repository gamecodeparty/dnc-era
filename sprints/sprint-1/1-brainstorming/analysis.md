# Análise Pain/Gain — Sprint 01 Baseline

---

## 1. Cruzamento Log vs Entrevista

### Agent-A (Marcos)
- **Log:** Frustração com timer durante navegação (turno 1-2), exploração retornou zero sem explicação (turno 7).
- **Entrevista:** Não mencionou o timer explicitamente — apenas disse que "fluxo é fragmentado." Divergência: o log mostra frustração maior com o timer do que a entrevista admite. Isso sugere que o timer é um problema que jogadores experientes "aceitam" cognitivamente mas ainda impacta negativamente.
- **Divergência principal:** Na entrevista, Agent-A disse que vitória foi "satisfatória." No log, a última anotação foi "vitória levemente oca." A entrevista normalizou o que o log registrou como decepcionante.

### Agent-B (Sofia)
- **Log:** Limite de 4 estruturas descoberto por acidente (turno 17) foi frustração crítica.
- **Entrevista:** Mencionou o limite de 4 estruturas como "o que mais precisa melhorar." Consistência entre log e entrevista — essa foi a principal frustração e foi bem articulada.
- **Divergência:** No log, registrou que "diplomacia funcionou" (AI3 aceitou paz). Na entrevista, disse que diplomacia é "dependente de sorte." O log capturou a satisfação do momento, a entrevista capturou a percepção sistêmica mais crítica.

### Agent-C (Rafael)
- **Log:** Combate às cegas foi o problema central. Derrotas contra AI4 foram frustrantes e inesperadas.
- **Entrevista:** Citou "combate às cegas" como o maior problema, consistente com o log.
- **Divergência:** No log, após conquista do primeiro território, escreveu "VITÓRIA!" com entusiasmo. Na entrevista, lembrou o momento positivamente mas focou nas derrotas subsequentes. O log capturou o pico emocional positivo que a entrevista tendeu a esquecer.

### Agent-E (Isabela)
- **Log:** Frustração com Umbral no turno 1 foi visceral ("procurei espiões e não encontrei nenhum").
- **Entrevista:** Formulou de forma mais abstrata ("promessa de mecânica não cumprida"). O log é mais honesto — foi uma descoberta imediata e dolorosa, não uma reflexão posterior.
- **Divergência crítica:** A entrevista deu nota 4/10 mas o log sugere que a experiência foi pior — a eliminação no turno 33 veio após 32 turnos de jogo em modo de compensação pela mecânica ausente.

### Agent-F (Carlos)
- **Log:** "Zero tutorial contextual" — registrado múltiplas vezes.
- **Entrevista:** Articulou de forma clara o que precisava: "missões guia nos primeiros turnos."
- **Divergência:** No log, o momento da Wall era o único positivo. Na entrevista, disse que "o timer" era o problema central quando na verdade o log sugere que o problema era ausência de tutorial, não o timer em si. Carlos racionalizou a causa errada.

---

## 2. Mapa de Pain/Gain

### PAINS (Problemas Confirmados)

---

**PAIN-01: Sem preview de combate**
- Descrição: Atacar um território não mostra poder de ataque vs defesa antes de confirmar. Jogador age às cegas.
- Frequência: 6/6 agentes afetados (todos que combateram sofreram derrotas inesperadas)
- Impacto no objetivo final: ALTO (combate às cegas elimina a sensação de agência — derrota parece injusta)
- Esforço de implementação: MÉDIO (CombatSystem.previewCombat() já existe no código — só falta expor na UI)
- Prioridade: ALTO/MÉDIO = **CRÍTICO**

---

**PAIN-02: Facção Umbral não implementada (espiões ausentes)**
- Descrição: A facção Umbral promete "+30% eficiência de espiões" mas a unidade SPY não existe no client (gameStore). Bônus é fantasma.
- Frequência: 1/6 escolheu Umbral, mas o problema afeta todos pois a facção está disponível para seleção.
- Impacto no objetivo final: ALTO (quebra confiança do produto — promessa falsa na seleção de facção)
- Esforço de implementação: MÉDIO (SPY existe no servidor, só falta no client + mecânica de uso)
- Prioridade: ALTO/MÉDIO = **CRÍTICO**

---

**PAIN-03: Timer de 10 segundos com navegação multi-página**
- Descrição: O timer avança enquanto o jogador navega entre /game, /game/territory/:id, /game/cards, /game/army. Ações complexas custam turnos.
- Frequência: 5/6 agentes mencionaram a pressão do timer negativamente
- Impacto no objetivo final: ALTO (jogadores perdem turnos por navegar, não por estratégia ruim)
- Esforço de implementação: MÉDIO (parar timer durante navegação, ou mover ações para modal/side-panel)
- Prioridade: ALTO/MÉDIO = **CRÍTICO**

---

**PAIN-04: Ausência de tutorial contextual**
- Descrição: "Como Jogar" existe em página separada mas sem tooltips inline, missões guia ou onboarding no fluxo de jogo.
- Frequência: 3/6 agentes impactados criticamente (Agent-F eliminado por isso, Agent-B e Agent-E desperdiçaram turnos)
- Impacto no objetivo final: ALTO (novatos são eliminados antes de aprender o jogo)
- Esforço de implementação: MÉDIO (missões simples nos primeiros 3 turnos com setas/highlights)
- Prioridade: ALTO/MÉDIO = **CRÍTICO**

---

**PAIN-05: Resultado de batalhas entre AIs não reportado**
- Descrição: O log de eventos mostra "AI atacou" mas não o resultado (quem ganhou, quantas perdas). Impossível estratégia reativa.
- Frequência: 4/6 agentes mencionaram
- Impacto no objetivo final: MÉDIO (afeta estratégias mais avançadas, não o básico)
- Esforço de implementação: BAIXO (adicionar resultado dos combates AI-AI ao log de eventos)
- Prioridade: MÉDIO/BAIXO = **ALTO**

---

**PAIN-06: Limite de 4 estruturas não comunicado**
- Descrição: Máximo de 4 estruturas por território é descoberto apenas ao tentar exceder — não há indicador visual preventivo.
- Frequência: 3/6 agentes mencionaram
- Impacto no objetivo final: MÉDIO (erro de planejamento que pode ser permanente — sem demolição)
- Esforço de implementação: BAIXO (mostrar "X/4 slots" visualmente + tooltip de planejamento)
- Prioridade: MÉDIO/BAIXO = **ALTO**

---

**PAIN-07: Resultado de exploração pouco claro**
- Descrição: Exploração retorna tropas com recursos mas sem indicar claramente sucesso/parcial/falha. Probabilidades invisíveis.
- Frequência: 3/6 agentes mencionaram
- Impacto no objetivo final: MÉDIO (reduz satisfação de uma mecânica que funciona bem)
- Esforço de implementação: BAIXO (adicionar "Resultado: SUCESSO/PARCIAL/FALHA" + narrativa ao evento de retorno)
- Prioridade: MÉDIO/BAIXO = **ALTO**

---

**PAIN-08: Uso de cartas desconectado do combate**
- Descrição: Ativar cartas de combate exige navegar para /game/cards, ativar, e retornar ao mapa — sem integração com o modal de combate.
- Frequência: 3/6 agentes mencionaram
- Impacto no objetivo final: MÉDIO (fluxo quebrado reduz uso estratégico de cartas)
- Esforço de implementação: MÉDIO (exibir cartas disponíveis no modal de expedição/combate)
- Prioridade: MÉDIO/MÉDIO = **MODERADO**

---

**PAIN-09: Personalidades de IA não comunicadas**
- Descrição: Cada IA tem personalidade (CONQUEROR, DEFENDER, OPPORTUNIST, MERCHANT) mas o jogador não as conhece. Ataques de AI4 (MERCHANT) foram surpresa.
- Frequência: 2/6 agentes mencionaram
- Impacto no objetivo final: BAIXO (cria imprevisibilidade — pode ser design intencional)
- Esforço de implementação: BAIXO (mostrar personalidade ao inspecionar clã no mapa)
- Prioridade: BAIXO/BAIXO = **MENOR**

---

**PAIN-10: Facção Verdaneos e Ferronatos sem diferença no client**
- Descrição: Bônus de facção existe no servidor (ResourceSystem, CombatSystem) mas o jogo usa Zustand client-side. Nenhuma facção tem bônus real no client.
- Frequência: 2/6 agentes perceberam
- Impacto no objetivo final: ALTO (choice de facção sem consequência = ilusão de profundidade)
- Esforço de implementação: ALTO (requer conectar client ao backend, ou implementar bônus no Zustand)
- Prioridade: ALTO/ALTO = **MODERADO** (alto impacto mas alto esforço)

---

### GAINS (O que funciona — não tocar)

**GAIN-01: Transição de Era**
Todos os 6 agentes mencionaram a transição de era como positiva. "O Pacto das Cinzas foi rompido!" + mudança de background + carta = momento de design excelente. É o melhor feature do jogo.
Confirmado por: 6/6 agentes. **NÃO TOCAR.**

**GAIN-02: Wall como defesa passiva**
Wall foi citada como MVP por 4/6 agentes. O design de Wall sendo barata e altamente efetiva cria uma decisão estratégica clara. É satisfatória quando funciona.
Confirmado por: 4/6 agentes. **NÃO TOCAR.**

**GAIN-03: Horda atacar o mais forte**
Mecânica elegante de rubber-band. Punição ao snowball sem ser injusta. Agent-D (estratégia reativa) sobreviveu especificamente por causa disso.
Confirmado por: 3/6 agentes. **NÃO TOCAR.**

**GAIN-04: Narrativas de exploração**
Os textos de resultado de exploração ("A neblina envolve suas tropas...") foram consistentemente elogiados como atmosféricos.
Confirmado por: 3/6 agentes. **NÃO TOCAR.**

**GAIN-05: Clareza visual do mapa**
Cores de propriedade (seu/inimigo/neutro) foram elogiadas unanimemente como intuitivas.
Confirmado por: 6/6 agentes. **NÃO TOCAR.**

---

## 3. Backlog Priorizado

| # | Problema | Frequência | Impacto | Esforço | Prioridade |
|---|---------|------------|---------|---------|-----------|
| 1 | PAIN-01: Sem preview de combate | 6/6 | Alto | Médio | **P1** |
| 2 | PAIN-04: Sem tutorial contextual | 3/6 | Alto | Médio | **P1** |
| 3 | PAIN-02: Umbral sem espiões | 1/6 | Alto | Médio | **P1** |
| 4 | PAIN-03: Timer durante navegação | 5/6 | Alto | Médio | **P2** |
| 5 | PAIN-05: Batalhas AI no log | 4/6 | Médio | Baixo | **P2** |
| 6 | PAIN-06: Limite estruturas visível | 3/6 | Médio | Baixo | **P2** |
| 7 | PAIN-07: Resultado exploração | 3/6 | Médio | Baixo | **P2** |
| 8 | PAIN-08: Cartas no modal de combate | 3/6 | Médio | Médio | **P3** |
| 9 | PAIN-10: Bônus facção no client | 2/6 | Alto | Alto | **P3** |
| 10 | PAIN-09: Personalidades IA | 2/6 | Baixo | Baixo | **P4** |
