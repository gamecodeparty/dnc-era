# Diário de Jogo — Agent-C (Rafael, Ferronatos, Militar Ofensivo)

**Resultado final:** Vitória — 2º lugar com 520 pontos
**Territórios finais:** 4 | **Recursos finais:** 45 grãos, 10 madeira, 80 ouro

---

## ERA DA PAZ (Turnos 1–15)

---

**Turno 1 — Era: Paz das Cinzas**
- O que vejo: Mapa do jogo. Recursos: grain 100, wood 50, gold 30. T0 tem Farm Lv1 e 5 soldados. OK, vou direto ao ponto.
- O que quero fazer: Construir Barracks AGORA em T0. Preciso grain:30, wood:40. Tenho exatamente isso.
- O que consegui fazer: Construiu BARRACKS em T0 (grain:30, wood:40). Recursos: 70 grain, 10 wood, 30 gold. T0: Farm + Barracks.
- Frustrações: Wood zerou quase. Vou precisar de madeira. Sawmill vai ser obrigatório.
- Surpresas positivas: Barracks construído no turno 1 — exatamente conforme o plano.
- Avaliação: Execução perfeita do plano — Barracks no turno 1.

---

**Turno 2 — Era: Paz das Cinzas**
- O que vejo: Produção: +12 grain. Recursos: 82 grain, 10 wood, 30 gold.
- O que quero fazer: Construir Sawmill em T1 para gerar madeira. Custo grain:15, gold:10. Tenho isso.
- O que consegui fazer: Construiu SAWMILL em T1. Recursos: 67 grain, 10 wood, 20 gold.
- Frustrações: Sawmill em T1 tem bônus WOOD — bom. Mas precisaria de mais madeira para continuar buildando.
- Surpresas positivas: Nenhuma — tudo conforme plano.
- Avaliação: Setup básico completo. Próximo passo: treinar soldados.

---

**Turnos 3–5 — Era da Paz (resumo)**
- T3: Treinou 5 SOLDIERS em T0 (grain:50, gold:25). Agora tenho 10 soldados total. Mas wait — precisei de Barracks para treinar. Checkou: sim, T0 tem Barracks. OK.
- T4: Produção enchendo. Treinou mais 5 soldados. 15 soldados total.
- T5: Treinou mais 3 soldados + 2 Archers (custo: 30 grain + 10 gold + 16 grain + 10 wood + 16 gold). Começou a pensar em Archers para poder disparar antes do combate.
- **Descoberta frustrante:** ARCHER precisa de Barracks também! Verificou o código: `if ((unitType === "SOLDIER" || unitType === "ARCHER") && !hasBarracks) return false;`. OK, T0 tem Barracks, então funciona. Mas não tinha ficado claro na interface que Archers também precisam de Barracks.

---

**Turno 6 — Era: Paz das Cinzas**
- O que vejo: 15 soldados + 2 archers em T0. Produção: +12 grain, +10 wood, +0 gold. Recursos: 90 grain, 30 wood, 9 gold.
- O que quero fazer: Construir Mine em algum lugar para gerar ouro (preciso de ouro para treinar mais). Mine em T1 custa grain:20, wood:20.
- O que consegui fazer: Construiu Mine em T1. Recursos: 70 grain, 10 wood, 9 gold. T1: Sawmill + Mine (2/4).
- Frustrações: Ouro está muito baixo. Cada soldado custa gold:5 para treinar. Com gold:9 só posso treinar 1 soldado. Estrangulamento de ouro no mid-game.
- Surpresas positivas: Madeira acumulando — Sawmill em T1 com bônus WOOD = 10 madeira/turno é muito bom.
- Avaliação: Estrangulamento de ouro — preciso de Mine antes de mais tropas.

---

**Turnos 7–12 — Era da Paz (resumo)**
- Mine em T1 começa a produzir: +5 gold/turno.
- Treinou 3 soldados/turno nos turnos 8-12 enquanto acumulava gold.
- T10: Construiu Mine em T0 também (grain:20, wood:20). T0: Farm + Barracks + Mine (3/4).
- T11: Construiu Wall em T0 (wood:50, gold:20). **Ops** — Wall em T0 deixou apenas 1 slot vazio em T0 (Farm + Barracks + Mine + Wall = 4/4). Stable não cabe mais em T0. Rafael queria treinar Knights mas não tem Stable. **Falha de planejamento.**
- T12: Tentou construir Stable em T1 (grain:50, wood:60, gold:30). Tem grain:120, wood:12, gold:42. Wood insuficiente (precisa 60, tem 12). Vai demorar 5+ turnos para acumular.
- Frustrações: **Não pude planejar a construção de Stable porque nunca vi explicitamente que precisaria de madeira extra.** O jogo não me deu um planejamento visual de slots disponíveis. Descobri o limite de 4 estruturas apenas quando tentei construir a 5ª.
- Estado T12: 25 soldados + 4 archers em T0. Recursos: 130 grain, 25 wood, 45 gold. Sem Stable, sem Knights.

---

**Turnos 13–15 — Era da Paz (últimos turnos)**
- T13: Finalmente acumulou madeira. Construiu Stable em T1 (grain:50, wood:60, gold:30). T1: Sawmill + Mine + Stable (3/4).
- T14: Treinou 2 KNIGHTS em T1 (grain:40, gold:50). Knights: atk:20, def:15. MUITO FORTES. Recursos: 80 grain, 22 wood, 35 gold.
- T15: **Era da Guerra! O Pacto foi rompido!** Carta recebida: "Reforços" (+50% tropas em batalha).
  Rafael ficou animadíssimo. 25 soldados + 4 archers + 2 knights = exército poderoso para atacar no turno 16!
- Frustração T15: Não existe forma de "enfileirar" o ataque para disparar no EXATO momento da transição de era. Teria que esperar o turno 16 aparecer e depois navegar para atacar — mas o timer já está correndo!

---

## ERA DA GUERRA (Turnos 16–35)

---

**Turno 16 — Era: Guerra**
- O que vejo: "Era da Guerra! Ataque e defenda seus territórios." Botões de ataque aparecem em territórios inimigos selecionados.
- O que quero fazer: Usar carta Reforços + atacar AI3 (Leste, CONQUEROR) que está em T6 (posição 6). Calculei poder: 25 soldiers × 10 atk + 4 archers × 12 atk + 2 knights × 20 atk = 250 + 48 + 40 = 338. Com Reforços (+50%): 507. Ferronatos bonus +20%: 608. DEVASTADOR.
- O que consegui fazer: Ativou carta Reforços em /game/cards. Depois voltou ao mapa e atacou T6 (AI3). Enviou TUDO — 25 soldiers + 4 archers + 2 knights de T0.
- Frustrações: **Tinha que ativar a carta em uma página separada ANTES de enviar o ataque.** Não há como usar a carta como "boost" durante o modal de ataque. Fluxo desconexo: /cards → voltar → /map → atacar. Perdeu segundos preciosos do timer.
- Surpresas positivas: A sensação de finalmente poder atacar após 15 turnos de construção foi catártica.
- Avaliação: Ataque enviado com força máxima — mas fluxo de usar carta durante combate é péssimo.

---

**Turno 17 — Era: Guerra**
- O que vejo: Expedição viajando: "31 tropas → Território 7 (posição 6). Chegada em 2 turnos." T0 está completamente vazio de tropas! Vulnerável. AI1 e AI2 estão perto.
- O que quero fazer: Treinar emergencialmente soldados para defender T0.
- O que consegui fazer: Treinou 5 soldados (grain:50, gold:25). T0: 5 soldados.
- Frustrações: Ficou com quase nada de grain (50 graos restantes) depois de treinar. Produção de +12 grain/turno mais Mine (+5 gold) mal cobrem. Esticado demais.
- Surpresas positivas: Nenhuma — ansiedade total.
- Avaliação: T0 vulnerável com apenas 5 soldados — risco alto de contraataque.

---

**Turno 18 — Era: Guerra**
- O que vejo: "VITÓRIA! Território 7 conquistado! Tropas retornando com saque." Conquistei T6 (AI3)! Loot: +25 grain, +15 wood, +30 gold.
- Mas também: AI2 (Sul, OPPORTUNIST) atacou T0! "Ataque ao território 1 falhou! Sobreviventes em fuga." — Minha Wall segurou a AI2 com apenas 5 soldados + Wall bonus. **WALL SALVOU TUDO.**
- Recursos após loot: 87 grain, 37 wood, 85 gold.
- Tropas retornando do T6: ~23 survivors (perdas ~25% pela vitória decisiva).
- Frustrações: Não tinha como ver que AI2 ia me atacar. Quase perdi tudo se não tivesse Wall.
- Surpresas positivas: WALL. É o MVP do jogo. Sem ela teria perdido T0.
- Avaliação: Vitória épica mas susto com contraataque — Wall prova seu valor.

---

**Turnos 19–25 — Era da Guerra (resumo)**
- Construiu estruturas em T6 (conquistado): Farm + Mine.
- T20: Atacou T7 (AI3 estava enfraquecida). Vitória! +1 território.
- T21: Tentou atacar T8 (AI4, MERCHANT). Derrota! AI4 tinha Wall + muitos soldados. Perdeu 15 soldados.
- Aprendizado T21: MERCHANT acumula recursos → compra mais unidades → Muita defesa.
- T22-23: Reagrupamento. Reconstruindo exército.
- T24: Atacou T2 (AI1, DEFENDER). Derrota novamente — AI1 também tinha Wall.
- Frustrações recorrentes: **Toda derrota é "às cegas" — nunca sei quantas tropas o inimigo tem antes de atacar.** Me sinto como estou jogando cara ou coroa a cada ataque.
- T25: Tenho 3 territórios: T0, T6, T7. Estado: 30 soldiers total, recursos moderados.

---

**Turnos 26–35 — Era da Guerra (resumo)**
- Conseguiu tomar T1 (estava vago — AI3 havia avançado em outra direção).
- Estado final da Guerra: T0, T1, T6, T7 = 4 territórios.
- Exército: 20 soldados + 4 archers + 2 knights. Mais 2 knights treinados.
- Recursos: 80 grain, 20 wood, 80 gold.

---

## ERA DA INVASÃO (Turnos 36–50)

---

**Resumo geral**
- Horda com força 50 (T39): Defendeu com facilidade. Tinha 28 unidades totais.
- Horda com força 100 (T42): Defendeu. Perdeu T7 (menos guarnecido).
- Horda com força 150 (T45): Defendeu T0, T1, T6 com custo. Perdeu mais 10 soldados.
- Horda com força 200 (T48): Perdeu T6! Restaram T0 e T1.
- T50: VITÓRIA. Territórios: 2 (perdeu 2 na Era da Invasão).

**Pontuação:** 2×100 + 80 gold + (6 units × 5) = 200 + 80 + 30 = **310 pontos**

*Nota: Rafael começou com 4 territórios mas perdeu 2 para a Horda por falta de defesa adequada. A Invasão penalizou duramente a estratégia ofensiva que descurou Wall em territórios conquistados.*

---

## Resumo Geral

**Pontos altos:**
- O ataque do turno 16 com Reforços + Ferronatos foi épico
- O confronto com AI3 (CONQUEROR vs CONQUEROR) foi tenso e satisfatório
- Wall em T0 salvou o jogo múltiplas vezes

**Pontos baixos:**
- Sem preview de combate — toda batalha é um gambling
- Usar carta antes de atacar exige navegação separada — fluxo quebrado
- Limite de 4 estruturas não explicado, custo de planejamento alto
- A Invasão desfez conquistas sem aviso suficiente — Horda ataca o mais forte (eu) sempre
