# Pain/Gain Map — Dice&Cards Era

**Última atualização:** Sprint 05 (2026-03-11)
**Total de discoveries:** 91 (72 anteriores + 19 novos sprint 5)
**Pains:** 68 | **Gains:** 23 (+ G anteriores mantidos)
**NPS Médio Sprint 5:** 5,7/10 (-0,8 vs Sprint 4)

> **Nota Sprint 5:** A queda de NPS (6.5→5.7) reflete a taxa de eliminação early de 67% (4/6 agentes eliminados antes da Era 3). O replay intent permanece 100%.

---

## Tabela de Discoveries

### Sprint 1 — Wave 1

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-001 | pain | mecanica | **Sem preview de combate.** Atacar não mostra poder de ataque vs defesa antes de confirmar. Em Sprint 3: preview existe no ExpeditionModal mas só é informativo quando território foi revelado por espião. > *"A interface de ataque não mostrou preview de combate antes de enviar! Não sei se vou ganhar ou perder." (Agent-A, T16, S1)* | 6/6 | 10 | 1 | parcial (S3: preview existe; sem revelação de espião ainda é estimativa) |
| D-002 | pain | interface | **Timer não para durante navegação entre páginas.** Timer de 10s avança em /game/territory, /game/cards, /game/army. > *"Quando voltei ao mapa, já estava no turno 2. Perdi o turno 1 sem agir." (Agent-A, T1, S1)* | 5/6 | 8 | 1 | sim (S3) |
| D-003 | pain | mecanica | **Facção Umbral sem espiões implementados (Sprint 1).** > *"Não há unidade SPY disponível no cliente." (Agent-E, T1, S1)* | 1/6 | 8 | 1 | sim (S3: espiões funcionais; bônus Umbral 100% sucesso confirmado S5) |
| D-004 | pain | interface | **Sem tutorial contextual.** Sem tooltips inline, missões guia ou onboarding no fluxo de jogo. > *"Não há dica do tipo 'Construa Barracks para recrutar'." (Agent-F, T4, S1)* | 3/6 | 9 | 1 | parcial (S4: TipBanner implementado; S5: vitória≠conquista e adjacências ainda não cobertas) |
| D-005 | pain | interface | **Resultado de batalhas entre AIs ausente no log.** Evento mostra "AI3 atacou AI2" sem resultado. > *"O evento disse apenas 'atacou' mas não o RESULTADO." (Agent-D, T17, S1)* | 4/6 | 7 | 1 | não |
| D-006 | pain | interface | **Limite de 4 estruturas por território não comunicado.** > *"A limitação de 4 estruturas nunca foi explicada." (Agent-B, T17, S1)* | 3/6 | 7 | 1 | não |
| D-007 | pain | mecanica | **Resultado de exploração pouco claro.** Retorno mostra recursos sem indicar sucesso/parcial/falha. > *"A interface não mostra o resultado (sucesso/parcial/falha)." (Agent-A, T7, S1)* | 3/6 | 6 | 1 | não |
| D-008 | pain | interface | **Cartas desconectadas do fluxo de combate.** Ativar cartas exigia rota separada. Em S4: banner de sugestão existe e foi eficaz para experientes; novatos ainda descobrem tarde. > *"Tinha que ativar a carta em página separada ANTES de enviar o ataque." (Agent-C, T16, S1)* | 3/6 | 5 | 1 | parcial (S4: banner contextual implementado; S5: 5/6 nunca usaram cartas) |
| D-009 | pain | agencia | **Diplomacia puramente probabilística sem controle.** > *"Propus paz com AI2 cinco vezes, rejeitada todas." (Agent-E, entrevista, S1)* | 3/6 | 5 | 1 | não (confirmado S4 e S5) |
| D-010 | pain | mecanica | **Bônus de facção implementados mas imperceptíveis.** > *"A produção de Farm era 12/turno para todos." (Agent-A, champion.md, S1)* | 2/6 | 4 | 1 | sim (S3: bônus percebidos e estrategicamente relevantes; S5: confirmado por A, C, E) |
| D-011 | pain | diversao | **Tela de vitória sem narrativa de mérito.** Resultado exibe números sem explicar por que venceu. > *"Gostaria de uma tela que explicasse POR QUÊ venci." (Agent-A, champion.md, S1)* | 1/6 | 4 | 1 | sim (S4: GameResultsScreen com ranking animado) |
| D-012 | pain | interface | **Sem indicador de progresso para próxima era.** > *"Não há contador óbvio de 'X turnos até Era da Guerra'." (Agent-F, T7, S1)* | 2/6 | 6 | 1 | não (confirmado S5: C e A mencionaram ausência de contador de era) |
| D-013 | pain | agencia | **Carta Sabotagem: alvo de estrutura não escolhido.** Destrói estrutura aleatória. > *"Sabotagem é aleatória! Não posso escolher qual estrutura destruir." (Agent-E, T16, S1)* | 1/6 | 3 | 1 | não |
| D-014 | pain | bugs | **Population tracking zerado no client.** Campo population sempre retorna 0. Scoring usa valor fixo 100. > *"Population sempre 0 na UI — scoring broken." (Agent-A, S1)* | 2/6 | 2 | 1 | não (confirmado S5 — score ainda usa pop fixa) |
| D-015 | pain | mecanica | **AI de mesma facção começa como HOSTILE.** Lore indica aliança, mecânica ignora. > *"AI2 é da facção Umbral e começa como HOSTILE." (Agent-E, T2, S1)* | 1/6 | 3 | 1 | não (confirmado S5: B, D, E mencionaram hostilidade inicial sem explicação) |

---

### Sprint 2 — Wave 2

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-016 | pain | interface | **Ausência total de UI de ataque PvP.** Não existia botão para atacar territórios. > *"RAIVA. Eu tenho soldados. Tenho um território. A guerra é MINHA estratégia. E o jogo não me deixa atacar." (Agent-C, T3, S2)* | 6/6 | 10 | 2 | sim (F-020/F-021/F-022/F-023 — combate PvP implementado e testado) |
| D-017 | pain | interface | **Timer de 10s corta ações em andamento.** > *"O turno de 10 segundos me pegou no meio de uma ação." (Agent-F, T5, S2)* | 4/6 | 7 | 2 | sim (S3) |
| D-018 | pain | interface | **Treino de unidades sem opção de lote.** Para treinar 5 soldados: 5 cliques individuais. > *"Só posso treinar 1 por vez!" (Agent-C, T2, S2)* | 2/6 | 5 | 2 | parcial (S3: input numérico existe, mas sem validação de máximo por recursos) |
| D-019 | pain | mecanica | **Custos de construção contraintuitivos.** Serraria custa grão, não madeira. > *"Serraria não precisa de madeira para ser construída." (Agent-B, T2, S2)* | 4/6 | 7 | 2 | não (confirmado S5: A e C apontaram inconsistência balance.ts/gameStore.ts) |
| D-020 | pain | interface | **Sem aviso proporcional de custo.** "Isso usa 100% da sua madeira" deveria aparecer. > *"Uma indicação proporcional evitaria o bloqueio." (Agent-B, S2)* | 3/6 | 7 | 2 | sim (F-030/F-031/F-032) |
| D-021 | pain | interface | **Sem ranking/placar visível durante a partida.** > *"O jogo não tem placar visível durante a partida." (Agent-A, champion.md, S2)* | 2/6 | 6 | 2 | não |
| D-022 | pain | mecanica | **Sem ação de mover/reposicionar tropas entre territórios.** Em S4: Reforço existe mas UX de múltiplos cliques persiste (D-050). S5: C solicitou botão "distribuir igualmente" na Era da Invasão. > *"Reposicionar tropas não existe." (Agent-D, entrevista, S2)* | 2/6 | 6 | 2 | parcial (S4: Reforço existe; S5 confirmado tedioso em múltiplos territórios) |
| D-023 | pain | mecanica | **Bônus de facção invisível.** Em S4: bônus percebidos e calculados — resolvido. | 2/6 | 6 | 2 | sim (S3/S4/S5: Ferronatos +20% e Verdâneos +20% explicitamente impactantes) |
| D-024 | pain | mecanica | **Sistema de cartas completamente inutilizável sem contexto de combate.** S5: 5/6 nunca usaram cartas (sem Taverna ou esquecidas). > *"Ficaram acumulando na mão sem uso." (Agent-B, S2)* | 5/6 | 8 | 2 | parcial (S4: banner existe; S5: A usou 1 carta no T23 após 12 turnos esquecida; 5/6 não usaram) |
| D-025 | pain | mecanica | **Diplomacia sem feedback de aceitação/rejeição.** Em S4: aceita/rejeita funciona. Efeito concreto ainda ausente (→ D-035). > *"Proposta de aliança parece entrar em um void." (Agent-E, entrevista, S2)* | 2/6 | 5 | 2 | parcial (S4: resposta funciona; S5: E e D tentaram diplomacia sem efeito observável) |
| D-026 | pain | diversao | **Expedições escondidas — melhor sistema do jogo é invisível para novatos.** > *"Encontrei as Expedições por ACIDENTE." (Agent-F, T9, S2)* | 3/6 | 8 | 2 | não |
| D-027 | pain | mecanica | **Espião com 0 de defesa sem aviso.** > *"Aprendi que espiões não defendem nada." (Agent-E, entrevista, S2)* | 1/6 | 5 | 2 | não |

---

### Sprint 3 — Wave 3

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-028 | pain | interface | **Botões de construção/treinamento habilitados mesmo sem recursos.** Em S4: RESOLVIDO por F-033/F-034. > *"A interface NÃO me impediu de clicar no botão — só exibiu erro APÓS a tentativa." (Ariana, T4, S3)* | 6/6 | 10 | 3 | **sim (S4: F-033/F-034 — botões desabilitados corretamente)** |
| D-029 | pain | interface | **Sem preview de produção/benefício antes de construir estrutura.** Em S4: RESOLVIDO por F-035/F-036. > *"Não fica claro no menu de construção QUANTO cada estrutura vai produzir por turno." (Ariana, T1, S3)* | 6/6 | 9 | 3 | **sim (S4: F-035/F-036 — labels de produção visíveis; elogiados 6/6 agentes)** |
| D-030 | pain | interface | **Cartas ignoradas apesar de disponíveis no ExpeditionModal.** Em S5: ARIA usou carta T23 após esquecê-la 12 turnos; 5/6 nunca usaram. > *"As cartas estavam no inventário mas nunca apareceram de forma prominente." (Cleo, entrevista, S3)* | 6/6 | 8 | 3 | parcial (S4: F-037 implementado; S5: 5/6 ainda sem uso; notificação insuficiente) |
| D-031 | pain | mecanica | **Ouro como gargalo sistêmico — Mine não é prioridade comunicada.** S5: E bloqueada por ouro 3 turnos; D sem ouro para recrutar turnos 3-5. > *"A progressão de ouro é o maior gargalo." (Ariana, T19, S3)* | 5/6 | 7 | 3 | não (confirmado S5 — gargalo afeta especialmente Umbral e estratégias defensivas) |
| D-032 | pain | diversao | **Fim de jogo abrupto sem cerimônia de vitória/ranking.** Em S4: RESOLVIDO por F-043/F-045. > *"FIM ABRUPTO. Joguei 25 turnos para ver um número na tela." (Ariana, T25, S3)* | 5/6 | 8 | 3 | **sim (S4: F-043/F-045 — GameResultsScreen com ranking animado)** |
| D-033 | pain | mecanica | **Horda não explica mecânica de targeting.** Em S4: RESOLVIDO por F-049/F-050. S5: modal existe mas targeting de território específico ainda ausente (→ D-044). > *"A Era da Invasão chegou sem EU saber o que é a Horda." (Ariana, T18, S3)* | 4/6 | 8 | 3 | **sim (S4: F-049/F-050 — modal informativo + countdown no HUD)** |
| D-034 | pain | interface | **Sem overview visual de tropas por território no mapa.** Em S4: RESOLVIDO para tropas próprias por F-046/F-047. Tropas inimigas ainda ausentes (→ D-042/D-047). S5: A perdeu T0 por não ter visão de distribuição de forças. > *"Sem overview de 'força por território' no mapa." (Davi, entrevista, S3)* | 4/6 | 8 | 3 | parcial (S4: F-046/F-047 — badges nos próprios territórios; S5 confirmado insuficiente) |
| D-035 | pain | mecanica | **Diplomacia sem efeito concreto observável.** 4 sprints consecutivos. S5: E e B tentaram e não encontraram efeito real. > *"A diplomacia existe como estado (Aliado/Neutro/Hostil) mas não como mecânica de ação." (Espa, S3+S4+S5)* | 4/6 | 6 | 3 | não (confirmado S5 — 4º sprint consecutivo sem progresso) |
| D-036 | pain | mecanica | **Duração de revelação de espião curta (5 turnos) sem countdown visível.** > *"A duração da revelação não aparece visivelmente com countdown." (Espa, entrevista, S3)* | 3/6 | 7 | 3 | não (confirmado S5) |
| D-037 | pain | interface | **Sem preview de tempo de viagem em expedições.** Em S4: RESOLVIDO por F-041/F-042. > *"O mapa não mostra contagem de turnos por rota visualmente." (Ariana, T8, S3)* | 5/6 | 8 | 3 | **sim (S4: F-041/F-042 — travel time badges confirmados S5)** |
| D-038 | pain | mecanica | **Grão acumula sem uso no late game — balanceamento quebrado.** S5: A acumulou 300+ grãos nos turnos finais. > *"Estou afogando em grão (378!) mas sem ouro para nada." (Ariana, T20, S3)* | 4/6 | 7 | 3 | não (confirmado S5 — A: "Carta Colheita Farta gerou ~300 grãos; ouro era o limitante") |
| D-039 | pain | interface | **Mecânica de Reforço (mover tropas) não comunicada.** S5: F descobriu sistema de expedição acidentalmente; A não sabia que havia tempo de viagem entre territórios adjacentes (T10). > *"Não sabia que podia enviar expedições de REFORÇO!" (Cleo, T21, S3)* | 3/6 | 6 | 3 | não |
| D-040 | pain | interface | **Sem tutorial/onboarding para novatos.** Em S4: TipBanner parcialmente resolve. S5: F completamente perdido turnos 1-4. > *"O JOGO NÃO ME ENSINA O QUE FAZER." (Felix, T3, S3)* | 3/6 | 9 | 3 | parcial (S4: TipBanner; S5: vitória≠conquista e adjacências ainda não cobertas) |
| D-041 | pain | diversao | **Deadlock econômico com ordem de build errada.** S5: C sofreu 3 turnos de deadlock (T3-T5); B sofreu toda a Era da Paz. > *"GAME STUCK — rush sem economia cria impasse irrecuperável." (Cleo, T6, S3)* | 3/6 | 8 | 3 | parcial (S4: TipBanner mitiga; S5: C (campeão!) sofreu deadlock early e não lembrou na entrevista) |

---

### Sprint 4 — Wave 4

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-042 | pain | interface | **Sem visibilidade de tropas inimigas no mapa.** S5: A perdeu T0 por não saber força de AI3; F deixou T0 desprotegido por não medir ameaça. > *"Toda a minha estratégia foi construída sobre informação parcial." (Cleo, S4)* | 4/6 | 9 | 4 | não |
| D-043 | pain | interface | **Alerta de ataque iminente ausente.** Em S5: IMPLEMENTADO. "Ataque Chegando" confirmado por A (T12) e D (entrevista Q5). Novo pain: falta escala de ameaça → ver D-056. > *"No turno anterior tudo parecia normal, e de repente estava sendo atacado." (Felix, S4)* | 3/6 | 8 | 4 | **sim (S5: "Ataque Chegando" confirmado funcional por A e D; ver D-056 para escala)** |
| D-044 | pain | mecanica | **Horda não indica território específico de ataque dentro do clã-alvo.** S5: A (T19): "não vejo ONDE a Horda vai atacar"; C (T21): distribuiu unidades sem saber território exato. > *"O modal diz QUEM mas não ONDE dentro dos territórios do alvo." (Cleo, S4)* | 4/6 | 7 | 4 | não |
| D-045 | pain | interface | **Era da Guerra sem explicação mecânica na transição animada.** S5: F não sabia que havia eras até o banner (Q6: "o quê? guerra? desde quando?"). B pensou que haveria transição gradual. > *"A animação é linda mas não explica nada. O que muda na Era da Guerra?" (Felix, S4+S5)* | 2/6 | 7 | 4 | não |
| D-046 | pain | mecanica | **Comportamento da Horda em empate de territórios não documentado.** S5: A perdeu no turno final por ter liderado apenas 1 turno sem saber regra de empate. > *"'Ataca o clã com mais territórios' não especifica o que acontece em empate." (Davi, S4)* | 2/6 | 6 | 4 | não |
| D-047 | pain | interface | **Defense badges aparecem apenas em territórios próprios, não inimigos.** S5: A tomou decisão de ataque sem saber força de AI3; F enviou ataque sem estimar defesa inimiga. > *"Os badges de defesa no mapa mostram apenas nos meus territórios, não nos inimigos." (Davi, S4)* | 4/6 | 8 | 4 | não |
| D-048 | pain | diversao | **Breakdown de pontuação ausente na GameResultsScreen.** S5: A: "quero ver cálculo de pontuação"; C: "tela mostrou score mas não história". > *"Gostaria de ver '+400 por 4 territórios', '+1000 por população', etc." (Ariana, S4)* | 4/6 | 6 | 4 | não |
| D-049 | pain | diversao | **Dead time de viagem — sem ação útil disponível durante espera de expedição.** S5: B (T5), D (T4-5), F (T4-6), A (T5-7) todos mencionaram turnos de espera passiva. > *"Este turno foi completamente vazio. Sem tropas disponíveis, sem urgência de construção óbvia." (Felix, S4+S5)* | 3/6 | 7 | 4 | não |
| D-050 | pain | interface | **UX de realocação de tropas — muitos cliques para ação frequente.** S5: C (T19): "distribuir manualmente unidades por 4 territórios é tedioso — falta botão 'distribuir igualmente'". > *"Parece que poderia ser mais direto — talvez drag-and-drop no mapa." (Ariana, S4)* | 2/6 | 6 | 4 | não |
| D-051 | pain | mecanica | **Bônus de facção Umbral invisível na UI.** S5: E jogou sem confirmar se +30% estava ativo. > *"Não vi em nenhum lugar o +30% eficiência de espiões." (Espa, S4+S5)* | 2/6 | 7 | 4 | não |
| D-052 | pain | interface | **Tooltip de recurso insuficiente sem especificidade.** S5: D (T3-4): "faltam 2 madeira" calculado manualmente múltiplas vezes; B idem. > *"'Falta 1 ouro' seria mais útil que mensagem genérica no botão cinza." (Espa, S4)* | 2/6 | 5 | 4 | não |

---

### Sprint 5 — Wave 5 (NOVOS)

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:-------------:|
| D-053 | pain | mecanica | **Custo de Muralha Nv1 (50 madeira = 100% do estoque inicial) inviabiliza estratégia defensiva early game.** Com Serraria gerando 8 madeira/turno, threshold atingido no turno 7-8 — final da Era da Paz. BALDO gastou 7 turnos tentando construir 1 Muralha; quando conseguiu (T8), foi destruído no T9 de qualquer jeito. A estratégia declarada "defensiva econômica" é um arquétipo do jogo que o balanceamento atual não suporta. > *"7 turnos e ainda não consegui. Um dos momentos mais frustrantes que já tive num jogo de estratégia." (BALDO, T7)* > *"Se o custo fosse 25 madeira em vez de 50, teria construído no turno 4, tido tempo para Quartel, sobrevivido à guerra." (BALDO, last-place.md)* | 3/6 | 9 | 5 | não |
| D-054 | pain | mecanica | **Meta dominante "militar ofensiva early" elimina diversidade de arquétipos viáveis.** Dos 6 estratégias declaradas (econômica agressiva, econômica defensiva, militar ofensiva, militar reativa, espionagem/diplomacia, instintiva), apenas militar ofensiva resultou em vitória. 4/6 foram eliminados antes da Era 3. A existência de facções e estratégias diversas cria expectativa de viabilidade que o balanceamento atual não cumpre. > *"A estratégia reativa em um jogo onde a agressão é tão recompensada é estruturalmente em desvantagem." (DARA, T13)* > *"Meta dominante confirmado: Militar ofensiva early é a única estratégia viável." (ranking.md, S5)* | 4/6 | 9 | 5 | não |
| D-055 | pain | diversao | **Sem modo espectador após eliminação — 4/6 ficam inativos por 10-14 turnos.** BALDO ficou 14 turnos sem qualquer interação após ser eliminado no T11. DARA (T12), EZRA (T13), FIO (T14) idem. O jogo não oferece informação, ação ou entretenimento pós-eliminação. Impacto direto em NPS: agentes eliminados early tendem a notas menores (B=3, D=5, E=6). > *"Permaneci 'observando' os outros clãs até o fim do jogo, sem ação possível. Teria sido ótimo ter um modo 'espectador'." (BALDO, T12-25)* | 4/6 | 7 | 5 | não |
| D-056 | pain | interface | **"Ataque Chegando" sem indicação de escala de ameaça (pequena/média/grande).** O alerta foi implementado (D-043 resolvido em S5) e é valioso. Mas não informa a magnitude da ameaça. ARIA ficou igualmente ansiosa seja com 2 soldados ou 20 cavaleiros chegando, sem poder calibrar a resposta defensiva. > *"Sei que algo vem, mas não sei quão sério é. O preview deveria mostrar 'ameaça: pequena/média/grande'." (ARIA, T12)* | 2/6 | 6 | 5 | não |
| D-057 | pain | interface | **Relatório de batalha do próprio jogador passa rápido e não tem histórico acessível.** Resultado de combate aparece brevemente no log e não pode ser revisitado. ARIA (T13): "quero ver detalhes: quem atacou, quantas unidades, quais unidades morri." FIO (T5): "venci mas não sei o que aconteceu." | 2/6 | 6 | 5 | não |
| D-058 | pain | interface | **Sem aviso ao lançar expedição que territórios de origem ficam desprotegidos.** Ao confirmar expedição que esvazia um território, nenhum aviso aparece. ARIA perdeu T0 inteiro (com 8 turnos de infraestrutura) por ter deixado desprotegido ao atacar T3. FIO enviou todos os soldados para longe, ficando 3 turnos sem qualquer defesa. Causa direta de mortes por erro evitável. > *"O jogo não mostrou claramente 'você tem X unidades em T0, enviou Y para expedição, restam Z'." (ARIA, T16)* > *"Mandar TODOS os soldados para longe deixando o território base vazio foi um erro GIGANTE que o jogo não me preveniu." (FIO, T4)* | 3/6 | 8 | 5 | não |
| D-059 | pain | interface | **Adjacências de território não visualizadas no mapa — jogador descobre por tentativa/erro.** A grade 3x4 não indica visualmente quais territórios se conectam. FIO atacou T4 sem saber que não era adjacente a seus territórios (soldados ficaram 3 turnos presos). CAIUS precisou memorizar adjacências. ARIA calculou incorretamente em T14. Linhas de conexão ou indicadores visuais de adjacência estão ausentes. > *"A gridagem 3x4 com adjacências não fica visualmente evidente — é preciso 'sentir' quais territórios são adjacentes." (CAIUS, Q4)* > *"Linhas de conexão entre territórios adjacentes ajudariam muito." (CAIUS, Q22)* | 3/6 | 7 | 5 | não |
| D-060 | pain | mecanica | **Guilda das Sombras não comunica que recrutar espiões custa ouro — dependência de recurso oculta no momento de construção.** EZRA construiu Guilda no T1 com todo seu ouro, então ficou 3-4 turnos sem poder recrutar nenhum espião. A tela de construção da Guilda não informa o custo de recrutamento de espiões. Cria uma armadilha de "investiu em estrutura mas não pode usar" imediatamente. > *"Contradição estratégica — construí a Guilda para recrutar espiões, mas o recrutamento custa ouro que agora está zerado." (EZRA, T2)* | 1/6 | 7 | 5 | não |
| D-061 | pain | mecanica | **Vitória de combate ≠ conquista de território (ratio < 1.5 vence mas não conquista) — distinção crítica não explicada em lugar nenhum.** FIO venceu combate, não conquistou território, gastou 4 soldados "para nada" e ficou confuso por 2 turnos. A distinção entre "vitória simples" (ratio 1.0–1.5: perdas mútuas, ninguém conquista) e "vitória decisiva" (ratio > 1.5: conquista + saque) é a mecânica mais fundamental do combate e nunca é explicada. > *"Venci um combate mas não conquistei o território. Por que? Não entendi até o fim da partida." (FIO, T6)* > *"Atacar = tentar conquistar — pelo menos eu achei. Se não conquisto com ataque 'bem-sucedido', qual é o ponto?" (FIO, T6)* | 2/6 | 8 | 5 | não |
| D-062 | pain | diversao | **Taxa de eliminação early (67%) significa que a Horda — mecânica mais elaborada do jogo — não é vista pela maioria dos jogadores.** 4/6 foram eliminados entre os turnos 11-14. A Era da Invasão, que começa no turno 19, foi experienciada por apenas 2 agentes. O balanceamento atual torna a mecânica mais investida do jogo inacessível para a maioria. > *"Agentes que chegaram à Era da Invasão: 2/6 (33%)." (ranking.md, S5)* | 4/6 | 9 | 5 | não |
| D-063 | pain | bugs | **Inconsistência crítica de custos entre balance.ts e gameStore.ts — fonte única de verdade quebrada.** ARIA encontrou divergência explícita: balance.ts diz SAWMILL=[wood:5, gold:10]; gameStore.ts diz SAWMILL={grain:15, gold:10}. Qual valor a UI usa? CAIUS confirmou o problema na entrevista. Afeta confiança do jogador, impede testes automatizados confiáveis e cria comportamentos imprevisíveis. > *"BUG CRÍTICO: os custos em balance.ts e gameStore.ts são diferentes para a Serraria. Qual valor a UI realmente usa?" (ARIA, T2)* | 2/6 | 8 | 5 | não |
| D-064 | pain | mecanica | **Horda sem período de graça para liderança temporária — qualquer expansão imediata se torna alvo.** A Horda verifica quem tem mais territórios a cada turno sem graça. ARIA expandiu para 4 territórios no T24 e foi atacada no T25. Liderar por 1 turno é suficiente para ser punido. Cria desincentivo para expansão final que se sente como "traição" de regras. > *"Expandi para me defender e imediatamente o jogo me atacou por isso. O jogador que expandiu 'certo' pode se sentir traído." (ARIA, T25)* | 2/6 | 6 | 5 | não |
| D-065 | pain | mecanica | **Estratégia de espionagem Umbral estruturalmente inviável no modo quick (8 turnos de paz).** 8 turnos não são suficientes para: construir Guilda + acumular ouro + recrutar espiões + enviar missões + receber intel E ter força militar mínima. EZRA conseguiu 1 espião funcional apenas no turno 5, foi eliminado no turno 13. A estratégia que o Umbral deveria dominar é um "trap" arquetípico no modo quick. > *"O ecossistema de espionagem tem peças mas elas não se conectam bem no tempo disponível." (EZRA, reflexão pós-eliminação)* > *"Para spy precisar de 4+ turnos apenas para o primeiro espião é demais em modo de 8 turnos de paz." (EZRA, T2)* | 1/6 | 7 | 5 | não |

---

### Gains — Sprints 1-4 (mantidos)

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Status |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:------:|
| G-001 | gain | diversao | **Transição de era animada.** Unanimidade por 5 sprints consecutivos. Melhor momento narrativo do jogo. > *"A animação de transição de era foi satisfatória! BEM FEITO." (múltiplos agentes)* | 6/6 | 10 | 1 | — |
| G-002 | gain | mecanica | **Wall como defesa passiva estratégica.** Bônus +20% cria decisão clara com recompensa tangível. | 4/6 | 9 | 1 | — |
| G-003 | gain | mecanica | **Horda como mecanismo anti-snowball.** Prioriza o maior clã criando desincentivo ao domínio excessivo. S5: C usou como instrumento estratégico emergente. | 4/6 | 8 | 1 | — |
| G-004 | gain | diversao | **Narrativas atmosféricas de exploração.** Textos imersivos de resultado de expedição. | 3/6 | 7 | 1 | — |
| G-005 | gain | interface | **Clareza visual do mapa por clã.** Cores de propriedade intuitivas para todos os perfis. Reconfirmado S5 (todos os agentes). | 6/6 | 9 | 1 | — |
| G-006 | gain | diversao | **Feedback de conquista com saque listado.** Evento de vitória + recursos listados cria loop de reward. | 3/6 | 7 | 1 | — |
| G-007 | gain | diversao | **Expedições como loop autônomo de risco/recompensa com narrativa.** | 3/6 | 9 | 2 | — |
| G-008 | gain | mecanica | **Defesa bem-sucedida cria satisfação de mérito genuíno.** Loop emocional correto. S5: A defendeu T1 contra AI2 (T13); DARA quase defendeu T1 (ratio 1.43). | 2/6 | 7 | 2 | — |
| G-009 | gain | diversao | **Loop conquista → saque → reinvestimento em PvP.** Sistema de saque cria momentum onde cada vitória financia a próxima expansão. S5: C confirmou. > *"O SAQUE! Essa mecânica é o coração da estratégia militar." (S3)* | 5/6 | 9 | 3 | — |
| G-010 | gain | interface | **Overlay visual de território revelado por espião.** Números reais do inimigo no mapa com ícone de olho. S5: E confirmou mecânica funcional. | 3/6 | 9 | 3 | — |
| G-011 | gain | mecanica | **Variedade perceptível de personalidades de IA.** Comportamentos distintos estrategicamente relevantes. S5: C, A, D, E confirmaram. | 4/6 | 8 | 3 | — |
| G-012 | gain | diversao | **GameResultsScreen com ranking animado — cerimônia de encerramento.** MAIOR WIN do projeto. 6/6 unanimidade. | 6/6 | 10 | 4 | — |
| G-013 | gain | interface | **Modal informativo da Horda com escala de força e timing.** S5: A, C usaram informação para planejamento estratégico. | 5/6 | 9 | 4 | — |
| G-014 | gain | interface | **Countdown da Horda no HUD.** Tensão estratégica contínua. S5: A (T21): "sequência de turnos da Horda guiou minha expansão". | 5/6 | 9 | 4 | — |
| G-015 | gain | interface | **Labels de produção visíveis antes de construir.** Resolve D-029. Unanimidade S4 mantida. | 6/6 | 9 | 4 | — |
| G-016 | gain | interface | **Botões desabilitados com recurso insuficiente.** Resolve D-028. Guia passivo eficaz. | 5/6 | 9 | 4 | — |
| G-017 | gain | interface | **TipBanner contextual no momento relevante.** Resolve parcialmente D-040. | 4/6 | 8 | 4 | — |
| G-018 | gain | interface | **Defense badges nos territórios próprios.** Resolve parcialmente D-034. S5: A usou para verificar vulnerabilidade antes de lançar ataque. | 4/6 | 7 | 4 | — |
| G-019 | gain | mecanica | **Banner de sugestão de carta no ExpeditionModal.** Resolve parcialmente D-030. | 3/6 | 8 | 4 | — |

---

### Gains — Sprint 5 — Wave 5 (NOVOS)

| ID | Tipo | Categoria | Descrição | Frequência | Score (1-10) | Sprint | Status |
|----|------|-----------|-----------|:-----------:|:------------:|:------:|:------:|
| G-020 | gain | mecanica | **CombatPreview com sistema de ratio (atk/def) transparente e estrategicamente rico.** Thresholds claros (1.0 vitória simples, 1.5 vitória decisiva) + fog of war ±20% criam planejamento estratégico real. Feedback imediato de "você vai vencer/perder" com base em dados concretos. Feature mais elogiada da sessão por agentes experientes. > *"O sistema de CombatPreview com ratio e fog of war cria tensão e estratégia genuínas sem ser punitivo demais." (ARIA, Q23)* > *"Muito bem calibrado. O sistema é transparente e justo — o bônus Ferronatos foi decisivo em múltiplos confrontos." (CAIUS, Q7)* | 4/6 | 9 | 5 | — |
| G-021 | gain | mecanica | **Horda como instrumento estratégico emergente — mecânica não ensinada, descoberta organicamente.** Atacar imediatamente após wave de Horda enfraquecer o líder é estratégia emergente de alto valor que nenhum agente planejou mas 2/6 descobriram. CAIUS a chamou de "minha jogada favorita de todo o jogo." Design emergente de alta qualidade. > *"Percebi que estava usando a Horda como instrumento estratégico — isso não estava no plano original, foi emergência pura." (CAIUS, T20)* > *"Aproveitar fraqueza da Horda foi emocionante." (ARIA, T20)* | 2/6 | 9 | 5 | — |
| G-022 | gain | interface | **Aviso "Ataque Chegando" — feature de alto valor confirmada como implementada em S5.** D-043 estava "não implementado" em S4; S5 confirmou existência e impacto positivo. Permite reação defensiva antecipada com 1 turno de aviso. DARA: "mais útil que o log textual." ARIA: "excelente feature defensiva." Feature transformadora para jogadores defensivos. > *"O aviso de 'ataque chegando' no mapa foi mais útil que o log textual." (DARA, Q5)* > *"Aviso de Ataque Chegando apareceu na interface — excelente feature de preview!" (ARIA, T12)* | 3/6 | 8 | 5 | — |
| G-023 | gain | diversao | **Narrativa de reconquista: perda → recuperação cria arco emocional que sustenta replay intent de 100%.** Reconquistar território perdido gera os momentos mais satisfatórios do jogo. FIO reconquistou T1 (único momento de lucidez em 14 turnos). ARIA reconquistou T0 (motivo de continuar jogando). CAIUS reconquistou múltiplos. O arco emocional "ascensão → queda → recuperação" é o coração do replay intent unânime desta sessão. > *"Quando reconquistei T0 no turno 21, depois que AI3 havia me tomado. A narrativa de 'perda → recuperação' foi genuinamente satisfatória." (ARIA, Q11)* > *"Reconquistei T1! Gritei 'ISSO!' internamente." (FIO, T11)* | 3/6 | 8 | 5 | — |

---

## Resumo por Categoria (Acumulado Sprint 5)

| Categoria | S1 | S2 | S3 | S4 | S5 | Total Pains | Gains Total |
|-----------|:--:|:--:|:--:|:--:|:--:|:-----------:|:-----------:|
| interface | 5 | 4 | 5 | 6 | 4 | **24** | 7 |
| mecanica | 4 | 7 | 5 | 3 | 5 | **24** | 10 |
| diversao | 1 | 1 | 1 | 2 | 2 | **7** | 6 |
| agencia | 2 | 0 | 0 | 0 | 0 | **2** | 0 |
| bugs | 1 | 0 | 0 | 0 | 1 | **2** | 0 |
| **TOTAL** | 13 | 12 | 11 | 11 | **13** | **60** | **23** |

---

## Status de Implementação Acumulado — Atualizado S5

**Implementados com sucesso (resolvidos):**
- D-002 (Timer navegação) → sim S3
- D-003 (Umbral sem espiões) → sim S3/S5
- D-010 (Bônus facção invisível) → sim S3
- D-011 (Tela vitória sem narrativa) → sim S4
- D-016 (Sem UI ataque PvP) → sim S3
- D-017 (Timer 10s) → sim S3
- D-020 (Sem aviso custo) → sim S3
- D-023 (Bônus facção invisível v2) → sim S3
- D-028 (Botões habilitados sem recursos) → sim S4
- D-029 (Sem preview de produção) → sim S4
- D-032 (Fim de jogo abrupto) → sim S4
- D-033 (Horda sem explicação) → sim S4
- D-037 (Sem preview tempo expedição) → sim S4
- **D-043 (Alerta de ataque iminente) → sim S5** ← NOVO

**Parcialmente implementados:**
- D-001 (Sem preview combate) → parcial
- D-004 (Sem tutorial) → parcial (TipBanner; adjacências e vitória≠conquista ainda ausentes)
- D-008 (Cartas desconectadas) → parcial (5/6 S5 ainda sem uso)
- D-018 (Treino sem lote) → parcial
- D-022 (Sem mover tropas) → parcial (Reforço existe; UX tedioso)
- D-024 (Cartas inutilizáveis) → parcial (5/6 S5 nunca usaram)
- D-025 (Diplomacia sem feedback) → parcial
- D-030 (Cartas ignoradas) → parcial
- D-034 (Sem overview tropas) → parcial (badges próprios; inimigos ausentes)
- D-040 (Sem tutorial novatos) → parcial
- D-041 (Deadlock build) → parcial

**Não implementados (persistentes):**
D-005, D-006, D-007, D-009, D-012, D-013, D-014, D-015, D-019, D-021, D-026, D-027, D-031, D-035, D-036, D-038, D-039, D-042, D-044, D-045, D-046, D-047, D-048, D-049, D-050, D-051, D-052, D-053–D-065

---

## Top 10 Pains Ativos por Impacto — Sprint 5 (Score × Frequência)

| Rank | ID | Score | Freq | Produto | Descrição Resumida | Sprint |
|------|----|:-----:|:----:|:-------:|--------------------|:------:|
| 1 | D-054 | 9 | 4/6 | **36** | Meta dominante militar ofensiva elimina diversidade de arquétipos | 5 |
| 2 | D-062 | 9 | 4/6 | **36** | 67% dos jogadores não veem a Era da Invasão | 5 |
| 3 | D-053 | 9 | 3/6 | **27** | Custo Muralha (50 madeira) inviabiliza defesa early | 5 |
| 4 | D-042 | 9 | 4/6 | **36** | Sem visibilidade de tropas inimigas no mapa | 4 |
| 5 | D-058 | 8 | 3/6 | **24** | Sem aviso ao deixar território desprotegido em expedição | 5 |
| 6 | D-047 | 8 | 4/6 | **32** | Defense badges só nos próprios territórios | 4 |
| 7 | D-063 | 8 | 2/6 | **16** | Bug: inconsistência balance.ts vs gameStore.ts | 5 |
| 8 | D-061 | 8 | 2/6 | **16** | Vitória de combate ≠ conquista de território (não explicado) | 5 |
| 9 | D-031 | 7 | 5/6 | **35** | Ouro gargalo sistêmico não comunicado | 3 |
| 10 | D-038 | 7 | 4/6 | **28** | Grão acumula sem uso no late game | 3 |

---

## Insights Críticos de Divergência Log vs Entrevista — Sprint 5

| Agente | Pain no Log | Na Entrevista | Pain Real |
|--------|-------------|---------------|-----------|
| ARIA (2ª) | Carta esquecida 12 turnos; "PUNIÇÃO FINAL BRUTAL" da Horda no T25 | "Era da Invasão criou urgência real" (positivo); carta mencionada brevemente | **Vitória mascara dores reais. ARIA sofreu notificação insuficiente de cartas e Horda sem período de graça, mas a entrevista é otimista. Log é mais honesto.** |
| CAIUS (1º) | 3 turnos de deadlock econômico (T3-T5): "absurdo", "ciclo de dependências mal comunicado" | 8/10 — foca em adjacências e AI personalities. Deadlock **NÃO MENCIONADO**. | **INSIGHT CRÍTICO: O campeão sofreu deadlock early mas a vitória apagou essa memória. D-041 é mais sistêmico do que o NPS sugere.** |
| BALDO (6º) | T7: "Um dos momentos mais frustrantes que já tive num jogo de estratégia" | 3/10 — medido, analítico | **O log captura raiva genuína; a entrevista é cortês. "Talvez" em replay intent é na verdade "não com condições".** |
| FIO (novato) | Confusão completa de UX (ícones, adjacências, vitória≠conquista) por 14 turnos | 5/10 — "meio a meio" para construção | **Entrevista subestima profundidade da confusão. Log revela desorientação fundamental. Nota 5 é generosa.** |
| EZRA (espionagem) | T6: "100% de sucesso Umbral é OP demais? Sem risco, sem tensão." | **NÃO MENCIONADO na entrevista** | **INSIGHT DE DESIGN: jogador identificou problema de balanceamento (100% sucesso Umbral) no log mas não articulou na entrevista. Único a identificar isso.** |

---

## Evolução de NPS por Bloco Temático

| Bloco | S1 | S2 | S3 | S4 | S5 | Delta S4→S5 |
|-------|:--:|:--:|:--:|:--:|:--:|:-----------:|
| Interface | — | — | 5/10 | 7/10 | **6/10** | **-1** |
| Mecânicas de Combate | — | — | 7/10 | 7/10 | **7/10** | = |
| Sistema Econômico | — | — | 5/10 | 6/10 | **5/10** | **-1** |
| Diplomacia | — | — | 3/10 | 3/10 | **3/10** | = (4º sprint consecutivo) |
| Espionagem | — | — | 6/10 | 7/10 | **5/10** | **-2** (Umbral inviável em quick) |
| Progressão de Era | — | — | 8/10 | 8/10 | **7/10** | **-1** (vitória≠conquista; eras sem explicação) |
| Feedback de Fim de Jogo | — | — | 2/10 | 8/10 | **8/10** | = |
| Modo Espectador | — | — | — | — | **0/10** | NOVO (4/6 eliminados sem nada para fazer) |
| **Geral** | **5,5** | **5,8** | **6,0** | **6,5** | **5,7** | **-0,8** |

> **Nota:** A queda em S5 reflete o meta desequilibrado (67% eliminados early) e ausência de modo espectador. O core loop (replay intent 100%) permanece sólido.
