# Pain/Gain Map — Dice&Cards Era

**Última atualização:** Sprint 03 (2026-03-11)
**Total de discoveries:** 52 (41 pains + 11 gains)
**Wave:** 3 | **NPS Sprint 3:** 6.0/10

---

## Tabela de Discoveries

### Sprint 1 — Wave 1

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-001 | pain | mecanica | **Sem preview de combate.** Atacar não mostra poder de ataque vs defesa antes de confirmar. Em Sprint 3: preview existe no ExpeditionModal mas só é informativo quando território foi revelado por espião. > *"A interface de ataque não mostrou preview de combate antes de enviar! Não sei se vou ganhar ou perder." (Agent-A, T16, S1)* | 6/6 | 10 | 1 | parcial (S3: preview existe; sem revelação de espião ainda é estimativa) |
| D-002 | pain | interface | **Timer não para durante navegação entre páginas.** Timer de 10s avança em /game/territory, /game/cards, /game/army. Ações compostas custam turnos. > *"Quando voltei ao mapa, já estava no turno 2. Perdi o turno 1 sem agir porque a navegação é lenta." (Agent-A, T1, S1)* | 5/6 | 8 | 1 | sim (S3: timer reformulado — agentes não reportaram este problema) |
| D-003 | pain | mecanica | **Facção Umbral sem espiões implementados (Sprint 1).** Bônus "+30% eficiência de espiões" prometido na seleção. Em Sprint 3, Agent-E jogou extensivamente com espiões Umbral. > *"Não há unidade SPY disponível no cliente. Escolhi Umbral por um motivo que não existe." (Agent-E, T1, S1)* | 1/6 | 8 | 1 | sim (S3: espiões funcionais; bônus Umbral 100% sucesso confirmado) |
| D-004 | pain | interface | **Sem tutorial contextual.** Sem tooltips inline, missões guia ou onboarding no fluxo de jogo. > *"Não há dica do tipo 'Construa Barracks para recrutar'." (Agent-F, T4, S1)* | 3/6 | 9 | 1 | não (confirmado S3 — ver D-040) |
| D-005 | pain | interface | **Resultado de batalhas entre AIs ausente no log.** Evento mostra "AI3 atacou AI2" sem resultado. > *"O evento disse apenas 'atacou' mas não o RESULTADO." (Agent-D, T17, S1)* | 4/6 | 7 | 1 | não (confirmado S3 — agentes ainda não sabem resultado de batalhas AI) |
| D-006 | pain | interface | **Limite de 4 estruturas por território não comunicado.** Descoberto apenas ao tentar exceder. > *"A limitação de 4 estruturas nunca foi explicada." (Agent-B, T17, S1)* | 3/6 | 7 | 1 | não |
| D-007 | pain | mecanica | **Resultado de exploração pouco claro.** Retorno mostra recursos sem indicar sucesso/parcial/falha. > *"A interface não mostra o resultado (sucesso/parcial/falha)." (Agent-A, T7, S1)* | 3/6 | 6 | 1 | não |
| D-008 | pain | interface | **Cartas desconectadas do fluxo de combate.** Ativar cartas exigia rota separada. Em S3: cards estão no ExpeditionModal (F-024 implementado) mas ainda ignoradas (→ ver D-030). > *"Tinha que ativar a carta em página separada ANTES de enviar o ataque." (Agent-C, T16, S1)* | 3/6 | 5 | 1 | parcial (S3: integradas no modal, mas invisíveis — ver D-030) |
| D-009 | pain | agencia | **Diplomacia puramente probabilística sem controle.** Propor paz = jogada de dados sem negociação. > *"Propus paz com AI2 cinco vezes, rejeitada todas. A aceitação é probabilística sem elemento de controle." (Agent-E, entrevista, S1)* | 3/6 | 5 | 1 | não (confirmado S3 — ver D-035) |
| D-010 | pain | mecanica | **Bônus de facção implementados mas imperceptíveis.** Em S3: Ferronatos +20% foi claramente sentido e calculado por agentes. Verdaneos igualmente. > *"A produção de Farm era 12/turno para todos." (Agent-A, champion.md, S1)* | 2/6 | 4 | 1 | sim (S3: bônus percebidos e estrategicamente relevantes) |
| D-011 | pain | diversao | **Tela de vitória sem narrativa de mérito.** Resultado exibe números sem explicar por que venceu. > *"Gostaria de uma tela que explicasse POR QUÊ venci." (Agent-A, champion.md, S1)* | 1/6 | 4 | 1 | não (confirmado S3 — ver D-032) |
| D-012 | pain | interface | **Sem indicador de progresso para próxima era.** Não há countdown "Era da Guerra em X turnos". > *"Não há contador óbvio de 'X turnos até Era da Guerra'." (Agent-F, T7, S1)* | 2/6 | 6 | 1 | não (agentes S3 ainda deduziram por contagem de turnos) |
| D-013 | pain | agencia | **Carta Sabotagem: alvo de estrutura não escolhido.** Destrói estrutura aleatória. > *"Sabotagem é aleatória! Não posso escolher qual estrutura destruir." (Agent-E, T16, S1)* | 1/6 | 3 | 1 | não |
| D-014 | pain | bugs | **Population tracking zerado no client.** Campo population sempre retorna 0. Scoring usa valor fixo 100. > *"Population sempre 0 na UI — scoring broken." (Agent-A, S1)* | 2/6 | 2 | 1 | não (confirmado S3 — score ainda usa pop fixa de 100) |
| D-015 | pain | mecanica | **AI de mesma facção começa como HOSTILE.** Lore indica aliança, mecânica ignora. > *"AI2 é da facção Umbral e começa como HOSTILE." (Agent-E, T2, S1)* | 1/6 | 3 | 1 | não |
| G-001 | gain | diversao | **Transição de era é o melhor momento do jogo.** Animação dramática unanimemente elogiada em todos os sprints. > *"A animação de transição de era foi satisfatória! BEM FEITO." (Ariana, T8, S3)* | 6/6 | 10 | 1 | — |
| G-002 | gain | mecanica | **Wall como defesa passiva estratégica.** Bônus +20% def cria decisão clara com recompensa tangível. Confirmado S3 (Cleo defendeu Horda 2×, Ariana defendeu Clã do Leste). | 4/6 | 9 | 1 | — |
| G-003 | gain | mecanica | **Horda como mecanismo anti-snowball.** Prioriza o maior clã criando desincentivo natural ao domínio excessivo. | 3/6 | 8 | 1 | — |
| G-004 | gain | diversao | **Narrativas atmosféricas de exploração.** Textos imersivos de resultado de expedição. | 3/6 | 7 | 1 | — |
| G-005 | gain | interface | **Clareza visual do mapa por clã.** Cores de propriedade intuitivas para todos os perfis. Reconfirmado S3 (4/6). > *"O mapa é legível — consigo ver claramente quem dono de quê pela cor." (Ariana, T1, S3)* | 6/6 | 9 | 1 | — |
| G-006 | gain | diversao | **Feedback de conquista com saque listado.** Evento de vitória + recursos listados cria loop de reward. Agora testável em S3 (combate existe). | 3/6 | 7 | 1 | — |

---

### Sprint 2 — Wave 2

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-016 | pain | interface | **Ausência total de UI de ataque PvP.** Não existia botão para atacar territórios. > *"RAIVA. Eu tenho soldados. Tenho um território adjacente. A guerra é MINHA estratégia. E o jogo não me deixa atacar." (Agent-C, T3, S2)* | 6/6 | 10 | 2 | sim (F-020/F-021/F-022/F-023 — combate PvP implementado e testado em S3) |
| D-017 | pain | interface | **Timer de 10s corta ações em andamento.** Timer disparava enquanto agente executava ação. > *"O turno de 10 segundos me pegou no meio de uma ação." (Agent-F, T5, S2)* | 4/6 | 7 | 2 | sim (S3: agentes não reportaram este pain) |
| D-018 | pain | interface | **Treino de unidades sem opção de lote.** Para treinar 5 soldados: 5 cliques individuais. Em S3: agentes ainda reportam tentar input de quantidade e receberem erro de recursos antes da validação. > *"Só posso treinar 1 por vez!" (Agent-C, T2, S2)* | 2/6 | 5 | 2 | parcial (S3: input numérico existe, mas sem validação de máximo por recursos) |
| D-019 | pain | mecanica | **Custos de construção contraintuitivos.** Serraria custa grão, não madeira. > *"Serraria não precisa de madeira para ser construída. Os custos não são intuitivos." (Agent-B, T2, S2)* | 4/6 | 7 | 2 | não (confirmado S3 — padrão de custo ainda surpreende agentes) |
| D-020 | pain | interface | **Sem aviso proporcional de custo.** "Isso usa 100% da sua madeira" deveria aparecer antes da ação. > *"Uma indicação proporcional evitaria o bloqueio sem remover a decisão do jogador." (Agent-B, S2)* | 3/6 | 7 | 2 | sim (F-030/F-031/F-032 — ⚠️ inline + modal de confirmação implementados) |
| D-021 | pain | interface | **Sem ranking/placar visível durante a partida.** Posição relativa invisível enquanto jogo está em andamento. > *"O jogo não tem placar visível durante a partida." (Agent-A, champion.md, S2)* | 2/6 | 6 | 2 | não |
| D-022 | pain | mecanica | **Sem ação de mover/reposicionar tropas entre territórios.** Em S3: "Reforço" existe mas ninguém sabia. > *"Reposicionar tropas — mover soldados de um território para outro para consolidar defesa. Não existe essa ação." (Agent-D, entrevista, S2)* | 2/6 | 6 | 2 | parcial (S3: Reforço existe mas invisível — ver D-039) |
| D-023 | pain | mecanica | **Bônus de facção invisível.** Em S3: bônus claramente percebidos e calculados — Pain resolvido. | 2/6 | 6 | 2 | sim (S3: Ferronatos +20% explicitamente calculado e sentido por todos) |
| D-024 | pain | mecanica | **Sistema de cartas completamente inutilizável sem contexto de combate.** Sem combate em S2, cartas eram ornamentais. > *"Ficaram acumulando na mão sem uso." (Agent-B, S2)* | 5/6 | 8 | 2 | sim (combate existe em S3; porém cards ainda não utilizados → ver D-030) |
| D-025 | pain | mecanica | **Diplomacia sem feedback de aceitação/rejeição.** Proposta entra em void sem resposta. Em S3: aceita/rejeita funciona. Novo problema: o que aliança faz concretamente (→ D-035). > *"Proposta de aliança parece entrar em um void." (Agent-E, entrevista, S2)* | 2/6 | 5 | 2 | parcial (S3: feedback de resposta funciona; efeito concreto ainda ausente) |
| D-026 | pain | diversao | **Expedições escondidas — melhor sistema do jogo é invisível para novatos.** > *"Encontrei as Expedições por ACIDENTE." (Agent-F, T9, S2)* | 3/6 | 8 | 2 | não |
| D-027 | pain | mecanica | **Espião com 0 de defesa sem aviso.** Construir exército de espiões sem tropas defensivas resulta em território indefensável. > *"Aprendi que espiões não defendem nada." (Agent-E, entrevista, S2)* | 1/6 | 5 | 2 | não |
| G-007 | gain | diversao | **Expedições como loop autônomo de risco/recompensa com narrativa.** Única mecânica onde agência do jogador cria resultados variáveis e satisfatórios. | 3/6 | 9 | 2 | — |
| G-008 | gain | mecanica | **Defesa bem-sucedida de território contra IA cria satisfação de mérito genuíno.** Loop emocional correto: vitória que é mérito. Fortemente reconfirmado S3 (Ariana T17, Cleo T19, T23, Davi T19). | 2/6 | 7 | 2 | — |

---

### Sprint 3 — Wave 3

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-028 | pain | interface | **Botões de construção/treinamento habilitados mesmo sem recursos.** O botão aparece clicável mesmo sem recursos — erro só aparece após confirmação. Custo: turno perdido. > *"A interface NÃO me impediu de clicar no botão — só exibiu uma mensagem de erro APÓS a tentativa. Perdi o turno tentando algo impossível." (Ariana, T4, S3)* | 6/6 | 10 | 3 | não |
| D-029 | pain | interface | **Sem preview de produção/benefício antes de construir estrutura.** Menu mostra custo mas não o que a estrutura produz. > *"Não fica claro no menu de construção QUANTO cada estrutura vai produzir por turno antes de construir. Tive que adivinhar que Sawmill gera madeira." (Ariana, T1, S3)* > *"Se houvesse '+10 grão/turno' visível no botão, teria priorizado corretamente." (Felix, last-place.md, S3)* | 6/6 | 9 | 3 | não |
| D-030 | pain | interface | **Cartas ignoradas apesar de disponíveis no ExpeditionModal.** F-024 foi implementada, mas 6/6 agentes não usaram nenhuma carta. Problema evoluiu: de "cartas não estão no fluxo" para "cartas não são sugeridas contextualmente no momento decisivo". **[INSIGHT CRÍTICO — DIVERGÊNCIA: feature implementada, comportamento esperado não emergiu]** > *"As cartas estavam no inventário mas nunca apareceram de forma prominente durante o planejamento de batalha." (Cleo, entrevista Q8, S3)* > *"INFORMANT parece a carta perfeita mas nunca apareceu como opção." (Espa, entrevista Q8, S3)* | 6/6 | 8 | 3 | não |
| D-031 | pain | mecanica | **Ouro como gargalo sistêmico — Mine não é prioridade comunicada.** Mine (+5 ouro/turno) é a estrutura mais estrategicamente importante mas não tem destaque visual ou comunicação de urgência. > *"A progressão de ouro é o maior gargalo — Mines precisam de mais tempo para pagar o investimento." (Ariana, T19, S3)* > *"Estratégia de espionagem é auto-anulante economicamente — espiões custam ouro que eu nunca tenho." (Espa, T17, S3)* | 5/6 | 7 | 3 | não |
| D-032 | pain | diversao | **Fim de jogo abrupto sem cerimônia de vitória/ranking.** 25 turnos de jogo terminam em uma tela de log. Sem ranking animado, estatísticas ou momento celebratório. Evolução de D-011. > *"FIM ABRUPTO. Joguei 25 turnos para ver um número na tela." (Ariana, T25, S3)* > *"A partida tem histórico rico — o jogo deveria celebrá-lo, não apenas encerrar silenciosamente." (Cleo, champion.md, S3)* | 5/6 | 8 | 3 | não |
| D-033 | pain | mecanica | **Horda não explica mecânica de targeting.** A Horda aparece sem explicação de que ataca o maior clã, qual território é alvo, ou a cada quantos turnos ataca (3). > *"A Era da Invasão chegou sem EU saber o que é a Horda." (Ariana, T18, S3)* > *"Não sabia que a Horda escolhia o maior clã como alvo. Perdi territórios por não saber isso." (Davi, entrevista Q6, S3)* | 4/6 | 8 | 3 | não |
| D-034 | pain | interface | **Sem overview visual de tropas por território no mapa.** Gerenciar 4-7 territórios exige clicar em cada um. Resultado: territórios ficam sem defesa por esquecimento. > *"O maior problema: sem overview de 'força por território' no mapa. Para gerenciar 5-6 territórios, precisaria de um mini-indicador de quantidade de tropas em cada posição." (Davi, entrevista Q2, S3)* | 4/6 | 8 | 3 | não |
| D-035 | pain | mecanica | **Diplomacia sem efeito concreto observável.** Alianças são formadas mas aliados não ajudam quando atacados, não fornecem recursos, não têm comportamento observável diferente de hostis. Evolução de D-009/D-025. > *"Aliança sem mecânica concreta — parece cosmético." (Beto, T10, S3)* > *"A diplomacia existe como estado (Aliado/Neutro/Hostil) mas não como mecânica de ação." (Espa, entrevista Q10, S3)* | 4/6 | 6 | 3 | não |
| D-036 | pain | mecanica | **Duração de revelação de espião muito curta (5 turnos) sem countdown visível.** Informação obtida com custo alto expira em 5 turnos sem aviso, antes de poder ser agida. > *"5 turnos de validade é muito pouco para informação que custou tanto para conseguir." (Espa, T13, S3)* > *"A duração da revelação (5 turnos) não aparece visivelmente com countdown. Não sabia quando ia expirar." (Espa, entrevista Q2, S3)* | 3/6 | 7 | 3 | não |
| D-037 | pain | interface | **Sem preview de tempo de viagem em expedições.** Destino selecionado sem mostrar quantos turnos a viagem levará. > *"O mapa não mostra contagem de turnos por rota visualmente. Tive que deduzir." (Ariana, T8, S3)* > *"Não sei quantos turnos minha expedição vai levar sem calcular manualmente pela grade." (Davi, T13, S3)* | 5/6 | 8 | 3 | não |
| D-038 | pain | mecanica | **Grão acumula sem uso no late game — balanceamento quebrado.** Na Era da Invasão, grão se acumula em centenas enquanto ouro permanece o gargalo de todas as ações. > *"Estou afogando em grão (378!) mas sem ouro para nada. Deveria haver conversão de recursos ou mais usos para grão." (Ariana, T20, S3)* > *"Acúmulo massivo de grão (370!) sem uso. A mecânica de manutenção de unidades deveria consumir mais grão no late game." (Ariana, T24, S3)* | 4/6 | 7 | 3 | não |
| D-039 | pain | interface | **Mecânica de Reforço (mover tropas) não comunicada.** Existe ação de mover tropas entre territórios próprios, mas nenhum agente sabia — descoberta por acidente. Evolução de D-022. > *"Não sabia que podia enviar expedições de REFORÇO! Descobri por tentativa e erro." (Cleo, T21, S3)* > *"Existe expedição de reforço! Funcionalidade útil que descobri por acidente." (Davi, T9, S3)* | 3/6 | 6 | 3 | não |
| D-040 | pain | interface | **Sem tutorial/onboarding para novatos.** Mecânicas básicas descobertas por erro (Wall antes de Barracks, enviar todas as tropas). Evolução de D-004. > *"O JOGO NÃO ME ENSINA O QUE FAZER. Não tem tutorial. Não tem sugestão de próximo passo." (Felix, T3, S3)* > *"Um novato real teria desistido no turno 3. O jogo precisa urgentemente de onboarding básico." (Felix, T25, S3)* | 3/6 | 9 | 3 | não |
| D-041 | pain | diversao | **Rush de estratégia especializada cria dead game de 5-7 turnos sem ações possíveis.** Militar pura e espionagem pura criam impasse econômico onde nenhuma ação é possível. O jogo não detecta nem previne. **[INSIGHT CRÍTICO — DIVERGÊNCIA: Cleo (7/10) e Espa (7/10) não nomearam este pain diretamente; o log documenta o impasse real]** > *"GAME STUCK — rush militar sem economia cria impasse irrecuperável de recursos." (Cleo, T6, S3)* > *"5 turnos sem conseguir treinar um único espião. Estratégia de espionagem também é inviável sem economia mínima." (Espa, T5, S3)* | 3/6 | 8 | 3 | não |
| G-009 | gain | diversao | **Loop de conquista → saque → reinvestimento em PvP real.** Sistema de saque cria momentum onde cada vitória financia a próxima expansão. Agora testável com combate PvP implementado. > *"O SAQUE! Essa mecânica é o coração da estratégia militar. Quando funcionou, foi satisfatório demais." (Cleo, T13, S3)* > *"O sistema de combate com saque de recursos é perfeitamente equilibrado e cria um loop de feedback satisfatório." (Ariana, entrevista Q23, S3)* | 5/6 | 9 | 3 | — |
| G-010 | gain | interface | **Overlay visual de território revelado por espião.** Números reais do inimigo aparecem no mapa com ícone de olho — o melhor momento de UX para jogadores de espionagem. **NOVO — não catalogado em sprints anteriores.** > *"O overlay visual de território revelado por espião é EXCEPCIONAL — melhor feature de UI do jogo." (Espa, entrevista Q2, S3)* | 3/6 | 9 | 3 | — |
| G-011 | gain | mecanica | **Variedade perceptível de personalidades de IA.** Clã do Leste (Conqueror) agride oportunisticamente, Merchant aceita paz, Defender reage passivamente. Comportamentos distintos percebidos e estrategicamente relevantes. **NOVO.** > *"A variedade de personalidades das IAs é perceptível em comportamento, o que é ótimo." (Ariana, entrevista Q9, S3)* | 3/6 | 8 | 3 | — |

---

## Resumo por Categoria (Acumulado)

| Categoria | Pains S1 | Pains S2 | Pains S3 | Total Pains | Gains Total |
|-----------|:--------:|:--------:|:--------:|:-----------:|:-----------:|
| interface | 5 | 4 | 5 | **14** | 3 |
| mecanica | 4 | 7 | 5 | **16** | 7 |
| diversao | 1 | 1 | 1 | **3** | 3 |
| agencia | 2 | 0 | 0 | **2** | 0 |
| bugs | 1 | 0 | 0 | **1** | 0 |
| **TOTAL** | 13 | 12 | **11** | **36** | **11** (+ 5 archived/resolved) |

---

## Status de Implementação Acumulado

**Implementados com sucesso:**
- D-002 (Timer navegação) → sim S3
- D-003 (Umbral sem espiões) → sim S3
- D-010 (Bônus facção invisível) → sim S3
- D-016 (Sem UI ataque PvP) → sim S3 ← **MAIOR IMPACTO DO SPRINT 2**
- D-017 (Timer 10s) → sim S3
- D-020 (Sem aviso custo) → sim S3 (F-030/F-031/F-032)
- D-023 (Bônus facção invisível v2) → sim S3
- D-024 (Cartas sem combate) → sim S3 (combate existe; cards ainda ignorados → D-030)

**Parcialmente implementados:**
- D-001 (Sem preview combate) → parcial (preview existe sem spy = estimativa)
- D-008 (Cartas desconectadas) → parcial (integradas; invisíveis no fluxo → D-030)
- D-018 (Treino sem lote) → parcial (input existe; sem validação de máximo)
- D-022 (Sem mover tropas) → parcial (Reforço existe; invisível → D-039)
- D-025 (Diplomacia sem feedback) → parcial (resposta funciona; efeito ausente → D-035)

**Não implementados (persistentes):**
D-004, D-005, D-006, D-007, D-009, D-011, D-012, D-013, D-014, D-015, D-019, D-021, D-026, D-027

---

## Top 10 Pains Ativos por Impacto (Score × Frequência)

| Rank | ID | Score | Freq. | Produto | Descrição Resumida |
|------|----|:-----:|:-----:|:-------:|-------------------|
| 1 | D-028 | 10 | 6/6 | **60** | Botões habilitados sem recursos |
| 2 | D-029 | 9 | 6/6 | **54** | Sem preview de produção antes de construir |
| 3 | D-040 | 9 | 3/6 | **27** | Sem tutorial para novatos |
| 4 | D-030 | 8 | 6/6 | **48** | Cartas invisíveis no fluxo de combate |
| 5 | D-037 | 8 | 5/6 | **40** | Sem preview de tempo de expedição |
| 6 | D-032 | 8 | 5/6 | **40** | Fim de jogo abrupto |
| 7 | D-033 | 8 | 4/6 | **32** | Horda sem explicação de targeting |
| 8 | D-034 | 8 | 4/6 | **32** | Sem overview de tropas no mapa |
| 9 | D-041 | 8 | 3/6 | **24** | Dead game por rush especializado |
| 10 | D-031 | 7 | 5/6 | **35** | Ouro gargalo não comunicado |

---

## Insights Críticos de Divergência Log vs Entrevista (Sprint 3)

| Agente | Pain no Log | Na Entrevista | Pain Real |
|--------|-------------|---------------|-----------|
| Cleo (Campeã) | 7 turnos de impasse total (T3-T9). "GAME STUCK". Quase inviabilizou a estratégia. | 7/10 — "quero jogar de novo com Mine no T2" | A vitória mascarou o dead game. **Rush militar sem economia mínima cria impasse silencioso por design.** (D-041) |
| Espa (Espionagem) | Loop espião→info→ação executado 1× em 25 turnos. 5 territórios = 40% sorte. "Sinto sortudo, não estratégico." | 7/10 — "quero provar que espionagem pode ser melhor" | **Espionagem é a estratégia mais interessante e a menos economicamente suportada.** (D-031, D-041) |
| Beto (Defensivo) | T11: "kafkiano". T15: "humilhado". 16 turnos sem construir Wall — estratégia declarada no T1. | "80% culpa do sistema" mas aceita parte da culpa | **Estratégia defensiva é inviável como apresentada — não difícil, mas impossível no early game.** (D-031, D-028) |
| Felix (Novato) | Quase abandono real no T3. Aprendeu Sawmill por tooltip acidental no T5. | 3/10 — "voltaria com tutorial" | **O ponto de abandono chegou no T3. O jogo sobreviveu por persistência do agente, não por design.** (D-040, D-028) |
