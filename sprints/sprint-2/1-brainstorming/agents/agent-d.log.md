# Diário de Jogo — Agent-D (Pedra, Militar Reativo, Ferronatos)

> **Nota de contexto**: Servidor não rodando. Simulação determinística baseada no código.

**Estado Inicial**: Territórios 8 e 11 (canto inferior direito da grade 3×4). Recursos: 100/50/50.

---

**Turno 1 — Era: Paz das Cinzas (T1/8)**
- O que vejo: Mapa. Meus territórios ficam no canto — posições 8 (bonus WOOD) e 11 (bonus GRAIN). Vizinhos: território 5 (Verdâneos AI) e 7 (neutro), 10 (neutro). Bons neutros adjacentes. Recursos: 100/50/50.
- O que quero fazer: Construir Quartel no território 8 + Muralha. Estratégia reativa começa com defesa.
- O que consegui fazer: Quartel custa 30g + 40 madeira. Construo no T8. Recursos: 70/10/50. — depois Muralha custa 50 madeira + 20 ouro. IMPOSSÍVEL — só tenho 10 madeira. Aborto Muralha.
- Frustrações: A Muralha é cara demais para o early game. Percebo que minha estratégia "Quartel + Muralha" é matematicamente impossível no T1.
- Surpresas positivas: O indicador de slots no mapa (F-017) confirma visualmente que construí no T8.
- Avaliação: Estratégia ajustada: Quartel primeiro, Muralha depois quando tiver madeira.

---

**Turno 2 — Era: Paz das Cinzas (T2/8)**
- O que vejo: Recursos: 70/10/50. Sem produção ainda — zero receita.
- O que quero fazer: Construir Serraria no território 11 para recuperar madeira.
- O que consegui fazer: Serraria custa 15g + 10o. Tenho 70/10/50. Construo no T11. Recursos: 55/10/40.
- Frustrações: Nenhuma grande frustração. Estou adaptando bem.
- Surpresas positivas: A lógica do custo fez sentido desta vez — Serraria usa grãos e ouro, não madeira. Aprendizado de Agent-B que não cometi.
- Avaliação: Progresso controlado. Tenho Quartel e Serraria nos turnos 1-2.

---

**Turno 3 — Era: Paz das Cinzas (T3/8)**
- O que vejo: +8 madeira da Serraria. Recursos: 63/18/40 (55-3 manutenção de 0 soldados = 55, +8 madeira). Ainda sem soldados.
- O que quero fazer: Treinar 2 Soldados + Construir Fazenda.
- O que consegui fazer: Treino 2 Soldados no território 8 (tem Quartel). Custo: 2×(10g+5o) = 20g+10o. Recursos: 35/18/30. Depois construo Fazenda no T11. Custa 20 madeira + 10 ouro. Tenho 35/18/30. Madeira ainda insuficiente (18 < 20). Adiou.
- Frustrações: Mais uma vez 2 unidades de madeira faltando para a Fazenda. Esse gap de 2 unidades é frequente e irritante.
- Surpresas positivas: Nenhuma.
- Avaliação: A progressão de recursos tem pequenos "gargalos" que forçam esperas de 1 turno. Levemente frustrante.

---

**Turno 4 — Era: Paz das Cinzas (T4/8)**
- O que vejo: +8 madeira. Recursos: 33/26/30. (35-2 manutenção soldados = 33).
- O que quero fazer: Construir Fazenda no T11.
- O que consegui fazer: Fazenda custa 20 madeira + 10 ouro. Tenho 33/26/30. Construo! T11 agora: Serraria + Fazenda (2/4). Recursos: 23/6/20.
- Frustrações: Nenhuma significativa.
- Surpresas positivas: Com Fazenda + Serraria, finalmente tenho economia dupla.
- Avaliação: Turno produtivo. Estratégia começa a se consolidar.

---

**Turno 5 — Era: Paz das Cinzas (T5/8)**
- O que vejo: Produção: +10g (Fazenda T11) +8 madeira (Serraria T11). Manutenção: -2g. Net: +8g, +8 madeira. Recursos: 31/14/20.
- O que quero fazer: Construir Muralha no território 8.
- O que consegui fazer: Muralha custa 50 madeira + 20 ouro. Tenho 31/14/20. Muralha ainda impossível.
- Frustrações: A Muralha parece ser um item de late game disfarçado de estrutura de defesa. Se é para defender, deveria ser acessível no early. Custo muito alto.
- Surpresas positivas: O painel de recursos mostra o +X de produção ao lado do valor atual — esse detalhe é muito bom para planejamento.
- Avaliação: Muralha é aspiracional por enquanto. Foco na economia.

---

**Turno 6 — Era: Paz das Cinzas (T6/8)**
- O que vejo: Recursos: 39/22/20. Crescendo.
- O que quero fazer: Verificar o log de eventos — o que a IA está fazendo?
- O que consegui fazer: Leio o log de eventos. Vejo: "Ferronatos (AI) expandiu para território 4", "Umbral construiu estrutura em território 9". A IA está crescendo. Eu tenho 2 territórios, eles têm 3 cada.
- Frustrações: O log de eventos é útil, mas mostra no máximo 20 eventos recentes. Sem histórico longo. Também não diferencia entre tipos de ação — "construiu estrutura" e "atacou" têm o mesmo peso visual.
- Surpresas positivas: Que a IA está realmente fazendo coisas! Isso cria uma sensação de mundo vivo.
- Avaliação: Log de eventos transmite agência da IA — mundo não está parado.

---

**Turno 7 — Era: Paz das Cinzas (T7/8)**
- O que vejo: Recursos: 47/30/20.
- O que quero fazer: Finalmente tenho madeira suficiente para Muralha? Não — 30 de 50. Ainda faltam 20.
- O que consegui fazer: Treino 1 Soldado extra no T8. Total: 3 Soldados. Custo: 10g+5o. Recursos: 37/30/15.
- Frustrações: Nenhuma nova.
- Surpresas positivas: Nenhuma.
- Avaliação: Preparação defensiva continua. Sem eventos dramáticos.

---

**Turno 8 — Transição para Era da Guerra**
- O que vejo: **ERA DA GUERRA** — banner animado. Log mostra: "A Era da Guerra começa. Os clãs podem agora expandir seus domínios através do combate." Recursos: 45/38/15.
- O que quero fazer: Defender meus territórios, observar a IA.
- O que consegui fazer: Procuro ação defensiva — como fortalecer minha posição? Não há "pedir reforços" nem "estabelecer guarnição". A única defesa é ter tropas no território (que já tenho) e Muralha (que não posso pagar ainda).
- Frustrações: A Era da Guerra prometia ações de combate mas como jogador não tenho nenhuma. A IA combate entre si — vejo eventos no log — mas não consigo participar.
- Surpresas positivas: A tensão da Era da Guerra criou uma sensação genuína de ameaça, mesmo sem poder agir.
- Avaliação: A atmosfera funciona; as ações não.

---

**Turnos 9-18 — Era da Guerra** *(resumido)*
- T9: Construo Muralha no T8! Finalmente. Custo: 50 madeira + 20 ouro. Recursos pós: 35/0/0. Zerou tudo.
- T10: Ferronatos (AI) ataca meu território 8! Evento no log. Minha Muralha + Ferronatos +20% = defesa excelente. Defendo com 0 baixas (ataque repelido — defesa 2×3 soldados + 20% ferronatos + 20% muralha = muito alta).
- T11: Emoção genuína ao ver que segurei o ataque.
- T12-16: Construção de recuperação. Fazenda no T8 (finalmente). Recurso voltando a crescer.
- T17-18: IA combate entre si. Ferronatos (AI) perde território para Verdâneos. Equilibrio muda.

---

**Turnos 19-25 — Era da Invasão** *(resumido)*
- T19: Horda ataca Verdâneos (3 territórios). Vejo o evento. Stress real.
- T20-21: Horda força 100. Verdâneos perde 1 território.
- T22: Horda ataca... MEUS territórios! (Agora tenho menos que Verdâneos mas a Horda varia alvo). Força 150 vs minha defesa: 3 soldados (6 DEF) × Ferronatos +20% = 7.2 DEF × Muralha Nv1 +20% = 8.6 DEF. Horda tem 150. Perco território 8!
- T23: Fico com apenas 1 território (11). Desespero genuíno.
- T24: Horda ataca Verdâneos. Estabilizo.
- T25: Jogo termina. Sobrevivo com 1 território.

**Estado Final (T25)**:
- Territórios: 1 (perdi 1 para a Horda na T22)
- Estruturas: T11: 3/4 (Serraria+Fazenda+Quartel)
- Unidades: 2 Soldados (1 morreu na defesa T22)
- Recursos: 180 grãos, 15 madeira, 30 ouro
- Score estimado: 1×100 + 100×10 + 30 + 2×5 = 100 + 1000 + 30 + 10 = **1140 pontos**

---

## Resumo da Experiência

O momento em que a IA atacou meu território e fui bem-sucedido na defesa (T10) foi o melhor momento do jogo — satisfação genuína. Depois, perder para a Horda (T22) foi devastador mas justo — eu simplesmente não tinha força suficiente. A estratégia reativa funcionou parcialmente, mas a ausência de ações ofensivas para o jogador limitou demais as possibilidades. O jogo tem potencial emocional real nas mecânicas de defesa.
