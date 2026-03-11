# S-033 — Painel HUD de Producao por Turno

**Discovery:** Brainstorming P3 (score 8/10, frequencia 4/6)
**Tipo:** Pain — Sem visibilidade de producao total por turno no HUD

---

## Objetivo

Adicionar indicadores de producao por turno sempre visiveis no painel de recursos do sidebar. Atualmente, `ResourcePanel.tsx` ja aceita props `grainProduction`, `woodProduction`, `goldProduction` e exibe `+X` em verde ao lado do recurso — porem este valor precisa ser calculado e passado corretamente pelo componente pai.

4/6 agentes sofreram com calculo mental de producao. ARIA ficou 8 turnos sem saber quanto estava acumulando. BALDO pediu explicitamente: "quanto tempo ate ter recursos suficientes para X construcao."

---

## Implementacao

### 1. Calcular producao total por turno no gameStore

**Arquivo:** `/src/stores/gameStore.ts`

Adicionar funcao ou selector derivado que soma a producao de todas as estruturas do jogador em todos os territorios:

```typescript
// Pseudo-codigo
function calculateTotalProduction(playerClan: Clan): { grain: number; wood: number; gold: number } {
  let grain = 0, wood = 0, gold = 0;
  for (const territory of playerClan.territories) {
    for (const structure of territory.structures) {
      const production = PRODUCTION_PER_LEVEL[structure.type][structure.level - 1];
      if (production.resource === 'GRAIN') grain += production.amount;
      if (production.resource === 'WOOD') wood += production.amount;
      if (production.resource === 'GOLD') gold += production.amount;
    }
    // Incluir bonus de territorio (bonusResource)
    grain += territory.bonusResource === 'GRAIN' ? territory.bonusAmount : 0;
    wood += territory.bonusResource === 'WOOD' ? territory.bonusAmount : 0;
    gold += territory.bonusResource === 'GOLD' ? territory.bonusAmount : 0;
  }
  // Aplicar bonus de faccao (ex: Verdaneos +20% grao)
  return applyOriginBonuses(playerClan.origin, { grain, wood, gold });
}
```

Usar `PRODUCTION_PER_LEVEL` de `balance.ts` (ja exportado) para garantir consistencia.

### 2. Passar producao ao ResourcePanel

**Arquivo:** Componente pai que renderiza `ResourcePanel` (provavelmente `/src/app/(game)/page.tsx` ou sidebar layout)

Passar os valores calculados como props:

```tsx
<ResourcePanel
  grain={clan.resources.grain}
  wood={clan.resources.wood}
  gold={clan.resources.gold}
  grainProduction={totalProduction.grain}
  woodProduction={totalProduction.wood}
  goldProduction={totalProduction.gold}
/>
```

### 3. Exibir producao mesmo quando zero

**Arquivo:** `/src/components/game/sidebar/ResourcePanel.tsx`

Atualmente a producao so aparece quando `> 0` (linha 36). Alterar para exibir sempre que o valor estiver definido, incluindo zero (em cinza):

```tsx
{production !== undefined && (
  <span className={`text-xs ${production > 0 ? 'text-green-400' : 'text-slate-500'}`}>
    {production > 0 ? `+${production}` : '±0'}
  </span>
)}
```

### 4. Tooltip com breakdown por territorio

**Arquivo:** `/src/components/game/sidebar/ResourcePanel.tsx`

Adicionar tooltip ao hover do valor de producao mostrando de onde vem cada recurso:

```
+18 Grao/turno:
  T0: Fazenda Nv2 (+15) + Bonus territorio (+3)
  T3: Fazenda Nv1 (+10)
```

Isso resolve o pedido de BALDO: "quanto tempo ate ter recursos suficientes para X construcao" — com producao visivel, o jogador calcula facilmente.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | Funcao/selector `calculateTotalProduction()` |
| `/src/components/game/sidebar/ResourcePanel.tsx` | Exibir producao zero + tooltip com breakdown |
| Componente pai do sidebar | Passar props de producao calculadas ao ResourcePanel |

---

## Criterios de Aceite

1. Painel de recursos exibe `+X` por turno para grao, madeira e ouro
2. Valores de producao refletem TODAS as estruturas em TODOS os territorios do jogador
3. Bonus de territorio (bonusResource) estao incluidos no calculo
4. Bonus de faccao (origin) estao incluidos no calculo
5. Producao zero eh exibida como `±0` em cinza (nao omitida)
6. Producao atualiza imediatamente ao construir/perder estrutura ou territorio
7. Tooltip no valor de producao mostra breakdown por territorio
