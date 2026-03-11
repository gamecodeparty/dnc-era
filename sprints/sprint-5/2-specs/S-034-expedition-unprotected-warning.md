# S-034 — Modal de Confirmacao ao Desproteger Territorio em Expedicao

**Discovery:** D-058 (score 8/10, frequencia 3/6)
**Tipo:** Pain — Sem aviso ao lancar expedicao deixando territorio de origem com 0 unidades

---

## Objetivo

Adicionar modal de confirmacao quando o jogador envia uma expedicao que deixa o territorio de origem sem unidades militares. ARIA perdeu T0 (base com 8 turnos de infraestrutura) ao desproteger. FIO enviou TODOS os soldados e ficou 3 turnos sem defesa.

O `ExpeditionModal.tsx` ja calcula `expeditionStats.totalUnits` e verifica unidades disponiveis por territorio (linhas 321, 405). Falta apenas o check de "territorio fica vazio" antes de confirmar o envio.

---

## Implementacao

### 1. Calcular unidades restantes no territorio de origem

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Antes de executar `sendExpedition` (ao clicar "Enviar"), calcular quantas unidades restam no territorio de origem apos a expedicao:

```typescript
const remainingUnits = Object.entries(availableUnits).reduce((sum, [type, qty]) => {
  const sent = selectedUnits[type] ?? 0;
  return sum + (qty - sent);
}, 0);
```

### 2. Exibir alerta de confirmacao

Se `remainingUnits === 0`, exibir modal/dialog de confirmacao antes de enviar:

```
⚠️ Território desprotegido!

O Território {position + 1} ficará com 0 unidades após esta expedição.
Qualquer ataque inimigo conquistará este território sem resistência.

[Cancelar]  [Enviar mesmo assim]
```

Usar componente `AlertDialog` do shadcn/ui (ja disponivel no projeto).

### 3. Alerta gradual para poucos soldados

Se `remainingUnits > 0` mas `remainingUnits <= 2`, exibir aviso mais leve (nao-bloqueante):

```
⚠️ Defesa fraca: Território {position + 1} ficará com apenas {remainingUnits} unidade(s).
```

Este aviso pode ser um banner amarelo acima do botao "Enviar", sem exigir confirmacao.

### 4. Nao exibir para expedicoes de Reforco

Expedicoes do tipo `REINFORCE` movem tropas PARA um territorio — nao precisam de aviso de desprotecao (o territorio de destino ganha tropas). Verificar `expeditionType !== 'REINFORCE'` antes de mostrar o alerta.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/expedition/ExpeditionModal.tsx` | Calculo de unidades restantes + AlertDialog de confirmacao |

---

## Criterios de Aceite

1. Ao enviar expedicao que deixa territorio de origem com 0 unidades, modal de confirmacao aparece
2. Modal identifica o territorio por posicao ("Territorio 1")
3. Jogador pode cancelar ou confirmar o envio
4. Aviso leve (banner, nao modal) aparece quando restam 1-2 unidades
5. Expedicoes de tipo REINFORCE nao exibem aviso de desprotecao
6. Modal usa componente AlertDialog do shadcn/ui
7. Aviso nao aparece durante Era da Paz (sem ameaca de ataque)
