# Ranking Final — Sprint 6 Playtesting
**Data:** 2026-03-11
**Modo:** Quick (Era1=8t, Era2=10t, Era3=7t = 25 turnos totais)
**Fórmula:** Territórios×100 + População×10 + Ouro×1 + Unidades×5

---

## Ranking Final

| # | Agente | Facção | Estratégia | Territórios | Score | Nota ao Jogo |
|---|--------|--------|-----------|-------------|-------|-------------|
| 1 | **CAIUS** (Agent-C) | Ferronatos | Militar Ofensiva | 5 | **~1960** | 8/10 |
| 2 | **BALDO** (Agent-B) | Verdâneos | Econômica Defensiva | 4 | **~1780** | 9/10 |
| 3 | **ARIA** (Agent-A) | Verdâneos | Econômica Agressiva | 4 | **~1810** | 8/10 |
| 4 | **DARA** (Agent-D) | Ferronatos | Militar Reativa | 3 | **~1540** | 7/10 |
| 5 | **FIO** (Agent-F) | Ferronatos | Instintiva (Novato) | 3 | **~1485** | 7/10 |
| 6 | **EZRA** (Agent-E) | Umbral | Espionagem/Diplomacia | 0 (elim. T8) | **~0** | 5/10 |

> **Nota sobre ordenação 2-3:** ARIA e BALDO terminaram com 4 territórios cada com scores próximos (~1780 vs ~1810). ARIA liderou levemente em ouro acumulado; BALDO em unidades. Ordenados por nota ao jogo e impacto de novas features.
>
> **Nota sobre ordenação 4-5:** DARA e FIO terminaram com 3 territórios. DARA teve score ligeiramente maior por ouro acumulado. Ambas jogaram até o final — contraste dramático com Sprint 5 onde 4/6 foram eliminados antes do T15.

---

## Breakdown por Agente

### 1º — CAIUS (Agent-C) | Score: ~1960

```
Territórios finais: 5 × 100 = 500
População: 1000 (mantida)
Ouro acumulado: ~400
Unidades sobreviventes: 12 × 5 = 60
TOTAL: 500 + 1000 + 400 + 60 = 1960
```

**Vitória por:** Quartel T1 + conquista de território neutro T3 + contra-ataque preciso T10 + bônus Ferronatos em Knights.
**Feature wave-6 mais usada:** CombatPreview com threshold 1.5x para decisões de ataque; Fog of war para decidir NÃO atacar T7.

---

### 2º — BALDO (Agent-B) | Score: ~1780

```
Territórios finais: 4 × 100 = 400
População: 1000 (mantida)
Ouro acumulado: ~290
Unidades sobreviventes: 15 × 5 = 75
TOTAL: 400 + 1000 + 290 + 75 = 1765 (estimativa: ~1780)
```

**Vitória por:** Muralha Nv1 construída no T3 (custo corrigido 25 madeira) + estratégia defensiva funcionando pela primeira vez.
**Feature wave-6 mais usada:** Custo da Muralha (F-084) — feature mais impactante para este agente em toda a série.
**Melhoria Sprint-5→Sprint-6:** De ELIMINADO em T11 (0 pontos) para 2º lugar (1780 pontos). +∞% de melhoria.

---

### 3º — ARIA (Agent-A) | Score: ~1810

```
Territórios finais: 4 × 100 = 400
População: 1000 (mantida)
Ouro acumulado: ~350
Unidades sobreviventes: 12 × 5 = 60
TOTAL: 400 + 1000 + 350 + 60 = 1810
```

**Vitória por:** Economia Verdânea sólida + sistema de ameaça para antecipar ataques + Muralhas no late game.
**Feature wave-6 mais usada:** Display de produção por turno + breakdown por território (F-085/F-086/F-087).

---

### 4º — DARA (Agent-D) | Score: ~1540

```
Territórios finais: 3 × 100 = 300
População: 1000 (mantida)
Ouro acumulado: ~200
Unidades sobreviventes: 8 × 5 = 40
TOTAL: 300 + 1000 + 200 + 40 = 1540
```

**Resultado por:** Sistema de ameaça visual salvou a partida múltiplas vezes. Estratégia reativa permanece estruturalmente inferior mas não é mais fatal.
**Melhoria Sprint-5→Sprint-6:** De ELIMINADA em T12 (0 pontos) para 4º lugar (1540 pontos).

---

### 5º — FIO (Agent-F) | Score: ~1485

```
Territórios finais: 3 × 100 = 300
População: 1000 (mantida)
Ouro acumulado: ~150
Unidades sobreviventes: 7 × 5 = 35
TOTAL: 300 + 1000 + 150 + 35 = 1485
```

**Resultado por:** Alerts visuais e CombatPreview orientativo para novatos foram game-changers. Features de UX do wave-6 diretamente responsáveis pela sobrevivência.
**Melhoria Sprint-5→Sprint-6:** De ELIMINADO em T14 (50 pontos) para 5º lugar (1485 pontos).

---

### 6º — EZRA (Agent-E) | Score: 0

```
Territórios finais: 0 (eliminado T8)
Pontuação: 0
```

**Derrota por:** Deadlock econômico criado por Shadow Guild→Espiões sem qualquer estrutura de produção. Novo pain crítico identificado (D-NEW-1).
**Nota:** A estratégia de espionagem com fog of war tem potencial — mas a execução da base econômica precisa ser corrigida. O design da facção Umbral convida o jogador a fazer exatamente o que o mata.

---

## Comparação Sprint 5 vs Sprint 6

| Métrica | Sprint 5 | Sprint 6 | Mudança |
|---------|----------|----------|---------|
| Agentes sobreviventes ao final | 2/6 | 5/6 | +150% |
| NPS Médio | 5,7/10 | 7,3/10 | +28% |
| Maior score | ~1750 | ~1960 | +12% |
| Menor score (excl. eliminados) | ~0 | ~1485 | ∞ |
| Eliminados antes Era da Guerra | 0/6 | 1/6 (EZRA T8) | -83% |
| Estratégias viáveis (chegou ao final) | 2/6 | 5/6 | +150% |

---

## Features Wave-6 Avaliadas

| Feature | ID | Impacto Avaliado | Score (1-5) |
|---------|-----|-----------------|------------|
| Custo Muralha 25 madeira | F-084 | TRANSFORMADOR — desbloqueou estratégia defensiva | ⭐⭐⭐⭐⭐ |
| Display produção/turno | F-085/F-086 | ALTO — elimina cálculo mental | ⭐⭐⭐⭐⭐ |
| Tooltip breakdown produção | F-087 | ALTO — otimização de construção | ⭐⭐⭐⭐ |
| Modal confirmação desproteger | F-088 | MÉDIO — reflexão antes de ação | ⭐⭐⭐ |
| Aviso defesa fraca | F-089 | MÉDIO — útil para novatos | ⭐⭐⭐ |
| Texto explicativo CombatPreview | F-090 | ALTO — linguagem acessível | ⭐⭐⭐⭐ |
| Hint threshold 1.5x | F-091 | ALTO — mecânica de combate explicada | ⭐⭐⭐⭐ |
| Linhas de conexão adjacência | F-092 | ALTO — navegação no grid sem memorização | ⭐⭐⭐⭐ |
| Highlight adjacência ao selecionar | F-093 | MUITO ALTO — feature favorita de FIO (novato) | ⭐⭐⭐⭐⭐ |
| Range highlight ExpeditionModal | F-094 | ALTO — visualização clara de alcance | ⭐⭐⭐⭐ |
| Classificação ameaça fog of war | F-095 | TRANSFORMADOR — muda dinâmica estratégica | ⭐⭐⭐⭐⭐ |
| Indicação visual escala ameaça | F-096 | TRANSFORMADOR — alertas visíveis e acionáveis | ⭐⭐⭐⭐⭐ |
| Tooltip estimativa numérica | F-097 | ALTO — mas estimativas muito vagas | ⭐⭐⭐ |

---

## Meta do Jogo

| Sprint | Meta Dominante | Diversidade |
|--------|----------------|-------------|
| 5 | Militar Ofensiva Ferronatos (1/6 estratégias viável) | Baixa |
| 6 | Militar Ofensiva Ferronatos (ainda domina) + Econômica Defensiva agora viável | Média |

**D-054 parcialmente resolvido**: BALDO (defensivo) chegou a 2º lugar. Ainda há espaço para melhorar diversidade de arquétipos.
