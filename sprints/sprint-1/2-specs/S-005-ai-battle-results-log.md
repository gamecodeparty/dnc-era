# S-005 — Resultado de Batalhas entre AIs no Log

**Discovery:** D-005 (score 7/10, frequencia 4/6)
**Tipo:** Pain — Batalhas AI sem resultado

---

## Objetivo

Quando AIs combatem entre si durante `processTurn()`, o log de eventos deve mostrar o resultado completo: vencedor, perdedor, baixas estimadas e conquista de territorio (se houve). Atualmente o evento mostra apenas "AI3 atacou AI2" sem desfecho.

---

## Implementacao

### 1. Enriquecer evento de combate AI

**Arquivo:** `/src/stores/gameStore.ts` (dentro de `processTurn()`)

Na secao onde combates entre AIs sao resolvidos, o evento adicionado ao log deve incluir:

```typescript
addEvent({
  type: 'COMBAT',
  data: {
    attackerClanId: string,
    attackerClanName: string,
    defenderClanId: string,
    defenderClanName: string,
    territoryId: string,
    territoryName: string,
    result: 'victory' | 'defeat' | 'draw',
    attackerLosses: number,    // unidades perdidas pelo atacante
    defenderLosses: number,    // unidades perdidas pelo defensor
    territoryConquered: boolean,
    isPlayerInvolved: false     // flag para diferenciar combates AI vs jogador
  }
});
```

### 2. Formatacao na UI do log

**Arquivo:** `/src/components/game/mobile/TabContent.tsx` (secao de log, linhas 164-201)

Adicionar formatacao para eventos `COMBAT` com `isPlayerInvolved: false`:

```
⚔ AI3 (Ferronatos) atacou AI2 (Verdaneos) em T5
  → Vitoria de AI3! Territorio conquistado.
  → Baixas: AI3 perdeu ~8 unidades, AI2 perdeu ~15 unidades.
```

**Regras de formatacao:**
- Combates entre AIs: cor neutra (cinza/azul)
- Combates envolvendo jogador: cor verde (vitoria) ou vermelho (derrota) — ja existente
- Se territorio foi conquistado, mencionar explicitamente
- Baixas como valores aproximados ("~X") para manter fog of war, a menos que jogador tenha SPY (S-004)

### 3. Desktop event log

Se houver componente de log no sidebar desktop, aplicar mesma formatacao.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | Enriquecer dados do evento COMBAT entre AIs |
| `/src/components/game/mobile/TabContent.tsx` | Formatar eventos COMBAT com resultado |

---

## Criterios de Aceite

1. Combates entre AIs aparecem no log com resultado (vitoria/derrota/empate)
2. Baixas estimadas sao exibidas para ambos os lados
3. Conquista de territorio eh mencionada quando ocorre
4. Eventos de combate AI sao visualmente distintos dos combates do jogador
5. Informacao de baixas eh aproximada (fog of war) exceto com reconhecimento SPY
