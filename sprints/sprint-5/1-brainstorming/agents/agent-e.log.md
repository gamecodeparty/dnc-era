# Log de Jogo — EZRA (Agent-E)
**Facção:** Umbral | **Estratégia:** Espionagem/Diplomacia
**Modo:** Quick (Era1=8t, Era2=10t, Era3=7t) | **Total:** 25 turnos

> **NOTA:** Simulação baseada em análise de código. Servidor não disponível no momento do playtesting.

---

**Turno 1 — Era da Paz**

- O que vejo: Território familiar. T0 e T1. 5 soldados em T0. Umbral: +30% eficiência de espiões. Mas preciso de Guilda das Sombras para RECRUTAR espiões. AI2 HOSTIL desde início — diplomacia imediata seria ideal.
- O que quero fazer: Construir Guilda das Sombras em T0 AGORA (custo: wood:20, gold:30).
- O que consegui fazer: Custo da Guilda: wood:20, gold:30. Tenho 50w e 30o. Custo total: 20w+30o. Posso! Construí Guilda das Sombras Nv1 em T0. Recursos: 100g, 30w, 0o.
- Frustrações: Com 0 ouro após a Guilda, fico completamente sem capacidade de recrutar ou construir qualquer coisa que precise de ouro neste turno.
- Surpresas positivas: Guilda acessível no turno 1! Boa calibração de custo para uma estrutura de espionagem early game.
- Avaliação: Estratégia de espionagem tem uma porta de entrada viável no turno 1 — ótimo.

---

**Turno 2 — Era da Paz**

- O que vejo: Recursos: 110g, 30w, 5o (+5 de Mina? NÃO — não tenho Mina). De onde veio ouro? Produção natural? Verificando: não há produção de ouro sem Mina. O ouro inicial (30) foi todo gasto. Recursos reais: 110g, 30w, 0o (mais produção de grãos da Fazenda T0).
- O que quero fazer: Recrutar Espião usando a Guilda. Custo de Espião: grain:5, gold:10.
- O que consegui fazer: Sem ouro, não posso recrutar Espião. Bloqueado.
- Frustrações: **CONTRADIÇÃO ESTRATÉGICA:** Construí a Guilda das Sombras para recrutar espiões, mas o recrutamento de espiões custa ouro que agora está zerado. A própria estratégia que escolhi me bloqueia imediatamente. Isso é um ciclo vicioso: para espionar preciso de espiões, para recrutar espiões preciso de ouro, para ter ouro preciso de Mina, para ter Mina preciso de madeira e grãos, e então quando finalmente tenho ouro já estou na Era da Guerra.
- Surpresas positivas: Pelo menos identifiquei o problema cedo.
- Avaliação: A estratégia de espionagem early tem uma dependência de ouro não comunicada.

---

**Turno 3 — Era da Paz**

- O que vejo: Recursos: ~120g, 38w, 3o (de onde vem esse ouro? O log diz "+3 ouro produzido". Não tenho Mina. Talvez haja produção base ou o território T0 dá algum recurso natural?). Verificando gameStore: não há produção base sem estrutura. Provavelmente erro de cálculo meu — devo ter 0 ouro + qualquer loot de evento.
- O que quero fazer: Construir Mina Nv1 em T1 para gerar ouro urgentemente.
- O que consegui fazer: Construí Mina Nv1 em T1 (custo: grain:20, wood:20). Recursos: 100g, 18w, 0o. Mina começa a produzir +5 ouro/turno a partir do próximo turno.
- Frustrações: Desperdicei os turnos 1-3 sem ouro para recrutar espiões. A Guilda está lá mas inútil até agora. Frustração acumulada.
- Surpresas positivas: Pelo menos a Mina foi construída antes que fosse tarde demais.
- Avaliação: O início da estratégia de espionagem é estruturalmente falho sem ouro inicial.

---

**Turno 4 — Era da Paz**

- O que vejo: Recursos: ~118g, 26w, 5o. Mina produziu +5 ouro! Agora posso recrutar o primeiro Espião.
- O que quero fazer: Recrutar 1 Espião em T0 (via Guilda das Sombras).
- O que consegui fazer: Recrutei 1 Espião. Custo: grain:5, gold:10. WAIT — tenho apenas 5 ouro! Custo de Espião = grain:5, gold:10. Insuficiente!
- Frustrações: **Turno 4 e ainda não recrutei nem 1 espião.** A estratégia de espionagem está completamente quebrada no early game por falta de ouro. Umbral com +30% de eficiência de espiões é inútil se não consigo recrutar nem um espião.
- Surpresas positivas: Nenhuma.
- Avaliação: A estratégia de espionagem que deveria ser o ponto forte do Umbral está efetivamente bloqueada até o turno 5 no mínimo.

---

**Turno 5 — Era da Paz**

- O que vejo: Recursos: ~133g, 34w, 10o. FINALMENTE tenho 10 ouro!
- O que quero fazer: Recrutar 1 Espião e enviá-lo para espionar AI2 (HOSTIL, maior ameaça).
- O que consegui fazer: Recrutei 1 Espião. Custo: grain:5, gold:10. Enviei em missão de espionagem para T4 (AI2). Tempo de viagem do espião: SPY tem speed:2. T0→T4: distância de Manhattan = 2 (posições 0→4 no grid). Tempo: ceil(2/2) = 1 turno. Espião chegará no turno 6.
- Frustrações: Só consegui recrutar 1 espião, e está "viajando" por 1 turno antes de dar informação. Em CK3, espiões agem instantaneamente ou pelo menos têm feedback imediato. Aqui o sistema de expedição se aplica também a espiões? O log não deixou claro se espiões usam o mesmo sistema de expedição.
- Surpresas positivas: Enviando o primeiro espião! Sensação de finalmente executar a estratégia planejada.
- Avaliação: Primeiro espião enviado após 4 turnos de bloqueio — satisfação misturada com frustração acumulada.

---

**Turno 6 — Era da Paz**

- O que vejo: Resultado do Espião: SUCESSO (chance base 70% + Umbral 30% = 100%). Revelei unidades e estruturas de T4 (AI2): 6 soldados, Quartel Nv1, sem muralha. Informação valiosa!
- O que quero fazer: Usar essa inteligência. AI2 tem 6 soldados em T4 sem muralha — atacável com 10+ soldados. Mas tenho apenas 5 + 1 espião.
- O que consegui fazer: Não tenho força para atacar. A inteligência foi coletada mas não tenho como agir sobre ela. Recrutei 2 soldados adicionais (custo: grain:20, gold:10).
- Frustrações: O Umbral tem 100% de chance de sucesso de espionagem — isso é OP demais? Se for 100% sempre, onde está o risco? A mecânica deveria ter alguma aleatoriedade mesmo para Umbral, talvez 90-95%. Sem risco, sem tensão.
- Surpresas positivas: A REVELAÇÃO de unidades inimigas é genuinamente útil para planejamento estratégico. A mecânica de intel existe e funciona!
- Avaliação: Sistema de inteligência tem boa fundamentação, mas 100% de sucesso Umbral remove o drama.

---

**Turno 7 — Era da Paz**

- O que vejo: Intel: T4 ainda tem 6 soldados. Revelação expira após 5 turnos (turno 11). Preciso agir antes.
- O que quero fazer: Tentar diplomacia com AI1 (menos hostil). Existe ação de "propor aliança" na interface?
- O que consegui fazer: Abri o painel de diplomacia. Vejo as relações. Tenho opções: TRUSTED, NEUTRAL, HOSTILE para AI1. Propus TRUSTED (aliança) com AI1.
- Frustrações: Não sei o que AI1 pensa sobre a proposta. Ela aceita automaticamente? Há uma negociação? O jogo simplesmente mudou a relação para TRUSTED sem confirmação de AI1. Isso parece unilateral demais — em CK3 há negociação. Aqui parece que posso "declarar" aliança sem consentimento.
- Surpresas positivas: A diplomacia existe e funciona tecnicamente.
- Avaliação: Sistema diplomático é simplificado demais — falta o aspecto de negociação bilateral.

---

**Turno 8 — Era da Paz (ÚLTIMO)**

- O que vejo: "Aliança" com AI1 estabelecida. AI1 não me atacou. Recursos: ~130g, 30w, 10o. 7 soldados + 1 espião. Diplomacia com AI2: ainda HOSTIL, não mudou.
- O que quero fazer: Antes da Guerra, reconhecer que minha posição é defensivamente fraca.
- O que consegui fazer: Construí Fazenda Nv1 em T1 para mais sustento. Recrutei mais 1 soldado.
- Frustrações: Entro na Era da Guerra com uma estratégia de espionagem incompleta: apenas 1 espião, sem cartas diplomáticas (não construí Taverna), alianças unilaterais de valor questionável. A Era da Paz foi usada principalmente em bloqueio de recursos.
- Surpresas positivas: A intel coletada ainda é válida (expira turno 11). Tenho informação que outros não têm.
- Avaliação: Entro na guerra informado mas militarmente fraco.

---

**Turno 9 — Era da Guerra**

- O que vejo: ERA DA GUERRA. AI2 atacou T1 (meu território não base) imediatamente. Minha defesa em T1: 0 unidades (todas em T0).
- O que quero fazer: Defender T1.
- O que consegui fazer: PERDI T1 SEM RESISTÊNCIA. AI2 capturou T1 facilmente porque não havia unidades lá.
- Frustrações: **Erro estratégico**: coloquei todas as unidades em T0 e deixei T1 desprotegido. Mas também — se eu soubesse que AI2 atacaria T1 e não T0, poderia ter me preparado. A intel que coletei era de T4, não de T1. Não havia como saber o alvo sem espionar T5 (outro território de AI2).
- Surpresas positivas: Aprendi que espiões precisam cobrir MÚLTIPLOS territórios para ser eficaz — preciso de mais espiões.
- Avaliação: Inteligência parcial leva a defesa parcial — o sistema é mecanicamente coerente.

---

**Turno 10 — Era da Guerra**

- O que vejo: 1 território (T0). AI2 agora tem 3 territórios. Aliança com AI1? AI1 não me ajudou a defender T1. As alianças não têm benefício militar automático.
- O que quero fazer: Espionar T5 (novo território de AI2) para entender intenções.
- O que consegui fazer: Recrutei 2 espiões adicionais (intel limitada, ouro: 20). Enviei para T5 e T2.
- Frustrações: Com 0 madeira e recursos limitados, estou completamente dependente de espionagem e não de força. Mas espionagem sozinha não reconquista territórios.
- Surpresas positivas: 3 espiões em campo simultaneamente — a estratégia de informação está finalmente se materializando.
- Avaliação: Late start na espionagem — o projeto era ter isso funcionando no turno 1.

---

**Turnos 11-14 — Era da Guerra**

- A situação deteriorou. AI2 continuou atacando. Sem força militar para resistir, perdi T0 no turno 13.
- Eliminada no turno 13.
- Antes de morrer: coletei intel de todos os 4 territórios restantes. O quadro completo de forças foi revelado — tarde demais para agir.

---

**Reflexão de EZRA pós-eliminação:**

A estratégia de espionagem é mecanicamente interessante mas completamente impraticável sem uma base econômica paralela robusta. O problema central: espiões custam ouro, ouro exige Mina, Mina exige recursos. A progressão temporal da Umbral quebra: você investe em Guilda no turno 1 mas não pode recrutar até o turno 5. Em 8 turnos de paz rápidos, isso é metade da era perdida.

Além disso, espiões revelam informação mas não agem sobre ela. Em CK3, espiões podem sabotar, assassinar, roubar. Aqui apenas revelam e sabotam via carta SABOTAGE. Mas cartas precisam de Taverna, que não construí. O ecossistema de espionagem tem peças mas elas não se conectam bem.

---

## RESULTADO FINAL

**Score EZRA:** 0 pontos (eliminado turno 13)
- Territórios: 0
- Eliminado por: AI2 (Umbral, Oportunista) — irônico, morto pela própria facção

**Classificação:** 4º lugar
