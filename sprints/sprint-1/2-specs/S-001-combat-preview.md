# S-001 — Preview de Combate

**Discovery:** D-001 (score 10/10, frequencia 6/6)
**Tipo:** Pain — Combate as cegas

---

## Objetivo

Exibir uma estimativa de resultado antes de confirmar o ataque no `ExpeditionModal`. O jogador deve ver poder de ataque vs defesa estimada e uma indicacao qualitativa (alta/media/baixa chance de vitoria) antes de enviar a expedicao.

O backend ja possui `CombatSystem.previewCombat()` em `/src/game/engine/CombatSystem.ts` (linhas 15-101) que retorna `CombatPreview` com `attackerPower`, `defenderPower`, `estimatedOutcome`. Porem o jogo roda client-side via Zustand — portanto a logica de preview deve ser replicada no client usando os mesmos calculos.

---

## Implementacao

### 1. Funcao de preview client-side

**Arquivo:** `/src/stores/gameStore.ts`

Adicionar funcao utilitaria (nao action do store) que calcula o preview:

```typescript
function calculateCombatPreview(
  attackingUnits: Unit[],
  defenderTerritory: Territory,
  attackerOrigin: string,   // origin ID do atacante
  defenderOrigin: string    // origin ID do defensor
): CombatPreview
```

**Retorno:**
```typescript
interface CombatPreview {
  attackPower: number;
  defensePower: number;
  ratio: number;            // attackPower / defensePower
  outcome: 'decisive_victory' | 'victory' | 'uncertain' | 'defeat';
  attackerModifiers: string[];  // ex: ["Ferronatos +20%"]
  defenderModifiers: string[];  // ex: ["Wall Lv2 +40%"]
}
```

**Logica:**
- `attackPower` = soma de `unit.atk` das unidades selecionadas, aplicando bonus de facção do atacante (Ferronatos: *1.2)
- `defensePower` = soma de `unit.def` das unidades no territorio defensor + bonus de Wall (20% por nivel) + bonus de facção do defensor
- `outcome`:
  - `ratio > 1.5` → `decisive_victory`
  - `ratio > 1.0` → `victory`
  - `ratio > 0.7` → `uncertain`
  - `ratio <= 0.7` → `defeat`
- Os modificadores listam quais bonus estao ativos de cada lado

### 2. UI no ExpeditionModal

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Quando o tipo da expedicao for `ATTACK` e houver unidades selecionadas, exibir painel de preview abaixo da selecao de unidades:

```
┌─────────────────────────────────┐
│  ⚔ Preview de Combate           │
│                                 │
│  Seu Poder:      ~85            │
│    └ Ferronatos +20%            │
│                                 │
│  Defesa Estimada: ~60           │
│    └ Wall Lv1 +20%              │
│                                 │
│  Chance: ALTA ████████░░        │
│  (Vitoria provavel)             │
└─────────────────────────────────┘
```

**Comportamento:**
- Recalcular em tempo real conforme o jogador adiciona/remove unidades
- Usar cores: verde (decisive_victory/victory), amarelo (uncertain), vermelho (defeat)
- Mostrar barra de proporcao visual (attackPower vs defensePower)
- Se o territorio defensor for de AI e o jogador nao tem SPY, mostrar "Defesa estimada: ~X (sem reconhecimento)" com icone de interrogacao

### 3. Visibilidade parcial (fog of war leve)

- Se o jogador NAO tem informacao de reconhecimento (SPY), a defesa exibida deve ter margem de erro: mostrar como "~X" (aproximado)
- Se o jogador usou SPY ou carta Informante no territorio, mostrar valor exato sem "~"
- Isso prepara a integracao futura com SPY (S-004)

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | Adicionar `calculateCombatPreview()` |
| `/src/game/types/index.ts` | Adicionar interface `CombatPreview` |
| `/src/components/game/expedition/ExpeditionModal.tsx` | Renderizar painel de preview |

---

## Criterios de Aceite

1. Ao abrir ExpeditionModal para ataque, painel de preview aparece assim que pelo menos 1 unidade eh selecionada
2. Preview atualiza em tempo real ao mudar selecao de unidades
3. Valores de ataque e defesa sao coerentes com o resultado real do combate (mesma formula)
4. Modificadores de facção e Wall sao listados quando aplicaveis
5. Indicacao qualitativa (alta/media/baixa/derrota) eh exibida com cor correspondente
6. Defesa de territorios sem reconhecimento mostra valor aproximado com "~"
