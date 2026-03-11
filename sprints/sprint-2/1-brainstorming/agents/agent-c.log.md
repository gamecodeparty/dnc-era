# Diário de Jogo — Agent-C (Ferro, Militar Ofensivo, Ferronatos)

> **Nota de contexto**: Servidor não rodando. Simulação determinística baseada no código.

**Estado Inicial**: Territórios 2 e 5 (Ferronatos, bônus +20% militar). Recursos: 100/50/50.

---

**Turno 1 — Era: Paz das Cinzas (T1/8)**
- O que vejo: Mapa limpo. Meus 2 territórios em vermelho. Posição 2 (bonus GOLD) e posição 5 (bonus WOOD). Dois inimigos, dois neutros (posições 4 e 7 — adjacentes a mim!). Território 4 é adjacente ao meu território 5. Preciso desse neutro.
- O que quero fazer: Construir Quartel IMEDIATAMENTE. Depois atacar território neutro 4.
- O que consegui fazer: Navego para /game/territory/2 → Quartel custa 30 grãos + 40 madeira. Tenho 100/50. Construo. Recursos: 70/10/50.
- Frustrações: O Quartel custou quase toda a madeira. Não planejei isso. Achei que ia custar menos.
- Surpresas positivas: A interface de construção é rápida e clara — cliquei, confirmei, pronto.
- Avaliação: Quartel construído no T1. Exatamente como planejei. Recursos baixos mas aceitável.

---

**Turno 2 — Era: Paz das Cinzas (T2/8)**
- O que vejo: Turno avançou. Sem estrutura de produção, produzi: 0. Recursos: 70/10/50.
- O que quero fazer: Treinar Soldados AGORA. Objetivo: 5 Soldados.
- O que consegui fazer: Vou para território 2 (tem Quartel) → Treino 3 Soldados. Custo: 3×(10g+5o) = 30g + 15o. Tenho 70/10/50. Recursos pós-treino: 40/10/35.
- Frustrações: Só posso treinar 1 por vez! Não há opção de "treinar X unidades" — preciso clicar 3 vezes. Clique, clique, clique. Para um jogo de estratégia, isso é tedioso.
- Surpresas positivas: O treino é instantâneo — sem espera de turnos para treinar. Bom!
- Avaliação: Treino funciona, mas UX de treino múltiplo é péssima (1 por vez).

---

**Turno 3 — Era: Paz das Cinzas (T3/8)**
- O que vejo: 3 Soldados em território 2. Recursos: 40/10/35.
- O que quero fazer: Atacar o território neutro 4. Ele é adjacente ao meu 5. ONDE ESTÁ O BOTÃO DE ATACAR?
- O que consegui fazer: Clico no território 4 (neutro) no mapa. Seleção visual (highlight âmbar). Nenhuma opção de ataque aparece. Clico com força. Navego para URLs alternativas. Tentei /game/attack (404). Tentei /game/army. Não há ação de ataque em lugar nenhum.
- Frustrações: **RAIVA.** Eu tenho soldados. Tenho um território adjacente. A guerra é MINHA estratégia. E o jogo não me deixa atacar. Isso não é um jogo de estratégia — é uma simulação passiva.
- Surpresas positivas: Nenhuma.
- Avaliação: Ausência de ataque PvP é o maior defeito do jogo atualmente. É um bloqueio absoluto para estratégias militares.

---

**Turno 4 — Era: Paz das Cinzas (T4/8)**
- O que vejo: Recursos: 40/10/35 (zero produção). Manutenção dos 3 soldados: 3 grãos/turno. Recursos: 37/10/35.
- O que quero fazer: Descobrir se Expedições servem para tomar territórios.
- O que consegui fazer: Navego para seção de Expedições. Entendo que Expedições são para locais especiais (Mina Abandonada, etc.) — NÃO para conquista de território. Dois sistemas completamente separados. Decepcionante.
- Frustrações: Perdi um turno navegando sem resultado. Os soldados estão consumindo recursos sem utilidade.
- Surpresas positivas: A narrativa das expedições é MUITO boa. Quase fiz uma expedição só para ler.
- Avaliação: Expedições são interessantes mas são o sistema errado para minha estratégia.

---

**Turno 5 — Era: Paz das Cinzas (T5/8)**
- O que vejo: Recursos: 34/10/35. Manutenção dos soldados correndo. Começo a ter problema.
- O que quero fazer: Construir Fazenda para ter pelo menos produção básica de grãos.
- O que consegui fazer: Território 2 já tem 1/4 slots (Quartel). Construo Fazenda em território 5. Custo: 20 madeira + 10 ouro. Tenho 34/10/35. Madeira insuficiente. Só tenho 10 de madeira, preciso de 20.
- Frustrações: Não tenho madeira para construir nada. Quartel + 3 soldados no T1/T2 me deixou sem recursos para crescer. Minha estratégia "rushar militar" colapsou a economia.
- Surpresas positivas: Nenhuma.
- Avaliação: Rush militar sem base econômica é suicídio — aprendi da pior forma.

---

**Turno 6 — Era: Paz das Cinzas (T6/8)**
- O que vejo: Recursos: 31/10/35. Grãos caindo (manutenção). Sem produção.
- O que quero fazer: Construir Serraria no território 5 (custa grãos + ouro, não madeira!).
- O que consegui fazer: Serraria custa 15 grãos + 10 ouro. Tenho 31/10/35. Construo! Território 5 agora tem 1/4. Recursos: 16/10/25.
- Frustrações: Dois territórios, 1 estrutura de produção cada (Quartel e Serraria). A IA Verdâneos (Umbral) parece ter 3 estruturas de produção. Estou atrás.
- Surpresas positivas: Finalmente a economia vai melhorar.
- Avaliação: Recuperação tardia. Deveria ter feito isso no T1.

---

**Turno 7 — Era: Paz das Cinzas (T7/8)**
- O que vejo: Produção: +8 madeira da Serraria. Recursos: 16/18/25. (manutenção: -3 grãos → 13 grãos).
- O que quero fazer: Construir Fazenda no território 5 para parar de perder grãos.
- O que consegui fazer: Fazenda custa 20 madeira + 10 ouro. Ainda não tenho 20 madeira (só 18). Não consigo.
- Frustrações: Faltam 2 de madeira. Perco mais um turno esperando. Com 3 soldados consumindo 3 grãos/turno, estou em colapso iminente se não construir fazendas.
- Surpresas positivas: Nenhuma.
- Avaliação: A manutenção de tropas é implacável sem estrutura de produção.

---

**Turno 8 — Era da Guerra começa**
- O que vejo: **TRANSIÇÃO PARA ERA DA GUERRA.** Banner dramático com espada. Coração acelerou — agora devo poder atacar! Recursos: 13/26/25.
- O que quero fazer: ATACAR imediatamente.
- O que consegui fazer: Clico em território inimigo. Nada. Clico em território neutro. Nada. Procuro botão "Atacar" em todo lugar. **Não existe.** Ainda não.
- Frustrações: **PICO DE FRUSTRAÇÃO.** Era da Guerra anunciada como era de combate, e o jogo não fornece nenhuma ação de combate para o jogador. Só a IA combate. Sinto que sou um espectador do meu próprio jogo.
- Surpresas positivas: Trouxe grãos insuficientes para a Era da Guerra. Vou ter problema de manutenção.
- Avaliação: Era da Guerra sem ação de guerra para o jogador humano é ofensivo para a premissa do jogo.

---

**Turnos 9-18 — Era da Guerra** *(resumido)*
- T9: Finalmente construo Fazenda no T5 (tive madeira suficiente). Grãos se estabilizam.
- T10: Construo Fazenda no T2 também. Agora: Quartel + Fazenda no T2, Serraria + Fazenda no T5.
- T11: Treino 2 soldados extras (total: 5 soldados). Custo: 20g + 10o.
- T12: Descubro que a IA Umbral enviou expedição de espionagem — vejo evento no log "Umbral revelou seu território". Meu território foi espionado!
- T13-16: Produção vai bem. Acumulando recursos. Sem combate possível para o jogador.
- T17: Território neutro 4 foi tomado pela IA (Ferronatos perde para... si mesma? Ou Umbral?). Log confuso.
- T18: Ferronatos (eu) ainda tem 2 territórios mas a IA parece estar combatendo entre si.

---

**Turnos 19-25 — Era da Invasão** *(resumido)*
- T19: Horda (força 50) ataca Umbral (3 territórios). Umbral perde 1.
- T20: Construo Muralha no T2 finalmente. Bônus Ferronatos +20% + Muralha = defesa boa.
- T21: Horda (força 100) ataca novamente. Umbral perde mais.
- T22: Umbral eliminado! Só eu (Ferronatos) e Verdâneos restamos.
- T23: Horda (força 150) ataca Verdâneos agora (mais territórios do que eu).
- T24-25: Sobrevivo. Verdâneos também. Empate técnico no final.

**Estado Final (T25)**:
- Territórios: 2 (nunca expandi — sem ação de ataque)
- Estruturas: T2: 3/4 (Quartel+Fazenda+Muralha), T5: 2/4 (Serraria+Fazenda)
- Unidades: 5 Soldados (nunca usados em combate)
- Recursos: 280 grãos, 65 madeira, 40 ouro
- Score estimado: 2×100 + 100×10 + 40 + 5×5 = 200 + 1000 + 40 + 25 = **1265 pontos**

---

## Resumo da Experiência

Joguei o guerreiro que nunca pôde lutar. Cinco soldados treinados, zero batalhas. A ausência de ação de ataque na UI é o defeito mais grave que este jogo tem. Minha estratégia foi 100% bloqueada pela incompletude do sistema. Paradoxalmente, a Era da Invasão foi a parte mais interessante — ver a Horda destruir inimigos criou tensão genuína, mesmo sem minha participação ativa.
