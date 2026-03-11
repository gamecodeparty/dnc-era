# Pain/Gain Map — Dice&Cards Era

**Última atualização:** Sprint 04 (2026-03-11)
**Total de discoveries:** 72 (52 anteriores + 20 novos sprint 4)
**Pains:** 55 | **Gains:** 17 (+ 5 arquivados/resolvidos)
**NPS Médio Sprint 4:** 6,5/10 (+0,5 vs Sprint 3)

---

## Tabela de Discoveries

### Sprint 1 — Wave 1

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-001 | pain | mecanica | **Sem preview de combate.** Atacar não mostra poder de ataque vs defesa antes de confirmar. Em Sprint 3: preview existe no ExpeditionModal mas só é informativo quando território foi revelado por espião. > *"A interface de ataque não mostrou preview de combate antes de enviar! Não sei se vou ganhar ou perder." (Agent-A, T16, S1)* | 6/6 | 10 | 1 | parcial (S3: preview existe; sem revelação de espião ainda é estimativa) |
| D-002 | pain | interface | **Timer não para durante navegação entre páginas.** Timer de 10s avança em /game/territory, /game/cards, /game/army. > *"Quando voltei ao mapa, já estava no turno 2. Perdi o turno 1 sem agir." (Agent-A, T1, S1)* | 5/6 | 8 | 1 | sim (S3) |
| D-003 | pain | mecanica | **Facção Umbral sem espiões implementados (Sprint 1).** > *"Não há unidade SPY disponível no cliente." (Agent-E, T1, S1)* | 1/6 | 8 | 1 | sim (S3: espiões funcionais; bônus Umbral 100% sucesso confirmado) |
| D-004 | pain | interface | **Sem tutorial contextual.** Sem tooltips inline, missões guia ou onboarding no fluxo de jogo. > *"Não há dica do tipo 'Construa Barracks para recrutar'." (Agent-F, T4, S1)* | 3/6 | 9 | 1 | parcial (S4: TipBanner implementado; onboarding de cartas ainda parcial) |
| D-005 | pain | interface | **Resultado de batalhas entre AIs ausente no log.** Evento mostra "AI3 atacou AI2" sem resultado. > *"O evento disse apenas 'atacou' mas não o RESULTADO." (Agent-D, T17, S1)* | 4/6 | 7 | 1 | não |
| D-006 | pain | interface | **Limite de 4 estruturas por território não comunicado.** > *"A limitação de 4 estruturas nunca foi explicada." (Agent-B, T17, S1)* | 3/6 | 7 | 1 | não |
| D-007 | pain | mecanica | **Resultado de exploração pouco claro.** Retorno mostra recursos sem indicar sucesso/parcial/falha. > *"A interface não mostra o resultado (sucesso/parcial/falha)." (Agent-A, T7, S1)* | 3/6 | 6 | 1 | não |
| D-008 | pain | interface | **Cartas desconectadas do fluxo de combate.** Ativar cartas exigia rota separada. Em S4: banner de sugestão existe e foi eficaz para experientes; novatos ainda descobrem tarde. > *"Tinha que ativar a carta em página separada ANTES de enviar o ataque." (Agent-C, T16, S1)* | 3/6 | 5 | 1 | parcial (S4: banner contextual implementado; eficaz para intermediários/experientes) |
| D-009 | pain | agencia | **Diplomacia puramente probabilística sem controle.** > *"Propus paz com AI2 cinco vezes, rejeitada todas." (Agent-E, entrevista, S1)* | 3/6 | 5 | 1 | não (confirmado S4 — ver D-035) |
| D-010 | pain | mecanica | **Bônus de facção implementados mas imperceptíveis.** > *"A produção de Farm era 12/turno para todos." (Agent-A, champion.md, S1)* | 2/6 | 4 | 1 | sim (S3: bônus percebidos e estrategicamente relevantes) |
| D-011 | pain | diversao | **Tela de vitória sem narrativa de mérito.** Resultado exibe números sem explicar por que venceu. > *"Gostaria de uma tela que explicasse POR QUÊ venci." (Agent-A, champion.md, S1)* | 1/6 | 4 | 1 | sim (S4: GameResultsScreen com ranking animado — resolução total) |
| D-012 | pain | interface | **Sem indicador de progresso para próxima era.** > *"Não há contador óbvio de 'X turnos até Era da Guerra'." (Agent-F, T7, S1)* | 2/6 | 6 | 1 | não |
| D-013 | pain | agencia | **Carta Sabotagem: alvo de estrutura não escolhido.** Destrói estrutura aleatória. > *"Sabotagem é aleatória! Não posso escolher qual estrutura destruir." (Agent-E, T16, S1)* | 1/6 | 3 | 1 | não |
| D-014 | pain | bugs | **Population tracking zerado no client.** Campo population sempre retorna 0. Scoring usa valor fixo 100. > *"Population sempre 0 na UI — scoring broken." (Agent-A, S1)* | 2/6 | 2 | 1 | não (confirmado S4 — score ainda usa pop fixa de 100) |
| D-015 | pain | mecanica | **AI de mesma facção começa como HOSTILE.** Lore indica aliança, mecânica ignora. > *"AI2 é da facção Umbral e começa como HOSTILE." (Agent-E, T2, S1)* | 1/6 | 3 | 1 | não |

---

### Sprint 2 — Wave 2

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-016 | pain | interface | **Ausência total de UI de ataque PvP.** Não existia botão para atacar territórios. > *"RAIVA. Eu tenho soldados. Tenho um território. A guerra é MINHA estratégia. E o jogo não me deixa atacar." (Agent-C, T3, S2)* | 6/6 | 10 | 2 | sim (F-020/F-021/F-022/F-023 — combate PvP implementado e testado) |
| D-017 | pain | interface | **Timer de 10s corta ações em andamento.** > *"O turno de 10 segundos me pegou no meio de uma ação." (Agent-F, T5, S2)* | 4/6 | 7 | 2 | sim (S3) |
| D-018 | pain | interface | **Treino de unidades sem opção de lote.** Para treinar 5 soldados: 5 cliques individuais. > *"Só posso treinar 1 por vez!" (Agent-C, T2, S2)* | 2/6 | 5 | 2 | parcial (S3: input numérico existe, mas sem validação de máximo por recursos) |
| D-019 | pain | mecanica | **Custos de construção contraintuitivos.** Serraria custa grão, não madeira. > *"Serraria não precisa de madeira para ser construída." (Agent-B, T2, S2)* | 4/6 | 7 | 2 | não (confirmado S4 — padrão de custo ainda surpreende agentes) |
| D-020 | pain | interface | **Sem aviso proporcional de custo.** "Isso usa 100% da sua madeira" deveria aparecer. > *"Uma indicação proporcional evitaria o bloqueio." (Agent-B, S2)* | 3/6 | 7 | 2 | sim (F-030/F-031/F-032) |
| D-021 | pain | interface | **Sem ranking/placar visível durante a partida.** > *"O jogo não tem placar visível durante a partida." (Agent-A, champion.md, S2)* | 2/6 | 6 | 2 | não |
| D-022 | pain | mecanica | **Sem ação de mover/reposicionar tropas entre territórios.** Em S4: Reforço existe mas UX de múltiplos cliques persiste (D-050). > *"Reposicionar tropas não existe." (Agent-D, entrevista, S2)* | 2/6 | 6 | 2 | parcial (S4: Reforço existe; UX ainda com muitos cliques) |
| D-023 | pain | mecanica | **Bônus de facção invisível.** Em S4: bônus percebidos e calculados — resolvido. | 2/6 | 6 | 2 | sim (S3/S4: Ferronatos +20% explicitamente calculado; Verdâneos idem) |
| D-024 | pain | mecanica | **Sistema de cartas completamente inutilizável sem contexto de combate.** > *"Ficaram acumulando na mão sem uso." (Agent-B, S2)* | 5/6 | 8 | 2 | parcial (S4: banner existe; Felix descobriu apenas no T18) |
| D-025 | pain | mecanica | **Diplomacia sem feedback de aceitação/rejeição.** Em S4: aceita/rejeita funciona. Efeito concreto ainda ausente (→ D-035). > *"Proposta de aliança parece entrar em um void." (Agent-E, entrevista, S2)* | 2/6 | 5 | 2 | parcial (S4: resposta funciona; efeito concreto ausente) |
| D-026 | pain | diversao | **Expedições escondidas — melhor sistema do jogo é invisível para novatos.** > *"Encontrei as Expedições por ACIDENTE." (Agent-F, T9, S2)* | 3/6 | 8 | 2 | não |
| D-027 | pain | mecanica | **Espião com 0 de defesa sem aviso.** > *"Aprendi que espiões não defendem nada." (Agent-E, entrevista, S2)* | 1/6 | 5 | 2 | não |

---

### Sprint 3 — Wave 3

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-028 | pain | interface | **Botões de construção/treinamento habilitados mesmo sem recursos.** Em S4: RESOLVIDO por F-033/F-034. > *"A interface NÃO me impediu de clicar no botão — só exibiu erro APÓS a tentativa." (Ariana, T4, S3)* | 6/6 | 10 | 3 | **sim (S4: F-033/F-034 — botões desabilitados corretamente)** |
| D-029 | pain | interface | **Sem preview de produção/benefício antes de construir estrutura.** Em S4: RESOLVIDO por F-035/F-036. > *"Não fica claro no menu de construção QUANTO cada estrutura vai produzir por turno." (Ariana, T1, S3)* | 6/6 | 9 | 3 | **sim (S4: F-035/F-036 — labels de produção visíveis; elogiados 6/6 agentes)** |
| D-030 | pain | interface | **Cartas ignoradas apesar de disponíveis no ExpeditionModal.** Em S4: banner implementado; eficaz para experientes; novatos ainda descobrem tarde. > *"As cartas estavam no inventário mas nunca apareceram de forma prominente." (Cleo, entrevista, S3)* | 6/6 | 8 | 3 | parcial (S4: F-037 implementado; Felix descobriu em T18; 2/6 ainda com descoberta tardia) |
| D-031 | pain | mecanica | **Ouro como gargalo sistêmico — Mine não é prioridade comunicada.** > *"A progressão de ouro é o maior gargalo." (Ariana, T19, S3)* | 5/6 | 7 | 3 | não (confirmado S4 — gargalo de ouro persiste; afeta 5/6) |
| D-032 | pain | diversao | **Fim de jogo abrupto sem cerimônia de vitória/ranking.** Em S4: RESOLVIDO por F-043/F-045. > *"FIM ABRUPTO. Joguei 25 turnos para ver um número na tela." (Ariana, T25, S3)* | 5/6 | 8 | 3 | **sim (S4: F-043/F-045 — GameResultsScreen com ranking animado; 6/6 unanimidade; 2/10 → 8/10)** |
| D-033 | pain | mecanica | **Horda não explica mecânica de targeting.** Em S4: RESOLVIDO por F-049/F-050. > *"A Era da Invasão chegou sem EU saber o que é a Horda." (Ariana, T18, S3)* | 4/6 | 8 | 3 | **sim (S4: F-049/F-050 — modal informativo + countdown no HUD; elogiados 5/6)** |
| D-034 | pain | interface | **Sem overview visual de tropas por território no mapa.** Em S4: RESOLVIDO para tropas próprias por F-046/F-047. Tropas inimigas ainda ausentes (→ D-042/D-047). > *"Sem overview de 'força por território' no mapa." (Davi, entrevista, S3)* | 4/6 | 8 | 3 | parcial (S4: F-046/F-047 — badges nos próprios territórios; inimigos ainda sem badge) |
| D-035 | pain | mecanica | **Diplomacia sem efeito concreto observável.** 3 sprints consecutivos em 3/10. > *"A diplomacia existe como estado (Aliado/Neutro/Hostil) mas não como mecânica de ação." (Espa, entrevista, S3+S4)* | 4/6 | 6 | 3 | não (confirmado S4 — Espa 3 instâncias de frustração; 3º sprint consecutivo) |
| D-036 | pain | mecanica | **Duração de revelação de espião curta (5 turnos) sem countdown visível.** > *"A duração da revelação não aparece visivelmente com countdown." (Espa, entrevista, S3)* | 3/6 | 7 | 3 | não (confirmado S4 — badge desaparece silenciosamente) |
| D-037 | pain | interface | **Sem preview de tempo de viagem em expedições.** Em S4: RESOLVIDO por F-041/F-042. > *"O mapa não mostra contagem de turnos por rota visualmente." (Ariana, T8, S3)* | 5/6 | 8 | 3 | **sim (S4: F-041/F-042 — travel time badges; elogiados 4/6; eliminou incerteza de planejamento)** |
| D-038 | pain | mecanica | **Grão acumula sem uso no late game — balanceamento quebrado.** > *"Estou afogando em grão (378!) mas sem ouro para nada." (Ariana, T20, S3)* | 4/6 | 7 | 3 | não (confirmado S4 — 4/6 reportaram; late game ainda com grão inútil) |
| D-039 | pain | interface | **Mecânica de Reforço (mover tropas) não comunicada.** > *"Não sabia que podia enviar expedições de REFORÇO!" (Cleo, T21, S3)* | 3/6 | 6 | 3 | não |
| D-040 | pain | interface | **Sem tutorial/onboarding para novatos.** Em S4: TipBanner parcialmente resolve. > *"O JOGO NÃO ME ENSINA O QUE FAZER." (Felix, T3, S3)* | 3/6 | 9 | 3 | parcial (S4: F-053/F-054/F-055 — TipBanner ajuda; cartas ainda sub-onboarded) |
| D-041 | pain | diversao | **Deadlock econômico com ordem de build errada.** Em S4: TipBanner mitiga mas deadlock ainda possível (Beto T4). > *"GAME STUCK — rush sem economia cria impasse irrecuperável." (Cleo, T6, S3)* | 3/6 | 8 | 3 | parcial (S4: TipBanner mitiga; aviso específico de "sem produção ativa" ainda ausente) |

---

### Sprint 4 — Wave 4 (NOVOS)

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-042 | pain | interface | **Sem visibilidade de tropas inimigas no mapa.** Jogadores veem defense badges nos próprios territórios mas não nos territórios adversários. Cada decisão de ataque é feita por inferência. Davi perdeu dois territórios diretamente por não saber a força do adversário. > *"Toda a minha estratégia foi construída sobre informação parcial. Para um jogador de RTS, dados de unidades inimigas são básicos." (Cleo, Resumo, S4)* > *"Cada decisão de ataque/defesa é baseada em inferência. Assimetria de informação permanente." (Davi, T12, S4)* | 4/6 | 9 | 4 | não |
| D-043 | pain | interface | **Alerta de ataque iminente ausente.** Quando clã inimigo lança expedição em direção a território do jogador, não há indicador de movimento. O ataque é descoberto quando já foi resolvido. > *"No turno anterior tudo parecia normal, e de repente estava sendo atacado. Nenhum sinal de aviso." (Felix, last-place.md, S4)* > *"Perdeu território 11-12 sem aviso de ataque iminente — pareceu injusto." (Felix, Log T11, S4)* | 3/6 | 8 | 4 | não |
| D-044 | pain | mecanica | **Horda não indica território específico de ataque dentro do clã-alvo.** Modal informa quem é atacado, mas não qual território dentro do clã. Distribuição defensiva de tropas fica parcialmente no escuro. > *"A mecânica diz 'ataca o clã dominante' mas não especifica o território alvo. Essa incerteza é ansiogena." (Ariana, T21, S4)* > *"O modal diz QUEM mas não ONDE dentro dos territórios do alvo." (Cleo, Resumo, S4)* | 4/6 | 7 | 4 | não |
| D-045 | pain | interface | **Era da Guerra sem explicação mecânica na transição animada.** Animação espetacular mas não comunica o que muda. Felix jogou 1-2 turnos da Era da Guerra como Era da Paz. > *"A animação é linda mas não explica nada. O que muda na Era da Guerra?" (Felix, T9, S4)* > *"Continuei jogando como se fosse Era da Paz por 2-3 turnos." (Felix, entrevista Q6, S4)* | 2/6 | 7 | 4 | não |
| D-046 | pain | mecanica | **Comportamento da Horda em empate de territórios não documentado.** Modal diz "ataca o clã com mais territórios" mas não especifica comportamento em empate. Davi conquistou 6º território no T24, empatando com Cleo, e foi atacado no T25 sem poder prever. > *"'Ataca o clã com mais territórios' não especifica o que acontece em empate. Perdi 1 território no último turno por essa lacuna." (Davi, T25, S4)* | 2/6 | 6 | 4 | não |
| D-047 | pain | interface | **Defense badges aparecem apenas em territórios próprios, não inimigos.** F-046/F-047 implementado com escopo parcial. 4 agentes tentaram clicar em territórios inimigos esperando ver badge de defesa. > *"Os badges de defesa no mapa mostram apenas nos meus territórios, não nos inimigos." (Davi, T12, S4)* > *"4 agentes reportaram tentar clicar em territórios inimigos esperando ver o badge." (Ranking.md, S4)* | 4/6 | 8 | 4 | não |
| D-048 | pain | diversao | **Breakdown de pontuação ausente na GameResultsScreen.** Tela de resultados tem animação excelente mas não mostra cálculo linha-a-linha. Agentes fizeram cálculos mentais sem entender de onde vieram os números. > *"O cálculo de pontuação na tela não mostrou o breakdown claro de como chegou em 1980." (Ariana, T25, S4)* > *"Gostaria de ver '+400 por 4 territórios', '+1000 por população', etc." (Ariana, T25, S4)* | 4/6 | 6 | 4 | não |
| D-049 | pain | diversao | **Dead time de viagem — sem ação útil disponível durante espera de expedição.** Quando todas as tropas estão em expedição e sem recursos para construir, 1-3 turnos passam sem nenhuma ação possível. Cria sensação de perda de controle especialmente em novatos. > *"Este turno foi completamente vazio. Sem tropas disponíveis, sem urgência de construção óbvia. O jogo não me deu uma ação clara para fazer enquanto esperava." (Felix, T5, S4)* > *"Turno completamente morto. Sem produção, sem grão, sem ouro." (Cleo, T3, S4)* | 3/6 | 7 | 4 | não |
| D-050 | pain | interface | **UX de realocação de tropas entre territórios — muitos cliques para ação frequente.** Mover tropas entre territórios próprios exige navegação por modais múltiplos. Em Era da Invasão com gestão de múltiplos territórios, ação é feita repetidamente. > *"A realocação de tropas entre territórios não é intuitiva. Parece que poderia ser mais direto — talvez drag-and-drop no mapa." (Ariana, T14, S4)* | 2/6 | 6 | 4 | não |
| D-051 | pain | mecanica | **Bônus de facção Umbral invisível na UI.** +30% eficiência de espiões não tem representação visual permanente. Espa jogou toda a partida sem poder confirmar se o bônus estava ativo. Ferronatos e Verdâneos aparecem nos labels de construção; Umbral não tem equivalente. > *"Não vi em nenhum lugar o +30% eficiência de espiões. Pode existir mecanicamente mas é invisível ao jogador." (Espa, T1 e Resumo, S4)* > *"Bônus de facção invisível na UI (especialmente Umbral) — agentes jogam sem saber se bônus está ativo." (Ranking.md, S4)* | 2/6 | 7 | 4 | não |
| D-052 | pain | interface | **Tooltip de recurso insuficiente sem especificidade.** Botão desabilitado mostra mensagem genérica sem indicar quanto falta. Espa e Beto foram bloqueados por 1-5 unidades de ouro diversas vezes sem saber o valor exato da lacuna. > *"'Falta 1 ouro' seria mais útil que mensagem genérica no botão cinza." (Espa, T23, S4)* | 2/6 | 5 | 4 | não |

---

### Gains — Sprints 1-4

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| G-001 | gain | diversao | **Transição de era animada.** Unanimidade por 4 sprints consecutivos. Melhor momento narrativo do jogo. > *"A animação de transição de era foi satisfatória! BEM FEITO." (Ariana, T8, S3)* | 6/6 | 10 | 1 | — |
| G-002 | gain | mecanica | **Wall como defesa passiva estratégica.** Bônus +20% cria decisão clara com recompensa tangível. Confirmado S4 (Cleo defendeu Horda 2×, Ariana defendeu clã leste). | 4/6 | 9 | 1 | — |
| G-003 | gain | mecanica | **Horda como mecanismo anti-snowball.** Prioriza o maior clã criando desincentivo ao domínio excessivo. Confirmado S4 (Davi usou para oportunismo, Beto sobreviveu por não ser alvo). | 4/6 | 8 | 1 | — |
| G-004 | gain | diversao | **Narrativas atmosféricas de exploração.** Textos imersivos de resultado de expedição. | 3/6 | 7 | 1 | — |
| G-005 | gain | interface | **Clareza visual do mapa por clã.** Cores de propriedade intuitivas para todos os perfis. Reconfirmado S4 (Felix, Davi). | 6/6 | 9 | 1 | — |
| G-006 | gain | diversao | **Feedback de conquista com saque listado.** Evento de vitória + recursos listados cria loop de reward. Confirmado S4 (5/6). | 3/6 | 7 | 1 | — |
| G-007 | gain | diversao | **Expedições como loop autônomo de risco/recompensa com narrativa.** Única mecânica onde agência cria resultados variáveis satisfatórios. | 3/6 | 9 | 2 | — |
| G-008 | gain | mecanica | **Defesa bem-sucedida cria satisfação de mérito genuíno.** Loop emocional correto. Confirmado S4 (Cleo T22, Davi T21, Ariana T16). | 2/6 | 7 | 2 | — |
| G-009 | gain | diversao | **Loop conquista → saque → reinvestimento em PvP.** Sistema de saque cria momentum onde cada vitória financia a próxima expansão. Reconfirmado S4 (Cleo, Ariana, Espa). > *"O SAQUE! Essa mecânica é o coração da estratégia militar." (Cleo, T13, S3)* | 5/6 | 9 | 3 | — |
| G-010 | gain | interface | **Overlay visual de território revelado por espião.** Números reais do inimigo no mapa com ícone de olho. Confirmado S4 por Espa e Davi. | 3/6 | 9 | 3 | — |
| G-011 | gain | mecanica | **Variedade perceptível de personalidades de IA.** Comportamentos distintos estrategicamente relevantes. Confirmado S4. | 3/6 | 8 | 3 | — |
| G-012 | gain | diversao | **GameResultsScreen com ranking animado — cerimônia de encerramento.** MAIOR WIN do projeto. 2/10 → 8/10 em "Feedback de Fim de Jogo". 6/6 unanimidade. Nenhum agente pulou a animação. Felix (último lugar) saiu querendo jogar de novo. > *"Finalmente uma tela de vitória decente! Era exatamente o que faltava." (Cleo, T25, S4)* > *"A tela de resultados é motivante mesmo para quem ficou em último." (Felix, T25, S4)* | 6/6 | 10 | 4 | — |
| G-013 | gain | interface | **Modal informativo da Horda com escala de força e timing.** Onboarding cirúrgico para mecânica mais complexa do jogo. Comunica quem é alvo, frequência e progressão (50→100→150→200→300). > *"O modal da Horda é excelente. Deu todas as informações que eu precisava de uma vez." (Cleo, T19, S4)* | 5/6 | 9 | 4 | — |
| G-014 | gain | interface | **Countdown da Horda no HUD.** Tensão estratégica contínua — inclusive para clãs não-alvo. Davi usou para planejar oportunismo. > *"O countdown no HUD é visceralmente eficaz." (Cleo, T20, S4)* | 5/6 | 9 | 4 | — |
| G-015 | gain | interface | **Labels de produção visíveis antes de construir.** Resolve D-029. Eliminou ambiguidade sobre o que cada estrutura produz. Unanimidade em todos os perfis. > *"Os rótulos de produção são o melhor professor do jogo." (Beto, Avaliação, S4)* | 6/6 | 9 | 4 | — |
| G-016 | gain | interface | **Botões desabilitados com recurso insuficiente.** Resolve D-028. Guia passivo que elimina cliques perdidos. Felix foi guiado pelo que estava habilitado. > *"Os botões desabilitados são o tipo de QoL que faz diferença real." (Ariana, T2, S4)* | 5/6 | 9 | 4 | — |
| G-017 | gain | interface | **TipBanner contextual no momento relevante.** Resolve parcialmente D-040. Cirúrgico para todos os perfis no momento certo. > *"O TipBanner apareceu antes de eu clicar em qualquer coisa, como se tivesse lido minha intenção." (Ariana, T4, S4)* | 4/6 | 8 | 4 | — |
| G-018 | gain | interface | **Defense badges nos territórios próprios.** Resolve parcialmente D-034. Gestão visual de distribuição de tropas. Cleo detectou vulnerabilidade no T16. > *"Os badges de defesa me permitiram ver imediatamente ONDE estava vulnerável." (Cleo, T16, S4)* | 4/6 | 7 | 4 | — |
| G-019 | gain | mecanica | **Banner de sugestão de carta no ExpeditionModal.** Resolve parcialmente D-030. Eficaz para intermediários e experientes. Davi usou TRÉGUA FORÇADA preventivamente — o uso mais sofisticado de carta do projeto. > *"O banner de carta é EXATAMENTE o que eu precisava — aparecer no momento certo, no lugar certo." (Cleo, T8, S4)* > *"O banner preventivo transformou situação reativa em proativa." (Davi, T13, S4)* | 3/6 | 8 | 4 | — |

---

## Resumo por Categoria (Acumulado)

| Categoria | Pains S1 | Pains S2 | Pains S3 | Pains S4 | Total Pains | Gains Total |
|-----------|:--------:|:--------:|:--------:|:--------:|:-----------:|:-----------:|
| interface | 5 | 4 | 5 | 6 | **20** | 5 |
| mecanica | 4 | 7 | 5 | 3 | **19** | 9 |
| diversao | 1 | 1 | 1 | 2 | **5** | 5 |
| agencia | 2 | 0 | 0 | 0 | **2** | 0 |
| bugs | 1 | 0 | 0 | 0 | **1** | 0 |
| **TOTAL** | 13 | 12 | 11 | **11** | **47** | **19** (+ 8 archived/resolved) |

---

## Status de Implementação Acumulado

**Implementados com sucesso (resolvidos):**
- D-002 (Timer navegação) → sim S3
- D-003 (Umbral sem espiões) → sim S3
- D-010 (Bônus facção invisível) → sim S3
- D-011 (Tela vitória sem narrativa) → sim S4 (F-043/F-045 GameResultsScreen)
- D-016 (Sem UI ataque PvP) → sim S3
- D-017 (Timer 10s) → sim S3
- D-020 (Sem aviso custo) → sim S3 (F-030/F-031/F-032)
- D-023 (Bônus facção invisível v2) → sim S3
- D-024 (Cartas sem combate) → parcial (S4 — banner existe)
- D-028 (Botões habilitados sem recursos) → **sim S4 (F-033/F-034)**
- D-029 (Sem preview de produção) → **sim S4 (F-035/F-036)**
- D-032 (Fim de jogo abrupto) → **sim S4 (F-043/F-045)**
- D-033 (Horda sem explicação) → **sim S4 (F-049/F-050)**
- D-037 (Sem preview tempo expedição) → **sim S4 (F-041/F-042)**

**Parcialmente implementados:**
- D-001 (Sem preview combate) → parcial (preview existe; estimativa sem spy)
- D-004 (Sem tutorial) → parcial (S4: TipBanner; cartas sub-onboarded)
- D-008 (Cartas desconectadas) → parcial (S4: banner no modal; novatos ainda tardios)
- D-018 (Treino sem lote) → parcial (input existe; sem validação máximo)
- D-022 (Sem mover tropas) → parcial (Reforço existe; UX multi-clique — D-050)
- D-025 (Diplomacia sem feedback) → parcial (resposta funciona; efeito ausente)
- D-030 (Cartas invisíveis) → parcial (S4: banner; Felix T18 ainda tardio)
- D-034 (Sem overview tropas) → parcial (S4: badges próprios; inimigos ausentes — D-042/D-047)
- D-040 (Sem tutorial novatos) → parcial (S4: TipBanner; cartas sub-onboarded)
- D-041 (Deadlock build) → parcial (S4: TipBanner mitiga; aviso "sem produção" ausente)

**Não implementados (persistentes):**
D-005, D-006, D-007, D-009, D-012, D-013, D-014, D-015, D-019, D-021, D-026, D-027, D-031, D-035, D-036, D-038, D-039

---

## Top 10 Pains Ativos por Impacto (Score × Frequência)

| Rank | ID | Score | Freq | Produto | Descrição Resumida | Sprint |
|------|----|:-----:|:----:|:-------:|--------------------|:------:|
| 1 | D-042 | 9 | 4/6 | **36** | Sem visibilidade de tropas inimigas no mapa | 4 |
| 2 | D-041 | 8 | 3/6 | **24** | Deadlock econômico com ordem de build | 3 |
| 3 | D-043 | 8 | 3/6 | **24** | Alerta de ataque iminente ausente | 4 |
| 4 | D-047 | 8 | 4/6 | **32** | Defense badges só nos próprios territórios | 4 |
| 5 | D-035 | 6 | 4/6 | **24** | Diplomacia sem efeito concreto (3 sprints) | 3 |
| 6 | D-038 | 7 | 4/6 | **28** | Grão acumula sem uso no late game | 3 |
| 7 | D-031 | 7 | 5/6 | **35** | Ouro gargalo sistêmico não comunicado | 3 |
| 8 | D-044 | 7 | 4/6 | **28** | Horda sem território específico de ataque | 4 |
| 9 | D-051 | 7 | 2/6 | **14** | Umbral bônus invisível na UI | 4 |
| 10 | D-036 | 7 | 3/6 | **21** | Spy countdown sem alerta de expiração | 3 |

---

## Insights Críticos de Divergência Log vs Entrevista — Sprint 4

| Agente | Pain no Log | Na Entrevista | Pain Real |
|--------|-------------|---------------|-----------|
| Cleo (Campeã) | Frustração com assimetria de informação sobre tropas inimigas em T9, T10, T14, T23. "Voando cego em cada ataque." | 7/10 — menciona tropas inimigas uma vez em Resumo. | **A vitória mascarou a dor. Cleo ganhou apesar da falta de intel, não graças a ela. D-042 é o pain #1 estratégico desta sessão.** |
| Beto (2º) | Dead game 7 turnos (T2-T8). "Turno morto de novo" × 4. Turtle foi fracasso até T19. | "Estratégia turtle funcionou!" | **Beto sobreviveu porque a Horda focou em AI-1, não por mérito. A estratégia turtle conforme executada falhou — o log é mais honesto.** |
| Espa (3º) | Frustração com diplomacia 3× no log. Ouro em 0-6 quase todo o jogo. | 7/10 — "falhou economicamente, mas narrativamente satisfatório." | **Diplomacia 3× mais frustrante no log do que na entrevista. Espionagem economicamente autodestrutiva de forma mais grave do que admitido.** |
| Felix (Último) | Quase abandono em T12. Cartas descobertas T18 (17 turnos sem usar). T5-T6 dead time. | 5/10 — "quero tentar de novo." | **GameResultsScreen salvou Felix da deserção. Sem a tela de resultados, ele teria abandonado e nunca voltado. Onboarding ainda falho apesar de motivação de replay.** |
| Davi (4º) | "Não sei quantas tropas o inimigo tem" × 5+. Causa direta de 2 perdas territoriais. | Cita tropas inimigas como #1 pain. | **Alinhamento completo log-entrevista. Pain D-042 confirmado por ambos os canais.** |

---

## Nota Média por Bloco Temático (Evolução)

| Bloco | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Delta S3→S4 |
|-------|:--------:|:--------:|:--------:|:--------:|:-----------:|
| Interface | — | — | 5/10 | **7/10** | **+2** |
| Mecânicas de Combate | — | — | 7/10 | **7/10** | = |
| Sistema Econômico | — | — | 5/10 | **6/10** | **+1** |
| Diplomacia | — | — | 3/10 | **3/10** | = (3º sprint consecutivo) |
| Espionagem | — | — | 6/10 | **7/10** | **+1** |
| Progressão de Era | — | — | 8/10 | **8/10** | = |
| Feedback de Fim de Jogo | — | — | 2/10 | **8/10** | **+6 (MAIOR WIN)** |
| Sistema de Dicas (TipBanner) | — | — | — | **7/10** | NOVO |
| **Geral** | **5,5** | **5,8** | **6,0** | **6,5** | **+0,5** |
