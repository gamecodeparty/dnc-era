# Log de Jogo — ARIA (Agent-A)
**Facção:** Verdâneos | **Estratégia:** Econômica Agressiva
**Sprint:** 6 | **Modo:** Rápido (Era1=8t, Era2=10t, Era3=7t)

---

## ERA 1 — Paz das Cinzas (Turnos 1–8)

---

**Turno 1 — Era Paz**
- O que vejo: Tela principal com 2 territórios meus (posições 0 e 3 no grid 4x3). ResourcePanel mostra: Grão=100, Madeira=50, Ouro=50. **NOVO: Vejo ícones de produção/turno ao lado de cada recurso — mostram 0/t para tudo.** Isso é novo e muito bom! Sei exatamente que não estou gerando nada ainda. Mapa mostra conexões entre territórios com linhas — consigo visualizar quais são adjacentes sem ter que adivinhar.
- O que quero fazer: Construir Fazenda no T-0 para começar produção de grão imediatamente.
- O que consegui fazer: Construi Fazenda Nv1 no território 0 (custo: 10 madeira, 5 ouro). Madeira=40, Ouro=45. Após confirmação, a produção/turno no ResourcePanel atualizou para: Grão +12/t (já mostrando o bônus Verdâneos!). Isso me agrada imensamente.
- Frustrações: Nenhuma. Fluxo limpo. O tooltip de produção por território (ícone de info no card do território) mostra breakdown: "Fazenda Nv1: 10 grão + 20% Verdâneos = 12 grão/turno". Excelente.
- Surpresas positivas: O display de produção por turno (+12/t visível no painel de recursos) é exatamente o que sempre quis. Sei em tempo real o que estou ganhando.
- Avaliação: Primeiro turno excelente — UI deu informação que antes requeria cálculo mental.

---

**Turno 2 — Era Paz**
- O que vejo: Recursos: Grão=112, Madeira=40, Ouro=45. Produção: +12/t grão. AI1 (Ferronatos) construiu algo no turno anterior (log diz "AI1 construiu estrutura").
- O que quero fazer: Construir Serraria para gerar madeira passiva.
- O que consegui fazer: Construi Serraria Nv1 no território 0 (custo: 5 madeira, 10 ouro). Madeira=35, Ouro=35. Produção atualizada: +12/t grão, +8/t madeira.
- Frustrações: Quero construir a Mina mas preciso de 15 madeira + 5 ouro — tenho os recursos. Mas território 0 já tem 2 estruturas de 4 slots. Vou precisar usar o território 3 para a Mina.
- Surpresas positivas: Painel de recursos com +12/t e +8/t lado a lado é muito satisfatório de ver. Visualizo exatamente onde estarei em 3 turnos.
- Avaliação: Economia em construção — produção visível torna planejamento muito mais preciso.

---

**Turno 3 — Era Paz**
- O que vejo: Recursos: Grão=124, Madeira=43, Ouro=35. As linhas de conexão no mapa mostram claramente que território 3 (meu) conecta a 0, 4, e 6. Território 4 é neutro. Território 6 é neutro também.
- O que quero fazer: Construir Mina no território 3 para resolver o gargalo de ouro.
- O que consegui fazer: Construi Mina Nv1 no território 3 (custo: 15 madeira, 5 ouro). Madeira=28, Ouro=30. Produção: +12/t grão, +8/t madeira, +5/t ouro.
- Frustrações: Vejo que AI2 (Umbral) parece estar acumulando espiões — log diz "AI2 treinou unidade". Não sei a força deles. O indicador de ameaça no território 4 (neutro adjacente) mostra "?" — fog of war ativo. Isso é novo! Antes o mapa era totalmente transparente.
- Surpresas positivas: O fog of war torna a informação de espionagem realmente valiosa. Vou querer espiões para remover o "?" nos territórios neutros.
- Avaliação: Boa progressão econômica; fog of war é uma mecânica que muda planejamento.

---

**Turno 4 — Era Paz**
- O que vejo: Recursos: Grão=136, Madeira=36, Ouro=35. Produção estável. Território 4 (neutro adjacente) mostra símbolo de ameaça pequeno — "ameaça baixa" — significa que provavelmente tem poucos ou nenhuma tropa.
- O que quero fazer: Explorar território 4 para ganhar recursos + preparar expansão.
- O que consegui fazer: Enviei expedição de exploração para território 4 (2 soldados disponíveis do início). O modal de expedição agora **destaca em azul** o range de alcance dos territórios — território 4 está dentro do range (adjacente) e território 6 está destacado como adjacente ao 3. Isso é muito intuitivo.
- Frustrações: Preciso de mais soldados antes de atacar. 2 soldados não são suficientes contra um território com defensor. Mas não construí Quartel ainda — foi prioridade econômica. Estou atrás em militar.
- Surpresas positivas: O highlight de alcance durante expedição é excelente UX. Vejo exatamente até onde posso chegar sem calcular mentalmente.
- Avaliação: Exploração lançada; realizo que preciso de Quartel cedo na próxima partida.

---

**Turno 5 — Era Paz**
- O que vejo: Recursos: Grão=148, Madeira=44, Ouro=40. Expedição de exploração retornou: território 4 rendeu 25 madeira, 15 ouro (sucesso!). Recursos atualizados: Madeira=69, Ouro=55.
- O que quero fazer: Construir Quartel agora que tenho recursos suficientes.
- O que consegui fazer: Construi Quartel Nv1 no território 0 (custo: 20 madeira, 15 ouro). Madeira=49, Ouro=40. Recrutar soldados disponível agora.
- Frustrações: Slot 3 do território 0 ocupado — só tenho 1 slot livre lá. Território 3 tem 2 slots livres. Devo construir Fazenda Nv2 lá ou guardar para Quartel secundário?
- Surpresas positivas: Nenhuma surpresa especial, mas a consistência da interface está muito melhor — todo botão mostra custo e produção esperada antes de construir.
- Avaliação: Quartel construído, pronto para fase militar.

---

**Turno 6 — Era Paz**
- O que vejo: Recursos: Grão=160, Madeira=57, Ouro=45. Posso recrutar até 16 soldados (grão) limitado por ouro — 9 soldados max (45÷5=9).
- O que quero fazer: Recrutar 6 soldados para ter força de ataque viável.
- O que consegui fazer: Recrutei 6 soldados no território 0 (custo: 60 grão, 30 ouro). Grão=100, Ouro=15. 6 soldados disponíveis.
- Frustrações: Ouro ficou muito baixo (15). Mina está produzindo apenas 5/t. Vou precisar de 2-3 turnos para acumular ouro suficiente para mais recrutamento. Isso é um gargalo.
- Surpresas positivas: Poder recrutar em lote (6 de uma vez) é muito melhor que 1 por vez.
- Avaliação: Exército formado mas ouro em situação precária — preciso monitorar.

---

**Turno 7 — Era Paz**
- O que vejo: Recursos: Grão=112, Madeira=65, Ouro=20. 6 soldados em território 0. Território 6 (neutro) está adjacente ao meu território 3 — símbolo de ameaça "baixa" = provavelmente desprotegido.
- O que quero fazer: Atacar território 6 (neutro) com 4 soldados para conquistar primeiro território adicional.
- O que consegui fazer: Ataquei território 6 com 4 soldados. O preview de combate mostrou:
  - **Ataque:** 4 soldados × 2 = 8. Sem bônus Ferronatos (sou Verdâneos). Total: 8.
  - **Defesa:** 0 (território neutro desprotegido).
  - **Resultado previsto:** "Vitória Decisiva (ataque > defesa × 1.5). Vitória garantida."
  - O hint "1.5×" aparece com tooltip explicando o threshold de conquista. **Excelente feature — agora sei exatamente por que vou ganhar.**
  - Conquistei território 6. Log mostra: "ARIA conquistou território 6".
- Frustrações: 2 soldados ficaram em território 0 como guarda. Ficaram lá automaticamente? Ou eu precisei especificar isso? Não ficou claro.
- Surpresas positivas: O preview de combate com texto explicativo ("Vitória Decisiva") é muito mais informativo que antes. Entendo o sistema agora.
- Avaliação: Primeiro território conquistado por mérito — expansão iniciada!

---

**Turno 8 — Era Paz (ÚLTIMO)**
- O que vejo: Recursos: Grão=124, Madeira=73, Ouro=25. 3 territórios (0, 3, 6). 2 soldados em T0, 4 soldados em T6 (ficaram após conquista).
- O que quero fazer: Construir Fazenda em território 6 para aumentar produção antes da Era da Guerra.
- O que consegui fazer: Construi Fazenda Nv1 em território 6 (custo: 10 madeira, 5 ouro). Madeira=63, Ouro=20. Produção agora: +24/t grão (3 fazendas × 8 + bônus), +8/t madeira, +5/t ouro.
- Frustrações: **Alerta: "Era da Guerra começa no próximo turno!"** apareceu. Mas não sei exatamente o que muda mecanicamente. Sei que ataques serão mais frequentes, mas quais as regras novas? O banner informa a transição mas não explica as mudanças.
- Surpresas positivas: Termino a Era da Paz com 3 territórios — meta atingida.
- Avaliação: Era da Paz encerrada em boa posição econômica; falta clareza sobre o que muda na Era da Guerra.

---

## ERA 2 — Era da Guerra (Turnos 9–18)

---

**Turno 9 — Era Guerra**
- O que vejo: **Banner de transição "ERA DA GUERRA" animado.** Bonito. Mas... o que muda? Não há texto explicativo na transição. Vejo que AI3 (Ferronatos) tem símbolo de ameaça vermelho no mapa — "Ameaça Alta" no território 5 adjacente ao meu T6!
- O que quero fazer: Defender território 6 que está ameaçado.
- O que consegui fazer: Movi 2 soldados adicionais de T0 para T6 via expedição de reforço. O sistema perguntou "deseja desproteger território 0?" com modal de confirmação — **respondi "sim" pois T0 tem 0 unidades agora.** O modal é útil mas não me disse que há risco real em T0.
- Frustrações: A ameaça de AI3 aparece como "Alta" mas não sei a força exata. O tooltip da escala de ameaça diz "estimativa: 4-8 unidades". Útil mas vago. Quero saber o número exato.
- Surpresas positivas: Símbolo de ameaça vermelho piscante em T5 foi aviso claro. Vi o perigo antes de ser pego de surpresa — isso é novo e excelente!
- Avaliação: A nova visualização de ameaça salvou T6 — cheguei a tempo de defender.

---

**Turno 10 — Era Guerra**
- O que vejo: Recursos: Grão=148, Madeira=71, Ouro=30. AI3 atacou meu território 6 — log mostra: "AI3 atacou ARIA em T6. Resultado: Repelido." Meus 6 soldados (4+2 reforço) venceram! Perdi 2 soldados no processo.
- O que quero fazer: Recrutar mais soldados e preparar contra-ataque.
- O que consegui fazer: Recrutei 4 soldados em T0 (custo: 40 grão, 20 ouro). Grão=108, Ouro=10. Ouro preocupante novamente.
- Frustrações: Ouro em 10. A Mina produz 5/t. Gargalo de ouro recorrente. Preciso de Mina Nv2 urgente mas não tenho recursos.
- Surpresas positivas: Defensa funcionou! A visualização antecipada de ameaça me permitiu reforçar a tempo. Sistema de alerta provou valor.
- Avaliação: Sobrevivi ao primeiro ataque da Era da Guerra — sistema de ameaça foi decisivo.

---

**Turno 11 — Era Guerra**
- O que vejo: Recursos: Grão=120, Madeira=79, Ouro=15. AI1 (Ferronatos) parece estar se expandindo — tem símbolo de ameaça "Média" em T1 adjacente ao meu T0.
- O que quero fazer: Construir Mina Nv2 em T3 para resolver gargalo de ouro.
- O que consegui fazer: Construi Mina Nv2 em T3 (custo: 25 madeira, 10 ouro). Madeira=54, Ouro=5. Produção: +8/t ouro agora.
- Frustrações: Ouro em 5 após construção. Corrida contra o tempo. AI1 pode atacar T0 e estou sem tropas de reserva lá.
- Surpresas positivas: Tooltip de produção do território mostrou exatamente como Mina Nv2 aumenta de 5/t para 8/t — tomei decisão informada.
- Avaliação: Investimento arriscado mas necessário — resolução do gargalo de ouro.

---

**Turno 12 — Era Guerra**
- O que vejo: Recursos: Grão=132, Madeira=62, Ouro=13. AI2 (Umbral) está em T4 — símbolo "?" com indicador de ameaça nebuloso. Não sei a força deles. Seria bom ter espião mas sou Verdâneos.
- O que quero fazer: Atacar AI3 que me atacou — estão enfraquecidos após o combate T10.
- O que consegui fazer: Atacei AI3 em T5 com 5 soldados. CombatPreview:
  - Ataque: 5×2=10. Verdâneos sem bônus militar = 10.
  - Defesa estimada (fog of war): "? unidades — estimativa baixa baseada em historico de combate".
  - **O sistema não mostra defesa exata (fog of war) — só estimativa.**
  - Resultado: Vitória. Conquistei T5. AI3 eliminado (ficou sem território).
- Frustrações: Não saber a defesa exata antes de atacar ainda é desconfortável. A estimativa "baixa" estava correta desta vez, mas e se estivesse errada?
- Surpresas positivas: Conquistar território de um rival eliminado foi satisfatório. 4 territórios agora!
- Avaliação: Expansão para 4 territórios — posição dominante na Era da Guerra.

---

**Turno 13 — Era Guerra**
- O que vejo: Recursos: Grão=156, Madeira=70, Ouro=21. 4 territórios (0, 3, 5, 6). AI1 e AI2 ainda ativos.
- O que quero fazer: Consolidar — construir estrutura em T5 recém conquistado.
- O que consegui fazer: Construi Fazenda Nv1 em T5 (custo: 10 madeira, 5 ouro). Produção: +36/t grão total agora.
- Frustrações: Estou com 4 territórios — símbolo "Ameaça Máxima" vai aparecer para os rivais quando olharem meu clã. Na Era da Invasão, a Horda ataca quem tem mais territórios. Isso é um problema.
- Surpresas positivas: Produção de grão em 36/t é sustentabilidade garantida.
- Avaliação: Forte economicamente, mas tamanho me torna alvo prioritário da Horda.

---

**Turno 14 — Era Guerra**
- O que vejo: Recursos: Grão=192, Madeira=78, Ouro=29. AI2 (Umbral) atacou T3 — "Ataque Chegando" alerta piscou com estimativa "6-10 unidades".
- O que quero fazer: Defender T3 imediatamente.
- O que consegui fazer: Movi 4 soldados de T0 para T3 via reforço. Modal de confirmação "deseja desproteger T0?" apareceu — aceitei pois T0 está mais atrás no grid.
- Frustrações: Movimentação de tropas entre 4 territórios começa a ser tediosa. Precisei fazer 2 cliques de reforço separados. Botão "distribuir igualmente" seria muito bem-vindo aqui.
- Surpresas positivas: O alerta "Ataque Chegando" com estimativa numérica salvou T3 pela segunda vez nesta partida.
- Avaliação: Defensas funcionando graças ao sistema de alerta — mas UX de redistribuição é trabalhosa.

---

**Turno 15 — Era Guerra**
- O que vejo: AI2 atacou T3 — foi repelido. Perdi 1 soldado. Log: "AI2 (Umbral) atacou ARIA em T3. Resultado: Repelido. AI2 perdeu 3 espiões." Interessante — AI2 usou espiões em combate.
- O que quero fazer: Recrutar mais soldados para cobrir perdas.
- O que consegui fazer: Recrutei 3 soldados (custo: 30 grão, 15 ouro). Grão=174, Ouro=19.
- Frustrações: Ouro ainda é o limitante. Mina Nv2 ajudou mas não resolve completamente.
- Surpresas positivas: Repeli AI2 que usa espiões em combate — interessante ver AI com estratégia distinta.
- Avaliação: Defensa sólida; economia sustentável; posição dominante mantida.

---

**Turno 16 — Era Guerra**
- O que vejo: Recursos: Grão=210, Madeira=86, Ouro=27. 4 territórios. **Alerta: "Era da Invasão em 2 turnos!"**
- O que quero fazer: Máxima preparação defensiva antes da Horda.
- O que consegui fazer: Construi Muralha Nv1 em T6 (custo: 25 madeira, 10 ouro — o custo corrigido!). Madeira=61, Ouro=17. Defesa +20% em T6.
- Frustrações: Nenhuma com o custo da Muralha — 25 madeira é totalmente razoável. Antes eram 50 e era impossível no early game. Esta fix foi boa.
- Surpresas positivas: Muralha acessível! Construção estratégica defensiva desbloqueada antes da Invasão.
- Avaliação: Preparação para a Horda em andamento — Muralha finalmente acessível.

---

**Turno 17 — Era Guerra**
- O que vejo: Recursos: Grão=246, Madeira=69, Ouro=25. Construi mais 1 Muralha Nv1 em T3. Custo: 25 madeira, 10 ouro. Madeira=44, Ouro=15.
- O que quero fazer: Recrutar Knights para maximizar ataque/defesa com bônus Ferronatos... espera, sou Verdâneos. Recrutar Archers então.
- O que consegui fazer: Recrutei 4 Archers (custo: 40 grão, 32 ouro). Não tenho 32 ouro — recrutei 2 Archers (custo: 20 grão, 16 ouro). Grão=226, Ouro=-1... ERROR. Não consegui recrutar 2 Archers por 1 ouro de falta!
- Frustrações: FRUSTRAÇÃO! Faltou 1 ouro para recrutar 2 Archers. Isso é exasperante. O botão deveria ter ficado cinza antes que eu tentasse!
- Surpresas positivas: Pelo menos a mensagem de erro foi clara: "Ouro insuficiente: precisa 16, tem 15."
- Avaliação: Gargalo de ouro me impediu de completar recrutamento — 1 ouro de falta é a pior das situações.

---

**Turno 18 — Era Guerra (ÚLTIMO)**
- O que vejo: Recursos: Grão=238, Madeira=52, Ouro=23. Recrutei 2 Archers.
- O que quero fazer: Distribuir tropas defensivamente antes da Invasão.
- O que consegui fazer: Realoquei tropas: T0(3 sold), T3(4 sold + 2 arch), T5(3 sold), T6(3 sold + 2 arch). 4 territórios defendidos.
- Frustrações: Redistribuir manualmente 4 grupos de tropas levou muito tempo e cliques. É minha maior reclamação de UX desta partida.
- Surpresas positivas: Termino Era da Guerra com 4 territórios, 2 muralhas, exército distribuído. Posição forte.
- Avaliação: Era da Guerra sobrevivida com sucesso — redistribuição de tropas é o maior pain de UX.

---

## ERA 3 — Invasão (Turnos 19–25)

---

**Turno 19 — Era Invasão**
- O que vejo: **Banner "ERA DA INVASÃO" com animação dramática.** Muito mais impactante que S5. Horda: primeira onda em T21 (fortaleza 50). Eu tenho 4 territórios — MAIOR CLÃ. Serei o alvo!
- O que quero fazer: Concentrar forças no território que a Horda vai atacar.
- O que consegui fazer: O problema: a Horda ataca "clã com mais territórios" mas NÃO indica QUAL dos meus territórios. Distribuição de forças é uma aposta.
- Frustrações: Sei que serei atacado mas não onde. D-044 persiste — "o modal diz QUEM mas não ONDE". Isso é um pain crítico ainda não resolvido.
- Surpresas positivas: A animação de transição para Era da Invasão é genuinamente dramática e cria senso de urgência.
- Avaliação: Urgência real — mas localização do ataque da Horda ainda é informação escondida.

---

**Turno 20 — Era Invasão**
- O que vejo: Recursos: Grão=274, Madeira=60, Ouro=31. AI1 também está estressado — símbolo de ameaça mudou para "Horda Aproximando" em todos os clãs.
- O que quero fazer: Concentrar tudo em T6 (fronteira sul — mais provável alvo da Horda por lógica de grid).
- O que consegui fazer: Movi mais tropas para T6 (agora: 6 soldados + 2 archers + Muralha Nv1). Custo em movimentação: 2 cliques de expedição de reforço.
- Frustrações: Apostei em T6 mas pode estar errado. Sem informação de localização da Horda, é jogo de azar.
- Surpresas positivas: Grão em 274 — economia Verdânea é robusta. Posso sustentar exércitos grandes.
- Avaliação: Preparação para a Horda baseada em suposição — falta informação crítica de localização.

---

**Turno 21 — Era Invasão**
- O que vejo: **HORDA ATACA!** Onda 1 (força 50). Alvo: meu território T0 (não T6 onde concentrei tropas!). Log: "Horda atacou ARIA em T0. Resultado: T0 perdido." Perdi T0.
- O que vejo: 3 territórios restantes (3, 5, 6). Tropas sobreviventes refugiaram em T3.
- O que quero fazer: Reorganizar defesa com 3 territórios.
- O que consegui fazer: Redistribuição emergencial. T3(5 sold + 2 arch), T5(2 sold), T6(4 sold + 2 arch + Muralha).
- Frustrações: **RAIVA.** Concentrei forças em T6, a Horda atacou T0. Sem informação de localização, qualquer estratégia defensiva é aleatória. D-044 é um pain crítico.
- Surpresas positivas: Ainda tenho 3 territórios. Não é eliminação.
- Avaliação: Apostei errado na defesa contra a Horda — pain crítico de localização do alvo.

---

**Turno 22 — Era Invasão**
- O que vejo: Recursos: Grão=286, Madeira=68, Ouro=39. AI2 (Umbral) ainda ativo com 1 território. AI1 (Ferronatos) com 3 territórios.
- O que quero fazer: Reconquistar T0 ou manter posição.
- O que consegui fazer: Reconquistei T0 (já sem defensor após Horda). De volta a 4 territórios!
- Frustrações: Nenhuma específica além da Horda.
- Surpresas positivas: T0 reconquistado rapidamente — Horda não deixou defesa.
- Avaliação: Recuperação rápida após ataque da Horda.

---

**Turno 23 — Era Invasão**
- O que vejo: Próxima onda da Horda em T24 (força 100). Minha força está distribuída por 4 territórios.
- O que quero fazer: Usar uma Carta se tiver. Verifico inventário — **tenho "Colheita Farta"!** Nunca usei carta em toda a partida.
- O que consegui fazer: Ativei "Colheita Farta" (dobra produção de grão por 3 turnos). Grão por turno: 72/t por 3 turnos! Isso gera enorme reserva.
- Frustrações: Tenho essa carta desde... quando? Não me lembro de ter recebido. Provavelmente estava no inventário por 10+ turnos sem eu notar. Descoberta tardia de uma boa ferramenta.
- Surpresas positivas: Carta funcionou perfeitamente — 72/t de grão é enorme para sustentar exército.
- Avaliação: Carta de grão usada em boa hora mas deveria ter percebido antes.

---

**Turno 24 — Era Invasão**
- O que vejo: Grão=358, Madeira=76, Ouro=47. Horda onda 2 (força 100) ataca T3 desta vez. Log: "ARIA em T3 defendeu com sucesso. Perdas: 3 soldados."
- O que vejo: Muralha em T3 (+20% defesa) foi crucial. Sobrevivi à onda 100!
- O que quero fazer: Recrutar urgentemente para cobrir perdas.
- O que consegui fazer: Recrutei 8 soldados (custo: 80 grão, 40 ouro). Grão=278, Ouro=7.
- Frustrações: Ouro em 7 após recrutamento. Sempre esse gargalo.
- Surpresas positivas: **Sobrevivi à Horda força 100 com Muralha Nv1.** A Muralha prova seu valor. Valeu cada madeira.
- Avaliação: Defesa bem-sucedida contra Horda onda 2 — Muralha é MVP.

---

**Turno 25 — Era Invasão (FINAL)**
- O que vejo: Recursos: Grão=350, Madeira=84, Ouro=15. 4 territórios. AI1 com 2 territórios. AI2 eliminado T24.
- O que quero fazer: Terminar o jogo com a maior pontuação possível.
- O que consegui fazer: Último turno — sem ação de grande impacto. **Tela de fim de jogo.**

---

## Resultado Final
- **Territórios:** 4
- **Pontuação estimada:** 400 (terr) + 1000 (pop) + 350 (ouro) + 12×5 (unidades) = ~1810
- **AI1 (Ferronatos):** 2 territórios → ~1200 pontos
- **ARIA:** VENCEDORA

---

## Impressões Gerais

A sessão foi significativamente melhor que o Sprint 5. As maiores melhorias:
1. **Display de produção/turno**: transforma planejamento de adivinhação em cálculo
2. **Sistema de ameaça visual**: salvei territórios múltiplas vezes graças a alertas antecipados
3. **Custo da Muralha 25 madeira**: construi 2 muralhas que foram decisivas na Invasão
4. **CombatPreview com threshold 1.5x**: entendi exatamente quando atacar com segurança

Pain principal persistente: D-044 (localização da Horda) e gargalo de ouro recorrente.
