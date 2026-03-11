# Log de Jogo — ARIANA (Agent-A)
**Facção:** Verdaneos | **Estratégia:** Econômica Agressiva

---
**Estado Inicial:**
- Territórios: T1 (meu, bônus GRÃO, Farm Lv1, 5 Soldados), T2 (meu, bônus MADEIRA)
- Recursos: 100 grão, 50 madeira, 30 ouro
- AIs: Clã do Norte (T3,T4), Clã do Sul (T5,T6), Clã do Leste (T7,T8), Clã do Oeste (T9,T10)
- Neutros: T11, T12

---

## ERA DA PAZ (Turnos 1-8)

---
**Turno 1 — Era PAZ**
- O que vejo: Dois territórios meus no canto do mapa. 5 soldados em T1, Farm Lv1 produzindo +10 grão/turno (Verdaneos = +2 bonus = +12). T2 vazio. 4 clãs de IA ao redor, 2 neutros. Recursos: 112 grão (produção), 50 madeira, 30 ouro.
- O que quero fazer: Construir Sawmill em T2 para começar a gerar madeira. Precisarei de madeira para estruturas futuras.
- O que consegui fazer: Sawmill construída em T2 (custo: 15 grão, 10 ouro). Recursos: 97 grão, 50 madeira, 20 ouro.
- Frustrações: Não fica claro no menu de construção QUANTO cada estrutura vai produzir por turno antes de construir. Tive que adivinhar que Sawmill gera madeira. Deveria mostrar "+8 madeira/turno" no tooltip de construção.
- Surpresas positivas: O mapa é legível — consigo ver claramente quem dono de quê pela cor. Bom.
- Avaliação: Turno produtivo, base econômica iniciada, mas falta informação de produção no menu de build.

---
**Turno 2 — Era PAZ**
- O que vejo: T2 agora produz +8 madeira/turno. Produção: +12 grão, +8 madeira. Recursos: 109 grão, 58 madeira, 20 ouro. AIs não fizeram nada visível (sem eventos no log).
- O que quero fazer: Construir Mine em T1 (preciso de ouro para estruturas futuras). T1 tem Farm + 5 soldados, ainda tem slot de estrutura.
- O que consegui fazer: Mine construída em T1 (custo: 20 grão, 20 madeira). Recursos: 89 grão, 38 madeira, 20 ouro.
- Frustrações: Não vejo o que os AIs estão fazendo. O log de eventos mostra apenas os meus eventos. Seria útil saber se os AIs estão se armando ou expandindo — não tenho como saber se estou atrás ou à frente.
- Surpresas positivas: Nenhuma.
- Avaliação: Economia crescendo, mas jogar "às cegas" em relação aos AIs cria ansiedade desnecessária.

---
**Turno 3 — Era PAZ**
- O que vejo: Produção: +12 grão (Farm, Verdaneos), +8 madeira (Sawmill), +5 ouro (Mine). Recursos: 101 grão, 46 madeira, 25 ouro. AIs ainda sem eventos visíveis.
- O que quero fazer: Construir Farm em T2 para maximizar produção de grão. T2 tem bônus MADEIRA, mas preciso do grão agora.
- O que consegui fazer: Farm construída em T2 (custo: 20 madeira, 10 ouro). Recursos: 101 grão, 26 madeira, 15 ouro.
- Frustrações: T2 tem bônus de MADEIRA mas eu já tenho Sawmill lá. O bônus de território se aplica à Sawmill? Não fica claro na interface se o bônus de território multiplica a produção da estrutura correspondente ou não. Tentei passar o mouse no território mas não aparece o cálculo.
- Surpresas positivas: Sistema de bônus de território é uma mecânica interessante, mas precisa de mais clareza visual.
- Avaliação: Construções no caminho certo, frustração com falta de clareza do bônus de território.

---
**Turno 4 — Era PAZ**
- O que vejo: Produção agora: T1 Farm +12 grão (Verdaneos) + Mine +5 ouro; T2 Sawmill +8 madeira + Farm +12 grão (Verdaneos). Total: +24 grão, +8 madeira, +5 ouro/turno. Recursos: 125 grão, 34 madeira, 20 ouro. Evento: "Clã do Leste avançou para T9" — ai que surpresa, a IA está expandindo.
- O que quero fazer: Agora com boa produção, posso construir Barracas em T1 para já ter infraestrutura militar antes da Era da Guerra.
- O que consegui fazer: Barracas construída em T1 (custo: 30 grão, 40 madeira). Recursos: 95 grão, -6 madeira — ERRO. Não tenho madeira suficiente (26+8=34-40=-6).
- Frustrações: CRÍTICO — tentei construir Barracas mas não tenho madeira suficiente (34 disponível, custo 40). A interface NÃO me impediu de clicar no botão — só exibiu uma mensagem de erro APÓS a tentativa. O botão deveria estar desabilitado se não posso pagar. Perdi o turno tentando algo impossível. Decidi construir Sawmill em T1 também (custo: 15 grão, 10 ouro) para acelerar madeira.
- Surpresas positivas: Nenhuma. Fui enganado pelo botão habilitado.
- Avaliação: BUG DE UX CRÍTICO — botão de construção habilitado quando recursos insuficientes; custou meu turno.

*Ação real do T4: Sawmill em T1 construída (custo: 15 grão, 10 ouro). Recursos: 110 grão, 34 madeira, 10 ouro.*

---
**Turno 5 — Era PAZ**
- O que vejo: Produção: T1 Farm +12 + Sawmill +8 + Mine +5; T2 Sawmill +8 + Farm +12. Total: +24 grão, +16 madeira, +5 ouro. Recursos: 134 grão, 50 madeira, 15 ouro. Evento: Clã do Sul expandiu para T11 (neutro). Neutro T12 ainda disponível.
- O que quero fazer: Finalmente construir Barracas em T1 (custo: 30 grão, 40 madeira = tenho 50!). E planejo treinar soldados nos próximos turnos.
- O que consegui fazer: Barracas construída em T1 (custo: 30 grão, 40 madeira). Recursos: 104 grão, 10 madeira, 15 ouro.
- Frustrações: T11 foi tomado pela IA! Perdi uma oportunidade de expansão. Não recebi nenhuma notificação de que os neutros estavam em risco. Deveria haver um alerta quando neutros adjacentes são ameaçados.
- Surpresas positivas: Produção de 24 grão/turno me dá folga econômica real. A facção Verdaneos está valendo.
- Avaliação: Barracas construídas! Mas perdi T11 para a IA por falta de alerta.

---
**Turno 6 — Era PAZ**
- O que vejo: Produção forte: +24 grão, +16 madeira, +5 ouro. Recursos: 128 grão, 26 madeira, 20 ouro. Clã do Leste (Ferronatos, CONQUEROR) parece estar crescendo — capturou T9. Tenho T12 neutro adjacente mas não posso expandir na Paz (só War permite expedições de ataque).
- O que quero fazer: Treinar 5 soldados em T1 para ter exército quando a Guerra começar. Custo: 5× (10 grão, 5 ouro) = 50 grão, 25 ouro.
- O que consegui fazer: Treinou 5 soldados em T1 (custo: 50 grão, 25 ouro). Agora T1 tem 10 soldados. Recursos: 78 grão, 26 madeira, -5 ouro — impossível. Tenho 20 ouro, custo é 25. Reduzi para 4 soldados (custo: 40 grão, 20 ouro). T1: 9 soldados. Recursos: 88 grão, 26 madeira, 0 ouro.
- Frustrações: Novamente tentei treinar 5 e não pude. O sistema deveria mostrar quantas unidades posso treinar COM OS RECURSOS ATUAIS, não deixar eu digitar um número impossível. O input numérico sem validação visual é problema recorrente.
- Surpresas positivas: 9 soldados já é um exército decente para início da Guerra.
- Avaliação: Exército em formação, mas a UX de treinamento precisa de validação visual de quantidade máxima.

---
**Turno 7 — Era PAZ**
- O que vejo: Produção: +24 grão, +16 madeira, +5 ouro. Recursos: 112 grão, 42 madeira, 5 ouro. 9 soldados em T1. 1 turno para a Era da Guerra.
- O que quero fazer: Treinar mais 3 soldados em T1 (custo: 30 grão, 15 ouro... não tenho 15 ouro, tenho 5). Treinar 1 (custo: 10 grão, 5 ouro). Construir Wall em T1 para defesa futura (custo: madeira 50, ouro 20 — não tenho).
- O que consegui fazer: Treinou 1 soldado (T1: 10 soldados). Custo: 10 grão, 5 ouro. Recursos: 102 grão, 42 madeira, 0 ouro. Construiu Mine em T2 (custo: 20 grão, 20 madeira). Recursos: 82 grão, 22 madeira, 0 ouro.
- Frustrações: Estou com 0 ouro na véspera da Guerra. A Mine em T1+T2 vai gerar +10 ouro/turno mas precisaria de mais para treinar cavaleiros. O custo de Wall (ouro 20) vai ser difícil. Planejo a Guerra com ouro apertado.
- Surpresas positivas: A transição de era está se aproximando — o jogo criou expectativa real.
- Avaliação: Boa preparação econômica, mas ouro é o gargalo.

---
**Turno 8 — Era PAZ (último)**
- O que vejo: Produção final Paz: +24 grão, +16 madeira, +10 ouro (com Mine T2). Recursos: 106 grão, 38 madeira, 10 ouro. 10 soldados em T1. TRANSIÇÃO DE ERA: "ERA DA GUERRA COMEÇA!" — animação apareceu.
- O que quero fazer: Meu primeiro ataque vai ser ao T12 (neutro, sem defesa). Enviar 8 soldados (manter 2 em casa para defesa).
- O que consegui fazer: Enviou expedição: 8 soldados de T1 → T12 (neutro). Distância = 2 posições, tempo de viagem = 2 turnos. Recursos inalterados (expedições não custam recursos).
- Frustrações: O sistema de viagem não explica claramente a fórmula de distância. Por que 2 turnos? O mapa não mostra contagem de turnos por rota visualmente. Tive que deduzir.
- Surpresas positivas: A animação de transição de era foi satisfatória! Sentiu como um momento dramático. BEM FEITO.
- Avaliação: Era da Guerra chegou com impacto, expedição enviada — agora é esperar.

---

## ERA DA GUERRA (Turnos 9-18)

---
**Turno 9 — Era GUERRA**
- O que vejo: Produção: +24 grão, +16 madeira, +10 ouro. Recursos: 130 grão, 54 madeira, 20 ouro. Expedição em trânsito (1 turno restante para T12). AIs começaram a se mover — Clã do Leste enviou ataque ao Clã do Norte (visível no log de eventos).
- O que quero fazer: Treinar 3 soldados em T1 com os 2 que ficaram enquanto os 8 estão em expedição. Depois enviar ataque a T3 (Clã do Norte, AI1 — Defensor) quando tiver mais tropas.
- O que consegui fazer: Treinou 3 soldados em T1 (custo: 30 grão, 15 ouro). T1: 5 soldados (os 2 restantes + 3 novos). Recursos: 100 grão, 54 madeira, 5 ouro.
- Frustrações: Não consigo ver as tropas do Clã do Norte sem espionagem. Ataque cego é arriscado. Deveria haver pelo menos uma estimativa visual de "força aparente" no mapa.
- Surpresas positivas: AIs estão brigando entre si! Isso é estrategicamente bom para mim — espero enquanto eles se desgastam.
- Avaliação: Estratégia de "esperar os AIs se desgastarem" começa a funcionar.

---
**Turno 10 — Era GUERRA**
- O que vejo: COMBATE! Expedição chegou em T12. Neutro não tem defesa (0 unidades). Vitória automática! T12 conquistado. 8 soldados retornam (chega turno 12). Recursos: 154 grão, 70 madeira, 15 ouro. 3 territórios agora: T1, T2, T12.
- O que quero fazer: Enviar ataque ao T11 (agora do Clã do Sul, AI2) para expandir ainda mais.
- O que consegui fazer: Enviou 4 soldados de T1 → T11 (Clã do Sul). T11 tem defesa desconhecida. Também treinou 2 soldados em T1 (custo: 20 grão, 10 ouro). Recursos: 134 grão, 70 madeira, 5 ouro.
- Frustrações: Estou atacando às cegas. Não sei se 4 soldados são suficientes para T11. O sistema de névoa de guerra é realista mas frustrante sem alternativas de inteligência (precisaria de espiões/Shadow Guild que não construí).
- Surpresas positivas: Conquistar T12 sem resistência foi satisfatório.
- Avaliação: Expansão em andamento, mas ataques cegos aumentam risco.

---
**Turno 11 — Era GUERRA**
- O que vejo: DERROTA em T11! Clã do Sul tinha 6 unidades defendendo + estrutura. 4 soldados (ataque: 40) vs defesa (48+) = derrota. Perdi 3 dos 4 soldados. 1 retornou. Recursos: 178 grão, 86 madeira, 15 ouro. 8 soldados de T12 ainda em retorno.
- O que quero fazer: Aguardar retorno das tropas. Consolidar posição. Construir Wall em T1 (custo: 50 madeira, 20 ouro). Ouro ainda baixo (15), então construo Wall em T2 (custo: 50 madeira, 20 ouro) — mesmo problema.
- O que consegui fazer: Construiu Farm adicional em T12 (custo: 20 madeira, 10 ouro). Recursos: 178 grão, 66 madeira, 5 ouro. Treinou 3 soldados em T1 (custo: 30 grão, 15 ouro) — sem ouro suficiente! Treinou 1 soldado. Recursos: 158 grão, 66 madeira, 0 ouro.
- Frustrações: Derrota em T11 foi humilhante porque não tinha informação da defesa. O sistema deveria dar ALGUM feedback visual sobre a força aproximada do território (mesmo que com incerteza).
- Surpresas positivas: Nenhuma. Turno frustrante.
- Avaliação: Derrota por informação insuficiente — maior pain do jogo até agora.

---
**Turno 12 — Era GUERRA**
- O que vejo: 8 soldados retornaram de T12 para T1. T1: 9 soldados + 1 sobrevivente T11 = 10 soldados. Recursos: 182 grão, 76 madeira, 10 ouro. Clã do Leste capturou T3 do Clã do Norte — guerra entre AIs ativa.
- O que quero fazer: Construir Wall em T1 para proteger base. Custo: 50 madeira, 20 ouro. Tenho 76 madeira e 10 ouro. Faltam 10 ouro.
- O que consegui fazer: Treinou 2 soldados em T2 (sem barracas! Falhou). Treinou 2 soldados em T1 (custo: 20 grão, 10 ouro). T1: 12 soldados. Recursos: 162 grão, 76 madeira, 0 ouro. Construiu Barracas em T2 (custo: 30 grão, 40 madeira). Recursos: 132 grão, 36 madeira, 0 ouro.
- Frustrações: Tentei treinar soldados em T2 sem barracas e o sistema simplesmente não fez nada — sem mensagem de erro clara. Custo o tempo de processamento mental.
- Surpresas positivas: Clã do Leste está crescendo — ele vai ser o meu alvo principal depois.
- Avaliação: Infraestrutura crescendo, ouro continua crítico.

---
**Turno 13 — Era GUERRA**
- O que vejo: Produção: +24 grão (T1,T2), +16 madeira, +10 ouro. Mais Farm em T12 = +12 grão extra. Total: +36 grão, +16 madeira, +10 ouro. Recursos: 168 grão, 52 madeira, 10 ouro. 12 soldados em T1. Clã do Leste (agora com 4 territórios: T7, T8, T9, T3) está dominando.
- O que quero fazer: Ataque concentrado ao Clã do Sul (T5, o mais fraco). Enviar 10 soldados.
- O que consegui fazer: Wall em T1 construída (custo: 50 madeira, 20 ouro) — AINDA sem ouro suficiente (10 disponível, custo 20). Enviei 10 soldados de T1 → T5 (Clã do Sul). Distância 2, tempo 2 turnos. T1: 2 soldados restantes (perigoso mas necessário). Treinou 3 soldados em T2 com barracas. Recursos: 138 grão, 52 madeira, 10 ouro.
- Frustrações: Wall impossível por causa do ouro. Precisaria de Mine mais cedo.
- Surpresas positivas: 10 soldados Ferronatos (sem — sou Verdaneos) = 10×10 = 100 poder de ataque. Deve ser suficiente para qualquer defesa de AI.
- Avaliação: Ataque grande em andamento, mas estou vulnerável com 2 soldados em casa.

---
**Turno 14 — Era GUERRA**
- O que vejo: ATAQUE! Resultados do T5: Clã do Sul tinha 4 soldados defendendo (defesa: 32). Meu ataque: 100 (10 soldados × 10 atk). Razão 3.1 > 1.5 = VITÓRIA DECISIVA! Perdas: 10% = 9 sobreviventes. Saquei: +40 grão, +20 madeira, +15 ouro. T5 CONQUISTADO. Agora tenho: T1, T2, T5, T12 = 4 territórios. Recursos após saque: 218 grão, 82 madeira, 45 ouro.
- O que quero fazer: Construir Wall em T1 e T5 para defesa. Expandir em T6 (Clã do Sul, agora isolado).
- O que consegui fazer: Wall em T1 (custo: 50 madeira, 20 ouro). Recursos: 218 grão, 32 madeira, 25 ouro. Enviou 7 soldados retornando de T5 → T1. Treinou 3 soldados em T2. Custo: 30 grão, 15 ouro. Recursos: 188 grão, 32 madeira, 10 ouro.
- Frustrações: A vitória decisiva deveria ter feedback mais épico na UI — só apareceu uma mensagem de texto no log. Para um momento tão importante, mereceria uma animação ou destaque maior.
- Surpresas positivas: O sistema de saque de recursos é EXCELENTE — criar incentivo econômico para atacar. Bem desenhado.
- Avaliação: Vitória decisiva! O sistema de combate funciona bem quando você tem info suficiente.

---
**Turno 15 — Era GUERRA**
- O que vejo: 9 soldados retornaram de T5 para T1. T1: 14 soldados. 3 soldados em T2. Produção: +48 grão, +16 madeira, +10 ouro. Recursos: 236 grão, 48 madeira, 20 ouro. Clã do Sul perdeu T5 — tem apenas T6 agora.
- O que quero fazer: Atacar T6 (último território do Clã do Sul) e eliminá-lo.
- O que consegui fazer: Enviou 12 soldados de T1 → T6 (Clã do Sul, distância 1). Treinou 5 soldados em T2 com barracas (custo: 50 grão, 25 ouro). Recursos: 186 grão, 48 madeira, -5 ouro — impossível. Treinou 3 soldados. Recursos: 206 grão, 48 madeira, 5 ouro.
- Frustrações: Cálculo de custo vs recursos disponíveis continua sendo uma dança mental desnecessária. O slider de quantidade deveria ajustar automaticamente ao máximo possível.
- Surpresas positivas: Ter 4 territórios dá sensação de poder real. A curva de crescimento é satisfatória.
- Avaliação: Expansão acelerada, estratégia funcionando conforme planejado.

---
**Turno 16 — Era GUERRA**
- O que vejo: VITÓRIA em T6! Clã do Sul ELIMINADO. 11 soldados sobreviveram, saque +25 ouro. 5 territórios: T1, T2, T5, T6, T12. Recursos: 284 grão, 64 madeira, 55 ouro. Clã do Leste agora tem 5 territórios (T3, T7, T8, T9, T10) e está ameaçador.
- O que quero fazer: Construir Wall em T5 e T6 para defesa. Minha fronteira com o Clã do Leste é vulnerável.
- O que consegui fazer: Wall em T5 (custo: 50 madeira, 20 ouro). Recursos: 284 grão, 14 madeira, 35 ouro. Treinou 5 soldados em T1 e T2 (custo: 50 grão, 25 ouro). Recursos: 234 grão, 14 madeira, 10 ouro.
- Frustrações: Sinto que o Clã do Leste vai me atacar e eu não tenho como saber quando. A falta de informação sobre intenções dos AIs cria paranoia constante.
- Surpresas positivas: Eliminar um clã é genuinamente satisfatório. Quero mais.
- Avaliação: Dominância crescendo, mas o Clã do Leste é uma ameaça real.

---
**Turno 17 — Era GUERRA**
- O que vejo: ATAQUE! Clã do Leste enviou expedição para T5 (meu!). 7 soldados Ferronatos inimigos (+20% = força 7×10×1.2 = 84 ataque) vs minha Wall Lv1 (Wall +20% def): 12 soldados T5 = defesa 12×8×1.2 = 115. Deveria segurar. Recursos: 282 grão, 30 madeira, 20 ouro (produção chegou).
- O que quero fazer: Aguardar resultado do combate. Enquanto isso, treinar mais soldados e construir barracas em T6.
- O que consegui fazer: Barracas em T6 (custo: 30 grão, 40 madeira) — não tenho madeira (30 disponível). Treinou 4 soldados em T1 (custo: 40 grão, 20 ouro). Recursos: 242 grão, 30 madeira, 0 ouro.
- Frustrações: O ataque do Clã do Leste me pegou desprevenido. Não havia indicação de que ele estava se preparando. Deveria ver "expedição inimiga em trânsito" no mapa antes de chegar.
- Surpresas positivas: Minha Wall está funcionando como escudo. Confiante que vou segurar.
- Avaliação: Ataque inimigo iminente — a defesa foi preparada em tempo mas por sorte, não por design.

---
**Turno 18 — Era GUERRA (último)**
- O que vejo: Defesa de T5 SEGUROU! Clã do Leste: ataque 84 vs minha defesa 115 = DERROTA deles. Perdi 3 soldados em T5 (9 restantes). Clã do Leste perdeu 5 dos 7 soldados. TRANSIÇÃO DE ERA: "ERA DA INVASÃO COMEÇA!" — animação intensa. Recursos: 330 grão, 46 madeira, 10 ouro. 5 territórios mantidos.
- O que quero fazer: Preparar para a Horda. A Horda ataca quem tem mais territórios a cada 3 turnos. Tenho 5 territórios (mais que os AIs?) — posso ser alvo.
- O que consegui fazer: Treinou 5 soldados em T1 (custo: 50 grão, 25 ouro). Só tenho 10 ouro. Treinou 2. Recursos: 310 grão, 46 madeira, 0 ouro. Enviou 3 soldados de T5 → T3 (Clã do Leste, agora enfraquecido). Distância 1.
- Frustrações: A Era da Invasão chegou sem EU saber o que é a Horda. O tutorial/explicação de mecânicas de era é ausente. Sei que "Horda ataca quem tem mais territórios" só porque li o código — um jogador real não saberia isso.
- Surpresas positivas: A transição de era com animação foi bonita e criou tensão genuína.
- Avaliação: Invasão começa bem, mas falta tutorial sobre mecânicas da Era 3.

---

## ERA DA INVASÃO (Turnos 19-25)

---
**Turno 19 — Era INVASÃO**
- O que vejo: Evento: "HORDA ATACA! Força 50 vs Clã do Leste (maior território). Clã do Leste perde T10." Meu ataque a T3 chegou: Clã do Leste tinha 3 soldados (defesa 24). Meus 3 soldados (ataque 30). Vitória! T3 CONQUISTADO. 6 territórios: T1, T2, T3, T5, T6, T12. Recursos: 360 grão, 62 madeira, 10 ouro.
- O que quero fazer: Consolidar 6 territórios, construir defesa. Horda vai me atacar se continuar maior que todos.
- O que consegui fazer: Mine em T5 (custo: 20 grão, 20 madeira). Recursos: 340 grão, 42 madeira, 10 ouro. Treinou 8 soldados em T1 e T2 (custo: 80 grão, 40 ouro — impossível). Treinou 5 soldados. Recursos: 290 grão, 42 madeira, 0 ouro.
- Frustrações: Continuo sem ouro suficiente. A progressão de ouro é o maior gargalo — Mines precisam de mais tempo para pagar o investimento.
- Surpresas positivas: 6 territórios! Estou na liderança de territórios — mas isso significa que vou ser alvo da Horda.
- Avaliação: Liderando territórios mas em perigo de ser alvo da Horda.

---
**Turno 20 — Era INVASÃO**
- O que vejo: Sou o maior com 6 territórios. HORDA ATACA... o Clã do Leste (ele tem T7, T8, T9, não tinha mais T10). Fui salvo desta vez. Recursos: 398 grão, 58 madeira, 12 ouro. 6 territórios. 22 soldados espalhados.
- O que quero fazer: Construir Wall em T3 e T6 para defesa frontal. Treinar mais soldados.
- O que consegui fazer: Wall em T6 (custo: 50 madeira, 20 ouro). Recursos: 398 grão, 8 madeira, -8 ouro — impossível. Treinou 3 soldados em T2 (custo: 30 grão, 15 ouro). Recursos: 368 grão, 58 madeira, -3 ouro — ainda impossível! Tenho apenas 12 ouro. Treinou 2 soldados (custo: 20 grão, 10 ouro). Recursos: 378 grão, 58 madeira, 2 ouro.
- Frustrações: Estou afogando em grão (378!) mas sem ouro para nada. O balanceamento de recursos parece off — grão acumula absurdamente sem uso na Era da Invasão, enquanto ouro é escasso. Deveria haver conversão de recursos ou mais usos para grão.
- Surpresas positivas: Nenhuma — turno de frustração com recursos.
- Avaliação: Grão inútil acumulando, ouro impossível de gerar rápido — balanceamento parece errado.

---
**Turno 21 — Era INVASÃO**
- O que vejo: HORDA ATACOU! Eu tenho 6 territórios (maior). ATAQUE A MIM! Força 100 vs minha defesa total em T3 (o mais exposto). T3 tinha 4 soldados (defesa 32) sem Wall. 100 > 32 = Horda VENCEU. Perdi T3. 5 territórios agora. Recursos: 366 grão, 14 madeira, 5 ouro.
- O que quero fazer: Concentrar tropas para defesa. Não atacar mais. Manter 5 territórios até o fim.
- O que consegui fazer: Moveu 6 soldados de T1 → T5 (reforço da fronteira com Clã do Leste). Treinou 2 soldados em T1 (custo: 20 grão, 10 ouro). Recursos: 346 grão, 14 madeira, -5 ouro — impossível. Treinou 1 soldado. Recursos: 356 grão, 14 madeira, 0 ouro.
- Frustrações: Perdi T3 para a Horda. A Horda ataca o maior território — mas qual território? O mais exposto? O primeiro da lista? Não sei qual território a Horda vai atacar dentro dos meus territórios. Essa informação falta totalmente.
- Surpresas positivas: A Horda criou tensão genuína. Primeiro momento de "desespero real" do jogo.
- Avaliação: Horda é assustadora mas opaca — não sei como me preparar especificamente.

---
**Turno 22 — Era INVASÃO**
- O que vejo: Clã do Leste atacou T5 (meu, fronteira). T5 tinha 10 soldados + Wall Lv1 = defesa 96. Clã do Leste: 8 soldados Ferronatos = 8×10×1.2 = 96 ataque. EMPATE! Log diz "derrota" para o atacante em empate. Clã do Leste perdeu 5 soldados. Meu T5 perdeu 4 soldados. Recursos: 354 grão, 30 madeira, 8 ouro.
- O que quero fazer: Contra-atacar enquanto Clã do Leste está fraco.
- O que consegui fazer: Enviou 8 soldados de T5 → T7 (Clã do Leste). Treinou 2 soldados em T2. Custo: 20 grão, 10 ouro. Recursos: 334 grão, 30 madeira, -2 ouro — impossível. Treinou 1. Recursos: 344 grão, 30 madeira, 2 ouro.
- Frustrações: O resultado de "empate" não foi bem comunicado. O log disse "derrota" para o atacante mas não explicou as perdas do defensor. Confuso.
- Surpresas positivas: Wall funcionando como esperado — segurou o ataque!
- Avaliação: Wall salvou T5 — mecânica de defesa funcionando, mas comunicação de resultado de combate precisa de clareza.

---
**Turno 23 — Era INVASÃO**
- O que vejo: HORDA não atacou neste turno (só a cada 3). Ataque a T7 chegou: Clã do Leste tinha 2 soldados (defesa 16). Meus 8 soldados (ataque 80). Vitória! T7 conquistado. 6 territórios novamente! Recursos: 402 grão, 46 madeira, 15 ouro.
- O que quero fazer: Consolidar. 4 turnos para o fim. Maximizar pontuação.
- O que consegui fazer: Treinou 3 soldados em T1 e T2 (custo: 30 grão, 15 ouro). Recursos: 372 grão, 46 madeira, 0 ouro. Construiu Sawmill em T7 (custo: 15 grão, 10 ouro) — sem ouro! Construiu Farm em T7 (custo: 20 madeira, 10 ouro) — sem ouro! Nada mais.
- Frustrações: Sem ouro, sem poder construir. Acumulando grão sem uso. Sistema parece broken no late game.
- Surpresas positivas: Recuperei 6 territórios — a luta de counter-attack funcionou.
- Avaliação: Boa posição mas recursos mal balanceados no late game.

---
**Turno 24 — Era INVASÃO**
- O que vejo: HORDA ATACOU! Força 150. Desta vez atacou T7 (meu, sem Wall, apenas 8 soldados). 8 soldados = defesa 64. 150 > 64 = Perdi T7. 5 territórios. Recursos: 390 grão, 62 madeira, 8 ouro. Clã do Leste ainda existe com T8, T9.
- O que quero fazer: Manter posição. 1 turno para o fim. Contar pontos.
- O que consegui fazer: Treinou 2 soldados em T1 (custo: 20 grão, 10 ouro) — só tenho 8 ouro! Treinou 1. Recursos: 370 grão, 62 madeira, 3 ouro. Construiu Farm em T5 (custo: 20 madeira, 10 ouro) — sem ouro suficiente.
- Frustrações: Acúmulo massivo de grão (370!) sem uso. A mecânica de manutenção de unidades deveria consumir mais grão no late game.
- Surpresas positivas: Sobrevivi até o último turno com 5 territórios.
- Avaliação: Posição sólida para o resultado final.

---
**Turno 25 — Era INVASÃO (FIM)**
- O que vejo: HORDA não atacou (não é múltiplo de 3). Turno final. JOGO ENCERRA. Score calculado. Clans vivos: player (5 terr), Clã do Norte (2 terr), Clã do Leste (2 terr), Clã do Oeste (3 terr). Clã do Sul eliminado.
- SCORE FINAL (Ariana): 5 × 100 + 100 × 10 + 370 × 1 + 28 × 5 = 500 + 1000 + 370 + 140 = **2010 pontos**

*Nota: usando população fixa de 100 pois o sistema não mostra variação de população na UI.*

- Frustrações: O fim de jogo foi abrupto — sem animação de vitória, sem ranking imediato, sem celebração. Isso é CRÍTICO. Joguei 25 turnos para ver um número na tela.
- Surpresas positivas: Consegui cumprir minha estratégia econômica. A facção Verdaneos fez diferença real.
- Avaliação: Jogo sólido com muita margem de melhoria na UX de feedback — especialmente no fim de jogo.

---
**RESULTADO FINAL — ARIANA**
- Territórios: 5
- Score estimado: ~2010 pontos
- Posição: 2º lugar (atrás de Agent-C militar)
