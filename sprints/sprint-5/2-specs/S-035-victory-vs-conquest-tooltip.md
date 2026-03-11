# S-035 — Tooltip Vitoria vs Conquista no CombatPreview

**Discovery:** D-061 (score 8/10, frequencia 2/6)
**Tipo:** Pain — Jogador nao entende que vitoria de combate (ratio < 1.5) nao resulta em conquista de territorio

---

## Objetivo

Explicar no CombatPreview a distincao entre vitoria simples (ratio >= 1.0) e vitoria decisiva/conquista (ratio >= 1.5). FIO venceu um combate mas nao conquistou o territorio — gastou 4 soldados "para nada" e nunca entendeu por que. Esta confusao eh a mais fundamental para novatos.

O CombatPreview ja exibe o outcome ("Vitoria Decisiva", "Vitoria", "Incerto", "Derrota") e o ratio no `ExpeditionModal.tsx` (linhas 639-698). Falta apenas explicar o que cada outcome SIGNIFICA em termos de conquista.

---

## Implementacao

### 1. Adicionar texto explicativo por outcome

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Abaixo do display de outcome e ratio (linha ~650), adicionar texto explicativo contextual:

```typescript
const outcomeExplanation: Record<string, string> = {
  decisive_victory: "Vitória decisiva — você conquistará este território",
  victory: "Vitória parcial — tropas inimigas sofrem baixas, mas o território NÃO é conquistado",
  uncertain: "Resultado incerto — ambos os lados sofrerão perdas significativas",
  defeat: "Derrota provável — suas tropas sofrerão baixas pesadas",
};
```

Renderizar como texto abaixo do ratio:

```tsx
<p className="text-xs text-slate-400 mt-1">
  {outcomeExplanation[combatPreview.outcome]}
</p>
```

### 2. Destacar o threshold de conquista

Adicionar indicador visual do threshold 1.5x necessario para conquista:

```tsx
{combatPreview.outcome === 'victory' && (
  <p className="text-xs text-amber-400/80 mt-1">
    💡 Para conquistar: aumente para ratio ≥ 1.5x (adicione mais tropas)
  </p>
)}
```

### 3. Barra de ratio visual

Estender a barra de ratio ja existente (linhas 677-678) para incluir marcador visual no ponto 1.5:

```
[===ATK====|==1.5==|====DEF====]
            ↑ conquista
```

Se a barra existente mostra proporcao ATK/DEF, adicionar um marcador vertical fino no ponto 60% (1.5/2.5 ≈ 60%) indicando o threshold de conquista.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/expedition/ExpeditionModal.tsx` | Texto explicativo por outcome + dica para atingir conquista + marcador 1.5x na barra de ratio |

---

## Criterios de Aceite

1. Cada outcome do CombatPreview tem texto explicativo visivel abaixo do ratio
2. "Vitoria parcial" explica claramente que territorio NAO sera conquistado
3. "Vitoria decisiva" explica claramente que territorio SERA conquistado
4. Quando outcome eh "victory" (parcial), dica sugere adicionar tropas para atingir 1.5x
5. Threshold de conquista (1.5x) eh visualmente indicado na barra de ratio
6. Textos explicativos usam fonte menor (`text-xs`) para nao poluir a interface existente
