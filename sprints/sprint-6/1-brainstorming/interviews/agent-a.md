# Questionário Pós-Jogo — ARIA (Agent-A)
**Resultado:** 1º lugar | 4 territórios | ~1810 pontos | Verdâneos

---

## Bloco A — Interface e Intuitividade

**1. Você entendeu como construir estruturas sem tutorial?**
Sim, totalmente. O menu de construção é claro — botões com nome, custo e efeito visíveis. A novidade do sprint que melhorou isso foi a exibição de produção por turno logo após a construção. Antes, construía no escuro e esperava ver se funcionou. Agora sei imediatamente.

**2. As informações mais importantes estavam visíveis quando precisou?**
Em geral sim. O display de produção/turno no ResourcePanel foi a mudança mais impactante. Em S5 precisava calcular mentalmente — agora é matemática à vista. O sistema de escala de ameaça visual também estava presente quando precisei antecipar ataques.

**3. Houve alguma ação que queria fazer mas não encontrou como?**
Sim: redistribuir tropas entre múltiplos territórios de forma eficiente. Com 4 territórios, cada realocação de tropas exige navegar até o território → abrir expedição → selecionar reforço → confirmar. Para mover tropas por 4 territórios foram 12+ cliques. Um botão "Distribuir Igualmente" ou drag-and-drop no mapa seria muito bem-vindo.

**4. O mapa comunicou claramente quais territórios eram seus, dos rivais e neutros?**
Sim. As linhas de conexão entre territórios adjacentes são excelentes — nunca mais precisei decorar o grid. As cores de propriedade são claras. Os símbolos de ameaça por fog of war fazem sentido visualmente.

**5. O log de eventos foi útil ou foi ignorado?**
Consultei ocasionalmente — principalmente para ver resultados de batalhas de AI vs AI. Mas ainda falta o resultado de batalhas entre AIs (D-005 — não implementado). Vejo "AI1 atacou AI2" sem saber o resultado.

---

## Bloco B — Mecânicas

**6. Você entendeu a diferença entre as 3 eras antes de elas acontecerem?**
Vagamente. Sabia que Era da Guerra = mais ataques de AI. Mas o banner de transição não explicou mecanicamente o que mudou. D-045 persiste — a animação é bonita mas não informativa.

**7. O combate foi previsível? Você conseguiu antecipar resultados?**
Muito melhor que antes! O CombatPreview com o hint "1.5×" e o texto explicativo ("Vitória Decisiva — conquista garantida") transformou o combate de apostas cegas em decisões calculadas. O único ponto de incerteza é a defesa inimiga quando há fog of war — a estimativa "2-5 unidades" é vaga demais para planejamento preciso.

**8. As cartas foram úteis? Você entendeu quando e como usá-las?**
Usei "Colheita Farta" no T23 — mas apenas porque me lembrei que havia recebido uma carta. Não teria descoberto a carta na hora certa sem um lembrete proativo. O sistema de cartas ainda está muito passivo — recebi no T~11 e só usei no T23. Perdi 12 turnos de uso.

**9. A IA adversária pareceu inteligente ou previsível?**
Mais inteligente que antes — AI2 usou espiões antes de atacar, o que foi uma surpresa. AI1 atacou sistematicamente o território mais fraco de cada oponente. Há padrão mas não é óbvio imediatamente.

**10. A reputação diplomática afetou suas decisões de forma significativa?**
Não tentei diplomacia. Não sei se funciona e o histórico dos sprints anteriores indica que é quebrado. Ignorei completamente.

---

## Bloco C — Diversão e Adição

**11. Em qual momento você mais quis continuar jogando?**
Quando o sistema de ameaça identificou AI3 se preparando para atacar T6 e eu realoquei tropas a tempo para repelir o ataque. Sensação de ter "vencido" uma jogada estratégica que antes seria invisível.

**12. Em qual momento você mais quis parar?**
T21 quando a Horda atacou T0 — que era o único território onde eu NÃO havia concentrado tropas. Apostar em T6 sem saber que a Horda atacaria T0 foi frustrante ao ponto de raiva.

**13. A virada entre Paz e Guerra foi dramática o suficiente?**
O banner é bonito mas a transição mecânica é invisível. "Algo mudou mas não sei o quê."

**14. A Era da Invasão criou urgência/desespero real?**
Sim! A animação é genuinamente tensa. O counter da Horda funcionou para criar antecipação. O ataque perdendo T0 foi dramaticamente frustrante — pain convertido em engagement.

**15. Ao terminar, você queria jogar de novo com estratégia diferente?**
Sim. Quero testar uma build mais focada em Muralhas e Cavaleiros. A sensação de "aprendi alguma coisa" está presente.

---

## Bloco D — Diagnóstico de Agência

**16. Sua derrota (se houve) foi culpa sua ou do sistema?**
Não perdi. Mas perder T0 para a Horda foi claramente culpa do sistema (D-044 — sem localização de alvo). Concentrei forças onde pareceu lógico e a Horda atacou o lugar oposto.

**17. Sua vitória foi mérito seu ou sorte?**
70% mérito, 30% sorte. O sistema de ameaça me deu vantagem informacional real. Mas sobreviver à Horda dependeu de ter recursos suficientes por sorte de boa construção.

**18. Em que momento você sentiu que aprendeu algo sobre o jogo?**
T7 — quando o CombatPreview com threshold 1.5x me ensinou que força de ataque precisa superar 1.5× a defesa para conquista garantida. Agora sei planejar ataques precisamente.

**19. Se jogasse de novo, o que faria diferente?**
Construiria Quartel no T3 (antes construi em T5) para ter força de ataque mais cedo. E construiria Muralha em T0 no início, não só em T6.

**20. O jogo te fez sentir que a próxima partida poderia ser diferente?**
Sim. Há múltiplos caminhos válidos que ainda não explorei. Quero testar Cavaleiros com Ferronatos.

---

## Bloco E — NPS

**21. Nota geral de 1 a 10:**
**8/10**

**22. Em uma frase: o que precisa urgentemente melhorar.**
A Horda precisa indicar qual território vai atacar — apostar na defesa sem informação é pior que não ter defesa nenhuma.

**23. Em uma frase: o que já funciona muito bem.**
O display de produção por turno com breakdown por estrutura é a melhor adição de toda a série de sprints.
