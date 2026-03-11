# S-040 — Rebalanceamento da Economia de Ouro

**Discovery:** D-067 (score 8/10, frequencia 4/6), relacionado D-031 (score 7, persistente desde S3)
**Tipo:** Pain — Gargalo de ouro cronico impede acao simultanea (construir + recrutar)

---

## Objetivo

Aumentar a producao base de ouro da Mina para aliviar o gargalo cronico. BALDO teve "OURO ZERO" em 7 turnos separados. ARIA em 4 turnos. 4/6 agentes sofreram com ouro insuficiente para executar duas acoes no mesmo turno (recrutar + construir).

A producao atual da Mina Nv1 (5/t) eh insuficiente para as demandas simultaneas. Um Soldado custa 5 ouro, um Cavaleiro 25 ouro, e a maioria das estruturas custa 10-30 ouro. Com producao de 5/t, cada recrutamento de Cavaleiro consome 5 turnos de producao de ouro — sem deixar margem para construcao.

A solucao deve ser conservadora: aumentar producao o suficiente para permitir 1 acao por turno sem zerar, mas nao tanto que ouro deixe de ser um recurso de gestao estrategica.

---

## Implementacao

### 1. Ajustar producao da Mina

**Arquivo:** `/src/game/constants/balance.ts` (linhas 37-44)

Alterar `PRODUCTION_PER_LEVEL.MINE`:

```typescript
// Antes:
MINE: [5, 8, 11],

// Depois:
MINE: [7, 11, 15],
```

**Justificativa dos valores:**

| Nivel | Antes | Depois | Delta | Impacto |
|-------|-------|--------|-------|---------|
| Nv1 | 5/t | 7/t | +2/t | 1 Soldado a cada 0.7t em vez de 1t. Permite recrutar + ter sobra para construir |
| Nv2 | 8/t | 11/t | +3/t | Viabiliza recrutar Arqueiro (8 ouro) e ter sobra |
| Nv3 | 11/t | 15/t | +4/t | Cavaleiro (25 ouro) em ~1.7t em vez de ~2.3t |

Com Mina Nv1 em territorio de bonus ouro: 7 × 1.25 = 8.75/t (antes: 6.25/t). Permite 1 Soldado por turno e sobra de 3.75 ouro para acumular.

### 2. Validar impacto na AI

**Arquivo:** `/src/game/ai/AIController.ts`

A AI usa os mesmos valores de `PRODUCTION_PER_LEVEL` para decisoes de construcao. O aumento beneficia AI igualmente — nenhuma alteracao de codigo necessaria na AI, mas verificar que:

- A AI nao acumula ouro em excesso (nao deve — a AI gasta agressivamente)
- O threshold de "ouro suficiente para construir" na heuristica da AI nao precisa de ajuste

### 3. Verificar ResourceSystem

**Arquivo:** `/src/game/engine/ResourceSystem.ts` (linhas 58-63)

O ResourceSystem le diretamente de `PRODUCTION_PER_LEVEL.MINE[level]`. Nenhuma alteracao de codigo necessaria — o ajuste eh puramente de constante.

### 4. Verificar ResourcePanel display

**Arquivo:** `/src/components/game/sidebar/ResourcePanel.tsx`

O display de producao (+X/t) usa valores calculados pelo ResourceSystem. Nenhuma alteracao necessaria — o display refletira automaticamente os novos valores.

---

## Analise de Risco

**Inflacao de ouro em late game:** Com 2+ Minas Nv3 (30/t total), ouro pode deixar de ser restritivo. Mitigacao: o custo de Cavaleiros (25 ouro) e estruturas Nv3 (50-70 ouro) ainda eh significativo. Monitorar no proximo playtest.

**Balanco vs Grao:** Grao (Fazenda Nv1: 10/t) ja eh abundante — FIO acumulou 100+ sem saber gastar. Ouro a 7/t ainda eh o recurso mais escasso, mantendo o papel de gargalo estrategico (nao cronico).

**Impacto em facções:** Ferronatos (militar) se beneficia marginalmente mais (recruta mais). Verdaneos nao eh afetado (bonus eh grao). Umbral se beneficia significativamente (espioes custam 10 ouro — antes 2t de producao, agora 1.4t).

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/game/constants/balance.ts` | `PRODUCTION_PER_LEVEL.MINE` de `[5, 8, 11]` para `[7, 11, 15]` |

---

## Criterios de Aceite

1. Mina Nv1 produz 7 ouro/turno (antes: 5)
2. Mina Nv2 produz 11 ouro/turno (antes: 8)
3. Mina Nv3 produz 15 ouro/turno (antes: 11)
4. Bonus de territorio ouro aplica normalmente (×1.25)
5. ResourcePanel exibe producao atualizada corretamente (+7/t para Mina Nv1)
6. AI funciona sem erros com novos valores
7. Nenhum outro arquivo referencia valores hardcoded de producao da Mina
