# S-039 — Aviso Contextual ao Construir Shadow Guild Sem Economia

**Discovery:** D-066 (score 9/10, frequencia 1/6 mas 100% Umbral, CRITICO)
**Tipo:** Pain — Deadlock economico irrecuperavel para jogadores Umbral

---

## Objetivo

Adicionar aviso contextual quando o jogador tenta construir Shadow Guild como primeira estrutura (ou sem nenhuma estrutura produtiva no territorio). EZRA gastou 30 ouro em Shadow Guild + 20 ouro em espioes = 50 ouro em T2, ficando sem fonte de ouro e sem capacidade de construir qualquer estrutura produtiva. Eliminado em T8.

O design da faccao Umbral convida o jogador a fazer exatamente o que o mata: a descricao diz "Centro de espionagem" e a faccao diz "+30% eficiencia espioes", entao o jogador constroi Shadow Guild primeiro — e entra em deadlock.

O aviso NAO deve ser bloqueante — apenas informativo. Jogadores experientes podem optar por Shadow Guild early conscientemente.

---

## Implementacao

### 1. Detectar condicao de risco

**Arquivo:** `/src/stores/gameStore.ts`

Na funcao `build()` (linhas 807-848), apos validacoes existentes e ANTES de executar a construcao, verificar:

```typescript
const hasProductionStructure = clan.territories.some(t =>
  t.structures.some(s =>
    ["FARM", "SAWMILL", "MINE"].includes(s.type)
  )
);

const isSpecialStructure = ["SHADOW_GUILD", "TAVERN"].includes(structureType);

if (isSpecialStructure && !hasProductionStructure) {
  // Disparar aviso contextual — nao bloquear a construcao
}
```

A verificacao eh global (todos os territorios do clan), nao local. Se o jogador ja tem Fazenda em outro territorio, ele tem renda — o aviso nao aparece.

### 2. UI do aviso

**Arquivo:** `/src/app/game/territory/[id]/page.tsx`

Adicionar dialog de confirmacao (nao toast — precisa de atencao ativa) quando a condicao de risco for detectada:

```
⚠️ Estrutura Especializada

"Guilda das Sombras" nao produz recursos.
Voce ainda nao tem nenhuma estrutura de producao (Fazenda, Serraria ou Mina).

Construir sem renda pode criar um gargalo economico dificil de recuperar.

💡 Sugestao: construa uma Fazenda ou Mina primeiro para garantir renda base.

[Construir Mesmo Assim]  [Cancelar]
```

O botao "Construir Mesmo Assim" executa a construcao normalmente. "Cancelar" fecha o dialog sem acao.

### 3. TipBanner para faccao Umbral no T1

**Arquivo:** `/src/components/game/hud/TipBanner.tsx`

Adicionar tip contextual para jogadores Umbral no turno 1:

```
💡 Dica Umbral: Sua faccao brilha com espioes, mas espioes custam ouro.
Construa uma Fazenda e Mina antes da Guilda das Sombras para garantir renda.
```

Este tip aparece apenas para `clan.origin === "UMBRAL"` no turno 1, e segue o padrao de TipBanner ja existente no codebase (implementado em S4).

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/gameStore.ts` | Adicionar verificacao `hasProductionStructure` na funcao `build()`; retornar flag de aviso |
| `/src/app/game/territory/[id]/page.tsx` | Dialog de confirmacao quando construir estrutura especial sem producao |
| `/src/components/game/hud/TipBanner.tsx` | Adicionar tip contextual para Umbral no T1 |

---

## Criterios de Aceite

1. Ao construir Shadow Guild (ou Taverna) sem nenhuma estrutura de producao em qualquer territorio, dialog de confirmacao aparece
2. Dialog explica que a estrutura nao produz recursos e sugere construir producao primeiro
3. Dialog tem botao "Construir Mesmo Assim" que executa a construcao normalmente
4. Dialog tem botao "Cancelar" que aborta a construcao
5. Se jogador ja tem Fazenda/Serraria/Mina em QUALQUER territorio, dialog NAO aparece
6. Jogadores Umbral recebem TipBanner no T1 com dica de build order
7. Aviso nao eh bloqueante — jogador pode ignorar e construir
8. Aviso aparece para TODAS as faccoes, nao apenas Umbral (qualquer jogador pode cometer o erro)
