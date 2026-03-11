# Questionário Pós-Jogo — CAIUS (Agent-C)
**Facção:** Ferronatos | **Resultado:** 1º lugar (Campeão) | **Score:** ~1750

---

## Bloco A — Interface e Intuitividade

**1. Você entendeu como construir estruturas sem tutorial?**
Completamente. Sistemas de construção de strategy games têm sempre a mesma lógica: clica no território, seleciona estrutura, paga recursos. O único atrito foi a inconsistência de custos entre os dois arquivos de constantes do código — se você for developer e ler o código, encontrará valores diferentes em `balance.ts` vs `gameStore.ts`. Para o jogador via UI, assumo que um único valor é mostrado, mas precisa ser verificado.

**2. As informações mais importantes estavam visíveis quando precisou?**
Para o jogo militar: sim. O CombatPreview com ratio é excelente e estava visível antes de confirmar ataques. A visualização de "ataque chegando" foi crucial. O que faltou: um **painel de poder militar comparativo** mostrando minha força total vs. cada rival. Em AoE2 isso seria um gráfico de unidades ao longo do tempo.

**3. Houve alguma ação que queria fazer mas não encontrou como?**
Queria "retornar expedição" antes de chegarem ao destino. Não encontrei cancel de expedição. Também queria um botão "selecionar todas as unidades em T0 e redirecionar para T3" em vez de criar nova expedição manualmente.

**4. O mapa comunicou claramente quais territórios eram seus, dos rivais e neutros?**
Sim, cores funcionam. Mas a gridagem 3x4 com adjacências não fica visualmente evidente — é preciso "sentir" quais territórios são adjacentes. Linhas de conexão entre territórios adjacentes ajudariam muito.

**5. O log de eventos foi útil ou foi ignorado?**
Útil especificamente para rastrear atividade de AI3. Quando vi "AI3 atacou AI4" entendi que AI3 estava expandindo pelo leste — ajustei minha rota de expansão para norte/oeste. O log tem valor estratégico se você souber usá-lo.

---

## Bloco B — Mecânicas

**6. Você entendeu a diferença entre as 3 eras antes de elas acontecerem?**
Sim. A sequência Paz→Guerra→Invasão é um arco narrativo e mecânico claro. O que não estava claro: **os turnos exatos de transição**. Precisei contar manualmente "turno 9 = guerra, turno 19 = invasão". Deveria ter um contador de era no HUD.

**7. O combate foi previsível? Você conseguiu antecipar resultados?**
Muito bem calibrado. O sistema de ratio (atk/def) com thresholds claros (1.0 vitória simples, 1.5 vitória decisiva) é transparente e justo. O bônus Ferronatos +20% é matematicamente significativo e se sentiu na jogabilidade.

**8. As cartas foram úteis? Você entendeu quando e como usá-las?**
Não usei cartas (não construí Taverna — prioridade militar). Isso é uma lacuna estratégica que reconheço. As cartas de combate (Reforços, Muralhas Improvisadas) seriam extremamente poderosas para o estilo ofensivo.

**9. A IA adversária pareceu inteligente ou previsível?**
AI3 (Conquistador) foi meu oponente mais difícil e pareceu genuinamente competitivo — expandiu proativamente, contra-atacou imediatamente quando tomei T10, e coordenou ataques consistentes. As personalidades de IA funcionaram.

**10. A reputação diplomática afetou suas decisões de forma significativa?**
Não muito — joguei como Conquistador, diplomacia é fraqueza. Mas reconheço que ignorar alianças me deixou vulnerável a ataques coordenados de AI2 e AI3 simultaneamente.

---

## Bloco C — Diversão e Adição

**11. Em qual momento você mais quis continuar jogando?**
Quando a rivalidade com AI3 se estabeleceu no turno 12. Dois clãs Ferronatos colidindo no meio do mapa, empate em 4 territórios cada — isso foi drama genuíno.

**12. Em qual momento você mais quis parar?**
Nunca quis parar. Mas o ciclo de "ataque → esperar resultado → recrutar → próximo ataque" pode ficar repetitivo nos turnos 13-18 sem novas mecânicas aparecendo.

**13. A virada entre Paz e Guerra foi dramática o suficiente?**
Sim, especialmente porque agi primeiro — capturar AI1's last territory no turno 9 foi uma jogada cinética que definiu o ritmo da minha Era da Guerra.

**14. A Era da Invasão criou urgência/desespero real?**
Sim, mas de forma interessante: a urgência não foi "eu vou morrer", foi "preciso me posicionar estrategicamente em relação à Horda". Usar a Horda como aliada involuntária para enfraquecer AI3 foi minha jogada favorita de todo o jogo.

**15. Ao terminar, você queria jogar de novo com estratégia diferente?**
Sim — quero testar com Estábulo + Cavaleiros a partir do turno 8. Cavaleiros com Ferronatos +20% seriam absolutamente devastadores.

---

## Bloco D — Diagnóstico de Agência

**16. Sua derrota (se houve) foi culpa sua ou do sistema?**
Perdi T10 e T6 para AI3 e Horda respectivamente. Ambas foram derrotas justificadas — ou subestimei a força inimiga ou me expus desnecessariamente.

**17. Sua vitória (se houve) foi mérito seu ou sorte?**
Mérito: estratégia militar agressiva com bônus Ferronatos foi a abordagem certa para o meta do jogo. Sorte: AI3 sofreu Horda waves pesadas que me deram janela de oportunidade.

**18. Em que momento você sentiu que aprendeu algo sobre o jogo?**
Turno 20: percebi que posso usar a Horda como instrumento estratégico. Atacar imediatamente após um wave de Horda é uma mecânica emergente poderosa que o jogo nunca explica explicitamente — é descoberta pelo jogador.

**19. Se jogasse de novo, o que faria diferente?**
Construiria Taverna no turno 5 para ter cartas de combate disponíveis na Era da Guerra. E investiria em Estábulo Nv1 antes do turno 15.

**20. O jogo te fez sentir que a próxima partida poderia ser diferente?**
Definitivamente. Cada jogo com personalidades de IA diferentes vai criar narrativas únicas.

---

## Bloco E — NPS

**21. Nota geral de 1 a 10:** 8/10

**22. Em uma frase: o que precisa urgentemente melhorar.**
Linhas de adjacência visíveis no mapa para comunicar claramente quais territórios se conectam — é uma informação estratégica fundamental que deve estar sempre visível.

**23. Em uma frase: o que já funciona muito bem.**
O sistema de personalidades de IA (CONQUEROR, DEFENDER, OPPORTUNIST, MERCHANT) cria rivais com comportamentos distintos e previsíveis que o jogador pode aprender a explorar.
