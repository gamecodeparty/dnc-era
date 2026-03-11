# PRP-026 — Consolidação de Custos de Estruturas e Redução da Muralha

**Specs:** S-031, S-032
**Prioridade:** Score 9/10 (D-053 — custo muralha inviabiliza defesa early, 3/6) + Score 8/10 (D-063 — bug inconsistência balance.ts vs gameStore.ts, 2/6)
**Dependências:** Nenhuma

---

## Objetivo

Eliminar a duplicação de custos de estruturas entre `balance.ts` e `gameStore.ts` e, com a fonte única estabelecida, confirmar que a Muralha Nv1 custa 25 madeira (não 50), viabilizando estratégias defensivas na Era da Paz.

Atualmente existem duas definições divergentes de `STRUCTURE_COSTS`: uma em `balance.ts` (por nível, usada pela AI e engine) e outra em `gameStore.ts` (flat, usada pela UI). Exemplo: Muralha em `balance.ts` = `{wood: 25, gold: 10}` Nv1, em `gameStore.ts` = `{wood: 50, gold: 20}`. BALDO gastou 7 turnos inteiros acumulando 50 madeira para UMA Muralha e foi destruído 1 turno depois. Com custo correto de 25, teria construído no T4 e sobrevivido.

---

## Escopo

- **Constantes:** `/src/game/constants/balance.ts` — fonte canônica de custos (confirmar valores)
- **Store:** `/src/stores/gameStore.ts` — remover `STRUCTURE_COSTS` duplicado, atualizar `buildStructure` e `getResourceWarnings`
- **Tela:** `/src/app/game/territory/[id]/page.tsx` — alterar import para `balance.ts` com índice de nível

---

## Features

### F-081 — Remover STRUCTURE_COSTS duplicado do gameStore

Em `/src/stores/gameStore.ts`:

Remover a exportação `STRUCTURE_COSTS` (linhas 193-202). Esta definição é a fonte do bug — valores flat, sem suporte a níveis, com custos divergentes dos canônicos.

**Critérios de aceite:**
- `STRUCTURE_COSTS` não existe mais em `gameStore.ts` (nem como export nem como const interna)
- `grep -r "STRUCTURE_COSTS" src/stores/` retorna zero definições

### F-082 — Atualizar buildStructure para usar balance.ts

Em `/src/stores/gameStore.ts`:

A função `buildStructure` deve importar `STRUCTURE_COSTS` de `@/game/constants/balance` e indexar pelo nível correto da estrutura sendo construída/upgradada:

```typescript
import { STRUCTURE_COSTS } from "@/game/constants/balance";

// Na função buildStructure:
const currentLevel = territory.structures[structureType]?.level ?? 0;
const cost = STRUCTURE_COSTS[structureType][currentLevel]; // index 0 = nv1
```

Atualizar também `getResourceWarnings` se referencia `STRUCTURE_COSTS` local.

**Critérios de aceite:**
- `buildStructure` consome recursos conforme `balance.ts` com índice de nível
- `getResourceWarnings` usa mesma fonte de custos
- Construção de Muralha Nv1 consome 25 madeira + 10 ouro (não 50 madeira)

### F-083 — Atualizar UI do território para custos por nível

Em `/src/app/game/territory/[id]/page.tsx`:

Alterar importação de `STRUCTURE_COSTS` de `gameStore.ts` para `@/game/constants/balance`. Usar nível atual da estrutura para indexar o custo correto:

```typescript
import { STRUCTURE_COSTS } from "@/game/constants/balance";

const currentLevel = territory.structures[structureType]?.level ?? 0;
const cost = STRUCTURE_COSTS[structureType][currentLevel];
```

**Critérios de aceite:**
- UI do território exibe custos idênticos aos usados pela AI e pelo engine
- Custos são indexados por nível da estrutura (Nv1, Nv2, Nv3)
- Nenhum campo `grain` aparece em custos de construção (balance.ts usa apenas `wood` e `gold`)

### F-084 — Validar custo Muralha Nv1 = 25 madeira

Em `/src/game/constants/balance.ts`:

Confirmar que o custo da Muralha Nv1 é `{wood: 25, gold: 10}`. Se por alguma razão o valor foi diferente, ajustar para:

```typescript
WALL: [
  { wood: 25, gold: 10 },    // Level 1 — viabiliza defesa early
  { wood: 40, gold: 20 },    // Level 2
  { wood: 60, gold: 30 },    // Level 3
],
```

**Critérios de aceite:**
- Muralha Nv1 custa 25 madeira e 10 ouro
- Com recursos iniciais (50 madeira, 50 ouro), jogador pode construir Muralha Nv1 no turno 1-2
- AI defensiva (DEFENDER) consegue construir Muralha antes da Era da Guerra
- Bônus de defesa (+20% por nível) não é alterado

---

## Limites

- NÃO altera mecânica de construção — apenas consolida fonte de dados e ajusta valores
- NÃO adiciona novos tipos de estrutura
- NÃO altera custos de estruturas além da Muralha (Farm, Sawmill, Mine, etc. mantêm valores de `balance.ts`)
- NÃO implementa UI de preview de upgrade (coberto por features futuras)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

F-082 e F-083 dependem de F-081 (remoção do duplicado antes de re-apontar imports). F-084 depende de F-081/F-082 estarem concluídas (fonte única ativa).
