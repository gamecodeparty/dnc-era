# Diário de Jogo — Agent-E (Isabela, Umbral, Espionagem/Diplomacia)

**Resultado final:** Derrota — último lugar (eliminada no turno 38)
**Territórios finais:** 0 | **Recursos finais:** N/A

---

## ERA DA PAZ (Turnos 1–15)

---

**Turno 1 — Era: Paz das Cinzas**
- O que vejo: Jogo iniciado. Escolhi Umbral por causa da mecânica de espião — "+30% eficiência de espiões." Procuro na interface: onde estão os espiões? Vejo no menu lateral: Cartas, Diplomacia, Exército. Nada de "Espiões". Clico em Exército — vejo tipos de unidades disponíveis: SOLDIER, ARCHER, KNIGHT. NENHUM SPY.
- O que quero fazer: Treinar espiões. Não consigo encontrar a opção.
- O que consegui fazer: Nada de útil. Fiquei buscando espiões por 10 segundos e o turno avançou.
- Frustrações: **O bônus do clã Umbral (+30% eficiência de espiões) não existe na prática!** Não há unidade SPY disponível no cliente. A facção prometeu uma mecânica que não foi implementada. Isso é uma ilusão de escolha — escolhi Umbral por um motivo que não existe.
- Surpresas positivas: Nenhuma.
- Avaliação: **PAIN CRÍTICO:** Facção Umbral é um engodo — bônus prometido não implementado.

---

**Turno 2 — Era: Paz das Cinzas**
- O que vejo: Aceito a realidade: sem espiões. Vou focar em diplomacia então.
- O que quero fazer: Ir em /game/diplomacy e ver meu status com todos os clãs. Propor paz com AI2 (Umbral — minha facção? O AI2 também é Umbral! Somos família, tipo).
- O que consegui fazer: Acessou /game/diplomacy. Estado: AI1 NEUTRAL, AI2 HOSTILE, AI3 NEUTRAL, AI4 NEUTRAL. Por que AI2 é HOSTILE? A narrativa diz que são da mesma facção Umbral mas já começam hostis. Isso não faz sentido temático. Propôs paz com AI2. Rejeitado.
- Frustrações: AI2 é da facção Umbral e começa como HOSTILE. A identidade da facção não impacta as relações diplomáticas iniciais. O lore e a mecânica estão desconectados.
- Surpresas positivas: A página de diplomacia existe e é funcional.
- Avaliação: Diplomacia existe mas sem profundidade — relações começam arbitrariamente.

---

**Turno 3 — Era: Paz das Cinzas**
- O que vejo: Preciso construir alguma coisa. Vou focar no que o jogo REALMENTE tem: exploração temática. Procurei locais que combinam com o tema Umbral — "Ruínas do Templo Arcano" (dif:4, min:8 unidades). Quero explorar isso. Mas tenho apenas 5 soldados e o mínimo é 8. Não posso.
- O que quero fazer: Construir Barracks para ter mais soldados e explorar as Ruínas.
- O que consegui fazer: Construiu Farm em T1 (wood:20, gold:10) pois ainda não tinha Barracks. Uh, fiz errado — queria Barracks mas cliquei Farm por acidente.
- Frustrações: Interface de construção lista as opções em ordem que Farm aparece primeiro. Cliquei sem verificar direito. O tempo do timer me pressa e cometo erros.
- Surpresas positivas: Narração textual do jogo é rica em sabor. "Paz das Cinzas" é um nome bonito.
- Avaliação: Erro de interface sob pressão de timer.

---

**Turnos 4–8 — Era da Paz (resumo)**
- T4: Barracks em T0 (grain:30, wood:40). Finalmente.
- T5: Treinou 3 soldados. Agora 8 total. Posso explorar as Ruínas Arcanas (mínimo 8 unidades)!
- T6: Enviou 8 soldados para explorar "Ruínas do Templo Arcano" (dificuldade 4, posição aleatória). Distância: variável. Levou 3 turnos para chegar.
- T7-8: Esperando com apenas 2 soldados em casa. Muito vulnerável.
- T8: Tentou de novo propor paz com AI2. Rejeitado. Propôs paz com AI1 (NEUTRAL). Aceito: "Cla do Norte aceitou sua proposta de paz! TRUSTED." Alegria! Uma aliança.
- Frustrações T8: Minhas tropas foram nas Ruínas e eu fico esperando sem nada para fazer. Sem tropas, sem recursos para construir (madeira zerada). Parecia que o jogo pausou para mim.

---

**Turno 9 — Era: Paz das Cinzas**
- O que vejo: Tropas ainda viajando para as Ruínas. 1 turno restante para chegada. 2 soldados em T0 defendo. Mine em T0 produziu ouro.
- O que quero fazer: Construir Sawmill em T1 com o pouco de wood acumulado.
- O que consegui fazer: Sawmill em T1 (grain:15, gold:10). T1: Farm + Sawmill.
- Frustração: Não há muito para fazer quando a maioria das tropas está em expedição. O jogo fica "vazio" nesses momentos.
- Avaliação: Turno de espera — mecânica de expedições cria longos períodos de inatividade.

---

**Turno 10 — Era: Paz das Cinzas**
- O que vejo: Evento: "Expedição chegou às Ruínas do Templo Arcano..." + narração: "Armadilhas mágicas cobraram seu preço, mas alguns tesouros foram resgatados." PARTIAL! Resultado: +0 grain, +0 wood, +52 gold. Retorno em 3 turnos (distância 3).
- O que quero fazer: 52 gold! Isso é muito para uma exploração parcial. Animado.
- O que consegui fazer: Nenhuma ação disponível útil. Esperou.
- Frustração: Resultado "partial" rendeu 52 gold mas eu não sei exatamente o que determinou o resultado. Código mostra: `roll = Math.random()*100 + power` vs `threshold = difficulty*30 = 120`. Com 8 soldados de atk:10 = poder 80. Roll: 80 + random(0-100). Para sucesso precisaria de roll > 1.5*120=180, para parcial roll > 120. Com poder 80: precisaria de random > 40 para parcial. Provável parcial, improvável sucesso. Mas **o jogador não tem como saber isso.** Nenhuma indicação de probabilidade de sucesso.
- Surpresas positivas: 52 gold de uma exploração foi excelente! Animação de retorno daria um bom moment de satisfação se houvesse feedback adequado.
- Avaliação: Exploração rendeu bem mas probabilidades são invisíveis.

---

**Turnos 11–15 — Era da Paz (resumo)**
- T12: Tropas retornaram com 52 gold. Recursos: 140 grain, 25 wood, 82 gold.
- T13: Construiu Mine em T0 para mais produção de ouro.
- T14: Tentou explorar Torre do Eremita (dif:1, min:2). Enviou 3 soldados.
- T15: **Era da Guerra!** Carta recebida: "Sabotagem" (destrói 1 estrutura inimiga). Perfeita para Isabela!
  Tropas ainda na Torre do Eremita — vão retornar durante a Era da Guerra.
- Estado final da Paz: 2 territórios, 5 soldados em casa + 3 em expedição, 140 grain, 25 wood, 82 gold.
- **Crítica maior:** O bônus Umbral NUNCA apareceu. Joguei 15 turnos com uma facção cuja mecânica central não existe. Sem espiões, sem bônus real. Sinto que fui enganada na seleção de facção.

---

## ERA DA GUERRA (Turnos 16–35)

---

**Turno 16 — Era: Guerra**
- O que vejo: Era da Guerra. 5 soldados em T0. Isso é muito pouco para atacar qualquer coisa.
- O que quero fazer: Usar carta Sabotagem em AI3 (destruir Wall deles) para facilitar futuro ataque.
- O que consegui fazer: Usou carta Sabotagem em /game/cards. Evento: "Sabotagem! Uma estrutura de Cla do Leste foi destruída." Mas QUE ESTRUTURA? Não sabe. Não sabe se era a Wall ou uma Farm.
- Frustrações: Sabotagem é aleatória! Não posso escolher qual estrutura destruir. Nem ver qual foi destruída. É um poder cego. A mecânica de "espionagem" que existe (via carta) é igualmente cega que tudo mais.
- Surpresas positivas: O conceito da carta Sabotagem é ótimo — destruir infraestrutura inimiga de longe.
- Avaliação: Sabotagem tem potencial mas carece de controle e feedback.

---

**Turno 17–20 — Era da Guerra (resumo)**
- Isabela com apenas 5 soldados tentou defender e expandir.
- T17: Tentou conquistar T10 (Neutro). 5 soldados vs 0 defesa. Vitória! +1 território.
- T18: AI2 (Sul, OPPORTUNIST) atacou T1. **Perdi T1.** Evento: "Cla do Sul conquistou território 2."
  Agora tenho T0 e T10.
- T19: Tentou propor paz com AI2. Rejeitado.
- T20: AI2 atacou T10. **Perdi T10.** Agora tenho apenas T0.
- Recursos em T20: 80 grain, 10 wood, 90 gold. 3 soldados sobreviventes.

---

**Turno 21–35 — Era da Guerra (resumo)**
- Isabela entrou em modo pânico total.
- Treinou soldados quando possível mas nunca o suficiente.
- T25: Tentou comprar paz com AI2 com "Trégua Forçada" (carta que não tinha — já usara Sabotagem). Não tinha mais cartas.
- T28: AI2 atacou T0 com força esmagadora. **Defendeu, mas apenas porque tinha Wall.**
- T30: AI3 atacou T0 enquanto AI2 estava ocupado em outro lugar. Wall novamente defendeu.
- T33: AI2 atacou T0 novamente com força maior. **PERDI T0. Eliminada.**
- Evento: "Cla da Jogadora foi eliminada. Todos os territórios perdidos."
- T38 (cronologia da eliminação): Isabela foi eliminada no turno 33.

---

## Resumo Geral

**Pontos altos:**
- Exploração das Ruínas Arcanas foi satisfatória narrativamente
- O conceito de Sabotagem via carta é bom
- Wall salvou situações críticas

**Pontos baixos:**
- **CRÍTICO: Facção Umbral não tem espião implementado** — promessa não cumprida na seleção de facção
- Sabotagem não permite escolher alvo da estrutura — mecânica cega
- AI2 começa como HOSTILE apesar de ser mesma facção (Umbral) — incoerente
- Sem tropas suficientes para uma estratégia de espionagem — chicote sem cobra
- Eliminação sentiu-se inevitável desde o turno 10 — desvantagem permanente por não ter espiões
