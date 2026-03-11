# Brainstorming Sprint 3 — Value Map Pain/Gain

**Data:** 2026-03-11
**Wave:** 3 | **Sprint:** 3 | **Agentes:** 6
**NPS médio:** 6.0/10 (A:7, B:5, C:7, D:7, E:7, F:3)

---

## Divergências Log vs Entrevista — Insights Críticos

> **Divergências são os problemas mais honestos — o agente sofreu mas não soube nomear.**

### 1. CLEO (Agent-C) — "Vitória que mascarou o impasse"
- **No log:** 7 turnos consecutivos (T3–T9) com zero ações possíveis. "GAME STUCK — rush militar sem economia cria impasse irrecuperável." "6 turnos de espera... entenda que peguei uma dead-end strategy por design inadequado."
- **Na entrevista:** 7/10. "Quero tentar de novo com Mine no T2." Vitória com 7 territórios compensou emocionalmente.
- **Insight crítico:** A vitória anestesiou a percepção do problema. 35% do jogo foi de impasse silencioso — sem ação possível, sem alerta, sem alternativa de baixo custo. Um jogador menos persistente teria abandonado. **Rush militar sem economia mínima cria dead game que o jogo não detecta nem previne.**

### 2. ESPA (Agent-E) — "Espionagem que só funcionou 1 vez"
- **No log:** Loop completo spy→info→action executado 1 única vez em 25 turnos (T22). 5 territórios no final = 40% estratégia + 40% Horda desgastando inimigos + 20% acidente de timing. "Sinto sortudo, não estratégico."
- **Na entrevista:** 7/10. "Quero provar que espionagem com 2 Mines pode ser a melhor estratégia."
- **Insight crítico:** O resultado respeitável mascarou a ineficácia. A entrevista reflete esperança sobre o potencial do loop; o log documenta que o loop raramente fechou. **Espionagem é a estratégia conceitualmente mais interessante e a menos executável economicamente — sem 2+ Mines desde T1, é ornamental.**

### 3. BETO (Agent-B) — "Estratégia prometida mas inviável"
- **No log:** T11: "Isso é surreal." T12: "Depressão estratégica." T15: "O jogo humilhou minha estratégia declarada." Tentou construir Wall em todos os turnos 3–15 e não conseguiu por 5 ouro.
- **Na entrevista:** "80% culpa do sistema." Mais racional, aceita parte da culpa estratégica.
- **Insight crítico:** A entrevista racionaliza o que o log mostra como sofrimento crescente e genuíno. **Estratégia defensiva é INVIÁVEL como apresentada — não difícil, mas economicamente impossível no early game — e o jogo aceita a declaração de estratégia sem avisar sobre a inviabilidade.**

### 4. FELIX (Agent-F) — "Abandono silencioso evitado por sorte"
- **No log:** T3: "O JOGO NÃO ME ENSINA O QUE FAZER." Quase abandono real. Aprendeu mecânica de Sawmill no T5 lendo tooltip por acidente.
- **Na entrevista:** 3/10 mas "com tutorial voltaria."
- **Divergência de magnitude:** O log documenta que o ponto de abandono chegou no T3 — muito antes do que a entrevista sugere. **Um novato real teria fechado no T3, não no T25. O jogo sobreviveu ao novato por persistência do agente, não por design de onboarding.**

---

## Dores

### Interface

**D-028 — Botões habilitados mesmo sem recursos para pagar** *(6/6)*
Botão de construção e treinamento aparece clicável mesmo quando o jogador não tem recursos. O erro só aparece APÓS o clique. Custo: um turno perdido em tentativas impossíveis.
> *"A interface NÃO me impediu de clicar no botão — só exibiu uma mensagem de erro APÓS a tentativa. Perdi o turno tentando algo impossível." (Ariana, T4)*
> *"Por que os botões aparecem se não posso usar nenhum? Muito confuso." (Felix, T2)*

**D-029 — Sem preview de produção/benefício antes de construir estrutura** *(6/6)*
O menu de construção mostra custo mas não mostra o que a estrutura vai produzir. O jogador decide às cegas entre Farm, Sawmill, Mine sem saber "+10 grão/turno", "+8 madeira/turno", "+5 ouro/turno".
> *"Não fica claro no menu de construção QUANTO cada estrutura vai produzir por turno antes de construir. Tive que adivinhar que Sawmill gera madeira." (Ariana, T1)*
> *"Se houvesse '+10 grão/turno' visível no botão de construção da Farm, teria priorizado Farm + Sawmill + Mine corretamente." (Felix, last-place.md)*

**D-032 — Fim de jogo abrupto sem cerimônia de vitória/ranking** *(5/6)*
Após 25 turnos de jogo, o encerramento é uma tela de log. Sem ranking animado, sem estatísticas, sem momento celebratório. A campeã terminou com 7 territórios e "uma tela de log".
> *"FIM ABRUPTO. Joguei 25 turnos para ver um número na tela." (Ariana, T25)*
> *"A partida tem histórico rico — o jogo deveria celebrá-lo, não apenas encerrar silenciosamente." (Cleo, champion.md)*

**D-034 — Sem overview visual de tropas por território no mapa** *(4/6)*
Para gerenciar 4–7 territórios simultaneamente, o jogador precisa clicar em cada um para ver as tropas. Resultado: territórios são esquecidos e ficam sem defesa.
> *"O maior problema: sem overview de 'força por território' no mapa." (Davi, entrevista Q2)*
> *"Não consigo acompanhar visualmente quantas tropas tenho em cada território ao mesmo tempo." (Davi, T20)*

**D-037 — Sem preview de tempo de viagem em expedições** *(5/6)*
Ao selecionar destino de expedição, o jogo não mostra quantos turnos a viagem levará. O jogador descobre apenas após confirmar.
> *"O mapa não mostra contagem de turnos por rota visualmente. Tive que deduzir." (Ariana, T8)*
> *"O sistema de distância não é transparente. Não sei quantos turnos minha expedição vai levar sem calcular manualmente pela grade." (Davi, T13)*

### Mecânicas

**D-031 — Ouro como gargalo sistêmico — Mine não é prioridade comunicada** *(5/6)*
Ouro é o recurso mais escasso e determinante (+5/turno de Mine). Mas Mine não aparece como recomendação, não tem prioridade visual, e estratégias inteiras colapsam por não construí-la cedo.
> *"Ouro é escasso. A progressão de ouro é o maior gargalo — Mines precisam de mais tempo para pagar o investimento." (Ariana, T19)*
> *"A sequência ótima é Farm → Mine → Sawmill → Barracas [mas ninguém sabia isso]." (Ariana, entrevista Q19)*

**D-033 — Horda não explica mecânica de targeting** *(4/6)*
A Horda aparece na Era 3 sem explicação de que ataca o clã com mais territórios, qual território específico dentro desse clã é alvo, ou quando o próximo ataque vai ocorrer (a cada 3 turnos).
> *"A Era da Invasão chegou sem EU saber o que é a Horda. Sei que 'Horda ataca quem tem mais territórios' só porque li o código — um jogador real não saberia isso." (Ariana, T18)*
> *"Não sabia que a Horda escolhia o maior clã como alvo. Perdi territórios por não saber que ter muitos territórios me tornava o alvo principal." (Davi, entrevista Q6)*

**D-030 — Cartas ignoradas por 6/6 agentes apesar de disponíveis no fluxo de combate** *(6/6)*
Cards estão integradas no ExpeditionModal (feature F-024 implementada), mas nenhum dos 6 agentes as utilizou. A seção existe mas não é suficientemente proeminente para chamar atenção no momento da ação.
> *"As cartas estavam no inventário mas nunca apareceram de forma prominente durante o planejamento de batalha." (Cleo, entrevista Q8)*
> *"INFORMANT parece a carta perfeita para minha estratégia mas nunca apareceu durante o planejamento de expedição como opção." (Espa, entrevista Q8)*
> **DIVERGÊNCIA CRÍTICA:** Feature implementada (F-024), mas completamente ignorada. O problema mudou de "cartas não estão no fluxo" para "cartas não são sugeridas de forma contextual no momento certo."

**D-035 — Diplomacia sem efeito concreto observável** *(4/6)*
Alianças são formadas (Beto fez 2, Espa fez 2) mas nenhum efeito concreto é observável. Aliados não ajudam quando atacados, não fornecem recursos, não protegem territórios.
> *"Aliança sem mecânica concreta — parece cosmético." (Beto, T10)*
> *"Aliados não tiveram efeito concreto — nenhum me ajudou quando fui ameaçado, nenhum deu recursos. A diplomacia existe como estado mas não como mecânica de ação." (Espa, entrevista Q10)*

**D-036 — Duração de revelação de espião muito curta (5 turnos)** *(3/6)*
A revelação de território por espião expira em 5 turnos sem countdown visível. Em 25 turnos totais, a informação obtida expira antes de poder ser agida.
> *"A revelação de T3 expirou. 5 turnos de validade é muito pouco para informação que custou tanto para conseguir." (Espa, T13)*
> *"A duração da revelação (5 turnos) não aparece visivelmente com countdown. Não sabia quando ia expirar." (Espa, entrevista Q2)*

**D-038 — Grão acumula sem uso no late game — balanceamento quebrado** *(4/6)*
Na Era da Invasão, grão acumula centenas de unidades sem uso possível (treinamento requer ouro, construção requer madeira/ouro). O recurso base do jogo se torna inútil no late game.
> *"Estou afogando em grão (378!) mas sem ouro para nada. Deveria haver conversão de recursos ou mais usos para grão." (Ariana, T20)*
> *"Acúmulo massivo de grão (370!) sem uso. A mecânica de manutenção de unidades deveria consumir mais grão no late game." (Ariana, T24)*

**D-039 — Mecânica de Reforço (mover tropas) não comunicada** *(3/6)*
Existe uma ação de "Reforço" que permite mover tropas entre territórios próprios. Nenhum agente sabia que existia — foi descoberta por acidente.
> *"Não sabia que podia enviar expedições de REFORÇO sem ser ataque! Descobri por tentativa e erro. A distinção Attack/Reinforce não é clara na UI." (Cleo, T21)*
> *"Existe expedição de reforço! Funcionalidade útil que descobri por acidente." (Davi, T9)*

### Diversão / Agência

**D-040 — Sem tutorial/onboarding para novatos** *(3/6)*
O jogo não tem sequência guiada de primeiros turnos. Novatos descobrem mecânicas básicas (Sawmill gera madeira, Barracks necessária para treinar) por acidente ou erro catastrófico.
> *"O JOGO NÃO ME ENSINA O QUE FAZER. Não tem tutorial. Não tem sugestão de próximo passo." (Felix, T3)*
> *"O jogo precisa de um tutorial interativo mínimo de 5 turnos que ensine: Farm → Sawmill → Mine → Barracks → treinar soldados." (Felix, entrevista Q22)*

**D-041 — Rush de estratégia especializada cria dead game de 5–7 turnos sem ações** *(3/6 — C, E confirmaram; B parcialmente)*
Estratégias especializadas (militar pura, espionagem pura) criam impasse econômico total onde nenhuma ação é possível por múltiplos turnos seguidos. O jogo não detecta nem previne.
> *"6 turnos de espera... esta é a maior design problem que já vi — a estratégia militar total quebra o loop de progressão." (Cleo, T6)*
> *"5 turnos sem conseguir treinar um único espião. É a mesma situação do military rush — a estratégia de espionagem também é inviável sem economia mínima primeiro." (Espa, T5)*

---

## Ganhos

**G-001 — Animação de transição de era** *(6/6 — reconfirmado Sprint 3)*
O momento de transição entre eras é unanimemente o melhor evento do jogo. Cria expectativa, marca mudança de estado, e é percebido positivamente por todos os perfis de jogador.
> *"A animação de transição de era foi satisfatória! Sentiu como um momento dramático. BEM FEITO." (Ariana, T8)*
> *"As animações de transição de era são espetaculares e criam o único momento de 'uau' que um novato consegue apreciar." (Felix, entrevista Q22)*

**G-009 — Loop de conquista → saque → reinvestimento** *(5/6 — NOVO em Sprint 3)*
O sistema de saque em combate PvP cria um loop de momentum genuinamente satisfatório. Cada vitória financia a próxima expansão. Melhor momento de design quando funciona.
> *"O SAQUE! Essa mecânica é o coração da estratégia militar. Quando funcionou, foi satisfatório demais." (Cleo, T13)*
> *"O saque de recursos é EXCELENTE — criar incentivo econômico para atacar. Bem desenhado." (Ariana, T14)*

**G-010 — Overlay visual de território revelado por espião** *(3/6 — NOVO em Sprint 3)*
O momento em que o espião retorna e os números reais do inimigo aparecem no mapa é o melhor UX moment do jogo para quem usa espionagem.
> *"O overlay visual de território revelado por espião é EXCEPCIONAL — melhor feature de UI do jogo." (Espa, entrevista Q2)*
> *"O overlay visual é o melhor momento de UX do jogo — ver os números reais do inimigo aparecerem no mapa é genuinamente emocionante e único." (Espa, entrevista Q23)*

**G-011 — Variedade perceptível de personalidades de IA** *(3/6 — NOVO em Sprint 3)*
Comportamentos distintos das IAs (Conqueror agride oportunisticamente, Merchant aceita paz, Defender reage defensivamente) são percebidos pelos jogadores e influenciam decisões.
> *"A variedade de personalidades das IAs é perceptível em comportamento, o que é ótimo." (Ariana, entrevista Q9)*
> *"O Clã do Leste (Conqueror) foi assustadoramente eficiente — capturou T2 de mim no turno 9 exatamente quando eu estava enviando tropas para T12." (Davi, entrevista Q9)*

**G-005 — Clareza visual do mapa por clã** *(4/6 — reconfirmado Sprint 3)*
Cores distintas por clã continuam sendo o elemento de interface mais universalmente bem avaliado. Funciona para todos os perfis.
> *"O mapa é legível — consigo ver claramente quem dono de quê pela cor." (Ariana, T1)*

---

## Alívios (Como aliviar cada dor)

| Dor | Alívio Proposto |
|-----|-----------------|
| D-028 — Botões habilitados sem recursos | Desabilitar botões de construção/treino (não só cor diferente, mas cursor not-allowed + tooltip "Recursos insuficientes: faltam X ouro") quando custo > estoque atual |
| D-029 — Sem preview de produção | Adicionar linha "+X recurso/turno" no card de estrutura no menu de construção. Ex: "Farm — +10 grão/turno" |
| D-030 — Cartas invisíveis no combate | Mudar abordagem: exibir banner "Você tem cartas disponíveis!" com atalho na tela de ExpeditionModal. Destacar seção de cartas com borda colorida quando há cartas relevantes |
| D-031 — Ouro gargalo não comunicado | Adicionar dica contextual no T2–3: "Mine gera ouro — necessário para construção e treinamento". Destacar Mine visualmente quando estoque de ouro < 20 |
| D-032 — Fim abrupto | Tela de resultados animada: ranking dos 6 clãs, score breakdown, "momento mais épico" (maior vitória em combate), replay intent |
| D-033 — Horda opaca | Tooltip de "Era da Invasão" no início da era: "A Horda ataca o clã com mais territórios a cada 3 turnos. Força cresce: 50 → 100 → 150 → 200 → 300." |
| D-034 — Sem overview de tropas | Mini-badge numérico no centro de cada território no mapa (ex: "12⚔" em verde, "2⚔" em vermelho) sempre visível |
| D-035 — Diplomacia decorativa | Implementar efeito concreto de aliança: aliados não atacam mesmo clã simultaneamente. Ou: aliado compartilha 20% dos ganhos de saque quando você ataca |
| D-036 — Revelação expira rápido | Dobrar duração para 10 turnos + adicionar countdown visível no território revelado ("👁 7 turnos") |
| D-037 — Sem preview de tempo de expedição | Mostrar "⏱ 2 turnos" ao lado do destino antes de confirmar. Calcular via distância Manhattan automaticamente |
| D-038 — Grão inútil no late game | Adicionar "Festim": gastar 50 grão para treinar 1 soldado sem custo de ouro (só na Era da Invasão) |
| D-039 — Reforço não comunicado | Renomear ação para "Mover Tropas" no menu de território próprio, ou adicionar botão "Reforçar" visível sempre |
| D-040 — Sem tutorial | Tutorial guiado de 5 turnos: dica contextual após cada ação ("Boa escolha! Agora construa uma Mine para gerar ouro") |
| D-041 — Dead game em rush | Garantir que sempre há 1 ação de custo zero disponível: "Explorar" território neutro adjacente, ou "Treinar 1 soldado" sem custo de ouro nas primeiras 3 ações |

---

## Criadores de Ganho (Como ampliar o que já funciona)

| Gain | Amplificação |
|------|--------------|
| G-001 — Transição de era | Adicionar recap dos melhores momentos da era que terminou antes da transição: "Era da Paz: você construiu X estruturas, acumulou Y recursos." |
| G-009 — Loop saque | Destacar visualmente o saque após vitória: animação de moedas + recursos subindo para o painel. Tornar o "pagamento da conquista" mais celebrado |
| G-010 — Overlay espião | Adicionar contagem de espiões revelados no perfil do clã. "ESPA revelou 3 territórios inimigos" na tela final |
| G-011 — IA variada | Exibir "personalidade" do clã no mapa ao hover: "Clã do Leste — Conquistador. Alta agressividade." Isso tornaria as IAs mais táticas e menos surpresas |
| G-005 — Clareza de mapa | Adicionar legenda compacta de cores no canto do mapa (sempre visível). Especialmente útil nas primeiras partidas |

---

## Priorização por Impacto

| # | Discovery | Frequência | Score | Produto | Tipo |
|---|-----------|:-----------:|:-----:|:-------:|------|
| 1 | D-028 — Botões habilitados sem recursos | 6/6 | **10** | 60 | CRITICAL |
| 2 | D-029 — Sem preview de produção | 6/6 | **9** | 54 | CRITICAL |
| 3 | D-030 — Cartas invisíveis no combate | 6/6 | **8** | 48 | HIGH |
| 4 | D-037 — Sem preview de tempo de expedição | 5/6 | **8** | 40 | HIGH |
| 5 | D-032 — Fim abrupto sem cerimônia | 5/6 | **8** | 40 | HIGH |
| 6 | D-031 — Ouro gargalo não comunicado | 5/6 | **7** | 35 | HIGH |
| 7 | D-033 — Horda opaca | 4/6 | **8** | 32 | HIGH |
| 8 | D-034 — Sem overview de tropas | 4/6 | **8** | 32 | HIGH |
| 9 | D-038 — Grão inútil late game | 4/6 | **7** | 28 | MEDIUM |
| 10 | D-035 — Diplomacia decorativa | 4/6 | **6** | 24 | MEDIUM |
| 11 | D-040 — Sem tutorial | 3/6 | **9** | 27 | HIGH (novato) |
| 12 | D-041 — Dead game por rush especializado | 3/6 | **8** | 24 | HIGH |
| 13 | D-036 — Revelação espião curta | 3/6 | **7** | 21 | MEDIUM |
| 14 | D-039 — Reforço não comunicado | 3/6 | **6** | 18 | MEDIUM |

---

## Decisão GO/NO-GO

**GO** — confirmado.

- ✅ 14 pains identificados, todos com frequência ≥ 3/6
- ✅ 9 pains com impacto ALTO ou CRÍTICO
- ✅ Melhorias são implementáveis (UI/UX — não requerem refactor arquitetural)
- ✅ 6/6 agentes querem jogar de novo (exceto Felix que condiciona ao tutorial)
- ✅ Nota geral 6.0/10 — acima de 5.5 (S1) e 5.0 (S2) — trajetória positiva
