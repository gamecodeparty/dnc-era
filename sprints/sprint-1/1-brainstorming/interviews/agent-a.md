# Questionário Pós-Jogo — Agent-A (Marcos, Verdaneos, Econômico Agressivo)

**Resultado:** 1º lugar, 465 pontos. Vitória.

---

## Bloco A — Interface e Intuitividade

**1. Você entendeu como construir estruturas sem tutorial?**
Sim, mas com atrito. A página de território mostra claramente as opções e custos. O problema não é entender — é a navegação fragmentada: mapa → território → construção → voltar → mapa. Cada ação exige 3-4 cliques e o timer não para.

**2. As informações mais importantes estavam visíveis quando precisou?**
Parcialmente. Minha produção de recursos está no sidebar, mas a produção POR TURNO estava com cálculo manual necessário (a UI mostra "+12/turno" para graos mas calculei madeira manualmente). Recursos dos inimigos: COMPLETAMENTE INVISÍVEIS.

**3. Houve alguma ação que queria fazer mas não encontrou como?**
Sim: ver quantas tropas o inimigo tem antes de atacar. Fui às cegas em todos os ataques. Também queria uma visão de "planejamento de slots" antes de construir, mas isso não existe.

**4. O mapa comunicou claramente quais territórios eram seus, dos rivais e neutros?**
Sim. As cores são muito claras: meu (dourado/primário), inimigo (vermelho/acento), neutro (cinza). A legenda na parte de baixo confirma. Excelente clareza visual.

**5. O log de eventos foi útil ou foi ignorado?**
Útil mas incompleto. Mostrou conquistas e derrotas minhas, mas não mostrou batalhas entre AIs. Fiquei sabendo que AI3 avançou apenas pelo mapa, não pelos eventos. O log só rastreia eventos do jogador.

---

## Bloco B — Mecânicas

**6. Você entendeu a diferença entre as 3 eras antes de elas acontecerem?**
Sabia porque li a documentação antes. Na interface, o painel "Objetivo" descreve a era atual mas não avisa sobre as próximas. Não há uma linha do tempo visual das 3 eras.

**7. O combate foi previsível? Você conseguiu antecipar resultados?**
Não. Zero previsibilidade. Cada ataque é caixa preta. A fórmula existe no código mas é completamente invisível ao jogador. Nunca soube se ia ganhar ou perder antes de atacar.

**8. As cartas foram úteis? Você entendeu quando e como usá-las?**
Úteis, mas fluxo quebrado. Usar uma carta exige: navegar para /game/cards → ativar → voltar → atacar. Não há integração da carta com o modal de combate. A Colheita Abundante foi muito útil na Era da Invasão.

**9. A IA adversária pareceu inteligente ou previsível?**
Semi-inteligente. AI3 (CONQUEROR) claramente expandiu agressivamente. AI4 (MERCHANT) foi surpresa atacante. Mas os padrões são visíveis depois de 2-3 ataques. Falta variedade de comportamento.

**10. A reputação diplomática afetou suas decisões de forma significativa?**
Não, pois nunca vi minha reputação explicitamente. Sei que existe diplomaticamente (TRUSTED/NEUTRAL/HOSTILE) mas não há barra de reputação ou incentivo claro para manter relações.

---

## Bloco C — Diversão e Adição

**11. Em qual momento você mais quis continuar jogando?**
Quando conquistei T2 pela primeira vez no turno 18. O evento "VITÓRIA! Território conquistado! +saque!" com os recursos listados foi satisfatório demais. Queria imediatamente conquistar mais.

**12. Em qual momento você mais quis parar?**
Turnos 7-8 quando a primeira exploração retornou com zero recursos e sem explicação. Foi desmotivante não saber se havia bug ou falha.

**13. A virada entre Paz e Guerra foi dramática o suficiente?**
SIM. Esta foi a melhor parte do jogo. O evento, a mudança de background, o texto "O Pacto das Cinzas foi rompido!" — perfeito. Muito mais impactante do que esperava.

**14. A Era da Invasão criou urgência/desespero real?**
Sim, mas tardiamente. Nas primeiras duas ondas foi fácil. A urgência real só chegou quando a Horda força 200 destruiu T0 no turno 48. Dois turnos de desespero antes de acabar o jogo.

**15. Ao terminar, você queria jogar de novo com estratégia diferente?**
Sim, definitivamente. Quero tentar sem Wall e ver o que acontece. Quero testar diferentes fações. O loop é bom o suficiente para replay.

---

## Bloco D — Diagnóstico de Agência

**16. Sua derrota (se houve) foi culpa sua ou do sistema?**
Derrotas parciais foram minha culpa (ataque impulsivo ao T7 do AI3 sem saber que tinham Knights). Mas também do sistema — não havia como saber sobre os Knights sem a carta Informante.

**17. Sua vitória (se houve) foi mérito seu ou sorte?**
70% mérito, 30% sorte. Mérito: planejamento econômico, Wall estratégica, exploração otimizada. Sorte: a Horda priorizou AI3 antes de mim na Era da Invasão.

**18. Em que momento você sentiu que aprendeu algo sobre o jogo?**
Turno 24, quando Wall absorveu o ataque da AI3. "Ah, Wall não é opcional — é obrigatória!" Aprendi que defesa passiva (Wall) é melhor custo-benefício que defesa ativa (tropas) para segurar territórios.

**19. Se jogasse de novo, o que faria diferente?**
1. Construir Mine no turno 1 (antes de qualquer coisa) para ter ouro fluxo cedo.
2. Não mandar TODAS as tropas em expedição — manter 5 em casa sempre.
3. Construir Stable mais cedo para Knights — são gamechangers.

**20. O jogo te fez sentir que a próxima partida poderia ser diferente?**
Sim. Definitivamente.

---

## Bloco E — NPS

**21. Nota geral de 1 a 10:** 7

**22. Em uma frase: o que precisa urgentemente melhorar.**
Preview de combate antes de atacar — combate às cegas é frustrante e arbitrário.

**23. Em uma frase: o que já funciona muito bem.**
A transição de era (visual + evento + carta) é um momento de design excelente que faz o jogo parecer vivo.
