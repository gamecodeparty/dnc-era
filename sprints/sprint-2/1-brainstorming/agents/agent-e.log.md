# Diário de Jogo — Agent-E (Vespera, Espionagem/Diplomacia, Umbral)

> **Nota de contexto**: Servidor não rodando. Simulação determinística baseada no código.

**Estado Inicial**: Territórios 0 e 9 (extremos do mapa — canto superior esquerdo e inferior esquerdo). Recursos: 100/50/50.

---

**Turno 1 — Era: Paz das Cinzas (T1/8)**
- O que vejo: Meu clã em roxo. Territórios 0 (bonus GRAIN, canto superior esquerdo) e 9 (bonus GRAIN também). Interessante — dois territórios de grãos. Adjacente ao neutro 3 (posição 3). E ao território 1 (Verdâneos AI?). Recursos: 100/50/50.
- O que quero fazer: Construir Guilda das Sombras IMEDIATAMENTE. A narrativa Umbral me chama.
- O que consegui fazer: Navego para /game/territory/0 → Guilda das Sombras custa 20 madeira + 30 ouro. Tenho 100/50/50. Construo! Recursos: 100/30/20. Slot 1/4 no T0.
- Frustrações: A Guilda das Sombras é a única estrutura sem tooltip claro de benefício passivo. Diz "Treina Espiões para revelar tropas inimigas" — mas qual o mecanismo exato? Por quantos turnos a revelação dura? Preciso de mais info.
- Surpresas positivas: O ícone de Eye (olho) para Guilda das Sombras é lindíssimo e temático. A estética Umbral está funcionando.
- Avaliação: Primeira ação executada. A falta de detalhes sobre duração da revelação de espionagem é preocupante.

---

**Turno 2 — Era: Paz das Cinzas (T2/8)**
- O que vejo: Recursos: 100/30/20. Turno avançou. Nenhuma produção ainda.
- O que quero fazer: Treinar 2 Espiões.
- O que consegui fazer: Na tela do território 0 (tem Guilda das Sombras), vejo a opção de treinar Espião. Custo: 5g + 10o. Treino 2. Custo total: 10g + 20o. Recursos: 90/30/0. Zero ouro!
- Frustrações: **Ouro zerado no T2.** O Espião custa 10 ouro a unidade — mais caro que Soldados (5 ouro). Com 0 ouro, não posso construir Fazenda (precisa de 10 ouro) nem mais nada que precise de ouro.
- Surpresas positivas: Espiões aparecem imediatamente — sem tempo de construção. Satisfatório.
- Avaliação: Treino de Espiões mais caro do que esperado — esgotou o ouro completamente.

---

**Turno 3 — Era: Paz das Cinzas (T3/8)**
- O que vejo: Recursos: 90/30/0. Manutenção: 2 espiões × 1 grão = 2 grãos. Agora tenho 88/30/0.
- O que quero fazer: Usar os Espiões para revelar territórios inimigos!
- O que consegui fazer: Vou para /game/army ou onde estão as ações de espiões... Descubro a seção de Expedições. Lá tem opção "Espionagem" como tipo de expedição. Seleciono território inimigo (Ferronatos AI, posição 2). Envio 1 Espião em missão de espionagem.
- Frustrações: O fluxo para usar espiões não é óbvio. Parecia que Espionagem seria uma ação direta (clique no território inimigo → opção Espionar). Em vez disso, é uma Expedição — que leva TURNOS para chegar. Não é instantâneo.
- Surpresas positivas: A narrativa da expedição de espionagem é imersiva: "Seu espião parte nas sombras da noite..."
- Avaliação: Espionagem funciona mas via Expedição (não direta) — descoberta que não estava no tutorial.

---

**Turno 4 — Era: Paz das Cinzas (T4/8)**
- O que vejo: Espião em missão, turnsRemaining: 1. Próximo turno retorna. Recursos: 87/30/0.
- O que quero fazer: Construir Fazenda para recuperar economia de grãos. Mas preciso de ouro (10o) e estou zerado.
- O que consegui fazer: Não consigo construir nada que precise de ouro. Construo Serraria no T9 (custa 15g + 10o... ops, precisa de ouro também). TRAVADO.
- Frustrações: **Situação de lock econômico.** Sem ouro, não consigo construir NADA. Todas as estruturas precisam de pelo menos algum ouro. Fiquei preso pelos 20 ouro gastos nos espiões.
- Surpresas positivas: Nenhuma.
- Avaliação: Treinar espiões antes de ter base econômica foi um erro que bloqueou completamente o progresso.

---

**Turno 5 — Era: Paz das Cinzas (T5/8)**
- O que vejo: **Espião retornou!** Evento no log: "Espião Umbral revelou tropas em território Ferronatos-2. Tropas: 5 Soldados. Estruturas: Quartel." Umbral tem bônus de 30% → 100% de sucesso na espionagem. A informação é correta!
- O que quero fazer: Ver as informações reveladas no mapa. O território 2 agora tem ícone de olho (Eye icon)?
- O que consegui fazer: Vejo o tile do território 2 com um ícone de olho roxo no canto superior direito. Hover mostra: "Tropas: 5 | Estruturas: 1". EXCELENTE! A informação está disponível. Revelação dura 5 turnos (expiresAt = revealedAt + 5).
- Frustrações: Nenhuma neste turno — foi a primeira satisfação genuína do jogo.
- Surpresas positivas: **O ícone de olho com hover revelando detalhes é elegante e satisfatório.** Isso é design de jogo bem feito.
- Avaliação: O sistema de espionagem, quando funciona, é muito satisfatório. A execução visual é excelente.

---

**Turno 6 — Era: Paz das Cinzas (T6/8)**
- O que vejo: Recursos: 86/30/0. Ainda sem ouro. A revelação de espionagem ainda está ativa (expira T10).
- O que quero fazer: Explorar diplomacia. Navego para /game/diplomacy.
- O que consegui fazer: Tela de diplomacia mostra os outros clãs com status (NEUTRAL/TRUSTED/HOSTILE). Há botões de "Propor Aliança" e "Declarar Hostilidade". Clico em "Propor Aliança" com Verdâneos.
- Frustrações: Não há feedback claro do que a Aliança FAZ mecanicamente. "Aliados não se atacam por 15 turnos" — ok, mas o Verdâneos (AI) vai aceitar? Não há resposta da IA na mesma sessão. Enviei uma proposta e... nada. Não sei se foi aceita.
- Surpresas positivas: A tela de diplomacia existe e tem opções reais. Positivo.
- Avaliação: Diplomacia existe mas sem feedback de aceitação/rejeição é uma caixa preta.

---

**Turno 7 — Era: Paz das Cinzas (T7/8)**
- O que vejo: Sem resposta da aliança. Recursos: 86/30/0 + produção 0. Sem economia significa que os grãos são apenas os 100 iniciais menos manutenção.
- O que quero fazer: Construir Mina para gerar ouro — mas custa 20g + 20 madeira. Tenho 84 grãos e 30 madeira. FINALMENTE POSSO!
- O que consegui fazer: Construo Mina no território 9. Custo: 20g + 20 madeira. Recursos: 64/10/0. Território 9: 1/4 (Mina).
- Frustrações: A Mina deveria ser minha PRIMEIRA construção dado meu problema de ouro. Mas eu não sabia que ficaria sem ouro tão cedo. A interface não avisa quando um recurso está prestes a ser esgotado.
- Surpresas positivas: Nenhuma.
- Avaliação: Tardia, mas finalmente tenho um caminho para gerar ouro.

---

**Turno 8 — Transição para Era da Guerra**
- O que vejo: **ERA DA GUERRA** — banner. +5 ouro da Mina (produção). Recursos: 62/10/5.
- O que quero fazer: Usar carta Sabotagem para destruir estrutura inimiga (tenho carta na mão?).
- O que consegui fazer: Navego para /game/cards. Vejo minhas cartas. Tenho: Informante (revelar tropas) e Trégua Forçada. Não tenho Sabotagem. E o Informante faz o que o Espião já faz — redundância irritante.
- Frustrações: As cartas que tenho duplicam funcionalidades que já possuo (Informante = Espião). Precisaria de Sabotagem ou Reforços para fazer algo novo. O sistema de cartas parece aleatório — não há controle sobre quais recebo.
- Surpresas positivas: Ter Trégua Forçada pode ser útil se alguém me atacar.
- Avaliação: O sistema de cartas é opaco — não sei como recebo novas cartas, nem qual a probabilidade de cada uma.

---

**Turnos 9-18 — Era da Guerra** *(resumido)*
- T9: Mina produz +5 ouro. Construo Fazenda no T0 (20 madeira + 10 ouro). Primeiro passo econômico real.
- T10: Revelação de espionagem expirou. Reenvio espião ao T2 de Ferronatos.
- T12: Uso carta Trégua Forçada — impede ataque da IA Ferronatos por 3 turnos. Evento no log.
- T14: Ferronatos ataca meu território após trégua expirar. Defendo com 2 espiões (0 ataque/defesa) — PERCO o território 0!
- T15: Fico com apenas 1 território (9). Desespero.
- T16-18: Espiao revela que Ferronatos tem 6 soldados. Informação útil mas sem ação de ataque para reagir.

---

**Turnos 19-25 — Era da Invasão** *(resumido)*
- T19: Horda ataca Ferronatos (4 territórios agora = maior alvo). Ferronatos perde 1.
- T20: Meu único território (9) produz grãos (Fazenda T9) + ouro (Mina T9). Acumulo.
- T21: Horda força 100. Ferronatos perde mais. Umbral (eu) não é alvo por ter menos territórios.
- T22-25: Sobrevivo com 1 território até o fim.

**Estado Final (T25)**:
- Territórios: 1 (perdi 1 para Ferronatos na Era da Guerra por falta de defesa militar)
- Estruturas: T9: 3/4 (Mina+Fazenda+Guilda das Sombras), T0: perdido
- Unidades: 2 Espiões
- Recursos: 150 grãos, 10 madeira, 55 ouro
- Score estimado: 1×100 + 100×10 + 55 + 2×5 = 100 + 1000 + 55 + 10 = **1165 pontos**

---

## Resumo da Experiência

A espionagem foi o destaque genuíno — o ícone de olho com informações reveladas é design elegante. Mas focar em espionagem sem tropas militares foi suicídio: perdi um território porque espiões têm 0 de defesa. O sistema de cartas é opaco demais — não entendi como receber novas cartas nem qual era minha estratégia com elas. A diplomacia é uma caixa preta. Apesar de tudo, os momentos de espionagem bem-sucedida foram os mais satisfatórios da sessão.
