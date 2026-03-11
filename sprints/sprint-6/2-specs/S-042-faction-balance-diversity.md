# S-042 — Rebalanceamento de Faccoes para Diversidade de Arquetipos

**Discovery:** D-074 (score 8/10, frequencia 4/6), continua D-054 (score 9, S5)
**Tipo:** Pain — Ferronatos domina meta por 2 sprints consecutivos, diversidade de arquetipos limitada

---

## Objetivo

Rebalancear bonus de faccoes para que Verdaneos e Umbral sejam competitivos com Ferronatos. CAIUS venceu pelo 2o sprint consecutivo com a mesma build (Quartel T1, ataque T3, 5 territorios T10). 3/6 agentes usaram Ferronatos. O bonus +20% ataque E defesa eh categoricamente superior para qualquer estrategia que envolva expansao — e expansao eh a unica forma de vencer.

O problema eh estrutural: Ferronatos tem bonus DUPLO (ataque + defesa) enquanto Verdaneos tem bonus SINGLE (grao) e Umbral tem bonus de NICHO (espioes). A assimetria nao eh de valor — eh de aplicabilidade. Bonus militar aplica em TODA interacao de combate; bonus de grao aplica apenas na producao de 1 recurso.

A solucao eh ampliar a aplicabilidade dos bonus de Verdaneos e Umbral, nao nerfar Ferronatos.

---

## Implementacao

### 1. Buff Verdaneos: bonus de producao generalizado

**Arquivo:** `/src/game/constants/balance.ts` (linhas 164-177)

Alterar bonus Verdaneos de "+20% producao de grao" para "+15% producao de TODOS os recursos":

```typescript
// Antes:
VERDANEOS: {
  type: "grain_production",
  value: 0.20,
}

// Depois:
VERDANEOS: {
  type: "all_production",
  value: 0.15,
}
```

**Justificativa:** Grao isolado eh o recurso MENOS valioso — FIO acumulou 100+ sem saber gastar. Bonus em todos os recursos torna Verdaneos economicamente poderoso em mid/late game (mais ouro = mais tropas, mais madeira = mais estruturas). O valor reduzido de 20% para 15% compensa a ampliacao de escopo.

### 2. Atualizar ResourceSystem para bonus generalizado

**Arquivo:** `/src/game/engine/ResourceSystem.ts` (linhas 69-72)

Alterar a aplicacao do bonus:

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

### 3. Buff Umbral: bonus de visao estrategica

**Arquivo:** `/src/game/constants/balance.ts` (linhas 164-177)

Adicionar segundo bonus ao Umbral — reducao de fog of war:

```typescript
// Antes:
UMBRAL: {
  type: "spy_efficiency",
  value: 0.30,
}

// Depois:
UMBRAL: {
  type: "spy_efficiency",
  value: 0.30,
  secondary: {
    type: "fog_of_war_reduction",
    value: 0.50,  // Estimativas de ameaca 50% mais precisas
  }
}
```

**Justificativa:** O bonus de espionagem sozinho so ajuda quem constroi Shadow Guild e recruta espioes — que, como D-066 mostra, eh arriscado. Um bonus passivo de visao (estimativas de fog of war mais precisas) beneficia TODO jogador Umbral desde o T1, sem custo. O range de estimativa de ameaca (ex: "2-5 unidades") fica mais estreito para Umbral ("3-4 unidades"), reforçando a fantasia de "mestre das sombras que sabe mais que os outros".

### 4. Aplicar reducao de fog of war

**Arquivo:** `/src/game/engine/GameEngine.ts` ou componente de estimativa de ameaca

Onde a estimativa de forca inimiga eh calculada com margem de erro (±20%), reduzir a margem para Umbral:

```typescript
const fogMargin = clan.origin === "UMBRAL"
  ? 0.10  // ±10% (com bonus)
  : 0.20; // ±20% (padrao)

const estimatedPower = actualPower * (1 + (Math.random() * fogMargin * 2 - fogMargin));
```

### 5. Atualizar textos de faccao

**Arquivo:** `/src/game/constants/origins.ts`

Atualizar descricoes e labels:

```typescript
VERDANEOS: {
  bonusLabel: "+15% producao de todos os recursos",
  bonusTooltip: "Verdaneos produzem 15% mais grao, madeira e ouro em todas as estruturas de producao...",
}

UMBRAL: {
  bonusLabel: "+30% eficiencia de espioes | Estimativas 50% mais precisas",
  bonusTooltip: "Umbral tem 30% mais chance de sucesso em espionagem e estimativas de forca inimiga com margem de erro reduzida (±10% vs ±20%)...",
}
```

### 6. Atualizar ClanPanel

**Arquivo:** `/src/components/game/sidebar/ClanPanel.tsx`

O ClanPanel exibe o bonus da faccao. Verificar que o label e tooltip atualizados sao renderizados corretamente. Se Umbral tiver dois bonus, exibir ambos separados por " | " ou em linhas separadas.

---

## Analise de Impacto

| Faccao | Antes | Depois | Competitividade |
|--------|-------|--------|-----------------|
| Ferronatos | +20% atk+def | +20% atk+def (sem mudanca) | Melhor em combate direto |
| Verdaneos | +20% grao | +15% todos recursos | Economia superior em mid/late game; mais ouro = mais tropas |
| Umbral | +30% espioes | +30% espioes + estimativas ±10% | Informacao superior; decisoes mais precisas |

**Cenario esperado:** Verdaneos acumula mais recursos e pode recrutar mais tropas que Ferronatos no late game — compensa a desvantagem de combate 1:1. Umbral sabe exatamente quando atacar e quando defender — informacao perfeita eh uma vantagem enorme contra fog of war.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/game/constants/balance.ts` | Alterar `ORIGIN_BONUSES.VERDANEOS` para `all_production` 0.15; adicionar `secondary` ao Umbral |
| `/src/game/engine/ResourceSystem.ts` | Aplicar bonus Verdaneos em grao, madeira E ouro |
| `/src/game/engine/GameEngine.ts` | Reduzir margem de fog of war para Umbral (±10% vs ±20%) |
| `/src/game/constants/origins.ts` | Atualizar `bonusLabel` e `bonusTooltip` de Verdaneos e Umbral |
| `/src/components/game/sidebar/ClanPanel.tsx` | Verificar renderizacao dos novos labels de bonus |
| `/src/game/types/index.ts` | Estender tipo `OriginBonus` para suportar campo `secondary` (se necessario) |

---

## Criterios de Aceite

1. Verdaneos produz +15% em TODOS os recursos (grao, madeira, ouro) — nao apenas grao
2. ResourcePanel exibe producao correta com bonus Verdaneos aplicado a todos os recursos
3. Umbral mantem +30% eficiencia de espioes
4. Umbral tem estimativas de ameaca com margem ±10% (vs ±20% para outras faccoes)
5. Labels e tooltips de faccao atualizados em ClanPanel e tela de selecao
6. Ferronatos nao eh alterado
7. AI funciona corretamente com novos bonus (Verdaneos AI acumula mais recursos; Umbral AI tem estimativas mais precisas)
8. Bonus Verdaneos aplica apenas em estruturas de producao (Fazenda, Serraria, Mina) — nao em bonus de territorio ou outras fontes
