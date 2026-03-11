# SPRINT-01-BASELINE

## Objetivo
Sessão inaugural de playtesting com 6 agentes simulados. Estabelecer baseline de usabilidade e diversão do estado atual do jogo.

## Hipótese
O loop central (construir na Era da Paz → atacar na Era da Guerra → sobreviver na Invasão) está funcional no código. O problema principal deve ser de **comunicação** — o jogador não sabe o que fazer ou por que importa.

## Estado do Código
- GameStore: Zustand client-side (sem conexão ao backend durante playtesting)
- Turnos: auto-avançam a cada 10 segundos (hardcoded, não configurável)
- Eras: PEACE 15t, WAR 20t, INVASION 15t (total 50t)
- UI: game/page.tsx com mapa 4x3, sidebar de recursos, painel de eventos
- Nota: pnpm db:reset resetaria BD do PostgreSQL, mas o jogo usa Zustand client-side. A simulação foi baseada nos valores iniciais codificados no gameStore.ts.

## Agentes

| ID     | Perfil               | Facção     | Estratégia Declarada           |
|--------|----------------------|------------|-------------------------------|
| agent-a | Econômico Agressivo  | Verdaneos  | Rush farms, explorar tudo, dominar fase econômica |
| agent-b | Econômico Defensivo  | Aureos (Verdaneos) | Recursos maxed, diplomacia, evitar guerra |
| agent-c | Militar Ofensivo     | Ferronatos | Barracks imediato, ataque no turno 16 |
| agent-d | Militar Reativo      | Ferronatos | Aguardar outros se desgastarem, entrar tarde |
| agent-e | Espionagem/Diplomacia | Umbral    | Usar bônus Umbral, diplomacia intensa |
| agent-f | Novato Instintivo    | Aleatório  | Click random, agir por instinto |

## Estado Inicial (todos os agentes)
- Recursos: 100 graos, 50 madeira, 30 ouro
- Territorio 0 (GRAIN bonus): Farm Lv1, 5 Soldados
- Territorio 1 (WOOD bonus): vazio
- Inimigos: AI1 Norte (Verdaneos, DEFENDER), AI2 Sul (Umbral, OPPORTUNIST), AI3 Leste (Ferronatos, CONQUEROR), AI4 Oeste (Verdaneos, MERCHANT)
- Territórios neutros: T10, T11

## Metodologia
Simulação determinística baseada na leitura completa do código-fonte (gameStore.ts, GameEngine.ts, CombatSystem.ts, balance.ts). Cada agente tomou decisões independentes segundo sua estratégia declarada. Eventos aleatórios (combate, exploração) foram calculados com base nas fórmulas do código usando valores médios/esperados.
