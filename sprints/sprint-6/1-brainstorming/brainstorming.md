# Brainstorming — Sprint 6 (Wave 6)

**Data:** 2026-03-11
**Sessão:** Análise de playtesting pós-sprint 6
**NPS médio:** 7,3/10 (vs 5,7 no Sprint 5 — +28%)
**Sobrevivência:** 5/6 agentes (vs 2/6 no Sprint 5 — +150%)

---

## 1. Cruzamento Log vs Entrevista — Divergências Críticas

### ARIA (Agent-A) | Econômica Agressiva | 8/10
**Log:** Raiva explícita no T21: *"RAIVA. Concentrei forças em T6, a Horda atacou T0. D-044 é um pain crítico."* Gargalo de ouro mencionado em 6 turnos separados. Carta esquecida por ~12 turnos (recebida T~11, usada T23).
**Entrevista:** "Era da Invasão criou urgência real" — enquadrou a perda de T0 como drama dramático, não frustrante. Carta mencionada brevemente como "descoberta tardia".
**DIVERGÊNCIA:** A entrevista positiva (8/10) mascara raiva genuína com a Horda e gargalo de ouro crônico. O log é mais honesto. A nota 8 está inflada pela sobrevivência — ARIA sofreu tanto quanto quem ficou com 7.

### BALDO (Agent-B) | Econômica Defensiva | 9/10
**Log:** "OURO ZERO" aparece em T6, T7, T8, T10, T12, T18, T24 — 7 ocorrências. *"Ciclo vicioso"*, *"É um design que não foi resolvido."* Regra de desempate da Horda desconhecida: *"sobrevivência por fator desconhecido"*.
**Entrevista:** 9/10 focado na revolução da Muralha. Gargalo de ouro mencionado mas não como pain principal.
**DIVERGÊNCIA:** A euforia da Muralha (de eliminado para 2º lugar) suprimiu na entrevista a frustração crônica de nunca ter ouro suficiente. O gargalo de ouro foi o maior problema da sessão de BALDO — mais presente que qualquer outro pain no log — mas na entrevista ficou em segundo plano.

### CAIUS (Agent-C) | Militar Ofensiva | 8/10
**Log:** *"Microgerenciamento de 5 territórios é exaustivo."* (T9, T12). Mecânica de reconquista trivial: *"Reconquistei T4 no mesmo turno [que a Horda tomou]. Mecânica estranha — reconquistar território que a Horda acabou de tomar é trivial?"* (T20).
**Entrevista:** Focado nos pontos fortes. Microgerenciamento mencionado como item em "pains" mas tratado como custo aceitável.
**DIVERGÊNCIA:** A mecânica de reconquista trivial pós-Horda é um insight novo que CAIUS articulou apenas no log — na entrevista foca em "o que tornaria a vitória mais épica" (narrativa/ranking) sem mencionar o problema estrutural de a Horda ser neutra em impacto para o líder.

### EZRA (Agent-E) | Espionagem/Diplomacia | 5/10
**Log:** Cálculo de bônus Umbral incorreto: *"Umbral +30% = base 50% × 1.3 = 65%... espera, o bônus é 30% da eficiência base, então 50%×1.3 = 65%, não 80%. O tooltip diz '65% chance de sucesso'."* — EZRA calculou 80% primeiro, depois corrigiu, mas isso revela que a fórmula não é intuitiva.
**Entrevista:** Não mencionou confusão com a fórmula do bônus.
**DIVERGÊNCIA CRÍTICA:** O log registra uma crise de compreensão de mecânica que não foi articulada na entrevista. Se EZRA precisou recalcular o bônus Umbral mentalmente, outros jogadores não vão conseguir e simplesmente usarão espiões sem entender se o bônus está funcionando.

### FIO (Agent-F) | Instintiva (Novato) | 7/10
**Log:** *"O que mudou na Era da Guerra?"* — dúvida persiste por toda a Era da Guerra (T9-T18). Acumulou grão em excesso (100+) sem saber como gastar. Aviso de produção zero no T2 em vez de T1.
**Entrevista:** 7/10 — considerou que o jogo "ajudou bastante" desta vez. Listou as features de UX que ajudaram.
**DIVERGÊNCIA:** A nota 7 é generosa considerando que FIO ficou confuso sobre mecânicas de era por toda a Era da Guerra. O aviso de zero-produção é um melhoria real mas o timing incorreto (T2 em vez de T1) ainda causou erro. FIO construiu Quartel antes de Fazenda por isso.

---

## 2. Dores — Problemas Reais Identificados

### Categoria: Mecânicas

**[CRÍTICO] Deadlock econômico da facção Umbral (D-066)**
A Shadow Guild como primeira estrutura consome ouro suficiente para criar um deadlock econômico irrecuperável. EZRA gastou 30 ouro em Shadow Guild + 20 ouro em espiões = 50 ouro em T2, ficando sem qualquer fonte de ouro e sem capacidade de construir qualquer estrutura produtiva. Eliminado em T8 — antes da Era da Guerra. O design da facção Umbral convida o jogador a fazer exatamente o que o mata.
*Evidência: EZRA T5: "BLOQUEADO POR OURO. Este é o deadlock econômico mais grave que já vi."*
*Frequência: 1/6 agentes (mas afeta 100% dos jogadores que escolherem Umbral com build-order intuitiva)*

**[ALTO] Gargalo de ouro crônico (D-067)**
Ouro zerou repetidamente para 4 dos 6 agentes. BALDO: 7 ocorrências ao longo da partida. ARIA: 4 ocorrências. CAIUS e FIO: 2+ cada. A produção de Mina (5/t ou 8/t após upgrade) é fundamentalmente insuficiente para as demandas de construção + recrutamento simultâneos. O jogo pune a eficiência: tentar fazer duas ações no mesmo turno (recrutar + construir) frequentemente esgota o ouro.
*Evidência: BALDO T24: "OURO ZERO NOVAMENTE. Último turno de recrutamento e ainda o mesmo ciclo. É um design que não foi resolvido."*
*Frequência: 4/6*

**[ALTO] Meta-dominância de Ferronatos Militar Ofensiva (D-074 — continua D-054)**
CAIUS venceu pelo segundo sprint consecutivo com a mesma build order (Quartel T1, ataque T3, 5 territórios T10). Mesmo com BALDO chegando ao 2º lugar (melhora real), a diversidade ainda é limitada: 3/6 agentes usaram Ferronatos. A facção com +20% ataque E defesa é categoricamente superior para qualquer estratégia que envolva expansão.
*Evidência: Ranking: Ferronatos tem 3 dos 5 finalistas; todas as 3 posições 1-3 usaram estratégias que acumularam tropas.*
*Frequência: 4/6 — confirmam que militar ofensiva early é a melhor estratégia disponível*

**[MÉDIO] Horda: reconquista trivial após ataque (D-069)**
A Horda toma um território, mas o território fica sem defensor após o ataque. O agente atacado pode reconquistar imediatamente sem custo significativo. CAIUS perdeu T4 para Horda e reconquistou no mesmo turno T20. ARIA perdeu T0 e reconquistou em T22 (2 turnos depois). A punição da Horda é quase nula para agentes com exército.
*Evidência: CAIUS T20: "Reconquistei T4 no mesmo turno. Mecânica estranha — reconquistar território que a Horda acabou de tomar é trivial?"*
*Frequência: 2/6 (CAIUS e ARIA reconquistaram facilmente)*

**[MÉDIO] Estimativas de fog of war muito amplas para planejamento (D-072)**
O tooltip de escala de ameaça fornece estimativas como "4-8 unidades" ou "2-5 unidades" — ranges com 3-4 unidades de variação. Para a fórmula de combate (precisa > 1.5× a defesa), a diferença entre 2 e 5 unidades é a diferença entre atacar com 4 soldados (seguro) ou precisar de 8 (insuficiente para maioria). A estimativa atual não permite planejamento preciso.
*Evidência: CAIUS T7: "A escala de ameaça é vaga demais. 'Estimativa 2-5 unidades' é um range de 3 unidades — a diferença entre vencer facilmente e perder feio."*
*Frequência: 3/6 (ARIA, CAIUS, BALDO)*

**[MÉDIO] Aviso de produção zero no T2, deveria ser T1 (D-073)**
O aviso "Sem produção de recursos" só aparece no T2, depois que o jogador já gastou recursos em uma ação subótima no T1. FIO construiu Quartel no T1 por não ter aviso — e só recebeu orientação no T2 para construir Fazenda. O aviso correto é preventivo (antes da primeira ação), não retrospectivo.
*Evidência: FIO T2: "Por que o aviso só apareceu no T2 e não no T1? Se tivesse aparecido no T1 eu teria construído Fazenda antes do Quartel."*
*Frequência: 2/6 (FIO e EZRA teriam sido impactados)*

### Categoria: Interface

**[ALTO] UX de redistribuição de tropas exaustiva em 4+ territórios (D-068)**
Com 4 ou mais territórios, redistribuir tropas defensivamente requer 3 cliques por movimento (navegar ao território → expedição → confirmar reforço), vezes 4+ territórios = 12+ interações por turno de reorganização. BALDO descreveu "6 cliques para redistribuir 4 grupos". ARIA: "maior pain de UX desta partida". CAIUS: "exaustivo". Um botão "Auto-Distribuir igualmente" ou drag-and-drop resolveria.
*Evidência: ARIA T18: "Redistribuir manualmente 4 grupos de tropas levou muito tempo e cliques. É minha maior reclamação de UX desta partida."*
*Frequência: 4/6 (ARIA, BALDO, CAIUS, DARA)*

**[MÉDIO] Sistema de cartas completamente passivo — sem lembrete ativo (D-070)**
ARIA recebeu carta no T~11 e a usou no T23 — 12 turnos de uso potencial perdidos. FIO nunca usou. O sistema tem banner de sugestão no ExpeditionModal (G-019 do S4), mas isso claramente é insuficiente: 4/6 agentes não usaram cartas em momento ótimo. O inventário de cartas não notifica proativamente durante o turno.
*Evidência: ARIA T23: "Verifico inventário — tenho 'Colheita Farta'! Nunca usei carta em toda a partida. Provavelmente estava no inventário por 10+ turnos sem eu notar."*
*Frequência: 4/6*

**[MÉDIO] Bônus Umbral mal comunicado — fórmula não intuitiva (D-071)**
EZRA tentou calcular o bônus de 30% de eficiência Umbral e chegou a 80% inicialmente antes de corrigir para 65%. O bônus "+30% eficiência" é multiplicativo sobre a base (50% × 1.3 = 65%), não aditivo (50% + 30% = 80%). A distinção não está clara na interface. Se até EZRA — que estava focado na estratégia de espionagem — calculou errado no log, outros jogadores nunca saberão se o bônus está funcionando.
*Evidência: EZRA T3: "Umbral +30% = base 50% × 1.3 = 65%... espera, o bônus é 30% da eficiência base, então 50%×1.3 = 65%, não 80%. O tooltip diz '65% chance de sucesso'."*
*Frequência: 1/6 (mas observável via log)*

**[MÉDIO] Ranking durante a partida ausente (D-075)**
Nenhum jogador sabe sua posição relativa até o fim do jogo. CAIUS (champion.md) explicitamente pediu "placar visível para saber em que posição estou a cada turno". Sem ranking em tempo real, decisões estratégicas importantes — como "devo expandir ou me defender?" — são feitas sem informação sobre quão distante estão os rivais.
*Evidência: CAIUS (champion.md): "Ranking visual durante o jogo: placar visível para saber em que posição estou a cada turno, não apenas ao final."*
*Frequência: 2/6 (CAIUS e ARIA mencionaram)*

### Categoria: Diversão

**[CRÍTICO] Horda sem localização de território-alvo (D-044 — persistente)**
Pain mais crítico da sessão por frequência e intensidade emocional. ARIA apostou em T6, Horda atacou T0 ("RAIVA"). CAIUS com 5 territórios distribuiu forças e perdeu T4. BALDO sobreviveu por sorte de não ser o maior clã. O modal da Horda informa QUEM vai ser atacado mas não QUAL território. A defesa contra a Horda é literalmente um jogo de azar.
*Evidência: ARIA T21: "RAIVA. Concentrei forças em T6, a Horda atacou T0. Sem informação de localização, qualquer estratégia defensiva é aleatória."*
*Frequência: 4/6*

---

## 3. Ganhos — O Que Já Funciona

**[TRANSFORMADOR] Display de produção por turno (G-024)**
O indicador +12/t ao lado de cada recurso no ResourcePanel foi o elogio mais unânime do sprint. ARIA: *"É exatamente o que sempre quis. Sei em tempo real o que estou ganhando."* BALDO calculou que poderia construir a Muralha em T5 usando apenas as projeções do display. Transforma planejamento de adivinhação em cálculo preciso.
*Frequência: 6/6*

**[TRANSFORMADOR] Sistema de ameaça visual com escala (G-029)**
Símbolos de ameaça coloridos + tooltips com estimativas salvaram territórios para 4/6 agentes. ARIA salvou T6 ao realocar forças antes do ataque de AI3. FIO salvou T4 porque o símbolo laranja piscante chamou atenção. DARA sobreviveu ao jogo completo graças ao sistema. É a feature que mais aumentou a taxa de sobrevivência.
*Frequência: 5/6*

**[TRANSFORMADOR] Custo Muralha 25 madeira (G-026)**
A correção de custo (50→25 madeira) desbloqueou completamente o arquétipo defensivo. BALDO construiu Muralha no T3 — algo impossível no Sprint 5. Saiu de "eliminado no T11" para "2º lugar". ARIA construiu 2 Muralhas durante a Era da Guerra. O impacto é mensurável: estratégia defensiva passou de "inviável" para "competitiva".
*Frequência: 5/6 usaram Muralha (vs 1/6 no S5)*

**[ALTO] CombatPreview com texto explicativo e threshold 1.5x (G-027)**
O texto "Vitória Decisiva — conquista garantida" e o hint do threshold 1.5x ensinaram a mecânica de combate de forma eficaz. CAIUS tomou decisão estratégica importante de NÃO atacar no T7 com base no fog of war + threshold. FIO entendeu o resultado sem entender a fórmula: *"O texto 'conquista garantida' sim, o número 1.5× não, mas foi suficiente."*
*Frequência: 5/6*

**[ALTO] Highlight de adjacência ao selecionar território (G-028)**
Feature mais elogiada pelo jogador novato. FIO: *"Nunca mais precisei memorizar o grid."* CAIUS notou que o highlight ilumina também territórios não desejados como atacáveis, mas para novatos o benefício supera a ambiguidade.
*Frequência: 5/6*

**[ALTO] Fog of war com revelação por espião (G-025)**
Para EZRA, o momento de ver o badge "3 soldados" substituir "?" foi *"a experiência mais satisfatória de toda a série de sprints."* Para CAIUS, o fog of war criou a primeira decisão de NÃO atacar baseada em incerteza informacional genuína (T7). A mecânica funciona — o problema é o contexto econômico ao redor.
*Frequência: 4/6 (EZRA, CAIUS, ARIA, DARA)*

---

## 4. Alívios — Como Aliviar Cada Dor

| Dor | Proposta de Alívio |
|-----|-------------------|
| D-066: Deadlock econômico Shadow Guild | Aviso contextual ao construir Shadow Guild: "Esta estrutura não gera recursos. Recomendado: construa Fazenda e Mina antes de estruturas especiais." Não precisa ser bloqueante — apenas informativo. |
| D-067: Gargalo de ouro crônico | (a) Aumentar produção base de Mina Nv1 de 5/t para 7/t, ou (b) adicionar conversão de grão→ouro na Taverna sem custo de turno, ou (c) reduzir custo de ouro em recrutamento de soldados base. |
| D-074: Meta-dominância Ferronatos | Verificar se bônus Ferronatos (+20% atk+def) está matematicamente sobrevalorizado vs outras facções. Considerar buff em Verdâneos (economia) ou em cartas de Umbral (espionagem como meta). |
| D-069: Reconquista trivial pós-Horda | Adicionar defensor residual (2-3 unidades Horda "occupantes") ao território após conquista, que precisa ser eliminado antes da reconquista. |
| D-072: Estimativas fog of war vagas | Estreitar o range de estimativa (ex: "3-4 unidades" em vez de "2-5"). Ou mostrar precisão por nível de informação (espião revela exato; ameaça visual mostra range). |
| D-073: Aviso produção zero T2 em vez de T1 | Mover o check de "sem produção" para ANTES da primeira ação do T1, não depois. |
| D-068: UX redistribuição tropas | Adicionar botão "Auto-Distribuir igualmente" na tela de gerenciamento de exército. |
| D-070: Cartas passivas | Notificação na barra de recursos ou no botão de Fim de Turno: "Você tem X cartas no inventário." Badge visual que não pode ser ignorado. |
| D-071: Bônus Umbral mal comunicado | Mostrar fórmula no tooltip: "65% (base 50% × 1.3 Umbral)" em vez de apenas "65% chance de sucesso". |
| D-075: Ranking ausente durante partida | Mini-placar no HUD (canto superior) com posição relativa: "1º de 4 — 5 terr | 2º: BALDO 4 terr". |
| D-044: Horda sem localização | Mostrar qual território será atacado com 1 turno de antecedência no modal da Horda. |

---

## 5. Criadores de Ganho — Como Ampliar o Que Já Funciona

| Ganho | Proposta de Amplificação |
|-------|--------------------------|
| G-024: Display produção/turno | Adicionar projeção de "recursos em X turnos" para planejamento de longo prazo: tooltip hover mostrando "em 3 turnos: Grão=280, Madeira=95, Ouro=47". |
| G-029: Sistema ameaça visual | Adicionar diferenciação entre "ameaça de ataque" e "movimento de exploração" — um espião em trânsito não é a mesma coisa que um exército pronto para atacar. |
| G-026: Muralha acessível | Comunicar explicitamente o valor defensivo da Muralha no tooltip antes de construir: "Nv1: +20% defesa. Com 3 soldados defensores, equivale a 3.6 soldados. Reduz perdas em 20% em ataques repelidos." |
| G-027: CombatPreview | Adicionar seção "Resultado esperado após combate": quantas unidades sobram de cada lado se a estimativa for precisa. |
| G-025: Fog of war com espião | Adicionar countdown visível de "revelação expira em X turnos" diretamente no badge do mapa — sem precisar entrar no modal. |
| G-028: Highlight adjacência | Adicionar diferenciação visual: adjacentes atacáveis (azul sólido) vs adjacentes fora do range de ataque com exército atual (azul tracejado). |

---

## 6. Priorização — Ranking por Impacto

| # | ID | Tipo | Score | Justificativa |
|---|-----|------|:-----:|---------------|
| 1 | D-044 | pain | 9 | Pain mais crítico por 3 sprints. 4/6 frequência. Apostas cegas contra Horda afetam diretamente a agência do jogador. Solução clara: mostrar território-alvo no modal. |
| 2 | D-066 | pain | 9 | Elimina uma facção inteira (Umbral) para jogadores que jogam de forma natural. Aviso contextual é baixo esforço + alto impacto. |
| 3 | D-067 | pain | 8 | 4/6 frequência, impacto em todas as estratégias. Gargalo crônico reduz satisfação em todos os turnos. Ajuste de balance (Mina +2/t) é de baixo risco. |
| 4 | D-068 | pain | 8 | 4/6 frequência. Redistribuição manual é tediosamente repetitiva em late game. Botão "Auto-Distribuir" tem ROI alto para jogadores avançados. |
| 5 | D-074 | pain | 8 | Meta-dominância por 2 sprints consecutivos. Diversidade de arquétipos é core value do design. Sem isso, o replay intent é sobre refinar a mesma estratégia, não explorar diferentes. |
| 6 | D-070 | pain | 7 | 4/6 frequência. Sistema de cartas prometido mas inutilizado é desperdício de feature. Badge de notificação é baixíssimo esforço. |
| 7 | D-072 | pain | 7 | 3/6 frequência. Range de estimativa impede planejamento preciso. Estreitar para ±1 unidade requer apenas ajuste de constante. |
| 8 | D-069 | pain | 7 | 2/6 mas impacto conceitual alto: esvazia o significado da Horda como punição para o líder. Necessita defensor residual. |
| 9 | D-073 | pain | 6 | 2/6 frequência. Aviso uma linha de código mais cedo previne build-order errada de novatos. |
| 10 | D-075 | pain | 6 | 2/6 frequência mas é uma feature que amplificaria engagement de todos os jogadores que chegam ao late game. |
| 11 | G-024 | gain | 9 | NÃO MEXER. Display de produção/turno é a adição mais amada do sprint. Apenas ampliar com projeção futura. |
| 12 | G-029 | gain | 9 | NÃO MEXER. Sistema de ameaça visual transformou a sobrevivência. Ampliar com diferenciação de tipo de movimento. |
| 13 | G-026 | gain | 9 | NÃO MEXER. Custo 25 madeira está calibrado. Ampliar comunicação do valor defensivo no tooltip. |
