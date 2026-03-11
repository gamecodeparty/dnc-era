# S-026 — Indicador de Territorio-Alvo da Horda

**Discovery:** D-044 (score 7/10, frequencia 4/6)
**Tipo:** Pain — Horda nao indica territorio especifico de ataque dentro do cla-alvo

---

## Objetivo

Adicionar indicador visual no mapa mostrando qual territorio do cla-alvo sera atacado pela Horda. O modal da Horda (F-049) comunica quem sera atacado (cla com mais territorios) mas nao qual territorio especifico. Jogadores distribuiram tropas defensivamente sem saber onde concentra-las.

A Horda ataca o territorio com menor poder de defesa do cla-alvo (conforme `GameEngine.ts` linhas 143-155). Esta informacao pode ser comunicada ao jogador 1 turno antes do ataque.

---

## Implementacao

### 1. Determinar territorio-alvo da Horda com antecedencia

**Arquivo:** `/src/game/engine/GameEngine.ts`

No turno anterior ao ataque da Horda (T-1), calcular e registrar o territorio-alvo provisorio:

```typescript
interface HordaPreview {
  targetClanId: string;
  targetTerritoryId: string; // territorio mais fraco do cla-alvo
  arrivesTurn: number;
  strength: number;
}
```

O territorio-alvo eh o do cla-alvo com menor `defensePower`. Em caso de empate, selecionar o com menos estruturas.

**Importante:** O preview eh calculado no turno T-1 mas o ataque real eh recalculado no turno T. Se o jogador reforcar o territorio entre T-1 e T, a Horda pode mudar de alvo. O preview mostra a **intencao atual**, nao garantia.

### 2. Indicador visual no mapa

**Arquivo:** `/src/components/game/map/Territory.tsx`

Quando territorio do jogador eh `hordaPreviewTarget`:

```
┌──────────────────┐
│ T5    💀 HORDA   │  ← badge vermelho-escuro pulsante
│ Verdaneos        │
│ 🌾 +10           │
│       ⚔ 12       │
│ ■■□□  🏗2        │
└──────────────────┘
```

**Estilo:**
- Badge com icone 💀 + "Alvo da Horda"
- Cor: `text-red-500 bg-red-950/70 border-red-600`
- Animacao: pulse lento (`animate-pulse duration-2000`)
- Tooltip: "A Horda mira este territorio — ele tem a defesa mais fraca. Reforce antes do proximo turno!"

### 3. Informacao no Modal da Horda

**Arquivo:** `/src/components/game/fx/InvasionInfoModal.tsx`

Adicionar linha ao modal existente da Horda quando ha preview disponivel:

```
Alvo atual: Território T5 (defesa: 12)
💡 Reforce este território ou a Horda pode mudar para outro alvo.
```

### 4. Integracao com EraIndicator

**Arquivo:** `/src/components/game/hud/EraIndicator.tsx`

Quando countdown da Horda esta em 1 turno e ha preview:
- Adicionar indicador textual: "Alvo: T5" abaixo do countdown
- Cor vermelha para urgencia

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/game/engine/GameEngine.ts` | Calculo de HordaPreview no turno T-1 |
| `/src/game/types/index.ts` | Interface HordaPreview |
| `/src/components/game/map/Territory.tsx` | Badge de alvo da Horda pulsante |
| `/src/components/game/fx/InvasionInfoModal.tsx` | Linha de territorio-alvo no modal |
| `/src/components/game/hud/EraIndicator.tsx` | Indicador "Alvo: TX" no countdown |

---

## Criterios de Aceite

1. 1 turno antes do ataque da Horda, territorio-alvo (menor defesa) mostra badge 💀 pulsante
2. Tooltip do badge explica que o territorio eh o mais fraco e pode ser reforçado
3. Modal da Horda inclui informacao de territorio-alvo e defesa atual
4. EraIndicator mostra "Alvo: TX" quando countdown esta em 1
5. Se jogador reforca o territorio-alvo, a Horda pode mudar de alvo no turno real (preview nao eh garantia)
6. Indicador so aparece durante Era da Invasao quando ha ataque da Horda agendado
