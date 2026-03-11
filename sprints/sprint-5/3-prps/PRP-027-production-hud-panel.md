# PRP-027 — Painel HUD de Produção por Turno

**Specs:** S-033
**Prioridade:** Score 8/10 (P3 — sem visibilidade produção total, 4/6 afetados)
**Dependências:** Nenhuma

---

## Objetivo

Tornar a produção de recursos por turno sempre visível no painel lateral (sidebar), com breakdown por território em tooltip. Atualmente `ResourcePanel.tsx` já aceita props de produção e exibe `+X` em verde, mas o valor não está sendo calculado nem passado corretamente pelo componente pai.

4/6 agentes sofreram com cálculo mental de produção. ARIA ficou 8 turnos sem saber quanto acumulava. BALDO pediu: "quanto tempo até ter recursos suficientes para X construção."

---

## Escopo

- **Store:** `/src/stores/gameStore.ts` — função/selector de cálculo de produção total
- **Tela:** `/src/components/game/sidebar/ResourcePanel.tsx` — exibir produção zero + tooltip breakdown
- **Tela:** Componente pai do sidebar — passar props de produção calculadas

---

## Features

### F-085 — Cálculo de produção total por turno no gameStore

Em `/src/stores/gameStore.ts`:

Adicionar função ou selector derivado que soma a produção de todas as estruturas do jogador em todos os territórios:

```typescript
function calculateTotalProduction(playerClan: Clan): { grain: number; wood: number; gold: number } {
  let grain = 0, wood = 0, gold = 0;
  for (const territory of playerClan.territories) {
    for (const structure of territory.structures) {
      const production = PRODUCTION_PER_LEVEL[structure.type][structure.level - 1];
      if (production) { grain += ...; wood += ...; gold += ...; }
    }
    // Incluir bonus de território (bonusResource)
  }
  // Aplicar bonus de facção (origin)
  return { grain, wood, gold };
}
```

Usar `PRODUCTION_PER_LEVEL` de `balance.ts` para consistência.

**Critérios de aceite:**
- Função calcula produção total somando TODAS estruturas em TODOS territórios
- Bônus de território (bonusResource) incluídos
- Bônus de facção (origin) aplicados
- Valor atualiza imediatamente ao construir/perder estrutura ou território

### F-086 — Exibir produção por turno no ResourcePanel

Em `/src/components/game/sidebar/ResourcePanel.tsx`:

Componente pai passa valores de produção calculados. ResourcePanel exibe:
- Produção > 0: `+X` em verde (`text-green-400`)
- Produção = 0: `±0` em cinza (`text-slate-500`)

```tsx
<ResourcePanel
  grain={clan.resources.grain}
  grainProduction={totalProduction.grain}
  // ... wood, gold
/>
```

**Critérios de aceite:**
- Painel de recursos exibe `+X` por turno para grão, madeira e ouro
- Produção zero exibida como `±0` em cinza (não omitida)
- Valores refletem cálculo de F-085

### F-087 — Tooltip com breakdown de produção por território

Em `/src/components/game/sidebar/ResourcePanel.tsx`:

Ao hover no valor de produção, tooltip mostra de onde vem cada recurso:

```
+18 Grão/turno:
  T0: Fazenda Nv2 (+15) + Bônus território (+3)
  T3: Fazenda Nv1 (+10)
```

**Critérios de aceite:**
- Tooltip no valor de produção mostra breakdown por território
- Cada linha identifica território (posição), estrutura (tipo + nível), e bônus
- Tooltip atualiza quando produção muda

---

## Limites

- NÃO implementa "tempo até recurso X" (pode ser feature futura)
- NÃO altera layout existente do ResourcePanel — apenas preenche props já existentes
- NÃO adiciona gráfico de produção histórica
- NÃO mostra produção de outros clãs

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

Se PRP-026 (consolidação de custos) for implementado antes, F-074 se beneficia da fonte única de dados, mas não é bloqueante.
