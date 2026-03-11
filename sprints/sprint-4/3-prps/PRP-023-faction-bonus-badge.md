# PRP-023 — Badge de Bônus de Facção

**Specs:** S-027
**Prioridade:** Score 7/10 (D-051 — bônus Umbral invisível, 2/6)
**Dependências:** Nenhuma

---

## Objetivo

Exibir badge permanente no painel de clã mostrando o bônus ativo da facção do jogador. Espa jogou toda a partida como Umbral sem poder confirmar se o bônus de +30% espionagem estava sendo aplicado. Os bônus de Ferronatos (+20% combate) e Verdâneos (+20% produção) são parcialmente visíveis nos labels de construção, mas Umbral não tem equivalente.

Esta PRP padroniza a exibição de bônus de facção para TODAS as origens.

---

## Escopo

- **Tela:** `/src/components/game/sidebar/ClanPanel.tsx` — badge de bônus com ícone e cor
- **Dados:** `/src/game/constants/origins.ts` — campos bonusLabel e bonusIcon por origem

---

## Features

### F-074 — Badge de bônus no ClanPanel

Em `/src/components/game/sidebar/ClanPanel.tsx`:

Adicionar seção de bônus abaixo do nome da facção:

```
┌──────────────────────────────┐
│ Clã do Jogador               │
│ Umbral 🟣                    │
│ ┌──────────────────────────┐ │
│ │ 🗡 +30% eficiência espião│ │
│ │         ATIVO ✓          │ │
│ └──────────────────────────┘ │
│ Pop: 120  | Terr: 4          │
│ Rep: 75                      │
└──────────────────────────────┘
```

**Por facção:**
- **Ferronatos:** `⚔ +20% poder militar` — cor vermelha (`text-red-400 bg-red-950/40`)
- **Verdâneos:** `🌾 +20% produção de grão` — cor verde (`text-green-400 bg-green-950/40`)
- **Umbral:** `🗡 +30% eficiência de espiões` — cor roxa (`text-purple-400 bg-purple-950/40`)

Tooltip ao tocar no badge:
- **Ferronatos:** "Todas as suas unidades militares causam 20% mais dano em combate."
- **Verdâneos:** "Todas as suas Farms produzem 20% mais grão por turno."
- **Umbral:** "Seus espiões têm 30% mais chance de sucesso e revelam mais informações."

**Critérios de aceite:**
- ClanPanel exibe badge com bônus da facção do jogador (texto + ícone + cor)
- Badge está sempre visível (não depende de turno ou era)
- Texto indica "ATIVO" para confirmar que o bônus está sendo aplicado
- Tooltip detalha o efeito mecânico do bônus
- Todas as 3 facções têm badge com informação correta
- Cores do badge correspondem à facção (vermelho, verde, roxo)

### F-075 — Dados de bônus nas constantes de origins

Em `/src/game/constants/origins.ts`:

Adicionar campos `bonusLabel`, `bonusIcon` e `bonusTooltip` ao tipo de origem:

```typescript
export const ORIGINS = {
  FERRONATOS: {
    name: 'Ferronatos',
    bonus: 1.2,
    bonusLabel: '+20% poder militar',
    bonusIcon: '⚔',
    bonusTooltip: 'Todas as suas unidades militares causam 20% mais dano em combate.',
    color: 'red',
  },
  VERDANEOS: {
    name: 'Verdâneos',
    bonus: 1.2,
    bonusLabel: '+20% produção de grão',
    bonusIcon: '🌾',
    bonusTooltip: 'Todas as suas Farms produzem 20% mais grão por turno.',
    color: 'green',
  },
  UMBRAL: {
    name: 'Umbral',
    bonus: 1.3,
    bonusLabel: '+30% eficiência de espiões',
    bonusIcon: '🗡',
    bonusTooltip: 'Seus espiões têm 30% mais chance de sucesso e revelam mais informações.',
    color: 'purple',
  },
};
```

**Critérios de aceite:**
- Campos bonusLabel, bonusIcon e bonusTooltip definidos para todas as 3 origens
- ClanPanel consome dados das constantes (sem hardcode no componente)

---

## Limites

- NÃO altera a lógica de cálculo dos bônus — apenas exibe informação
- NÃO implementa bônus dinâmicos ou variáveis
- NÃO exibe bônus de facções inimigas (apenas do jogador)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
