# S-025 — Mercado de Conversao de Grao

**Discovery:** D-038 (score 7/10, frequencia 4/6)
**Tipo:** Pain — Grao acumula sem uso no late game (persistente S3/S4)

---

## Objetivo

Criar sumidouro para grao acumulado no late game. Ariana tinha 350+ de grao no turno 38 sem nada para fazer com ele. Espa ficava sem ouro constantemente enquanto grao apodrecia. O problema afeta todos os perfis economicos — grao eh abundante, ouro eh escasso, e nao ha mecanismo de conversao.

A solucao eh um **mercado simples** que permite converter grao em ouro ou madeira com taxa de cambio desfavoravel (para nao trivializar economia).

---

## Implementacao

### 1. Acao de Mercado no menu de territorio

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx`

Adicionar tab/secao "Mercado" no bottom sheet de territorio que tenha Tavern construida:

```
┌──────────────────────────────────┐
│ 🏪 Mercado (Taverna)             │
│                                  │
│ Vender Grao:                     │
│  30 🌾 → 10 🪵  [Trocar]        │
│  40 🌾 → 10 💰  [Trocar]        │
│                                  │
│ Limite: 1 troca por turno        │
└──────────────────────────────────┘
```

**Taxas de conversao:**
- 30 grao → 10 madeira (3:1)
- 40 grao → 10 ouro (4:1)

Taxas intencionalmente desfavoraveis para que mercado seja valvula de escape, nao estrategia principal.

### 2. Pre-requisito: Tavern

O mercado so esta disponivel em territorios com Tavern construida. Isso da proposito adicional a uma estrutura que atualmente tem uso limitado.

- Sem Tavern: secao "Mercado" nao aparece
- Com Tavern: secao "Mercado" visivel com opcoes de troca

### 3. Limite por turno

**Arquivo:** `/src/game/engine/GameEngine.ts`

- Maximo 1 troca de mercado por turno por territorio com Tavern
- Se jogador tem 2 Taverns em territorios diferentes, pode fazer 2 trocas por turno
- Estado de "troca usada neste turno" resetado no inicio de cada turno

### 4. Logica de troca

**Arquivo:** `/src/game/engine/GameEngine.ts`

Nova acao no processamento de turno:

```typescript
interface MarketAction {
  type: 'MARKET_TRADE';
  territoryId: string;
  trade: 'GRAIN_TO_WOOD' | 'GRAIN_TO_GOLD';
}
```

Validacoes:
- Territorio tem Tavern
- Jogador tem recursos suficientes (30 grao ou 40 grao)
- Nao excedeu limite de trocas do turno para este territorio

### 5. Feedback visual

- Ao completar troca: animacao de ResourcePopup (ja existente) mostrando "-30 🌾 +10 🪵"
- Botao "Trocar" desabilitado se jogador nao tem grao suficiente (consistente com S-013)
- Botao desabilitado se troca ja usada neste turno, tooltip: "Limite de trocas atingido este turno"

---

## Constantes de Balanceamento

**Arquivo:** `/src/game/constants/balance.ts`

```typescript
export const MARKET = {
  GRAIN_TO_WOOD_COST: 30,
  GRAIN_TO_WOOD_YIELD: 10,
  GRAIN_TO_GOLD_COST: 40,
  GRAIN_TO_GOLD_YIELD: 10,
  TRADES_PER_TURN_PER_TAVERN: 1,
};
```

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/mobile/TerritoryBottomSheet.tsx` | Secao Mercado com botoes de troca |
| `/src/game/engine/GameEngine.ts` | Acao MARKET_TRADE + validacao + limite por turno |
| `/src/game/types/index.ts` | Interface MarketAction |
| `/src/game/constants/balance.ts` | Constantes de taxa de cambio |

---

## Criterios de Aceite

1. Secao "Mercado" aparece no bottom sheet de territorios com Tavern
2. Jogador pode trocar 30 grao por 10 madeira
3. Jogador pode trocar 40 grao por 10 ouro
4. Maximo 1 troca por turno por Tavern
5. Botao desabilitado quando recursos insuficientes ou limite atingido
6. ResourcePopup mostra resultado da troca
7. Sem Tavern construida, secao Mercado nao aparece
8. Trocas resetam a cada novo turno
