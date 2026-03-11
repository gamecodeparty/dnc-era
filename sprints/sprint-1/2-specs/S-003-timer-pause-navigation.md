# S-003 — Pausar Timer Durante Navegacao

**Discovery:** D-002 (score 8/10, frequencia 5/6)
**Tipo:** Pain — Timer nao para durante navegacao
**Status:** ~~CANCELADA~~ — ver nota do operador abaixo

---

## Nota do Operador (2026-03-11)

> "vc aceitou a issue 'S-003 — Pausar Timer Durante Navegacao', mas veja, isso nao faz sentido num jogo de turnos como esse. o timer e global. vale para todos os players. como pd parar para e nao parar par outro? nao faz sentido. se parar para um vai parar para todos. o problema nao eh parar ou nao mas sim o tempo. o jogo real, released, tera um timer de minutos. sera ajusta, mas talvez seja 10 a 30minutos. mas entenda, eh imutavel. eh uma regra para todos os players"

## Analise da Correcao

A dor D-002 foi identificada corretamente durante o playtesting — jogadores sentiram o timer correndo durante navegacao. Porem, a **causa raiz** foi mal diagnosticada:

- **Causa real:** Timer de 10 segundos no ambiente de teste eh inadequado para gameplay real
- **Causa falsa diagnosticada:** "O timer deveria pausar durante navegacao"

### Por que pausar e incorreto

O timer e uma **regra de jogo global e imutavel**, compartilhada por todos os jogadores:

1. Se o timer pausasse para um jogador ao navegar, faria de fato o turno infinito para aquele jogador enquanto o jogo ficasse bloqueado para os demais — sem sentido num contexto multi-player ou single-player com progressao de era
2. Em producao, o timer sera de **10 a 30 minutos** — tempo mais que suficiente para navegar entre paginas de territorio, exercito, cartas e diplomacia sem pressao
3. Pausar o timer por navegacao seria uma brecha de design que contradiz a natureza de jogo baseado em turnos com tempo fixo

## Conclusao

**Esta spec esta CANCELADA.** O problema nao e a pausa — e a duracao do timer no ambiente de teste (10s) que nao reflete o timer de producao (10-30 min).

### Implicacoes

- **F-007** (timer state no gameStore): A refatoracao de mover o timer para o store eh uma melhoria arquitetural valida. O estado `timerPaused` e as actions `pauseTimer()`/`resumeTimer()` introduzidas podem ser removidas em oportunidade futura, mas nao bloqueiam o jogo.
- **F-008** (hook useTurnTimer): O hook introduz pause-on-unmount. Em producao, este comportamento de pausar ao navegar contradiz o design do jogo. O hook pode ser simplificado para apenas tick sem pause em versao futura.
- **F-009** (indicador visual de timer pausado): **CANCELADA** — nao sera implementada.

### Acao Recomendada

Quando o timer de producao for configurado (10-30 min), a dor D-002 desaparece naturalmente. Nenhuma feature de pause e necessaria.
