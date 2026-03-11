# Questionário Pós-Jogo — Agent-C (Ferro, Militar Ofensivo, Ferronatos)

---

## Bloco A — Interface e Intuitividade

**1. Você entendeu como construir estruturas sem tutorial?**
Sim. Fácil e rápido. Nenhum problema com a interface de construção.

**2. As informações mais importantes estavam visíveis quando precisou?**
Não. O principal problema: quero saber quantas tropas o inimigo tem ANTES de decidir atacar. A informação de tropas inimigas nos tiles do mapa é opaca — só vejo meu próprio count.

**3. Houve alguma ação que queria fazer mas não encontrou como?**
**Atacar**. Toda a minha sessão foi bloqueada por isso. Não existe ação de ataque para o jogador. A IA ataca, mas o jogador não pode. Isso é quebrado.

**4. O mapa comunicou claramente quais territórios eram seus, dos rivais e neutros?**
Sim. Excelente diferenciação visual. O bônus de recurso em cada tile é claro.

**5. O log de eventos foi útil ou foi ignorado?**
Útil para monitorar movimentos da IA. Mas eventos de combate IA vs IA deveriam ter mais detalhe (quantas tropas atacaram, resultado numérico).

---

## Bloco B — Mecânicas

**6. Você entendeu a diferença entre as 3 eras antes de elas acontecerem?**
Sabia que existiam. Mas a Era da Guerra prometeu mudanças que nunca entregou (para o jogador).

**7. O combate foi previsível? Você conseguiu antecipar resultados?**
Não houve combate para mim. Vi o código — existe um sistema de CombatPreview excelente com attack/defense ratio, modificadores, outcome estimado. Por que isso não está exposto na UI?

**8. As cartas foram úteis? Você entendeu quando e como usá-las?**
Tinha "Reforços" na mão. Sem batalha ativa, a carta ficou inútil. Não há tutorial de "use cartas antes de atacar".

**9. A IA adversária pareceu inteligente ou previsível?**
Funcionou — expandiu, construiu. Mas achei que ela joga livre de restrições (consegue atacar) enquanto o jogador não pode. Assimétrico injusto.

**10. A reputação diplomática afetou suas decisões de forma significativa?**
Não — nunca entrou em jogo para mim.

---

## Bloco C — Diversão e Adição

**11. Em qual momento você mais quis continuar jogando?**
No momento do banner da Era da Guerra. Expectativa máxima — que foi imediatamente destruída.

**12. Em qual momento você mais quis parar?**
T3 — confirmei que não há ataque. Joguei o restante sem engajamento real.

**13. A virada entre Paz e Guerra foi dramática o suficiente?**
O banner sim. A mudança de gameplay não — porque não havia mudança para o jogador.

**14. A Era da Invasão criou urgência/desespero real?**
Sim. Ver Umbral ser destruído pela Horda foi satisfatório e tenso simultaneamente.

**15. Ao terminar, você queria jogar de novo com estratégia diferente?**
Não — porque a barreira do ataque continuaria. Voltaria apenas se o ataque fosse implementado.

---

## Bloco D — Diagnóstico de Agência

**16. Sua derrota (se houve) foi culpa sua ou do sistema?**
Não derrotei. Mas não expandi — culpa do sistema, não minha.

**17. Sua vitória (se houve) foi mérito seu ou sorte?**
Sobrevivi por passividade — zero mérito estratégico.

**18. Em que momento você sentiu que aprendeu algo sobre o jogo?**
T5 — que treinar soldados sem economia de sustento leva ao colapso. Aprendizado doloroso mas válido.

**19. Se jogasse de novo, o que faria diferente?**
Fazenda no T1, Quartel no T3, soldados no T4. Sustentar antes de militarizar.

**20. O jogo te fez sentir que a próxima partida poderia ser diferente?**
Não — até que o ataque seja implementado.

---

## Bloco E — NPS

**21. Nota geral de 1 a 10:** **3**

**22. Em uma frase: o que precisa urgentemente melhorar.**
Implementar a ação de ataque de territórios para o jogador — sem isso, o jogo é uma simulação econômica passiva, não uma estratégia.

**23. Em uma frase: o que já funciona muito bem.**
O sistema de manutenção de tropas por turno cria pressão real de custo e força o jogador a planejar a sustentação do exército.
