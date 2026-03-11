# S-012 — Timer de Turno Configuravel

**Discoveries:** D-017 (score 7/10, frequencia 4/6), D-002 (score 8/10, frequencia 5/6)
**Tipo:** Pain — Timer de 10s corta acoes em andamento
**Ref:** S-003 (sprint 1) foi CANCELADA — operador esclareceu que timer eh regra global imutavel; o problema real eh a duracao, nao o comportamento de pause

---

## Objetivo

Tornar a duracao do timer de turno configuravel via constante de balance, permitindo ajuste entre ambiente de desenvolvimento (10s) e producao (10-30 minutos). O timer de 10s no playtesting causou frustacao em 4/6 agentes por cortar acoes em andamento (treino, construcao, leitura de narrativa).

A solucao NAO eh pausar o timer (S-003 cancelada), mas sim ajustar a duracao para refletir o ritmo pretendido do jogo.

---

## Implementacao

### 1. Constante configuravel em balance.ts

**Arquivo:** `/src/game/constants/balance.ts`

Localizar a constante `TURN_INTERVAL_MS` (ou equivalente que define os 10s) e:

```typescript
// Duracao do turno em milissegundos
// Dev: 30_000 (30s) para testes rapidos
// Producao: 600_000 (10 min) a 1_800_000 (30 min)
export const TURN_DURATION_MS = 30_000;
```

**Valores recomendados:**
- Desenvolvimento/playtesting rapido: 30s (triplica o atual de 10s — suficiente para acoes compostas)
- Producao: 10-30 minutos (decisao do game designer)
- O valor atual de 10s fica documentado como "modo ultrarapido" para debug

### 2. Exibicao do timer no HUD

**Arquivo:** Componente de HUD que exibe o timer (verificar `useTurnTimer` hook)

Garantir que o timer exibe no formato adequado a duracao:
- Se <= 60s: exibir segundos (`"0:45"`)
- Se > 60s: exibir minutos:segundos (`"9:45"`)
- Se > 60 min: exibir horas:minutos (`"1:30:00"`) — improvavel mas seguro

Adicionar urgencia visual:
- Ultimos 20% do tempo: texto em amarelo
- Ultimos 10%: texto em vermelho com pulse
- Adapta a qualquer duracao (percentual, nao valores fixos)

### 3. Remover logica de pause desnecessaria

**Arquivo:** `/src/hooks/useTurnTimer.ts`

O hook atualmente pausa o timer ao sair de `/game` e resume ao entrar. Conforme S-003 (cancelada), este comportamento eh incorreto — o timer eh global e nao deve pausar por navegacao.

Simplificar o hook:
- Remover `pauseTimer()` no unmount
- Remover `resumeTimer()` no mount
- Manter apenas o interval de tick

**Nota:** Nao remover `timerPaused`/`pauseTimer()`/`resumeTimer()` do store — podem ter outros usos validos (ex: pause quando jogo acaba, pause em modais de confirmacao). Apenas desacoplar da navegacao entre paginas.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/game/constants/balance.ts` | Ajustar `TURN_DURATION_MS` de 10s para 30s |
| Componente de HUD do timer | Formatacao adaptativa (mm:ss) + urgencia visual percentual |
| `/src/hooks/useTurnTimer.ts` | Remover pause/resume por navegacao |

---

## Criterios de Aceite

1. Timer de turno usa constante configuravel de `balance.ts` (nao hardcoded)
2. Valor default eh 30s (adequado para playtesting)
3. Timer exibe formato mm:ss quando duracao > 60s
4. Urgencia visual (amarelo/vermelho) funciona proporcionalmente a qualquer duracao
5. Timer NAO pausa ao navegar entre paginas do jogo
6. Timer pausa corretamente quando jogo termina
