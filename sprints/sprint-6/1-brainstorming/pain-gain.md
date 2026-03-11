# Pain/Gain Map — Dice&Cards Era

**Última atualização:** Sprint 06 (2026-03-11)
**Total de discoveries:** 109 (91 anteriores + 10 novos pains sprint 6 + 6 novos gains sprint 6 + 2 reclassificados)
**Pains:** 78 | **Gains:** 29
**NPS Médio Sprint 6:** 7,3/10 (+1,6 vs Sprint 5)

> **Nota Sprint 6:** A melhora significativa de NPS (5,7→7,3) e sobrevivência (2/6→5/6) reflete o impacto direto das features de UX implementadas. Pain crítico novo: D-066 (deadlock econômico facção Umbral). Itens D-053 e D-059 marcados como **implementados**.

---

## Tabela de Discoveries

### Sprint 1 — Wave 1

| ID | Tipo | Categoria | Descrição | Frequência (x/6) | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------------:|:------------:|:------:|:-------------:|
| D-001 | pain | mecanica | **Sem preview de combate.** Atacar não mostra poder de ataque vs defesa antes de confirmar. S6: CombatPreview com threshold 1.5x e texto explicativo resolve para territórios com fog revelado; estimativas de fog ainda vagas (→ D-072). > *"A interface de ataque não mostrou preview de combate antes de enviar! Não sei se vou ganhar ou perder." (Agent-A, T16, S1)* | 6/6 | 10 | 1 | parcial (S6: texto explicativo + threshold adicionados; fog estimativas ainda vagas) |
| D-002 | pain | interface | **Timer não para durante navegação entre páginas.** | 5/6 | 8 | 1 | sim (S3) |
| D-003 | pain | mecanica | **Facção Umbral sem espiões implementados (Sprint 1).** | 1/6 | 8 | 1 | sim (S3) |
| D-004 | pain | interface | **Sem tutorial contextual.** S6: aviso de produção zero implementado (T2, mas deveria ser T1 → D-073); highlight de adjacência implementado (F-092/F-093). | 3/6 | 9 | 1 | parcial (S6: aviso produção zero, adjacências implementadas; eras sem explicação mecânica persiste → D-045) |
| D-005 | pain | interface | **Resultado de batalhas entre AIs ausente no log.** | 4/6 | 7 | 1 | não |
| D-006 | pain | interface | **Limite de 4 estruturas por território não comunicado.** | 3/6 | 7 | 1 | não |
| D-007 | pain | mecanica | **Resultado de exploração pouco claro.** | 3/6 | 6 | 1 | não |
| D-008 | pain | interface | **Cartas desconectadas do fluxo de combate.** S6: 4/6 agentes não usaram cartas em momento ótimo (ARIA: carta esquecida 12 turnos; FIO: nunca usou). | 3/6 | 5 | 1 | parcial (S4: banner contextual; S6: ainda insuficiente → D-070) |
| D-009 | pain | agencia | **Diplomacia puramente probabilística sem controle.** | 3/6 | 5 | 1 | não |
| D-010 | pain | mecanica | **Bônus de facção imperceptíveis.** | 2/6 | 4 | 1 | sim (S3) |
| D-011 | pain | diversao | **Tela de vitória sem narrativa de mérito.** | 1/6 | 4 | 1 | sim (S4) |
| D-012 | pain | interface | **Sem indicador de progresso para próxima era.** S6: FIO (T8): "O aviso 'Era da Guerra em 1 turno' apareceu. Não sei o que isso significa mecanicamente." | 2/6 | 6 | 1 | não |
| D-013 | pain | agencia | **Carta Sabotagem: alvo de estrutura não escolhido.** | 1/6 | 3 | 1 | não |
| D-014 | pain | bugs | **Population tracking zerado no client.** | 2/6 | 2 | 1 | não |
| D-015 | pain | mecanica | **AI de mesma facção começa como HOSTILE.** | 1/6 | 3 | 1 | não |

---

### Sprint 2 — Wave 2

| ID | Tipo | Categoria | Descrição | Frequência (x/6) | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------------:|:------------:|:------:|:-------------:|
| D-016 | pain | interface | **Ausência total de UI de ataque PvP.** | 6/6 | 10 | 2 | sim (S3) |
| D-017 | pain | interface | **Timer de 10s corta ações em andamento.** | 4/6 | 7 | 2 | sim (S3) |
| D-018 | pain | interface | **Treino de unidades sem opção de lote.** | 2/6 | 5 | 2 | parcial (S3) |
| D-019 | pain | mecanica | **Custos de construção contraintuitivos.** | 4/6 | 7 | 2 | não |
| D-020 | pain | interface | **Sem aviso proporcional de custo.** | 3/6 | 7 | 2 | sim (S3) |
| D-021 | pain | interface | **Sem ranking/placar visível durante a partida.** S6: CAIUS (champion.md) pediu explicitamente "placar visível a cada turno". | 2/6 | 6 | 2 | não (→ D-075) |
| D-022 | pain | mecanica | **Sem ação de mover/reposicionar tropas entre territórios.** S6: 4/6 confirmam que redistribuição em 4+ territórios é tediosa (→ D-068). | 2/6 | 6 | 2 | parcial (S4: Reforço existe; S6: UX ainda exaustiva → D-068) |
| D-023 | pain | mecanica | **Bônus de facção invisível.** | 2/6 | 6 | 2 | sim (S3) |
| D-024 | pain | mecanica | **Sistema de cartas inutilizável sem contexto.** S6: ARIA esqueceu carta por 12 turnos; FIO nunca usou. 4/6 não usaram cartas. | 5/6 | 8 | 2 | parcial (S4: banner; S6: ainda insuficiente → D-070) |
| D-025 | pain | mecanica | **Diplomacia sem feedback de aceitação/rejeição.** | 2/6 | 5 | 2 | parcial |
| D-026 | pain | diversao | **Expedições escondidas para novatos.** | 3/6 | 8 | 2 | não |
| D-027 | pain | mecanica | **Espião com 0 de defesa sem aviso.** | 1/6 | 5 | 2 | não |

---

### Sprint 3 — Wave 3

| ID | Tipo | Categoria | Descrição | Frequência (x/6) | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------------:|:------------:|:------:|:-------------:|
| D-028 | pain | interface | **Botões de construção/treinamento habilitados sem recursos.** | 6/6 | 10 | 3 | sim (S4) |
| D-029 | pain | interface | **Sem preview de produção antes de construir estrutura.** | 6/6 | 9 | 3 | sim (S4) |
| D-030 | pain | interface | **Cartas ignoradas apesar de disponíveis.** S6: 4/6 não usaram cartas ou usaram muito tarde. | 6/6 | 8 | 3 | parcial (S4: banner; S6: insuficiente → D-070) |
| D-031 | pain | mecanica | **Ouro como gargalo sistêmico — Mine não é prioridade comunicada.** S6: 4/6 confirmam gargalo crônico (→ D-067). BALDO: zero ouro em 7 turnos diferentes. | 5/6 | 7 | 3 | não (confirmado S6 — gargalo sistêmico persiste) |
| D-032 | pain | diversao | **Fim de jogo abrupto sem cerimônia.** | 5/6 | 8 | 3 | sim (S4) |
| D-033 | pain | mecanica | **Horda não explica mecânica de targeting.** | 4/6 | 8 | 3 | sim (S4: modal informativo; S6: território-alvo específico ainda ausente → D-044) |
| D-034 | pain | interface | **Sem overview visual de tropas por território no mapa.** S6: fog of war com estimativas por escala de ameaça é parcial. | 4/6 | 8 | 3 | parcial (S6: fog+ameaça implementados; valores exatos inimigos ausentes → D-042) |
| D-035 | pain | mecanica | **Diplomacia sem efeito concreto observável.** 5 sprints consecutivos sem progresso. | 4/6 | 6 | 3 | não |
| D-036 | pain | mecanica | **Duração de revelação de espião sem countdown visível.** | 3/6 | 7 | 3 | não |
| D-037 | pain | interface | **Sem preview de tempo de viagem em expedições.** | 5/6 | 8 | 3 | sim (S4) |
| D-038 | pain | mecanica | **Grão acumula sem uso no late game.** S6: FIO com 100+ grão sem destino; ARIA com 350 grão no T25. | 4/6 | 7 | 3 | não (confirmado S6) |
| D-039 | pain | interface | **Mecânica de Reforço (mover tropas) não comunicada.** | 3/6 | 6 | 3 | não |
| D-040 | pain | interface | **Sem tutorial/onboarding para novatos.** S6: FIO melhorou mas ainda confuso sobre mecânicas de era. | 3/6 | 9 | 3 | parcial (S6: aviso produção zero + adjacências; eras sem explicação → D-045) |
| D-041 | pain | diversao | **Deadlock econômico com ordem de build errada.** S6: EZRA criou deadlock total ao construir Shadow Guild primeiro (→ D-066). | 3/6 | 8 | 3 | parcial (S4: TipBanner; S6: Umbral ainda inviável → D-066) |

---

### Sprint 4 — Wave 4

| ID | Tipo | Categoria | Descrição | Frequência (x/6) | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------------:|:------------:|:------:|:-------------:|
| D-042 | pain | interface | **Sem visibilidade de tropas inimigas no mapa.** S6: fog of war + escala de ameaça é parcial — estimativas não são valores exatos. | 4/6 | 9 | 4 | parcial (S6: fog of war + escala ameaça; valores exatos ausentes) |
| D-043 | pain | interface | **Alerta de ataque iminente ausente.** | 3/6 | 8 | 4 | sim (S5: confirmado; S6: sistema de ameaça visual expandido) |
| D-044 | pain | mecanica | **Horda não indica território específico de ataque dentro do clã-alvo.** S6: ARIA (T21): "RAIVA. Concentrei forças em T6, Horda atacou T0." CAIUS perdeu T4 inesperadamente. BALDO sobreviveu por desempate desconhecido. | 4/6 | 9 | 4 | não (confirmado S6 — top 1 pain ativo) |
| D-045 | pain | interface | **Era da Guerra sem explicação mecânica na transição animada.** S6: FIO (T9): "o jogo não explicou o que mudou"; ARIA (T8): "o banner informa mas não explica as mudanças". | 3/6 | 7 | 4 | não (confirmado S6) |
| D-046 | pain | mecanica | **Comportamento da Horda em empate de territórios não documentado.** S6: BALDO (T23): empate com ARIA — Horda atacou ARIA por razão desconhecida. | 2/6 | 6 | 4 | não (confirmado S6) |
| D-047 | pain | interface | **Defense badges apenas em territórios próprios, não inimigos.** S6: fog of war + escala de ameaça resolve parcialmente mas sem valores exatos. | 4/6 | 8 | 4 | parcial (S6: escala ameaça com estimativas; exatos ainda ausentes) |
| D-048 | pain | diversao | **Breakdown de pontuação ausente na GameResultsScreen.** | 4/6 | 6 | 4 | não |
| D-049 | pain | diversao | **Dead time de viagem — sem ação útil durante espera de expedição.** | 3/6 | 7 | 4 | não |
| D-050 | pain | interface | **UX de realocação de tropas — muitos cliques para ação frequente.** S6: 4/6 confirmam (→ D-068 mais detalhado). | 2/6 | 6 | 4 | não (→ D-068) |
| D-051 | pain | mecanica | **Bônus de facção Umbral invisível na UI.** S6: EZRA calculou incorretamente no log (→ D-071). | 2/6 | 7 | 4 | não (→ D-071) |
| D-052 | pain | interface | **Tooltip de recurso insuficiente.** | 2/6 | 5 | 4 | não |

---

### Sprint 5 — Wave 5

| ID | Tipo | Categoria | Descrição | Frequência (x/6) | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------------:|:------------:|:------:|:-------------:|
| D-053 | pain | mecanica | **Custo de Muralha Nv1 (50 madeira) inviabiliza estratégia defensiva early game.** | 3/6 | 9 | 5 | **sim (S6: F-084 — custo reduzido para 25 madeira; BALDO: de eliminado para 2º lugar)** |
| D-054 | pain | mecanica | **Meta dominante "militar ofensiva early" elimina diversidade de arquétipos viáveis.** S6: CAIUS venceu pelo 2º sprint consecutivo; BALDO chegou a 2º (melhora real) mas Ferronatos tem 3/5 finalistas. | 4/6 | 9 | 5 | parcial (S6: defensivo agora viável; Ferronatos ainda dominante → D-074) |
| D-055 | pain | diversao | **Sem modo espectador após eliminação.** S6: apenas 1/6 eliminado (EZRA T8) — melhora real, mas pain persiste para esse caso. | 4/6 | 7 | 5 | não |
| D-056 | pain | interface | **"Ataque Chegando" sem indicação de escala de ameaça.** | 2/6 | 6 | 5 | **sim (S6: F-095/F-096 — escala visual implementada com tooltip numérico)** |
| D-057 | pain | interface | **Relatório de batalha passa rápido e não tem histórico acessível.** | 2/6 | 6 | 5 | não |
| D-058 | pain | interface | **Sem aviso ao lançar expedição que territórios de origem ficam desprotegidos.** S6: modal de confirmação "deseja desproteger X?" implementado (F-088). | 3/6 | 8 | 5 | **sim (S6: F-088 — modal de confirmação antes de desproteger território)** |
| D-059 | pain | interface | **Adjacências de território não visualizadas no mapa.** | 3/6 | 7 | 5 | **sim (S6: F-092/F-093 — linhas de conexão + highlight de adjacência ao selecionar território)** |
| D-060 | pain | mecanica | **Shadow Guild não comunica que recrutar espiões custa ouro.** S6: EZRA sofreu versão mais grave — deadlock total (→ D-066). | 1/6 | 7 | 5 | não (→ D-066 é versão mais grave) |
| D-061 | pain | mecanica | **Vitória de combate ≠ conquista de território — distinção não explicada.** S6: texto explicativo no CombatPreview ("Vitória Decisiva — conquista garantida") resolve. | 2/6 | 8 | 5 | **sim (S6: CombatPreview com texto explicativo e distinção clara de resultado)** |
| D-062 | pain | diversao | **Taxa de eliminação early (67%) significa que a Horda não é vista pela maioria.** S6: taxa caiu para 17% (1/6 eliminado). | 4/6 | 9 | 5 | **sim (S6: apenas EZRA eliminado — taxa de sobrevivência 5/6 = 83%)** |
| D-063 | pain | bugs | **Inconsistência crítica entre balance.ts e gameStore.ts.** | 2/6 | 8 | 5 | não |
| D-064 | pain | mecanica | **Horda sem período de graça para liderança temporária.** | 2/6 | 6 | 5 | não |
| D-065 | pain | mecanica | **Estratégia de espionagem Umbral estruturalmente inviável no modo quick.** S6: EZRA confirmou — mas agora temos análise mais completa do deadlock (→ D-066). | 1/6 | 7 | 5 | não (→ D-066 documenta causa raiz) |

---

### Sprint 6 — Wave 6 (NOVOS)

| ID | Tipo | Categoria | Descrição | Frequência (x/6) | Score (1-10) | Sprint | Implementado? |
|----|------|-----------|-----------|:-----------------:|:------------:|:------:|:-------------:|
| D-066 | pain | mecanica | **Deadlock econômico total: Shadow Guild como primeira estrutura cria impasse irrecuperável sem aviso e sem saída.** Shadow Guild custa 30 ouro (60% do estoque inicial) + espiões custam 10 ouro cada. Um jogador que constrói Shadow Guild primeiro + treina 2 espiões no T2 fica com 0 ouro, sem produção de nenhum recurso, e sem capacidade de construir qualquer estrutura (todas custam ouro). O deadlock é matematicamente irrecuperável: sem ouro → não pode construir Mina → não pode gerar ouro. Não existe mecanismo de escape (sem venda, sem demolição, sem troca grão→ouro sem Taverna). O design da facção Umbral convida a este comportamento fatal. > *"GAME STUCK. Estou preso. Sem ouro, sem soldados, sem como gerar ouro sem estruturas que custam ouro. Um tutorial ou aviso 'Construa Fazenda ANTES de Shadow Guild' teria salvado esta partida." (EZRA, T7, S6)* > *"A porta se fechou para sempre no T3. Foi como um loop infinito sem saída." (EZRA, last-place.md, S6)* | 1/6 (100% Umbral) | 9 | 6 | não |
| D-067 | pain | mecanica | **Gargalo de ouro crônico — produção de Mina insuficiente para demanda simultânea de construção + recrutamento.** 4/6 agentes ficaram com ouro zerado em pelo menos 3 turnos distintos. BALDO: zero ouro em 7 turnos. A Mina Nv1 (+5/t) e Nv2 (+8/t) são fundamentalmente insuficientes para sustentar construção + recrutamento simultâneos. O gargalo force-escolha entre "construir estrutura" e "recrutar tropas" em quase todos os turnos. > *"OURO ZERO NOVAMENTE. Último turno de recrutamento e ainda o mesmo ciclo. É um design que não foi resolvido." (BALDO, T24, S6)* > *"Ouro ainda é o recurso mais limitante e o jogo não comunica isso claramente o suficiente." (BALDO, T7, S6)* | 4/6 | 8 | 6 | não |
| D-068 | pain | interface | **UX de redistribuição de tropas exaustiva em 4+ territórios — sem modo de distribuição automática.** Com 4 ou mais territórios, redistribuir tropas requer 3 cliques por movimento × 4+ territórios = 12+ interações por rodada de reorganização. BALDO: "6 cliques para redistribuir 4 grupos". ARIA: "maior pain de UX desta partida — redistribuir 4 grupos de tropas levou muito tempo". CAIUS: "microgerenciamento de 5 territórios é exaustivo". Todos pedem botão "Auto-Distribuir igualmente". > *"Redistribuir manualmente 4 grupos de tropas levou muito tempo e cliques. É minha maior reclamação de UX desta partida." (ARIA, T18, S6)* > *"A redistribuição de 4 territórios levou 6 cliques. Precisa de um botão 'Auto-Distribuir'." (BALDO, T22, S6)* | 4/6 | 8 | 6 | não |
| D-069 | pain | diversao | **Reconquista trivial após ataque da Horda — território tomado fica sem defensor, neutralizando a punição.** A Horda conquista um território mas não deixa defensor. O jogador atacado pode reconquistar no mesmo turno ou no seguinte sem custo significativo. CAIUS perdeu T4 e reconquistou no T20 (mesmo turno). ARIA perdeu T0 e reconquistou em T22. A Horda como mecanismo de punição do líder perde seu poder quando a punição é revertível imediatamente, especialmente para quem tem exército grande. > *"Reconquistei T4 no mesmo turno. Mecânica estranha — reconquistar território que a Horda acabou de tomar é trivial? Para um jogador menor, a Horda teria sido devastadora." (CAIUS, T20, S6)* | 2/6 | 7 | 6 | não |
| D-070 | pain | interface | **Sistema de cartas completamente passivo — nenhum lembrete ativo leva jogadores a esquecer cartas por 10+ turnos.** ARIA recebeu carta estimada no T~11 e a usou no T23 — 12 turnos de uso potencial perdidos. FIO nunca descobriu cartas. 4/6 agentes não usaram cartas em momento estrategicamente ótimo. O banner no ExpeditionModal (S4) é insuficiente: só visível quando abre o modal, não durante o turno normal. O inventário de cartas não tem indicador visual passivo no HUD principal. > *"Verifico inventário — tenho 'Colheita Farta'! Nunca usei carta em toda a partida. Provavelmente estava no inventário por 10+ turnos sem eu notar. Descoberta tardia de uma boa ferramenta." (ARIA, T23, S6)* | 4/6 | 7 | 6 | não |
| D-071 | pain | mecanica | **Bônus facção Umbral mal comunicado — fórmula multiplicativa vs aditiva não é intuitiva.** EZRA calculou inicialmente que o bônus +30% de eficiência Umbral resultaria em 80% de chance de sucesso (50%+30%), antes de corrigir para 65% (50%×1.3). A distinção multiplicativa vs aditiva não está documentada no tooltip. O tooltip mostra "65% chance de sucesso" sem explicar a fórmula. Se o jogador que escolheu a facção de espionagem por seu bônus não consegue calcular corretamente o bônus, ele não pode tomar decisões estratégicas informadas sobre quando usar espiões. > *"Umbral +30% = base 50% × 1.3 = 65%... espera, o bônus é 30% da eficiência BASE, então 50%×1.3 = 65%, não 80%. O tooltip diz 65% de sucesso." (EZRA, T3, S6 — corrigiu-se mas revela confusão real)* | 1/6 (observado no log) | 6 | 6 | não |
| D-072 | pain | interface | **Estimativas de fog of war muito amplas para planejamento estratégico preciso.** O tooltip de escala de ameaça fornece ranges como "4-8 unidades" ou "2-5 unidades" — variação de 3-4 unidades. Para o threshold de combate (precisa ataque > defesa × 1.5), a diferença entre defesa=2 e defesa=5 é atacar com 4 soldados (seguro) vs precisar de 8 (insuficiente na maioria dos casos). A estimativa vaga torna o fog of war um obstáculo em vez de um elemento estratégico. > *"A escala de ameaça é vaga demais. 'Estimativa 2-5 unidades' é um range de 3 unidades — a diferença entre vencer facilmente e perder feio." (CAIUS, T7, S6)* > *"O único ponto de incerteza é a defesa inimiga quando há fog of war — a estimativa '2-5 unidades' é vaga demais para planejamento preciso." (ARIA, Q7, S6)* | 3/6 | 7 | 6 | não |
| D-073 | pain | interface | **Aviso de produção zero aparece no T2 (retrospectivo) em vez de T1 (preventivo) — novato comete build-order errada antes de ser orientado.** FIO construiu Quartel no T1 (sem produção) e só recebeu o aviso no T2 — depois que o erro já foi cometido. Se o aviso aparecesse antes da primeira ação do T1, novatos construiriam Fazenda como primeira estrutura. O aviso retrospectivo não previne o erro, apenas documenta. > *"Por que o aviso só apareceu no T2 e não no T1? Se tivesse aparecido no T1 eu teria construído Fazenda antes do Quartel." (FIO, T2, S6)* | 2/6 | 6 | 6 | não |
| D-074 | pain | mecanica | **Meta-dominância de Ferronatos Militar Ofensiva persiste pelo 2º sprint consecutivo.** CAIUS (Ferronatos Militar) venceu pelo 2º sprint consecutivo com a mesma build order. 3 dos 5 finalistas eram Ferronatos. A facção com +20% em ataque E defesa é categoricamente superior: 4 soldados Ferronatos = 9.6 ataque, equivalente a quase 5 soldados normais. A melhora de BALDO para 2º é um progresso real mas insuficiente — a diversidade de facções como diferencial de replay depende de múltiplos arquétipos viáveis, não apenas um. > *"A dominância militar com Ferronatos continua sendo a estratégia mais forte. A meta não mudou — apenas uma estratégia adicional se tornou competitiva." (CAIUS, impressões gerais, S6)* | 4/6 | 8 | 6 | não |
| D-075 | pain | diversao | **Ranking durante a partida ausente — jogador não sabe sua posição relativa em nenhum momento até o fim do jogo.** Sem placar em tempo real, decisões estratégicas críticas ("devo expandir ou consolidar?", "a Horda vai atacar os outros ou eu?") são tomadas sem informação sobre a posição relativa. CAIUS (champion.md) pediu explicitamente: "placar visível para saber em que posição estou a cada turno, não apenas ao final". A ausência de ranking em tempo real remove uma dimensão estratégica relevante. > *"Ranking visual durante o jogo: placar visível para saber em que posição estou a cada turno, não apenas ao final." (CAIUS, champion.md, S6)* | 2/6 | 6 | 6 | não |

---

### Gains — Sprints 1-5 (mantidos)

| ID | Tipo | Categoria | Descrição | Frequência (x/6) | Score (1-10) | Sprint | Status |
|----|------|-----------|-----------|:-----------------:|:------------:|:------:|:------:|
| G-001 | gain | diversao | **Transição de era animada.** Unanimidade por 6 sprints consecutivos. S6: ARIA (T9): "Banner muito mais impactante que S5". FIO: "muito bonito". | 6/6 | 10 | 1 | — |
| G-002 | gain | mecanica | **Wall como defesa passiva estratégica.** S6: confirmado por BALDO (2 muralhas decisivas) e ARIA (sobreviveu a Horda força 100 com Muralha em T3). | 5/6 | 9 | 1 | — |
| G-003 | gain | mecanica | **Horda como mecanismo anti-snowball.** | 4/6 | 8 | 1 | — |
| G-004 | gain | diversao | **Narrativas atmosféricas de exploração.** | 3/6 | 7 | 1 | — |
| G-005 | gain | interface | **Clareza visual do mapa por clã.** S6: confirmado por todos. | 6/6 | 9 | 1 | — |
| G-006 | gain | diversao | **Feedback de conquista com saque listado.** | 3/6 | 7 | 1 | — |
| G-007 | gain | diversao | **Expedições como loop autônomo de risco/recompensa.** | 3/6 | 9 | 2 | — |
| G-008 | gain | mecanica | **Defesa bem-sucedida cria satisfação de mérito genuíno.** S6: BALDO T13: "MOMENTO DO JOGO! Muralha bloqueou ataque sem perdas." | 4/6 | 8 | 2 | — |
| G-009 | gain | diversao | **Loop conquista → saque → reinvestimento em PvP.** | 5/6 | 9 | 3 | — |
| G-010 | gain | interface | **Overlay visual de território revelado por espião.** S6: EZRA: *"o momento mais satisfatório de toda a série."* | 3/6 | 9 | 3 | — |
| G-011 | gain | mecanica | **Variedade perceptível de personalidades de IA.** | 4/6 | 8 | 3 | — |
| G-012 | gain | diversao | **GameResultsScreen com ranking animado.** | 6/6 | 10 | 4 | — |
| G-013 | gain | interface | **Modal informativo da Horda com escala de força e timing.** | 5/6 | 9 | 4 | — |
| G-014 | gain | interface | **Countdown da Horda no HUD.** S6: BALDO (T19): "vantagem inesperada de ser menor que ARIA — abaixo do radar da primeira onda". | 5/6 | 9 | 4 | — |
| G-015 | gain | interface | **Labels de produção visíveis antes de construir.** S6: amplificado pelo display de produção/turno (→ G-024). | 6/6 | 9 | 4 | — |
| G-016 | gain | interface | **Botões desabilitados com recurso insuficiente.** | 5/6 | 9 | 4 | — |
| G-017 | gain | interface | **TipBanner contextual no momento relevante.** | 4/6 | 8 | 4 | — |
| G-018 | gain | interface | **Defense badges nos territórios próprios.** | 4/6 | 7 | 4 | — |
| G-019 | gain | mecanica | **Banner de sugestão de carta no ExpeditionModal.** | 3/6 | 8 | 4 | — |
| G-020 | gain | mecanica | **CombatPreview com sistema de ratio transparente.** S6: expandido com threshold 1.5x e texto explicativo (→ G-027). | 4/6 | 9 | 5 | — |
| G-021 | gain | mecanica | **Horda como instrumento estratégico emergente.** S6: BALDO usou Horda para atacar AI2 no T21 enquanto Horda ocupava ARIA. | 3/6 | 9 | 5 | — |
| G-022 | gain | interface | **Aviso "Ataque Chegando".** S6: expandido para sistema de ameaça visual completo (→ G-029). | 3/6 | 8 | 5 | — |
| G-023 | gain | diversao | **Narrativa de reconquista — arco emocional perda → recuperação.** S6: BALDO T21: expansão oportunista durante Horda como o melhor momento do jogo. | 3/6 | 8 | 5 | — |

---

### Gains — Sprint 6 — Wave 6 (NOVOS)

| ID | Tipo | Categoria | Descrição | Frequência (x/6) | Score (1-10) | Sprint | Status |
|----|------|-----------|-----------|:-----------------:|:------------:|:------:|:------:|
| G-024 | gain | interface | **Display de produção por turno (+X/t) no ResourcePanel — transforma planejamento de adivinhação em cálculo preciso.** O indicador de produção ao lado de cada recurso foi o elogio mais unânime do sprint 6. BALDO calculou quando poderia construir a Muralha (T5) usando apenas as projeções do display. ARIA: "É exatamente o que sempre quis." CAIUS: "Bom feature — exibe informação crítica que antes requeria cálculo mental." FIO: "Mostrou que precisava construir algo." > *"O display de produção/turno (+12/t) é exatamente o que sempre quis. Sei em tempo real o que estou ganhando. O display de produção por turno é a melhor adição de toda a série de sprints." (ARIA, Q23, S6)* | 6/6 | 10 | 6 | — |
| G-025 | gain | mecanica | **Fog of war com revelação por espião — momento de ver badge "3 soldados" substituir "?" é a experiência mais satisfatória de toda a série.** Para EZRA (eliminado), revelar T1 via espião foi o melhor momento do jogo. Para CAIUS, o fog of war criou a primeira decisão genuína de NÃO atacar baseada em incerteza informacional (T7). A mecânica funciona perfeitamente — o problema é o contexto econômico ao redor dela (deadlock Umbral). > *"Ver o badge '3 soldados' onde antes havia '?' é genuinamente satisfatório. A revelação é visualmente clara e impactante." (EZRA, T3, S6)* > *"O fog of war e a escala de ameaça me forçou a raciocinar de verdade." (CAIUS, T7, S6)* | 5/6 | 9 | 6 | — |
| G-026 | gain | mecanica | **Custo Muralha Nv1 reduzido de 50 para 25 madeira — desbloqueou completamente o arquétipo defensivo.** BALDO construiu Muralha no T3 (impossível em S5). Resultado: de eliminado no T11 para 2º lugar com 4 territórios. ARIA construiu 2 Muralhas durante a Era da Guerra — sobreviveu à Horda força 100. Impacto mensurável: taxa de sobrevivência saltou de 2/6 para 5/6. > *"ESSA É A FEATURE MAIS IMPORTANTE DO SPRINT. A correção do custo desbloqueou completamente a estratégia defensiva." (BALDO, T3, S6)* | 5/6 | 10 | 6 | — |
| G-027 | gain | mecanica | **CombatPreview com threshold 1.5x explicado + texto descritivo "Vitória Decisiva — conquista garantida".** Ensinou a mecânica de combate de forma eficaz para todos os perfis. Novato (FIO) entendeu via texto sem precisar da fórmula. Experiente (CAIUS) usou para decidir NÃO atacar T7 com base no fog + threshold — primeira vez que a incerteza informacional gerou decisão estratégica de abstenção. > *"O texto 'conquista garantida' sim, o número 1.5× não, mas foi suficiente para eu agir." (FIO, T5, S6)* > *"Pela primeira vez o fog of war me forçou a raciocinar antes de atacar." (CAIUS, T7, S6)* | 5/6 | 9 | 6 | — |
| G-028 | gain | interface | **Highlight de adjacência ao selecionar território — resolve D-059 completamente e é a feature favorita do perfil novato.** Linhas de conexão + destaque azul ao selecionar território eliminam a necessidade de memorizar o grid 4×3. FIO: "Nunca mais precisei memorizar o grid." CAIUS: "Útil para visualizar alcance sem calcular." O único feedback negativo: o highlight ilumina todos os territórios no range, incluindo os que o jogador não quer atacar — pode confundir novatos sobre a obrigatoriedade de atacar. > *"O highlight de adjacência ao clicar em território é muito intuitivo — não precisei decorar o mapa." (FIO, T4, S6)* | 5/6 | 9 | 6 | — |
| G-029 | gain | interface | **Sistema de ameaça visual com escala (F-095/F-096) — alertas de ameaça salvaram territórios para 4/6 agentes e foi decisivo para a sobrevivência 5/6.** Símbolos coloridos (verde/amarelo/laranja/vermelho) + tooltips com estimativas de força criaram antecipação real. ARIA salvou T6 em T9. FIO salvou T4 em T12. DARA sobreviveu ao jogo completo. BALDO tomou decisão de reforço antes do ataque. A visualização antecipada de ameaça é o principal responsável pelo salto de sobrevivência. > *"Símbolo de ameaça vermelho piscante em T5 foi aviso claro. Vi o perigo antes de ser pego de surpresa — isso é novo e excelente!" (ARIA, T9, S6)* > *"O símbolo de ameaça piscante me chamou atenção. O tooltip me explicou o que fazer. Pela primeira vez o jogo me orientou proativamente sobre ameaça militar." (FIO, T7, S6)* | 5/6 | 10 | 6 | — |

---

## Resumo por Categoria (Acumulado Sprint 6)

| Categoria | S1 | S2 | S3 | S4 | S5 | S6 | Total Pains | Gains Total |
|-----------|:--:|:--:|:--:|:--:|:--:|:--:|:-----------:|:-----------:|
| interface | 5 | 4 | 5 | 6 | 4 | 3 | **27** | 9 |
| mecanica | 4 | 7 | 5 | 3 | 5 | 5 | **29** | 14 |
| diversao | 1 | 1 | 1 | 2 | 2 | 2 | **9** | 6 |
| agencia | 2 | 0 | 0 | 0 | 0 | 0 | **2** | 0 |
| bugs | 1 | 0 | 0 | 0 | 1 | 0 | **2** | 0 |
| **TOTAL** | 13 | 12 | 11 | 11 | 13 | **10** | **69** | **29** |

---

## Status de Implementação — Atualizado S6

**Implementados com sucesso (resolvidos):**
- D-002 (Timer navegação) → sim S3
- D-003 (Umbral sem espiões) → sim S3
- D-010 (Bônus facção invisível) → sim S3
- D-011 (Tela vitória sem narrativa) → sim S4
- D-016 (Sem UI ataque PvP) → sim S3
- D-017 (Timer 10s) → sim S3
- D-020 (Sem aviso custo) → sim S3
- D-023 (Bônus facção invisível v2) → sim S3
- D-028 (Botões habilitados sem recursos) → sim S4
- D-029 (Sem preview de produção) → sim S4
- D-032 (Fim de jogo abrupto) → sim S4
- D-033 (Horda sem explicação) → sim S4
- D-037 (Sem preview tempo expedição) → sim S4
- D-043 (Alerta de ataque iminente) → sim S5
- **D-053 (Custo Muralha 50 madeira) → sim S6 (F-084)** ← NOVO
- **D-056 (Ataque chegando sem escala) → sim S6 (F-095/F-096)** ← NOVO
- **D-058 (Sem aviso ao desproteger) → sim S6 (F-088)** ← NOVO
- **D-059 (Adjacências não visualizadas) → sim S6 (F-092/F-093)** ← NOVO
- **D-061 (Vitória ≠ conquista não explicado) → sim S6 (CombatPreview texto)** ← NOVO
- **D-062 (67% eliminados sem ver Horda) → sim S6 (sobrevivência 5/6 = 83%)** ← NOVO

**Parcialmente implementados:**
- D-001 (Sem preview combate) → parcial (fog estimativas vagas → D-072)
- D-004 (Sem tutorial) → parcial (adjacências OK; eras sem explicação → D-045)
- D-008 (Cartas desconectadas) → parcial (→ D-070)
- D-018 (Treino sem lote) → parcial
- D-022 (Sem mover tropas) → parcial (Reforço existe; UX tedioso → D-068)
- D-024 (Cartas inutilizáveis) → parcial (→ D-070)
- D-025 (Diplomacia sem feedback) → parcial
- D-030 (Cartas ignoradas) → parcial (→ D-070)
- D-034 (Sem overview tropas) → parcial (fog+ameaça; exatos ausentes → D-042)
- D-040 (Sem tutorial novatos) → parcial
- D-041 (Deadlock build) → parcial (→ D-066 mais grave)
- D-042 (Sem visibilidade tropas inimigas) → parcial (fog+escala; exatos ausentes)
- D-047 (Defense badges só próprios) → parcial (fog+escala; exatos ausentes)
- D-054 (Meta dominante) → parcial (defensivo viável; Ferronatos ainda domina → D-074)

**Não implementados (persistentes):**
D-005, D-006, D-007, D-009, D-012, D-013, D-014, D-015, D-019, D-021, D-026, D-027, D-031, D-035, D-036, D-038, D-039, D-044, D-045, D-046, D-048, D-049, D-050, D-051, D-052, D-055, D-060, D-063, D-064, D-065, D-066, D-067, D-068, D-069, D-070, D-071, D-072, D-073, D-074, D-075

---

## Top 10 Pains Ativos por Impacto — Sprint 6 (Score × Frequência)

| Rank | ID | Score | Freq | Produto | Descrição Resumida | Sprint |
|------|----|:-----:|:----:|:-------:|--------------------|:------:|
| 1 | D-066 | 9 | ~1/6* | **~9** | Deadlock econômico Umbral — facção inteira inviabilizada para build intuitiva | 6 |
| 2 | D-044 | 9 | 4/6 | **36** | Horda sem localização de território-alvo | 4 |
| 3 | D-067 | 8 | 4/6 | **32** | Gargalo de ouro crônico — Mina produz menos que a demanda | 6 |
| 4 | D-074 | 8 | 4/6 | **32** | Meta-dominância Ferronatos pelo 2º sprint consecutivo | 6 |
| 5 | D-068 | 8 | 4/6 | **32** | UX redistribuição tropas — 12+ cliques por reorganização | 6 |
| 6 | D-070 | 7 | 4/6 | **28** | Cartas passivas — esquecidas por 10+ turnos sem notificação | 6 |
| 7 | D-072 | 7 | 3/6 | **21** | Estimativas fog of war vagas demais para planejamento | 6 |
| 8 | D-031 | 7 | 5/6 | **35** | Ouro gargalo sistêmico não comunicado (raiz de D-067) | 3 |
| 9 | D-035 | 6 | 4/6 | **24** | Diplomacia sem efeito concreto — 5 sprints consecutivos | 3 |
| 10 | D-069 | 7 | 2/6 | **14** | Reconquista trivial pós-Horda esvazia punição ao líder | 6 |

*D-066 afeta 100% dos jogadores que escolherem Umbral com build intuitiva; frequência de 1/6 é artefato do playtesting, não do problema.

---

## Insights Críticos de Divergência Log vs Entrevista — Sprint 6

| Agente | Pain no Log | Na Entrevista | Pain Real |
|--------|-------------|---------------|-----------|
| ARIA (3ª) | Raiva explícita: "RAIVA. D-044 é um pain crítico." Gargalo de ouro em 6 turnos. Carta esquecida 12 turnos. | "Era da Invasão criou urgência real" (positivo). Carta mencionada brevemente. NPS 8/10. | **Entrevista positiva mascara raiva genuína. A nota 8 está inflada pela sobrevivência. Log é mais honesto sobre D-044 e cartas passivas.** |
| BALDO (2º) | Gargalo de ouro: "OURO ZERO" em 7 turnos. "Ciclo vicioso. É um design que não foi resolvido." | NPS 9/10. Foco na revolução da Muralha. Ouro mencionado mas não como pain principal. | **DIVERGÊNCIA CRÍTICA: A euforia da Muralha suprimiu na entrevista a frustração crônica com ouro. D-067 é mais sistêmico do que o NPS 9 sugere.** |
| CAIUS (1º) | Microgerenciamento exaustivo (5 territórios). Reconquista trivial pós-Horda: "mecânica estranha". | Focado em "o que tornaria a vitória mais épica". Microgerenciamento citado mas como custo aceitável. | **INSIGHT NOVO: A mecânica de reconquista trivial (D-069) só aparece no log — na entrevista foca em melhorias de narrativa. Pain de design não articulado.** |
| EZRA (último) | Cálculo incorreto do bônus Umbral (80% inicial, corrigiu para 65%). Desespero crescente: "GAME STUCK" em 3 turnos consecutivos. | Mais reflexivo e analítico. Confusão de fórmula não mencionada. | **DIVERGÊNCIA: Log registra confusão de mecânica real que não foi articulada na entrevista. D-071 é invisível sem o log. A entrevista "inteligente" de EZRA mascara confusão de cálculo.** |
| FIO (novato) | "O que mudou na Era da Guerra?" — dúvida por toda a Era da Guerra (T9-T18). Grão acumulado sem uso. | NPS 7/10 — considerou que o jogo "ajudou bastante". | **Nota 7 generosa dado confusão persistente sobre mecânicas de era. O log revela desorientação fundamental que a entrevista suaviza como "aprendizado durante o jogo".** |

---

## Evolução de NPS por Bloco Temático

| Bloco | S1 | S2 | S3 | S4 | S5 | S6 | Delta S5→S6 |
|-------|:--:|:--:|:--:|:--:|:--:|:--:|:-----------:|
| Interface | — | — | 5/10 | 7/10 | 6/10 | **8/10** | **+2** |
| Mecânicas de Combate | — | — | 7/10 | 7/10 | 7/10 | **8/10** | **+1** |
| Sistema Econômico | — | — | 5/10 | 6/10 | 5/10 | **6/10** | **+1** |
| Diplomacia | — | — | 3/10 | 3/10 | 3/10 | **3/10** | = (5º sprint consecutivo) |
| Espionagem | — | — | 6/10 | 7/10 | 5/10 | **4/10** | **-1** (Umbral deadlock em S6) |
| Progressão de Era | — | — | 8/10 | 8/10 | 7/10 | **7/10** | = (eras sem explicação mecânica) |
| Feedback de Fim de Jogo | — | — | 2/10 | 8/10 | 8/10 | **8/10** | = |
| Visibilidade de Ameaça | — | — | — | 5/10 | 6/10 | **9/10** | **+3** (fog + escala implementados) |
| Defesa/Muralha | — | — | — | 3/10 | 2/10 | **9/10** | **+7** (custo 25 madeira) |
| **Geral** | **5,5** | **5,8** | **6,0** | **6,5** | **5,7** | **7,3** | **+1,6** |

> **Nota:** A melhora significativa em S6 reflete impacto direto das features de UX (display produção, fog+ameaça, custo Muralha). A queda em Espionagem reflete o deadlock Umbral descoberto. Diplomacia permanece em 3/10 — 5º sprint consecutivo sem progresso.
