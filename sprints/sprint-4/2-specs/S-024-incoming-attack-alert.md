# S-024 — Alerta de Ataque Iminente

**Discovery:** D-043 (score 8/10, frequencia 3/6)
**Tipo:** Pain — Sem indicador de movimento inimigo no mapa

---

## Objetivo

Adicionar indicador visual no mapa quando um cla inimigo lanca expedicao de ataque contra um territorio do jogador. Atualmente, o jogador descobre o ataque apenas quando ele eh resolvido no proximo turno. Para novatos (Felix), isso eh percebido como injustica — "no turno anterior tudo parecia normal, e de repente estava sendo atacado".

O alerta nao revela a forca do ataque — apenas indica que ha movimento inimigo em direcao a um territorio especifico.

---

## Implementacao

### 1. Registro de expedicoes inimigas em transito

**Arquivo:** `/src/game/engine/GameEngine.ts`

Quando a AI lanca expedicao de ataque, registrar no estado do jogo:

```typescript
interface IncomingAttack {
  targetTerritoryId: string;
  sourceClanId: string;
  arrivesTurn: number; // turno em que o ataque sera resolvido
}
```

Ao processar turno da AI, se AI decide atacar territorio do jogador:
- Adicionar `IncomingAttack` ao array `incomingAttacks` no game state
- Remover entradas cujo `arrivesTurn` ja passou

### 2. Indicador visual no territorio-alvo

**Arquivo:** `/src/components/game/map/Territory.tsx`

Quando territorio do jogador tem `IncomingAttack` pendente:

```
┌──────────────────┐
│ T5    ⚠ ATAQUE   │  ← badge vermelho pulsante
│ Verdaneos        │
│ 🌾 +10           │
│       ⚔ 24       │
│ ■■■□  🏗3        │
└──────────────────┘
```

**Estilo do badge:**
- Icone: ⚠ ou espadas cruzadas
- Texto: "Ataque iminente!"
- Cor: `text-red-400 bg-red-900/60`
- Animacao: `animate-pulse` suave
- Tooltip: "Expedicao inimiga detectada — chegara no proximo turno. Reforce a defesa!"

### 3. Notificacao no inicio do turno

**Arquivo:** `/src/game/engine/GameEngine.ts`

No inicio do turno do jogador, se ha `IncomingAttack` com `arrivesTurn === currentTurn + 1`:
- Gerar evento: "Expedicao inimiga detectada se movendo em direcao a [territorio]!"
- Evento aparece no log de eventos do turno

### 4. Restricoes de informacao

Para manter equilibrio estrategico:
- **NAO revelar** o cla atacante (a menos que jogador tenha espiao revelando o territorio de origem)
- **NAO revelar** a forca do ataque
- **NAO revelar** se eh ataque ou reconhecimento
- Apenas indicar: "ha movimento militar em direcao ao seu territorio"

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/game/engine/GameEngine.ts` | Registro de IncomingAttack ao processar turno AI + evento de notificacao |
| `/src/game/types/index.ts` | Interface IncomingAttack + campo no GameState |
| `/src/components/game/map/Territory.tsx` | Badge de ataque iminente com pulse |

---

## Criterios de Aceite

1. Quando AI lanca ataque contra territorio do jogador, badge vermelho pulsante aparece no territorio-alvo
2. Badge aparece 1 turno antes do ataque ser resolvido
3. Tooltip do badge diz "Ataque iminente" sem revelar atacante ou forca
4. Evento de notificacao aparece no log de eventos do turno
5. Badge desaparece apos o turno de resolucao do ataque
6. Alerta so funciona durante Era da Guerra e Invasao (na Paz nao ha ataques)
7. Identidade do atacante NAO eh revelada (a menos que espiao esteja ativo)
