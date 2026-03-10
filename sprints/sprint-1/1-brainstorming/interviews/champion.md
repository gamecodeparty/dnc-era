# Entrevista Especial — Campeão (Agent-A: Marcos, Verdaneos, 465 pontos)

---

## Quando percebeu que estava ganhando?

No turno 18, quando conquistei T2 (primeiro território inimigo) e vi o saque listado: "+12 grain, +8 wood, +15 gold." Não foi só a conquista — foi a soma de conquista + saque que me disse "esse loop está funcionando." A cada território conquistado, tenho mais produção, mais ouro para tropas, mais madeira para estruturas. O flywheel girou.

Mas a certeza real veio no turno 24, quando a Wall em T0 absorveu o ataque de AI3 com apenas 5 soldados residentes. Naquele momento soube: tenho defesa passiva funcionando, tenho exército em campo, tenho economia forte. Os outros estão se destruindo entre si.

## Qual vantagem real sua facção deu?

Sinceramente, nenhuma direta no cliente. O bônus Verdaneos (+20% graos) está implementado no servidor (ResourceSystem.ts linha 70) mas o jogo roda no Zustand client-side. A produção de Farm em território GRAIN era 12/turno para todos, sem diferenciação de facção na prática do cliente. **A escolha de facção no client é flavor sem mecânica.**

A vantagem real foi a escolha de território bônus — peguei territories GRAIN primeiro para maximizar Farm, depois fui atrás de GOLD para Mine. Isso foi estratégia, não facção.

## Houve momento em que quase perdeu? O que salvou?

Sim: turno 22, quando AI3 conquistou meu T1 enquanto minhas tropas estavam todas em campo. Fiquei com apenas T0. Se AI3 tivesse atacado T0 naquele momento, com T0 tendo apenas 3 soldados, poderia ter perdido.

O que salvou: Wall em T0. A Wall adicionou ~20% de defesa, mas mais importante, AI3 provavelmente decidiu pegar T10 (neutro, fácil) antes de tentar T0 (Wall, mais custoso). **Wall mudou o cálculo da IA.** Isso foi mais valioso do que defesa direta.

## A vitória foi satisfatória ou fácil demais?

Satisfatória mas levemente oca no final. Ganhei com 465 pontos e terminei o jogo com apenas 3 territórios (perdi 2 para a Horda). Fui o primeiro lugar mas não me senti dominante — me senti o "que sobreviveu melhor."

A Horda eliminou AI3 que havia dominado a Era da Guerra com 5+ territórios. Eu "venci" basicamente porque a Horda fez o serviço pesado. Se o jogo tivesse terminado no turno 40, AI3 teria vencido.

## O que tornaria a vitória mais épica?

1. **Um momento de "você venceu porque..."** — uma tela de resultado que explica POR QUE venci (maior economia? melhor defesa? sobrevivência? estratégia específica). Agora é apenas "Vitória! Recursos finais: X." Sem contexto.

2. **Uma pontuação que comunique dominância** — 465 pontos não significa nada para mim. "Você ficou 1º de 5 com 465 pts" seria melhor com alguma benchmark como "sua maior conquista foi a economia: 3x mais gold que a média."

3. **A Era da Invasão deveria crescer mais lentamente** — 5 ondas em 15 turnos (a cada 3) é muito concentrado. A tensão da Invasão é boa mas dura pouco antes de se tornar avassaladora.
