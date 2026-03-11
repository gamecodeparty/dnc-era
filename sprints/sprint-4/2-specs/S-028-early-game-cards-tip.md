# S-028 — Dica de Cartas no Early Game

**Discovery:** D-030 (score 7/10, frequencia 2/6)
**Tipo:** Pain — Cartas descobertas tardiamente por novatos

---

## Objetivo

Garantir que novatos descubram o sistema de cartas nos primeiros turnos, nao no turno 18 como Felix. O banner contextual no ExpeditionModal (F-037) funciona para jogadores que ja usam expedicoes estrategicamente, mas nao para quem ainda esta aprendendo o basico.

A solucao eh adicionar trigger de TipBanner proativo no early game (T3-T5), independente de contexto de batalha.

---

## Implementacao

### 1. Novo tip proativo de cartas

**Arquivo:** `/src/hooks/useTips.ts`

Adicionar ao array `TIP_DEFINITIONS`:

```typescript
{
  id: 'tip-09-cards-intro',
  trigger: (state) => {
    // Turno 3-5, jogador tem cartas, nunca usou nenhuma
    return state.currentTurn >= 3
      && state.currentTurn <= 5
      && state.playerCards > 0
      && !state.hasUsedCard;
  },
  message: '🃏 Você tem cartas na mão! Cartas dão vantagem em batalha — use ao enviar expedições de ataque. Toque no ícone de cartas para ver suas opções.',
  icon: '🃏',
  position: 'top',
}
```

### 2. Adicionar estado `hasUsedCard` ao trigger

**Arquivo:** `/src/hooks/useTips.ts`

Adicionar `hasUsedCard: boolean` ao estado do trigger, derivado dos eventos de jogo ou do game store. Verificar se existe evento de tipo `CARD_USED` no historico.

### 3. Tip de lembrete mid-game

Para jogadores que ignoraram o tip do early game:

```typescript
{
  id: 'tip-10-cards-reminder',
  trigger: (state) => {
    // Turno 10+, cartas acumuladas sem uso por 5+ turnos
    return state.currentTurn >= 10
      && state.playerCards >= 3
      && !state.hasUsedCard;
  },
  message: '🃏 Você tem ' + state.playerCards + ' cartas acumuladas! Não as desperdice — use em expedições para vantagem estratégica.',
  icon: '🃏',
  position: 'top',
}
```

**Nota:** A mensagem com contagem dinamica requer que o template suporte interpolacao. Se o sistema atual nao suporta, usar mensagem estatica: "Você tem cartas acumuladas sem uso! Use-as em expedições."

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/hooks/useTips.ts` | Tips tip-09 (intro T3-5) e tip-10 (reminder T10+) + campo hasUsedCard |

---

## Criterios de Aceite

1. TipBanner de cartas aparece nos turnos 3-5 se jogador tem cartas e nunca usou nenhuma
2. TipBanner de lembrete aparece no turno 10+ se jogador tem 3+ cartas sem uso
3. Cada tip aparece no maximo 1 vez (persistido em localStorage)
4. Tips nao aparecem se jogador ja usou ao menos 1 carta
5. Tips respeitam prioridade e fila do sistema existente (maximo 1 visivel por vez)
