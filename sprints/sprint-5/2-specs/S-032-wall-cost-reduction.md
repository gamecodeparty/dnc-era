# S-032 — Reducao Custo Muralha Nv1

**Discovery:** D-053 (score 9/10, frequencia 3/6)
**Tipo:** Pain — Custo de Muralha Nv1 inviabiliza estrategia defensiva early
**Depende de:** S-031 (consolidacao de custos — fonte unica de verdade)

---

## Objetivo

Reduzir o custo da Muralha Nv1 para tornar estrategias defensivas viaveis na Era da Paz. Apos S-031, a fonte canonica sera `balance.ts`, que ja define Muralha Nv1 como `{wood: 25, gold: 10}`. Se S-031 estiver concluida, o valor correto ja esta em vigor.

Contexto: BALDO gastou toda a Era da Paz (7 turnos) acumulando 50 madeira para UMA Muralha. Quando finalmente construiu (T8), foi destruido no T9. Com custo de 25 madeira, teria construido no T4 e sobrevivido.

**Esta spec existe para garantir que o valor final apos S-031 seja validado e, se necessario, ajustado.**

---

## Implementacao

### 1. Validar custo pos-S-031

**Arquivo:** `/src/game/constants/balance.ts` (linha 112-114)

Apos S-031, confirmar que o custo ativo da Muralha Nv1 eh:
```typescript
WALL: [
  { wood: 25, gold: 10 },    // Level 1 — reduzido de 50 para viabilizar defesa early
  { wood: 40, gold: 20 },    // Level 2
  { wood: 60, gold: 30 },    // Level 3
],
```

### 2. Rebalanceamento de niveis superiores (se necessario)

Se os niveis 2 e 3 da Muralha parecerem proporcionalmente caros em relacao ao Nv1 reduzido, considerar:
- Nv2: `{ wood: 35, gold: 15 }` (reduzido de 40/20)
- Nv3: `{ wood: 50, gold: 25 }` (reduzido de 60/30)

Porem, o pain principal eh o Nv1. Niveis superiores podem permanecer como estao se o Nv1 resolver o problema de viabilidade early.

### 3. Nenhuma alteracao de mecanica

A Muralha mantem:
- `+20%` de bonus de defesa por nivel (COMBAT.WALL_DEFENSE_BONUS = 0.20)
- Restricao de 1 Muralha por territorio
- Nenhuma producao de recursos

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/game/constants/balance.ts` | Confirmar/ajustar custo WALL nivel 1 para `{wood: 25, gold: 10}` |

---

## Criterios de Aceite

1. Muralha Nv1 custa 25 madeira e 10 ouro (nao 50 madeira)
2. Com recursos iniciais (50 madeira, 50 ouro), jogador pode construir Muralha Nv1 ja no turno 1-2 (se priorizar)
3. AI defensiva (DEFENDER personality) consegue construir Muralha antes da Era da Guerra
4. Custos de Nv2 e Nv3 permanecem proporcionais e progressivos
5. Bonus de defesa (+20% por nivel) nao eh alterado
