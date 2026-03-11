# S-018 — Badges de Tropas no Mapa

**Discovery:** D-034 (score 8/10, frequencia 4/6)
**Tipo:** Pain — Sem overview visual de tropas por territorio no mapa

---

## Objetivo

Permitir que o jogador veja a forca militar de cada territorio diretamente no mapa, sem precisar clicar em cada um. Atualmente, `Territory.tsx` ja exibe contagem de unidades (icone de espada + numero) quando > 0, mas apenas o total. Esta spec melhora a informacao exibida com badges coloridos que comunicam instantaneamente forca relativa.

---

## Implementacao

### 1. Badge de forca militar no tile do territorio

**Arquivo:** `/src/components/game/map/Territory.tsx`

Substituir o indicador atual de unidades (apenas contagem) por badge que mostra poder de defesa calculado:

**Para territorios do jogador:**
```
┌──────────────┐
│ T3    👁     │
│ Verdaneos    │
│ 🌾 +10      │
│       ⚔ 24  │  ← poder de defesa total (verde se forte, vermelho se fraco)
│ ■■■□  🏗3   │
└──────────────┘
```

**Calculo de poder:**
```typescript
const defensePower = units.reduce((sum, u) => {
  const defValues = { SOLDIER: 2, ARCHER: 1, KNIGHT: 3, SPY: 0 };
  return sum + (u.quantity * defValues[u.type]);
}, 0);
```

**Cor do badge baseada em forca relativa:**
- Verde (`text-green-400`): poder >= media dos seus territorios
- Amarelo (`text-yellow-400`): poder > 0 mas < media
- Vermelho (`text-red-400`): poder == 0 (territorio indefeso)
- Cinza: territorio neutro

**Para territorios inimigos (nao revelados):**
- Mostrar "?" ao inves de numero
- Se revelado por SPY: mostrar poder real com icone 👁

### 2. Indicador de territorio indefeso

**Arquivo:** `/src/components/game/map/Territory.tsx`

Territorios do jogador com 0 unidades militares devem ter destaque visual de alerta:

- Borda com pulse vermelho suave (`animate-pulse ring-red-500/40`)
- Badge "⚠ 0" em vermelho
- Tooltip: "Território sem defesa! Vulnerável a ataques."

Apenas durante Era da Guerra e Era da Invasao (durante Paz nao ha ameaca).

### 3. Toggle de visibilidade

**Arquivo:** `/src/app/game/page.tsx` ou componente de HUD

Adicionar toggle no HUD para mostrar/esconder badges de tropas (caso o jogador prefira mapa limpo):

```
[⚔ Tropas: ON/OFF]
```

Default: ON durante Era da Guerra/Invasao, OFF durante Era da Paz.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/map/Territory.tsx` | Badge de poder de defesa + indicador de territorio indefeso |
| `/src/app/game/page.tsx` | Toggle de visibilidade dos badges |

---

## Criterios de Aceite

1. Cada territorio do jogador exibe badge com poder de defesa total (numero)
2. Badge usa cor verde/amarelo/vermelho conforme forca relativa
3. Territorios com 0 unidades mostram "⚠ 0" em vermelho com pulse durante eras de combate
4. Territorios inimigos mostram "?" (nao revelados) ou poder real (revelados por SPY)
5. Toggle no HUD permite mostrar/esconder badges
6. Default ON durante Guerra/Invasao, OFF durante Paz
7. Calculo de poder usa valores de defesa das unidades (Soldier:2, Archer:1, Knight:3, Spy:0)
