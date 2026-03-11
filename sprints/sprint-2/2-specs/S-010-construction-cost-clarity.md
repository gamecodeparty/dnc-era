# S-010 — Clareza de Custos de Construcao

**Discovery:** D-019 (score 7/10, frequencia 4/6)
**Tipo:** Pain — Custos de construcao contraintuitivos

---

## Objetivo

Tornar os custos de construcao auto-explicativos para que o jogador nao cometa erros de premissa economica. A Serraria (que produz madeira) custa madeira + ouro para construir, e a Fazenda (que produz grao) custa madeira + ouro. Nenhuma estrutura de producao custa o recurso que produz, o que eh correto por design (evita bootstrap paradox), mas confunde jogadores que assumem o contrario.

O alívio eh informacional: tooltips e labels que explicam o que a estrutura faz antes de o jogador confirmar a construcao.

---

## Implementacao

### 1. Tooltip "Produz X" nas estruturas do menu de construcao

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx` (ou componente de construcao associado)

Para cada estrutura listada no menu de construcao, adicionar label abaixo do nome:

```
┌────────────────────────────┐
│  Serraria               Lv1│
│  Produz: Madeira (+8/turno)│
│  Custo: 🪵 5  💰 10        │
│                   [Construir]│
└────────────────────────────┘
```

**Dados:**
- Buscar `produces` e `productionPerLevel` de `/src/game/constants/structures.ts`
- Estruturas militares: "Desbloqueia: Soldado, Arqueiro" (Quartel) ou "Desbloqueia: Cavaleiro" (Estabulo)
- Muralha: "Defesa: +20% por nivel"
- Taverna: "Gera cartas a cada X turnos"
- Guilda das Sombras: "Desbloqueia: Espiao"

### 2. Icones de recurso nos custos com labels

**Arquivo:** mesmo componente de construcao

Substituir display numerico puro por icone + nome do recurso + quantidade:
- Antes: `10 🪵 5 💰` (ambiguo)
- Depois: `Madeira: 10  Ouro: 5` com icone colorido

Usar cores consistentes:
- Grao: amber/yellow
- Madeira: green/emerald
- Ouro: yellow/gold

Quando o jogador nao tem recurso suficiente, manter o comportamento existente (preco em vermelho) mas adicionar texto "(insuficiente)".

### 3. Tooltip de diferenciacao "Produz vs Consome"

Ao fazer hover/long-press no custo de uma estrutura de producao, exibir tooltip:
- "Serraria produz Madeira mas nao custa Madeira para construir"
- Apenas para estruturas de producao (FARM, SAWMILL, MINE) onde ha potencial de confusao

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/mobile/TerritoryBottomSheet.tsx` | Labels "Produz X" e custos com nomes |
| `/src/game/constants/structures.ts` | Referencia de dados (sem alteracao) |

---

## Criterios de Aceite

1. Cada estrutura no menu de construcao exibe o que produz/desbloqueia abaixo do nome
2. Custos exibem nome do recurso + icone + quantidade (nao apenas numeros)
3. Estruturas de producao (Farm, Sawmill, Mine) tem tooltip explicando "produz X, custa Y"
4. Quando recurso insuficiente, custo aparece em vermelho com "(insuficiente)"
5. Informacoes sao visiveis sem precisar de hover em mobile (labels diretos, nao apenas tooltip)
