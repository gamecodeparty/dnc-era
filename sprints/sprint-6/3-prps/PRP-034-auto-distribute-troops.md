# PRP-034 — Botão Auto-Distribuir Tropas

**Specs:** S-041
**Prioridade:** Score 8/10 (D-068 — redistribuição manual 4+ territórios exaustiva, 4/6)
**Dependências:** Nenhuma

---

## Objetivo

Adicionar botão "Auto-Distribuir Igualmente" na página de exército que distribui tropas igualmente entre todos os territórios do jogador. Com 4+ territórios, redistribuir tropas defensivamente requer 12+ interações por turno. ARIA descreveu como "maior pain de UX desta partida". BALDO: "6 cliques para redistribuir 4 grupos".

A distribuição automática não precisa ser ótima — igualar tropas já resolve 80% do pain. Jogadores que querem distribuição customizada continuam usando o sistema manual.

---

## Escopo

- **Store:** `/src/stores/gameStore.ts` — função `autoDistributeTroops()`
- **Tela:** `/src/app/game/army/page.tsx` — botão + tooltip + feedback toast

---

## Features

### F-105 — Lógica de distribuição igualitária no gameStore

Em `/src/stores/gameStore.ts`:

Adicionar função `autoDistributeTroops()`:

1. Agregar todas as tropas estacionadas do jogador (excluir tropas em expedições ativas)
2. Para cada tipo de unidade (SOLDIER, ARCHER, KNIGHT, SPY), dividir igualmente entre territórios
3. Remainder (resto da divisão) vai para territórios com mais estruturas (prioridade defensiva)

```typescript
autoDistributeTroops(): void {
  const clan = this.getPlayerClan();
  const territories = clan.territories.filter(t => t.ownerId === clan.id);
  if (territories.length <= 1) return;

  // Agregar todas as tropas estacionadas
  const totalUnits: Record<UnitType, number> = { SOLDIER: 0, ARCHER: 0, KNIGHT: 0, SPY: 0 };
  for (const territory of territories) {
    for (const unit of territory.units) {
      totalUnits[unit.type] += unit.count;
    }
  }

  // Distribuir igualmente (floor)
  const n = territories.length;
  for (const territory of territories) {
    territory.units = Object.entries(totalUnits)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({ type: type as UnitType, count: Math.floor(count / n) }))
      .filter(u => u.count > 0);
  }

  // Remainder para territórios com mais estruturas
  const sorted = [...territories].sort((a, b) => b.structures.length - a.structures.length);
  for (const [type, count] of Object.entries(totalUnits)) {
    const remainder = count % n;
    for (let i = 0; i < remainder; i++) {
      const existing = sorted[i].units.find(u => u.type === type);
      if (existing) existing.count += 1;
      else sorted[i].units.push({ type: type as UnitType, count: 1 });
    }
  }
}
```

A distribuição é instantânea (sem custo de turno) — consistente com o sistema manual atual.

**Critérios de aceite:**
- Todas as tropas estacionadas são redistribuídas igualmente entre territórios
- Remainder vai para territórios com mais estruturas
- Tropas em expedições ativas NÃO são incluídas
- Distribuição é instantânea (sem custo de turno)
- Espiões (SPY) são distribuídos junto com outras unidades
- Função não faz nada se jogador tem <= 1 território

### F-106 — Botão Auto-Distribuir na página de exército

Em `/src/app/game/army/page.tsx`:

Adicionar botão no topo da página de exército, abaixo do título e acima da lista de territórios:

```tsx
<MedievalButton
  onClick={() => gameStore.autoDistributeTroops()}
  variant="secondary"
  disabled={playerTerritories.length <= 1}
>
  ⚔️ Auto-Distribuir Igualmente
</MedievalButton>
```

Tooltip no botão: "Distribui todas as suas tropas igualmente entre seus territórios. Territórios com mais estruturas recebem unidades extras quando a divisão não é exata."

Após auto-distribuição, exibir toast: "Tropas distribuídas igualmente entre {n} territórios"

**Critérios de aceite:**
- Botão "Auto-Distribuir Igualmente" visível na página de exército
- Botão desabilitado quando jogador tem <= 1 território
- Toast de confirmação aparece após distribuição
- Tooltip explica o comportamento do botão
- Botão usa componente MedievalButton existente com variant secondary

---

## Limites

- NÃO implementa drag-and-drop de tropas entre territórios
- NÃO adiciona distribuição ponderada (ex: mais tropas em fronteira)
- NÃO permite configurar a estratégia de distribuição
- NÃO altera o sistema manual de movimentação de tropas

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

F-106 depende de F-105 (função `autoDistributeTroops()` disponível na store).
