# S-036 — Visualizacao de Adjacencias de Territorio no Mapa

**Discovery:** D-059 (score 7/10, frequencia 3/6)
**Tipo:** Pain — Adjacencias entre territorios nao sao visualmente indicadas no mapa

---

## Objetivo

Exibir linhas de conexao entre territorios adjacentes no mapa 4x3, permitindo que o jogador entenda imediatamente quais territorios pode atacar/reforcar. FIO atacou um territorio nao adjacente e perdeu 3 turnos com soldados presos. CAIUS precisou memorizar a grade.

O mapa usa grid 4x3 (12 territorios) com adjacencia definida em `TERRITORY_ADJACENCY` (`balance.ts`, linhas 225-238). A grid eh ortogonal — cada territorio eh adjacente aos vizinhos horizontais e verticais (sem diagonais).

---

## Implementacao

### 1. Renderizar linhas de conexao no GameMap

**Arquivo:** `/src/components/game/map/GameMap.tsx`

Adicionar camada SVG ou CSS sobreposta ao grid que renderiza linhas entre centros de territorios adjacentes:

```typescript
import { TERRITORY_ADJACENCY } from "@/game/constants/balance";

// Gerar pares unicos de adjacencia (evitar duplicatas)
const adjacencyPairs: [number, number][] = [];
Object.entries(TERRITORY_ADJACENCY).forEach(([id, neighbors]) => {
  neighbors.forEach((neighbor) => {
    if (Number(id) < neighbor) {
      adjacencyPairs.push([Number(id), neighbor]);
    }
  });
});
```

Renderizar como linhas SVG com cor sutil (`stroke: slate-600`, `opacity: 0.3`) para nao competir visualmente com os territorios.

### 2. Highlight de adjacencias ao selecionar territorio

Quando o jogador clica/hovera um territorio, destacar suas conexoes adjacentes:

- Linhas conectando ao territorio selecionado: cor mais forte (`stroke: amber-400`, `opacity: 0.7`)
- Territorios adjacentes: borda sutil amarela ou glow

Isso permite que o jogador veja instantaneamente para onde pode atacar ou reforcar.

### 3. Highlight durante ExpeditionModal

Quando o `ExpeditionModal` esta aberto e o jogador seleciona territorio de origem, destacar apenas os territorios alcancaveis como destino. Territorios nao adjacentes (ou fora de alcance) ficam com opacidade reduzida.

### 4. Coordenadas da grid

A grid 4x3 mapeia posicoes para coordenadas:

```
[0] [1] [2]     → row 0
[3] [4] [5]     → row 1
[6] [7] [8]     → row 2
[9] [10][11]    → row 3
```

Centros de cada celula podem ser calculados por `(col * cellWidth + cellWidth/2, row * cellHeight + cellHeight/2)`.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/map/GameMap.tsx` | Camada SVG com linhas de adjacencia + highlight ao selecionar |
| `/src/components/game/map/Territory.tsx` | Prop `isAdjacentToSelected` para aplicar glow/borda |
| `/src/components/game/expedition/ExpeditionModal.tsx` | Comunicar territorio selecionado para highlight de adjacencias |

---

## Criterios de Aceite

1. Linhas sutis conectam territorios adjacentes no mapa (sempre visiveis)
2. Linhas usam cor discreta (`slate-600/30`) para nao poluir o mapa
3. Ao clicar/hoverar um territorio, suas conexoes adjacentes sao destacadas
4. Territorios adjacentes ao selecionado recebem indicacao visual (borda ou glow)
5. Linhas sao geradas a partir de `TERRITORY_ADJACENCY` (fonte unica)
6. Nao ha linhas diagonais (adjacencia eh apenas horizontal e vertical)
7. Responsivo — linhas acompanham redimensionamento da grid
