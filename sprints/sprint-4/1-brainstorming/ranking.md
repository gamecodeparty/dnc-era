# Ranking Final — Sprint 4 Playtesting
**Modo:** Rápido (8 turnos Paz + 10 turnos Guerra + 7 turnos Invasão = 25 turnos)
**Data:** 2026-03-11

---

## Tabela de Pontuação

| # | Agente | Facção | Estratégia | Territórios | Grain | Soldados | Score | Nota |
|---|--------|--------|------------|:-----------:|:-----:|:--------:|:-----:|:----:|
| 🥇 | CLEO (Agent-C) | Ferronatos | Militar Ofensiva | 6 | 180 | 45 | 2025 | 7/10 |
| 🥈 | ARIANA (Agent-A) | Verdâneos | Econômica Agressiva | 5 | 355 | 20 | 1980 | 7/10 |
| 🥉 | ESPA (Agent-E) | Umbral | Espionagem/Diplomacia | 5 | 210 | 12 | 1760 | 7/10 |
| 4º | DAVI (Agent-D) | Ferronatos | Militar Reativa | 4 | 140 | 38 | 1720 | 6/10 |
| 5º | BETO (Agent-B) | Verdâneos | Econômica Defensiva | 3 | 195 | 20 | 1595 | 6/10 |
| 6º | FELIX (Agent-F) | Ferronatos | Instintiva (Novato) | 3 | 90 | 10 | 1435 | 5/10 |

---

## Fórmula de Score

```
Score = Territórios × 100 + Populacao × 10 + Gold × 1 + Unidades × 5
```

> **Nota:** Populacao fixada em 100 para todos os agentes — bug de UI persistente de sprints anteriores ainda não resolvido. O componente de populacao exibe valor estático independente do estado real do clã. Isso nivela artificialmente essa dimensão do score e mascara diferenças de crescimento econômico entre facções.

---

## Estatísticas Gerais

| Métrica | Valor |
|---------|-------|
| Score médio | 1752,5 |
| Score máximo | 2025 (CLEO) |
| Score mínimo | 1435 (FELIX) |
| Desvio padrão | ~213 |
| Nota média | 6,3/10 |
| Taxa de sobrevivência | 6/6 (100%) — nenhum clã eliminado |
| Clãs AI eliminados pela Horda | 0 — Horda alcançou força 150 no turno 25, mas nenhum clã foi varrido |

> A sobrevivência universal reflete o modo Rápido (25 turnos): a Horda não atingiu força máxima antes do fim da sessão. Em modo Normal (50 turnos) espera-se eliminação de 1–2 clãs na Era de Invasão.

---

## Análise por Estratégia

### Estratégias que funcionaram

**1. Militar Ofensiva (CLEO — Ferronatos, 1º lugar)**
Expansão territorial agressiva nos turnos 6–12 da Era de Guerra rendeu 6 territórios — o máximo observado. O bônus passivo dos Ferronatos (+15% ataque) combinado com produção de Cavaleiros a partir do turno 10 criou uma vantagem de combate difícil de reverter. O ponto de inflexão foi a conquista do território central (bônus de grain) no turno 8, que financiou o exército restante. Score elevado por unidades (45 soldados × 5 = 225) compensa o grain abaixo da média (180).

**2. Econômica Agressiva (ARIANA — Verdâneos, 2º lugar)**
A estratégia de Ariana priorizou construção de Fazendas e Moinhos nos primeiros 8 turnos, acumulando 355 de grain no final — o maior da sessão. Os Verdâneos (+20% produção de recursos) potencializam esse caminho. Apesar de só 20 soldados, o score total ficou a 45 pontos do 1º lugar: o grain acumulado (355 × 1 = 355) quase compensou a desvantagem territorial. Demonstra que o sistema econômico é competitivo quando executado consistentemente.

**3. Espionagem/Diplomacia (ESPA — Umbral, 3º lugar)**
ESPA usou Espiões para desorganizar as construções de DAVI (turnos 14–16), atrasando sua expansão e indiretamente protegendo dois territórios fronteiriços. O resultado 3º lugar com apenas 12 soldados valida a viabilidade do caminho furtivo, embora a diplomacia formal não tenha gerado efeito mensurável (ver Pain Points). O bônus de facção Umbral (+espionagem) é funcional mas invisível na UI — ESPA reportou não saber se o bônus estava ativo.

### Estratégias que encontraram dificuldades

**1. Militar Reativa (DAVI — Ferronatos, 4º lugar)**
DAVI esperou ser atacado antes de investir em militarização, o que atrasou a expansão para os turnos 15–18 — tarde demais para competir com CLEO já estabelecida. A estratégia reativa desperdiçou o bônus ofensivo dos Ferronatos. 38 soldados no final indicam capacidade militar alta mas subutilizada: a janela de expansão na Era de Guerra (turnos 9–18) foi perdida.

**2. Econômica Defensiva (BETO — Verdâneos, 5º lugar)**
BETO acumulou 195 de grain mas só 3 territórios — abaixo do esperado para uma estratégia econômica. O problema foi a ordem de construção: Taverna no turno 3 antes de Fazenda criou um deadlock econômico que atrasou a produção em ~4 turnos. BETO reportou frustração com a falta de feedback sobre dependências de construção (D-041). Com a ordem correta, a diferença para ARIANA seria menor.

**3. Instintiva/Novato (FELIX — Ferronatos, 6º lugar)**
FELIX jogou sem estratégia definida, explorando mecânicas organicamente. Score 1435 é, surpreendentemente, não-catastrófico — indica que o jogo tem um piso de viabilidade razoável para novatos. Os principais problemas foram grain baixo (90) por falta de estruturas produtivas e unidades mínimas (10). O TipBanner (F-053/F-054/F-055) foi citado como o principal auxílio, mas Felix ainda não entendeu o sistema de bônus de facção.

---

## Impacto das Novas Features (Wave 4)

### Features bem-recebidas (citadas positivamente por >= 3 agentes)

- **F-033/F-034: Botões desabilitados sem recursos** — Citado por 5/6 agentes. Eliminou cliques frustrados em ações inviáveis. Impacto imediato na clareza de intenção: agentes sabem exatamente por que não podem agir sem precisar calcular manualmente. Reduziu fricção de onboarding para FELIX.

- **F-035/F-036: Labels de produção visíveis antes de construir** — Citado por 4/6 agentes. Permitiu planejamento antecipado de construção sem tentativa e erro. ARIANA e BETO reportaram usar essa informação ativamente na Era de Paz para sequenciar Fazenda → Serraria → Mina na ordem correta de retorno.

- **F-037: Banner de sugestão de carta no ExpeditionModal** — Citado por 3/6 agentes (CLEO, ESPA, FELIX). FELIX em particular creditou o banner por ter jogado a carta Colheita Abundante no momento certo, evitando colapso econômico no turno 11.

- **F-041/F-042: Tempo de viagem no mapa** — Citado por 4/6 agentes. Adicionou uma camada tática de planejamento: CLEO e DAVI ajustaram ataques para considerar chegada de reforços inimigos. Único ponto negativo: o tempo exibido não distingue entre terrenos planos e montanhosos (relatado por DAVI).

- **F-043/F-045: GameResultsScreen com ranking animado** — Citado por 6/6 agentes (unanimidade). A tela de resultados foi o momento de maior engajamento emocional da sessão. A animação de ranking com entrada sequencial gerou reações espontâneas. Principal fator responsável pelo salto de 2/10 → 8/10 em "Feedback de Fim de Jogo".

- **F-046/F-047: Defense power badges nos territórios** — Citado por 4/6 agentes. Tornou a decisão de atacar mais informada. ESPA usou os badges para identificar territórios subdefendidos de FELIX e BETO como alvos de espionagem. Ver nota em Features com implementação parcial.

- **F-049/F-050: Modal da Horda + countdown** — Citado por 5/6 agentes. O countdown criou tensão genuína na Era de Invasão mesmo com 25 turnos. ARIANA e ESPA relataram mudar estratégia nos últimos 4 turnos ao ver a Horda se aproximando. O modal de chegada da Horda foi descrito como "o primeiro momento de perigo real sentido no jogo".

- **F-053/F-054/F-055: TipBanner** — Citado por 4/6 agentes. FELIX foi o mais beneficiado (novato), mas BETO e DAVI também reportaram dicas úteis em momentos de indecisão. A integração contextual (dicas aparecem no momento relevante, não aleatoriamente) foi elogiada. Nenhum agente reportou as dicas como intrusivas.

### Features com implementação parcial (comportamento esperado não emergiu plenamente)

- **Defense badges (F-046):** Os badges de poder defensivo aparecem apenas nos territórios do próprio clã, não nos territórios inimigos. Isso limita o valor tático para o atacante: CLEO e DAVI sabiam sua própria defesa mas tinham de estimar a defesa inimiga. O comportamento esperado seria exibir badges em todos os territórios visíveis, com distinção visual entre próprios (verde) e inimigos (vermelho). Quatro agentes reportaram tentar clicar em territórios inimigos esperando ver o badge.

---

## Pain Points Persistentes (>= 2 agentes, sprint 4)

| ID | Pain Point | Frequência | Agentes Afetados |
|----|-----------|------------|-----------------|
| D-035 | Diplomacia sem efeito concreto — acordos de não-agressão declarados na UI não impedem ataques | 4/6 | ARIANA, ESPA, DAVI, BETO |
| D-038 | Grain acumula sem uso no late game — nenhum sumidouro econômico após cap de estruturas | 4/6 | ARIANA, ESPA, BETO, FELIX |
| D-NEW | Sem overview de tropas inimigas no mapa — impossível avaliar força militar adversária sem atacar | 4/6 | CLEO, DAVI, ESPA, BETO |
| D-036 | Spy countdown não exibe timer visual — agente não sabe quando espião retorna | 3/6 | ESPA, DAVI, FELIX |
| D-041 | Economic deadlock com ordem de build errada — sem indicação de pré-requisitos ou ordem recomendada | 2/6 | BETO, FELIX |
| D-042 | Bônus de facção invisível na UI (especialmente Umbral) — agentes jogam sem saber se bônus está ativo | 2/6 | ESPA, DAVI |

> **D-NEW** difere de D-034 (sprint anterior, sobre visibilidade do próprio território): D-NEW é sobre inteligência de forças inimigas. Candidato a feature de sprint 5 com prioridade media-alta dado o impacto em 4/6 agentes.

---

## Nota Média por Bloco Temático

| Bloco | Sprint 3 | Sprint 4 | Delta |
|-------|----------|----------|-------|
| Interface | 5/10 | 7/10 | +2 |
| Mecânicas de Combate | 7/10 | 7/10 | = |
| Sistema Econômico | 5/10 | 6/10 | +1 |
| Diplomacia | 3/10 | 3/10 | = |
| Espionagem | 6/10 | 7/10 | +1 |
| Progressão de Era | 8/10 | 8/10 | = |
| Feedback de Fim de Jogo | 2/10 | 8/10 | +6 (MAJOR WIN) |
| Sistema de Dicas (TipBanner) | — | 7/10 | NOVO |
| **Geral** | **6/10** | **6,5/10** | **+0,5** |

> **Destaque:** O salto de 2/10 → 8/10 em Feedback de Fim de Jogo é o maior ganho qualitativo do projeto até o momento. A GameResultsScreen (F-043/F-045) resolveu uma lacuna crítica de satisfação que era o principal fator de abandono pós-sessão no sprint 3.
>
> **Teto de melhoria:** Diplomacia permanece em 3/10 pela terceira sprint consecutiva. Sem mecânicas concretas vinculadas a acordos diplomáticos, o sistema é decorativo. Recomenda-se priorizar D-035 no sprint 5 ou remover o sistema até que possa ser implementado com efeitos reais.
