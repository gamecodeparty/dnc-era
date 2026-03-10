# PRP-003 — Pausar Timer na Navegação

**Specs:** S-003
**Prioridade:** Score 8/10 (D-002 — timer não para durante navegação, 5/6 agentes afetados)
**Dependências:** Nenhuma

---

## Objetivo

Pausar o timer de turno (10s) quando o jogador navega para páginas secundárias (`/game/territory/[id]`, `/game/cards`, `/game/army`, `/game/diplomacy`). O timer só avança na página principal `/game`.

---

## Escopo

- **Store:** Adicionar estado de timer ao `gameStore`
- **Hook:** Novo `useTurnTimer` para gerenciar intervalo
- **Tela principal:** Refatorar `/src/app/game/page.tsx` para usar hook
- **Header:** Indicador visual de timer pausado

---

## Features

### F-007 — Timer state no gameStore

Em `/src/stores/gameStore.ts`, adicionar ao state:

```typescript
timerPaused: boolean;
timeRemaining: number;  // ms restantes no turno atual
```

Actions:
- `pauseTimer()` — marca timer como pausado
- `resumeTimer()` — retoma timer

Remover a lógica de timer local (`useState` + `useEffect`) de `/src/app/game/page.tsx` (linhas 162-176).

**Critérios de aceite:**
- Timer state centralizado no gameStore
- `processTurn()` nunca é chamado enquanto timer está pausado

### F-008 — Hook useTurnTimer

Criar `/src/hooks/useTurnTimer.ts`:

- Lê `timerPaused` e `timeRemaining` do gameStore
- Quando NÃO pausado, decrementa `timeRemaining` a cada 1s
- Quando `timeRemaining <= 0`, chama `processTurn()` e reseta
- Retorna `{ timeRemaining, isPaused }`

Em `/src/app/game/page.tsx`:
- Chamar `useTurnTimer()` — timer ativo
- No `useEffect` de mount, chamar `resumeTimer()`
- No cleanup (unmount), chamar `pauseTimer()`

Páginas secundárias NÃO chamam `useTurnTimer()` — timer fica pausado naturalmente.

**Critérios de aceite:**
- Timer avança normalmente em `/game`
- Timer pausa ao navegar para sub-páginas
- Timer retoma ao voltar para `/game`

### F-009 — Indicador visual de timer pausado

Em `/src/components/game/mobile/MobileGameHeader.tsx` (e equivalente desktop):

- Ler `timerPaused` do gameStore
- Se pausado, mostrar "⏸ Timer pausado — voltar ao mapa para continuar" em vez do countdown
- Estilo visual claro (cor diferenciada)

**Critérios de aceite:**
- Indicador "Timer pausado" aparece no header das páginas secundárias
- Funciona em desktop e mobile

---

## Limites

- NÃO altera a duração do timer (continua 10s)
- NÃO implementa configuração de duração de timer
- NÃO consolida ações em modais na página principal — apenas pausa o timer

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
