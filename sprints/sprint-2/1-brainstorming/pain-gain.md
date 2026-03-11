# Pain/Gain Map — Dice&Cards Era

**Última atualização:** Sprint 02 Baseline (2026-03-10)
**Total de discoveries:** 35 (27 pains + 8 gains)
**Sprint 1:** Wave 1 | NPS: 5.5/10 | Sprint 2: Wave 2 | NPS: 5.0/10

---

## Tabela de Discoveries

### Sprint 1 — Wave 1 (Discoveries D-001 a D-015, G-001 a G-006)

| ID | Tipo | Categoria | Descrição | Frequência | Score (1–10) | Sprint | Implementado? |
|----|------|-----------|-----------|------------|--------------|--------|---------------|
| D-001 | pain | mecanica | **Sem preview de combate.** Atacar não mostra poder de ataque vs defesa estimado antes de confirmar. Toda batalha é caixa preta. Sprint 2 revelou que o problema é ainda mais fundamental: não há ação de ataque na UI em absoluto (ver D-016). > *"A interface de ataque não mostrou preview de combate antes de enviar! Não sei se vou ganhar ou perder." (Agent-A, T16, Sprint 1)* | 6/6 | 10 | 1 | não |
| D-002 | pain | interface | **Timer não para durante navegação entre páginas.** Timer de 10s avança em /game/territory, /game/cards, /game/army. Ações compostas custam turnos. Confirmado em Sprint 2 por 4/6 agentes. > *"Quando voltei ao mapa, já estava no turno 2. Perdi o turno 1 sem agir porque a navegação é lenta." (Agent-A, T1, Sprint 1)* | 5/6 | 8 | 1 | não |
| D-003 | pain | mecanica | **Facção Umbral sem espiões implementados (Sprint 1).** Bônus "+30% eficiência de espiões" prometido na seleção. Em Sprint 2, Agent-E conseguiu treinar espiões com sucesso — sugere implementação parcial. > *"Não há unidade SPY disponível no cliente. Escolhi Umbral por um motivo que não existe." (Agent-E, T1, Sprint 1)* | 1/6 | 8 | 1 | parcial (S2: treinamento funciona; eficiência bônus não verificada) |
| D-004 | pain | interface | **Sem tutorial contextual.** "Como Jogar" existe em página separada mas sem tooltips inline, missões guia ou onboarding no fluxo. Clicar no tutorial custa turnos. Confirmado S2 (Agent-F Q2: botão "Requer: Quartel" cinza sem destaque). > *"Não há dica do tipo 'Construa Barracks para recrutar'." (Agent-F, T4, Sprint 1)* | 3/6 | 9 | 1 | não |
| D-005 | pain | interface | **Resultado de batalhas entre AIs ausente no log.** Evento mostra "AI3 atacou AI2" sem resultado (vencedor, baixas). Impossibilita estratégia reativa. Confirmado S2. > *"O evento disse apenas 'atacou' mas não o RESULTADO." (Agent-D, T17, Sprint 1)* | 4/6 | 7 | 1 | não |
| D-006 | pain | interface | **Limite de 4 estruturas por território não comunicado.** Descoberto apenas ao tentar exceder. Erro de planejamento irreversível sem demolição. > *"A limitação de 4 estruturas nunca foi explicada." (Agent-B, T17, Sprint 1)* | 3/6 | 7 | 1 | não |
| D-007 | pain | mecanica | **Resultado de exploração pouco claro.** Retorno mostra recursos mas sem indicar sucesso/parcial/falha. Probabilidades invisíveis. > *"A interface não mostra o resultado (sucesso/parcial/falha). Só vejo 'tropas retornaram' com recursos zerados." (Agent-A, T7, Sprint 1)* | 3/6 | 6 | 1 | não |
| D-008 | pain | interface | **Cartas desconectadas do fluxo de combate.** Ativar cartas de combate exige: /game/cards → ativar → voltar ao mapa → atacar. Sprint 2: sem combate disponível, cartas são totalmente inutilizáveis (D-024). > *"Tinha que ativar a carta em página separada ANTES de enviar o ataque." (Agent-C, T16, Sprint 1)* | 3/6 | 5 | 1 | não |
| D-009 | pain | agencia | **Diplomacia puramente probabilística sem controle.** Propor paz = jogada de dados (acceptChance por personalidade). Sem gift-giving, negociação gradual ou influência ativa. Sprint 2 adiciona: sem feedback algum de aceitação/rejeição (D-025). > *"Propus paz com AI2 cinco vezes, rejeitada todas. A aceitação é probabilística sem elemento de controle." (Agent-E, entrevista, Sprint 1)* | 3/6 | 5 | 1 | não |
| D-010 | pain | mecanica | **Bônus de facção implementados apenas no servidor.** Verdâneos (+20% grain), Ferronatos (+20% combate) existem no backend mas jogo usa Zustand client-side. Sprint 2: mesmo se funcionassem, diferença é imperceptível (D-023). > *"A produção de Farm era 12/turno para todos, sem diferenciação de facção na prática do cliente." (Agent-A, champion.md, Sprint 1)* | 2/6 | 4 | 1 | não |
| D-011 | pain | diversao | **Tela de vitória sem narrativa de mérito.** Resultado exibe "Você sobreviveu! Recursos finais: X" sem explicar por que venceu. Vitória emocionalmente vazia. > *"Gostaria de uma tela que explicasse POR QUÊ venci." (Agent-A, champion.md, Sprint 1)* | 1/6 | 4 | 1 | não |
| D-012 | pain | interface | **Sem indicador de progresso para próxima era.** Não há countdown "Era da Guerra em X turnos" nem linha do tempo das 3 eras no HUD. > *"Não há contador óbvio de 'X turnos até Era da Guerra'." (Agent-F, T7, Sprint 1)* | 2/6 | 6 | 1 | não |
| D-013 | pain | agencia | **Carta Sabotagem: alvo de estrutura não escolhido.** Destrói estrutura inimiga aleatória. Jogador não pode escolher qual estrutura destruir. > *"Sabotagem é aleatória! Não posso escolher qual estrutura destruir." (Agent-E, T16, Sprint 1)* | 1/6 | 3 | 1 | não |
| D-014 | pain | bugs | **Population tracking zerado no client.** Campo population sempre retorna 0 no client (TODO no código). Sprint 2 confirma: todos terminaram com pop. base idêntica (1.000 pts fixos). > *"Population sempre 0 na UI — scoring broken." (Agent-A, Sprint 1)* | 2/6 | 2 | 1 | não |
| D-015 | pain | mecanica | **AI de mesma facção começa como HOSTILE.** Lore indica aliança entre membros da mesma facção, mas relação diplomática inicial ignora isso. > *"AI2 é da facção Umbral e começa como HOSTILE. O lore e a mecânica estão desconectados." (Agent-E, T2, Sprint 1)* | 1/6 | 3 | 1 | não |
| G-001 | gain | diversao | **Transição de era é o melhor momento do jogo.** Evento dramático + mudança visual + carta = memorável. Confirmado S2 por todos os 6 agentes. > *"Completamente. É o melhor momento do jogo. 10/10." (Agent-C, Sprint 1)* | 6/6 | 10 | 1 | — |
| G-002 | gain | mecanica | **Wall como defesa passiva MVP.** Wall barata e efetiva cria decisão estratégica clara. Confirmado S2: Agent-D usou Wall + bônus Ferronatos para repelir ataque com satisfação genuína. > *"WALL. É o MVP do jogo." (Agent-C, Sprint 1)* | 4/6 | 9 | 1 | — |
| G-003 | gain | mecanica | **Horda como mecanismo anti-snowball.** Prioriza clã com mais territórios. Confirmado S2 por 4/6 agentes com forte reação emocional. > *"A mecânica da Horda atacar o mais forte é elegante." (Agent-D, Sprint 1)* | 3/6 | 8 | 1 | — |
| G-004 | gain | diversao | **Narrativas atmosféricas de exploração.** Textos imersivos de resultado. Fortemente confirmado S2 (Agent-F chamou de melhor parte do jogo). > *"A narrativa foi deliciosa. Queria mais desses momentos." (Agent-E, Sprint 1)* | 3/6 | 7 | 1 | — |
| G-005 | gain | interface | **Clareza visual do mapa.** Cores de propriedade intuitivas. Confirmado S2 por todos os agentes. > *"Amarelo = eu, vermelho = inimigo. Intuitivo." (Agent-F, Sprint 1)* | 6/6 | 9 | 1 | — |
| G-006 | gain | diversao | **Feedback de conquista com saque listado.** Evento de vitória com recursos listados cria loop de reward. Não testável em S2 (sem conquistas possíveis — sem ataque). > *"O evento 'VITÓRIA!' com o saque listado foi ótimo." (Agent-A, Sprint 1)* | 3/6 | 7 | 1 | — |

---

### Sprint 2 — Wave 2 (Discoveries D-016 a D-027, G-007 a G-008)

> Mínimo 10 itens novos por wave. Sprint 2: 12 pains + 2 gains = 14 novos itens.

| ID | Tipo | Categoria | Descrição | Frequência | Score (1–10) | Sprint | Implementado? |
|----|------|-----------|-----------|------------|--------------|--------|---------------|
| D-016 | pain | interface | **Ausência total de UI de ataque PvP.** Não existe botão, rota ou modal para o jogador atacar territórios. A IA ataca, o jogador não pode. Era da Guerra anuncia combate que não entrega. CombatSystem.ts existe no backend. Distinção de D-001 (que era sobre preview): D-016 é sobre a AUSÊNCIA da ação em si. > *"RAIVA. Eu tenho soldados. Tenho um território adjacente. A guerra é MINHA estratégia. E o jogo não me deixa atacar." (Agent-C, T3) / "A IA CONSEGUE COMBATER, mas o JOGADOR NÃO CONSEGUE." (Agent-B, T13)* | 6/6 | 10 | 2 | não |
| D-017 | pain | interface | **Timer de 10s corta ações em andamento.** Diferente de D-002 (timer avança na navegação), D-017 é o timer disparando ENQUANTO o agente executa uma ação (treino, confirmação, leitura). Ritmo do jogo se torna estressante e punitivo. > *"O turno de 10 segundos me pegou no meio de uma ação. Estava clicando em 'Treinar' e o turno virou." (Agent-F, T5) / "Os 10 segundos são MUITO rápidos — mal dá tempo de ler." (Agent-A, T2)* | 4/6 | 7 | 2 | não |
| D-018 | pain | interface | **Treino de unidades sem opção de lote (1 por vez).** Para treinar 5 soldados, o jogador clica 5 vezes individualmente. Tedioso e improdutivo em contexto de estratégia. > *"Só posso treinar 1 por vez! Não há opção de 'treinar X unidades' — para um jogo de estratégia, isso é tedioso." (Agent-C, T2)* | 2/6 | 5 | 2 | não |
| D-019 | pain | mecanica | **Custos de construção contraintuitivos: Serraria custa grão, não madeira.** A estrutura que produz madeira não requer madeira para ser construída. Contradiz expectativa mental e causa bloqueio econômico no early game para jogadores que não leram o custo. > *"Serraria não precisa de madeira para ser construída. Os custos não são intuitivos o suficiente para evitar esse erro." (Agent-B, T2) / 4/6 agentes tiveram premissas incorretas sobre custos de estruturas.* | 4/6 | 7 | 2 | não |
| D-020 | pain | interface | **Sem aviso proporcional de custo ("isso usa X% dos seus recursos").** Preço em vermelho existe mas não comunica "isso representa 100% do seu estoque de madeira". Novatos e jogadores que não calculam previamente são penalizados. > *"Uma indicação proporcional — tipo 'isso usa 100% da sua madeira' — evitaria o bloqueio sem remover a decisão do jogador." (Agent-B, last-place.md) / "Não há aviso do tipo 'isso vai usar TODA sua madeira!'" (Agent-F, T4)* | 3/6 | 7 | 2 | não |
| D-021 | pain | interface | **Sem ranking/placar visível durante a partida.** Não há indicador de posição relativa (1.º/3.º) enquanto o jogo está em andamento. Vitória é "surpresa administrativa", não momento emocional. > *"O jogo não tem placar visível durante a partida. Não há indicador de 'você está em X lugar de 3'. A vitória chegou por default, não por maestria." (Agent-A, champion.md)* | 2/6 | 6 | 2 | não |
| D-022 | pain | mecanica | **Sem ação de mover/reposicionar tropas entre territórios.** Não é possível consolidar defesa movendo unidades de um território para outro. Estratégias de concentração de força são impossíveis. > *"Reposicionar tropas — mover soldados de um território para outro para consolidar defesa. Não existe essa ação." (Agent-D, entrevista) / "Reforçar um território com tropas vindas de outro." (Agent-B, entrevista)* | 2/6 | 6 | 2 | não |
| D-023 | pain | mecanica | **Bônus de facção invisível: diferença numérica imperceptível.** Mesmo que o bônus funcione, +2 grãos/turno por Fazenda (diferença do +20%) não é perceptível sem UI que destaque "produção base vs produção com bônus de facção". A facção não existe mecanicamente para o jogador. > *"Com bônus +20% = 12 grãos/turno. Diferença de 2 grãos não é perceptível sem painel que mostre 'produção com bônus'. Se a facção dá bônus invisíveis, ela não existe." (Agent-A, champion.md)* | 2/6 | 6 | 2 | não |
| D-024 | pain | mecanica | **Sistema de cartas completamente inutilizável sem contexto de combate.** Sem ação de ataque disponível, cartas que dependem de batalha ficam ornamentais. 5/6 agentes mencionaram ter cartas não-utilizadas. Evolução mais severa de D-008 (que pressupunha combate existente). > *"Sem batalha ativa, a carta ficou inútil." (Agent-C) / "Sistema de cartas sem contexto de uso imediato é decoração para novatos." (Agent-F) / "Ficaram acumulando na mão sem uso." (Agent-B) / "Sem contexto de batalha ativa, as cartas parecem ornamentais." (Agent-A)* | 5/6 | 8 | 2 | não |
| D-025 | pain | mecanica | **Diplomacia sem feedback de aceitação/rejeição de propostas.** Proposta de aliança enviada desaparece em um void. Sem saber se foi aceita ou rejeitada, planejamento diplomático é impossível. Evolução de D-009 (que era sobre probabilidade): D-025 é sobre ausência de resposta alguma. > *"Proposta de aliança parece entrar em um void — sem feedback de aceitação ou rejeição é impossível planejar ao redor disso." (Agent-E, entrevista) / "Não encontrei onde ver minha reputação diplomática na interface." (Agent-A, entrevista)* | 2/6 | 5 | 2 | não |
| D-026 | pain | diversao | **Expedições escondidas — o melhor sistema do jogo não é apresentado.** As Expedições são o sistema mais satisfatório (narrativa + risco + recompensa), mas estão acessíveis apenas via navegação manual. Novato as encontrou por acidente no T9. Sem onboarding, o maior diferencial do jogo é invisível. > *"Encontrei as Expedições por ACIDENTE. Mudou completamente como encarei o jogo." (Agent-F, T9) / "Focaria em Expedições desde o início — são a única mecânica onde a agência cria resultados satisfatórios." (Agent-A, entrevista)* | 3/6 | 8 | 2 | não |
| D-027 | pain | mecanica | **Espião com 0 de defesa sem aviso — estratégia Umbral militarmente inviável.** Construir exército de espiões sem tropas defensivas resulta em território completamente indefensável. Nenhum aviso ou indicador de DEF=0 nas unidades. > *"Aprendi que espiões não defendem nada." (Agent-E, entrevista) / Agent-E perdeu território 0 para Ferronatos por ter apenas 2 espiões com DEF=0.* | 1/6 | 5 | 2 | não |
| G-007 | gain | diversao | **Expedições como loop autônomo de risco/recompensa com narrativa.** Loop completo: enviar tropas → narrativa imersiva → risco calculado (mínimo de unidades) → recompensa variável. Única mecânica onde agência do jogador cria resultados variáveis e satisfatórios. Novato perdeu soldados para o Wyrm Cave e chamou de **divertido**. > *"As narrativas das Expedições são divertidas e imersivas — o sistema de 'enviar soldados em aventura' é o mais acessível e satisfatório do jogo." (Agent-F, entrevista) / "Focaria em Expedições desde o início." (Agent-A, entrevista)* | 3/6 | 9 | 2 | — |
| G-008 | gain | mecanica | **Defesa bem-sucedida de território contra IA cria satisfação de mérito genuíno.** Quando combinação de Muralha + bônus de facção + tropas repele um ataque, o jogo entrega o loop emocional correto: derrota que ensina / vitória que é mérito. Único momento no Sprint 2 onde um agente sentiu exatamente o objetivo do jogo. > *"T10 — quando a IA atacou e repeli com a Muralha + bônus Ferronatos. Satisfação genuína de defesa bem-sucedida." (Agent-D, entrevista) / "Perder o território para a Horda foi devastador — e foi JUSTO. Esse é o design correto: derrota que parece merecida." (Agent-D, entrevista)* | 2/6 | 7 | 2 | — |

---

## Resumo por Categoria

| Categoria | Pains S1 | Pains S2 | Total Pains | Gains S1 | Gains S2 | Total Gains |
|-----------|----------|----------|-------------|----------|----------|-------------|
| interface | 5 | 4 | **9** | 2 | 0 | 2 |
| mecanica | 4 | 7 | **11** | 2 | 2 | 4 |
| diversao | 1 | 1 | **2** | 2 | 1 | 3 |
| agencia | 2 | 0 | **2** | 0 | 0 | 0 |
| bugs | 1 | 0 | **1** | 0 | 0 | 0 |
| **TOTAL** | **13** | **12** | **25** | **6** | **3** | **9** (+ 1 parcial gain G-006 não testável S2) |

---

## Top 5 Pains por Impacto (Score × Frequência) — Sprint 2

| Rank | ID | Score | Frequência | Produto | Ação recomendada |
|------|----|-------|------------|---------|-----------------|
| 1 | D-016 | 10 | 6/6 | **60** | Implementar modal de ataque com troops selector + combat preview |
| 2 | D-001 | 10 | 6/6 | **60** | Preview de combate no modal de ataque (em conjunto com D-016) |
| 3 | D-024 | 8 | 5/6 | **40** | Integrar cartas ao fluxo de ataque |
| 4 | D-026 | 8 | 3/6 | **24** | Onboarding de Expedições no T1 |
| 5 | D-004 | 9 | 3/6 | **27** | Tooltip contextual "Requer: Quartel" com destaque antes da tentativa |

---

## Insights Críticos — Divergências Log vs Entrevista (Sprint 2)

| Agente | Divergência | Pain Real |
|--------|-------------|-----------|
| Agent-B (Último Lugar) | Log: frustrações constantes com lock econômico. Entrevista: "foi meu erro estratégico, nota 5/10, voltaria." | Interface escondeu informação que tornava o erro **inevitável**, não apenas estratégico. D-020. |
| Agent-F (Novato) | Log: frustração severa com ausência de combate. Entrevista: nota 6/10, "amei as expedições, quero jogar de novo." | Expedições atuaram como **safety net emocional**, mascarando a incompletude do sistema de combate. D-026. |
| Agent-A (Campeã) | Log e entrevista: frustração consistente, nota 4/10. **Sem divergência.** | Jogadora experiente não foi compensada pelas expedições. Viu a incompletude com máxima clareza. |

---

## Status de Implementação Acumulado

- **Implementados:** 0/27 pains | 0/8 gains (aguardando implementação do Sprint 2)
- **Parcialmente implementado:** D-003 (Espiões Umbral — treinamento funciona em S2, bônus não verificado)
- **Confirmados como persistentes em S2:** D-001, D-002, D-004, D-005, D-014
- **Não testáveis em S2 (sem combate):** G-006, D-008 (fluxo de cartas), D-007 (resultado de expedição)
