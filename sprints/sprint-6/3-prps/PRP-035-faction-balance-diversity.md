# PRP-035 — Rebalanceamento de Facções para Diversidade

**Specs:** S-042
**Prioridade:** Score 8/10 (D-074 — meta-dominância Ferronatos 2 sprints consecutivos, 4/6, continua D-054)
**Dependências:** Nenhuma

---

## Objetivo

Rebalancear bônus de facções para que Verdâneos e Umbral sejam competitivos com Ferronatos. CAIUS venceu pelo 2º sprint consecutivo com a mesma build (Quartel T1, ataque T3, 5 territórios T10). 3/6 agentes usaram Ferronatos. O bônus +20% ataque E defesa é categoricamente superior para qualquer estratégia que envolva expansão.

O problema é estrutural: Ferronatos tem bônus DUPLO (ataque + defesa), Verdâneos tem bônus SINGLE (+20% grão), Umbral tem bônus de NICHO (+30% espiões). A assimetria não é de valor — é de aplicabilidade.

A solução amplia a aplicabilidade dos bônus de Verdâneos e Umbral, sem nerfar Ferronatos.

---

## Escopo

- **Constantes:** `/src/game/constants/balance.ts` — `ORIGIN_BONUSES` para Verdâneos e Umbral
- **Engine:** `/src/game/engine/ResourceSystem.ts` — aplicar bônus Verdâneos em todos os recursos
- **Engine:** `/src/game/engine/GameEngine.ts` — reduzir margem de fog of war para Umbral
- **Constantes:** `/src/game/constants/origins.ts` — atualizar labels e tooltips
- **Tipos:** `/src/game/types/index.ts` — estender `OriginBonus` para suportar `secondary`
- **Tela:** `/src/components/game/sidebar/ClanPanel.tsx` — renderizar novos labels de bônus

---

## Features

### F-107 — Buff Verdâneos: bônus de produção generalizado

Em `/src/game/constants/balance.ts` e `/src/game/engine/ResourceSystem.ts`:

Alterar bônus Verdâneos de "+20% produção de grão" para "+15% produção de TODOS os recursos":

```typescript
// balance.ts — Antes:
VERDANEOS: { type: "grain_production", value: 0.20 }

// balance.ts — Depois:
VERDANEOS: { type: "all_production", value: 0.15 }
```

Em `ResourceSystem.ts`, alterar a aplicação do bônus:

```typescript
// Antes:
if (clan.origin === "VERDANEOS") {
  grainProduction *= 1 + ORIGIN_BONUSES.VERDANEOS.value;
}

// Depois:
if (clan.origin === "VERDANEOS") {
  const bonus = 1 + ORIGIN_BONUSES.VERDANEOS.value;
  grainProduction *= bonus;
  woodProduction *= bonus;
  goldProduction *= bonus;
}
```

**Critérios de aceite:**
- Verdâneos produz +15% em TODOS os recursos (grão, madeira, ouro)
- ResourcePanel exibe produção correta com bônus aplicado a todos os recursos
- Bônus aplica apenas em estruturas de produção (Fazenda, Serraria, Mina) — não em bônus de território
- AI Verdâneos funciona corretamente com novos valores

### F-108 — Buff Umbral: redução de fog of war

Em `/src/game/constants/balance.ts` e `/src/game/engine/GameEngine.ts`:

Adicionar segundo bônus ao Umbral — estimativas de ameaça mais precisas:

```typescript
// balance.ts — Antes:
UMBRAL: { type: "spy_efficiency", value: 0.30 }

// balance.ts — Depois:
UMBRAL: {
  type: "spy_efficiency",
  value: 0.30,
  secondary: { type: "fog_of_war_reduction", value: 0.50 }
}
```

Em `GameEngine.ts`, onde a estimativa de força inimiga é calculada com margem de erro:

```typescript
const fogMargin = clan.origin === "UMBRAL"
  ? 0.10  // ±10% (com bônus)
  : 0.20; // ±20% (padrão)
```

Se necessário, estender tipo `OriginBonus` em `/src/game/types/index.ts` para suportar campo `secondary`.

**Critérios de aceite:**
- Umbral mantém +30% eficiência de espiões
- Umbral tem estimativas de ameaça com margem ±10% (vs ±20% para outras facções)
- Estimativas mais precisas aplicam desde T1 (bônus passivo, sem custo)
- AI Umbral funciona corretamente com estimativas mais precisas

### F-109 — Atualizar textos de facção e ClanPanel

Em `/src/game/constants/origins.ts` e `/src/components/game/sidebar/ClanPanel.tsx`:

Atualizar labels e tooltips:

```typescript
// origins.ts
VERDANEOS: {
  bonusLabel: "+15% produção de todos os recursos",
  bonusTooltip: "Verdâneos produzem 15% mais grão, madeira e ouro em todas as estruturas de produção.",
}

UMBRAL: {
  bonusLabel: "+30% eficiência de espiões | Estimativas 50% mais precisas",
  bonusTooltip: "Umbral tem 30% mais chance de sucesso em espionagem e estimativas de força inimiga com margem de erro reduzida (±10% vs ±20%).",
}
```

Verificar que ClanPanel renderiza corretamente os novos labels. Se Umbral tiver dois bônus, exibir ambos separados por " | " ou em linhas separadas.

**Critérios de aceite:**
- Labels de facção atualizados em ClanPanel e tela de seleção
- Verdâneos: "+15% produção de todos os recursos"
- Umbral: ambos bônus visíveis (espiões + estimativas)
- Tooltips explicam a mecânica de cada bônus
- Ferronatos não é alterado

---

## Limites

- NÃO nerfa Ferronatos — apenas buffa Verdâneos e Umbral
- NÃO adiciona novos tipos de bônus de facção além dos descritos
- NÃO altera mecânicas de combate ou espionagem
- NÃO implementa sistema de escolha de sub-bônus por facção

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

F-109 depende de F-107 e F-108 (textos refletem as mudanças mecânicas). F-107 e F-108 são independentes entre si.
