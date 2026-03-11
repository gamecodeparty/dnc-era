# S-011 — Aviso Proporcional de Custo

**Discovery:** D-020 (score 7/10, frequencia 3/6)
**Tipo:** Pain — Sem aviso quando acao consome maioria dos recursos

---

## Objetivo

Exibir confirmacao adicional quando uma construcao ou treino vai consumir mais de 80% do estoque de algum recurso. O jogador deve ver claramente que "esta acao vai usar quase todos os seus recursos" antes de confirmar.

O feedback de preco vermelho ja existe para recursos insuficientes, mas nao ha alerta para acoes que sao *possiveis* mas que consomem quase todo o estoque — causando bloqueio economico nos turnos seguintes.

---

## Implementacao

### 1. Funcao utilitaria de deteccao de custo proporcional

**Arquivo:** `/src/stores/gameStore.ts`

```typescript
function getProportionalCostWarnings(
  cost: { grain?: number; wood?: number; gold?: number },
  resources: { grain: number; wood: number; gold: number }
): string[] {
  const warnings: string[] = [];
  const threshold = 0.8; // 80%

  if (cost.grain && resources.grain > 0) {
    const pct = cost.grain / resources.grain;
    if (pct >= threshold) {
      warnings.push(`Grao: ${Math.round(pct * 100)}% do estoque`);
    }
  }
  // Repetir para wood e gold
  return warnings;
}
```

### 2. Modal de confirmacao no fluxo de construcao

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx`

Ao clicar "Construir" ou "Treinar", antes de executar a action do store:

1. Calcular `getProportionalCostWarnings(cost, playerResources)`
2. Se `warnings.length > 0`:
   - Exibir modal/dialog de confirmacao:
   ```
   ┌──────────────────────────────────────┐
   │  ⚠ Custo elevado                     │
   │                                      │
   │  Construir Serraria vai usar:        │
   │  • Madeira: 100% do seu estoque      │
   │  • Ouro: 85% do seu estoque          │
   │                                      │
   │  Isso pode travar sua economia nos   │
   │  proximos turnos.                    │
   │                                      │
   │  [Cancelar]          [Confirmar]     │
   └──────────────────────────────────────┘
   ```
3. Se `warnings.length === 0`: executar acao diretamente (sem confirmacao extra)

**Visual:**
- Fundo amber/warning
- Icone de alerta
- Percentuais em negrito
- Botao "Confirmar" com cor neutra (nao verde — nao encorajar)
- Botao "Cancelar" proeminente

### 3. Indicador inline no menu de construcao

**Arquivo:** mesmo componente

Antes de abrir o modal, ja indicar visualmente no botao de construcao:
- Se custo > 80% de algum recurso: icone ⚠ ao lado do botao "Construir"
- Tooltip: "Custo elevado — usa X% do seu estoque de [recurso]"

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | Funcao `getProportionalCostWarnings()` |
| `/src/components/game/mobile/TerritoryBottomSheet.tsx` | Modal de confirmacao + indicador ⚠ |

---

## Criterios de Aceite

1. Ao construir/treinar com custo > 80% de qualquer recurso, modal de confirmacao aparece
2. Modal mostra percentual exato por recurso afetado
3. Jogador pode cancelar a acao sem penalidade
4. Se custo <= 80% de todos os recursos, acao executa diretamente (sem modal extra)
5. Indicador ⚠ visivel no botao antes de clicar quando custo eh elevado
6. Funciona para construcao de estruturas E treino de unidades
