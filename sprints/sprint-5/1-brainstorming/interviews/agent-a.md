# Questionário Pós-Jogo — ARIA (Agent-A)
**Facção:** Verdâneos | **Resultado:** 2º lugar | **Score:** ~1600

---

## Bloco A — Interface e Intuitividade

**1. Você entendeu como construir estruturas sem tutorial?**
Sim, mas com atrito. O clique no território → botão Construir → lista de estruturas é intuitivo. O problema é o que vem depois: os custos são mostrados mas não há previsão de impacto (quanto vou produzir? qual é o retorno?). Entendi o "como", mas não o "por quê" de cada estrutura.

**2. As informações mais importantes estavam visíveis quando precisou?**
Parcialmente. Recursos totais (canto da tela) estão sempre visíveis — ótimo. Mas produção POR TURNO não está persistente. Precisei entrar em cada território para ver o que cada estrutura produz. Um painel de "produção total por turno" no HUD principal seria essencial.

**3. Houve alguma ação que queria fazer mas não encontrou como?**
Sim: queria ver minha **distribuição de unidades por todos os territórios** em um único painel. Tinha que entrar em cada território individualmente para ver quantas unidades estavam lá. Quando lancei ataques, não sabia exatamente quais territórios estavam expostos.

**4. O mapa comunicou claramente quais territórios eram seus, dos rivais e neutros?**
Razoavelmente bem. As cores diferenciam os donos. Mas não fica claro se um território tem estruturas ou unidades sem clicar nele. Um ícone de "tem estrutura" e "tem unidades" no mapa melhoraria muito a legibilidade.

**5. O log de eventos foi útil ou foi ignorado?**
Parcialmente útil. Os eventos estão lá, mas passam rápido. Preciso de histórico persistente com filtros (mostrar apenas combates, apenas eventos de era, etc.).

---

## Bloco B — Mecânicas

**6. Você entendeu a diferença entre as 3 eras antes de elas acontecerem?**
Entendi conceitualmente (Paz/Guerra/Invasão) mas não as implicações práticas. Sabia que a guerra começaria no turno 9, mas não sabia que as AIs tornariam-se imediatamente mais agressivas. A transição deveria comunicar "regras mudaram: AIs agora atacam livremente".

**7. O combate foi previsível? Você conseguiu antecipar resultados?**
Sim, depois de entender o sistema de ratio (>1.5 = decisivo). O CombatPreview que mostra ratio é excelente. A Fog of War com ±20% no estimate de defesa inimiga é uma boa feature. No geral, o combate tem previsibilidade suficiente para planejamento.

**8. As cartas foram úteis? Você entendeu quando e como usá-las?**
Uma carta usada (Colheita Farta no turno 23) com resultado positivo. Mas guardei a carta por ~12 turnos sem perceber que tinha. A notificação "você recebeu uma carta" não foi suficientemente saliente. As cartas existem mas ficam esquecidas.

**9. A IA adversária pareceu inteligente ou previsível?**
AI3 (Conquistador) pareceu genuinamente estratégica — expandiu, atacou oportunisticamente e pressionou de forma consistente. AI2 (Oportunista) também foi agressiva. AI4 (Mercador) pareceu passiva. As personalidades se materializaram no comportamento.

**10. A reputação diplomática afetou suas decisões de forma significativa?**
Minimamente. Sabia que AI2 era HOSTIL mas não mudou muito minha estratégia — simplesmente me preparei para ser atacada. A diplomacia parece informacional mas não acionável o suficiente.

---

## Bloco C — Diversão e Adição

**11. Em qual momento você mais quis continuar jogando?**
Quando reconquistei T0 no turno 21, depois que AI3 havia me tomado. A narrativa de "perda → recuperação" foi genuinamente satisfatória e me fez querer ver o final.

**12. Em qual momento você mais quis parar?**
Turnos 5-7, quando estava esperando madeira acumular para construir o Quartel. Turnos de acúmulo passivo sem ação são a principal ameaça ao engajamento.

**13. A virada entre Paz e Guerra foi dramática o suficiente?**
Sim — o banner de "ERA DA GUERRA" e o comportamento imediatamente agressivo das AIs criaram ruptura clara. Poderia ser ainda mais dramático com música e animação de transição mais elaborada.

**14. A Era da Invasão criou urgência/desespero real?**
Sim. A Horda criando instabilidade no líder foi muito eficaz. O turno em que a Horda me atacou por ter 4 territórios foi genuinamente tenso.

**15. Ao terminar, você queria jogar de novo com estratégia diferente?**
Sim. Quero testar com Quartel mais cedo (turno 3) e Muralha após a primeira guerra. A experiência me ensinou o que fazer diferente.

---

## Bloco D — Diagnóstico de Agência

**16. Sua derrota (se houve) foi culpa sua ou do sistema?**
Minha derrota parcial (perder T0 para AI3 no turno 16) foi culpa minha — deixei T0 desprotegido ao atacar T3. O sistema foi justo.

**17. Sua vitória (se houve) foi mérito seu ou sorte?**
Mérito: a estratégia econômica acumulou recursos que sustentaram o mid/lategame. Sorte: AI3 também perdeu territórios para a Horda, facilitando minha expansão final.

**18. Em que momento você sentiu que aprendeu algo sobre o jogo?**
Turno 11, quando descobri que meus territórios são geograficamente isolados dos territórios neutros. Aprender a geometria do mapa mudou completamente como penso sobre expansão.

**19. Se jogasse de novo, o que faria diferente?**
Construiria Quartel no turno 3-4, aceitando redução na produção econômica. Manteria pelo menos 3 soldados em cada território durante expedições ofensivas. Construiria Taverna mais cedo para gerar cartas.

**20. O jogo te fez sentir que a próxima partida poderia ser diferente?**
Definitivamente sim. Cada era tem pontos de decisão claros onde escolhas diferentes levam a resultados diferentes.

---

## Bloco E — NPS

**21. Nota geral de 1 a 10:** 7/10

**22. Em uma frase: o que precisa urgentemente melhorar.**
Falta um painel de "produção por turno + distribuição de unidades por território" sempre visível no HUD principal.

**23. Em uma frase: o que já funciona muito bem.**
O sistema de CombatPreview com ratio e fog of war cria tensão e estratégia genuínas sem ser punitivo demais.
