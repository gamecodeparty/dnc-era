# PRP-028 — UX de Expedição e Combate

**Specs:** S-034, S-035
**Prioridade:** Score 8/10 (D-058 — sem aviso território desprotegido, 3/6) + Score 8/10 (D-061 — vitória ≠ conquista não explicado, 2/6)
**Dependências:** Nenhuma

---

## Objetivo

Melhorar a clareza de informação no fluxo de expedição e combate no `ExpeditionModal`. Dois problemas distintos mas relacionados:

1. **Território desprotegido:** ARIA perdeu T0 (base com 8 turnos de infraestrutura) ao enviar todas as tropas em expedição. FIO enviou TODOS os soldados e ficou 3 turnos sem defesa. Nenhum aviso aparece.

2. **Vitória ≠ conquista:** FIO venceu um combate mas não conquistou o território — gastou 4 soldados "para nada" e nunca entendeu por quê. O CombatPreview mostra outcome e ratio, mas não explica que ratio < 1.5 = sem conquista.

Ambas as melhorias concentram-se no `ExpeditionModal.tsx`.

---

## Escopo

- **Tela:** `/src/components/game/expedition/ExpeditionModal.tsx` — AlertDialog de confirmação + textos explicativos no CombatPreview

---

## Features

### F-088 — Modal de confirmação ao desproteger território

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

Antes de executar `sendExpedition`, calcular unidades restantes no território de origem:

```typescript
const remainingUnits = Object.entries(availableUnits).reduce((sum, [type, qty]) => {
  const sent = selectedUnits[type] ?? 0;
  return sum + (qty - sent);
}, 0);
```

Se `remainingUnits === 0`, exibir AlertDialog (shadcn/ui):

```
⚠️ Território desprotegido!

O Território {position + 1} ficará com 0 unidades após esta expedição.
Qualquer ataque inimigo conquistará este território sem resistência.

[Cancelar]  [Enviar mesmo assim]
```

**Critérios de aceite:**
- Modal de confirmação aparece ao enviar expedição que deixa território com 0 unidades
- Modal identifica território por posição
- Jogador pode cancelar ou confirmar
- Modal usa AlertDialog do shadcn/ui

### F-089 — Aviso leve para defesa fraca (1-2 unidades restantes)

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

Se `remainingUnits > 0` mas `remainingUnits <= 2`, exibir banner amarelo não-bloqueante acima do botão "Enviar":

```
⚠️ Defesa fraca: Território {position + 1} ficará com apenas {remainingUnits} unidade(s).
```

Expedições do tipo `REINFORCE` não exibem nenhum aviso de desprotecão.

**Critérios de aceite:**
- Banner amarelo aparece quando restam 1-2 unidades
- Banner é não-bloqueante (não exige confirmação)
- Expedições REINFORCE não exibem aviso
- Aviso não aparece durante Era da Paz (sem ameaça de ataque)

### F-090 — Texto explicativo por outcome no CombatPreview

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

Abaixo do display de outcome e ratio, adicionar texto explicativo contextual:

```typescript
const outcomeExplanation = {
  decisive_victory: "Vitória decisiva — você conquistará este território",
  victory: "Vitória parcial — tropas inimigas sofrem baixas, mas o território NÃO é conquistado",
  uncertain: "Resultado incerto — ambos os lados sofrerão perdas significativas",
  defeat: "Derrota provável — suas tropas sofrerão baixas pesadas",
};
```

Renderizar como `text-xs text-slate-400` abaixo do ratio.

**Critérios de aceite:**
- Cada outcome tem texto explicativo visível
- "Vitória parcial" explica que território NÃO será conquistado
- "Vitória decisiva" explica que território SERÁ conquistado
- Textos usam `text-xs` para não poluir interface

### F-091 — Dica de threshold de conquista e marcador visual

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

Quando outcome é "victory" (parcial), adicionar dica:

```tsx
{combatPreview.outcome === 'victory' && (
  <p className="text-xs text-amber-400/80 mt-1">
    💡 Para conquistar: aumente para ratio ≥ 1.5x (adicione mais tropas)
  </p>
)}
```

Adicionar marcador visual no ponto 1.5x na barra de ratio existente, indicando o threshold de conquista.

**Critérios de aceite:**
- Dica sugere adicionar tropas quando outcome é "victory" parcial
- Threshold 1.5x visualmente indicado na barra de ratio
- Marcador não aparece para outros outcomes (decisive_victory, uncertain, defeat)

---

## Limites

- NÃO altera lógica de combate ou expedição — apenas melhora informação visual
- NÃO implementa cancelamento de expedição em andamento
- NÃO adiciona seleção de tropas a partir do mapa
- NÃO modifica cálculo de ratio ou thresholds de combate

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
