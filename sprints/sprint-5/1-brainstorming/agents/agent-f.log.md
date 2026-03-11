# Log de Jogo — FIO (Agent-F)
**Facção:** Ferronatos (escolha: "parece mais badass") | **Estratégia:** Instintiva (Novato)
**Modo:** Quick (Era1=8t, Era2=10t, Era3=7t) | **Total:** 25 turnos

> **NOTA:** Simulação baseada em análise de código. Servidor não disponível no momento do playtesting.

---

**Turno 1 — Era da Paz**

- O que vejo: Uma tela com MUITO texto. Vejo um mapa com hexágonos coloridos... espera, não são hexágonos, são quadrados? Tenho dois territorios coloridos diferente dos outros. Tem números por todo lado. Tem icons de espada, escudo, trigo, madeira, moeda. Estou CONFUSO.
- O que quero fazer: Cliquei em coisas aleatórias para entender o que é o quê. Achei um botão "Construir". Tem uma lista: Fazenda, Serraria, Mina, Quartel, Estábulo, Muralha, Taverna, Guilda das Sombras. Não sei o que escolher.
- O que consegui fazer: Cliquei em "Quartel" porque SOLDADOS são importantes. Construí Quartel Nv1 em T0. Custo: grain:30, wood:40. Ficou: 70g, 10w, 30o.
- Frustrações: Não entendi o que são os números no canto da tela (70, 10, 30). Só depois percebi que são Grão, Madeira, Ouro. Os ÍCONES são pequenos e não tem label de texto ao lado. Não deveria ser assim — o que é o ícone de folha verde? Grão? Madeira? Não sei.
- Surpresas positivas: O Quartel foi construído! Parece que fiz algo certo.
- Avaliação: Primeira ação sem entender o que estava fazendo.

---

**Turno 2 — Era da Paz**

- O que vejo: Ainda confuso. Vejo que tenho 70g, 10w, 30o. Quartel está no meu território.
- O que quero fazer: Recrutar soldados! Isso é óbvio.
- O que consegui fazer: Fui na tela de Exército. Vi a opção de recrutar Soldados. Custo: grain:10, gold:5 cada. Recrutei 5 soldados (custo: grain:50, gold:25). Total soldados: 10. Recursos: 20g, 10w, 5o.
- Frustrações: Achei o painel de recrutamento mas não entendi onde esses soldados estão agora. Eles aparecem no território? No mapa? Tem que ir em "Ver território" para ver eles? Por que não aparecem diretamente no mapa?
- Surpresas positivas: Recrutei soldados! Tenho 10 soldados. Isso parece muito.
- Avaliação: Recrutamento funcionou mas visibilidade de unidades no mapa é confusa.

---

**Turno 3 — Era da Paz**

- O que vejo: Tenho 10 soldados. Quero atacar alguém. Vejo territorios coloridos que não são meus. Um deles tem a mesma cor de "inimigo" no minimap.
- O que quero fazer: ATACAR ESSE TERRITÓRIO. Cliquei no território T4 (AI2 — não sabia que era AI2). Não tem botão de "atacar" óbvio...
- O que consegui fazer: Encontrei o botão de Expedição. Selecionei "Tipo: Ataque" e "Destino: T4". Enviei todos os 10 soldados para T4.
- Frustrações: T4 não é adjacente a nenhum dos meus territórios! T0 é adjacente a T1 e T3. T4 é 2 casas de distância. O jogo deixou eu selecionar mas vai levar mais turnos. Quanto tempo? Não estava claro antes de confirmar. A mensagem de confirmação apareceu COM o tempo de viagem mas depois da confirmação já era tarde.
- Surpresas positivas: Consegui lançar um ataque! É o que queria fazer.
- Avaliação: Confirmação de expedição deveria mostrar tempo de viagem ANTES do botão confirmar.

---

**Turno 4 — Era da Paz**

- O que vejo: Meus 10 soldados estão "em viagem". T0 está COMPLETAMENTE DESPROTEGIDO. Tenho também T1 vazio. Recursos: 20g, 10w, 5o — MUITO BAIXO.
- O que quero fazer: Esperar os soldados chegarem.
- O que consegui fazer: Não fiz nada. Recursos muito baixos para qualquer construção.
- Frustrações: T0 está completamente aberto. Se alguém atacar agora estou ferrado. E não tenho como cancelar a expedição dos soldados? PRECISO poder cancelar missões em andamento.
- Surpresas positivas: Nenhuma. Ansiedade total.
- Avaliação: Mandar TODOS os soldados para longe deixando o território base vazio foi um erro GIGANTE que o jogo não me preveniu.

---

**Turno 5 — Era da Paz**

- O que vejo: Meus soldados CHEGARAM em T4. Ataque aconteceu. RESULTADO: VITÓRIA! Mas... perdei 4 soldados. Saqueei alguns recursos de AI2.
- O que quero fazer: Voltar com os soldados para casa? Eles ficam em T4 agora? T4 virou MEU?
- O que consegui fazer: T4 não virou meu — T4 é adjacente a T5 e T1 (ah, T1 é MEU!). Espera, conquistei T4? Verificando: não, não conquistei. O ataque foi bem-sucedido mas não necessariamente conquista o território? Ou conquista?
- Frustrações: **CONFUSÃO TOTAL sobre o resultado de batalha.** Venci mas não sei o que aconteceu com o território. O relatório de combate mostrou resultado brevemente e desapareceu. Não consigo acessar o histórico de batalha facilmente. Onde está o log de eventos que devia mostrar isso?
- Surpresas positivas: Sobrevivi ao ataque com 6 soldados restantes.
- Avaliação: O resultado pós-combate precisa ser mais persistente e claro.

---

**Turno 6 — Era da Paz**

- O que vejo: Meus soldados estão em T4 ou voltaram? Não sei. O mapa mostra T4 como ainda de AI2. Então não conquistei nada? Gastei 4 soldados para... nada?
- O que quero fazer: Nada. Estou confuso e desmotivado.
- O que consegui fazer: Descobri que o ataque foi um ATAQUE, não uma CONQUISTA. Ataques sem resultado decisivo (ratio < 1.5) não conquistam território — apenas causam perdas. Precisava de ratio > 1.0 para vitória simples e > 1.5 para conquista? Não estava claro.
- Frustrações: O jogo não explicou que ataques com força insuficiente não conquistam território. Achei que "atacar = tentar conquistar". Se não conquisto com ataque bem-sucedido, qual é o ponto do ataque?
- Surpresas positivas: Nenhuma. Descoberta frustrante.
- Avaliação: A distinção entre "vitória de combate" e "conquista de território" é confusa e precisa de explicação clara.

---

**Turno 7 — Era da Paz**

- O que vejo: 6 soldados em T4 (território de AI2). Eles ficaram lá? Estão em expedição de retorno? Tenho T0 e T1 sem defesa.
- O que quero fazer: Mandar os soldados de volta.
- O que consegui fazer: Selecionei os soldados em T4 e enviei de volta para T0 (tipo "RETURN"). Tempo de retorno: mais 2 turnos (distância T4→T0 via rota).
- Frustrações: Meus soldados ficaram presos no território inimigo por 3 turnos. O jogo não me disse que isso aconteceria. Podiam ter sido atacados enquanto "visitavam" um território inimigo?
- Surpresas positivas: A mecânica de "retornar expedição" existe.
- Avaliação: Soldados presos em território inimigo é uma mecânica confusa para novatos.

---

**Turno 8 — Era da Paz (ÚLTIMO)**

- O que vejo: ERA DA PAZ acabou! Soldados ainda em retorno. T0 e T1 desprotegidos. AI2 (HOSTIL) vai me destruir.
- O que quero fazer: Nada. Os soldados chegam no próximo turno.
- O que consegui fazer: Construí... uma Fazenda em T1 com os grãos que tinha (custo: wood:20, gold:10). Tenho 30w, 20o. Construí.
- Frustrações: Passei a Era da Paz inteira sem construir nada útil para defesa. Quartel→Ataque→Confusão→Tentei recuperar. Nenhuma estrutura econômica real.
- Surpresas positivas: Ainda estou vivo com 2 territórios.
- Avaliação: Era da Paz foi um desastre pela falta de orientação.

---

**Turno 9 — Era da Guerra**

- O que vejo: ERA DA GUERRA. Log diz "A era da paz terminou". Soldados chegaram de volta (6 em T0). AI2 (HOSTIL) atacou T1 IMEDIATAMENTE.
- O que quero fazer: Defender T1.
- O que consegui fazer: T1 estava desprotegido. Resultado: PERDI T1. Sem unidades = sem defesa.
- Frustrações: AI2 atacou exatamente quando meus soldados estavam voltando. Parece injusto mas é timing que eu controlava.
- Surpresas positivas: T0 ainda tem meus 6 soldados.
- Avaliação: Perda inevitável dado meu posicionamento.

---

**Turno 10 — Era da Guerra**

- O que vejo: 1 território (T0). 6 soldados. AI2 com 3 territórios.
- O que quero fazer: Recrutar mais. Tenho Quartel em T0.
- O que consegui fazer: Recrutei 4 soldados (grain:40, gold:20). 10 soldados totais. Recursos: ~30g, 30w, 10o.
- Frustrações: Não entendo por que tenho mais grãos agora. A Fazenda T1 que construí... ainda está produzindo mesmo eu perdendo T1? Provavelmente não — não faz sentido. Grãos devem ser de produção anterior acumulada.
- Surpresas positivas: 10 soldados! Posso tentar reconquistar T1.
- Avaliação: Determinação renovada.

---

**Turno 11 — Era da Guerra**

- O que vejo: Lancei ataque em T1 (ex-meu, agora de AI2) com 8 soldados.
- O que quero fazer: Reconquistar T1.
- O que consegui fazer: AI2 tinha 4 soldados em T1 (def: 32). Meu ataque: 8 soldados × 10 × 1.2 = 96. Ratio: 96/32 = 3.0 >> 1.5. VITÓRIA DECISIVA. T1 reconquistado!
- Frustrações: A vitória foi fácil demais? Com ratio 3x, é uma esmagada. Mas depois de perder T1, isso foi satisfatório.
- Surpresas positivas: RECONQUISTEI T1! Primeiro momento verdadeiramente satisfatório do jogo.
- Avaliação: Reconquista épica — isso é o tipo de satisfação que faz o jogador querer continuar.

---

**Turnos 12-15 — Era da Guerra**

- Turno 12: AI3 atacou T0. Perdi T0 para AI3 (força muito superior).
- Turno 13: Com apenas T1, lutei com todos meus recursos.
- Turno 14: AI3 atacou T1. Perdi T1.
- Eliminado turno 14.

---

**Reflexão final de FIO:**

Não entendi a maioria das mecânicas até que já era tarde. O jogo tem profundidade mas não te segura pela mão. Mandei todos os meus soldados para longe, não construí economia, não entendi que ataques não garantem conquista automaticamente. Se tivesse tido um tutorial de 3 minutos mostrando: (1) como construir, (2) como recrutar, (3) como atacar E o que significa a vitória, teria jogado completamente diferente.

O momento mais satisfatório foi reconquistar T1 no turno 11. O mais frustrante foi perder todos os soldados em T4 sem ganhar nada.

---

## RESULTADO FINAL

**Score FIO:** 0 pontos (eliminado turno 14)
- Territórios: 0
- Eliminado por: AI3 (Ferronatos, Conquistador)

**Classificação:** Eliminado — score parcial ~50 (baseado em unidades antes de eliminar)
