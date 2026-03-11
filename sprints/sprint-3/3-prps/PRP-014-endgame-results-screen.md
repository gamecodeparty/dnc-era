# PRP-014 — Tela de Resultados de Fim de Jogo

**Specs:** S-017
**Prioridade:** Score 8/10 (D-032 — fim de jogo abrupto, 5/6)
**Dependências:** Nenhuma

---

## Objetivo

Substituir a tela atual de fim de jogo (um card simples com troféu/caveira e recursos finais) por uma tela de resultados animada com ranking dos clãs, estatísticas detalhadas e momento celebratório. O jogador investiu 50 turnos e merece um encerramento à altura.

---

## Escopo

- **Componente:** `GameResultsScreen.tsx` (novo) — tela completa de resultados
- **Tela:** `page.tsx` — substituição do card de game over
- **Store:** `gameStore.ts` — função de agregação de estatísticas

---

## Features

### F-043 — Componente GameResultsScreen com ranking animado

Criar `/src/components/game/results/GameResultsScreen.tsx`:

**Seção 1 — Ranking dos 6 Clãs:**
- Lista rankeada por score (territórios × 100 + população × 10 + ouro × 1 + unidades × 5)
- Cada clã aparece de baixo pra cima com delay de 300ms (animação Framer Motion)
- Primeiro lugar tem efeito dourado + Sparkles
- Clã do jogador destacado (cor diferenciada, estrela)
- Clãs eliminados aparecem como "ELIMINADO" com ícone de caveira

**Seção 2 — Estatísticas da Partida:**
- Turnos jogados, territórios conquistados, batalhas vencidas/total
- Estruturas construídas, unidades treinadas, cartas usadas
- Horda repelida (quantidade)

**Seção 3 — Momento Épico:**
- Selecionar a batalha com maior diferença de poder (ou maior saque) do log de eventos
- Exibir: turno, território, unidades envolvidas, resultado, saque

**Rodapé:**
- Botão "Jogar Novamente" (reinicia o jogo)
- Botão "Ver Detalhes" (abre o log completo)

**Critérios de aceite:**
- Ranking animado de baixo para cima com delay por clã
- Primeiro lugar com efeito dourado e Sparkles
- Clã do jogador destacado no ranking
- Clãs eliminados marcados com caveira
- Tela funciona tanto para vitória quanto para derrota

### F-044 — Função de agregação de estatísticas do jogo

Em `/src/stores/gameStore.ts`:

Adicionar função `getGameStats(events)` que agrega estatísticas da partida a partir dos eventos do log:

```typescript
interface GameStats {
  turnsPlayed: number;
  territoriesCaptured: number;
  battlesWon: number;
  battlesTotal: number;
  structuresBuilt: number;
  unitsTrained: number;
  cardsUsed: number;
  hordeRepelled: number;
  epicMoment: EpicMoment | null;
}
```

**Lógica de seleção do "Momento Épico":**
- Filtrar eventos de combate onde o jogador venceu
- Selecionar o com maior saque total (grão + madeira + ouro) ou maior ratio de poder
- Se nenhuma vitória, selecionar defesa mais dramática (menor margem)

**Critérios de aceite:**
- Função agrega corretamente todos os tipos de evento
- Momento épico seleciona a batalha mais impactante
- Retorna zeros/null para campos sem dados (partida sem combate)

### F-045 — Integração do GameResultsScreen no fluxo de game over

Em `/src/app/game/page.tsx`:

Substituir o card atual de vitória/derrota (linhas 356-428) pelo novo `GameResultsScreen`:

```typescript
if (gameOver) {
  return <GameResultsScreen
    clans={clans}
    playerClanId={playerClanId}
    events={events}
    isVictory={isVictory}
    turn={currentTurn}
  />;
}
```

**Critérios de aceite:**
- Card antigo de game over substituído pelo GameResultsScreen
- Props corretas passadas para o componente
- Botão "Jogar Novamente" reinicia o jogo corretamente

---

## Limites

- NÃO altera a lógica de detecção de game over — apenas melhora a tela
- NÃO implementa replay de partida — apenas exibe estatísticas
- NÃO salva estatísticas em banco — exibe do state atual

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
