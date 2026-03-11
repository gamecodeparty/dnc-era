# Brainstorming — Sprint-2-Baseline

**Data:** 2026-03-10
**Metodologia:** Cruzamento de logs turno-a-turno × entrevistas × análise de divergências
**Agentes:** 6 (A–F) | **NPS médio:** 5.0/10 | **Sessão:** Sprint 2 Baseline Wave 2

---

## Divergências Log vs Entrevista (Insights Críticos)

> Divergências são os problemas mais honestos — o agente sofreu mas não soube nomear.

### Divergência 1 — Agent-B (Bastião, Último Lugar)

**No log:** Frustração constante com ausência de recursos. T2: *"TRAVADO COMPLETAMENTE"*. T5: *"Passando turnos apenas ESPERANDO recursos. Jogo sem ação vira tédio puro."* Errou a premissa de que Serraria custaria madeira.

**Na entrevista:** Nota 5/10. *"Derrota justa — foi meu erro estratégico."* Diz que voltaria a jogar. Atribui o erro a si mesmo.

**Insight crítico:** O jogador internalizou a falha como erro estratégico legítimo, mas a interface ESCONDEU a informação que tornava o erro inevitável. Não há aviso de "isso usa 100% da sua madeira". Não há indicação contraintuitiva de que Serraria = grão, não madeira. O sistema puniu o jogador por falta de informação, não por má estratégia. **Pain real: ausência de aviso proporcional de custo.**

### Divergência 2 — Agent-F (Gugu, Novato)

**No log:** Frustração com ausência de combate. T6: *"FRUSTRAÇÃO MÁXIMA DO NOVATO. Tenho soldados, quero usá-los, não consigo."* T8: *"A transição de era criou expectativa ENORME e foi completamente destruída."*

**Na entrevista:** Nota 6/10. *"Amei as expedições, quero jogar de novo."* Não menciona combate como dealbreaker prioritário.

**Insight crítico:** As expedições atuaram como **safety net emocional** — compensaram a ausência de combate o suficiente para o novato não nomear o problema. O agente experiente (Agent-A) deu 4/10 porque viu a incompletude com clareza; o novato (Agent-F) deu 6/10 porque expedições mascararam o vazio. **Pain real: expedições são o único sistema completo e estão escondidas** (Agent-F as encontrou por acidente no T9).

### Divergência 3 — Agent-D (Pedra) — Convergência Positiva

**No log:** Adaptação estratégica, satisfação genuína na defesa T10. *"Emoção genuína ao ver que segurei o ataque."* Perdeu território para a Horda no T22: *"Desespero genuíno."*

**Na entrevista:** Nota 6/10. *"A derrota foi clara e ensinante. Quero jogar de novo com mais unidades."* Única resposta convicta "SIM" para replay intent.

**Insight:** Quando o sistema de defesa FUNCIONA (Muralha + bônus de facção + tropas), o jogo entrega o loop emocional correto. Agent-D experimentou exatamente o objetivo do jogo: *"cada derrota foi uma lição e cada vitória foi mérito."* **Gain real: a mecânica de defesa é o núcleo emocional que funciona.**

---

## Dores

> Problemas reais identificados, com evidências diretas dos logs e entrevistas.

### DORES CRÍTICAS (Score 9–10)

**Dor 1: Ausência total de UI de ataque PvP — 6/6 agentes**

O backend de combate existe (CombatSystem.ts com executeCombat()), mas não há nenhum botão, rota ou modal de ataque para o jogador. Todos os 6 agentes procuraram ativamente e falharam. A Era da Guerra anuncia combate mas não entrega a ação correspondente.

*Evidências:*
- *"RAIVA. Eu tenho soldados. Tenho um território adjacente. A guerra é MINHA estratégia. E o jogo não me deixa atacar."* (Agent-C, T3)
- *"CRÍTICO MÁXIMO — entrei na Era da Guerra e AINDA não consigo atacar ninguém."* (Agent-A, T8)
- *"A transição de era criou expectativa ENORME que foi completamente destruída pela total ausência de ação de guerra."* (Agent-F, T8)
- *"A IA CONSEGUE COMBATER, mas o JOGADOR NÃO CONSEGUE. Isso é infuriante."* (Agent-B, T13)

**Impacto:** O jogo inteiro é reduzido a simulação econômica passiva. Sem ataque, nenhuma estratégia militar faz sentido. 5 de 6 agentes treinaram soldados que nunca foram usados.

---

**Dor 2: Sistema de cartas completamente inutilizável sem combate — 5/6 agentes**

Sem ação de ataque disponível, as cartas que exigem contexto de batalha ficam ornamentais. 5 agentes mencionaram ter cartas que não conseguiram usar.

*Evidências:*
- *"Sem batalha ativa, a carta ficou inútil. Não há tutorial de 'use cartas antes de atacar'."* (Agent-C, entrevista)
- *"Sistema de cartas sem contexto de uso imediato é decoração para novatos."* (Agent-F, T7)
- *"Ficaram acumulando na mão sem uso."* (Agent-B, entrevista)
- *"Tinha cartas mas não entendia quando/como ativá-las."* (Agent-A, entrevista)
- *"Não estava claro o momento ideal para usar."* (Agent-D, entrevista)

**Impacto:** Sistema inteiro de cartas é percebido como feature incompleta. Desinvestimento do jogador no sistema estratégico mais rico do jogo.

---

### DORES ALTAS (Score 7–8)

**Dor 3: Expedições escondidas — o melhor sistema não é apresentado — 3/6 agentes**

As Expedições são unanimemente o sistema mais satisfatório do jogo (narrativa + risco + recompensa clara), mas 2 dos 3 agentes que as usaram as descobriram por acidente. Não há apresentação proativa do sistema.

*Evidências:*
- *"Encontrei as Expedições por ACIDENTE. Mudou completamente como encarei o jogo."* (Agent-F, T9)
- *"Focaria em Expedições desde o início — são a única mecânica onde a agência cria resultados satisfatórios."* (Agent-A, entrevista)
- *"A narrativa das expedições é MUITO boa. Quase fiz uma expedição só para ler."* (Agent-C, T4)
- *"Quero descobrir todos os locais de exploração. O Wyrm Cave me matou — quero tentar com mais soldados."* (Agent-F, entrevista)

**Divergência crítica:** A Feature mais elogiada do jogo está escondida. Novatos passam turnos sem saber que existe.

---

**Dor 4: Custos de construção contraintuitivos (Serraria custa grão, não madeira) — 4/6 agentes**

A Serraria, estrutura que PRODUZ madeira, custa grãos e ouro para ser construída. Isso contradiz a expectativa mental de todos os agentes não-militares.

*Evidências:*
- *"Serraria não precisa de madeira para ser construída. Os custos não são intuitivos o suficiente para evitar esse erro."* (Agent-B, T2)
- *"Serraria custa grãos e ouro, não madeira — aprendizado de Agent-B que não cometi."* (Agent-D, T2)
- *"O ícone da madeira faz assumir que madeira é necessária em tudo relacionado a madeira."* (Agent-B, T3)
- Agent-E também se surpreendeu com custos de estruturas não-óbvios.

**Impacto:** Custo de 2 turnos de economia para Agent-B por erro de premissa. Risco real para qualquer novo jogador.

---

**Dor 5: Sem aviso proporcional de custo — 3/6 agentes**

Quando uma construção vai consumir toda ou a maioria de um recurso, o sistema não avisa. O preço vermelho existe mas não comunica "isso representa 100% do seu estoque."

*Evidências:*
- *"Uma indicação proporcional — tipo 'isso usa 100% da sua madeira' — evitaria o bloqueio sem remover a decisão do jogador."* (Agent-B, last-place.md)
- *"Não há aviso do tipo 'isso vai usar TODA sua madeira!' antes de confirmar."* (Agent-F, T4)
- *"O Quartel custou quase toda a madeira. Não planejei isso. Achei que ia custar menos."* (Agent-C, T1)

---

**Dor 6: Timer de 10s interrompe ações em andamento — 4/6 agentes**

Diferente do D-002 (timer avança durante navegação), este pain é sobre o timer disparar ENQUANTO o agente está no meio de uma ação (treino, leitura de narrativa, confirmação de construção).

*Evidências:*
- *"O turno de 10 segundos me pegou no meio de uma ação. Estava clicando em 'Treinar' e o turno virou."* (Agent-F, T5)
- *"Os 10 segundos são MUITO rápidos — mal dá tempo de ler o que aconteceu antes de precisar agir."* (Agent-A, T2)
- *"O timer de 10 segundos é muito agressivo para novatos — não dá tempo de ler e decidir."* (Agent-F, T5)
- *"O turno avançou enquanto eu estava tentando decidir."* (Agent-A, T5)

---

### DORES MÉDIAS (Score 5–6)

**Dor 7: Sem ranking/placar visível durante a partida — 2/6 agentes**

Não há indicador de posição relativa durante o jogo. A campeã não sabia que estava ganhando até contar pontos no final.

*Evidência:* *"O jogo não tem placar visível durante a partida. Não há indicador de 'você está em X lugar de 3'. A vitória chegou por default, não por maestria."* (Agent-A, champion.md)

**Dor 8: Sem ação de reposicionamento de tropas — 2/6 agentes**

Não é possível mover soldados de um território para outro para consolidar defesa.

*Evidências:*
- *"Reposicionar tropas — mover soldados de um território para outro para consolidar defesa. Não existe essa ação."* (Agent-D, entrevista)
- *"Reforçar um território com tropas vindas de outro."* (Agent-B, entrevista)

**Dor 9: Bônus de facção invisível numericamente — 2/6 agentes**

Mesmo que o bônus funcione, a diferença é imperceptível sem um painel que mostre "produção COM bônus".

*Evidência:* *"Com bônus +20% = 12 grãos/turno. Diferença de 2 grãos por turno não é perceptível sem painel que mostre 'produção com bônus'. Se a facção dá bônus invisíveis, ela não existe mecanicamente."* (Agent-A, champion.md)

**Dor 10: Diplomacia sem feedback de aceitação/rejeição — 2/6 agentes**

Proposta de aliança enviada desaparece sem resposta. Sem saber se foi aceita ou rejeitada, é impossível planejar.

*Evidências:*
- *"Proposta de aliança parece entrar em um void — sem feedback é impossível planejar ao redor disso."* (Agent-E, entrevista)
- *"Não encontrei onde ver minha reputação diplomática na interface."* (Agent-A, entrevista)

**Dor 11: Treino de unidades sem opção de lote — 2/6 agentes**

Treinar múltiplas unidades exige N cliques (1 por unidade).

*Evidência:* *"Só posso treinar 1 por vez! Não há opção de 'treinar X unidades' — para um jogo de estratégia, isso é tedioso."* (Agent-C, T2)

**Dor 12: Espião com 0 defesa sem aviso — estratégia Umbral militarmente inviável — 1/6 agentes**

Espiões têm poder de defesa zero. Construir um exército de espiões sem tropas defensivas resulta em território indefensável. O sistema não avisa sobre essa limitação.

*Evidência:* Agent-E perdeu um território porque 2 espiões = 0 DEF. *"Aprendi que espiões não defendem nada."* (Agent-E, entrevista)

---

## Ganhos

> O que funcionou genuinamente. **NAO MEXER.**

### Ganho 1: Expedições com narrativa criam o melhor loop do jogo (3/6)

Loop claro: enviar tropas → narrativa imersiva → risco calculado → recompensa variável. Agent-F (novato) perdeu soldados para o Wyrm Cave e achou **divertido**. O sistema entrega exatamente o objetivo: "derrota que ensina, vitória que é mérito."

*"As narrativas das Expedições são divertidas e imersivas — o sistema de 'enviar soldados em aventura' é o mais acessível e satisfatório do jogo."* (Agent-F, entrevista)
*"A narrativa foi deliciosa. Queria mais desses momentos."* (Agent-E, sprint 1)

### Ganho 2: Defesa bem-sucedida de território cria satisfação de mérito genuíno (2/6)

Quando Agent-D repeliu o ataque da IA com Muralha + bônus Ferronatos, o jogo entregou o momento mais memorável de toda a sessão. A mecânica funcionou exatamente como deveria.

*"T10 — quando a IA atacou e repeli com a Muralha + bônus Ferronatos. Satisfação genuína de defesa bem-sucedida."* (Agent-D, entrevista)
*"A Muralha finalmente serviu para algo!"* (Agent-B, sessão)

### Ganho 3: Transição de era com banner dramático (6/6) *(confirmado do Sprint 1)*

O banner de transição de era continua sendo o ponto mais alto visualmente. Sprint 2 confirma unanimidade.

*"O banner foi INCRÍVEL."* (Agent-F) | *"Completamente. 10/10."* (Agent-C, sprint 1)

### Ganho 4: Horda escalante cria pressão emocional justificada (4/6) *(confirmado do Sprint 1)*

A Horda funcionou emocionalmente em todos os agentes que sobreviveram à Era da Invasão. Pressão crescente, alvo lógico (maior clã), derrota que parece merecida.

*"Perder o território para a Horda foi devastador emocionalmente — e foi JUSTO. Esse é o design correto."* (Agent-D, entrevista)

### Ganho 5: Clareza visual do mapa (6/6) *(confirmado do Sprint 1)*

Cores por facção, indicador X/4 de slots, ícone de espada com contagem — leitura rápida sem cliques adicionais. Unanimidade em todos os sprints.

### Ganho 6: Feedback de custo com preço vermelho quando insuficiente (4/6) *(confirmado do Sprint 1)*

*"O feedback visual dos custos é excelente — quando você VÊ o preço."* (Agent-B, entrevista). Nota: o problema é que o preço não é visível ANTES de navegar até o território.

### Ganho 7: Ícone de olho com hover revelando espionagem (3/6) *(confirmado do Sprint 1)*

*"O ícone de olho com hover revelando informações de espionagem é design elegante e satisfatório."* (Agent-E, entrevista). Confirmado por Agent-A e Agent-D também.

---

## Alívios

> Como o produto pode aliviar cada dor.

| Dor | Alívio proposto |
|-----|-----------------|
| D-016: Sem UI de ataque | Implementar modal de ataque ao clicar em território inimigo na Era da Guerra: troops selecionadas → preview de combate (já existe CombatPreview no código) → confirmar |
| D-024: Cartas inutilizáveis | Integrar painel de cartas ao modal de ataque: "Ativar carta antes de atacar" como parte do fluxo de combate |
| D-026: Expedições escondidas | Adicionar call-to-action contextual: primeiro turno → tooltip "Explore locais especiais em /game/expedition para recursos extras" |
| D-019: Custos contraintuitivos | Tooltip adicional nos custos: "Serraria — produz madeira [sem custo de madeira]" + cor diferenciada para recursos que a estrutura PRODUZ vs CONSOME |
| D-020: Sem aviso proporcional | Pop-up de confirmação quando custo > 80% do estoque: "⚠️ Isso usará 100% da sua madeira. Confirmar?" |
| D-017: Timer interrompe ações | Pausar timer automaticamente quando player está em sub-rota (/territory, /army, /cards) — ou aumentar para 30s |
| D-021: Sem placar | Mini-ranking no HUD durante partida: posição atual (#1/#3) com tooltip mostrando pontuação estimada |
| D-022: Sem reposicionamento | Ação "Mover tropas" no mapa: clicar em território próprio com tropas → selecionar destino → confirmar |
| D-023: Bônus invisível | Painel de recurso mostra "+10 (base) +2 (Verdâneos)" com bônus destacado em cor da facção |
| D-025: Diplomacia caixa preta | Evento no log "Ferronatos REJEITOU sua proposta de aliança" + log de histórico diplomático |
| D-018: Treino sem lote | Input numérico "Quantidade: [___]" na tela de treino com total de custo calculado dinamicamente |
| D-027: Espião 0 DEF | Tooltip na unidade Espião: "⚠️ Espiões têm 0 de poder de defesa. Mantenha tropas militares para defender territórios." |

---

## Criadores de Ganho

> Como ampliar o que já funciona bem.

| Ganho | Criador de ganho |
|-------|-----------------|
| G-007: Expedições | Apresentar 3 locais disponíveis no início do T1 com preview de risco (fácil/médio/difícil) e recompensa estimada. Onboarding: "Envie suas tropas em expedição para coletar recursos raros." |
| G-008: Defesa | Após defesa bem-sucedida: popup com breakdown "Seu poder de defesa: 6 DEF × Ferronatos +20% = 7.2 DEF × Muralha +20% = 8.6 DEF vs Ataque: 5. VITÓRIA." |
| G-001: Banner era | Adicionar preview de mecânicas novas no banner: "Era da Guerra: seus clãs podem agora ATACAR territórios inimigos. Botão: clique em território inimigo." |
| G-003: Horda | Mostrar force preview no HUD: "Próxima Horda: Força 100 em X turnos. Maior clã atual: Verdâneos (3 territórios)." |
| G-005: Mapa | Adicionar toggle de "modo estratégico" que mostra todos os recursos de todos os territórios sem hover |

---

## Priorização

> Score 1–10 com justificativa. Ordenado por impacto × frequência.

| Rank | ID | Score | Justificativa | Frequência |
|------|----|-------|---------------|------------|
| 1 | D-016 | **10** | Sem ataque, o jogo é simulação passiva. Bloqueia 100% das estratégias militares e metade das econômicas. | 6/6 |
| 2 | D-024 | **8** | Sistema de cartas percebido como incompleto por 5/6 agentes. Desinvestimento imediato em sistema estratégico rico. | 5/6 |
| 3 | D-026 | **8** | O melhor sistema do jogo está escondido. Apresentar Expedições no onboarding = win imediato de satisfação. | 3/6 |
| 4 | D-019 | **7** | Custo de 2 turnos de economia para 4/6 agentes. Erro evitável com 1 linha de tooltip. Alto impacto, baixíssimo esforço. | 4/6 |
| 5 | D-020 | **7** | Aviso proporcional de custo: implementação trivial (1 condicional + modal), impacto alto em erros de novato. | 3/6 |
| 6 | D-017 | **7** | Timer interrompendo ações é o maior estressor de ritmo do jogo. Pausar em sub-rotas é fix cirúrgico. | 4/6 |
| 7 | D-021 | **6** | Sem ranking visível, vitória é "surpresa administrativa". Mini-HUD resolve com baixo esforço. | 2/6 |
| 8 | D-022 | **6** | Reposicionamento de tropas = ação estratégica fundamental pedida por 2 agentes. Médio esforço. | 2/6 |
| 9 | D-023 | **6** | Facção deve importar mecanicamente. Mostrar bônus no painel = 1 linha de UI. | 2/6 |
| 10 | D-025 | **5** | Diplomacia muda de "void" para "feedback" com 1 evento de log. Impacto na imersão. | 2/6 |
| 11 | D-018 | **5** | Treino em lote: conforto de UX, não bloqueio. Médio esforço, médio impacto. | 2/6 |
| 12 | D-027 | **5** | Espião 0 DEF: tooltip resolve sem mudar mecânica. 1 agente afetado. | 1/6 |
