# SPRINT.md — sprint-2-baseline

## Objetivo

Executar a primeira rodada de playtesting autônomo do jogo **Dice&Cards Era** com 6 agentes simulados com estratégias distintas, identificar pains críticos e produzir dados concretos para o backlog.

## Hipótese

O jogo, em seu estado atual, já possui mecânicas de construção, treinamento e progressão de eras funcionais no cliente (Zustand store). Porém, espera-se que haja gaps críticos de UX — especialmente na ausência de tutoriais claros, feedback sobre resultados de combate, e acessibilidade de ações (ataque, diplomacia).

## Estado do Jogo no Início do Sprint

- **Servidor**: NÃO estava rodando no momento do playtesting. Jogo usa Zustand store client-side — não precisa do servidor para mecânicas core.
- **Turnos automáticos**: TURN_INTERVAL_MS = 10.000ms (10s). Turnos avançam automaticamente.
- **Mapa**: 12 territórios, grid 3×4, cada um com bonus de recurso
- **Eras**: Paz (15t), Guerra (20t), Invasão (15t) — fast mode: 8/10/7
- **Ações disponíveis**: Construir (4 slots/território), Treinar unidades, Expedições, Espionagem, Cartas, Diplomacia
- **Ações ausentes de UI**: Atacar outros clãs (sem rota /game/attack)

## Agentes

| ID | Estratégia | Facção |
|----|-----------|--------|
| agent-a | Econômica agressiva | Verdâneos |
| agent-b | Econômica defensiva | Verdâneos (Áureos não existe no código!) |
| agent-c | Militar ofensiva | Ferronatos |
| agent-d | Militar reativa | Ferronatos |
| agent-e | Espionagem/diplomacia | Umbral |
| agent-f | Instintiva novato | Ferronatos |

## Nota sobre o Playtesting

O servidor de desenvolvimento não estava ativo durante a sessão. O playtesting foi conduzido via análise profunda do código (GameEngine, CombatSystem, ResourceSystem, gameStore.ts, todos os componentes de UI) e simulação determinística baseada nas mecânicas implementadas. Cada agente tomou decisões independentes baseadas em sua estratégia declarada, e as consequências foram calculadas conforme as regras do código.
