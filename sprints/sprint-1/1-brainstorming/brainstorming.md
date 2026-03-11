# Brainstorming — Análise Pain/Gain — Sprint 01 Baseline

**Wave:** 1 | **Sprint:** 01-baseline | **Data:** 2026-03-10
**Agentes:** 6 (A–F) | **NPS Médio:** 5.5/10
**Método:** Cruzamento de 6 logs turno-a-turno × 6 entrevistas + 2 entrevistas especiais (campeão e último lugar)

---

## Divergências Log vs Entrevista (Insights Críticos)

> Divergências são os problemas mais honestos — o agente sofreu mas não soube nomear.

### Divergência 1 — Agent-A: timer minimizado na entrevista
**Log (T1–T2):** "O timer continuou correndo enquanto eu navegava! Perdi o turno 1 sem agir no tempo." / "Toda ação exige navegar para outra página. Isso é muito lento dado que o timer é de 10 segundos." Frequência: registrado em 7+ turnos.
**Entrevista:** "fluxo fragmentado" — formulação abstrata que suaviza a frustração visceral do log.
**Insight:** Jogadores experientes racionalizam o timer como "custo aceito" mas continuam sofrendo com ele. O problema é maior do que as entrevistas revelam.

### Divergência 2 — Agent-A: vitória "oca" vs "satisfatória"
**Log (T50):** "A vitória foi levemente oca — me senti o 'que sobreviveu melhor', não o dominante."
**Entrevista:** "Satisfatória." Avaliação normalizada retrospectivamente.
**Insight:** A tela de vitória não comunica por que o jogador venceu — sem narrativa de mérito, a vitória perde peso emocional. O jogo entrega resultado sem significado.

### Divergência 3 — Agent-B: diplomacia como estratégia vs como sorte
**Log (T19):** Alegria genuína quando AI3 aceitou paz: "Alívio imenso." Sentiu que a estratégia funcionou.
**Entrevista:** "Diplomacia é dependente de sorte — 20% de aceitar é baixíssimo."
**Insight:** O momento de sucesso diplomático é emocionalmente satisfatório, mas a percepção sistêmica é de arbitrariedade. O jogador quer que diplomacia seja habilidade, não dado.

### Divergência 4 — Agent-E: nota 4/10 subestima a experiência
**Log (T1):** "O bônus do clã Umbral não existe na prática! Isso é uma ilusão de escolha." — Descoberta imediata, visceral, no turno 1.
**Entrevista:** Nota 4/10, formulação abstrata sobre "promessa não cumprida."
**Insight:** A experiência real foi pior que 4/10. Agent-E jogou 33 turnos em modo de compensação por uma mecânica ausente. O log documenta desespero progressivo; a entrevista documentou a versão racionalizada.

### Divergência 5 — Agent-F: timer culpado pela falha, mas o real culpado é onboarding
**Log:** Em todos os momentos de falha, o problema documentado era "não sabia que precisava de Barracks", "não sabia o mínimo de unidades", "não sabia que paz impede ataque."
**Entrevista:** Carlos identificou "o timer" como problema central.
**Insight crítico:** Novatos atribuem a causa errada às suas falhas. Carlos não falhou por causa do timer — falhou por ausência de tutorial contextual. Esse insight é mais acionável: resolver timer não resolve o problema de Carlos. Resolver onboarding, sim.

---

## Dores

Problemas reais identificados no playtesting, com evidências dos logs.

### D-001 — Combate às cegas (sem preview)
Atacar um território não mostra poder de ataque vs defesa estimado antes de confirmar. Toda batalha é uma caixa preta.
> *Evidência — Agent-A (T16):* "A interface de ataque pediu para selecionar território de origem. Mas não mostrou preview de combate antes de enviar! Não sei se vou ganhar ou perder."
> *Evidência — Agent-C (T21):* "Perdi 15 soldados contra AI4 sem qualquer indicação prévia de que seria uma derrota. Em AoE2 eu sempre sei aproximadamente se vou ganhar antes de atacar."
> *Evidência — Agent-D (entrevista):* "Com a carta Informante consegui antecipar parcialmente. Sem ela, zero previsibilidade."

**Frequência:** 6/6 — todos que combateram sofreram derrotas inesperadas.

### D-002 — Timer não para durante navegação
O timer de 10 segundos avança enquanto o jogador navega entre páginas (/game → /game/territory/:id → /game/cards → voltar). Ações compostas custam turnos.
> *Evidência — Agent-A (T1):* "Quando voltei ao mapa, já estava no turno 2. Perdi o turno 1 sem agir no tempo porque a navegação é lenta."
> *Evidência — Agent-B (T1):* "O timer me causa ansiedade. Não quero agir errado. Precisava de pelo menos 30 segundos."
> *Evidência — Agent-C (T16):* "Tinha que ativar a carta em página separada ANTES de enviar o ataque. Perdeu segundos preciosos do timer."

**Frequência:** 5/6

### D-003 — Facção Umbral não implementada
A facção Umbral promete "+30% eficiência de espiões" como bônus. A unidade SPY não existe no gameStore do client. Bônus é fantasma. Jogador escolhe facção baseado em mecânica inexistente.
> *Evidência — Agent-E (T1):* "O bônus do clã Umbral (+30% eficiência de espiões) não existe na prática! Não há unidade SPY disponível no cliente. Escolhi Umbral por um motivo que não existe."
> *Evidência — Agent-E (entrevista):* "Isso é a maior quebra de confiança do produto atual."

**Frequência:** 1/6 (escolheu Umbral), mas impacta todos — a facção está disponível na seleção.

### D-004 — Ausência de tutorial contextual
Não há tooltips inline, missões guia nem onboarding no fluxo de jogo. "Como Jogar" existe em página separada, inacessível sem custar turnos.
> *Evidência — Agent-F (T4):* "Não há forma óbvia de recrutar soldados. Não há tutorial em contexto. Não há dica do tipo 'Construa Barracks para recrutar'."
> *Evidência — Agent-F (T7):* "Há um progresso 'Turno 7/50' no header mas não indica quantos turnos até a Era da Guerra."
> *Evidência — last-place (entrevista):* "Precisaria: Missão 1: Construa uma estrutura de produção. Missão 2: Para recrutar, você precisa de Barracks. Isso resolve 90% dos meus problemas."

**Frequência:** 3/6 criticamente impactados; 2/6 perderam turnos.

### D-005 — Resultado de batalhas entre AIs ausente no log
O log de eventos mostra "AI3 atacou AI2" mas não o resultado (quem ganhou, baixas). Impossibilita estratégia reativa baseada em informação.
> *Evidência — Agent-D (T17):* "O evento disse apenas 'atacou' mas não o RESULTADO. Não sei se AI3 ganhou ou perdeu. O log de eventos deveria mostrar o resultado das batalhas entre AIs."
> *Evidência — Agent-A (entrevista 5):* "O log só rastreia eventos do jogador. Fiquei sabendo que AI3 avançou apenas pelo mapa, não pelos eventos."

**Frequência:** 4/6

### D-006 — Limite de 4 estruturas não comunicado
Máximo de 4 estruturas por território descoberto apenas ao tentar exceder — sem indicador de slots disponíveis nem aviso preventivo.
> *Evidência — Agent-B (T17):* "Não posso construir Wall em T1 porque está cheio. A limitação de 4 estruturas nunca foi explicada."
> *Evidência — Agent-C (T11):* "Wall em T0 deixou apenas 1 slot vazio. Stable não cabe mais em T0. Falha de planejamento — o jogo não me deu um planejamento visual de slots."
> *Evidência — Agent-D (T9):* "Esqueci que Wall já ocupava um slot. T0 está full. Stable não vai caber aqui nunca."

**Frequência:** 3/6

### D-007 — Resultado de exploração pouco claro
Exploração retorna tropas e possivelmente recursos mas sem indicar claramente sucesso/parcial/falha. Probabilidades invisíveis. Na primeira exploração de Agent-A, o resultado "zero" sem explicação pareceu bug.
> *Evidência — Agent-A (T7):* "CRÍTICO: A interface não mostra o resultado da exploração (sucesso/parcial/falha). Só vejo 'tropas retornaram' com recursos zerados. Não sei se foi falha completa ou bug."
> *Evidência — Agent-E (T10):* "Resultado 'partial' rendeu 52 gold mas não sei o que determinou o resultado. O jogador não tem como saber isso. Nenhuma indicação de probabilidade de sucesso."

**Frequência:** 3/6

### D-008 — Cartas desconectadas do fluxo de combate
Ativar cartas de combate exige navegar para /game/cards, ativar, retornar ao mapa e então atacar. Não há integração com o modal de combate/expedição.
> *Evidência — Agent-C (T16):* "Tinha que ativar a carta em página separada ANTES de enviar o ataque. Fluxo desconexo: /cards → voltar → /map → atacar."
> *Evidência — Agent-A (entrevista 8):* "Usar uma carta exige: /game/cards → ativar → voltar → atacar. Não há integração da carta com o modal de combate."

**Frequência:** 3/6

### D-009 — Diplomacia sem controle — resultado puramente probabilístico
Propor paz é uma jogada de dados. Sem gift-giving, sem building de reputação gradual, sem negociação. Aceitação depende de acceptChance por personalidade (20% CONQUEROR, 40% OPPORTUNIST, 60% MERCHANT, 80% DEFENDER).
> *Evidência — Agent-B (T7-T8):* "Propus paz com AI2 duas vezes. Rejeitado. Rejeitado. Não há mecanismo para melhorar relacionamentos gradualmente. A diplomacia é muito binária."
> *Evidência — Agent-E (entrevista 10):* "Propus paz com AI2 5+ vezes e foi rejeitada sempre (40% chance). A aceitação é probabilística sem nenhum elemento de controle para o jogador."

**Frequência:** 3/6

### D-010 — Bônus de facção existem apenas no servidor
Bônus de Verdaneos (+20% grain), Ferronatos (+20% combate) e Áureos existem em ResourceSystem.ts e CombatSystem.ts no servidor, mas o jogo usa Zustand client-side. Nenhuma facção tem bônus real durante o jogo do cliente.
> *Evidência — Agent-A (champion.md):* "O bônus Verdaneos está no servidor mas o jogo roda no Zustand client-side. A produção de Farm era 12/turno para todos, sem diferenciação de facção. A escolha de facção no client é flavor sem mecânica."

**Frequência:** 2/6 perceberam (os mais analíticos)

### D-011 — Tela de vitória sem narrativa de mérito
A tela de fim de jogo mostra "Você sobreviveu! Recursos finais: X" sem explicar por que o jogador venceu (maior economia? melhor defesa? sobrevivência na Horda?).
> *Evidência — Agent-A (champion.md):* "Gostaria de uma tela que explicasse POR QUE venci. Agora é apenas 'Vitória! Recursos finais: X.' Sem contexto. '465 pontos' não significa nada para mim."

**Frequência:** 1/6 articulou, mas divergência log-entrevista sugere que todos sentiram levemente.

### D-012 — Sem indicador de progresso para próxima era
Não há countdown "Era da Guerra em X turnos" nem linha do tempo das 3 eras visível durante o jogo.
> *Evidência — Agent-F (T7):* "Quanto tempo ainda de paz? Não há contador óbvio de 'X turnos até Era da Guerra'."
> *Evidência — Agent-B (entrevista 6):* "Gostaria de ver um painel de 'próximos eventos' mostrando 'Era da Guerra em X turnos'."

**Frequência:** 2/6

### D-013 — Sabotagem aleatória — alvo de estrutura não escolhido
A carta Sabotagem destrói uma estrutura inimiga aleatória. Jogador não pode escolher qual estrutura destruir nem saber qual foi destruída.
> *Evidência — Agent-E (T16):* "Sabotagem é aleatória! Não posso escolher qual estrutura destruir. Nem ver qual foi destruída. É um poder cego."

**Frequência:** 1/6 (única que usou a carta com intenção estratégica)

### D-014 — Population tracking zerado no client
O campo population dos clãs retorna sempre 0 no client (TODO no código). Afeta pontuação e comunicação de força do clã.
> *Evidência — Agent-A (T50):* "Pontuação calculada: population sempre 0 na UI — scoring broken."
> *Evidência — ranking.md:* "Population tracking retorna sempre 0 no client (TODO no código), portanto não incluído."

**Frequência:** 2/6 perceberam

### D-015 — AI mesma facção começa como HOSTILE
AI2 é da facção Umbral mas começa com relação HOSTILE ao jogador Umbral. O lore diz que Umbral são aliados entre si, mas a mecânica ignora relações de facção.
> *Evidência — Agent-E (T2):* "AI2 é da facção Umbral e começa como HOSTILE. A identidade da facção não impacta as relações diplomáticas iniciais. O lore e a mecânica estão desconectados."

**Frequência:** 1/6

---

## Ganhos

O que funciona — não tocar.

### G-001 — Transição de Era
A mudança de Peace → War com evento "O Pacto das Cinzas foi rompido!", mudança de background visual, e entrega de carta foi unanimemente o momento mais memorável do jogo.
> *Agent-A (T15):* "EXCELENTE feedback visual. A transição de era foi dramática e clara."
> *Agent-C (entrevista 13):* "Completamente. É o melhor momento do jogo. 10/10."
**Confirmado por 6/6 agentes. NÃO TOCAR.**

### G-002 — Wall como defesa passiva MVP
Wall foi citada como o melhor investimento do jogo por sua eficiência custo-benefício. O design de Wall barata e altamente efetiva cria uma decisão estratégica clara com recompensa tangível.
> *Agent-C (T18):* "WALL. É o MVP do jogo. Sem ela teria perdido T0."
> *Agent-B (T22):* "'Wall é o investimento mais rentável do jogo.'"
**Confirmado por 4/6 agentes. NÃO TOCAR.**

### G-003 — Horda atacar o mais forte (anti-snowball)
Mecânica elegante de rubber-band. A Horda prioriza o clã com mais territórios, criando desincentivo natural ao snowball sem parecer injusto.
> *Agent-D (entrevista 11):* "A ironia de que o clã mais forte do jogo foi destruído pela Horda enquanto eu sobrevivi. Aquele momento de 'karma' foi satisfatório."
**Confirmado por 3/6 agentes. NÃO TOCAR.**

### G-004 — Narrativas de exploração
Os textos de resultado de exploração ("A neblina envolve suas tropas...", "Armadilhas mágicas cobraram seu preço, mas alguns tesouros foram resgatados") são consistentemente elogiados como atmosféricos.
> *Agent-E (entrevista 11):* "A narrativa foi deliciosa. Queria mais desses momentos."
> *Agent-A (T4):* "A narração da exploração é atmosférica. Gostei muito do sabor textual."
**Confirmado por 3/6 agentes. NÃO TOCAR.**

### G-005 — Clareza visual do mapa
Cores de propriedade (seu/inimigo/neutro) são intuitivas sem necessidade de texto.
> *Agent-F (entrevista 4):* "Sim! As cores foram a coisa mais clara do jogo para mim. Amarelo = eu, vermelho = inimigo. Intuitivo."
**Confirmado por 6/6 agentes. NÃO TOCAR.**

### G-006 — Feedback de conquista (VITÓRIA + saque)
O evento "VITÓRIA! Território conquistado! + saque listado" com recursos explicitados foi identificado como momento de satisfação genuína.
> *Agent-A (T18):* "Conquistar o primeiro território inimigo foi muito satisfatório. O feedback 'VITÓRIA!' com o saque listado foi ótimo."
> *Agent-A (entrevista 11):* "Quando conquistei T2 e vi o saque listado. Queria imediatamente conquistar mais."
**Confirmado por 3/6 agentes. NÃO TOCAR.**

---

## Alívios (Como Aliviar Cada Dor)

| Dor | Proposta de Alívio |
|-----|-------------------|
| D-001: Combate às cegas | Exibir preview no modal de ataque: "Seu poder: ~X | Defesa estimada: ~Y | Probabilidade: alta/média/baixa" |
| D-002: Timer durante navegação | Pausar timer quando usuário navega fora de /game (main), ou consolidar ações em painéis/modals na mesma página |
| D-003: Umbral sem espiões | Implementar unidade SPY no client OU remover/marcar a facção como "Em breve" na seleção |
| D-004: Sem tutorial contextual | Missões guia nos primeiros 3 turnos: setas/highlights contextuais em vez de página separada |
| D-005: Batalhas AI sem resultado | Adicionar resultado (vencedor, baixas estimadas) ao log de eventos para combates entre AIs |
| D-006: Limite de estruturas invisível | Indicador visual "X/4 slots" no tile do território + tooltip "planeje antes de construir" |
| D-007: Resultado de exploração pouco claro | Exibir "Resultado: SUCESSO / PARCIAL / FALHA" + poder necessário estimado no modal de exploração |
| D-008: Cartas desconectadas | Mostrar cartas elegíveis no modal de expedição/combate com botão de ativar inline |
| D-009: Diplomacia só dados | Adicionar ação "Enviar presente" (+10% acceptChance) como mecânica de influência ativa |
| D-010: Bônus de facção só no servidor | Implementar bônus de facção no Zustand store, ou sincronizar com backend via API call no início do jogo |
| D-011: Vitória sem narrativa | Tela de resultado com "Você venceu por: [economia forte / defesa superior / sobrevivência]" baseado nas métricas |
| D-012: Sem countdown de era | Adicionar indicador "Era da Guerra em X turnos" visível no HUD durante a Era da Paz |
| D-013: Sabotagem cega | Permitir escolher qual estrutura destruir (dropdown de estruturas do alvo) |
| D-014: Population zerada | Implementar ou remover o campo population do display — zero é pior que ausente |
| D-015: AI mesma facção hostil | Inicializar relação diplomática como NEUTRAL (não HOSTILE) entre jogadores da mesma facção |

---

## Criadores de Ganho (Como Ampliar Cada Ganho)

| Ganho | Como Amplificar |
|-------|----------------|
| G-001: Transição de Era | Adicionar countdown visual no HUD + breve cutscene com texto narrativo na transição |
| G-002: Wall como MVP | Comunicar o bônus de Wall explicitamente no tooltip ("Reduz dano recebido em 20%") |
| G-003: Horda anti-snowball | Comunicar ao jogador que "Horda prioriza o mais forte" — tornar o design intencional visível |
| G-004: Narrativas de exploração | Expandir variedade de textos + adicionar narrativa para falhas ("Suas tropas recuaram em desordem...") |
| G-005: Clareza visual do mapa | Adicionar mini-legenda de ícones para estruturas no tile (Farm, Barracks, Wall) para estado rápido |
| G-006: Feedback de conquista | Adicionar animação de conquista (flash de cor + som) para amplificar o momento |

---

## Priorização (Score 1–10 com Justificativa)

| ID | Dor | Score | Justificativa |
|----|-----|-------|--------------|
| D-001 | Combate às cegas | **10** | 6/6 afetados; derrota injusta = abandono; previewCombat() já existe no código — apenas UI |
| D-004 | Sem tutorial contextual | **9** | Causa eliminação precoce de novatos; sem onboarding, 33% dos jogadores não aprendem o jogo |
| D-002 | Timer durante navegação | **8** | 5/6 afetados; divergência log-entrevista confirma problema maior que relatado; fácil corrigir com pausa de timer |
| D-003 | Umbral sem espiões | **8** | Promessa falsa na seleção de facção = quebra de confiança; crítico para integridade do produto |
| D-005 | Batalhas AI sem resultado | **7** | 4/6 afetados; implementação trivial (baixo esforço); alto impacto em estratégias reativas |
| D-006 | Limite estruturas invisível | **7** | 3/6 afetados; erro irreversível de planejamento; correção simples (mostrar "X/4 slots") |
| D-007 | Resultado exploração pouco claro | **6** | 3/6 afetados; prejudica uma mecânica que os agentes gostaram; baixo esforço para corrigir |
| D-012 | Sem countdown de era | **6** | 2/6 mencionaram; impacto alto para novatos que não sabem quanto dura a Paz |
| D-008 | Cartas desconectadas | **5** | 3/6 afetados; fluxo quebrado reduz uso estratégico; médio esforço |
| D-009 | Diplomacia só dados | **5** | 3/6 afetados; potencial alto mas implementação mais complexa |
| D-010 | Bônus de facção só no servidor | **4** | Alto impacto mas alto esforço; deixar para sprint futuro após resolver os críticos |
| D-011 | Vitória sem narrativa | **4** | 1/6 articulou mas divergência log-entrevista sugere latência; sprint futuro |
| D-013 | Sabotagem cega | **3** | 1/6 usou com intenção; menor impacto geral |
| D-015 | AI mesma facção hostil | **3** | 1/6 afetado; fix simples mas baixa prioridade |
| D-014 | Population zerada | **2** | Cosmético no estado atual; fix técnico direto mas não urgente |
