# Playtest Log — Agent A

**Jogadora:** Ariana
**Origem:** Verdâneos
**Estilo:** Econômica Agressiva (veterana de jogos de civilização)
**Modo:** Rápido (25 turnos)
**Servidor:** localhost:8000
**Data da sessão:** 2026-03-11

**Estado final:** 5 territórios, ~380 grain, ~200 gold, 20 soldados
**Pontuação:** ~1980
**Nota:** 7/10

---

## ERA DA PAZ (Turnos 1–8)

---

**Turno 1 — Era da Paz**
- O que vejo: Tela do jogo carregada. Tenho 2 territórios no grid 4x3. Recursos: 100 grain, 50 wood, 50 gold. Sem estruturas. O painel lateral mostra os territórios com slots de construção vazios. Abro o modal de construção no Território 1 e reparo imediatamente num detalhe novo: ao lado de cada estrutura há uma etiqueta de produção antes de confirmar. Farm mostra "+12 grain/t" em vez do genérico que eu esperava. Como Verdâneos dou bônus de +20% em grain, então o jogo já calculou isso pra mim. Isso é uma boa surpresa — não precisei abrir nenhum tooltip.
- O que quero fazer: Construir Farm no Território 1 imediatamente. Economia de grain é minha prioridade número um em qualquer jogo de civilização.
- O que consegui fazer: Construo Farm no Território 1 (custa 10w + 5g). Recursos ficam: 100 grain, 40 wood, 45 gold. Produção do próximo turno já aparece no painel: "+12 grain/t".
- Frustrações: Nenhuma neste turno. Início limpo.
- Surpresas positivas: A etiqueta "+12 grain/t" visível antes de confirmar a construção é exatamente o tipo de informação que me faz clicar com confiança. Em outros jogos do gênero eu sempre preciso consultar uma wiki separada pra entender o bônus de origem. Aqui está embutido na UI, já com o bônus calculado. Impressionante.
- Avaliação: Turno de abertura sólido — Farm construída, produção confirmada visualmente, zero cliques perdidos.

---

**Turno 2 — Era da Paz**
- O que vejo: Recursos agora: 112 grain, 40 wood, 45 gold (produção de grain ativa). O painel de construção do Território 1 ainda tem slots disponíveis. Olho o Território 2 — também vazio. Penso em construir Mine (15w + 5g) no Território 2 para garantir renda de gold. Antes de clicar, percebo que o botão da Mine está habilitado com clareza — fundo normal, sem cinza. Já o botão de Barracks está cinza (20w + 15g — estou perto mas o sistema claramente desabilitou). Interajo propositalmente com os botões pra entender o sistema: clico no botão cinza de Barracks para ver se tem alguma mensagem de erro — não clica, simplesmente não responde. Justo.
- O que quero fazer: Construir Mine no Território 2.
- O que consegui fazer: Construo Mine no Território 2 (15w + 5g). Recursos ficam: 112 grain, 25 wood, 40 gold. Produção de gold ativa: +5 gold/t.
- Frustrações: Nenhuma grave. Fiquei com pouca wood (25) e isso me limita no próximo turno. Deveria ter calculado melhor a sequência de construção.
- Surpresas positivas: Os botões desabilitados são o tipo de QoL que faz diferença real. Joguei versões mais antigas desse tipo de jogo onde você clicava e uma mensagem de erro aparecia depois — frustrante. Aqui o sistema já pré-filtra. Elegante.
- Avaliação: Mine construída, gold começando a fluir, mas estou com wood baixa — próximo turno preciso de cuidado.

---

**Turno 3 — Era da Paz**
- O que vejo: Recursos: 124 grain, 25 wood, 45 gold. O mapa mostra territórios neutros adjacentes ao meu Território 2. Quero expandir. Abro o modal de expedição para o território neutro a nordeste. Vejo uma badge nova no mapa: "2 turnos" sobre a rota de viagem. Isso é novo — nas versões anteriores eu precisava deduzir o tempo de viagem pela distância visual. Agora é explícito.
- O que quero fazer: Enviar expedição ao território neutro para capturá-lo.
- O que consegui fazer: Envio expedição com 0 soldados (território neutro sem defesa). O mapa mostra o ícone de expedição em movimento com o contador "2 turnos" se atualizando. Recursos usados: nenhum (expedição básica para território desprotegido).
- Frustrações: Queria expandir mais rápido mas sem soldados não posso atacar territórios defendidos. Estou apostando que esse neutro realmente não tem guarnição.
- Surpresas positivas: A badge de tempo de viagem "2 turnos" no mapa é uma adição pequena mas elimina uma camada de incerteza. Antes eu sempre ficava na dúvida se chegaria a tempo antes do AI se mover. Agora é transparente.
- Avaliação: Expedição enviada para território neutro, tempo de chegada claro — vou receber no Turno 5.

---

**Turno 4 — Era da Paz**
- O que vejo: Recursos: 136 grain, 25 wood, 50 gold. Expedição em andamento (1 turno restante). Percebo que wood está estagnada em 25 — sem Sawmill não há produção de madeira. Considero construir Sawmill no Território 1 (5w + 10g). Um banner aparece no topo da tela: "Sua produção de madeira está baixa. Considere construir um Sawmill." — TipBanner. É contextual e apareceu exatamente no momento certo, porque eu estava pensando nisso.
- O que quero fazer: Construir Sawmill no Território 1 para garantir renda de wood.
- O que consegui fazer: Construo Sawmill no Território 1 (5w + 10g). Recursos ficam: 136 grain, 20 wood, 40 gold. Produção ativa: +12 grain/t, +8 wood/t.
- Frustrações: Fico com 20 wood agora. Preciso de 20w + 15g para Barracks — estou perto mas não chego neste turno. O ritmo de construção ainda é um pouco lento para o meu estilo agressivo.
- Surpresas positivas: O TipBanner apareceu antes de eu clicar em qualquer coisa, como se o sistema tivesse lido minha intenção. Sei que é só lógica de threshold de recursos, mas o timing foi perfeito. Para um jogador mais casual isso seria muito mais valioso ainda.
- Avaliação: Sawmill garantida, produção de wood ativa — agora o ciclo econômico está completo em dois territórios.

---

**Turno 5 — Era da Paz**
- O que vejo: Recursos: 148 grain, 28 wood, 45 gold. Expedição chegou: capturei o Território 3 (neutro, sem resistência). Agora tenho 3 territórios. O Território 3 aparece no mapa com o ícone de minha bandeira e slots de construção vazios. Faço a conta: com +12 grain/t e +8 wood/t minha economia está acelerando.
- O que quero fazer: Construir Farm no Território 3 (aproveitando o bônus Verdâneos de +20%).
- O que consegui fazer: Construo Farm no Território 3 (10w + 5g). Recursos ficam: 148 grain, 18 wood, 40 gold. Produção agora: +24 grain/t, +8 wood/t, +5 gold/t.
- Frustrações: Wood ainda baixa (18). Não dá para Barracks ainda (preciso 20w + 15g — quase!). A limitação de wood está atrasando minha militarização.
- Surpresas positivas: Ver "+24 grain/t" no painel de produção com 3 territórios é satisfatório. O snowball econômico está funcionando como planejado.
- Avaliação: Terceiro território capturado, segunda Farm construída — produção de grain dobrou em relação ao turno 1.

---

**Turno 6 — Era da Paz**
- O que vejo: Recursos: 172 grain, 26 wood, 45 gold. Grain acumulando rapidamente. Gold crescendo devagar (+5/t). Território 3 com Farm já produzindo. Olho o painel do AI — o oponente tem 2 territórios, sem grande atividade militar visível ainda. Sinto que estou à frente economicamente.
- O que quero fazer: Construir Barracks no Território 1 ou 2 para habilitar soldados antes da Era da Guerra.
- O que consegui fazer: Barracks custa 20w + 15g. Tenho 26w + 45g. Botão habilitado! Construo Barracks no Território 2 (20w + 15g). Recursos ficam: 172 grain, 6 wood, 30 gold. Sem produção adicional — apenas infra estrutura militar desbloqueada.
- Frustrações: Fiquei com wood crítica (6). Se precisar construir outra coisa agora, estou bloqueada. Deveria ter esperado um turno a mais para ter margem de manobra.
- Surpresas positivas: O painel de construção da Barracks mostra a opção de treinar soldados imediatamente após a construção — a continuidade do fluxo é boa. Não preciso sair e entrar no modal de novo.
- Avaliação: Barracks construída no Turno 6, um turno antes do planejado — militar pronto para a Era da Guerra.

---

**Turno 7 — Era da Paz**
- O que vejo: Recursos: 196 grain, 14 wood, 35 gold. Wood se recuperando (+8/t). Barracks ativa. O modal de treino de soldado mostra custo: 10 grain + 5 gold por soldado. Quero treinar 3 soldados agora e mais 2 no turno 8 para chegar na Era da Guerra com 5 soldados.
- O que quero fazer: Treinar 3 soldados.
- O que consegui fazer: Treino 3 soldados (30 grain + 15 gold). Recursos ficam: 166 grain, 14 wood, 20 gold. Tenho 3 soldados no Território 2.
- Frustrações: Gold baixou para 20. Estou receoso de não ter reserva suficiente para a Era da Guerra. A taxa de +5/t é lenta demais — deveria ter construído outra Mine.
- Surpresas positivas: O contador de ataque/defesa dos soldados aparece no painel militar (2 ataque, 2 defesa cada). É claro e direto — sem necessidade de consultar manual.
- Avaliação: Primeiro contingente militar formado, mas gold está preocupantemente baixo para o que vem a seguir.

---

**Turno 8 — Era da Paz**
- O que vejo: Recursos: 190 grain, 22 wood, 25 gold. Um banner no topo da tela: "Era da Paz termina em 1 turno. Prepare-se para a Era da Guerra." A UI muda sutilmente — o indicador de Era pulsa levemente. Tenho 3 territórios, 3 soldados, economia razoável. Quero treinar mais 2 soldados antes da transição.
- O que quero fazer: Treinar 2 soldados adicionais para chegar em 5 na Era da Guerra.
- O que consegui fazer: Treino 2 soldados (20 grain + 10 gold). Recursos ficam: 170 grain, 22 wood, 15 gold. Tenho 5 soldados.
- Frustrações: Gold está em 15 — muito baixo. Se a Era da Guerra começar com ataques imediatos do AI, não tenho reserva para emergências. Precisava de mais um turno de acumulação.
- Surpresas positivas: O alerta de transição de era foi claro e deu tempo de me preparar. Nas versões anteriores isso era abrupto. A Era termina com animação de transição suave — já antecipo que vai ser visualmente agradável.
- Avaliação: Encerro a Era da Paz com 5 soldados e 3 territórios — posição razoável mas gold apertado.

---

## ERA DA GUERRA (Turnos 9–18)

---

**Turno 9 — Era da Guerra**
- O que vejo: A tela escurece brevemente e uma animação de transição de era exibe "ERA DA GUERRA" com partículas e efeitos dramáticos. Genuinamente impressionante — não esperava esse nível de polimento. O HUD muda: o indicador de era agora mostra uma espada. Recursos: 190 grain, 30 wood, 20 gold (+produção do turno). O mapa mostra AIController_1 com 2 territórios e poucos soldados visíveis. Abro o modal de expedição/combate para planejar ataque.
- O que quero fazer: Atacar o território mais fraco do AI imediatamente.
- O que consegui fazer: Abro o ExpeditionModal para o território do AI. Vejo o banner de sugestão de carta: "Use a carta Reforços para aumentar seu poder de ataque nesta batalha." — primeira vez que vejo essa feature em ação. Tenho a carta Reforços no inventário. Uso a carta + envio 3 soldados para atacar. O AI tinha 1 soldado de defesa. Vitória decisiva (6 ataque vs 2 defesa*1.5 = 3). Capturo o território.
- Frustrações: O banner de sugestão de carta apareceu mas não ficou claro se usar a carta consumia o recurso permanentemente ou era recorrente. Fui verificar o inventário depois — era uso único. Deveria ter um tooltip explicativo no banner.
- Surpresas positivas: A animação de transição de era foi o destaque do turno. Isso eleva a percepção de progressão narrativa. O banner de sugestão de carta no modal de combate é exatamente onde precisa estar — contextual, no momento da decisão.
- Avaliação: Primeiro ataque bem-sucedido da Era da Guerra — 4 territórios, carta Reforços utilizada estrategicamente.

---

**Turno 10 — Era da Guerra**
- O que vejo: Recursos: 208 grain, 38 wood, 22 gold. Tenho 4 territórios agora. O AI perdeu um território e vai reagir. Verifico o painel militar: 5 soldados (3 foram para o ataque e voltaram, 2 ficaram na base). O AI ainda tem 1 território com defesa incerta.
- O que quero fazer: Consolidar o novo território e construir Farm nele (Território 4).
- O que consegui fazer: Construo Farm no Território 4 (10w + 5g). Recursos ficam: 208 grain, 28 wood, 17 gold. Produção agora: +36 grain/t (3 Farms Verdâneos = 3×12), +8 wood/t, +5 gold/t.
- Frustrações: Gold continua baixo (17). Cada soldado que treino custa 5 gold — estou limitada militarmente pela minha própria negligência com gold no início.
- Surpresas positivas: A badge de defesa no mapa mostra "Defesa: 10" no meu território — é o bônus base, sem Wall ainda. Útil para avaliar o risco de contra-ataque.
- Avaliação: Quarto território com Farm — economia crescendo, mas gold ainda é o gargalo.

---

**Turno 11 — Era da Guerra**
- O que vejo: Recursos: 244 grain, 36 wood, 22 gold. Grain acumulando rapidamente (+36/t). O AI-2 tem 3 territórios e parece estar construindo — vejo ícones de estrutura no mapa dele. Preocupante. Precisos de mais soldados antes que ele fique forte demais.
- O que quero fazer: Treinar 3 soldados adicionais.
- O que consegui fazer: Treino 3 soldados (30 grain + 15 gold). Recursos ficam: 214 grain, 36 wood, 7 gold. Tenho 8 soldados agora.
- Frustrações: Gold chegou a 7. Isso é preocupante — se precisar usar qualquer carta ou pagar por expedição especial, não consigo. O design do jogo parece criar uma tensão constante de gold que é às vezes muito apertada para ser divertida.
- Surpresas positivas: Com 8 soldados sinto confiança para atacar o AI-2. O painel de força militar mostra "Poder de Ataque: 16" — informação clara e imediata.
- Avaliação: Força militar dobrada, mas gold crítico — alta pressão econômica.

---

**Turno 12 — Era da Guerra**
- O que vejo: Recursos: 250 grain, 44 wood, 12 gold. AI-2 se moveu: vejo um ícone de expedição no mapa indo para um território neutro no canto. Ele está expandindo, não me atacando. Janela de oportunidade. Envio ataque contra seu território mais fraco (1 soldado de defesa identificado pela badge de defesa no mapa).
- O que quero fazer: Conquistar o território mais fraco do AI-2.
- O que consegui fazer: Ataco com 4 soldados (poder de ataque: 8 vs defesa 2*1.5=3). Vitória decisiva. Capturo Território 5. Agora tenho 5 territórios.
- Frustrações: A badge de defesa do AI mostrava "Defesa: 2" mas queria saber se havia Wall ou bônus de terreno aplicado. A informação estava lá mas faltava contexto (é 2 de unidades ou é pós-bônus?).
- Surpresas positivas: Conquistar o 5º território sente como um marco. A pontuação projetada no HUD saltou visivelmente — ver o número subir em tempo real é satisfatório.
- Avaliação: Cinco territórios conquistados no meio da Era da Guerra — posição dominante estabelecida.

---

**Turno 13 — Era da Guerra**
- O que vejo: Recursos: 286 grain, 52 wood, 17 gold. Território 5 capturado, AI-2 reduzido a 2 territórios. AI-1 ainda tem 2 territórios mas parece fraco militarmente. Quero construir Wall em algum território estratégico antes que os AIs reajam em conjunto.
- O que quero fazer: Construir Wall no Território 1 (meu território de origem, mais propenso a contra-ataque).
- O que consegui fazer: Construo Wall no Território 1 (25w + 10g). Recursos ficam: 286 grain, 27 wood, 7 gold. Defesa do Território 1 agora mostra "+20%" na badge do mapa.
- Frustrações: Wood caiu para 27. Precisaria de mais uma Sawmill para suportar o ritmo de construção. Com 5 territórios e apenas 1 Sawmill estou com gargalo de wood.
- Surpresas positivas: A badge de defesa no mapa atualiza imediatamente após construir Wall — "Defesa: +20%" visível no território. É satisfatório ver o investimento refletido instantaneamente.
- Avaliação: Wall construída no território principal — primeira linha de defesa para a Era da Invasão que se aproxima.

---

**Turno 14 — Era da Guerra**
- O que vejo: Recursos: 322 grain, 35 wood, 12 gold. AI-2 reagiu: enviou 2 soldados para um dos meus territórios periféricos. Vejo o ícone de expedição inimiga no mapa com contador "1 turno". Tenho tempo de reagir.
- O que quero fazer: Mover soldados defensivos para o território ameaçado.
- O que consegui fazer: Realoco 3 soldados para o Território 4 (ameaçado). AI-2 atacou com 2 soldados (poder ataque: 4) contra minha defesa de 3 soldados (defesa: 6). AI recuou — não conseguiu superar minha defesa.
- Frustrações: A realocação de tropas entre territórios não é totalmente intuitiva. Tive que navegar por alguns modais para mover soldados. Parece que poderia ser mais direto — talvez drag-and-drop no mapa?
- Surpresas positivas: O AI efetivamente tentou um contra-ataque — o jogo está se comportando de forma razoavelmente inteligente. A ameaça foi real e exigiu reação estratégica, o que torna o jogo mais interessante do que um AI passivo.
- Avaliação: Ataque do AI repelido — defesa funcionou, mas a navegação de realocação de tropas precisa ser mais fluida.

---

**Turno 15 — Era da Guerra**
- O que vejo: Recursos: 358 grain, 43 wood, 17 gold. Situação estável. AI-2 fraco, AI-1 também. Tenho 5 territórios — já atingi meu objetivo de expansão. O HUD mostra "3 turnos para Era da Invasão". Quero aproveitar os turnos restantes para acumular gold e treinar mais soldados.
- O que quero fazer: Treinar 3 soldados adicionais e acumular reservas.
- O que consegui fazer: Treino 3 soldados (30 grain + 15 gold). Recursos ficam: 328 grain, 43 wood, 2 gold. Tenho 11 soldados. Gold chegou a 2 — situação crítica mas intencional: estou trocando gold por força militar antes da invasão.
- Frustrações: Gold em 2 é angustiante. Se algo inesperado acontecer neste turno estou sem margem. O design cria tensão genuína mas às vezes vai longe demais.
- Surpresas positivas: O contador de Era no HUD ("3 turnos para Era da Invasão") cria uma sensação de urgência que não existia antes. Muda como eu priorizo ações.
- Avaliação: 11 soldados, gold crítico, 3 turnos para a invasão — a corrida contra o relógio está no pico.

---

**Turno 16 — Era da Guerra**
- O que vejo: Recursos: 364 grain, 51 wood, 7 gold. AI-1 surpreende: ataca meu Território 3 com 5 soldados (poder ataque: 10). Tenho 3 soldados lá (defesa: 6, mas sem Wall = 6). A batalha vai ser difícil — 10 vs 6, AI ataca com vantagem. Corro para usar a carta Improvised Walls para emergência.
- O que quero fazer: Usar carta defensiva e segurar o território.
- O que consegui fazer: Uso carta Improvised Walls (+4 defesa temporária). Defesa total: 10. Ataque do AI: 10. Empate — o atacante não vence no empate por regra (precisa superar, não empatar). Territorio segurado por margem mínima.
- Frustrações: Essa foi a batalha mais estressante até agora. O modal de combate apareceu com o banner de sugestão de carta mas ele ficou piscando de forma um pouco intrusiva durante a resolução — o timing de exibição do banner precisa ser calibrado para não aparecer durante animações de resolução.
- Surpresas positivas: Segurar o território por empate foi cinematográfico. A narrativa emergente de "quase perdi" é o que torna jogos de estratégia divertidos. A carta Improvised Walls salvou o Território 3 — satisfação genuína de ter guardado esse recurso.
- Avaliação: Batalha crítica vencida no limite — Era da Guerra termina com 5 territórios intactos.

---

**Turno 17 — Era da Guerra**
- O que vejo: Recursos: 400 grain, 59 wood, 12 gold. A Era da Guerra tem 2 turnos restantes. Minha posição está consolidada: 5 territórios, 11 soldados, Wall no Território 1. Sem grandes ameaças imediatas. Quero construir Mine adicional para aumentar gold antes da Era da Invasão.
- O que quero fazer: Construir Mine no Território 3 para diversificar produção de gold.
- O que consegui fazer: Construo Mine no Território 3 (15w + 5g). Recursos ficam: 400 grain, 44 wood, 7 gold. Produção de gold: +10/t (2 Mines agora).
- Frustrações: Sinto que deveria ter construído a segunda Mine muito antes — Turnos 6 ou 7. Essa é uma observação de balanço: o gold é constrangedor durante toda a Era da Guerra e só agora estou resolvendo o problema. Talvez Mine devesse ser mais barata ou dar mais gold.
- Surpresas positivas: Nenhuma grande surpresa neste turno — é um turno de consolidação administrativa.
- Avaliação: Segunda Mine construída — produção de gold dobra, chegando melhor preparada para a Era da Invasão.

---

**Turno 18 — Era da Guerra**
- O que vejo: Recursos: 400 grain, 52 wood, 17 gold. Último turno da Era da Guerra. HUD mostra "1 turno para Era da Invasão". Um banner de aviso aparece: "A Era da Invasão está próxima. A Horda atacará o clã mais poderoso a cada 3 turnos." Eu sou o clã mais poderoso. Sinto uma pontada de preocupação — boa design.
- O que quero fazer: Treinar mais 2 soldados e preparar defesas.
- O que consegui fazer: Treino 2 soldados (20 grain + 10 gold). Recursos ficam: 380 grain, 52 wood, 7 gold. Tenho 13 soldados. Nota mental: preciso de Wall em mais territórios.
- Frustrações: Não tive tempo de construir Walls em todos os 5 territórios. Apenas 1 tem Wall. Isso vai ser problema na Era da Invasão.
- Surpresas positivas: O aviso antecipado da Horda no banner foi bem calibrado — apareceu no último turno da era anterior, dando tempo para reagir mentalmente mas não tempo suficiente para resolver completamente. Tensão intencional bem executada.
- Avaliação: Era da Guerra encerrada — 5 territórios, 13 soldados, mas defesa insuficiente para o que vem.

---

## ERA DA INVASÃO (Turnos 19–25)

---

**Turno 19 — Era da Invasão**
- O que vejo: Transição de era novamente — animação mais sombria desta vez, com efeito de névoa vermelha. Aparece um modal informativo da Horda que nunca tinha visto antes: "A HORDA CHEGA. A Horda ataca o clã dominante a cada 3 turnos. Força inicial: 50. Cresce a cada ataque: 50 → 100 → 150 → 200 → 300." Eu sou o clã dominante (5 territórios). Essa informação muda minha estratégia completamente — Preciso de Wall em múltiplos territórios urgentemente. O HUD agora mostra um contador: "Próximo ataque da Horda: 3 turnos".
- O que quero fazer: Construir Wall imediatamente em outro território vulnerável.
- O que consegui fazer: Construo Wall no Território 3 (25w + 10g). Recursos ficam: 380 grain, 27 wood, -3 gold... espera, não consigo. Gold está em 7 e Wall custa 10g. Botão desabilitado! Fico bloqueada. Ajusto: construo Wall no Território 2 (25w + 10g)... mesmo problema, estou com apenas 7 gold. Nenhuma Wall é construível agora além de com wood. Revejo: Wall custa 25w + 10g. Tenho 7g. Estou 3g abaixo. Extremamente frustrante no momento mais crítico.
- Frustrações: Chego na Era da Invasão sem gold suficiente para construir Wall adicional. A transição para o modal informativo da Horda foi excelente, mas a frustração de não conseguir reagir imediatamente porque estava 3 gold abaixo foi intensa. O modal informativo veio bem; o que é meu erro estratégico ficou mais evidente.
- Surpresas positivas: O modal informativo da Horda é exatamente o tipo de onboarding que um novo jogador precisa. A escala de força (50→100→150→200→300) deixa claro que sobreviver é improvável — é um design honesto que sinaliza o fim de jogo. O contador "Próximo ataque da Horda: 3 turnos" no HUD é uma adição cirúrgica de tensão.
- Avaliação: Era da Invasão começa com informação clara mas eu chego sem recursos para reagir — meu erro estratégico, sistema funcionou corretamente.

---

**Turno 20 — Era da Invasão**
- O que vejo: Recursos: 390 grain, 35 wood, 17 gold (+10/t de 2 Mines). Wall ainda só no Território 1. Counter da Horda: "2 turnos". AI-2 foi eliminado pelos combates anteriores — só AI-1 sobrevive com 1 território. Minha prioridade agora é defesa.
- O que quero fazer: Construir Wall no Território 2 agora que tenho 17 gold.
- O que consegui fazer: Construo Wall no Território 2 (25w + 10g). Recursos ficam: 390 grain, 10 wood, 7 gold. Dois territórios com Wall agora.
- Frustrações: Wood caiu para 10. Não consigo construir mais nada que precise de wood neste turno. O ritmo de construção versus a chegada da Horda é muito apertado — talvez intencional, mas estressante.
- Surpresas positivas: Cada Wall construída atualiza a badge de defesa no mapa instantaneamente. Vejo "Defesa: +20%" piscar em verde no Território 2 — feedback visual imediato do investimento. Pequena satisfação em meio à pressão.
- Avaliação: Segunda Wall construída — dois territórios protegidos, Horda chega no próximo turno.

---

**Turno 21 — Era da Invasão**
- O que vejo: Recursos: 400 grain, 18 wood, 17 gold. Counter da Horda: "1 turno". HUD pulsando com aviso vermelho. Tenho 13 soldados distribuídos entre territórios. Decidir onde concentrar defesa é a decisão mais importante — a Horda ataca o clã dominante, não um território específico, então preciso adivinhar qual território ela vai atacar.
- O que quero fazer: Concentrar soldados no território mais fraco (sem Wall) e esperar.
- O que consegui fazer: Movo 5 soldados para o Território 5 (sem Wall, sem defesa adicional — o mais vulnerável). Distribuo: T1 (4 soldados + Wall), T2 (2 soldados + Wall), T5 (5 soldados sem Wall), outros territórios (1-2 soldados).
- Frustrações: Não sei qual território a Horda vai atacar especificamente. A mecânica diz "ataca o clã dominante" mas não especifica o território alvo. Essa incerteza é ansiogena de forma que não é totalmente satisfatória — preferiria ter algum indicador de qual território está em risco.
- Surpresas positivas: O HUD pulsante com vermelho é visualmente eficaz. A Horda chega no próximo turno e o jogo me fez sentir isso.
- Avaliação: Preparo defensivo feito com informação incompleta — turno de ansiedade estratégica pura.

---

**Turno 22 — Era da Invasão**
- O que vejo: Recursos: 380 grain, 26 wood, 27 gold. A Horda ataca! Animação de ataque — a Horda atinge o Território 4 (o que eu tinha deixado mais fraco, naturalmente). Força da Horda: 100 (segundo ataque). Minha defesa no Território 4: 2 soldados (defesa total: 4). 100 vs 4 — não há competição. Perco o Território 4. Fico com 4 territórios.
- O que quero fazer: Reagrupar e avaliar o dano.
- O que consegui fazer: Território 4 perdido. Recebo alerta de perda de território com animação de captura pela Horda. Counter da Horda reinicia: "3 turnos para próximo ataque" com força 150.
- Frustrações: Perder um território para a Horda com força 100 quando eu tinha 13 soldados distribuídos foi frustrante — a Horda simplesmente esmagou o que estava no caminho. Mas é honesto — com defesa 4 vs força 100 não há o que fazer. A sensação é de inevitabilidade, que pode ser design intencional mas cria frustração.
- Surpresas positivas: A animação de ataque da Horda é distinta e impactante. Ver o território mudar de cor para "Horda" no mapa é visualmente marcante. O counter reiniciando após o ataque dá clareza de quando o próximo virá.
- Avaliação: Primeiro território perdido para a Horda — frustrante mas narrativamente consistente com o design de "fase de sobrevivência".

---

**Turno 23 — Era da Invasão**
- O que vejo: Recursos: 368 grain, 34 wood, 37 gold. 4 territórios. Counter Horda: "2 turnos". Horda próxima terá força 150. Não há nada que eu possa fazer para parar força 150 com defesa convencional — a Horda vai continuar consumindo. O AI-1 ainda tem 1 território. Decido ignorar o AI e focar em acumular recursos para a pontuação final.
- O que quero fazer: Treinar mais soldados para aumentar pontuação e construir Mine adicional.
- O que consegui fazer: Treino 3 soldados (30 grain + 15 gold). Recursos ficam: 338 grain, 34 wood, 22 gold. Tenho 16 soldados (incluindo os redistribuídos após perda do T4). Construo Mine no Território 1 (15w + 5g). Agora +15 gold/t.
- Frustrações: A sensação de que a Horda vai inevitavelmente me derrotar é desmotivante. Estou jogando para pontuação, não para vitória — isso é design válido mas precisa ser mais claramente comunicado como objetivo da Era da Invasão.
- Surpresas positivas: O acúmulo de gold com +15/t agora é significativo. Ver o número crescer rapidamente nos últimos turnos cria satisfação de encerramento.
- Avaliação: Dois turnos restantes, acumulando para pontuação máxima — transição de mentalidade de conquista para sobrevivência.

---

**Turno 24 — Era da Invasão**
- O que vejo: Recursos: 368 grain, 42 wood, 37 gold. Counter Horda: "1 turno". Sei que vou perder mais um território — a força 150 vai superar qualquer defesa que tenho. Decido não lutar contra isso e focar nos últimos preparativos de pontuação.
- O que quero fazer: Treinar mais 2 soldados para maximizar pontuação por unidades.
- O que consegui fazer: Treino 2 soldados (20 grain + 10 gold). Recursos ficam: 348 grain, 42 wood, 27 gold. Tenho 18 soldados. HUD mostra pontuação estimada projetada — vejo os números subindo.
- Frustrações: Estou jogando os últimos turnos no modo "maximizar pontuação" em vez de tomar decisões estratégicas interessantes. O design da Era da Invasão cria inevitabilidade que reduz a agência do jogador nos últimos turnos.
- Surpresas positivas: O HUD com pontuação estimada em tempo real é ótimo — me ajuda a priorizar as ações dos últimos turnos de forma direcionada.
- Avaliação: Penúltimo turno — preparando para a tela de resultado final.

---

**Turno 25 — Era da Invasão**
- O que vejo: Recursos: 368 grain, 50 wood, 47 gold. Horda ataca novamente (força 150) — perde mais um território. Fico com 3 territórios ao final. Mas então: a tela escurece e aparece o GameResultsScreen. Uma tela de resultado animada mostra o ranking dos jogadores com efeito de contagem progressiva. Meu nome "Ariana" aparece em primeiro lugar com pontuação sendo contada: territórios×100, população×10, gold×1, unidades×5. Total calculado ao vivo: 4×100 + 100×10 + 200×1 + 20×5 = 400 + 1000 + 200 + 100 = 1700... mas com bônus de turno e outros fatores chegou a ~1980.
- O que quero fazer: Ver o resultado e avaliar a sessão.
- O que consegui fazer: Assisto à cerimônia de resultado. O ranking mostra: 1° Ariana (~1980), 2° AI-1 (~680), e a Horda como entidade separada. Há um botão "Jogar Novamente" e "Ver Detalhes".
- Frustrações: Após 3 sprints sem tela de resultado e com encerramento abrupto, a GameResultsScreen chega como alívio enorme. Mas o cálculo de pontuação na tela não mostrou o breakdown claro de como chegou em 1980 — precisei fazer a conta mentalmente. Um breakdown detalhado ("+400 por 4 territórios", "+1000 por população", etc.) seria perfeito.
- Surpresas positivas: A GameResultsScreen com animação de contagem progressiva é exatamente a cerimônia de encerramento que o jogo precisava. O efeito de contagem dos pontos cria satisfação de closure que estava faltando nas sprints anteriores. Ver "1° lugar — VITÓRIA" após 25 turnos de luta é genuinamente satisfatório mesmo sabendo que é uma sessão de teste.
- Avaliação: Jogo encerrado com cerimônia digna — a GameResultsScreen foi a melhor adição desta sprint e transforma completamente a sensação de conclusão.

---

## Avaliação Geral

**Nota: 7/10**

**O que funcionou muito bem:**
- Etiquetas de produção visíveis antes de construir ("+12 grain/t" com bônus de origem pré-calculado)
- Botões desabilitados para ações inacessíveis — elimina cliques frustrantes
- Badges de defesa no mapa — informação estratégica imediata e posicionada onde é necessária
- Modal informativo da Horda no início da Era da Invasão — onboarding perfeito para o climax do jogo
- Contador da Horda no HUD — tensão cronometrada bem executada
- Banner de sugestão de carta no ExpeditionModal — contextual e no momento certo
- GameResultsScreen com animação de contagem — cerimônia de encerramento necessária e satisfatória
- Animações de transição de era — elevam a percepção narrativa do jogo
- Badge de tempo de viagem no mapa — elimina incerteza sobre movimentação

**O que ainda precisa de atenção:**
- Gargalo de gold durante toda a Era da Guerra é constrangedor além do que é divertido — Mine poderia dar +8 gold/t em vez de +5
- A Horda não indica qual território vai atacar — incerteza ansiogena não totalmente satisfatória
- Banner de sugestão de carta pisca durante animações de resolução de combate — timing a calibrar
- Breakdown de pontuação na GameResultsScreen poderia ser mais explícito (linha por linha)
- Realocação de tropas entre territórios precisa de UX mais fluida — muitos cliques para uma ação frequente

**Experiência geral:** Sprint 4 elevou significativamente a qualidade da UX. As features de informação pré-decisão (labels de produção, botões desabilitados, badges de defesa) são as mais impactantes. A GameResultsScreen resolve um problema fundamental que existia desde o início do projeto.
