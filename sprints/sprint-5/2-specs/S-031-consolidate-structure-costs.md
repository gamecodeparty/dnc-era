# S-031 — Consolidacao de Custos de Estruturas (Single Source of Truth)

**Discovery:** D-063 (score 8/10, frequencia 2/6)
**Tipo:** Bug — Duas definicoes divergentes de STRUCTURE_COSTS no codebase

---

## Objetivo

Eliminar a duplicacao de custos de estruturas entre `balance.ts` e `gameStore.ts`. Atualmente existem duas definicoes de `STRUCTURE_COSTS`:

- **`/src/game/constants/balance.ts` (linhas 86-127):** Definicao por nivel (3 niveis), usa apenas `wood` e `gold`. Importada por `structures.ts` e `AIController.ts`.
- **`/src/stores/gameStore.ts` (linhas 193-202):** Definicao flat (sem niveis), usa `grain`, `wood`, `gold` com valores diferentes. Importada pela UI do territorio (`/src/app/game/territory/[id]/page.tsx`).

Exemplo de divergencia: Serraria em `balance.ts` = `{wood: 5, gold: 10}` (Nv1), em `gameStore.ts` = `{grain: 15, gold: 10}`. Muralha em `balance.ts` = `{wood: 25, gold: 10}` (Nv1), em `gameStore.ts` = `{wood: 50, gold: 20}`.

ARIA (Agent-A) encontrou esta inconsistencia no turno 2 da sessao de playtesting. A divergencia afeta confianca do jogador e impede validacao automatizada.

---

## Implementacao

### 1. Remover STRUCTURE_COSTS duplicado do gameStore

**Arquivo:** `/src/stores/gameStore.ts`

Remover a exportacao `STRUCTURE_COSTS` (linhas 193-202). Esta definicao eh a fonte do bug — valores flat, sem suporte a niveis, e com custos divergentes dos canonicos.

### 2. Atualizar importacoes na UI do territorio

**Arquivo:** `/src/app/game/territory/[id]/page.tsx`

Alterar a importacao de `STRUCTURE_COSTS` de `gameStore.ts` para `@/game/constants/balance` (ou `@/game/constants/structures` que ja re-exporta via `costPerLevel`).

Como `balance.ts` usa arrays por nivel, a UI deve usar o nivel atual da estrutura para indexar o custo correto:

```typescript
import { STRUCTURE_COSTS } from "@/game/constants/balance";

// Onde antes era:
// const cost = STRUCTURE_COSTS[structureType];
// Agora:
const currentLevel = territory.structures[structureType]?.level ?? 0;
const cost = STRUCTURE_COSTS[structureType][currentLevel]; // index 0 = nv1, 1 = nv2, 2 = nv3
```

### 3. Atualizar funcao buildStructure no gameStore

**Arquivo:** `/src/stores/gameStore.ts`

A funcao `buildStructure` (que usa `STRUCTURE_COSTS` na linha 723) deve importar de `balance.ts` e indexar pelo nivel correto da estrutura sendo construida/upgradada.

### 4. Atualizar funcao getResourceWarnings no gameStore

**Arquivo:** `/src/stores/gameStore.ts`

Se `getResourceWarnings` (linhas 170-191) referencia `STRUCTURE_COSTS` do gameStore, atualizar para usar `balance.ts` com indice de nivel.

### 5. Verificar AIController

**Arquivo:** `/src/game/ai/AIController.ts`

Ja importa de `@/game/constants` (que exporta de `balance.ts`). Verificar que o acesso por nivel esta correto (linhas 273, 410). Como AI ja usa niveis, deve estar ok.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | Remover `STRUCTURE_COSTS` duplicado; atualizar `buildStructure` e `getResourceWarnings` para importar de `balance.ts` com indice de nivel |
| `/src/app/game/territory/[id]/page.tsx` | Alterar import de `STRUCTURE_COSTS` para `@/game/constants/balance`; usar indice de nivel |
| `/src/game/constants/balance.ts` | Nenhuma alteracao (ja eh a fonte canonica) |
| `/src/game/constants/structures.ts` | Nenhuma alteracao (ja importa de `balance.ts`) |

---

## Criterios de Aceite

1. Existe apenas UMA definicao de `STRUCTURE_COSTS` no codebase (em `balance.ts`)
2. A UI do territorio exibe custos identicos aos usados pela AI e pelo engine
3. Custos sao indexados por nivel da estrutura (Nv1, Nv2, Nv3)
4. `grep -r "STRUCTURE_COSTS" src/stores/` retorna zero definicoes (apenas importacoes)
5. Construcao de estrutura na UI consome os recursos corretos conforme `balance.ts`
6. Nenhum campo `grain` aparece em custos de construcao (balance.ts usa apenas `wood` e `gold`)
