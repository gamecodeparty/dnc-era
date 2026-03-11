# PRP-013 — Preview de Tempo de Viagem em Expedições

**Specs:** S-016
**Prioridade:** Score 8/10 (D-037 — sem preview de tempo de viagem, 5/6)
**Dependências:** Nenhuma

---

## Objetivo

Mostrar quantos turnos a expedição levará para chegar ao destino ANTES de o jogador confirmar. Atualmente o jogador seleciona destino e unidades sem saber o tempo de viagem — descobre apenas após confirmar. O mapa usa grid 4x3 com distância Manhattan.

---

## Escopo

- **Lógica:** Função `calculateTravelTime()` (utilitário ou gameStore)
- **Tela:** `ExpeditionModal` — exibição de tempo + aviso de viagem longa
- **Tela:** `Territory.tsx` — badge de tempo durante seleção de expedição

---

## Features

### F-040 — Função de cálculo de tempo de viagem

Em `/src/stores/gameStore.ts` ou utilitário dedicado em `/src/game/engine/`:

Implementar função baseada em distância Manhattan na grid 4x3:

```typescript
function calculateTravelTime(fromPosition: number, toPosition: number): number {
  const fromRow = Math.floor((fromPosition - 1) / 4);
  const fromCol = (fromPosition - 1) % 4;
  const toRow = Math.floor((toPosition - 1) / 4);
  const toCol = (toPosition - 1) % 4;
  const distance = Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol);
  return Math.max(1, distance); // mínimo 1 turno
}
```

**Critérios de aceite:**
- Função retorna tempo em turnos baseado em distância Manhattan
- Mínimo de 1 turno para qualquer expedição
- Posições 1-12 mapeadas corretamente para grid 4x3

### F-041 — Exibição de tempo de viagem no ExpeditionModal

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

Na seção de seleção de destino, exibir tempo de viagem ao lado do território alvo:

```
Destino: Território 7 (Clã do Norte) — ⏱ 2 turnos
```

Se tempo de viagem >= 3 turnos, exibir aviso adicional:

```
⚠ Viagem longa: tropas chegarão em 3 turnos.
Seus territórios ficarão sem essas unidades durante a viagem.
```

**Critérios de aceite:**
- Tempo de viagem aparece em turnos ao lado do destino selecionado
- Tempo recalcula em tempo real ao mudar território de origem
- Aviso de viagem longa aparece para expedições de 3+ turnos

### F-042 — Badge de tempo de viagem no mapa durante seleção

Em `/src/components/game/map/Territory.tsx`:

Quando o jogador está no fluxo de expedição (ExpeditionModal aberto), exibir badge de tempo de viagem sobre cada território alvo potencial:

```
⏱ 2t
```

**Cor baseada no tempo:**
- Verde (`text-green-400`): 1 turno
- Amarelo (`text-yellow-400`): 2 turnos
- Vermelho (`text-red-400`): 3+ turnos

Badge posicionado no canto inferior esquerdo do tile. Aparece apenas durante seleção de expedição.

**Critérios de aceite:**
- Badge "⏱ Xt" aparece nos tiles do mapa durante seleção de expedição
- Badge usa cor verde/amarelo/vermelho conforme duração
- Badge desaparece quando ExpeditionModal é fechado

---

## Limites

- NÃO altera a mecânica de viagem — apenas exibe informação que já existe
- NÃO implementa rotas alternativas ou atalhos
- NÃO afeta expedições já em andamento

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
