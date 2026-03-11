# S-021 — Visibilidade de Tropas Inimigas no Mapa

**Discoveries:** D-042 (score 9/10, frequencia 4/6), D-047 (score 8/10, frequencia 4/6)
**Tipo:** Pain — Sem visibilidade de forca militar inimiga + defense badges apenas em territorios proprios

---

## Objetivo

Permitir que o jogador veja a forca militar de territorios inimigos no mapa, estendendo o sistema de defense badges (F-046/F-047) para todos os territorios visiveis. Atualmente, `Territory.tsx` exibe badges de poder de defesa apenas em territorios do jogador (verde/amarelo/vermelho). Territorios inimigos mostram "?" para forca desconhecida ou o valor real quando revelados por SPY. Esta spec completa a implementacao para que badges inimigos tenham diferenciacao visual clara.

Quatro agentes (Cleo, Davi, Espa, Beto) reportaram que cada decisao de ataque eh feita "por fe" sem dados sobre tropas inimigas. Davi perdeu dois territorios diretamente por nao saber a forca do adversario.

---

## Implementacao

### 1. Estimativa de forca inimiga visivel no mapa

**Arquivo:** `/src/components/game/map/Territory.tsx`

Para territorios inimigos (nao pertencentes ao jogador), exibir badge de forca com niveis de informacao:

**Nivel 1 — Sem intel (default):**
- Exibir badge com icone de espada + "?" em cinza (`text-slate-400`)
- Tooltip: "Forca desconhecida — envie um Espiao para revelar"

**Nivel 2 — Revelado por SPY:**
- Exibir badge com poder de defesa real + icone 👁 em roxo (`text-purple-400`)
- Tooltip: "Intel de espiao — expira em X turnos"
- Usar `revealedDefensePower` ja existente no Territory props

**Nivel 3 — Estimativa por combate recente (NOVO):**
- Quando o jogador atacou ou foi atacado por um territorio nos ultimos 3 turnos, exibir estimativa baseada no resultado de combate
- Badge com icone ⚔ + valor estimado em laranja (`text-orange-400`)
- Tooltip: "Estimativa baseada em combate recente"

### 2. Diferenciacao visual proprios vs inimigos

**Arquivo:** `/src/components/game/map/Territory.tsx`

Badges devem ter cores de borda distintas:
- **Territorios proprios:** borda verde (`border-green-500/60`)
- **Territorios inimigos:** borda vermelha (`border-red-500/60`)
- **Territorios neutros:** sem badge de tropas

### 3. Tracking de intel por territorio no GameState

**Arquivo:** `/src/game/types/index.ts`

Adicionar ao tipo Territory ou como estado separado:

```typescript
interface TerritoryIntel {
  territoryId: string;
  source: 'SPY' | 'COMBAT' | 'NONE';
  defensePower: number | null;
  revealedAt: number; // turno em que foi revelado
  expiresAt: number;  // turno em que expira
}
```

**Arquivo:** `/src/game/engine/GameEngine.ts`

Ao resolver combate (ataque ou defesa), registrar intel do territorio inimigo envolvido:
- `source: 'COMBAT'`
- `defensePower`: valor de defesa observado durante o combate
- `expiresAt`: turno atual + 3

### 4. Exibicao condicional por era

- **Era da Paz:** badges inimigos NAO aparecem (nao ha ameaca)
- **Era da Guerra/Invasao:** badges inimigos visiveis por default

Respeitar toggle de visibilidade existente (S-018, item 3).

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/map/Territory.tsx` | Badges inimigos com 3 niveis de intel + diferenciacao visual verde/vermelho |
| `/src/game/types/index.ts` | Interface TerritoryIntel |
| `/src/game/engine/GameEngine.ts` | Registrar intel de combate apos resolucao de batalha |
| `/src/stores/gameStore.ts` | Estado de intel por territorio (se Zustand for usado) |

---

## Criterios de Aceite

1. Territorios inimigos exibem badge "?" em cinza quando forca eh desconhecida
2. Territorios revelados por SPY exibem poder real com icone 👁 em roxo
3. Territorios com combate recente (3 turnos) exibem estimativa com icone ⚔ em laranja
4. Badges de territorios proprios tem borda verde; inimigos tem borda vermelha
5. Intel de combate expira apos 3 turnos e badge volta para "?"
6. Badges inimigos so aparecem durante Era da Guerra e Invasao
7. Toggle de visibilidade (S-018) controla badges proprios e inimigos
8. Tooltip em cada badge explica a fonte da informacao (espiao, combate, desconhecida)
