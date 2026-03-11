# PRP-015 — Badges de Tropas no Mapa

**Specs:** S-018
**Prioridade:** Score 8/10 (D-034 — sem overview visual de tropas, 4/6)
**Dependências:** Nenhuma

---

## Objetivo

Permitir que o jogador veja a força militar de cada território diretamente no mapa, sem precisar clicar em cada um. Atualmente, `Territory.tsx` já exibe contagem de unidades (ícone de espada + número) quando > 0, mas apenas o total. Esta PRP melhora a informação com badges coloridos que comunicam instantaneamente força relativa e alertam sobre territórios indefesos.

---

## Escopo

- **Tela:** `Territory.tsx` — badge de poder de defesa + indicador de território indefeso
- **Tela:** `page.tsx` — toggle de visibilidade dos badges no HUD

---

## Features

### F-046 — Badge de poder de defesa nos territórios do mapa

Em `/src/components/game/map/Territory.tsx`:

Substituir o indicador atual de unidades (apenas contagem) por badge que mostra poder de defesa calculado:

**Cálculo de poder:**
```typescript
const defensePower = units.reduce((sum, u) => {
  const defValues = { SOLDIER: 2, ARCHER: 1, KNIGHT: 3, SPY: 0 };
  return sum + (u.quantity * defValues[u.type]);
}, 0);
```

**Para territórios do jogador:**
- Badge "⚔ X" com cor baseada em força relativa:
  - Verde (`text-green-400`): poder >= média dos territórios do jogador
  - Amarelo (`text-yellow-400`): poder > 0 mas < média
  - Vermelho (`text-red-400`): poder == 0 (território indefeso)

**Para territórios inimigos:**
- Mostrar "?" ao invés de número (não revelados)
- Se revelado por SPY: mostrar poder real com ícone 👁

**Critérios de aceite:**
- Cada território do jogador exibe badge com poder de defesa total (número)
- Badge usa cor verde/amarelo/vermelho conforme força relativa
- Territórios inimigos mostram "?" ou poder real (se revelados por SPY)
- Cálculo de poder usa valores de defesa corretos (Soldier:2, Archer:1, Knight:3, Spy:0)

### F-047 — Indicador de território indefeso com alerta visual

Em `/src/components/game/map/Territory.tsx`:

Territórios do jogador com 0 unidades militares durante Era da Guerra ou Invasão:
- Borda com pulse vermelho suave (`animate-pulse ring-red-500/40`)
- Badge "⚠ 0" em vermelho
- Tooltip: "Território sem defesa! Vulnerável a ataques."

Durante Era da Paz: sem alerta (não há ameaça).

**Critérios de aceite:**
- Territórios com 0 unidades mostram "⚠ 0" em vermelho com pulse durante eras de combate
- Alerta não aparece na Era da Paz
- Tooltip explica a vulnerabilidade

### F-048 — Toggle de visibilidade dos badges no HUD

Em `/src/app/game/page.tsx` ou componente de HUD:

Adicionar toggle para mostrar/esconder badges de tropas:

```
[⚔ Tropas: ON/OFF]
```

Default: ON durante Era da Guerra/Invasão, OFF durante Era da Paz.
Estado persistido durante a partida (não entre partidas).

**Critérios de aceite:**
- Toggle no HUD permite mostrar/esconder badges
- Default ON durante Guerra/Invasão, OFF durante Paz
- Toggle muda imediatamente a visibilidade de todos os badges no mapa

---

## Limites

- NÃO altera a lógica de combate — apenas exibe informação visual
- NÃO implementa seleção de unidades a partir do mapa
- NÃO mostra composição detalhada de tropas (apenas poder total)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
