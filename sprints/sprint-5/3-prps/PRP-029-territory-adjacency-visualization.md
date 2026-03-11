# PRP-029 — Visualização de Adjacências de Território no Mapa

**Specs:** S-036
**Prioridade:** Score 7/10 (D-059 — adjacências invisíveis no mapa, 3/6)
**Dependências:** Nenhuma

---

## Objetivo

Tornar as conexões de adjacência entre territórios visíveis no mapa 4x3, eliminando a necessidade de tentativa e erro. FIO atacou um território não adjacente e perdeu 3 turnos com soldados presos. CAIUS precisou memorizar a grade inteira.

O mapa usa grid 4x3 (12 territórios) com adjacência definida em `TERRITORY_ADJACENCY` (`balance.ts`). A adjacência é ortogonal — horizontal e vertical, sem diagonais.

---

## Escopo

- **Tela:** `/src/components/game/map/GameMap.tsx` — camada SVG com linhas de adjacência
- **Tela:** `/src/components/game/map/Territory.tsx` — prop `isAdjacentToSelected` para highlight
- **Tela:** `/src/components/game/expedition/ExpeditionModal.tsx` — comunicar território selecionado

---

## Features

### F-092 — Linhas de conexão entre territórios adjacentes

Em `/src/components/game/map/GameMap.tsx`:

Adicionar camada SVG sobreposta ao grid que renderiza linhas entre centros de territórios adjacentes:

```typescript
import { TERRITORY_ADJACENCY } from "@/game/constants/balance";

const adjacencyPairs: [number, number][] = [];
Object.entries(TERRITORY_ADJACENCY).forEach(([id, neighbors]) => {
  neighbors.forEach((neighbor) => {
    if (Number(id) < neighbor) {
      adjacencyPairs.push([Number(id), neighbor]);
    }
  });
});
```

Linhas com cor sutil (`stroke: slate-600`, `opacity: 0.3`) para não competir visualmente com os territórios. Centros calculados por `(col * cellWidth + cellWidth/2, row * cellHeight + cellHeight/2)`.

**Critérios de aceite:**
- Linhas sutis conectam territórios adjacentes (sempre visíveis)
- Cor discreta (`slate-600/30`) não polui o mapa
- Linhas geradas a partir de `TERRITORY_ADJACENCY` (fonte única)
- Sem linhas diagonais
- Responsivo — linhas acompanham redimensionamento da grid

### F-093 — Highlight de adjacências ao selecionar território

Em `/src/components/game/map/GameMap.tsx` e `/src/components/game/map/Territory.tsx`:

Ao clicar/hoverar um território, destacar suas conexões:
- Linhas conectando ao território selecionado: `stroke: amber-400`, `opacity: 0.7`
- Territórios adjacentes: borda sutil amarela ou glow via prop `isAdjacentToSelected`

**Critérios de aceite:**
- Ao clicar/hoverar território, conexões adjacentes são destacadas
- Territórios adjacentes recebem indicação visual (borda ou glow)
- Highlight desaparece ao deselecionar
- Performance adequada (sem re-render de todos os territórios)

### F-094 — Highlight de alcance durante ExpeditionModal

Em `/src/components/game/expedition/ExpeditionModal.tsx` e `/src/components/game/map/GameMap.tsx`:

Quando ExpeditionModal está aberto e o jogador seleciona território de origem:
- Territórios alcançáveis como destino: highlight normal
- Territórios fora de alcance (não adjacentes): opacidade reduzida

**Critérios de aceite:**
- Territórios não alcançáveis ficam com opacidade reduzida durante seleção de destino
- Apenas territórios adjacentes ao de origem são destacados como alcançáveis
- Highlight reseta ao fechar ExpeditionModal

---

## Limites

- NÃO altera lógica de adjacência — apenas visualiza o que já existe
- NÃO adiciona adjacências diagonais
- NÃO implementa pathfinding multi-hop (apenas adjacência direta)
- NÃO modifica layout ou tamanho da grid

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
