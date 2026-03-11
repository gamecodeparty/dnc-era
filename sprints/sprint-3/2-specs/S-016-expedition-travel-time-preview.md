# S-016 — Preview de Tempo de Viagem em Expedicoes

**Discovery:** D-037 (score 8/10, frequencia 5/6)
**Tipo:** Pain — Sem preview de tempo de viagem em expedicoes

---

## Objetivo

Mostrar quantos turnos a expedicao levara para chegar ao destino ANTES de o jogador confirmar. Atualmente o jogador seleciona destino e unidades sem saber o tempo de viagem — descobre apenas apos confirmar. O mapa usa grid 4x3 com distancia Manhattan.

O `ExpeditionModal` ja exibe algumas stats (travel time, attack power, carry capacity) na secao de stats, mas o calculo e exibicao de tempo de viagem precisa ser verificado e melhorado.

---

## Implementacao

### 1. Calculo de tempo de viagem

**Arquivo:** `/src/stores/gameStore.ts` ou utilitario dedicado

Funcao de calculo baseada em distancia Manhattan na grid 4x3:

```typescript
function calculateTravelTime(
  fromPosition: number, // 1-12 (grid 4x3)
  toPosition: number    // 1-12
): number {
  const fromRow = Math.floor((fromPosition - 1) / 4);
  const fromCol = (fromPosition - 1) % 4;
  const toRow = Math.floor((toPosition - 1) / 4);
  const toCol = (toPosition - 1) % 4;
  const distance = Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol);
  return Math.max(1, distance); // minimo 1 turno
}
```

### 2. Exibicao no ExpeditionModal antes de confirmar

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Na secao de selecao de destino, exibir tempo de viagem ao lado do territorio alvo:

```
Destino: Território 7 (Clã do Norte) — ⏱ 2 turnos
```

Se o jogador mudar o territorio de origem, recalcular e atualizar em tempo real.

### 3. Indicador de tempo no mapa ao selecionar origem

**Arquivo:** `/src/components/game/map/Territory.tsx`

Quando o jogador esta no fluxo de expedicao (ExpeditionModal aberto), exibir badge de tempo de viagem sobre cada territorio alvo potencial:

```
┌──────────┐
│ T7       │
│ Neutro   │
│   ⏱ 2t  │  ← badge de tempo de viagem
└──────────┘
```

**Comportamento:**
- Badge aparece apenas durante selecao de expedicao
- Cor baseada no tempo: verde (1t), amarelo (2t), vermelho (3+t)
- Badge posicionado no canto inferior esquerdo do tile

### 4. Aviso de viagem longa

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Se tempo de viagem >= 3 turnos, exibir aviso:

```
⚠ Viagem longa: tropas chegarão em 3 turnos.
Seus territórios ficarão sem essas unidades durante a viagem.
```

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/expedition/ExpeditionModal.tsx` | Exibicao de tempo de viagem + aviso de viagem longa |
| `/src/components/game/map/Territory.tsx` | Badge de tempo de viagem durante selecao de expedicao |
| `/src/stores/gameStore.ts` ou `/src/game/engine/` | Funcao `calculateTravelTime()` (se nao existir) |

---

## Criterios de Aceite

1. Tempo de viagem aparece em turnos ao lado do destino selecionado no ExpeditionModal
2. Tempo recalcula em tempo real ao mudar territorio de origem
3. Badge "⏱ Xt" aparece nos tiles do mapa durante selecao de expedicao
4. Badge usa cor verde/amarelo/vermelho conforme duracao
5. Aviso de viagem longa aparece para expedicoes de 3+ turnos
6. Calculo usa distancia Manhattan na grid 4x3
