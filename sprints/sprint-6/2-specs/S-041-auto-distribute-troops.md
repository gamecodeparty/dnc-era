# S-041 — Botao Auto-Distribuir Tropas

**Discovery:** D-068 (score 8/10, frequencia 4/6), relacionado D-050 (score 6, S4)
**Tipo:** Pain — Redistribuicao manual de tropas em 4+ territorios eh exaustiva (12+ cliques)

---

## Objetivo

Adicionar botao "Auto-Distribuir" na pagina de exercito que distribui tropas igualmente entre todos os territorios do jogador. Com 4+ territorios, redistribuir tropas defensivamente requer 3 cliques por movimento × 4+ territorios = 12+ interacoes por turno. ARIA descreveu como "maior pain de UX desta partida". BALDO: "6 cliques para redistribuir 4 grupos".

A distribuicao automatica nao precisa ser otima — apenas igualar tropas entre territorios ja resolve 80% do pain. Jogadores que querem distribuicao customizada continuam usando o sistema manual.

---

## Implementacao

### 1. Logica de distribuicao igualitaria

**Arquivo:** `/src/stores/gameStore.ts`

Adicionar funcao `autoDistributeTroops()`:

```typescript
autoDistributeTroops(): void {
  const clan = this.getPlayerClan();
  const territories = clan.territories.filter(t => t.ownerId === clan.id);
  if (territories.length <= 1) return; // Nada para distribuir

  // Agregar todas as tropas do jogador
  const totalUnits: Record<UnitType, number> = {
    SOLDIER: 0, ARCHER: 0, KNIGHT: 0, SPY: 0
  };

  for (const territory of territories) {
    for (const unit of territory.units) {
      totalUnits[unit.type] += unit.count;
    }
  }

  // Distribuir igualmente (floor para cada, remainder vai para territorio com mais estruturas)
  const territoryCount = territories.length;

  for (const territory of territories) {
    territory.units = Object.entries(totalUnits)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({
        type: type as UnitType,
        count: Math.floor(count / territoryCount)
      }))
      .filter(u => u.count > 0);
  }

  // Distribuir remainder (1 unidade extra por territorio, comecando pelo que tem mais estruturas)
  const sortedByStructures = [...territories].sort(
    (a, b) => b.structures.length - a.structures.length
  );

  for (const [type, count] of Object.entries(totalUnits)) {
    const remainder = count % territoryCount;
    for (let i = 0; i < remainder; i++) {
      const territory = sortedByStructures[i];
      const existing = territory.units.find(u => u.type === type);
      if (existing) {
        existing.count += 1;
      } else {
        territory.units.push({ type: type as UnitType, count: 1 });
      }
    }
  }
}
```

**Nota:** A distribuicao eh instantanea (nao usa sistema de expedicoes). Tropas sao realocadas sem custo de turno. Justificativa: a redistribuicao manual atual tambem eh instantanea — o jogador ja pode mover tropas entre territorios adjacentes sem delay. O botao automatiza o processo, nao muda a mecanica.

### 2. UI do botao

**Arquivo:** `/src/app/game/army/page.tsx`

Adicionar botao no topo da pagina de exercito:

```tsx
<MedievalButton
  onClick={() => gameStore.autoDistributeTroops()}
  variant="secondary"
  disabled={playerTerritories.length <= 1}
>
  ⚔️ Auto-Distribuir Igualmente
</MedievalButton>
```

Posicionar abaixo do titulo da pagina e acima da lista de territorios. Desabilitado quando o jogador tem apenas 1 territorio.

### 3. Feedback visual

Apos auto-distribuicao, exibir toast confirmando:

```
✅ Tropas distribuidas igualmente entre {n} territorios
```

O toast usa o sistema existente de notificacoes (se houver) ou um estado temporario no componente.

### 4. Tooltip explicativo

Tooltip no botao:

```
Distribui todas as suas tropas igualmente entre seus territorios.
Territorios com mais estruturas recebem unidades extras quando a divisao nao eh exata.
```

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | Adicionar funcao `autoDistributeTroops()` |
| `/src/app/game/army/page.tsx` | Botao "Auto-Distribuir Igualmente" + tooltip + feedback |

---

## Criterios de Aceite

1. Botao "Auto-Distribuir Igualmente" aparece na pagina de exercito
2. Ao clicar, todas as tropas do jogador sao redistribuidas igualmente entre seus territorios
3. Remainder de divisao vai para territorios com mais estruturas (prioridade defensiva)
4. Botao desabilitado quando jogador tem <= 1 territorio
5. Toast de confirmacao aparece apos distribuicao
6. Tooltip explica o comportamento do botao
7. Distribuicao eh instantanea (sem custo de turno)
8. Espioes (SPY) sao distribuidos junto com outras unidades
9. Tropas em expedicoes ativas NAO sao incluidas na redistribuicao (apenas tropas estacionadas)
