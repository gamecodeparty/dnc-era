# Entrevista Aprofundada — Último Lugar
**Agente:** EZRA (Agent-E) — Umbral, Espionagem/Diplomacia
**Resultado:** 6º lugar | 0 territórios (eliminado T8) | 0 pontos
**Contexto:** Eliminado ainda na Era da Paz — o mais cedo possível

---

## Quando percebeu que estava perdendo?

Percebi no T5, quando tentei construir Fazenda e descobri que tinha 0 ouro. Naquele momento entendi que havia gastos 30 ouro em Shadow Guild e 20 ouro em espiões, deixando-me sem nenhuma base econômica. Mas não percebi que era irrecuperável até o T7, quando tentei todas as saídas possíveis e nenhuma funcionou.

O momento de percepção definitiva foi quando calculei: "Preciso de ouro para construir qualquer estrutura. Para gerar ouro preciso de Mina. Mina custa 15 madeira e 5 ouro. Tenho 0 ouro. Loop infinito sem saída." Foi como uma porta que se fechou para sempre no T3.

---

## A derrota pareceu justa ou injusta?

**Injusta na forma, justa na substância.**

Na substância: cometi um erro real de priorização. Shadow Guild antes de qualquer estrutura de produção é genuinamente uma decisão ruim que qualquer jogador experiente de estratégia reconheceria.

Na forma: o jogo não me deu nenhum sinal de que estava cometendo um erro fatal. Construi Shadow Guild no T1 e o jogo simplesmente deixou. Nenhum aviso como "Atenção: você não tem produção de ouro. Esta estrutura requer manutenção futura". Outros jogos de estratégia têm alertas para quando o jogador está criando condições insustentáveis.

Mais injusto ainda: não há mecanismo de escape. Em outros jogos (Clash of Clans, Civilization), você pode demolir estruturas, vender recursos, ou negociar saídas de emergência. Aqui, com 0 ouro e sem estruturas de produção, o único resultado possível é eliminação.

---

## Que informação a interface escondeu que teria mudado o resultado?

Três informações críticas ausentes:

1. **Alerta de dependência**: quando construí Shadow Guild, a interface poderia ter mostrado: "Shadow Guild não gera recursos. Sem Fazenda/Mina, você não terá ouro no T3+. Continuar?"

2. **Indicador de recursos por ação obrigatória**: algo como "suas estruturas custam X de manutenção por turno" (mesmo que aqui não haja manutenção, o conceito de "seus gastos futuros superarão sua renda").

3. **Aviso proativo de crise econômica**: quando ouro chegou a 0 com 5+ turnos restantes, a interface poderia ter alertado: "Sem ouro, você não pode construir. Considere explorar territórios para encontrar recursos ou tentar diplomacia."

---

## Em qual turno uma dica teria salvado você?

**Turno 1.** Se ao tentar construir Shadow Guild tivesse aparecido: *"Recomendado: construa Fazenda (produz grão) e Mina (produz ouro) antes de estruturas especiais. Shadow Guild exige ouro para espiões que ainda não serão possíveis sem base econômica."*

Essa única dica contextual no T1 teria completamente mudado minha estratégia. Não precisaria ser bloqueante — apenas informativa. Com essa dica, teria construído Fazenda→Mina→Shadow Guild em vez de Shadow Guild→Nada.

---

## Tentaria de novo? Por quê?

**Sim, imediatamente.**

A razão é que o sistema de fog of war com revelação por espião é genuinamente brilhante — o momento em que o "?" virou badge "3 soldados" em T3 foi a experiência mais satisfatória de toda a série de sprints para mim. Quero fazer isso de forma sustentável economicamente.

A estratégia de espionagem Umbral tem potencial real. Com fog of war ativo, ter informação sobre forças inimigas enquanto eles agem às cegas é uma vantagem competitiva. O problema não foi a estratégia — foi a execução da base econômica.

O jogo me ensinou algo claro e memorável sobre ordem de construção. Essa é precisamente a sensação que um jogo de estratégia deve criar. **Derrotado mas educado** — é o melhor resultado possível para uma sessão de playtesting.

---

## Diagnóstico do Design

A sessão de EZRA revelou um **pain crítico não documentado** (D-NEW-1):

> **Shadow Guild como primeira estrutura cria deadlock econômico irrecuperável — sem aviso e sem saída.**

Este pain é diferente dos outros porque:
- É completamente invisível para o jogador até ser tarde demais
- Não há mecanismo de escape (demolir estrutura, vender, negociar)
- A facção Umbral é explicitamente projetada para usar Shadow Guild + espiões
- Um jogador novo que escolhe Umbral por gostar de espionagem naturalmente vai construir Shadow Guild cedo

**Impacto de design**: A facção Umbral está ativamente punindo jogadores que jogam da forma que a lore e o nome da facção sugerem.
