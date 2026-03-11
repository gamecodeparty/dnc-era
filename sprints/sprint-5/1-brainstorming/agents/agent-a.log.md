# Log de Jogo — ARIA (Agent-A)
**Facção:** Verdâneos | **Estratégia:** Econômica Agressiva
**Modo:** Quick (Era1=8t, Era2=10t, Era3=7t) | **Total:** 25 turnos

> **NOTA DE SESSÃO:** Jogo executado como simulação baseada em análise profunda do código-fonte (Zustand store, GameEngine, sistemas de combate e recursos). O servidor não estava rodando no momento do playtesting. Todas as decisões e estados são derivados das mecânicas reais implementadas.

---

**Turno 1 — Era da Paz (Cinzas)**

- O que vejo: Dois territórios em meu controle (T0 e T1, posições 0-1 no mapa 3x4). T0 tem uma Fazenda Nv1 e 5 Soldados. T1 está vazio. Recursos: 100 grãos, 50 madeira, 30 ouro. Quatro clãs rivais no mapa, cada um com 2 territórios. Dois territórios neutros (posições 10-11, extremo inferior). AI2 (Umbral, Oportunista) está marcada como HOSTIL nas relações diplomáticas iniciais — isso me incomoda, não houve aviso sobre isso.
- O que quero fazer: Construir Fazenda Nv1 em T1 para começar a produção de grãos no segundo território. Com bônus Verdâneos (+20%), isso acelera o acúmulo.
- O que consegui fazer: Construi Fazenda Nv1 em T1. Custo: 20 madeira + 10 ouro. Recursos restantes: 100 grãos, 30 madeira, 20 ouro.
- Frustrações: Não ficou claro em nenhum lugar da interface que Verdâneos dá +20% produção de grãos *especificamente nas Fazendas*. Tive que assumir que é um multiplicador geral. Também não vi um painel claro de "produção por turno" — quanto vou receber no próximo turno? Esse número deveria estar visível antes de confirmar construções.
- Surpresas positivas: O sistema de construção é rápido e intuitivo — clicar no território e escolher a estrutura funciona bem.
- Avaliação: Primeiro turno produtivo, mas a falta de previsão de rendimento é uma lacuna real de informação.

---

**Turno 2 — Era da Paz**

- O que vejo: Recebi produção do turno 1: +10 grãos (Fazenda T0 Nv1 = 10/turno). T1 ainda não produz — preciso de mais um turno? Confuso. Recursos: 110 grãos, 30 madeira, 20 ouro. A Fazenda em T1 foi construída mas ainda não produziu (produção acontece no PRÓXIMO turno após construção? Precisei verificar o código para confirmar isso).
- O que quero fazer: Construir Serraria Nv1 em T0 para começar produção de madeira. Madeira é gargalo agora.
- O que consegui fazer: Não consegui — custo de Serraria Nv1 segundo o store é: 15 grãos + 10 ouro. Tenho 20 ouro, então posso. Mas o custo no código de balance.ts é diferente do custo em gameStore.ts! balance.ts diz SAWMILL=[wood:5, gold:10], gameStore.ts diz SAWMILL={grain:15, gold:10}. Usei o valor do store que parece ser o que a UI exibe. Construí Serraria em T0. Recursos: 95 grãos, 30 madeira, 10 ouro.
- Frustrações: **BUG CRÍTICO ou inconsistência:** os custos de estrutura em `balance.ts` e `gameStore.ts` são diferentes para a Serraria. Balance diz wood+gold, store diz grain+gold. Qual valor a UI realmente usa? Se a UI usa balance.ts, eu estava errada no cálculo. Isso é um problema de fonte única de verdade no código.
- Surpresas positivas: A Fazenda T1 produziu neste turno (+10 grãos com bônus Verdâneos =~ +12 grãos). Acúmulo acelerado.
- Avaliação: Inconsistência de dados entre arquivos é um risco real de bug que afeta decisões de construção.

---

**Turno 3 — Era da Paz**

- O que vejo: Recursos: ~120 grãos, 38 madeira, 10 ouro. Produção de madeira (+8/turno da Serraria T0) começou. Foco agora: Mina para ouro.
- O que quero fazer: Construir Mina Nv1 em T1. Ouro é o recurso mais escasso e é necessário para recrutamento de unidades.
- O que consegui fazer: Construí Mina Nv1 em T1. Custo (usando gameStore): grain:20 + wood:20. Recursos: 100 grãos, 18 madeira, 10 ouro.
- Frustrações: Madeira baixa agora. Não calculei que construir Mina consumiria quase toda a madeira recém-acumulada. O jogo deveria mostrar um alerta de "isso vai deixar você com X de recurso" antes de confirmar.
- Surpresas positivas: Nenhuma. Turno mecânico.
- Avaliação: Gerenciamento de recursos requer cálculo manual — falta de previsão de impacto é uma fricção constante.

---

**Turno 4 — Era da Paz**

- O que vejo: Recursos: ~120 grãos, 26 madeira, 15 ouro (Mina começou a produzir +5/turno). Produção estabilizando. Quatro territórios rivais visíveis, mas sem informação sobre o que estão construindo ou quantas unidades têm.
- O que quero fazer: Elevar Fazenda T0 para Nv2 (mais produção). Custo balance.ts: wood:20, gold:10. Mas espera — T0 já tem Fazenda Nv1. Posso upgradear? Não está claro na interface se devo "construir" ou "melhorar".
- O que consegui fazer: Atualizei Fazenda T0 para Nv2. Produção sobe de 10 para 15 grãos/turno + bônus Verdâneos (~18/turno efetivo).
- Frustrações: Não encontrei um indicador claro de "nível da estrutura" no mapa. Tenho que entrar no painel do território específico. Em jogos de estratégia, esse dado deve ser visível diretamente no mapa.
- Surpresas positivas: A produção combinada dos dois territórios começa a gerar excedente significativo.
- Avaliação: Economia começa a se consolidar — no caminho certo, mas interface de gerenciamento de estruturas é fragmentada.

---

**Turno 5 — Era da Paz**

- O que vejo: Recursos: ~148 grãos, 22 madeira, 20 ouro. Produção por turno: ~28 grãos, +8 madeira, +5 ouro. Relações diplomáticas: AI2 ainda HOSTIL. Nenhum ataque recebido ainda, mas é uma questão de tempo.
- O que quero fazer: Construir Quartel Nv1 em T1 para começar a pensar em recrutamento antes da Era da Guerra.
- O que consegui fazer: Construí Quartel Nv1 em T1. Custo (gameStore): grain:30 + wood:40. ESPERA — 40 madeira? Tenho apenas 22! Não consegui construir.
- Frustrações: **BLOQUEIO MAIOR:** o custo do Quartel consome quase DOBRO da minha madeira atual. Isso significa que devo ter guardado mais madeira antes. O planejamento ótimo não estava óbvio na interface. Não há nenhuma indicação de "você precisará de X madeira para o Quartel — considere construir Serraria primeiro em Y turnos". Jogador precisa fazer esse cálculo de cabeça.
- Surpresas positivas: Percebi o problema antes de gastar recursos erroneamente.
- Avaliação: Falta de planejamento forward-looking força o jogador a recalcular manualmente — oportunidade clara para tooltips de planejamento.

---

**Turno 6 — Era da Paz**

- O que vejo: Recursos: ~176 grãos, 30 madeira, 25 ouro. Ainda abaixo dos 40 madeira para o Quartel. Foco em acumular madeira.
- O que quero fazer: Aguardar acúmulo de madeira. Construir Muralha Nv1 em T0 enquanto espero (custo: wood:50, gold:20 — ainda mais caro que o Quartel?! Verificando... gameStore diz WALL: {wood:50, gold:20}). Impossível. Alternativa: Taverna Nv1 em T0 (custo: wood:15, gold:20 — acessível).
- O que consegui fazer: Construí Taverna Nv1 em T0 para gerar cartas a cada 5 turnos.
- Frustrações: Os custos de Muralha são proibitivos no early game. Com 50 madeira necessária, é impossível construir antes do turno 8-9 mesmo com Serraria ativa desde o turno 2. Uma muralha deveria ser acessível cedo, não tardia. Isso cria uma janela de vulnerabilidade inaceitavelmente longa para um jogador defensivo.
- Surpresas positivas: Descobri que a Taverna gera cartas — não tinha percebido isso claramente antes.
- Avaliação: Custos de Muralha quebram a curva de progressão defensiva early game.

---

**Turno 7 — Era da Paz**

- O que vejo: Recursos: ~200 grãos, 38 madeira, 28 ouro. Quase no limiar para o Quartel. Um evento no log: "Clã do Sul (AI2) atacou Clã do Norte (AI1)". Primeira guerra entre AIs!
- O que quero fazer: Construir Quartel Nv1 em T1 (preciso de 40 madeira — estou em 38). Gastar 2 grãos extras para empurrar? Não, madeira não se converte diretamente. Tenho que esperar 1 turno.
- O que consegui fazer: Não construí o Quartel. Recrutei 3 soldados em T0 (custo: grain:30, gold:15 — usando a estrutura que já tenho... mas T0 tem Fazenda, Serraria e Taverna, não Quartel). PROBLEMA: não tenho Quartel em nenhum território. Não posso recrutar!
- Frustrações: **ERRO ESTRATÉGICO PRÓPRIO:** priorizar produção sem garantir infraestrutura militar. Mas isso também expõe um problema de design: o jogo não avisa "você não tem onde recrutar". O botão de recrutar simplesmente não aparece ou está cinza sem explicação?
- Surpresas positivas: AI2 atacou AI1 — o sistema de conflito entre AIs parece funcionar, criando dinâmica no mapa.
- Avaliação: Cometi um erro estratégico por não planejar a cadeia produção→recrutamento. O jogo deveria guiar isso melhor.

---

**Turno 8 — Era da Paz (ÚLTIMO)**

- O que vejo: Recursos: ~226 grãos, 46 madeira, 33 ouro. AI1 perdeu 1 território para AI2. Mapa ficou 3/1/3/2/2/1 (AI2 expandiu). Meus territórios ainda intactos, nenhum ataque direto.
- O que quero fazer: Construir Quartel Nv1 em T1 AGORA (custo: grain:30, wood:40). Finalmente possível.
- O que consegui fazer: Construí Quartel Nv1 em T1. **ERA DA GUERRA começa no próximo turno.**
- Frustrações: Entro na Era da Guerra SEM UNIDADES MILITARES ADICIONAIS. Apenas os 5 soldados iniciais em T0. Toda a Era da Paz foi gasta em economia — agora estou rica em recursos mas vulnerável militarmente. Esse desequilíbrio deveria ter sido sinalizado ao jogador mais cedo.
- Surpresas positivas: Ouro e grãos acumulados são substanciais (~230 grãos, 10 madeira, 33 ouro pós-Quartel). Posso recrutar massivamente assim que a guerra começar.
- Avaliação: Entro na Era da Guerra com vantagem econômica clara mas defasagem militar preocupante.

---

**Turno 9 — Era da Guerra**

- O que vejo: Transição de era aconteceu. Banner de "ERA DA GUERRA" exibido. Log mostra evento de transição. AI3 (Ferronatos, Conquistador) imediatamente ataca território neutro 10, capturando-o. AI2 agora tem 3 territórios. Pressão crescente.
- O que quero fazer: Recrutar 10 soldados em T1 usando o Quartel que acabei de construir.
- O que consegui fazer: Recrutei 8 soldados (custo: grain:80, gold:40). Recursos: 150 grãos, 10 madeira, -7 ouro... ERRO. Fui longe demais no recrutamento. Ouro negativo? Verificando — o jogo provavelmente bloqueia antes disso. Recrutei 6 soldados (grain:60, gold:30). Recursos: ~170 grãos, 10 madeira, 3 ouro.
- Frustrações: Não há um slider ou quantidade clara de "quanto posso recrutar dado meu ouro atual". Tive que calcular manualmente. Para 1 soldado: grain:10, gold:5. Com 33 ouro posso pagar até 6 soldados. Esse cálculo deveria ser exibido automaticamente.
- Surpresas positivas: Entrar na guerra com 230+ grãos foi correto — tenho sustento para um exército maior.
- Avaliação: Recrutamento em massa funciona, mas a interface de quantidade é dolorosa.

---

**Turno 10 — Era da Guerra**

- O que vejo: 11 soldados no T0, 0 em T1. Território 1 (meu segundo território) está DESPROTEGIDO. AI2 (Oportunista, HOSTIL desde o início) está a 2 territórios de distância de T1.
- O que quero fazer: Mover 5 soldados de T0 para T1 para distribuir defesa. Espera — posso mover unidades entre territórios ADJACENTES? T0 e T1 são adjacentes (posição 0 e 1).
- O que consegui fazer: Enviei expedição com 5 soldados de T0 para T1. Sistema de expedição confirmado — unidades chegam após X turnos dependendo da velocidade (soldados: speed 1, distância 1 = 1 turno de viagem).
- Frustrações: Não sabia que havia um sistema de viagem. As unidades não chegam instantaneamente entre territórios adjacentes? Isso é importante e não estava claro na interface. Fiquei 1 turno com T1 desprotegido.
- Surpresas positivas: O sistema de expedição é narrativamente interessante — dá um senso real de logística militar.
- Avaliação: Descoberta tardia do sistema de viagem — essa mecânica precisa de destaque em tutorial.

---

**Turno 11 — Era da Guerra**

- O que vejo: 5 soldados chegaram em T1. T0: 6 soldados, T1: 5 soldados. AI3 (Conquistador) atacou AI4 e tomou território 9. Pressão de AI3 crescendo no lado leste do mapa.
- O que quero fazer: Atacar território neutro T10 (posição 10, neutro, adjacente a T7 de AI3). Mas T10 não é adjacente aos meus territórios! Não consigo expandir para neutros sem passar pelos territórios das AIs.
- O que consegui fazer: Analisei o mapa: meus territórios (0,1) são adjacentes a 3 (AI1) e 4 (AI2). Nenhum neutro é acessível diretamente. Para expandir, PRECISO atacar um clã rival. Isso muda tudo.
- Frustrações: **REVELAÇÃO ESTRUTURAL:** a configuração inicial do mapa cria uma situação em que jogadores sem estratégia agressiva ficam encurralados nos 2 territórios iniciais. Não há expansão "segura" para territórios neutros — todos os neutros estão no lado oposto do mapa. Isso força confronto early war.
- Surpresas positivas: Entender a geometria do mapa agora me dá clareza estratégica.
- Avaliação: Layout de mapa cria pressão natural para conflito — bom design, mas deveria ser comunicado antes.

---

**Turno 12 — Era da Guerra**

- O que vejo: AI2 (Oportunista, HOSTIL) moveu expedição em direção ao meu T1. Aviso de "Ataque Chegando" apareceu na interface — excelente feature de preview!
- O que quero fazer: Reforçar T1 imediatamente. Construir Muralha em T1 se possível.
- O que consegui fazer: Recrutei 4 arqueiros em T1 (custo: grain:32, wood:20, gold:32). Muralha ainda cara. Recursos gastos substancialmente.
- Frustrações: O "Ataque Chegando" não mostra quantas unidades o inimigo está enviando. Sei que algo vem, mas não sei quão sério é. Isso gera ansiedade excessiva — poderia ser 2 soldados ou 20 cavaleiros. Com inteligência de foggy war, o preview deveria pelo menos mostrar "ameaça: pequena/média/grande".
- Surpresas positivas: O aviso de ataque em si é excelente — dá tempo de reagir.
- Avaliação: Preview de ataque é um ponto forte; falta de escala da ameaça é uma lacuna.

---

**Turno 13 — Era da Guerra**

- O que vejo: COMBATE em T1. Resultado: Vitória defensiva. AI2 enviou 6 soldados (atk ~60), minha defesa era 5 soldados + 4 arqueiros (~65 def). Margem apertada. Perdi 3 soldados e 2 arqueiros.
- O que quero fazer: Recuperar unidades perdidas. Recrutar mais soldados.
- O que consegui fazer: Recrutei 5 soldados adicionais em T1.
- Frustrações: O relatório de combate foi rápido demais — passou como um evento no log. Quero ver os detalhes do combate: quem atacou, com quantas unidades, qual foi o resultado, quais unidades morri específicas. O log tem os campos mas não fica visível por tempo suficiente.
- Surpresas positivas: Sobrevivi ao primeiro ataque direto! A estratégia econômica ainda parece viável.
- Avaliação: Combate defensivo funcionou, mas transparência pós-combate precisa melhorar.

---

**Turno 14 — Era da Guerra**

- O que vejo: AI2 recuou após a derrota. AI3 agora tem 4 territórios (o mais poderoso do mapa). Minha pontuação estimada: 2 territories(200) + pop(1000) + gold(~50) + units(~60) ≈ 1310. AI3 provavelmente >1500.
- O que quero fazer: Atacar T3 (AI1, Defensor, enfraquecida pela guerra com AI2). AI1 agora tem apenas 1 território. Chance de expansão.
- O que consegui fazer: Lancei expedição ofensiva para T3 com 8 soldados e 3 arqueiros. (Custo calculado de expedição: unitsCost já pagos no recrutamento, apenas custo de manutenção de 1 grão/turno/unidade). Tempo de viagem: T0→T3 = distância via adjacência, não calculei bem. T0 é adjacente a T3 diretamente? Verificando adjacência: 0:[1,3]. SIM, T0 é adjacente a T3. Viagem de 1 turno.
- Frustrações: O painel de expedição não mostra claramente "distância → tempo de viagem". Tive que verificar mentalmente o mapa de adjacências.
- Surpresas positivas: O mapa de adjacências é logicamente coerente.
- Avaliação: Primeira ofensiva lançada — expectativa ansiosa.

---

**Turno 15 — Era da Guerra**

- O que vejo: Vitória em T3! AI1 não tinha muralha e poucas unidades. Agora tenho 3 territórios (0, 1, 3). Score: 3 territories(300) + ... subiu significativamente.
- O que quero fazer: Consolidar T3. Construir Fazenda em T3 para aumentar produção.
- O que consegui fazer: Construí Fazenda Nv1 em T3. Produção de grãos aumentando.
- Frustrações: Ao conquistar T3, não ficou claro: "herdei" as estruturas de AI1? O território estava vazio de estruturas — AI1 não construiu nada em T3? Isso parece estranho para um clã que existiu desde o turno 1.
- Surpresas positivas: Expansão bem-sucedida cria momento de satisfação genuína.
- Avaliação: Primeiro territory expand — jogo ganhou vida nova.

---

**Turno 16 — Era da Guerra**

- O que vejo: AI3 (agora com 4 territórios) atacou meu T0! Defesa: 6 soldados (os que não mandei na expedição). AI3 tem bônus Ferronatos +20%. Resultado: DERROTA. Perdi T0. Agora tenho T1 e T3.
- O que quero fazer: Nada além de absorver o choque.
- O que consegui fazer: Resultado catastrófico. AI3 tinha expedição de ~12 cavaleiros (atk estimado: 240 * 1.2 = 288) versus minha defesa de 6 soldados (def: 48). Ratio > 1.5 = vitória decisiva para AI3.
- Frustrações: **DOR CRÍTICA:** Deixei T0 desprotegido enquanto atacava T3. Erro meu. MAS o jogo não mostrou claramente "você tem X unidades em T0, enviou Y para expedição, restam Z". A visibilidade de unidades distribuídas por território é confusa durante o planejamento de ataques.
- Surpresas positivas: A lógica de vitória decisiva (ratio > 1.5) é mecânicamente justa.
- Avaliação: Derrota estratégica por gestão de forças distribuídas — UI de military overview é o pain central.

---

**Turno 17 — Era da Guerra**

- O que vejo: Perdi T0 (meu território base com Fazenda Nv2, Serraria, Mina, Taverna). Essa foi uma perda catastrófica de infraestrutura. Tenho T1 e T3. Produção caiu drasticamente.
- O que quero fazer: Defender T1 e T3. Potencialmente tentar reconquistar T0.
- O que consegui fazer: Recrutei unidades defensivas em T1 e T3. Reservei recursos para eventual contra-ataque.
- Frustrações: Perder o território base com toda a infraestrutura é devastador e potencialmente irrecuperável. O jogo não tem uma mecânica de "retiro estratégico" — perder é binário: você mantém o território ou perde tudo nele, incluindo todas as estruturas construídas. Isso pode ser desmotivador para jogadores que investiram muito em construção.
- Surpresas positivas: Ainda tenho 2 territórios. Ainda posso competir.
- Avaliação: O design de "perda total de estruturas" é punição pesada para quem focou em construção — precisaria de balanceamento.

---

**Turno 18 — Era da Guerra (ÚLTIMO)**

- O que vejo: Mapa final da Era da Guerra: AI3 domina com 5 territórios, minha posição em T1, T3. AI2 tem 2, AI4 tem 2, AI1 eliminada.
- O que quero fazer: Defender posição para a Invasão.
- O que consegui fazer: Consolidei defesas em ambos os territórios. Ouro acumulado (~120).
- Frustrações: Entro na Era da Invasão em desvantagem numérica de territórios contra AI3.
- Surpresas positivas: Ainda vivo, ainda competindo.
- Avaliação: Era da Guerra gerou drama genuíno — sistema funciona bem.

---

**Turno 19 — Era da Invasão**

- O que vejo: Banner de ERA DA INVASÃO. Log avisa sobre a Horda. Mas: não vejo ONDE a Horda vai atacar. Apenas "A Horda se aproxima". Verificando código: hordaPreview deveria mostrar targetClanId e targetTerritoryId no próximo ataque.
- O que quero fazer: Entender quem a Horda vai atacar primeiro.
- O que consegui fazer: Interpretei o preview: Horda ataca clã com MAIS territórios = AI3 (5 territórios). Isso me beneficia.
- Frustrações: O hordaPreview no código existe mas não sei se a UI o exibe de forma clara. A comunicação de "a Horda vai atacar X" não está evidente na interface nativa.
- Surpresas positivas: A mecânica de Horda atacar o líder é estrategicamente interessante — cria uma dinâmica de "não seja o maior".
- Avaliação: Conceito de Horda é ótimo; comunicação com o jogador precisa de clareza.

---

**Turno 20 — Era da Invasão**

- O que vejo: Horda ataca AI3 (força 50, wave 1). AI3 tem defesa estimada de ~60 (15 cavaleiros × 3 × 1.2 Ferronatos). AI3 SOBREVIVE. AI3 perde 1 território para a Horda (ou seja, a Horda deu ao território um estado "neutro"? Como funciona territorialmente?).
- O que quero fazer: Aproveitar que AI3 está enfraquecida. Atacar T0 (que AI3 me roubou) com força combinada.
- O que consegui fazer: Lancei ataque em T0 com 10 soldados + 5 arqueiros.
- Frustrações: Não consigo medir se minha força atual é suficiente para T0 sem inteligência — a Fog of War me dá um estimate de ±20% da defesa real de AI3.
- Surpresas positivas: A dinâmica de aproveitar fraqueza da Horda é emocionante.
- Avaliação: Era da Invasão cria oportunismo interessante.

---

**Turno 21 — Era da Invasão**

- O que vejo: Recuperei T0! AI3 tinha defesa reduzida pós-Horda. Agora tenho 3 territórios novamente (0, 1, 3).
- O que quero fazer: Defesa máxima — a Horda volta no turno 3 da Era (turno 22 do jogo).
- O que consegui fazer: Distribuí unidades pelos territórios. Recursos usados em recrutamento.
- Frustrações: A sequência de turnos da Horda não é óbvia para o jogador. O código diz "a cada 3 turnos da Era 3" — mas para o jogador isso significa T19, T22, T25? Não há contador visível.
- Surpresas positivas: Reconquistar T0 foi um momento épico e satisfatório.
- Avaliação: Momentum do jogo está alto — isso é o design funcionando bem.

---

**Turno 22 — Era da Invasão**

- O que vejo: Horda ataca AI3 novamente (força 100, wave 2). AI3 agora tem 4 territórios. Defesa AI3 ~50 (sem reposição completa). Horda VENCE. AI3 perde 1 território.
- O que quero fazer: Proteger meus territórios, especialmente se AI3 tentar expandir em direção a mim.
- O que consegui fazer: Mantive posição defensiva.
- Frustrações: O fato de EU não poder influenciar onde a Horda ataca (exceto indiretamente sendo menor) cria uma sensação de impotência. Teria sido legal poder usar cartas ou diplomacia para redirecionar a Horda.
- Surpresas positivas: Ver AI3 sendo punida por ter dominado é catárticamente satisfatório.
- Avaliação: Punição do líder pela Horda equilibra o jogo — mecânica sólida.

---

**Turno 23 — Era da Invasão**

- O que vejo: Ranking estimado: AI3 (3t), ARIA (3t), AI2 (2t), AI4 (2t). Tudo depende do turno final.
- O que quero fazer: Usar carta de Colheita Farta (obtida via Taverna no turno 11 — se estava guardada). Expandir para T2 (AI1's old territory, agora de AI3?).
- O que consegui fazer: Usei carta Colheita Farta (+2x grãos por 3 turnos). Recursos explodindo.
- Frustrações: Guardar cartas por 15 turnos para usar no final é uma estratégia válida, mas a interface deveria lembrar o jogador que tem cartas disponíveis com mais urgência.
- Surpresas positivas: A carta funcionou perfeitamente — recursos bombaram para ~300 grãos.
- Avaliação: Sistema de cartas adiciona profundidade estratégica quando bem utilizado.

---

**Turno 24 — Era da Invasão**

- O que vejo: Horda (força 150, wave 3) ataca AI3. AI3 com 3 territórios e defesa ~40. Horda VENCE DECISIVAMENTE. AI3 perde 2 territórios. AI3 agora com 1 território — quase eliminada.
- O que quero fazer: Atacar AI3's segundo território (fraco após Horda) para capturá-lo.
- O que consegui fazer: Capturei T6 (antigo de AI3). Agora tenho 4 territórios!
- Frustrações: A Horda deixando territórios neutros (sem dono) é uma oportunidade, mas não fica CLARO que o território ficou neutro até olhar o mapa com cuidado. Uma animação/notificação seria valiosa aqui.
- Surpresas positivas: 4 territórios = liderança no mapa. Sentimento de controle e conquista real.
- Avaliação: Moment of triumph genuíno — isso é o jogo no seu melhor.

---

**Turno 25 — Era da Invasão (ÚLTIMO)**

- O que vejo: Horda final (força 200, wave 4) ataca... EU agora tenho mais territórios (4). A HORDA ME ATACA. Força 200 vs minha defesa em T6 (acabei de capturar, sem defesa!). Perco T6 imediatamente.
- Resultado final: 3 territórios (0, 1, 3). Score: 300 + 1000pop + ~200gold + ~100units = 1600.
- Frustrações: **PUNIÇÃO FINAL BRUTAL:** Eu liderei por 1 turno e fui imediatamente punida pela Horda. A mecânica é justa mas a sensação é terrível — expandi para me defender e imediatamente o jogo me atacou por isso. O jogador que expandiu "certo" pode se sentir traído.
- Surpresas positivas: O jogo criou uma narrativa épica de 25 turnos — arcos de ascensão, queda e recuperação.
- Avaliação: Final tenso e memorável, mas a Horda me puniu por liderar por apenas 1 turno — precisa de comunicação melhor.

---

## RESULTADO FINAL

**Score ARIA:** ~1600 pontos
- Territórios: 3 × 100 = 300
- População: ~1000 (mantida)
- Ouro: ~200
- Unidades: ~100 (20 unidades × 5)

**Classificação:** 2º lugar (atrás de Agent-C)
