# S-015 — Destaque Contextual de Cartas no Combate

**Discovery:** D-030 (score 8/10, frequencia 6/6)
**Tipo:** Pain — Cartas ignoradas apesar de disponiveis no ExpeditionModal (DIVERGENCIA CRITICA: feature F-024 implementada mas comportamento esperado nao emergiu)

---

## Objetivo

Tornar as cartas impossiveis de ignorar no momento do combate. A secao "Cartas Disponíveis" ja existe no `ExpeditionModal` (linhas 460-509), com filtro por contexto e toggle de selecao. Porem, 6/6 agentes ignoraram as cartas completamente. O problema nao eh ausencia — eh falta de destaque contextual.

A correcao muda a abordagem: ao inves de esperar que o jogador encontre a secao, o sistema sugere proativamente cartas relevantes no momento certo.

---

## Implementacao

### 1. Banner de sugestao de cartas no ExpeditionModal

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Quando o jogador tem cartas de combate disponiveis E esta criando uma expedicao de ATTACK:

Exibir banner proeminente ACIMA da secao de selecao de unidades:

```
┌─────────────────────────────────────┐
│ 🃏 Você tem 2 cartas de combate!    │
│                                     │
│ ⚔ Reforços (+50% ataque)     [Usar] │
│ 🔍 Informante (revela defesa) [Usar] │
│                                     │
│              [Ignorar cartas]       │
└─────────────────────────────────────┘
```

**Comportamento:**
- Banner aparece automaticamente quando ha cartas compativeis com o tipo de expedicao
- Clicar "Usar" seleciona a carta (mesmo comportamento do toggle atual)
- Clicar "Ignorar cartas" colapsa o banner (nao reaparece nesta sessao do modal)
- Banner tem borda dourada com animacao pulse sutil para atrair atencao
- Cor de fundo distinta (ex: `bg-amber-900/30 border-amber-500`)

### 2. Indicador no botao de confirmar expedicao

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Se o jogador tem cartas disponiveis mas NAO selecionou nenhuma, o botao de confirmar expedicao exibe sub-texto:

```
[Enviar Expedição]
(sem cartas selecionadas)
```

Texto em cor neutra (nao vermelho — nao eh erro, eh lembrete).

### 3. Sugestao contextual por tipo de carta

**Logica de filtro (ja parcialmente implementada):**
- Tipo ATTACK: mostrar cartas "combat" e "aggression" (REINFORCEMENTS, SABOTAGE)
- Tipo SPY: mostrar cartas "espionage" (INFORMANT)
- Tipo EXPLORE: nao mostrar cartas (nao aplicavel)
- Tipo REINFORCE: nao mostrar cartas (nao aplicavel)

**Priorizacao visual:**
- Carta mais impactante primeiro (REINFORCEMENTS > SABOTAGE > INFORMANT para ataques)
- Se jogador ja usou INFORMANT no territorio alvo (revelado), nao sugerir INFORMANT

### 4. Efeito visual da carta selecionada no preview de combate

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

O preview de combate ja aplica efeitos de REINFORCEMENTS (+50%) e INFORMANT (revela defesa). Adicionar label visual no preview:

```
Seu Poder: ~127
  └ Ferronatos +20%
  └ 🃏 Reforços +50%     ← novo
```

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/expedition/ExpeditionModal.tsx` | Banner de sugestao, indicador no botao, labels no preview |

---

## Criterios de Aceite

1. Banner de cartas disponiveis aparece automaticamente ao abrir ExpeditionModal para ATTACK quando ha cartas compativeis
2. Banner mostra nome, efeito resumido, e botao "Usar" para cada carta
3. Botao "Ignorar cartas" colapsa o banner sem selecionar nenhuma
4. Botao de confirmar mostra "(sem cartas selecionadas)" quando ha cartas disponiveis nao usadas
5. Preview de combate lista cartas selecionadas como modificadores (com icone 🃏)
6. Banner NAO aparece para expedicoes de EXPLORE ou REINFORCE
7. Secao existente de "Cartas Disponíveis" continua funcionando (compatibilidade)
