# Brainstorming — Sprint 4 Playtesting
**Data:** 2026-03-11 | **Wave:** 4 | **Agentes:** 6 | **NPS Médio:** 6,5/10

---

## Metodologia

Análise baseada em cruzamento de:
- **Logs turno a turno** (comportamento real, não filtrado)
- **Entrevistas pós-jogo** (autopercepção)
- **Ranking.md** (resultados objetivos e análise por estratégia)
- **Sprints anteriores** (comparação de evolução)

Divergências entre log e entrevista são os insights mais valiosos — indicam problemas que o jogador sofreu mas não conseguiu nomear.

---

## Insights Críticos de Divergência Log vs Entrevista

| Agente | Pain no Log | Na Entrevista | Insight Real |
|--------|-------------|---------------|--------------|
| **Cleo (Campeã)** | Frustração intensa com assimetria de informação sobre tropas inimigas — mencionada explicitamente em T9, T10, T14, T23. "Voando cego" em cada ataque importante. | 7/10 — satisfeita com a vitória, menciona tropas inimigas apenas como "uma das coisas que falta". | **A vitória mascarou a dor. Cleo ganhou apesar da falta de intel, não graças a ela. Para um jogador de RTS com experiência, jogar sem dados de unidades inimigas é fundamentalmente frustrante mesmo na vitória.** |
| **Beto (2º Lugar)** | 7 turnos completamente parados por deadlock de wood (T2-T8). "Turno morto de novo" × 4. A estratégia turtle foi um fracasso total até o T19. | Credita a "estratégia turtle" por ter chegado em 2º lugar. | **Beto sobreviveu porque a Horda focou em AI-1, não por mérito da estratégia. O log é mais honesto: a estratégia turtle conforme executada resultou em 7 turnos de inação que poderiam ter custado a partida.** |
| **Espa (3º Lugar)** | Frustração com diplomacia registrada 3 vezes no log (T7, T9, T17) — aliança sem mecânica, aliado sendo atacado sem poder ajudar, traição sem aviso. Ouro em 0-6 a maior parte da partida. | 7/10 — "estratégia funcionou narrativamente, falhou economicamente". Menciona diplomacia como problema, mas uma vez. | **O problema da aliança cosmética é 3× mais severo no log do que na entrevista. O feedback positivo geral mascarou a severidade da dor diplomática. A estratégia de espionagem é economicamente autodestrutiva de forma mais grave do que Espa admitiu.** |
| **Felix (Último)** | Quase abandono real em T12 (dois fracassos simultâneos, "quase fechei o jogo"). Descobriu cartas apenas no T18 — 17 turnos de cartas não usadas. T5-T6 completamente vazios (dead time). | 5/10 — menciona os problemas mas com tom resignado. "Quero tentar de novo." | **O design salvou Felix da deserção: GameResultsScreen motivou replay APESAR dos problemas de onboarding. Sem a tela de resultados, Felix teria abandonado e nunca voltado. O loop de aprendizado funciona ao final mas falha criticamente no meio.** |
| **Davi (4º)** | "Não sei quantas tropas o inimigo tem" — mencionado 5+ vezes, identificado como causa direta de duas perdas territoriais. | Cita visibilidade de tropas como #1 dor. | **Alinhamento completo — não há divergência. Pain D-042 confirmado por ambos os canais com alta frequência.** |
| **Ariana (2ª)** | Gold crítico durante toda a Era da Guerra (chegou a 2, 0, 7 em múltiplos turnos). "Mine deveria dar +8 em vez de +5." | Foca no grão acumulando sem uso como problema principal. | **Ariana enfatizou o grão na entrevista mas o gold foi o gargalo real no log. Ambos são válidos — o problema é desequilíbrio sistêmico de recursos, não apenas um recurso específico.** |

---

## Dores

### INTERFACE

#### [D-042] Sem visibilidade de tropas inimigas no mapa
**Frequência: 4/6 (Cleo, Davi, Espa, Beto)**
Jogadores conhecem a força de seus próprios territórios via defense badges mas estão completamente cegos quanto às forças inimigas. Cada decisão de ataque é feita por inferência ou "fé". Cleo ganhou o jogo mesmo com esta limitação. Davi perdeu dois territórios diretamente por não saber a força do adversário.

> *"Toda a minha estratégia foi construída sobre informação parcial. [...] Para um jogador de RTS, dados de unidades inimigas são básicos." — Cleo, Resumo*
> *"Cada decisão de ataque/defesa é baseada em inferência. Assimetria de informação permanente." — Davi, T12*

**Score: 9/10 — Alta frequência + impacto em resultado final + correlaciona com perda territorial documentada.**

---

#### [D-047] Defense badges aparecem apenas em territórios próprios, não inimigos
**Frequência: 4/6 (Cleo, Davi, Ariana, Espa)**
F-046/F-047 foi implementado mas com escopo parcial. Os badges mostram defesa dos territórios do jogador mas não dos inimigos. O valor tático da feature fica pela metade — quatro agentes tentaram clicar em territórios inimigos esperando ver o badge.

> *"Os badges de defesa no mapa mostram apenas nos meus territórios, não nos inimigos. Tenho que estimar a defesa deles." — Davi, T12*
> *"O comportamento esperado seria exibir badges em todos os territórios visíveis, com distinção visual próprios (verde) vs inimigos (vermelho)." — Ranking.md*

**Score: 8/10 — Feature existe mas implementação parcial cria sensação de informação incompleta.**

---

#### [D-043] Alerta de ataque iminente ausente
**Frequência: 3/6 (Felix, Ariana implícito, Espa implícito)**
Quando um clã inimigo lança expedição em direção a um território do jogador, não há indicador no mapa ou HUD de "tropas inimigas se movendo na direção X". O jogador descobre o ataque quando ele já foi resolvido. Para novatos, isso é percebido como injustiça sistêmica.

> *"No turno anterior tudo parecia normal, e de repente estava sendo atacado. Não houve nenhum sinal de aviso." — Felix, last-place.md*
> *"Sem aviso de ataque iminente — agente não sabe quando espião retorna vs quando ataque chega." — correlacionado com D-036*

**Score: 8/10 — Impacto direto em novatos que percebem o jogo como injusto antes de entender mecânicas.**

---

#### [D-045] Era da Guerra sem explicação mecânica na transição animada
**Frequência: 2/6 (Felix, Beto)**
A animação de transição de era é unanimemente elogiada visualmente mas não comunica o que muda mecanicamente. Felix jogou 1-2 turnos da Era da Guerra como se ainda fosse Era da Paz. Beto não entendeu que a Era da Guerra aumenta agressividade da AI.

> *"A animação é linda mas não explica nada. O que muda na Era da Guerra? Podem me atacar agora? A frequência de ataques AI aumenta?" — Felix, T9*
> *"A transição é visualmente incrível... mas mecanicamente não sabia o que havia mudado. Continuei jogando como se fosse Era da Paz por 2-3 turnos." — Felix, entrevista Q6*

**Score: 7/10 — Afeta principalmente novatos, mas a animação cria expectativa de contexto que não é fornecido.**

---

#### [D-048] Breakdown de pontuação ausente na GameResultsScreen
**Frequência: 4/6 (Ariana, Cleo, Davi, Beto)**
A tela de resultados tem animação excelente mas não mostra como a pontuação foi calculada linha por linha. Agentes fizeram cálculos mentais ou ficaram sem entender por que sua pontuação era aquela. O potencial pedagógico da tela não é aproveitado.

> *"O cálculo de pontuação na tela não mostrou o breakdown claro de como chegou em 1980." — Ariana, T25*
> *"Gostaria de ter breakdown da pontuação por categoria mais detalhado — quantas batalhas venci, territórios conquistados/perdidos." — Davi, Resumo*
> *"Um breakdown pós-jogo mostrando 'se você tivesse construído Farm no T1, teria X pontos a mais'" — Beto, T25*

**Score: 6/10 — Não impede satisfação (6/6 elogiaram a tela) mas perde oportunidade de ensinar.**

---

#### [D-052] Tooltip de recurso insuficiente sem especificidade
**Frequência: 2/6 (Espa, Beto)**
Quando um botão está desabilitado por recurso insuficiente, o tooltip mostra mensagem genérica. Espa ficou bloqueada por 1 ouro diversas vezes sem saber exatamente o quanto faltava.

> *"'Falta 1 ouro' seria mais útil que mensagem genérica no botão cinza." — Espa, T23*
> *"Sempre que quero construir, estou 1-5 unidades abaixo sem saber o valor exato." — Beto, padrão em múltiplos turnos*

**Score: 5/10 — Melhoria incremental de UX; não bloqueia jogo mas cria fricção desnecessária.**

---

### MECÂNICAS

#### [D-035] Diplomacia sem efeito concreto observável *(persistente desde S1)*
**Frequência: 4/6 (Ariana, Espa, Davi, Beto)**
Terceiro sprint consecutivo com diplomacia em 3/10. Alianças formadas não permitem enviar tropas, não fornecem recursos, não impedem ataques, não têm indicadores de tensão/saúde da relação. Espa tentou ajudar aliado sendo atacado e descobriu que não havia mecânica para isso. O aliado de Espa traiu sem qualquer sinal de alerta no T17.

> *"Aliado sendo atacado e eu não posso fazer nada. A aliança existe, está verde na UI, e é completamente passiva." — Espa, T9*
> *"Aliança terminou sem qualquer aviso prévio. A traição é boa narrativa em CK, mas mecanicamente é desorientador." — Espa, T17*
> *"A diplomacia existe como estado mas não como mecânica de ação." — Espa, entrevista Q10*

**Score: 7/10 — 3 sprints consecutivos sem melhoria. Recomendado: implementar ou remover.**

---

#### [D-038] Grão acumula sem uso no late game *(persistente S3)*
**Frequência: 4/6 (Ariana, Espa, Beto, Felix)**
Na Era da Invasão e late game da Era da Guerra, o grão acumula em centenas enquanto ouro permanece o gargalo. Sem convertibilidade, mercado, comércio ou consumo adicional de grão, o recurso principal torna-se inerte quando mais deveria importar.

> *"Por volta do turno 38, tinha 350+ de grão e não havia nada para fazer com ele. Senti que tinha 'vencido' a fase econômica mas o jogo não reconheceu isso." — Ariana, entrevista Q12*
> *"A estratégia de espionagem é cara — sempre sem ouro — enquanto grão apodreceu sem uso." — Espa, padrão*

**Score: 7/10 — Afeta satisfação do late game de todos os perfis econômicos.**

---

#### [D-044] Horda não indica território específico de ataque dentro do clã-alvo
**Frequência: 4/6 (Cleo, Davi, Ariana, Espa)**
O modal da Horda comunica quem será atacado (clã com mais territórios) mas não qual território específico dentro do clã. Jogadores distribuíram tropas defensivamente sem saber onde concentrá-las.

> *"A mecânica diz 'ataca o clã dominante' mas não especifica o território alvo. Essa incerteza é ansiogena." — Ariana, T21*
> *"O modal diz QUEM mas não ONDE dentro dos territórios do alvo." — Cleo, Resumo*
> *"Distribuí tropas mas talvez tenha colocado no território errado." — Espa, T21*

**Score: 7/10 — Frustração gerenciável mas reduz a qualidade da decisão defensiva.**

---

#### [D-046] Comportamento da Horda em empate de territórios não documentado
**Frequência: 2/6 (Davi, Felix)**
O modal da Horda diz "ataca o clã com mais territórios" mas não especifica o comportamento quando há empate. Davi conquistou o 6º território no T24 empatando com Cleo e foi atacado no T25 — consequência que não poderia ter previsto com as informações disponíveis.

> *"'Ataca o clã com mais territórios' não especifica o que acontece em empate. Custo real: perdi 1 território no último turno por essa lacuna." — Davi, T25*

**Score: 6/10 — Edge case que afeta jogadores que expandem agressivamente no final.**

---

#### [D-049] Dead time de viagem — sem ação útil durante expedição em trânsito
**Frequência: 3/6 (Felix T5-T6, Cleo T3-T4, Espa implícito)**
Quando todas as tropas estão em expedição e sem recursos para construir, o jogador passa 1-3 turnos completamente sem ação. Para novatos, isso cria sensação de "perda de controle". Para experientes, é o custo calculado do rush — mas ainda cria turnos mortos objetivamente.

> *"Este turno foi completamente vazio para mim. Sem tropas disponíveis, sem urgência de construção óbvia, sem nada. O jogo não me deu uma ação clara para fazer enquanto esperava." — Felix, T5*
> *"Turno completamente morto. Sem produção de ouro, sem produção de madeira, sem grão suficiente para treinar." — Cleo, T3*

**Score: 7/10 — Estrutural em jogos de expedição; afeta principalmente novatos que fazem rush cedo.**

---

#### [D-036] Spy countdown sem alerta de expiração *(persistente S3)*
**Frequência: 3/6 (Espa, Davi, Felix)**
A revelação de espião expira silenciosamente após 5 turnos. O badge desaparece sem aviso de "expira em 1 turno". Intel obtida com custo alto se perde sem que o jogador possa reagir.

> *"A expiração da intel do espião anterior aconteceu sem qualquer alerta. O badge simplesmente sumiu entre um turno e outro." — Espa, T11*

**Score: 7/10 — Destrói o valor percebido da espionagem quando a intel expira antes de ser agida.**

---

#### [D-041] Deadlock econômico com ordem de build errada *(persistente S3)*
**Frequência: 2/6 (Beto, Felix)**
Jogadores que constroem Wall ou Barracks antes de estruturas produtivas ficam sem wood/gold para construir qualquer coisa depois. O sistema não previne nem alerta sobre ordens de construção problemáticas. O TipBanner ajudou (Beto saiu do deadlock no T8 via bônus de território neutro; Felix recebeu dica de Sawmill 3 vezes), mas o deadlock ainda é possível.

> *"Se houvesse 'Aviso: Você não tem estruturas de produção ativas. Wall não gera recursos.' Uma mensagem no T1 teria mudado o jogo." — Beto, avaliação geral*

**Score: 8/10 — Severidade alta para novatos; o jogo não tem piso de proteção para decisões que causam deadlock.**

---

#### [D-050] UX de realocação de tropas — muitos cliques para ação frequente
**Frequência: 2/6 (Ariana, Davi)**
Mover tropas entre territórios próprios exige navegação por modais múltiplos. Em uma era de gestão ativa (Era da Invasão), isso é feito múltiplas vezes por turno.

> *"A realocação de tropas entre territórios não é totalmente intuitiva. Parece que poderia ser mais direto — talvez drag-and-drop no mapa." — Ariana, T14*

**Score: 6/10 — UX friction que afeta principalmente jogadores avançados com múltiplos territórios.**

---

#### [D-051] Bônus de facção Umbral invisível na UI
**Frequência: 2/6 (Espa, Davi)**
O bônus Umbral (+30% eficiência de espiões) não tem representação visual permanente na UI. Espa jogou toda a partida como Umbral sem poder confirmar se o bônus estava sendo aplicado. O bônus dos Ferronatos (+20% combate) e Verdâneos (+20% produção) apareciam nos labels antes de construir, mas o Umbral não tem equivalente visível.

> *"Não vi em nenhum lugar o +30% eficiência de espiões. Pode existir mecanicamente mas é invisível ao jogador." — Espa, T1 e Resumo*
> *"O bônus de facção Umbral é funcional mas invisível na UI — ESPA reportou não saber se o bônus estava ativo." — Ranking.md*

**Score: 7/10 — Mina o valor percebido de escolher Umbral; facção perde diferenciação estratégica.**

---

### DIVERSÃO / AGÊNCIA

#### [D-030] Cartas ainda descobertas tardiamente *(parcialmente resolvido S4)*
**Frequência: 2/6 (Felix T18, Beto implícito)**
O banner de sugestão de carta no ExpeditionModal (F-037) resolveu o problema para jogadores experientes (Cleo T8, Davi T13, Ariana T9, Espa T10). Mas Felix descobriu as cartas apenas no T18 — 17 turnos sem usar uma mecânica central. O banner contextual funciona para quem já usa o ExpeditionModal estrategicamente; não funciona para quem ainda está aprendendo a atacar.

> *"Turno 18 e só agora descobri as cartas. Por que não sabia disso desde o começo?" — Felix, T18*
> *"As cartas deveriam ser introduzidas com suporte contextual muito mais cedo — turno 5 ou 6, não turno 18." — Felix, entrevista Q8*

**Score: 7/10 — Resolvido para jogadores intermediários/experientes; persiste para novatos.**

---

## Ganhos

### O que gerou satisfação genuína (não mexer)

#### [G-012] GameResultsScreen com ranking animado — cerimônia de encerramento
**Frequência: 6/6 — UNANIMIDADE**
O maior gain do projeto até o momento. Saltou de 2/10 → 8/10 em "Feedback de Fim de Jogo". A animação de revelação sequencial do ranking criou suspense genuíno mesmo para quem sabia seu resultado. Nenhum agente pulou a animação. Felix (último lugar) saiu querendo jogar de novo imediatamente.

> *"Finalmente uma tela de vitória decente! Era exatamente o que faltava." — Cleo*
> *"A GameResultsScreen transformou uma derrota em uma história de 'quase chegou lá'." — Beto*
> *"Eu vim em último. Mas quero tentar de novo. A tela de ranking é motivante mesmo para quem ficou em último." — Felix*

**Score: 10/10 — Não alterar. Principal fator de motivação para replay.**

---

#### [G-015] Labels de produção visíveis antes de construir
**Frequência: 6/6 — UNANIMIDADE**
Resolve D-029 completamente. Eliminou toda ambiguidade sobre o que cada estrutura produz. Davi usou para planejar economia no T1. Ariana não precisou de tutorial. Cleo leu sem tooltip separado. Felix decidiu o que construir por eliminação graças a eles.

> *"Os rótulos de produção são o melhor professor do jogo." — Beto*
> *"Em zero segundos eu já sabia o que cada coisa fazia. Isso é design limpo." — Cleo*

**Score: 9/10 — Mantenha. Feature pilar que sustenta toda a tomada de decisão econômica.**

---

#### [G-016] Botões desabilitados com recurso insuficiente
**Frequência: 5/6**
Resolve D-028. Elimina cliques frustrantes em ações inviáveis. Felix foi guiado passivamente pelo que estava habilitado. Agentes experientes puderam planejar sem calcular na cabeça.

> *"Os botões desabilitados são o tipo de QoL que faz diferença real." — Ariana, T2*
> *"O jogo me impediu de cometer o erro sem me punir." — Felix, T1*

**Score: 9/10 — Mantenha. Feature de qualidade de vida de alto impacto.**

---

#### [G-013] Modal informativo da Horda com escala de força e timing
**Frequência: 5/6**
Resolve D-033. O modal comunica quem é alvo, frequência de ataque e progressão de força (50→100→150→200→300) exatamente no início da Era da Invasão. Transformou um evento de surpresa em evento de estratégia.

> *"O modal da Horda é excelente. Deu todas as informações que eu precisava de uma vez, de forma clara." — Cleo*
> *"O modal me fez entender que não sou o alvo — mudou completamente minha estratégia." — Beto*

**Score: 9/10 — Mantenha. Onboarding cirúrgico para a mecânica mais complexa do jogo.**

---

#### [G-014] Countdown da Horda no HUD
**Frequência: 5/6**
O contador visível no HUD criou tensão estratégica contínua durante toda a Era da Invasão — inclusive para jogadores que não eram o alvo da Horda. Davi usou o countdown para planejar oportunismo. Beto gerenciou defesa preventiva.

> *"O countdown no HUD é ainda melhor que o modal — não preciso lembrar, a interface lembra por mim." — Espa*
> *"Esse badge de contagem regressiva no HUD é visceralmente eficaz." — Cleo*

**Score: 9/10 — Mantenha. Tensão cronometrada bem executada sem ser intrusiva.**

---

#### [G-017] TipBanner contextual no momento relevante
**Frequência: 4/6**
Parcialmente resolve D-040. O TipBanner apareceu em momentos pertinentes para todos os agentes. Para Felix, foi o único motivo de sobrevivência econômica early game. Para Cleo, foi cirúrgico no T6 sobre Sawmill. Para Ariana, apareceu antes de ela tomar uma decisão errada.

> *"O TipBanner apareceu antes de eu clicar em qualquer coisa, como se tivesse lido minha intenção." — Ariana, T4*
> *"O TipBanner foi cirúrgico. Apontou exatamente o problema certo no momento certo." — Cleo, T6*

**Score: 8/10 — Feature sólida. Pode ser amplificada com triggers de cartas no early game.**

---

#### [G-018] Defense badges nos territórios próprios
**Frequência: 4/6**
Parcialmente resolve D-034. Os badges de distribuição de tropas por território permitiram gestão visual de defesa. Cleo detectou vulnerabilidade no T16. Davi identificou território exposto no T6. Beto obteve confirmação visual das Walls construídas.

> *"Os badges de defesa me permitiram ver imediatamente ONDE estava vulnerável e agir antes de ser tarde." — Cleo, T16*

**Score: 7/10 — Feature funcional mas com escopo incompleto (ver D-047).**

---

#### [G-019] Banner de sugestão de carta no ExpeditionModal
**Frequência: 3/6 (Cleo, Davi, Espa — todos com uso estratégico)**
Parcialmente resolve D-030. Cleo usou REFORÇOS no T8 e MUROS IMPROVISADOS no T17. Davi usou TRÉGUA FORÇADA preventivamente no T13 — o uso mais sofisticado de carta da sessão. Espa usou INFORMANT para revelar tropas antes de atacar.

> *"O banner de sugestão de carta é EXATAMENTE o que eu precisava — aparecer no momento certo, no lugar certo." — Cleo, T8*
> *"O banner preventivo funcionou perfeitamente — transformou situação reativa em proativa." — Davi, T13*

**Score: 8/10 — Alta qualidade. Expandir escopo para novatos (trigger mais cedo).**

---

#### [G-009] Loop conquista → saque → reinvestimento *(persistente S3)*
**Frequência: 5/6**
Confirmado novamente como o coração da mecânica de expansão. Todas as estratégias vencedoras (Cleo, Ariana, Espa) dependeram deste ciclo. O saque de territórios conquistados financia a próxima expansão de forma satisfatória.

**Score: 9/10 — Core loop funcionando. Não alterar.**

---

#### [G-001] Transição de era animada *(persistente S1)*
**Frequência: 6/6 — UNANIMIDADE por 4 sprints consecutivos**
A melhor feature de narrativa do jogo. Unanimidade mantida em todos os sprints.

**Score: 10/10 — Não alterar. Marco narrativo que eleva toda a sessão.**

---

## Alívios (como o produto pode aliviar cada dor)

| Pain | Alívio Proposto |
|------|----------------|
| D-042 (Sem tropas inimigas) | Exibir defense badges também em territórios inimigos com diferenciação visual (cor/ícone adversário). Escopo restrito: número de soldados visível, não detalhamento completo. |
| D-047 (Badges só nos próprios) | Completar a implementação de F-046: badges em todos os territórios visíveis, verde = próprios, vermelho = inimigos. |
| D-043 (Sem alerta de ataque) | Adicionar ícone de "expedição inimiga detectada" no mapa 1 turno antes da batalha. Não precisa revelar força — apenas indicar movimento. |
| D-035 (Diplomacia cosmética) | Implementar 1 efeito concreto por tipo de relação: Aliado = não ataca automaticamente por 3 turnos. Ou remover sistema até que possa ser implementado adequadamente. |
| D-038 (Grão acumulado) | Adicionar sumidouro de grão: mercado de conversão (X grão → Y ouro), manutenção de unidades no late game, ou construção de nível 2 de Farm que consome grão. |
| D-044 (Horda sem território) | Adicionar indicador visual no turno T-1 antes do ataque da Horda: pulsar no território mais fraco do clã-alvo. |
| D-030 (Cartas tardias) | Adicionar trigger de TipBanner de carta no T3-T5 independente de contexto de batalha. Mensagem: "Você tem X cartas na mão — veja quando usá-las." |
| D-041 (Deadlock build) | Adicionar aviso contextual quando jogador tenta construir estrutura não-produtiva sem ter Farm/Mine ativos: "Sem estruturas de produção, seus recursos não vão crescer." |
| D-048 (Sem breakdown pontuação) | Adicionar tab/seção "Como fui pontuado" na GameResultsScreen com linha-a-linha: Territórios × 100, Pop × 10, Gold, Unidades, Total. |
| D-045 (Era sem explicação) | Adicionar 2-3 linhas de texto na tela de transição de era explicando o que muda: "A Era da Guerra começa — clãs podem atacar livremente. Proteja seus territórios." |
| D-051 (Umbral invisível) | Adicionar badge de bônus de facção permanente no painel de clã: "Umbral: +30% espionagem ativo". Similar ao que Ferronatos e Verdâneos já mostram nos labels de construção. |

---

## Criadores de Ganho (como amplificar o que já funciona)

| Gain | Amplificação Proposta |
|------|----------------------|
| G-012 (GameResultsScreen) | Adicionar breakdown de pontuação por categoria + estatísticas de sessão (batalhas vencidas/perdidas, territórios conquistados). |
| G-013 (Modal Horda) | Adicionar informação de "território mais vulnerável do clã-alvo" no modal — small improvement, large payoff para planejamento. |
| G-017 (TipBanner) | Expandir triggers: (1) quando jogador tem cartas não usadas por 3+ turnos, (2) quando território aliado está sendo atacado, (3) quando grão excede 300 sem uso. |
| G-019 (Banner carta) | Expandir para trigger no early game (T3-T5) independente de batalha: introdução proativa ao sistema de cartas. |
| G-018 (Defense badges) | Completar escopo para territórios inimigos (D-047) — converte feature bom em excelente. |
| G-009 (Loop conquista-saque) | Adicionar animação de saque mais elaborada — o momento de "ganho" merece mais feedback visual além da notificação. |

---

## Priorização

### Ranking por Impacto (Score 1-10 com justificativa)

| # | ID | Tipo | Descrição | Freq | Score | Justificativa |
|---|----|----|-----------|:----:|:-----:|---------------|
| 1 | D-042 | pain | Sem visibilidade de tropas inimigas | 4/6 | **9** | Afeta todas as decisões de ataque e defesa. Única feature que jogadores experientes (Cleo, Davi) identificaram como #1 limitação estratégica. Implementável como extensão de badges existentes. |
| 2 | D-035 | pain | Diplomacia sem efeito concreto | 4/6 | **8** | 3 sprints consecutivos em 3/10. Cada sprint acumula frustração. Resolve ou remove — não há terceira opção viável. |
| 3 | D-047 | pain | Defense badges só nos próprios | 4/6 | **8** | Feature incompleta que existe a 1 sprint. Custo de completar é baixo; impacto é alto (resolve D-047 + amplifica G-018). |
| 4 | D-041 | pain | Deadlock com ordem de build errada | 2/6 | **8** | Persiste há 2 sprints. Afeta novatos e estratégias defensivas. Solução: aviso contextual simples quando sem estruturas produtivas. |
| 5 | D-043 | pain | Alerta de ataque iminente ausente | 3/6 | **8** | Percepção de injustiça em novatos. Felix quase abandonou por isso. Um ícone de movimento no mapa resolve. |
| 6 | D-038 | pain | Grão acumula sem uso | 4/6 | **7** | Persiste há 2 sprints. Afeta satisfação do late game de todos os perfis. Requer design de nova mecânica — maior esforço. |
| 7 | D-044 | pain | Horda sem território específico | 4/6 | **7** | Reduz qualidade da decisão defensiva. Indicador no mapa é solução simples. |
| 8 | D-051 | pain | Umbral sem badge de bônus | 2/6 | **7** | Mina valor percebido de escolher Umbral. Solução trivial: badge no painel de clã. |
| 9 | D-030 | pain | Cartas descobertas tarde | 2/6 | **7** | Resolvido para experientes; persiste para novatos. TipBanner de cartas no early game. |
| 10 | G-012 | gain | GameResultsScreen — amplificar | 6/6 | **7** | Feature perfeita com 1 melhoria óbvia: breakdown de pontuação. Baixo esforço, alto payoff pedagógico. |

---

## Resumo Executivo — Sprint 4

**O que melhorou radicalmente:**
- Feedback de Fim de Jogo: 2/10 → 8/10 (maior salto do projeto)
- Interface pré-decisão (labels, botões, badges, travel time): eliminaram frustração de cliques perdidos
- Modal da Horda + Countdown: Era da Invasão agora tem onboarding e tensão gerenciável
- TipBanner: ajudou novatos e intermediários no momento certo

**O que persiste (topo do backlog):**
1. Visibilidade de tropas inimigas — limitação estratégica para todos os perfis
2. Diplomacia cosmética — 3 sprints de 3/10 é sinal de design incompleto
3. Grão sem uso no late game — balanceamento que afeta satisfação do encerramento
4. Onboarding de cartas para novatos — Felix T18 é o sinal

**Nota média:** 6,5/10 (+0,5 vs Sprint 3)
**Decisão sugerida:** GO — há 5+ melhorias de impacto alto confirmadas por ≥ 2 agentes, implementáveis sem refactor major.
