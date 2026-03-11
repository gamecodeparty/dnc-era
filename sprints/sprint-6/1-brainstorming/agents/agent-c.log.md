# Log de Jogo — CAIUS (Agent-C)
**Facção:** Ferronatos | **Estratégia:** Militar Ofensiva
**Sprint:** 6 | **Modo:** Rápido (Era1=8t, Era2=10t, Era3=7t)

**NOTA:** Campeão do Sprint 5. Testando se a dominância militar ofensiva se mantém e avaliando as novas features de visualização de combate.

---

## ERA 1 — Paz das Cinzas (Turnos 1–8)

---

**Turno 1 — Era Paz**
- O que vejo: Recursos: Grão=100, Madeira=50, Ouro=50. Novo: **display +0/t em todos os recursos.** Bom feature para novatos mas eu já sei que preciso de Quartel primeiro.
- O que quero fazer: Quartel Nv1 imediato — minha build order do Sprint 5.
- O que consegui fazer: Construi Quartel Nv1 em T0 (custo: 20 madeira, 15 ouro). Madeira=30, Ouro=35. Produção: ainda 0/t (sem fazendas).
- Frustrações: Display mostra +0/t para grão — tudo bem, sei que isso muda quando construir fazendas. Mas para um novato isso pode assustar.
- Surpresas positivas: Sem surpresas — executei a build order com eficiência.
- Avaliação: Quartel no T1 — build order militar iniciada conforme planejado.

---

**Turno 2 — Era Paz**
- O que vejo: Grão=100, Madeira=30, Ouro=35. Quartel disponível para recrutamento.
- O que quero fazer: Recrutar 4 soldados — base de ataque.
- O que consegui fazer: Recrutei 4 soldados (custo: 40 grão, 20 ouro). Grão=60, Ouro=15. 4 soldados em T0.
- Frustrações: Ouro em 15 logo no T2. Sem Mina, vou ficar sem ouro rapidamente.
- Surpresas positivas: 4 soldados no T2 — posição ofensiva estabelecida.
- Avaliação: Força de ataque criada mas ouro está baixo — timing crítico.

---

**Turno 3 — Era Paz**
- O que vejo: Grão=60, Madeira=30, Ouro=15. Vizinhos: T3 (meu), T4 (neutro), T1 (AI1 — Ferronatos também).
- O que quero fazer: Atacar território neutro T4 com todos os 4 soldados.
- O que consegui fazer: Abri ExpeditionModal. **NOVO: O mapa destaca em azul todos os territórios dentro do range de ataque** — T4 e T1 ficaram iluminados. Muito útil para visualizar alcance. Selecionei T4 (neutro).
  - CombatPreview: Ataque = 4×2=8. Ferronatos +20% = 9.6. Defesa = 0 (neutro).
  - **NOVO: Texto explicativo "Vitória Decisiva: seu ataque supera 1.5× a defesa. Conquista garantida."** Excelente confirmação.
  - Conquistei T4!
- Frustrações: O highlight de alcance mostrou T1 (AI1) como atacável mas eu não queria atacá-lo ainda. Poderia confundir um novato que acha que DEVE atacar tudo iluminado.
- Surpresas positivas: O texto "Conquista garantida" no preview dá confiança total para prosseguir.
- Avaliação: Primeiro território conquistado no T3 — build order executada perfeitamente.

---

**Turno 4 — Era Paz**
- O que vejo: Grão=60, Madeira=30, Ouro=15. 3 territórios (T0, T3, T4). 0 soldados (todos foram para T4 na conquista).
- O que quero fazer: Construir Fazenda — precisei perceber que não tenho produção de grão. Vou esgotar antes da guerra.
- O que consegui fazer: Construi Fazenda Nv1 em T0 (custo: 10 madeira, 5 ouro). Madeira=20, Ouro=10. Produção: +10/t grão (sem bônus — Ferronatos é military, não grain).
- Frustrações: Display de produção mostra que meu grão está em queda livre — sem produção por 3 turnos, gastei 40 de 100. Demorei demais para construir Farm. **A ausência de feedback "seu grão está caindo" nos primeiros turnos é um problema.**
- Surpresas positivas: Fazenda agora mostra +10/t. Ao menos sei onde estou.
- Avaliação: Erro estratégico corrigido tarde — Fazenda deveria ter vindo antes do recrutamento massivo.

---

**Turno 5 — Era Paz**
- O que vejo: Grão=70, Madeira=28, Ouro=15. Produção: +10/t grão.
- O que quero fazer: Construir Mina para ouro.
- O que consegui fazer: Construi Mina Nv1 em T3 (custo: 15 madeira, 5 ouro). Madeira=13, Ouro=10. Produção: +5/t ouro.
- Frustrações: Madeira muito baixa (13). Se precisar de mais estruturas ou recrutar, estou travado.
- Surpresas positivas: Agora gero grão + ouro. Estabilidade econômica iniciada.
- Avaliação: Economia inicializada tardiamente mas funcional.

---

**Turno 6 — Era Paz**
- O que vejo: Grão=80, Madeira=21, Ouro=15. 3 territórios. Símbolo de ameaça em T1 (AI1): "Média".
- O que quero fazer: Recrutar 2 soldados para recompor força de ataque.
- O que consegui fazer: Recrutei 2 soldados em T0 (custo: 20 grão, 10 ouro). Grão=60, Ouro=5.
- Frustrações: Ouro em 5. Sempre esse gargalo.
- Surpresas positivas: 2 soldados + 4 em T4 = 6 soldados total.
- Avaliação: Força de ataque reconstruída mas ouro em estado crítico.

---

**Turno 7 — Era Paz**
- O que vejo: Grão=70, Madeira=29, Ouro=10. AI1 tem "Ameaça Média" em T1 adjacente. O fog of war mostra "?" nos territórios de AI1 — não sei a força deles.
- O que quero fazer: Atacar AI1 em T1 antes que eles se fortaleçam.
- O que consegui fazer: CombatPreview para T1:
  - Ataque: 2 soldados × 2 = 4. Ferronatos +20% = 4.8.
  - Defesa: "?" — fog of war. Escala de ameaça indica "Média: estimativa 2-5 unidades".
  - Threshold: preciso > defesa × 1.5. Com defesa mínima de 2, preciso > 3. Tenho 4.8. Mas se defesa for 5, preciso > 7.5. NÃO TENHO.
  - **NOVO INSIGHT: O fog of war e a escala de ameaça me fazem calcular risk/reward antes de atacar.** Decidi NÃO atacar — risco alto.
- Frustrações: A escala de ameaça é vaga demais. "Estimativa 2-5 unidades" é um range de 3 unidades — a diferença entre vencer facilmente e perder feio.
- Surpresas positivas: A mecânica de fog + escala de ameaça me FORÇOU a pensar estrategicamente em vez de só clicar atacar. Isso é bom design.
- Avaliação: Decidi não atacar por risco — fog of war criou decisão estratégica genuína.

---

**Turno 8 — Era Paz (ÚLTIMO)**
- O que vejo: Grão=80, Madeira=37, Ouro=15. 3 territórios. 6 soldados.
- O que quero fazer: Atacar território neutro T6 que está com "Ameaça Baixa" (provavelmente 0-1 unidade).
- O que consegui fazer: Ataquei T6 com 4 soldados. CombatPreview: "Ataque=9.6. Defesa estimada: 0-1. Vitória Decisiva confirmada." Conquistei T6. 4 territórios!
- Frustrações: Termino Era da Paz com menos soldados do que o ideal. Perdi força em T4 e não recompus totalmente.
- Surpresas positivas: 4 territórios — posição dominante para Era da Guerra.
- Avaliação: 4 territórios confirmam posição de liderança mas exército precisa crescer.

---

## ERA 2 — Era da Guerra (Turnos 9–18)

---

**Turno 9 — Era Guerra**
- O que vejo: AI3 (Ferronatos também) — símbolo "Ameaça Alta" em T5 adjacente ao meu T6. Tenho 6 soldados mas distribuídos mal.
- O que quero fazer: Consolidar defesa de T6 contra AI3.
- O que consegui fazer: Movi 3 soldados para T6. Confirmei desproteger T3.
- Frustrações: Mover tropas é tedioso. 4 territórios = muito microgerenciamento.
- Surpresas positivas: O sistema de ameaça me dá tempo de reagir.
- Avaliação: Defesa reativa — preciso ser mais proativo.

---

**Turno 10 — Era Guerra**
- O que vejo: AI3 atacou T6. Resultado: Repelido. Perdi 1 soldado. AI3 perdeu 3. Saldo positivo.
- O que quero fazer: Contra-atacar AI3 enquanto está enfraquecido.
- O que consegui fazer: Ataquei AI3 em T5 com 4 soldados. Ferronatos vs Ferronatos:
  - Meu ataque: 4×2×1.2 = 9.6
  - Defesa estimada AI3 (fog): "Baixa após combate: 0-2 unidades"
  - Resultado: Vitória Decisiva. Conquistei T5. AI3 eliminado.
- Frustrações: Nenhuma — foi uma execução limpa.
- Surpresas positivas: Eliminar rival com contra-ataque coordenado é satisfatório.
- Avaliação: 5 territórios — posição dominante consolidada.

---

**Turno 11 — Era Guerra**
- O que vejo: 5 territórios. Sou o maior clã — Horda vai me atacar na Era 3. Preciso de muralhas.
- O que quero fazer: Construir Muralha em pelo menos 2 territórios fronteiriços.
- O que consegui fazer: Construi Muralha Nv1 em T5 (custo: 25 madeira, 10 ouro) e T6 (custo: 25 madeira, 10 ouro). Madeira=XX, Ouro=XX. 2 muralhas ativas.
- Frustrações: Custo de 25 madeira cada é razoável. Mas com 5 territórios precisaria de 5 muralhas — impossível econômicamente. Preciso escolher quais proteger.
- Surpresas positivas: O custo corrigido de 25 madeira torna muralhas acessíveis mesmo para estratégia militar.
- Avaliação: Defesas fronteiriças estabelecidas — preparação para Era da Invasão iniciada.

---

**Turno 12-15 — Era Guerra (resumo)**
- Mantive 5 territórios contra ataques de AI1 e AI2. Usei sistema de alerta para antecipar movimentos.
- Construi mais 2 fazendas e 1 quartel adicional.
- Recrutar Knight no T14: custo 15 grão + 15 ouro. Com Ferronatos +20% e Knight +30%, ataque = 4×1.2×1.3 = 6.24 por Knight. Poderoso.
- Recrutei 2 Knights.
- Frustrações principais: Microgerenciamento de 5 territórios é exaustivo. Quero um modo de visão geral de todas as forças.
- Surpresas positivas: Knights com Ferronatos são devastadores. 1 Knight = quase 4 soldados em ataque.

---

**Turno 16-18 — Era Guerra (resumo)**
- AI2 (Umbral) tentou espionagem em T3 — revelou minha força mas não causou dano. Log: "AI2 espionou CAIUS. Forças reveladas por 5 turnos."
- O NOVO sistema de fog of war significa que agora o inimigo PODE saber minha força se tiver espiões. Isso é relevante — antes, todo mundo tinha informação completa.
- Recrutar mais soldados, construir Fazenda Nv2.
- Termino Era da Guerra: 5 territórios, 14 soldados, 2 Knights, 3 muralhas.

---

## ERA 3 — Invasão (Turnos 19–25)

---

**Turno 19 — Era Invasão**
- O que vejo: Maior clã com 5 territórios. Horda vai me atacar primeiro.
- O que quero fazer: Concentrar força máxima. Mas ONDE vai atacar?
- Frustrações: **D-044 CRÍTICO.** Tenho 5 territórios e a Horda pode atacar qualquer um. Distribuir 14 soldados + 2 Knights por 5 territórios é matematicamente impossível cobrir todos.
- Avaliação: O pain de localização da Horda é mais crítico para quem tem mais territórios.

---

**Turno 20 — Era Invasão**
- O que vejo: Onda 1 (força 50) atacou T4 (desvantagem — não tinha muralha lá). Resultado: T4 perdido.
- O que vejo: 4 territórios restantes. Reconquistei T4 no mesmo turno com reserva de soldados.
- Frustrações: A Horda destruiu e eu reconquistei no mesmo turno. Mecânica estranha — reconquistar território que a Horda acabou de tomar é trivial?
- Surpresas positivas: Consegui manter 5 territórios por micro rápido.
- Avaliação: Horda pode ser mitigada com exército grande o suficiente — mas para jogadores menores é devastadora.

---

**Turnos 21-25 — Invasão (resumo)**
- Onda 2 (força 100) atacou T5 — a Muralha lá absorveu (+20%). Perdi 2 soldados mas mantive T5.
- Onda 3 (força 150) atacou T6 — Muralha crucial novamente.
- Terminei com 5 territórios, 10 soldados, 2 Knights.
- AI1 sobreviveu com 1 território. AI2 eliminado T22.

---

## Resultado Final
- **Territórios:** 5
- **Pontuação estimada:** 500 (terr) + 1000 (pop) + 400 (ouro) + (10×5 + 2×5) soldados e Knights = ~1960
- **Posição:** 1º lugar (CAMPEÃO pelo 2º sprint consecutivo)

---

## Impressões Gerais

A dominância militar com Ferronatos continua sendo a estratégia mais forte. As novas features de combate (CombatPreview com threshold, fog of war + escala de ameaça) enriqueceram as decisões estratégicas — agora há genuíno risco/recompensa em atacar territórios com ameaça "média" ou "alta".

Pains principais:
1. Microgerenciamento de 5 territórios — exaustivo
2. D-044 (Horda sem localização) — mais doloroso para quem tem mais territórios
3. UX de redistribuição de tropas — precisa de automação
4. A meta "militar ofensiva Ferronatos" ainda domina — D-054 não resolvido

Gains principais:
1. CombatPreview com threshold 1.5x — excelente
2. Fog of war com escala de ameaça — cria decisões estratégicas reais
3. Knights Ferronatos são muito satisfatórios de usar
4. Sistema de alerta de ameaça — game changer
