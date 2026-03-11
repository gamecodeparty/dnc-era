# PRP-012 — Destaque Contextual de Cartas no Combate

**Specs:** S-015
**Prioridade:** Score 8/10 (D-030 — cartas ignoradas apesar de disponíveis, 6/6) — DIVERGÊNCIA CRÍTICA: feature F-024 implementada mas comportamento esperado não emergiu
**Dependências:** Nenhuma

---

## Objetivo

Tornar as cartas impossíveis de ignorar no momento do combate. A seção "Cartas Disponíveis" já existe no `ExpeditionModal` (linhas 460-509), com filtro por contexto e toggle de seleção. Porém, 6/6 agentes ignoraram as cartas completamente. O problema não é ausência — é falta de destaque contextual. A correção muda a abordagem: ao invés de esperar que o jogador encontre a seção, o sistema sugere proativamente cartas relevantes no momento certo.

---

## Escopo

- **Tela:** `ExpeditionModal` — banner de sugestão, indicador no botão, labels no preview

---

## Features

### F-037 — Banner proeminente de sugestão de cartas no ExpeditionModal

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

Quando o jogador tem cartas de combate disponíveis E está criando uma expedição de ATTACK, exibir banner proeminente ACIMA da seção de seleção de unidades:

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
- Banner aparece automaticamente quando há cartas compatíveis com o tipo de expedição
- Clicar "Usar" seleciona a carta (mesmo comportamento do toggle atual)
- Clicar "Ignorar cartas" colapsa o banner (não reaparece nesta sessão do modal)
- Banner tem borda dourada com animação pulse sutil (`bg-amber-900/30 border-amber-500`)

**Lógica de filtro:**
- Tipo ATTACK: mostrar cartas "combat" e "aggression" (REINFORCEMENTS, SABOTAGE)
- Tipo SPY: mostrar cartas "espionage" (INFORMANT)
- Tipo EXPLORE/REINFORCE: não mostrar banner

**Priorização visual:**
- Carta mais impactante primeiro (REINFORCEMENTS > SABOTAGE > INFORMANT para ataques)
- Se jogador já usou INFORMANT no território alvo (revelado), não sugerir INFORMANT

**Critérios de aceite:**
- Banner aparece automaticamente ao abrir ExpeditionModal para ATTACK com cartas compatíveis
- Banner mostra nome, efeito resumido, e botão "Usar" para cada carta
- Botão "Ignorar cartas" colapsa o banner sem selecionar nenhuma
- Banner NÃO aparece para expedições de EXPLORE ou REINFORCE

### F-038 — Indicador de cartas não usadas no botão de confirmar

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

Se o jogador tem cartas disponíveis mas NÃO selecionou nenhuma, o botão de confirmar expedição exibe sub-texto:

```
[Enviar Expedição]
(sem cartas selecionadas)
```

Texto em cor neutra (não vermelho — não é erro, é lembrete).

**Critérios de aceite:**
- Botão de confirmar mostra "(sem cartas selecionadas)" quando há cartas disponíveis não usadas
- Sub-texto desaparece quando pelo menos uma carta é selecionada
- Sub-texto NÃO aparece quando não há cartas disponíveis

### F-039 — Label de carta selecionada no preview de combate

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

O preview de combate já aplica efeitos de REINFORCEMENTS (+50%) e INFORMANT (revela defesa). Adicionar label visual no preview quando carta está selecionada:

```
Seu Poder: ~127
  └ Ferronatos +20%
  └ 🃏 Reforços +50%
```

**Critérios de aceite:**
- Preview de combate lista cartas selecionadas como modificadores (com ícone 🃏)
- Label aparece/desaparece em tempo real ao selecionar/deselecionar carta
- Seção existente de "Cartas Disponíveis" (F-024) continua funcionando (compatibilidade)

---

## Limites

- NÃO altera a lógica de efeito das cartas — apenas melhora a visibilidade
- NÃO implementa novas cartas — trabalha com as 6 existentes
- NÃO muda o sistema de inventário de cartas

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

A seção de cartas do ExpeditionModal (F-024) já existe e este PRP adiciona destaque contextual sobre ela.
