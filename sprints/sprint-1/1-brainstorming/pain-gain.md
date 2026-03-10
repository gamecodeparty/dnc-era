# Pain/Gain Map — Dice&Cards Era

**Última atualização:** Sprint 01 Baseline (2026-03-10)
**Total de discoveries:** 21 (15 pains + 6 gains)
**Wave:** 1 | **Agentes:** 6 | **NPS médio:** 5.5/10

---

## Tabela de Discoveries

| ID | Tipo | Categoria | Descrição | Frequência | Score (1–10) | Sprint | Implementado? |
|----|------|-----------|-----------|------------|--------------|--------|---------------|
| D-001 | pain | mecanica | **Sem preview de combate.** Atacar não mostra poder de ataque vs defesa estimado antes de confirmar. Toda batalha é caixa preta. > *"A interface de ataque não mostrou preview de combate antes de enviar! Não sei se vou ganhar ou perder." (Agent-A, T16)* | 6/6 | 10 | 1 | não |
| D-002 | pain | interface | **Timer não para durante navegação entre páginas.** Timer de 10s avança em /game/territory, /game/cards, /game/army. Ações compostas custam turnos. > *"Quando voltei ao mapa, já estava no turno 2. Perdi o turno 1 sem agir porque a navegação é lenta." (Agent-A, T1)* | 5/6 | 8 | 1 | não |
| D-003 | pain | mecanica | **Facção Umbral sem espiões implementados.** Bônus "+30% eficiência de espiões" prometido na seleção. Unidade SPY não existe no client (gameStore). Promessa falsa. > *"Não há unidade SPY disponível no cliente. Escolhi Umbral por um motivo que não existe." (Agent-E, T1)* | 1/6 | 8 | 1 | não |
| D-004 | pain | interface | **Sem tutorial contextual.** "Como Jogar" existe em página separada mas sem tooltips inline, missões guia ou onboarding no fluxo. Clicar no tutorial custa turnos. > *"Não há dica do tipo 'Construa Barracks para recrutar'. Se o botão 'Como Jogar' não existisse eu nunca teria descoberto." (Agent-F, T4)* | 3/6 | 9 | 1 | não |
| D-005 | pain | interface | **Resultado de batalhas entre AIs ausente no log.** Evento mostra "AI3 atacou AI2" sem resultado (vencedor, baixas). Impossibilita estratégia reativa. > *"O evento disse apenas 'atacou' mas não o RESULTADO. Não sei se AI3 ganhou ou perdeu." (Agent-D, T17)* | 4/6 | 7 | 1 | não |
| D-006 | pain | interface | **Limite de 4 estruturas por território não comunicado.** Descoberto apenas ao tentar exceder. Erro de planejamento irreversível sem demolição. > *"A limitação de 4 estruturas nunca foi explicada, e agora estou presa com uma configuração subótima." (Agent-B, T17)* | 3/6 | 7 | 1 | não |
| D-007 | pain | mecanica | **Resultado de exploração pouco claro.** Retorno mostra recursos mas sem indicar sucesso/parcial/falha. Probabilidades invisíveis. Primeira exploração de Agent-A retornou zero sem explicação (pareceu bug). > *"A interface não mostra o resultado (sucesso/parcial/falha). Só vejo 'tropas retornaram' com recursos zerados." (Agent-A, T7)* | 3/6 | 6 | 1 | não |
| D-008 | pain | interface | **Cartas desconectadas do fluxo de combate.** Ativar cartas de combate exige: /game/cards → ativar → voltar ao mapa → atacar. Sem integração no modal de expedição. > *"Tinha que ativar a carta em página separada ANTES de enviar o ataque. Fluxo desconexo." (Agent-C, T16)* | 3/6 | 5 | 1 | não |
| D-009 | pain | agencia | **Diplomacia puramente probabilística sem controle.** Propor paz = jogada de dados (acceptChance por personalidade). Sem gift-giving, negociação gradual ou influência ativa. > *"Propus paz com AI2 cinco vezes, rejeitada todas. A aceitação é probabilística sem elemento de controle." (Agent-E, entrevista)* | 3/6 | 5 | 1 | não |
| D-010 | pain | mecanica | **Bônus de facção implementados apenas no servidor.** Verdaneos (+20% grain), Ferronatos (+20% combate) existem em ResourceSystem.ts/CombatSystem.ts mas jogo usa Zustand client-side. Seleção de facção é flavor sem mecânica. > *"A produção de Farm era 12/turno para todos, sem diferenciação de facção na prática do cliente." (Agent-A, champion.md)* | 2/6 | 4 | 1 | não |
| D-011 | pain | diversao | **Tela de vitória sem narrativa de mérito.** Resultado exibe "Você sobreviveu! Recursos finais: X" sem explicar por que venceu. Vitória emocionalmente vazia. > *"Gostaria de uma tela que explicasse POR QUE venci. '465 pontos' não significa nada para mim." (Agent-A, champion.md)* | 1/6 | 4 | 1 | não |
| D-012 | pain | interface | **Sem indicador de progresso para próxima era.** Não há countdown "Era da Guerra em X turnos" nem linha do tempo das 3 eras no HUD. > *"Não há contador óbvio de 'X turnos até Era da Guerra'." (Agent-F, T7)* | 2/6 | 6 | 1 | não |
| D-013 | pain | agencia | **Carta Sabotagem: alvo de estrutura não escolhido.** Destrói estrutura inimiga aleatória. Jogador não pode escolher qual estrutura destruir nem saber qual foi destruída. > *"Sabotagem é aleatória! Não posso escolher qual estrutura destruir. É um poder cego." (Agent-E, T16)* | 1/6 | 3 | 1 | não |
| D-014 | pain | bugs | **Population tracking zerado no client.** Campo population sempre retorna 0 no client (TODO no código). Afeta pontuação exibida e comunicação de força do clã. > *"Population sempre 0 na UI — scoring broken." (Agent-A, T50 / ranking.md)* | 2/6 | 2 | 1 | não |
| D-015 | pain | mecanica | **AI de mesma facção começa como HOSTILE.** Lore indica aliança entre membros da mesma facção (ex: Umbral), mas relação diplomática inicial ignora isso e começa HOSTILE. > *"AI2 é da facção Umbral e começa como HOSTILE. O lore e a mecânica estão desconectados." (Agent-E, T2)* | 1/6 | 3 | 1 | não |
| G-001 | gain | diversao | **Transição de era é o melhor momento do jogo.** Evento "O Pacto das Cinzas foi rompido!" + mudança de background visual + entrega de carta = momento dramático e memorável unanimemente elogiado. > *"A transição de era foi dramática e clara." (Agent-A, T15) / "Completamente. É o melhor momento do jogo. 10/10." (Agent-C, entrevista)* | 6/6 | 10 | 1 | — |
| G-002 | gain | mecanica | **Wall como defesa passiva MVP.** Wall barata e altamente efetiva cria decisão estratégica clara com recompensa tangível. Citada por todos como melhor investimento. Correlação direta: 4/4 sobreviventes construíram Wall; 0/2 eliminados a construíram a tempo. > *"WALL. É o MVP do jogo." (Agent-C, T18)* | 4/6 | 9 | 1 | — |
| G-003 | gain | mecanica | **Horda como mecanismo anti-snowball.** Horda prioriza clã com mais territórios, criando desincentivo natural ao domínio excessivo sem parecer injusto para o jogador menor. > *"A mecânica da Horda atacar o mais forte é elegante e cria um desincentivo natural ao snowball." (Agent-D, entrevista)* | 3/6 | 8 | 1 | — |
| G-004 | gain | diversao | **Narrativas atmosféricas de exploração.** Textos de resultado de exploração ("A neblina envolve suas tropas...", "Armadilhas mágicas cobraram seu preço...") consistentemente elogiados como imersivos. > *"A narrativa foi deliciosa. Queria mais desses momentos." (Agent-E, entrevista)* | 3/6 | 7 | 1 | — |
| G-005 | gain | interface | **Clareza visual do mapa.** Cores de propriedade (seu/inimigo/neutro) são intuitivas sem necessidade de leitura. Único elemento de UI positivo mesmo para o novato total. > *"As cores foram a coisa mais clara do jogo para mim. Amarelo = eu, vermelho = inimigo. Intuitivo." (Agent-F, entrevista)* | 6/6 | 9 | 1 | — |
| G-006 | gain | diversao | **Feedback de conquista com saque listado.** Evento "VITÓRIA! Território conquistado! +X grain, +Y wood, +Z gold" cria loop de reward positivo imediato. > *"O evento 'VITÓRIA!' com o saque listado foi ótimo. Queria imediatamente conquistar mais." (Agent-A, entrevista)* | 3/6 | 7 | 1 | — |

---

## Resumo por Categoria

| Categoria | Pains | Gains |
|-----------|-------|-------|
| interface | 5 | 2 |
| mecanica | 4 | 2 |
| diversao | 1 | 2 |
| agencia | 2 | 0 |
| bugs | 1 | 0 |

---

## Top 5 Pains por Impacto (Score × Frequência)

| Rank | ID | Score | Frequência | Produto | Ação recomendada |
|------|----|-------|------------|---------|-----------------|
| 1 | D-001 | 10 | 6/6 | 60 | Preview de combate no modal de ataque |
| 2 | D-004 | 9 | 3/6 | 27 | Missões guia nos primeiros 3 turnos |
| 3 | D-002 | 8 | 5/6 | 40 | Pausar timer durante navegação fora do mapa |
| 4 | D-003 | 8 | 1/6 | 8 | Implementar SPY ou desabilitar Umbral |
| 5 | D-005 | 7 | 4/6 | 28 | Adicionar resultado de batalhas AI no log |

---

## Nota sobre Sprints Anteriores

Este é o Sprint 01 Baseline. Não há discoveries de sprints anteriores para acumular.
Discoveries implementadas em sprints futuros devem ter o campo `Implementado?` atualizado para `sim` com referência ao sprint de implementação.
