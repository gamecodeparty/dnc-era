# S-003 — Pausar Timer Durante Navegacao

**Discovery:** D-002 (score 8/10, frequencia 5/6)
**Tipo:** Pain — Timer nao para durante navegacao

---

## Objetivo

Pausar o timer de turno (10s) quando o jogador navega para paginas secundarias (`/game/territory/[id]`, `/game/cards`, `/game/army`, `/game/diplomacy`). O timer so avanca quando o jogador esta na pagina principal `/game`.

---

## Implementacao

### 1. Mover timer para o gameStore

Atualmente o timer vive em `useState` + `useEffect` dentro de `/src/app/game/page.tsx` (linhas 162-176). Isso significa que ao navegar para outra pagina, o componente desmonta e o timer para — mas `processTurn()` nao eh chamado, o que pode causar inconsistencia.

**Arquivo:** `/src/stores/gameStore.ts`

Adicionar ao state:

```typescript
// Estado do timer
timerPaused: boolean;
timeRemaining: number;  // ms restantes no turno atual

// Actions
pauseTimer: () => void;
resumeTimer: () => void;
```

Mover a logica do intervalo para um hook dedicado:

### 2. Hook useTurnTimer

**Novo arquivo:** `/src/hooks/useTurnTimer.ts`

```typescript
export function useTurnTimer() {
  // Le timerPaused e timeRemaining do gameStore
  // Quando NAO pausado, decrementa timeRemaining a cada 1s
  // Quando timeRemaining <= 0, chama processTurn() e reseta
  // Retorna { timeRemaining, isPaused }
}
```

### 3. Pausar ao navegar

**Arquivo:** `/src/app/game/page.tsx`

- Chamar `useTurnTimer()` aqui — timer ativo
- No `useEffect` de mount, chamar `resumeTimer()`
- No cleanup (unmount), chamar `pauseTimer()`

**Arquivos de paginas secundarias:**
- `/src/app/game/territory/[id]/page.tsx`
- `/src/app/game/cards/page.tsx`
- `/src/app/game/army/page.tsx`
- `/src/app/game/diplomacy/page.tsx`

Em cada uma, **nao** chamar `useTurnTimer()` — o timer fica pausado naturalmente porque ninguem o avanca.

### 4. Indicador visual de timer pausado

Quando o jogador esta em pagina secundaria, exibir no header:

```
⏸ Timer pausado — voltar ao mapa para continuar
```

**Arquivo:** `/src/components/game/mobile/MobileGameHeader.tsx` (e equivalente desktop)

- Ler `timerPaused` do gameStore
- Se pausado, mostrar indicador em vez do countdown

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | Adicionar `timerPaused`, `timeRemaining`, `pauseTimer()`, `resumeTimer()` |
| `/src/hooks/useTurnTimer.ts` | **Novo** — Hook que gerencia o intervalo do timer |
| `/src/app/game/page.tsx` | Usar `useTurnTimer()`, remover logica de timer local |
| `/src/components/game/mobile/MobileGameHeader.tsx` | Exibir estado pausado |

---

## Criterios de Aceite

1. Timer avanca normalmente quando jogador esta em `/game`
2. Timer pausa ao navegar para qualquer sub-pagina (`/game/territory/*`, `/game/cards`, `/game/army`, `/game/diplomacy`)
3. Timer retoma ao voltar para `/game`
4. Indicador visual "Timer pausado" aparece no header das paginas secundarias
5. `processTurn()` nunca eh chamado enquanto timer esta pausado
6. Funciona identicamente em desktop e mobile
