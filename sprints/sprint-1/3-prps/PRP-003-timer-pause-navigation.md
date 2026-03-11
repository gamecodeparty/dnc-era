# PRP-003 — Pausar Timer na Navegação

**Specs:** S-003
**Prioridade:** Score 8/10 (D-002 — timer não para durante navegação, 5/6 agentes afetados)
**Dependências:** Nenhuma
**Status:** ~~CANCELADO~~ — ver nota abaixo

---

## Nota do Operador (2026-03-11)

Este PRP foi **cancelado** após feedback do operador. O timer é global e imutável — é uma regra que vale para todos os jogadores igualmente. Em produção o timer será de 10 a 30 minutos, tornando desnecessário pausar durante navegação.

Ver S-003 para análise completa.

---

## Objetivo (original — cancelado)

~~Pausar o timer de turno (10s) quando o jogador navega para páginas secundárias. O timer só avança na página principal `/game`.~~

---

## Features — Status Final

### F-007 — Timer state no gameStore — `passing` (implementado)

Refatoração válida. O timer state foi movido para o gameStore. O estado `timerPaused`/`pauseTimer()`/`resumeTimer()` é código morto por enquanto (nada chama pauseTimer em produção), mas pode ser removido em oportunidade futura.

### F-008 — Hook useTurnTimer — `passing` (implementado)

O hook foi implementado com pause-on-unmount. Este comportamento contradiz o design do jogo (timer global e imutável). Em produção, o hook deve ser simplificado para apenas fazer tick sem pausar ao navegar. Não bloqueia funcionalidade atual.

### F-009 — Indicador visual de timer pausado — `skipped`

**Cancelada.** Não faz sentido mostrar "Timer pausado" se o timer não deve pausar.

---

## Decisão

Nenhuma nova feature de pause-timer será implementada neste sprint. O timer de produção (10-30 min) resolve a dor D-002 sem necessidade de pausa por navegação.
