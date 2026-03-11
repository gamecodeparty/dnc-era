# S-017 — Tela de Resultados de Fim de Jogo

**Discovery:** D-032 (score 8/10, frequencia 5/6), D-011 (score 4/10, frequencia 1/6)
**Tipo:** Pain — Fim de jogo abrupto sem cerimonia de vitoria/ranking

---

## Objetivo

Substituir a tela atual de fim de jogo (um card simples com trofeu/caveira e recursos finais) por uma tela de resultados animada com ranking dos clas, estatisticas detalhadas e momento celebratorio. O jogador investiu 50 turnos e merece um encerramento a altura.

A tela atual em `/src/app/game/page.tsx` (linhas 356-428) exibe apenas: icone, titulo, turnos sobrevividos, recursos finais, e botao "Jogar Novamente".

---

## Implementacao

### 1. Componente GameResultsScreen

**Arquivo:** `/src/components/game/results/GameResultsScreen.tsx` (novo)

Componente dedicado que substitui o card atual de vitoria/derrota.

**Layout em 3 secoes:**

#### Secao 1 — Ranking dos 6 Clas (animado)

```
🏆 RANKING FINAL

 1. 🟢 Verdaneos (Você)     1,280 pts  ★★★★★
 2. 🔴 Ferronatos (Norte)     950 pts  ★★★★
 3. 🟣 Umbral (Leste)         720 pts  ★★★
 4. 🔴 Ferronatos (Sul)       580 pts  ★★
 5. 🟢 Verdaneos (Oeste)      340 pts  ★
 6. 💀 Umbral (Sudeste)         0 pts  ELIMINADO
```

**Animacao:** Cada cla aparece de baixo pra cima com delay de 300ms, como ranking de corrida. O primeiro lugar tem efeito dourado + Sparkles.

**Calculo de score** (formula ja existente):
- Territorios × 100
- Populacao × 10
- Ouro × 1
- Unidades × 5

#### Secao 2 — Estatisticas da Partida

```
📊 SUA PARTIDA

Turnos jogados:        25
Territorios conquistados: 4
Batalhas vencidas:       6 / 8
Estruturas construidas:  12
Unidades treinadas:      23
Cartas usadas:           2
Horda repelida:          3×
```

**Dados:** Agregar dos eventos do log de jogo (ja registrados no store).

#### Secao 3 — Momento Epico

```
⚔ MOMENTO MAIS ÉPICO

Turno 14: Você conquistou Território 7 do Clã do Norte
com 15 soldados vs 8 defensores — Vitória Decisiva!
Saqueou: +45 grão, +30 madeira, +20 ouro
```

**Logica:** Selecionar a batalha com maior diferenca de poder (ou maior saque) do log de eventos.

#### Rodape

```
[Jogar Novamente]    [Ver Detalhes]
```

"Ver Detalhes" abre o log completo da partida.

### 2. Integracao no fluxo de game over

**Arquivo:** `/src/app/game/page.tsx`

Substituir o card de vitoria/derrota pelo novo `GameResultsScreen`:

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

### 3. Agregacao de estatisticas

**Arquivo:** `/src/stores/gameStore.ts`

Adicionar selector ou funcao que agrega estatisticas da partida a partir dos eventos do log:

```typescript
function getGameStats(events: GameEvent[]): GameStats {
  return {
    turnsPlayed: /* max turn number */,
    territoriesCaptured: /* count TERRITORY_CAPTURED events */,
    battlesWon: /* count COMBAT events with victory */,
    battlesTotal: /* count all COMBAT events */,
    structuresBuilt: /* count BUILD events */,
    unitsTrained: /* count TRAIN events */,
    cardsUsed: /* count CARD_USED events */,
    hordeRepelled: /* count HORDA_ATTACK events where territory NOT lost */,
    epicMoment: /* battle with highest loot or power ratio */,
  };
}
```

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/results/GameResultsScreen.tsx` | Novo componente de tela de resultados |
| `/src/app/game/page.tsx` | Substituir card de game over pelo GameResultsScreen |
| `/src/stores/gameStore.ts` | Funcao de agregacao de estatisticas |

---

## Criterios de Aceite

1. Ranking dos 6 clas aparece animado (de baixo para cima) com score calculado
2. Cla do jogador esta destacado no ranking (cor diferenciada, estrela)
3. Clas eliminados aparecem como "ELIMINADO" com icone de caveira
4. Estatisticas da partida (territorios, batalhas, estruturas, unidades, cartas, horda) sao exibidas
5. "Momento mais epico" mostra a melhor batalha da partida
6. Botao "Jogar Novamente" reinicia o jogo
7. Animacoes de Sparkles no primeiro lugar
8. Tela funciona tanto para vitoria quanto para derrota (destacar posicao do jogador)
