# PRP-021 — Indicadores da Horda

**Specs:** S-026
**Prioridade:** Score 7/10 (D-044 — Horda sem território específico de ataque, 4/6)
**Dependências:** Nenhuma

---

## Objetivo

Adicionar indicador visual no mapa mostrando qual território do clã-alvo será atacado pela Horda. O modal da Horda (F-049) comunica quem será atacado (clã com mais territórios) mas não qual território específico. Jogadores distribuíram tropas defensivamente sem saber onde concentrá-las.

A Horda ataca o território com menor poder de defesa do clã-alvo. Esta informação pode ser comunicada ao jogador 1 turno antes do ataque.

---

## Escopo

- **Engine:** `/src/game/engine/GameEngine.ts` — cálculo de HordaPreview no turno T-1
- **Tipos:** `/src/game/types/index.ts` — interface HordaPreview
- **Tela:** `/src/components/game/map/Territory.tsx` — badge de alvo da Horda pulsante
- **Tela:** `/src/components/game/fx/InvasionInfoModal.tsx` — linha de território-alvo no modal
- **Tela:** `/src/components/game/hud/EraIndicator.tsx` — indicador "Alvo: TX" no countdown

---

## Features

### F-068 — Cálculo de HordaPreview no GameEngine

Em `/src/game/types/index.ts`:

```typescript
interface HordaPreview {
  targetClanId: string;
  targetTerritoryId: string;
  arrivesTurn: number;
  strength: number;
}
```

Em `/src/game/engine/GameEngine.ts`:

No turno anterior ao ataque da Horda (T-1), calcular e registrar o território-alvo provisório:
- Território-alvo = território do clã-alvo com menor `defensePower`
- Em caso de empate, selecionar o com menos estruturas
- O preview é calculado no turno T-1 mas o ataque real é recalculado no turno T
- Se o jogador reforçar o território entre T-1 e T, a Horda pode mudar de alvo
- O preview mostra a **intenção atual**, não garantia

**Critérios de aceite:**
- HordaPreview calculada corretamente 1 turno antes do ataque
- Território mais fraco do clã-alvo selecionado como alvo
- Preview é provisório — ataque real pode mudar se jogador reforçar

### F-069 — Badge de alvo da Horda no mapa

Em `/src/components/game/map/Territory.tsx`:

Quando território do jogador é `hordaPreviewTarget`:
- Badge com ícone 💀 + "Alvo da Horda"
- Cor: `text-red-500 bg-red-950/70 border-red-600`
- Animação: pulse lento (`animate-pulse duration-2000`)
- Tooltip: "A Horda mira este território — ele tem a defesa mais fraca. Reforce antes do próximo turno!"

Indicador só aparece durante Era da Invasão quando há ataque da Horda agendado.

**Critérios de aceite:**
- Badge 💀 pulsante aparece no território-alvo 1 turno antes do ataque
- Tooltip explica que o território é o mais fraco e pode ser reforçado
- Indicador só aparece durante Era da Invasão

### F-070 — Info de território-alvo no modal e EraIndicator

Em `/src/components/game/fx/InvasionInfoModal.tsx`:

Adicionar linha ao modal existente da Horda quando há preview disponível:
```
Alvo atual: Território T5 (defesa: 12)
💡 Reforce este território ou a Horda pode mudar para outro alvo.
```

Em `/src/components/game/hud/EraIndicator.tsx`:

Quando countdown da Horda está em 1 turno e há preview:
- Adicionar indicador textual: "Alvo: T5" abaixo do countdown
- Cor vermelha para urgência

**Critérios de aceite:**
- Modal da Horda inclui informação de território-alvo e defesa atual
- EraIndicator mostra "Alvo: TX" quando countdown está em 1
- Informações são consistentes entre mapa, modal e HUD

---

## Limites

- NÃO altera a lógica de ataque da Horda — apenas exibe preview
- NÃO garante que a Horda atacará o território mostrado (preview é provisório)
- NÃO implementa sistema de defesa cooperativa contra a Horda

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

Complementa PRP-016 (Mecânicas da Horda) que implementou o modal informativo e countdown.
