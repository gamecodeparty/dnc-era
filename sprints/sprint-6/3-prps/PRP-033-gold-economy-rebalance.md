# PRP-033 — Rebalanceamento da Economia de Ouro

**Specs:** S-040
**Prioridade:** Score 8/10 (D-067 — gargalo de ouro crônico, 4/6, relacionado D-031 persistente desde S3)
**Dependências:** Nenhuma

---

## Objetivo

Aumentar a produção base de ouro da Mina para aliviar o gargalo crônico. BALDO teve "OURO ZERO" em 7 turnos separados. ARIA em 4 turnos. 4/6 agentes não conseguiram executar duas ações no mesmo turno (recrutar + construir) por falta de ouro.

A produção atual da Mina Nv1 (5/t) é insuficiente: um Soldado custa 5 ouro, um Cavaleiro 25 ouro, e a maioria das estruturas custa 10-30 ouro. Com 5/t, cada recrutamento de Cavaleiro consome 5 turnos de produção. O ajuste é conservador: permitir 1 ação por turno sem zerar, sem eliminar ouro como recurso de gestão estratégica.

---

## Escopo

- **Constantes:** `/src/game/constants/balance.ts` — `PRODUCTION_PER_LEVEL.MINE`

---

## Features

### F-104 — Ajustar produção da Mina em balance.ts

Em `/src/game/constants/balance.ts`:

Alterar `PRODUCTION_PER_LEVEL.MINE`:

```typescript
// Antes:
MINE: [5, 8, 11],

// Depois:
MINE: [7, 11, 15],
```

Justificativa dos valores:

| Nível | Antes | Depois | Delta | Impacto |
|-------|-------|--------|-------|---------|
| Nv1 | 5/t | 7/t | +2/t | 1 Soldado a cada 0.7t em vez de 1t. Permite recrutar + ter sobra |
| Nv2 | 8/t | 11/t | +3/t | Viabiliza recrutar Arqueiro (8 ouro) e ter sobra |
| Nv3 | 11/t | 15/t | +4/t | Cavaleiro (25 ouro) em ~1.7t em vez de ~2.3t |

Com Mina Nv1 em território de bônus ouro: 7 × 1.25 = 8.75/t (antes: 6.25/t).

**Critérios de aceite:**
- Mina Nv1 produz 7 ouro/turno (antes: 5)
- Mina Nv2 produz 11 ouro/turno (antes: 8)
- Mina Nv3 produz 15 ouro/turno (antes: 11)
- Bônus de território ouro aplica normalmente (×1.25)
- ResourcePanel exibe produção atualizada corretamente (+7/t para Mina Nv1)
- AI funciona sem erros com novos valores (usa mesma constante)
- Nenhum outro arquivo referencia valores hardcoded de produção da Mina

---

## Limites

- NÃO altera produção de Fazenda ou Serraria
- NÃO adiciona conversão grão→ouro (alternativa descartada)
- NÃO altera custos de recrutamento ou construção
- NÃO modifica lógica da AI — apenas a constante que ela já consome

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

É um PRP de feature única (F-104) — alteração de constante em um único arquivo.
