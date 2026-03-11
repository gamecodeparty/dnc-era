# PRP-010 — Timer de Turno Configurável

**Specs:** S-012
**Prioridade:** Score 7/10 (D-017 — timer 10s corta ações, 4/6 + D-002 — timer avança na navegação, 5/6)
**Dependências:** Nenhuma

---

## Objetivo

Tornar a duração do timer de turno configurável via constante de balance (default 30s), adaptar o HUD para exibir formato adequado a qualquer duração, e remover a lógica incorreta de pause/resume por navegação entre páginas. Resolve duas dores: o timer de 10s que corta ações (D-017) e o timer que avança durante navegação (D-002, ref: S-003 cancelada — solução é ajustar duração, não pausar).

---

## Escopo

- **Constantes:** `TURN_DURATION_MS` em `balance.ts`
- **Hook:** Simplificar `useTurnTimer.ts` (remover pause/resume por navegação)
- **HUD:** Formatação adaptativa (mm:ss) + urgência visual percentual no componente de timer

---

## Features

### F-033 — Constante configurável TURN_DURATION_MS

Em `/src/game/constants/balance.ts`:

- Localizar constante do timer (atualmente 10s) e renomear/ajustar para `TURN_DURATION_MS`
- Valor default: `30_000` (30s — triplica o atual, suficiente para ações compostas em playtesting)
- Comentário documentando valores recomendados:
  - Debug ultrarrápido: 10_000 (10s)
  - Playtesting: 30_000 (30s)
  - Produção: 600_000 (10min) a 1_800_000 (30min)

**Critérios de aceite:**
- Timer usa constante de `balance.ts` (não hardcoded em componentes/hooks)
- Valor default é 30s
- Alterar a constante altera o timer em todo o jogo

### F-034 — Formatação adaptativa e urgência visual no HUD

No componente de HUD que exibe o timer:

Formatação:
- ≤ 60s: exibir segundos ("0:45")
- > 60s: exibir minutos:segundos ("9:45")
- > 60min: exibir horas:minutos ("1:30:00")

Urgência visual (percentual, não valores fixos):
- Últimos 20% do tempo: texto em amarelo
- Últimos 10%: texto em vermelho com pulse
- Funciona proporcionalmente a qualquer duração configurada

**Critérios de aceite:**
- Timer exibe formato mm:ss quando duração > 60s
- Urgência amarela nos últimos 20%, vermelha nos últimos 10%
- Urgência funciona com qualquer valor de TURN_DURATION_MS

### F-035 — Remover pause/resume por navegação

Em `/src/hooks/useTurnTimer.ts`:

- Remover `pauseTimer()` no unmount do componente
- Remover `resumeTimer()` no mount do componente
- Manter apenas o interval de tick
- NÃO remover `timerPaused`/`pauseTimer()`/`resumeTimer()` do store — podem ter usos válidos (pause quando jogo acaba)
- Apenas desacoplar da navegação entre páginas

**Critérios de aceite:**
- Timer NÃO pausa ao navegar entre páginas do jogo
- Timer continua pausando quando jogo termina (se implementado)
- Hook simplificado sem lógica de mount/unmount para pause

---

## Limites

- NÃO implementa pause por navegação (S-003 cancelada)
- NÃO altera lógica de processamento de turno — apenas duração e exibição
- NÃO adiciona UI para o jogador configurar o timer — é constante de código
- NÃO remove `pauseTimer()`/`resumeTimer()` do store (podem ter outros usos)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
