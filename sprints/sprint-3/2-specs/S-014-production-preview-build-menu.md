# S-014 — Preview de Producao no Menu de Construcao

**Discovery:** D-029 (score 9/10, frequencia 6/6)
**Tipo:** Pain — Sem preview de producao/beneficio antes de construir estrutura

---

## Objetivo

Mostrar o que cada estrutura produz/desbloqueia ANTES de o jogador confirmar a construcao. Atualmente o menu de construcao exibe apenas o custo, forcando o jogador a adivinhar se Farm, Sawmill ou Mine eh a melhor escolha. A funcao `getStructureLabel()` em `structures.ts` ja retorna descricoes legíveis — esta spec conecta essa informacao ao UI.

A spec S-010 (sprint-2) ja adicionou tooltips de custo com icones e "Produz vs Consome". Esta spec complementa com a producao numerica explicita visivel sem hover.

---

## Implementacao

### 1. Label de producao visivel no card de estrutura

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx` (secao de construcao)

Adicionar linha de producao abaixo do nome de cada estrutura no menu, usando dados de `/src/game/constants/structures.ts`:

**Estruturas de producao:**
```
Farm Lv1         Custo: 🪵10 💰5
+10 grão/turno
```
```
Sawmill Lv1      Custo: 🪵5 💰10
+8 madeira/turno
```
```
Mine Lv1         Custo: 🪵15 💰5
+5 ouro/turno
```

**Estruturas militares:**
```
Quartel Lv1      Custo: 🪵20 💰15
Desbloqueia: Soldado, Arqueiro
```
```
Estábulo Lv1     Custo: 🪵30 💰25
Desbloqueia: Cavaleiro
```

**Estruturas especiais:**
```
Muralha Lv1      Custo: 🪵25 💰10
Defesa: +20% por nível
```
```
Taverna Lv1      Custo: 🪵15 💰20
Gera cartas a cada X turnos
```
```
Guilda Sombras Lv1  Custo: 🪵20 💰30
Desbloqueia: Espião
```

**Implementacao:**
- Usar `getStructureLabel()` de `structures.ts` para obter a descricao
- Se a estrutura ja existe no territorio (upgrade), mostrar producao do proximo nivel: "+15 grão/turno (atual: +10)"
- Cor da label de producao: usar cor do recurso (amber para grao, emerald para madeira, yellow para ouro)

### 2. Comparacao de producao por turno

Abaixo da lista de estruturas disponiveis, adicionar resumo de producao atual do territorio:

```
Produção atual: 🌾10/t  🪵8/t  💰0/t
```

Isso da contexto para o jogador decidir qual estrutura construir a seguir.

### 3. Dados de producao

**Arquivo:** `/src/game/constants/structures.ts` (referencia, sem alteracao)

Producao por nivel ja definida:
- FARM: [10, 15, 20] grao/turno
- SAWMILL: [8, 12, 16] madeira/turno
- MINE: [5, 8, 11] ouro/turno

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/mobile/TerritoryBottomSheet.tsx` | Labels de producao nas opcoes de construcao + resumo de producao do territorio |
| `/src/game/constants/structures.ts` | Referencia de dados (sem alteracao necessaria — `getStructureLabel()` ja existe) |

---

## Criterios de Aceite

1. Cada estrutura no menu de construcao exibe o que produz/desbloqueia em texto visivel (nao apenas tooltip)
2. Estruturas de producao mostram valor numerico: "+X recurso/turno"
3. Estruturas militares mostram "Desbloqueia: [unidades]"
4. Muralha mostra "Defesa: +20% por nível"
5. Upgrade mostra producao do proximo nivel E producao atual: "+15 (atual: +10)"
6. Resumo de producao atual do territorio aparece na secao de construcao
7. Cores dos recursos sao consistentes (amber=grao, emerald=madeira, yellow=ouro)
