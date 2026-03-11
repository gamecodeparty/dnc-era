# PRP-005 — Transparência de Informação

**Specs:** S-005, S-006
**Prioridade:** Score 7/10 (D-005 batalhas AI sem resultado + D-006 slots de estrutura invisíveis)
**Dependências:** Nenhuma

---

## Objetivo

Melhorar a transparência de informação para o jogador em dois eixos: (1) mostrar resultados completos de batalhas entre AIs no log de eventos, e (2) exibir indicador de slots de estrutura ("X/4") em territórios. Ambas são correções de UI de baixo esforço e alto impacto.

---

## Escopo

- **Store:** Enriquecer dados do evento COMBAT em `gameStore`
- **Log UI:** Formatar eventos de combate AI com resultado em `TabContent`
- **Mapa:** Indicador "X/4" no tile de território
- **Tela território:** Barra visual de slots + desabilitar construção quando cheio
- **Mobile:** Header de slots no `TerritoryBottomSheet`

---

## Features

### F-015 — Enriquecer evento COMBAT no gameStore

Em `/src/stores/gameStore.ts` (dentro de `processTurn()`), na seção onde combates entre AIs são resolvidos, enriquecer o evento adicionado ao log:

```typescript
addEvent({
  type: 'COMBAT',
  data: {
    attackerClanId, attackerClanName,
    defenderClanId, defenderClanName,
    territoryId, territoryName,
    result: 'victory' | 'defeat' | 'draw',
    attackerLosses: number,
    defenderLosses: number,
    territoryConquered: boolean,
    isPlayerInvolved: false
  }
});
```

**Critérios de aceite:**
- Eventos de combate AI incluem resultado, baixas e conquista
- Flag `isPlayerInvolved` distingue combates AI de combates do jogador

### F-016 — Formatação de batalhas AI no log UI

Em `/src/components/game/mobile/TabContent.tsx` (seção de log):

Formatar eventos COMBAT com `isPlayerInvolved: false`:
```
⚔ AI3 (Ferronatos) atacou AI2 (Verdaneos) em T5
  → Vitória de AI3! Território conquistado.
  → Baixas: AI3 perdeu ~8 unidades, AI2 perdeu ~15 unidades.
```

Regras:
- Combates AI: cor neutra (cinza/azul)
- Combates jogador: manter cores existentes (verde vitória, vermelho derrota)
- Baixas como "~X" (fog of war) — exato quando território revelado por SPY (PRP-004)

Se houver componente de log no sidebar desktop, aplicar mesma formatação.

**Critérios de aceite:**
- Combates AI aparecem no log com resultado completo
- Visualmente distintos dos combates do jogador
- Conquista de território mencionada quando ocorre

### F-017 — Indicador X/4 no tile do mapa

Em `/src/components/game/map/Territory.tsx`:

Alterar exibição de estruturas de `🏠 3` para `🏠 3/4`.

- Formato: `{structuresCount}/{MAX_STRUCTURE_SLOTS}`
- Cor: verde (0-2 usados), amarelo (3), vermelho (4/4 cheio)
- Quando 4/4: tooltip "Território cheio — demolir para construir"
- Usar constante `MAX_STRUCTURE_SLOTS` de `/src/game/constants/balance.ts`

**Critérios de aceite:**
- Tile mostra "X/4" com contagem correta
- Cores indicam urgência
- Valor máximo vem da constante, não hardcoded

### F-018 — Barra de slots na página de território

Em `/src/app/game/territory/[id]/page.tsx`:

Na seção de construção, exibir barra visual de slots:
```
Slots de Construção: ████░ 3/4
```

- 4 quadrados: preenchidos = existentes, vazios = disponíveis
- Quando 4/4: desabilitar botão de construir com mensagem "Sem slots disponíveis"
- Tooltip em cada slot preenchido mostra nome da estrutura

**Critérios de aceite:**
- Barra visual de slots visível na página de território
- Botão de construir desabilitado quando 4/4
- Mensagem clara quando território cheio

### F-019 — Header de slots no TerritoryBottomSheet

Em `/src/components/game/mobile/TerritoryBottomSheet.tsx`:

Na grid 2x2 de estruturas, adicionar header: `Estruturas (3/4 slots)`

- Mesmo esquema de cores do tile do mapa

**Critérios de aceite:**
- Header mostra contagem de slots
- Cores consistentes com tile do mapa

---

## Limites

- NÃO altera lógica de combate entre AIs — apenas exibição
- NÃO implementa demolição de estruturas — apenas comunica o limite
- NÃO adiciona som ou animação aos eventos de combate
- NÃO mostra baixas exatas de AIs (mantém fog-of-war com "~X")

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

Integração opcional com PRP-004 (SPY): se território revelado, mostrar baixas exatas em vez de "~X".
