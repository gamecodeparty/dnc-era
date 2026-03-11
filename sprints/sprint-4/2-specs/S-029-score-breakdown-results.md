# S-029 — Breakdown de Pontuacao na GameResultsScreen

**Discoveries:** D-048 (score 6/10, frequencia 4/6), G-012 (amplificacao, score 10/10)
**Tipo:** Pain + Gain amplification — Sem breakdown de como pontuacao foi calculada

---

## Objetivo

Adicionar secao de breakdown de pontuacao na GameResultsScreen. A tela de resultados (F-043/F-045) eh unanimemente elogiada (6/6, score 10) mas nao mostra como a pontuacao foi calculada linha por linha. Ariana fez calculos mentais. Davi queria saber quantas batalhas venceu. Beto queria sugestoes de melhoria.

O potencial pedagogico da tela nao eh aproveitado. Adicionar breakdown transforma uma tela boa em uma ferramenta de aprendizado.

---

## Implementacao

### 1. Secao de breakdown por categoria

**Arquivo:** `/src/components/game/results/GameResultsScreen.tsx`

Adicionar secao abaixo do ranking (apos animacao de revelacao):

```
┌──────────────────────────────────────┐
│ 📊 Como foi sua pontuação           │
│                                      │
│ Territorios (4 × 100)     =   400   │
│ Populacao (120 × 10)      = 1.200   │
│ Ouro (45 × 1)             =    45   │
│ Unidades (27 × 5)         =   135   │
│ ────────────────────────────         │
│ Total                      = 1.780   │
│                                      │
│ 📈 Estatisticas da Partida          │
│ Batalhas vencidas:    5/8            │
│ Territorios conquist: 3              │
│ Territorios perdidos: 1              │
│ Estruturas construid: 12            │
│ Unidades treinadas:   34            │
│ Cartas usadas:        2/4            │
│ Horda repelida:       2x            │
└──────────────────────────────────────┘
```

### 2. Calculo de breakdown

**Arquivo:** `/src/components/game/results/GameResultsScreen.tsx`

O score ja eh calculado como `territories * 100 + population * 10 + gold * 1 + units * 5` (linha ~156). Decompor em objeto:

```typescript
interface ScoreBreakdown {
  territories: { count: number; multiplier: 100; subtotal: number };
  population: { count: number; multiplier: 10; subtotal: number };
  gold: { count: number; multiplier: 1; subtotal: number };
  units: { count: number; multiplier: 5; subtotal: number };
  total: number;
}
```

### 3. Estatisticas da partida

Utilizar `getGameStats(events)` ja existente (linha ~155) que retorna:
- `turnsPlayed`, `territoriesCaptured`, `battlesWon`, `battlesTotal`, `structuresBuilt`, `unitsTrained`, `cardsUsed`, `hordeRepelled`

Adicionar campos faltantes se necessario:
- `territoriesLost`: contar eventos de territorio perdido
- `totalCards`: total de cartas recebidas durante a partida

### 4. Animacao de revelacao do breakdown

Cada linha do breakdown aparece sequencialmente com fade-in (Framer Motion), similar a revelacao do ranking:
- Delay de 200ms entre cada linha
- Numeros fazem count-up de 0 ate valor final (300ms)
- Total aparece por ultimo com destaque (`text-2xl font-bold text-amber-400`)

### 5. Breakdown para todos os clas

Permitir que o jogador veja breakdown de qualquer cla clicando no nome no ranking:

```
1º 🏆 Cla Ferronatos — 2.025 pts  [ver detalhes]
2º    Cla Verdaneos  — 1.980 pts  [ver detalhes]
```

Ao clicar, expandir inline o breakdown daquele cla.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/results/GameResultsScreen.tsx` | Secao de breakdown + estatisticas + animacao count-up |

---

## Criterios de Aceite

1. Secao "Como foi sua pontuacao" aparece abaixo do ranking com breakdown linha-a-linha
2. Cada categoria mostra: quantidade × multiplicador = subtotal
3. Total confere com pontuacao exibida no ranking
4. Estatisticas da partida mostram batalhas, territorios, estruturas, unidades, cartas, horda
5. Animacao de revelacao sequencial com count-up nos numeros
6. Jogador pode clicar em qualquer cla do ranking para ver seu breakdown
7. Layout responsivo (mobile-first, consistente com design existente)
