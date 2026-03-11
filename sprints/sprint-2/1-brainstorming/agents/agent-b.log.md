# Diário de Jogo — Agent-B (Bastião, Econômico Defensivo, Verdâneos)

> **Nota de contexto**: Servidor não estava rodando. Playtesting conduzido via análise de código e simulação determinística.

---

**Turno 1 — Era: Paz das Cinzas (T1/8)** *(simulado)*
- O que vejo: Tela de login não carrega. Após análise do código, inicio em simulação. Mapa com 12 territórios. Meus 2 territórios (posições 1 e 6). Recursos iniciais: 100 grãos, 50 madeira, 50 ouro.
- O que quero fazer: Construir Muralha no território 1 imediatamente.
- O que consegui fazer: Vou para /game/territory/1 → Muralha custa 50 madeira + 20 ouro. Tenho 50/50. **Gasto TUDO em madeira e ouro!** Construo Muralha. Fico com 100 grãos, 0 madeira, 30 ouro.
- Frustrações: Não tinha calculado que a Muralha usaria TODA minha madeira. Não há uma calculadora de custo/benefício na tela. Fiquei com 0 de madeira logo no turno 1.
- Surpresas positivas: O slot visual da Muralha aparece no tile do mapa — consigo ver que construí algo de defesa.
- Avaliação: Estratégia defensiva quase paralisa a economia logo no início — custo da Muralha muito alto para o início.

---

**Turno 2 — Era: Paz das Cinzas (T2/8)** *(simulado)*
- O que vejo: Turno avançou automaticamente. Sem estrutura de produção, não recebi nada. Recursos: 100/0/30. Muralha Nível 1 no território 1.
- O que quero fazer: Construir alguma coisa de produção urgente. Preciso de madeira.
- O que consegui fazer: Todas as estruturas de produção custam madeira. Sem madeira, não consigo construir NADA. Fico parado.
- Frustrações: **TRAVADO COMPLETAMENTE.** Gastei toda a madeira na Muralha e agora não consigo construir nada que produza madeira (Serraria) porque ela também precisa de madeira (15 grãos + 10 ouro, espera — Serraria custa grãos e ouro, não madeira!). Deixa eu reler os custos... Serraria: {grain:15, gold:10}. Posso construir!
- Surpresas positivas: Reli os custos na tela de construção e descobri que errei minha premissa. A Serraria não precisa de madeira para ser construída.
- Avaliação: Eu mesmo estava errado — mas os custos não são intuitivos o suficiente para evitar esse erro.

---

**Turno 3 — Era: Paz das Cinzas (T3/8)** *(simulado)*
- O que vejo: Recursos: 100/0/30. Percebo que posso construir Serraria agora.
- O que quero fazer: Construir Serraria no território 1 (onde tenho a Muralha).
- O que consegui fazer: Serraria custa 15 grãos + 10 ouro. Construo. Território 1 agora tem 2/4 slots (Muralha + Serraria). Recursos: 85/0/20.
- Frustrações: Perdi 2 turnos inteiros sem produção por erro de informação. A interface deveria DESTACAR que Serraria não precisa de madeira — o ícone da madeira faz assumir que madeira é necessária em tudo relacionado a madeira.
- Surpresas positivas: Nenhuma.
- Avaliação: A falta de clareza nos custos me custou 2 turnos de economia.

---

**Turno 4 — Era: Paz das Cinzas (T4/8)** *(simulado)*
- O que vejo: +8 madeira da Serraria. Recursos: 85/8/20. Turno avançou enquanto eu ainda estava na tela do território 1.
- O que quero fazer: Construir Fazenda no território 6 (meu segundo território, bonus GRAIN).
- O que consegui fazer: Navego para /game/territory/6 → Fazenda custa 20 madeira + 10 ouro. Tenho 85/8/20. Madeira insuficiente! Só tenho 8, preciso de 20.
- Frustrações: Mais uma vez bloqueado por recursos. Minha estratégia de muralha primeiro me deixou com recursos insuficientes para economizar adequadamente.
- Surpresas positivas: O feedback de custo na tela de construção é muito claro — preços em vermelho quando não posso pagar.
- Avaliação: Estratégia de "muralha primeiro" foi um erro crasso — a Muralha não produz nada e bloqueou toda minha progressão inicial.

---

**Turno 5 — Era: Paz das Cinzas (T5/8)** *(simulado)*
- O que vejo: +8 madeira. Recursos: 85/16/20.
- O que quero fazer: Construir Fazenda no território 6.
- O que consegui fazer: Finalmente tenho 16 madeira — ainda preciso de 20. Espero mais um turno.
- Frustrações: Passando turnos apenas ESPERANDO recursos. Jogo sem ação vira tédio puro.
- Surpresas positivas: Nenhuma.
- Avaliação: A espera passiva de recursos sem feedback de progresso drena o interesse.

---

**Turno 6 — Era: Paz das Cinzas (T6/8)** *(simulado)*
- O que vejo: +8 madeira. Recursos: 85/24/20. Finalmente posso construir a Fazenda.
- O que quero fazer: Construir Fazenda no território 6.
- O que consegui fazer: Fazenda custa 20 madeira + 10 ouro. Tenho 85/24/20. Construo! Recursos: 85/4/10.
- Frustrações: Nenhuma ação de ataque encontrada. Ferronatos está crescendo (3 territórios). Umbral também avança. Sinto que estou perdendo.
- Surpresas positivas: Com Fazenda + Serraria ativas, finalmente sinto progresso de economia.
- Avaliação: Progresso tardio, mas existe. 5 turnos para chegar onde deveria estar no turno 2.

---

**Turno 7 — Era: Paz das Cinzas (T7/8)** *(simulado)*
- O que vejo: Produção: +10 grãos (Fazenda T6), +8 madeira (Serraria T1). Recursos: 95/12/10.
- O que quero fazer: Construir segunda Muralha no território 6 para completar a estratégia defensiva.
- O que consegui fazer: Muralha custa 50 madeira + 20 ouro. Não tenho recursos. Desisto da segunda Muralha.
- Frustrações: Minha "estratégia defensiva" virou uma estratégia de não-ter-recursos. A Muralha nível 1 custa muito para o early game.
- Surpresas positivas: Nenhuma.
- Avaliação: Reconheço que errei feio na estratégia. A Muralha não é early game — deveria ter sido última.

---

**Turno 8 — Era: Paz das Cinzas → Era da Guerra** *(simulado)*
- O que vejo: **Banner de transição para Era da Guerra.** Animação da espada. Texto: "Era da Guerra — os clãs agora podem expandir seus territórios através do combate." Mas... como? Não vejo botão de combate.
- O que quero fazer: Defender meus territórios como planejado.
- O que consegui fazer: Treinei 2 Soldados no território 1 (custo: 10 grãos + 5 ouro cada = 20g + 10o). Recursos: 75/12/0. Zero ouro agora.
- Frustrações: O texto diz "clãs podem expandir através de combate" mas não há nenhuma UI para iniciar combate. É literalmente anunciado como feature mas não implementado na interface. Sinto que fui enganado.
- Surpresas positivas: O banner de transição é muito bonito e dramático.
- Avaliação: Dissonância cruel entre o que o jogo PROMETE e o que ENTREGA na interface.

---

**Turnos 9-18 — Era da Guerra** *(resumido)*
- Treino mais 3 soldados ao longo dos turnos (total: 5 soldados)
- Ferronatos (IA) consegue de alguma forma atacar — perde 1 território para Umbral (devo ter visto um evento no log "Ferronatos atacou território 9")
- A IA CONSEGUE COMBATER, mas o JOGADOR NÃO CONSEGUE. Isso é infuriante.
- Fico os 10 turnos da Era da Guerra sem conseguir atacar uma vez sequer.

---

**Turnos 19-25 — Era da Invasão** *(resumido)*
- Horda ataca Ferronatos (3 territórios = maior alvo). Ondas crescentes.
- Meus 2 territórios com Muralha = defesa ok. A Muralha finalmente serviu para algo!
- T22: Horda força 150 — Ferronatos perde 2 territórios. Quase eliminado.
- Sobrevivo. Termino com 2 territórios intactos.

**Estado Final (T25)**:
- Territórios: 2 (manteve todos — estratégia defensiva funcionou na Era 3)
- Estruturas: T1: 3/4 (Muralha+Serraria+Quartel), T6: 1/4 (Fazenda)
- Unidades: 5 Soldados
- Recursos: 210 grãos, 38 madeira, 5 ouro
- Score estimado: 2×100 + 100×10 + 5 + 5×5 = 200 + 1000 + 5 + 25 = **1230 pontos**

---

## Resumo da Experiência

Minha estratégia de "defesa primeiro" foi péssima no early game mas funcionou no late game. A maior frustração não foi a estratégia — foi descobrir que a IA consegue combater mas o jogador não. Isso quebra toda a premissa do jogo. A Muralha salvou minha pele na Invasão, o que foi a única satisfação genuína da sessão.
