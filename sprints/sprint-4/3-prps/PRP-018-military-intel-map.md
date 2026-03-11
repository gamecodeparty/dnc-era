# PRP-018 — Inteligência Militar no Mapa

**Specs:** S-021, S-024
**Prioridade:** Score 9/10 (D-042 — sem visibilidade tropas inimigas, 4/6) + Score 8/10 (D-043 — alerta ataque iminente, 3/6) + Score 8/10 (D-047 — badges só próprios, 4/6)
**Dependências:** Nenhuma

---

## Objetivo

Dar ao jogador informação militar sobre territórios inimigos no mapa. Atualmente, badges de defesa (F-046/F-047) existem apenas em territórios próprios — territórios inimigos não mostram nenhuma informação de força. Quatro agentes (Cleo, Davi, Espa, Beto) reportaram que cada decisão de ataque é feita "por fé". Davi perdeu dois territórios por não saber a força do adversário. Além disso, ataques inimigos chegam sem aviso — novatos como Felix percebem isso como injustiça.

Esta PRP resolve ambos os problemas: (1) badges de tropas inimigas com níveis de informação e (2) alerta visual de ataque iminente.

---

## Escopo

- **Tipo:** `/src/game/types/index.ts` — interfaces TerritoryIntel e IncomingAttack
- **Engine:** `/src/game/engine/GameEngine.ts` — tracking de intel de combate + registro de ataques iminentes
- **Tela:** `/src/components/game/map/Territory.tsx` — badges inimigos + badge de ataque iminente
- **Store:** `/src/stores/gameStore.ts` — estado de intel por território

---

## Features

### F-056 — Tracking de intel por território no GameState

Em `/src/game/types/index.ts`:

Adicionar interface de intel por território:

```typescript
interface TerritoryIntel {
  territoryId: string;
  source: 'SPY' | 'COMBAT' | 'NONE';
  defensePower: number | null;
  revealedAt: number;
  expiresAt: number;
}
```

Em `/src/game/engine/GameEngine.ts`:

Ao resolver combate (ataque ou defesa), registrar intel do território inimigo envolvido:
- `source: 'COMBAT'`
- `defensePower`: valor de defesa observado durante o combate
- `expiresAt`: turno atual + 3

Intel de espião (`source: 'SPY'`) já existe parcialmente — integrar com a mesma interface.

Em `/src/stores/gameStore.ts`:

Adicionar array `territoryIntel: TerritoryIntel[]` ao estado, com cleanup automático de entradas expiradas a cada turno.

**Critérios de aceite:**
- Interface TerritoryIntel definida em types
- Intel de combate registrada automaticamente após resolução de batalha
- Intel de espião integrada na mesma interface
- Entradas expiradas removidas automaticamente a cada turno
- Estado acessível via gameStore

### F-057 — Badges de tropas inimigas com 3 níveis de intel

Em `/src/components/game/map/Territory.tsx`:

Para territórios inimigos (não pertencentes ao jogador), exibir badge de força com níveis de informação:

**Nível 1 — Sem intel (default):**
- Badge com ícone de espada + "?" em cinza (`text-slate-400`)
- Tooltip: "Força desconhecida — envie um Espião para revelar"

**Nível 2 — Revelado por SPY:**
- Badge com poder de defesa real + ícone 👁 em roxo (`text-purple-400`)
- Tooltip: "Intel de espião — expira em X turnos"

**Nível 3 — Estimativa por combate recente:**
- Badge com ícone ⚔ + valor estimado em laranja (`text-orange-400`)
- Tooltip: "Estimativa baseada em combate recente"

**Diferenciação visual próprios vs inimigos:**
- Territórios próprios: borda verde (`border-green-500/60`)
- Territórios inimigos: borda vermelha (`border-red-500/60`)

**Exibição condicional por era:**
- Era da Paz: badges inimigos NÃO aparecem
- Era da Guerra/Invasão: badges inimigos visíveis por default
- Respeitar toggle de visibilidade existente (F-048)

**Critérios de aceite:**
- Territórios inimigos exibem badge "?" em cinza quando força é desconhecida
- Territórios revelados por SPY exibem poder real com ícone 👁 em roxo
- Territórios com combate recente (3 turnos) exibem estimativa com ícone ⚔ em laranja
- Badges de territórios próprios têm borda verde; inimigos têm borda vermelha
- Intel de combate expira após 3 turnos e badge volta para "?"
- Badges inimigos só aparecem durante Era da Guerra e Invasão
- Toggle de visibilidade (F-048) controla badges próprios e inimigos

### F-058 — Alerta de ataque iminente no mapa

Em `/src/game/types/index.ts`:

```typescript
interface IncomingAttack {
  targetTerritoryId: string;
  sourceClanId: string;
  arrivesTurn: number;
}
```

Em `/src/game/engine/GameEngine.ts`:

Quando AI lança expedição de ataque contra território do jogador:
- Adicionar `IncomingAttack` ao array `incomingAttacks` no game state
- Remover entradas cujo `arrivesTurn` já passou

Em `/src/components/game/map/Territory.tsx`:

Quando território do jogador tem `IncomingAttack` pendente:
- Badge vermelho pulsante: ⚠ "Ataque iminente!"
- Cor: `text-red-400 bg-red-900/60`
- Animação: `animate-pulse` suave
- Tooltip: "Expedição inimiga detectada — chegará no próximo turno. Reforce a defesa!"

**Restrições de informação (equilíbrio):**
- NÃO revelar o clã atacante (a menos que espião ativo)
- NÃO revelar a força do ataque
- Apenas indicar: "há movimento militar em direção ao seu território"

**Critérios de aceite:**
- Quando AI lança ataque, badge vermelho pulsante aparece no território-alvo
- Badge aparece 1 turno antes do ataque ser resolvido
- Tooltip diz "Ataque iminente" sem revelar atacante ou força
- Badge desaparece após o turno de resolução do ataque
- Alerta só funciona durante Era da Guerra e Invasão

### F-059 — Notificação de ataque iminente no log de eventos

Em `/src/game/engine/GameEngine.ts`:

No início do turno do jogador, se há `IncomingAttack` com `arrivesTurn === currentTurn + 1`:
- Gerar evento: "Expedição inimiga detectada se movendo em direção a [território]!"
- Evento aparece no log de eventos do turno

**Critérios de aceite:**
- Evento de notificação aparece no log quando ataque iminente é detectado
- Evento não revela identidade do atacante (a menos que espião ativo)
- Evento aparece apenas 1 vez por ataque iminente

---

## Limites

- NÃO altera a lógica de combate — apenas exibe informação visual
- NÃO revela composição detalhada de tropas inimigas (apenas poder total)
- NÃO implementa seleção de unidades a partir do mapa
- NÃO revela identidade do atacante em ataques iminentes (exceto com espião)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

Complementa PRP-015 (Badges de Tropas no Mapa) que implementou badges para territórios próprios.
