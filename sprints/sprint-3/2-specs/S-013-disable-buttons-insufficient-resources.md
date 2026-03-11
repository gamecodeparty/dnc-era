# S-013 — Desabilitar Botoes sem Recursos Suficientes

**Discovery:** D-028 (score 10/10, frequencia 6/6)
**Tipo:** Pain — Botoes habilitados mesmo sem recursos para pagar

---

## Objetivo

Impedir que o jogador clique em acoes impossiveis. Atualmente, botoes de construcao e treinamento aparecem clicaveis mesmo quando o jogador nao tem recursos. O erro so aparece APOS o clique, desperdicando um turno em tentativas impossiveis. A correcao deve desabilitar visualmente os botoes e mostrar tooltip explicando o que falta.

O componente `TerritoryBottomSheet.tsx` ja tem logica de aviso proporcional (F-032 — icone AlertTriangle quando acao consome >80% de recurso). Esta spec adiciona a camada anterior: bloquear completamente quando recursos sao insuficientes.

---

## Implementacao

### 1. Desabilitar botao de construcao quando custo > estoque

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx`

Para cada estrutura listada no menu de construcao, comparar custo com recursos atuais do jogador:

```typescript
const canAfford = (cost: StructureCost): boolean => {
  return (cost.wood ?? 0) <= playerResources.wood
      && (cost.gold ?? 0) <= playerResources.gold
      && (cost.grain ?? 0) <= playerResources.grain;
};
```

**Quando `canAfford` retorna `false`:**
- Botao "Construir" recebe `disabled={true}`
- Cursor muda para `cursor-not-allowed`
- Opacidade reduzida: `opacity-50`
- Tooltip/label abaixo do botao: "Faltam: X madeira, Y ouro" (listar apenas recursos insuficientes)
- Cor do texto do custo insuficiente muda para vermelho (`text-red-400`)

**Quando `canAfford` retorna `true`:**
- Comportamento atual mantido (botao ativo, aviso proporcional se >80%)

### 2. Desabilitar botao de treinamento quando custo > estoque

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx` (secao de treinamento de unidades)

Mesma logica para botoes de treinar unidades (Soldado, Arqueiro, Cavaleiro, Espiao):
- Verificar custo da unidade vs recursos atuais
- Desabilitar botao + tooltip "Faltam: X ouro, Y grao"
- Verificar tambem pre-requisito de estrutura (ex: Barracks necessario para Soldado)
  - Se estrutura ausente: tooltip "Requer: Quartel" ao inves de listar recursos

### 3. Desabilitar controles de quantidade no ExpeditionModal

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Os botoes "+" de selecao de unidades para expedicao devem ser desabilitados quando:
- Nao ha mais unidades disponiveis daquele tipo no territorio de origem
- Comportamento ja parcialmente existente — garantir consistencia visual com o padrao desta spec

### 4. Slot de construcao cheio (4/4)

**Arquivo:** `/src/components/game/mobile/TerritoryBottomSheet.tsx`

Quando territorio ja tem 4 estruturas (limite maximo):
- Desabilitar TODOS os botoes de construcao
- Mensagem no topo: "Territorio lotado (4/4 estruturas)"
- Manter exibicao das estruturas existentes

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/mobile/TerritoryBottomSheet.tsx` | Logica canAfford + disabled + tooltip nos botoes de construir e treinar |
| `/src/components/game/expedition/ExpeditionModal.tsx` | Consistencia visual dos botoes "+" desabilitados |

---

## Criterios de Aceite

1. Botao "Construir" aparece desabilitado (cinza, cursor not-allowed) quando jogador nao tem recursos suficientes
2. Tooltip mostra exatamente quais recursos faltam e quanto (ex: "Faltam: 5 madeira, 10 ouro")
3. Botao "Treinar" aparece desabilitado quando jogador nao tem recursos ou nao tem estrutura pre-requisito
4. Territorio com 4/4 estruturas mostra mensagem "Territorio lotado" e desabilita construcao
5. Recursos insuficientes aparecem em vermelho no display de custo
6. Botoes habilitados continuam funcionando normalmente (sem regressao)
7. Aviso proporcional (F-032) continua funcionando para acoes possiveis mas caras
