# S-027 — Badge de Bonus de Faccao Umbral

**Discovery:** D-051 (score 7/10, frequencia 2/6)
**Tipo:** Pain — Bonus de faccao Umbral (+30% eficiencia de espioes) invisivel na UI

---

## Objetivo

Exibir badge permanente no painel de cla mostrando o bonus ativo da faccao do jogador. Espa jogou toda a partida como Umbral sem poder confirmar se o bonus de +30% espionagem estava sendo aplicado. Os bonus de Ferronatos (+20% combate) e Verdaneos (+20% producao) sao parcialmente visiveis nos labels de construcao, mas Umbral nao tem equivalente.

Esta spec padroniza a exibicao de bonus de faccao para TODAS as origens, com foco em resolver a invisibilidade do Umbral.

---

## Implementacao

### 1. Badge de bonus no ClanPanel

**Arquivo:** `/src/components/game/sidebar/ClanPanel.tsx`

Adicionar secao de bonus abaixo do nome da faccao:

```
┌──────────────────────────────┐
│ Cla do Jogador               │
│ Umbral 🟣                    │
│ ┌──────────────────────────┐ │
│ │ 🗡 +30% eficiencia espiao│ │  ← badge de bonus
│ │         ATIVO ✓          │ │
│ └──────────────────────────┘ │
│ Pop: 120  | Terr: 4          │
│ Rep: 75                      │
└──────────────────────────────┘
```

**Por faccao:**
- **Ferronatos:** `⚔ +20% poder militar` — cor vermelha (`text-red-400 bg-red-950/40`)
- **Verdaneos:** `🌾 +20% producao de grao` — cor verde (`text-green-400 bg-green-950/40`)
- **Umbral:** `🗡 +30% eficiencia de espioes` — cor roxa (`text-purple-400 bg-purple-950/40`)

### 2. Dados de bonus da constante origins

**Arquivo:** `/src/game/constants/origins.ts`

Adicionar campo `bonusLabel` e `bonusIcon` ao tipo de origem (se nao existir):

```typescript
export const ORIGINS = {
  FERRONATOS: {
    name: 'Ferronatos',
    bonus: 1.2, // +20% military
    bonusLabel: '+20% poder militar',
    bonusIcon: '⚔',
    color: 'red',
  },
  VERDANEOS: {
    name: 'Verdâneos',
    bonus: 1.2, // +20% grain production
    bonusLabel: '+20% produção de grão',
    bonusIcon: '🌾',
    color: 'green',
  },
  UMBRAL: {
    name: 'Umbral',
    bonus: 1.3, // +30% spy efficiency
    bonusLabel: '+30% eficiência de espiões',
    bonusIcon: '🗡',
    color: 'purple',
  },
};
```

### 3. Tooltip com detalhamento

Tooltip ao passar o mouse/tocar no badge:
- **Ferronatos:** "Todas as suas unidades militares causam 20% mais dano em combate."
- **Verdaneos:** "Todas as suas Farms produzem 20% mais grao por turno."
- **Umbral:** "Seus espioes tem 30% mais chance de sucesso e revelam mais informacoes."

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/sidebar/ClanPanel.tsx` | Badge de bonus da faccao com icone e cor |
| `/src/game/constants/origins.ts` | Campos bonusLabel e bonusIcon por origem |

---

## Criterios de Aceite

1. ClanPanel exibe badge com bonus da faccao do jogador (texto + icone + cor)
2. Badge esta sempre visivel (nao depende de turno ou era)
3. Texto indica "ATIVO" para confirmar que o bonus esta sendo aplicado
4. Tooltip detalha o efeito mecanico do bonus
5. Todas as 3 faccoes tem badge com informacao correta
6. Cores do badge correspondem a faccao (vermelho, verde, roxo)
