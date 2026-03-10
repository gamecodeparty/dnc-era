# S-006 — Indicador Visual de Slots de Estrutura

**Discovery:** D-006 (score 7/10, frequencia 3/6)
**Tipo:** Pain — Limite de 4 estruturas nao comunicado

---

## Objetivo

Exibir indicador "X/4 slots" em cada territorio, tanto no mapa quanto na pagina de gerenciamento de territorio. O jogador deve saber quantos slots restam antes de construir, evitando erros irreversiveis de planejamento.

---

## Implementacao

### 1. Indicador no tile do mapa

**Arquivo:** `/src/components/game/map/Territory.tsx`

Adicionar abaixo do icone de estruturas existente (linhas 96-100):

```
De:  🏠 3
Para: 🏠 3/4
```

- Formato: `{structuresCount}/{maxSlots}`
- Cor: verde (0-2 slots usados), amarelo (3 slots), vermelho (4/4 cheio)
- Quando 4/4: exibir em vermelho com tooltip "Territorio cheio — demolir para construir"

### 2. Indicador na pagina de territorio

**Arquivo:** `/src/app/game/territory/[id]/page.tsx`

Na secao de construcao, exibir barra de slots:

```
Slots de Construcao: ████░ 3/4
```

- 4 quadrados, preenchidos = estruturas existentes, vazios = slots disponiveis
- Quando 4/4: desabilitar botao de construir com mensagem "Sem slots disponiveis"
- Tooltip em cada slot preenchido mostra nome da estrutura

### 3. Indicador no TerritoryBottomSheet (mobile)

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx`

Na grid 2x2 de estruturas (linhas 155-172), adicionar header:

```
Estruturas (3/4 slots)
```

- Mesmo esquema de cores do tile do mapa

### 4. Constante do limite

O valor `MAX_STRUCTURE_SLOTS = 4` ja existe em `/src/game/constants/balance.ts` (linha 248). Referenciar essa constante em vez de hardcodar "4".

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/map/Territory.tsx` | Mostrar "X/4" no tile |
| `/src/app/game/territory/[id]/page.tsx` | Barra de slots + desabilitar construcao quando cheio |
| `/src/components/game/mobile/TerritoryBottomSheet.tsx` | Header "X/4 slots" |

---

## Criterios de Aceite

1. Tile do mapa mostra "X/4" com estruturas atuais vs maximo
2. Cores indicam urgencia: verde (0-2), amarelo (3), vermelho (4/4)
3. Pagina de territorio mostra barra visual de slots
4. Botao de construir eh desabilitado com mensagem quando territorio esta cheio (4/4)
5. Mobile bottom sheet mostra contagem de slots no header
6. Valor maximo vem da constante `MAX_STRUCTURE_SLOTS`, nao hardcoded
