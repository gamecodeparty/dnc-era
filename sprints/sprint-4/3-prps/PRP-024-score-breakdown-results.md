# PRP-024 — Breakdown de Pontuação

**Specs:** S-029
**Prioridade:** Score 6/10 (D-048 — breakdown ausente, 4/6) + Amplificação G-012 (score 10/10, maior win do projeto)
**Dependências:** Nenhuma

---

## Objetivo

Adicionar seção de breakdown de pontuação na GameResultsScreen. A tela de resultados (F-043/F-045) é unanimemente elogiada (6/6, score 10) mas não mostra como a pontuação foi calculada. Ariana fez cálculos mentais. Davi queria saber quantas batalhas venceu. Beto queria sugestões de melhoria.

Adicionar breakdown transforma uma tela boa em ferramenta de aprendizado — amplifica o maior gain do projeto.

---

## Escopo

- **Tela:** `/src/components/game/results/GameResultsScreen.tsx` — breakdown + estatísticas + animação

---

## Features

### F-076 — Breakdown de score por categoria

Em `/src/components/game/results/GameResultsScreen.tsx`:

Adicionar seção abaixo do ranking (após animação de revelação):

```
┌──────────────────────────────────────┐
│ 📊 Como foi sua pontuação           │
│                                      │
│ Territórios (4 × 100)     =   400   │
│ População (120 × 10)      = 1.200   │
│ Ouro (45 × 1)             =    45   │
│ Unidades (27 × 5)         =   135   │
│ ────────────────────────────         │
│ Total                      = 1.780   │
└──────────────────────────────────────┘
```

Decompor o score existente (`territories * 100 + population * 10 + gold * 1 + units * 5`) em objeto:

```typescript
interface ScoreBreakdown {
  territories: { count: number; multiplier: 100; subtotal: number };
  population: { count: number; multiplier: 10; subtotal: number };
  gold: { count: number; multiplier: 1; subtotal: number };
  units: { count: number; multiplier: 5; subtotal: number };
  total: number;
}
```

Cada linha do breakdown aparece sequencialmente com fade-in (Framer Motion):
- Delay de 200ms entre cada linha
- Números fazem count-up de 0 até valor final (300ms)
- Total aparece por último com destaque (`text-2xl font-bold text-amber-400`)

**Critérios de aceite:**
- Seção "Como foi sua pontuação" aparece abaixo do ranking
- Cada categoria mostra: quantidade × multiplicador = subtotal
- Total confere com pontuação exibida no ranking
- Animação de revelação sequencial com count-up nos números

### F-077 — Estatísticas da partida

Em `/src/components/game/results/GameResultsScreen.tsx`:

Abaixo do breakdown, seção de estatísticas usando `getGameStats(events)` já existente:

```
┌──────────────────────────────────────┐
│ 📈 Estatísticas da Partida          │
│ Batalhas vencidas:    5/8            │
│ Territórios conquist: 3              │
│ Territórios perdidos: 1              │
│ Estruturas construíd: 12            │
│ Unidades treinadas:   34            │
│ Cartas usadas:        2/4            │
│ Horda repelida:       2x            │
└──────────────────────────────────────┘
```

Adicionar campos faltantes ao `getGameStats` se necessário:
- `territoriesLost`: contar eventos de território perdido
- `totalCards`: total de cartas recebidas durante a partida

**Critérios de aceite:**
- Estatísticas mostram batalhas, territórios, estruturas, unidades, cartas, horda
- Dados derivados dos eventos de jogo (não estimativas)
- Layout responsivo (mobile-first)

### F-078 — Breakdown expandível para todos os clãs

Em `/src/components/game/results/GameResultsScreen.tsx`:

Permitir que o jogador veja breakdown de qualquer clã clicando no nome no ranking:

```
1º 🏆 Clã Ferronatos — 2.025 pts  [ver detalhes]
2º    Clã Verdâneos  — 1.980 pts  [ver detalhes]
```

Ao clicar, expandir inline o breakdown daquele clã (mesma estrutura de F-076).

**Critérios de aceite:**
- Jogador pode clicar em qualquer clã do ranking para ver seu breakdown
- Expansão/colapso funciona com animação suave
- Breakdown do jogador aparece expandido por default

---

## Limites

- NÃO altera a fórmula de cálculo de pontuação existente
- NÃO implementa sistema de conquistas/achievements
- NÃO implementa comparação entre partidas (histórico)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

Complementa PRP-014 (Tela de Resultados) que implementou a GameResultsScreen base.
