# S-023 — Aviso de Deadlock Economico

**Discovery:** D-041 (score 8/10, frequencia 2/6)
**Tipo:** Pain — Deadlock economico com ordem de build errada

---

## Objetivo

Alertar o jogador quando esta prestes a entrar em deadlock economico por nao ter estruturas produtivas. Beto e Felix construiram Wall ou Barracks antes de Farm/Sawmill/Mine e ficaram sem recursos para construir qualquer coisa depois. O TipBanner (S-020) mitiga parcialmente com dicas de Farm/Mine nos primeiros turnos, mas nao previne o caso de jogador que ignora as dicas e constroi estrutura nao-produtiva primeiro.

---

## Implementacao

### 1. Deteccao de estado de deadlock iminente

**Arquivo:** `/src/hooks/useTips.ts`

Adicionar novo tip ao array `TIP_DEFINITIONS`:

```typescript
{
  id: 'tip-07-deadlock-warning',
  trigger: (state) => {
    // Jogador construiu estrutura mas NENHUMA eh produtiva
    const hasStructures = state.playerStructureTypes.length > 0;
    const productiveTypes = ['FARM', 'SAWMILL', 'MINE'];
    const hasProductive = state.playerStructureTypes.some(
      t => productiveTypes.includes(t)
    );
    return hasStructures && !hasProductive && state.currentTurn <= 5;
  },
  message: '⚠ Atenção: você não tem estruturas de produção! Sem Farm, Sawmill ou Mine, seus recursos não vão crescer. Construa uma estrutura produtiva o quanto antes.',
  icon: '⚠',
  position: 'top',
  priority: 10, // alta prioridade — sobrepoe tips normais
}
```

### 2. Aviso contextual no menu de construcao

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx`

Quando jogador seleciona estrutura nao-produtiva (Wall, Barracks, Stable, Tavern, Shadow Guild) e nao tem NENHUMA estrutura produtiva em NENHUM territorio:

- Exibir alerta inline acima do botao "Construir":
  ```
  ⚠ Sem estruturas produtivas! Seus recursos não vão crescer.
     Considere construir Farm, Sawmill ou Mine primeiro.
  ```
- Estilo: `bg-amber-900/60 border-amber-500/40 text-amber-200`
- O alerta eh informativo — NAO bloqueia a construcao (jogador pode ter estrategia valida)

### 3. Deteccao de zero producao total

**Arquivo:** `/src/hooks/useTips.ts`

Segundo tip para caso mais grave — jogador com 0 de producao em todos os recursos:

```typescript
{
  id: 'tip-08-zero-production',
  trigger: (state) => {
    return state.currentTurn >= 3
      && state.playerGrainProduction === 0
      && state.playerWoodProduction === 0
      && state.playerGoldProduction === 0;
  },
  message: '🚨 Produção zerada! Você não está gerando nenhum recurso. Construa Farm (grão), Sawmill (madeira) ou Mine (ouro) para sair do deadlock.',
  icon: '🚨',
  position: 'top',
  priority: 15,
}
```

Requer adicionar `playerGrainProduction`, `playerWoodProduction`, `playerGoldProduction` ao estado do trigger (calcular a partir de estruturas do jogador).

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/hooks/useTips.ts` | Tips tip-07 e tip-08 + campos de producao no trigger state |
| `/src/components/game/mobile/TerritoryBottomSheet.tsx` | Alerta inline no menu de construcao |

---

## Criterios de Aceite

1. TipBanner aparece quando jogador construiu estrutura nao-produtiva sem ter nenhuma produtiva (turnos 1-5)
2. TipBanner de urgencia aparece quando producao total eh zero a partir do turno 3
3. Alerta inline aparece no menu de construcao ao selecionar estrutura nao-produtiva sem ter produtivas
4. Alerta inline NAO bloqueia a construcao — apenas informa
5. Tips respeitam logica de dismissal existente (localStorage, mostrar 1 vez)
6. Alerta inline nao aparece se jogador ja tem ao menos 1 estrutura produtiva em qualquer territorio
