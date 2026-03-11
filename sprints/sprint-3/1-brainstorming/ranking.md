# Ranking Final — Sprint 3 Playtesting
**Modo:** Rápido (8 turnos Paz + 10 turnos Guerra + 7 turnos Invasão = 25 turnos)
**Data:** 2026-03-11

---

## Tabela de Pontuação

| # | Agente | Facção | Estratégia | Territórios | Grão | Soldados | Score | Nota ao Jogo |
|---|--------|--------|-----------|:-----------:|:----:|:--------:|:-----:|:------------:|
| 🥇 | **CLEO** (Agent-C) | Ferronatos | Militar Ofensiva | 7 | 195 | 50 | **2145** | 7/10 |
| 🥈 | **ARIANA** (Agent-A) | Verdaneos | Econômica Agressiva | 5 | 370 | 28 | **2010** | 7/10 |
| 🥉 | **ESPA** (Agent-E) | Umbral | Espionagem/Diplomacia | 5 | 245 | 13 | **1810** | 7/10 |
| 4º | **DAVI** (Agent-D) | Ferronatos | Militar Reativa | 4 | 65 | 52 | **1725** | 7/10 |
| 5º | **BETO** (Agent-B) | Verdaneos | Econômica Defensiva | 3 | 162 | 24 | **1582** | 5/10 |
| 6º | **FELIX** (Agent-F) | Ferronatos | Instintiva (Novato) | 3 | 96 | 15 | **1471** | 3/10 |

---

## Fórmula de Score

```
Score = Territórios × 100 + População × 10 + Ouro × 1 + Unidades × 5
```

*Nota: População fixada em 100 pois o sistema não exibe variação de pop na UI (bug). Ouro calculado com base em fluxo de recursos do log. Unidades = total de soldados sobreviventes.*

---

## Estatísticas Gerais

| Métrica | Valor |
|---------|-------|
| Média de score | 1791 |
| Score máximo | 2145 (CLEO) |
| Score mínimo | 1471 (FELIX) |
| Desvio padrão | ~248 |
| Média de nota ao jogo | 6.0/10 |
| Clãs AI eliminados (total) | 6 (Sul: 4x, Norte: 3x, Oeste: 1x, Leste: 0x) |
| Agentes que sobreviveram 25 turnos | 6/6 (100%) |

---

## Análise por Estratégia

### Estratégias que funcionaram
1. **Militar Ofensiva (Ferronatos)** — Maior score quando o loop saque→reinvestimento é atingido. Perigosa no early game (dead turns 3-7) mas dominant no late game.
2. **Econômica Agressiva (Verdaneos)** — Segunda melhor posição. Produção de grão alta facilita treinamento em massa. Gargalo: ouro.
3. **Espionagem (Umbral)** — Única estratégia que conseguiu informação real antes de atacar. Loop completo funcionou apenas 1x de 25 turnos — subutilizada por design econômico proibitivo.

### Estratégias que falharam
4. **Militar Reativa** — Impossível sem informação prévia de ataques. A reatividade requer antecipação que o jogo não fornece.
5. **Econômica Defensiva** — Wall é economicamente inacessível no early game (custo 50 madeira + 20 ouro). Estratégia inviável como declarada.
6. **Instintiva (Novato)** — O jogo não suporta jogadores sem conhecimento das mecânicas de sequência de construção.

---

## Pain Points Confirmados (≥ 2 agentes)

| Pain | Frequência | Agentes afetados |
|------|:----------:|-----------------|
| Botões habilitados mesmo sem recursos | 6/6 | Todos |
| Sem tooltip de produção antes de construir | 6/6 | Todos |
| Cartas completamente ignoradas | 6/6 | Todos |
| Sem contagem de turnos no preview de expedição | 5/6 | A, B, C, D, E |
| Ouro como gargalo sistêmico | 5/6 | A, B, C, D, E |
| Fim de jogo abrupto sem cerimônia | 5/6 | A, B, C, D, E |
| Sem overview de tropas por território no mapa | 4/6 | A, C, D, E |
| Diplomacia sem efeito concreto | 4/6 | A, B, D, E |
| Duração de revelação de espião muito curta | 3/6 | A, D, E |
| Sem tutorial/onboarding | 3/6 | B, C, F |
| Horda não explica mecânica de alvo | 4/6 | A, C, D, F |

---

## Gains Confirmados (≥ 2 agentes)

| Gain | Frequência | Agentes que citaram |
|------|:----------:|-------------------|
| Animação de transição de era | 6/6 | Todos |
| Sistema de saque de recursos | 5/6 | A, C, D, E, F |
| Overlay visual de revelação de espião | 3/6 | A, D, E |
| Loop de conquista → saque → reinvestimento | 4/6 | A, C, D, E |
| Variedade de personalidades AI (comportamento distinto) | 3/6 | A, C, D |
| Cores do mapa claras por clã | 4/6 | A, B, D, E |
| Atmosfera medieval coerente | 3/6 | A, B, F |

---

## Nota Média por Bloco Temático (estimativa)

| Bloco | Nota |
|-------|:----:|
| Interface e UX | 5/10 |
| Mecânicas de Combate | 7/10 |
| Sistema Econômico | 5/10 |
| Diplomacia | 3/10 |
| Espionagem | 6/10 |
| Progressão de Era | 8/10 |
| Feedback de Fim de Jogo | 2/10 |
| **Geral** | **6/10** |
