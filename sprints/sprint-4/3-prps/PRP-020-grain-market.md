# PRP-020 — Mercado de Grão

**Specs:** S-025
**Prioridade:** Score 7/10 (D-038 — grão acumula sem uso no late game, 4/6) — persistente S3/S4
**Dependências:** Nenhuma

---

## Objetivo

Criar sumidouro para grão acumulado no late game. Ariana tinha 350+ de grão no turno 38 sem nada para fazer com ele. Espa ficava sem ouro constantemente enquanto grão apodrecia. O problema afeta todos os perfis econômicos — grão é abundante, ouro é escasso, e não há mecanismo de conversão.

A solução é um mercado simples vinculado à Tavern que permite converter grão em ouro ou madeira com taxa de câmbio desfavorável.

---

## Escopo

- **Tela:** `/src/components/game/mobile/TerritoryBottomSheet.tsx` — seção Mercado com botões de troca
- **Engine:** `/src/game/engine/GameEngine.ts` — ação MARKET_TRADE + validação + limite por turno
- **Tipos:** `/src/game/types/index.ts` — interface MarketAction
- **Constantes:** `/src/game/constants/balance.ts` — taxas de câmbio

---

## Features

### F-065 — UI do Mercado no TerritoryBottomSheet

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:

Adicionar tab/seção "Mercado" no bottom sheet de território que tenha Tavern construída:

```
┌──────────────────────────────────┐
│ 🏪 Mercado (Taverna)             │
│                                  │
│ Vender Grão:                     │
│  30 🌾 → 10 🪵  [Trocar]        │
│  40 🌾 → 10 💰  [Trocar]        │
│                                  │
│ Limite: 1 troca por turno        │
└──────────────────────────────────┘
```

- Sem Tavern: seção "Mercado" não aparece
- Botão "Trocar" desabilitado se jogador não tem grão suficiente (consistente com F-033)
- Botão desabilitado se troca já usada neste turno, tooltip: "Limite de trocas atingido este turno"
- Ao completar troca: animação de ResourcePopup (já existente) mostrando "-30 🌾 +10 🪵"

**Critérios de aceite:**
- Seção "Mercado" aparece no bottom sheet de territórios com Tavern
- Botão desabilitado quando recursos insuficientes ou limite atingido
- ResourcePopup mostra resultado da troca
- Sem Tavern construída, seção Mercado não aparece

### F-066 — Ação MARKET_TRADE no GameEngine

Em `/src/game/types/index.ts`:

```typescript
interface MarketAction {
  type: 'MARKET_TRADE';
  territoryId: string;
  trade: 'GRAIN_TO_WOOD' | 'GRAIN_TO_GOLD';
}
```

Em `/src/game/engine/GameEngine.ts`:

Nova ação no processamento de turno com validações:
- Território tem Tavern
- Jogador tem recursos suficientes (30 grão ou 40 grão)
- Não excedeu limite de trocas do turno para este território
- Máximo 1 troca por turno por território com Tavern
- Se jogador tem 2 Taverns em territórios diferentes, pode fazer 2 trocas por turno
- Estado de "troca usada neste turno" resetado no início de cada turno

**Critérios de aceite:**
- Jogador pode trocar 30 grão por 10 madeira
- Jogador pode trocar 40 grão por 10 ouro
- Máximo 1 troca por turno por Tavern
- Trocas resetam a cada novo turno
- Validações impedem trocas inválidas

### F-067 — Constantes de balanceamento do mercado

Em `/src/game/constants/balance.ts`:

```typescript
export const MARKET = {
  GRAIN_TO_WOOD_COST: 30,
  GRAIN_TO_WOOD_YIELD: 10,
  GRAIN_TO_GOLD_COST: 40,
  GRAIN_TO_GOLD_YIELD: 10,
  TRADES_PER_TURN_PER_TAVERN: 1,
};
```

Taxas intencionalmente desfavoráveis (3:1 e 4:1) para que mercado seja válvula de escape, não estratégia principal.

**Critérios de aceite:**
- Constantes definidas em balance.ts e usadas pela engine e UI
- Nenhum valor hardcoded na UI ou engine

---

## Limites

- NÃO implementa compra/venda bidirecional (apenas grão → outros)
- NÃO implementa preços dinâmicos ou flutuação de mercado
- NÃO permite AI usar o mercado (apenas jogador humano)
- NÃO implementa comércio entre clãs

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
