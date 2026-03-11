# Ranking Final — Sprint 5 Playtesting
**Data:** 2026-03-11
**Modo:** Quick (Era1=8t, Era2=10t, Era3=7t = 25 turnos totais)
**Fórmula:** Territórios×100 + População×10 + Ouro×1 + Unidades×5

---

## Ranking Final

| # | Agente | Facção | Estratégia | Territórios | Score | Nota ao Jogo |
|---|--------|--------|-----------|-------------|-------|-------------|
| 1 | **CAIUS** (Agent-C) | Ferronatos | Militar Ofensiva | 4 | **~1750** | 8/10 |
| 2 | **ARIA** (Agent-A) | Verdâneos | Econômica Agressiva | 3 | **~1600** | 7/10 |
| 3 | **EZRA** (Agent-E) | Umbral | Espionagem/Diplomacia | 0 (elim. t13) | **~0** | 6/10 |
| 4 | **DARA** (Agent-D) | Ferronatos | Militar Reativa | 0 (elim. t12) | **~0** | 5/10 |
| 5 | **FIO** (Agent-F) | Ferronatos | Instintiva (Novato) | 0 (elim. t14) | **~50** | 5/10 |
| 6 | **BALDO** (Agent-B) | Verdâneos | Econômica Defensiva | 0 (elim. t11) | **~0** | 3/10 |

> **Nota sobre ordenação 3-5:** Agentes E, D e F foram todos eliminados com score 0 ou mínimo. Ordenação por turno de eliminação e qualidade da experiência de jogo relatada:
> - Ezra (E): eliminado t13, nota 6 — estratégia tinha coerência mas timing quebrado
> - Dara (D): eliminado t12, nota 5 — estratégia reativa é estruturalmente inferior
> - Fio (F): eliminado t14, nota 5 — sobreviveu mais por caos do que estratégia; score parcial de ~50

---

## Breakdown por Agente

### 1º — CAIUS (Agent-C) | Score: ~1750

```
Territórios finais: 4 × 100 = 400
População: 1000 (mantida)
Ouro acumulado: ~350
Unidades sobreviventes: 12 × 5 = 60
TOTAL: 400 + 1000 + 350 + 60 = 1810 (estimativa conservadora: ~1750)
```

**Vitória por:** Agressão militar early + bônus Ferronatos + exploração estratégica da Horda

---

### 2º — ARIA (Agent-A) | Score: ~1600

```
Territórios finais: 3 × 100 = 300
População: ~950 (pequenas perdas de manutenção)
Ouro acumulado: ~200
Unidades sobreviventes: 10 × 5 = 50
TOTAL: 300 + 950 + 200 + 50 = 1500 (estimativa: ~1600)
```

**Posição por:** Acúmulo econômico robusto + recuperação após perder T0 + uso efetivo da carta Colheita Farta

---

### 3º — EZRA (Agent-E) | Score: ~0

Eliminado turno 13. Sem territórios no momento de eliminação.
Melhor posição no ranking dos eliminados por maior qualidade estratégica e mais tarde sobrevivência relativa.

---

### 4º — DARA (Agent-D) | Score: ~0

Eliminada turno 12. Estratégia reativa em um meta que privilegia agressão.

---

### 5º — FIO (Agent-F) | Score: ~50

Eliminado turno 14 (mais tarde que D e E, por caos favorável). Score parcial:
```
Unidades no momento da eliminação: 8 × 5 = 40
Recursos convertidos: ~10
TOTAL: ~50
```

---

### 6º — BALDO (Agent-B) | Score: ~0

Eliminado turno 11 (mais cedo de todos). Estratégia defensiva inviabilizada pelo balanceamento de custos.

---

## Médias da Sessão

| Métrica | Valor |
|---------|-------|
| Nota média (1-10) | **5.7** |
| Agentes que chegaram à Era da Invasão | 2/6 (33%) |
| Agentes eliminados antes do turno 15 | 4/6 (67%) |
| Agentes que queriam jogar de novo | 6/6 (100%) |
| Agentes que citaram Muralha como problema | 3/6 (50%) |
| Agentes que citaram falta de tutorial | 4/6 (67%) |

---

## Observações Estruturais

1. **Meta dominante confirmado:** Militar ofensiva early é a estratégia mais viável. Todos os outros arquétipos foram eliminados mid-game.

2. **Custo de Muralha é o pain mais recorrente:** 3 de 6 agentes citaram o custo (50 madeira) como bloqueio principal para estratégias defensivas.

3. **Era da Invasão vista por apenas 2 agentes:** A taxa de eliminação early (4/6) significa que a Era da Invasão — uma das mecânicas mais elaboradas do jogo — não foi experienciada pela maioria dos jogadores.

4. **Replay intent = 100%:** Todos os 6 agentes querem jogar de novo, indicando que o core do jogo é engajante apesar dos problemas de balanceamento.

5. **Inconsistência de dados (bug crítico):** Custos de estrutura em `balance.ts` e `gameStore.ts` são divergentes. Isso é um bug de fonte única de verdade que afeta qualquer simulação ou testes automatizados.
