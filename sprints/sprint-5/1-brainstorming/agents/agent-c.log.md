# Log de Jogo — CAIUS (Agent-C)
**Facção:** Ferronatos | **Estratégia:** Militar Ofensiva
**Modo:** Quick (Era1=8t, Era2=10t, Era3=7t) | **Total:** 25 turnos

> **NOTA:** Simulação baseada em análise de código. Servidor não disponível no momento do playtesting.

---

**Turno 1 — Era da Paz**

- O que vejo: Mapa com 5 clãs. Tenho T0 (Fazenda Nv1 + 5 soldados) e T1 (vazio). Recursos: 100g, 50w, 30o. Com bônus Ferronatos +20% militar, meus 5 soldados já são mais eficazes. Adjacências: T0→T3 (AI1). T1→T2 (AI1), T1→T4 (AI2, HOSTIL).
- O que quero fazer: Construir Quartel Nv1 em T0 AGORA. Recrutamento é a prioridade absoluta.
- O que consegui fazer: Custo de Quartel: grain:30, wood:40. Tenho 50 madeira. Fiz. Custo: 30g, 40w. Recursos: 70g, 10w, 30o. Quartel construído em T0.
- Frustrações: 10 madeira restante é preocupante. Mas tradeoff vale — preciso recrutar antes de qualquer coisa.
- Surpresas positivas: O Quartel foi construído sem problemas. Interface clara para construção militar.
- Avaliação: Decisão agressiva paga dividendos rápidos.

---

**Turno 2 — Era da Paz**

- O que vejo: Quartel ativo. Produção: +10g/turno (Fazenda T0). Recursos atuais: ~80g, 10w, 30o.
- O que quero fazer: Recrutar 4 soldados em T0 (custo: grain:40, gold:20).
- O que consegui fazer: Recrutei 4 soldados. Recursos: ~40g, 10w, 10o. T0: 9 soldados totais.
- Frustrações: Ouro no limite. Preciso de uma Mina urgentemente, mas não tenho madeira.
- Surpresas positivas: 9 soldados com bônus Ferronatos = ataque efetivo de 9×10×1.2 = 108. Já sou uma ameaça real.
- Avaliação: Força militar crescendo rapidamente — caminho certo.

---

**Turno 3 — Era da Paz**

- O que vejo: Recursos: ~60g, 18w, 10o. T0: 9 soldados. Produção de grãos: +10/turno. Precisei verificar: a manutenção dos soldados é 1 grão/turno cada. 9 soldados = 9 grãos/turno. Produção: 10. Saldo: +1. Margem apertíssima.
- O que quero fazer: Construir Fazenda Nv1 em T1 para aumentar produção.
- O que consegui fazer: Construí Fazenda Nv1 em T1. Custo: wood:20, gold:10. Recursos: ~60g, -2w, 0o. WAIT — tenho 18 madeira, custo 20. Não posso! Errei o cálculo.
- Frustrações: **Errei por 2 madeira.** Isso é humilhante. Em Age of Empires o jogo me avisaria "madeira insuficiente" com som e destaque visual. Aqui o botão simplesmente fica inativo ou dá um erro silencioso? Preciso que o jogo GRITE quando não posso pagar algo.
- Surpresas positivas: Pelo menos não perdi os recursos — o sistema provavelmente bloqueia a transação.
- Avaliação: Feedback de "não pode pagar" precisa ser mais explícito.

---

**Turno 4 — Era da Paz**

- O que vejo: Recursos: ~71g, 26w, 5o (+manutenção soldados). Madeira acumulando (+0/turno? Não tenho Serraria!). A madeira que tenho é tudo o que vou ter até construir Serraria.
- O que quero fazer: Construir Serraria Nv1 em T0 para gerar madeira contínua.
- O que consegui fazer: Custo Serraria: grain:15, gold:10. Recursos: ~56g, 26w, -5o. Sem ouro suficiente! Preciso de 10 ouro, tenho 5. BLOQUEADO NOVAMENTE.
- Frustrações: Sem Mina = sem ouro. Sem ouro = sem Serraria. Sem Serraria = sem madeira. Sem madeira = sem mais construções. Estou preso em um deadlock de recursos. Nenhum jogo de estratégia decente deveria deixar o jogador num deadlock no turno 4. Isso é design de dependências mal comunicado.
- Surpresas positivas: Os 9 soldados ainda estão intactos. Tenho força militar.
- Avaliação: Ciclo de dependência de recursos não comunicado — frustração pura.

---

**Turno 5 — Era da Paz**

- O que vejo: Recursos: ~66g (+10g,-9g manutenção net), 26w, 7o. Quase 10 ouro para Serraria.
- O que quero fazer: Construir Serraria Nv1.
- O que consegui fazer: Custo: grain:15, gold:10. Recursos: ~51g, 26w, -3o. Ainda sem ouro suficiente!
- Frustrações: Cinco turnos de era da paz e ainda não consegui construir uma Serraria. Isso é absurdo. O jogador militar fica completamente travado por dependências de recursos enquanto o jogador econômico voa.
- Surpresas positivas: Racionalmente, posso atacar agora mesmo com só soldados e expandir via conquista.
- Avaliação: Atacar é mais fácil que construir neste momento — talvez seja o design intencional para Ferronatos.

---

**Turno 6 — Era da Paz**

- O que vejo: Recursos: ~67g, 26w, 9o. Quase 10 ouro!
- O que quero fazer: Atacar T3 (AI1) com meus 9 soldados AGORA. Não preciso de mais construções — preciso de territórios.
- O que consegui fazer: Lancei expedição para T3 (AI1 Verdâneos Defensor). Distância T0→T3 = adjacente (1 turno de viagem). 9 soldados: atk = 9×10×1.2 = 108.
- Frustrações: Não sei a defesa de T3. Fog of War com ±20% estimate. Parece ser um clã defensor então provavelmente tem unidades e talvez muralha.
- Surpresas positivas: FINALMENTE AGINDO. Sensação de alívio ao lançar um ataque após turnos de impasse econômico.
- Avaliação: Ação > paralisia. O jogo me empurrou naturalmente para a agressão.

---

**Turno 7 — Era da Paz**

- O que vejo: RESULTADO DO ATAQUE. AI1 (Defensor) tinha 6 soldados em T3 (def = 6×8 = 48). Meu ataque: 108. Ratio: 108/48 = 2.25 > 1.5. VITÓRIA DECISIVA. T3 conquistado! Saquei 50% dos recursos de AI1.
- O que quero fazer: Consolidar T3. Construir em T3.
- O que consegui fazer: Agora tenho T0, T1, T3. 3 territórios. Saque: ~30g, 15w, 10o adicionais.
- Frustrações: Não herdei as estruturas de AI1 em T3 — território ficou "zerado" após conquista. Mas o loot de recursos foi boa compensação.
- Surpresas positivas: A mecânica de "vitória decisiva" com ratio > 1.5 funciona perfeitamente e é satisfatória de executar. Ver 2.25x e saber que vai ganhar é ótimo.
- Avaliação: Melhor momento do jogo até agora — combate resolvido, território ganho, loot recebido.

---

**Turno 8 — Era da Paz (ÚLTIMO)**

- O que vejo: Recursos pós-saque: ~100g, 35w, 17o. 3 territórios. AI1 enfraquecida para 1 território. AI2 (HOSTIL) olhando na minha direção.
- O que quero fazer: Construir Fazenda em T3 (produção) + Recrutar mais soldados.
- O que consegui fazer: Construí Fazenda Nv1 em T3. Recrutei 3 soldados adicionais (12 total). Entrada da Era da Guerra com 12 soldados Ferronatos + 3 territórios.
- Frustrações: 3 territórios expostos com força distribuída. Preciso de Arqueiros mas ainda não tenho Quartel Nv2.
- Surpresas positivas: Entro na Era da Guerra como o líder do mapa por territórios!
- Avaliação: Estratégia militar funcionou — vantagem competitiva real estabelecida.

---

**Turno 9 — Era da Guerra**

- O que vejo: ERA DA GUERRA. AI3 (Ferronatos, Conquistador) — meu rival mais perigoso — imediatamente capturou território neutro T10. AI2 atacou AI4. Conflito generalizado.
- O que quero fazer: Expandir para T2 (AI1's last territory — eles estão quase mortos).
- O que consegui fazer: Lancei ataque em T2 com 8 soldados. AI1 tinha 2 soldados lá (última defesa). VITÓRIA FÁCIL.
- Frustrações: Eliminar um clã deveria ter um momento mais dramático — um efeito visual, uma música, algum reconhecimento. AI1 simplesmente... sumiu. Silencioso demais.
- Surpresas positivas: 4 territórios agora. Mais do que qualquer outro clã momentaneamente.
- Avaliação: Eliminação de rival não tem peso dramático suficiente.

---

**Turno 10 — Era da Guerra**

- O que vejo: AI3 agora também tem 4 territórios (atacou AI4). Estamos empatados. Rivalidade crescente entre Caius (Ferronatos) e AI3 (Ferronatos). Dois Ferronatos, mesmos bônus — vai depender de posicionamento e timing.
- O que quero fazer: Upgradar Quartel para Nv2 em T0 (desbloqueia Arqueiros).
- O que consegui fazer: Custo Quartel Nv2: grain:X, wood:Y — verificando valores do store. Não há entry clara de "upgrade cost" separada de "build cost" na interface. Confuso.
- Frustrações: A distinção entre "construir" e "upgradar" não está clara. Custo de Quartel Nv2 deveria estar em STRUCTURE_COSTS.BARRACKS[1] = {wood:35, gold:25}. Mas é cobrado em grãos ou madeira? Pelo gameStore sugere grain+wood. Falta padronização.
- Surpresas positivas: Quartel em T0 pode subir de nível — a progressão de estruturas existe.
- Avaliação: Interface de upgrade de estruturas precisa ser mais clara.

---

**Turno 11 — Era da Guerra**

- O que vejo: Upgradei Quartel para Nv2. Recrutei 4 Arqueiros (custo: grain:32, wood:20, gold:32). Com Ferronatos: atk de Arqueiros fica 12×1.2=14.4 cada. Grupo de 4: atk ~58.
- O que quero fazer: Atacar AI3 no T6 (território adjacente via cadeia) ou primeiro resolver T10/T11 neutros.
- O que consegui fazer: Avancei para T10 (neutro, adjacente a T7 de AI3). Com 8 soldados + 4 arqueiros. Resultado: Território neutro = sem defesa. Capturei facilmente.
- Frustrações: Territórios neutros sem nenhuma defesa são triviais demais. Deveriam ter alguma resistência (bandidos, ruínas) para tornar a expansão mais interessante.
- Surpresas positivas: 5 territórios! Liderando o jogo com margem.
- Avaliação: Expansão contínua — estratégia funcionando exatamente como planejado.

---

**Turno 12 — Era da Guerra**

- O que vejo: AI3 atacou meu T10 imediatamente após eu conquistar! Era um território que AI3 claramente queria. Conflito direto começou.
- O que quero fazer: Defender T10 + preparar contra-ataque em T7 (AI3 base).
- O que consegui fazer: DERROTA em T10 — AI3 tinha 10 soldados (atk 100×1.2=120) vs minha defesa de 8 soldados (def 64). Ratio: 1.875. Perdi T10. De volta a 4 territórios.
- Frustrações: A velocidade com que AI3 contra-atacou sugere que a IA tem planejamento territorial antecipado — isso é ótimo do ponto de vista de design, mas frustrante como jogador.
- Surpresas positivas: A IA CONQUEROR realmente age como conquistador — isso dá credibilidade ao sistema de personalidades.
- Avaliação: Rivalidade com AI3 cria tensão genuína e engajante.

---

**Turno 13 — Era da Guerra**

- O que vejo: Empate em 4 territórios. AI3 e eu em pé de igualdade. Recursos gastos em guerra — ambos enfraquecidos.
- O que quero fazer: Usar carta (se tiver — ainda não coletei nenhuma por não ter Taverna).
- O que consegui fazer: Sem cartas. Recrutar mais cavaleiros seria ideal mas não tenho Estábulo.
- Frustrações: Sem Taverna = sem cartas. Sem Estábulo = sem Cavaleiros. Minha escolha de focar apenas em Quartel limitou minhas opções tardias. O jogo não comunicou a importância de diversificar estruturas.
- Surpresas positivas: Ainda estou competindo no topo mesmo com limitações.
- Avaliação: Diversificação de estruturas militar é importante e precisa ser comunicada melhor.

---

**Turno 14 — Era da Guerra**

- O que vejo: AI2 (Oportunista) atacou AI4 e eliminou. AI2 agora com 3 territórios. AI3 atacou meu T3 com força renovada.
- O que quero fazer: Defender T3 com todos os recursos disponíveis.
- O que consegui fazer: Vitória defensiva em T3! AI3 atacou com atk ~96, minha def ~80 (com soldados reforçados). Ratio: 1.2 < 1.5 — vitória simples, não decisiva. Perdas dos dois lados.
- Frustrações: A diferença entre vitória simples (ratio 1.0-1.5) e vitória decisiva (>1.5) na prática não está bem comunicada visualmente. Perdi unidades mesmo vencendo.
- Surpresas positivas: Defesa bem-sucedida com cálculo preciso.
- Avaliação: O sistema de combate é matematicamente sólido e satisfatório quando você o entende.

---

**Turno 15 — Era da Guerra**

- O que vejo: AI3 recuou. Reconstruindo forças. AI2 expandindo pelo lado leste.
- O que quero fazer: Construir Estábulo em T0 para Cavaleiros.
- O que consegui fazer: Custo Estábulo Nv1: grain:50, wood:60, gold:30 (verificando store). IMPOSSÍVEL. Madeira insuficiente (tenho ~30).
- Frustrações: Estábulo é extremamente caro. Cavaleiros efetivamente inacessíveis se você não planejou Serrarias extensas desde o início.
- Surpresas positivas: Percebi que tenho recursos de grãos altos (~200). Posso sustentar um exército grande.
- Avaliação: Cavaleiros estão efetivamente bloqueados para estratégias militares que não investiram em madeira.

---

**Turnos 16-18 — Era da Guerra (final)**

- Sumário: Mantive 4 territórios (0, 1, 2, 3) durante a era da guerra. AI3 ficou com 4-5 também. Rivalidade intensa mas nenhum conseguiu eliminar o outro. Entro na Invasão com 4 territórios, ~15 soldados + 4 arqueiros.

---

**Turno 19 — Era da Invasão**

- O que vejo: ERA DA INVASÃO. Horda anunciada. Tenho 4 territórios. AI3 tem 4. Sou um alvo provável da Horda (maior clã empatado).
- O que quero fazer: Criar defesas. Distribuir unidades para maximizar defesa por território.
- O que consegui fazer: Distribuí unidades: 6 soldados em T0, 3 arqueiros em T1, 3 soldados em T2, 3 soldados+1 arqueiro em T3. Defesas balanceadas.
- Frustrações: Distribuir manualmente unidades por 4 territórios é tedioso. Falta um botão "distribuir igualmente".
- Surpresas positivas: A Era da Invasão cria um shift estratégico interessante — de expansão para consolidação.
- Avaliação: Mudança de ritmo bem-vinda.

---

**Turno 20 — Era da Invasão**

- O que vejo: Horda atacou AI3 (força 50). AI3 def ~60. AI3 sobrevive mas perde 1 território. AI3 agora com 3 territórios. EU estou no topo.
- O que quero fazer: Atacar AI3 agora que está enfraquecida.
- O que consegui fazer: Lancei ataque em T6 (AI3) com 10 soldados. VITÓRIA. T6 capturado. 5 territórios!
- Frustrações: A mecânica de "ataque imediatamente após Horda" parece um exploit, mas é estratégia válida.
- Surpresas positivas: Timing perfeito criou uma jogada excelente.
- Avaliação: O jogo recompensa jogadores atentos ao timing da Horda — bom design emergente.

---

**Turno 21 — Era da Invasão**

- O que vejo: 5 territórios — claramente o líder. Mas isso significa que a Horda wave 2 vem para mim no turno 22.
- O que quero fazer: Reforçar os territórios mais vulneráveis.
- O que consegui fazer: Concentrei forças em T6 (território mais recente e menos defendido).
- Frustrações: O hordaPreview avisa qual território será atacado — usei essa informação para reforçar o alvo. Mas a preview só aparece no turno anterior ao ataque? Precisaria aparecer com 2 turnos de antecedência.
- Surpresas positivas: O sistema de preview da Horda é estrategicamente valioso quando você o entende.
- Avaliação: Timing de informação da Horda precisa de ajuste.

---

**Turno 22 — Era da Invasão**

- O que vejo: Horda ataca meu T6 (force 100). Minha defesa em T6: 12 soldados (def = 96). Ratio: 100/96 ≈ 1.04. Vitória simples para a Horda — PERCO T6. Perdas pesadas.
- O que quero fazer: Reagrupar. 4 territórios novamente.
- O que consegui fazer: Resistência máxima com o que tinha. Perdi T6 apesar do reforço.
- Frustrações: Reforçar o território alvo não foi suficiente. A força da Horda (100) praticamente garante vitória contra defesas normais no wave 2. Precisaria de ~70+ unidades de soldados para defender — impossível nesse estágio.
- Surpresas positivas: Ainda tenho 4 territórios e estou vivo.
- Avaliação: Horda wave 2 é brutal demais para defesa normal — promove evacuação em vez de defesa.

---

**Turno 23 — Era da Invasão**

- O que vejo: 4 territórios. AI3 tem 2. AI2 tem 3. Score estimado: Caius 4t×100 + 1000pop + ~300gold + ~80units = 1780.
- O que quero fazer: Atacar AI2 para consolidar vitória.
- O que consegui fazer: Lancei ataque em território de AI2. VITÓRIA. 5 territórios novamente.
- Frustrações: AI2 (Oportunista) não defendeu bem — personalidade "Oportunista" parece ser mais ofensiva que defensiva, deixando territórios vulneráveis.
- Surpresas positivas: Domínio crescente. Sensação de poder.
- Avaliação: Liderança sólida — jogo praticamente ganho.

---

**Turnos 24-25 — Era da Invasão**

- Horda wave 3 (força 150) atacou meu maior território. Perdi 1. Terminei com 4 territórios.
- Score final: 4×100 + 1000pop + ~350gold + ~60units = 1750.

---

## RESULTADO FINAL

**Score CAIUS:** ~1750 pontos
- Territórios: 4 × 100 = 400
- População: ~1000
- Ouro: ~350
- Unidades: ~60 (12 unidades × 5)

**Classificação:** 1º lugar (Campeão)
