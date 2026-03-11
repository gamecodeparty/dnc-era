# Diário de Jogo — Agent-F (Carlos, Ferronatos, Novato Instintivo)

**Resultado final:** Derrota — 5º lugar (eliminado no turno 24)
**Territórios finais:** 0 | **Recursos finais:** N/A

---

## ERA DA PAZ (Turnos 1–15)

---

**Turno 1 — Era: Paz das Cinzas**
- O que vejo: Uma tela cheia de coisas. Tem um mapa no meio, números na esquerda (100, 50, 30 — não sei o que são), um timer contando. TIMER CONTANDO. Preciso fazer alguma coisa AGORA.
- O que quero fazer: Clicar no território vermelho do inimigo e ATACAR. São meus inimigos!
- O que consegui fazer: Clicou em T2 (território do AI1). Painel lateral direito aparece com botão "Atacar". Clicou "Atacar". Mensagem: **"Expedicoes bloqueadas na Era da Paz!"** Botão aparece desativado/cinza. Confusão total.
- Frustrações: Quero atacar e o jogo não deixa. Não explica por quê de forma clara. Vi um texto pequeno "Bloqueado na Paz" mas não entendi o que isso significa para o meu jogo.
- Surpresas positivas: O visual do mapa é bonito. As cores indicam dono claramente.
- Avaliação: Primeira ação bloqueada sem explicação adequada — jogador frustrado imediatamente.

---

**Turno 2 — Era: Paz das Cinzas**
- O que vejo: Timer reiniciou. Os números mudaram levemente (agora 112 no topo, acho que é dinheiro?). Timer correndo de novo.
- O que quero fazer: Entender o que esses números são. Clico em vários botões aleatoriamente.
- O que consegui fazer: Clicou no ícone de espada (Exército). Navegou para /game/army. Viu lista de tipos de unidade mas não tinha como treinar pois não havia selecionado território. Voltou confuso.
- Frustrações: A página de Exército não tem contexto sobre qual território vou recrutar. Parece desconectada do mapa.
- Surpresas positivas: As ilustrações/ícones dos tipos de unidade são legais.
- Avaliação: Navegação desconectada — /army não liga ao território automaticamente.

---

**Turno 3 — Era: Paz das Cinzas**
- O que vejo: Ainda confuso. Clicou no meu território T0 (marcado como "Seu").
- O que quero fazer: Fazer alguma coisa com esse território.
- O que consegui fazer: Clicou "Gerenciar Território". Página carregou com opções de construção. Viu "FARM" com custo e clicou SEM LER o custo. Construiu FARM (wood:20, gold:10). Recursos agora: 124 grain, 30 wood, 20 gold.
- Frustrações: Não sei por que construí uma Farm. Já tinha uma Farm! (T0 já tinha Farm Lv1). Agora... espera, não deixou construir segunda Farm (código: `if (territory.structures.some((s) => s.type === structureType)) return false`). Então não construí uma segunda Farm — o jogo silenciosamente não fez nada? Ou construiu em T1? Confuso.
- Surpresas positivas: A página de gerenciar território tem informações organizadas.
- Avaliação: Ação sem feedback claro — não sei se a construção funcionou.

---

**Turno 4 — Era: Paz das Cinzas**
- O que vejo: Evento: "Construiu SAWMILL no território 2." Ah! Eu construí um Sawmill sem saber — cliquei em SAWMILL por acidente não FARM. Está bom? Não sei.
- O que quero fazer: Quero TROPAS. Ir pro mapa e tentar alguma coisa.
- O que consegui fazer: Voltou ao mapa. Clicou no próprio T0. "Gerenciar Território". Viu opções: nenhuma para recrutar soldados diretamente (sem Barracks). Nem sabia que precisava de Barracks.
- Frustrações: Não há forma óbvia de recrutar soldados. Não há tutorial em contexto. Não há dica do tipo "Construa Barracks para recrutar".
- Surpresas positivas: Nenhuma.
- Avaliação: Tutorial ausente — jogador completamente perdido sobre como recrutar.

---

**Turno 5 — Era: Paz das Cinzas**
- O que vejo: Visitou /game/como-jogar. Leu: "Para recrutar soldados, construa Barracks em seu território." AH! Agora faz sentido.
- O que quero fazer: Construir Barracks.
- O que consegui fazer: Voltou ao mapa. Gerenciou T0. Construiu BARRACKS (grain:30, wood:40). Recursos: 100 grain, 0 wood, 20 gold. ZERO MADEIRA.
- Frustrações: Madeira ZEROU após construir Barracks. Agora não posso construir mais nada. Parece um buraco sem saída.
- Surpresas positivas: Finalmente entendeu como recrutar! O "Como Jogar" salvou.
- Avaliação: Bloqueio de madeira — recurso raro não comunicado até ser tarde demais.

---

**Turno 6 — Era: Paz das Cinzas**
- O que vejo: Grain aumentando (+12/turno da Farm). Madeira: +10/turno (Sawmill em T1). Gold: 0 produção (sem Mine). Timer.
- O que quero fazer: Recrutar soldados agora que tenho Barracks!
- O que consegui fazer: Gerenciou T0. Tentou recrutar SOLDIER (grain:10, gold:5). Não consegue: "gold insuficiente"? Tenho apenas gold:20 mas preciso gold:5 por soldado. Posso 4 soldados! Recrutou 4 soldados. Recursos: 72 grain (acumulado), 0 wood, 0 gold.
- Frustrações: Gold zerou novamente. Dois recursos zerados simultaneamente. O jogo parece um ciclo de "chego a zero e fico parado."
- Surpresas positivas: FINALMENTE recrutei tropas! 4 soldados + 5 originais = 9 soldados.
- Avaliação: Primeiro recrutamento — satisfação, mas gold novamente zerado.

---

**Turno 7 — Era: Paz das Cinzas**
- O que vejo: 9 soldados em T0. Madeira crescendo (+10/t). Gold crescendo (+0/t — sem Mine). Graos crescendo (+12/t).
- O que quero fazer: Atacar! Quando posso atacar?
- O que consegui fazer: Clicou em inimigo. "Bloqueado na Paz." Carlos começou a ficar frustrado com esse aviso. **Quanto tempo ainda de paz?** Não há contador óbvio de "X turnos até Era da Guerra".
- Frustrações: Há um progresso "Turno 7/50" no header mas não indica quantos turnos até a Era da Guerra. Teria que saber de cor que a Era da Paz dura 15 turnos. Informação não está na UI.
- Surpresas positivas: Nenhuma.
- Avaliação: Sem indicador de progresso para Era da Guerra — jogador impaciente não sabe quanto esperar.

---

**Turnos 8–15 — Era da Paz (resumo)**
- Carlos ficou preso num loop: graos acumulam → recruta soldados → gold zera → espera → repete.
- T10: Tentou explorar mas não viu o ícone de bússola claramente. Clicou em território sem bússola. Selecionou o território e não entendeu o que fazer.
- T11: Viu um ícone de bússola pulsando em T5. Clicou! Modal de exploração abriu. Enviou 5 soldados para "Acampamento de Bandidos" (dif:3, min:8). **ERRO: enviou menos do que o mínimo de 8.** Mensagem: "Mínimo de 8 unidades necessárias para este local!" Confuso — não leu o "min:8" antes de tentar.
- T12: Tentou de novo com todos os 9 soldados. Sucesso no envio! Ficou com 0 soldados em casa.
- T13: AI1 não atacou (Era da Paz — correto). Mas Carlos ficou nervoso.
- T14: Exploração retornou! Resultado: "failure" (poder insuficiente vs dificuldade 3). Zero recursos. "Os bandidos estavam preparados! Uma emboscada devastou suas tropas." **Perdeu 6 de 9 soldados!** Restaram 3.
- T15: **Era da Guerra começa.** Carlos tem 3 soldados, T0 e T1 (T1 sem nada útil), e está mal preparado.
  Carta recebida: "Colheita Abundante". Carlos não usou — não entendeu como usar cartas.

---

## ERA DA GUERRA (Turnos 16–24) — Eliminação

---

**Turno 16 — Era: Guerra**
- O que vejo: "Ataque agora!" Carlos ficou animado.
- O que quero fazer: ATACAR! Imediatamente.
- O que consegui fazer: Clicou em T2 (AI1). "Atacar". Modal de expedição. Enviou 3 soldados (todos que tinha). Expedição enviada para T2.
- Frustrações: Enviou TODOS os soldados. T0 ficou sem defesa.
- Avaliação: Ataque impulsivo com todas as tropas — T0 desguarnecido.

---

**Turno 17 — Era: Guerra**
- O que vejo: AI2 atacou T1! Perdeu T1 (estava vazio mesmo). Expedição de Carlos viajando para T2.
- Resultado no T17: DERROTA. AI1 (DEFENDER) tem Wall e muitos soldados. Carlos perdeu os 3 soldados. "DERROTA! Sobreviventes em fuga." Zero sobreviventes.
- Agora: sem soldados, sem T1, apenas T0 com Wall mas sem tropas.
- Frustrações: Sem soldados. Sem ouro para recrutar. Sem madeira. O fim está próximo.
- Avaliação: Derrota total — a estratégia sem planejamento levou ao colapso.

---

**Turno 18–23 — Era: Guerra (derrocada)**
- Conseguiu recrutar 2-3 soldados por turno com o pouco de ouro que acumulava.
- T20: AI3 atacou T0. Wall segurou (por enquanto).
- T21: AI2 atacou T0. Wall segurou de novo.
- T22: AI3 atacou T0 de novo com força maior. Wall cedeu finalmente. **T0 perdido.**
- Sem territórios. Eliminado no turno 22-24.
- Evento: "Cla do Jogador foi eliminado! Todos os territórios perdidos."

---

## Resumo Geral

**Pontos altos:**
- Visual do jogo é imediatamente atraente — ficou curioso para jogar
- Transição de era (feedback visual) foi impactante mesmo para novato
- Wall salvou o território por vários turnos mesmo sem estratégia

**Pontos baixos:**
- **CRÍTICO: Zero tutorial contextual.** "Como Jogar" está num link separado, não em tooltips na tela
- **CRÍTICO: Sem indicador de progresso para Era da Guerra** — novato não sabe quanto falta
- Feedback de falha no recrutar é ausente — tenta recrutar com gold:0 e nada acontece silenciosamente
- Mínimo de unidades para exploração não é visível antes de clicar no site
- Primeira ação (atacar) é bloqueada sem explicação satisfatória
- O jogo pune duramente o aprendizado por tentativa e erro — novato é eliminado rápido demais
