# PRP-032 — Aviso Contextual Shadow Guild Sem Economia

**Specs:** S-039
**Prioridade:** Score 9/10 (D-066 — deadlock econômico Shadow Guild, 1/6 mas 100% Umbral, CRÍTICO)
**Dependências:** Nenhuma

---

## Objetivo

Adicionar aviso contextual quando o jogador tenta construir Shadow Guild (ou Taverna) como primeira estrutura, sem nenhuma estrutura produtiva em qualquer território. EZRA gastou 30 ouro em Shadow Guild + 20 ouro em espiões = 50 ouro em T2, ficando sem fonte de renda e sem capacidade de recuperação. Eliminado em T8.

O design da facção Umbral convida o jogador a fazer exatamente o que o mata: a descrição diz "Centro de espionagem" e a facção diz "+30% eficiência espiões", então o jogador constrói Shadow Guild primeiro — e entra em deadlock irrecuperável.

O aviso NÃO deve ser bloqueante — apenas informativo. Jogadores experientes podem optar por Shadow Guild early conscientemente.

---

## Escopo

- **Store:** `/src/stores/gameStore.ts` — verificação `hasProductionStructure` na função `build()`
- **Tela:** `/src/app/game/territory/[id]/page.tsx` — dialog de confirmação quando condição de risco detectada
- **Tela:** `/src/components/game/hud/TipBanner.tsx` — tip contextual para Umbral no T1

---

## Features

### F-101 — Detectar condição de risco ao construir estrutura especial

Em `/src/stores/gameStore.ts`:

Na função `build()`, após validações existentes e ANTES de executar a construção, verificar:

```typescript
const hasProductionStructure = clan.territories.some(t =>
  t.structures.some(s =>
    ["FARM", "SAWMILL", "MINE"].includes(s.type)
  )
);

const isSpecialStructure = ["SHADOW_GUILD", "TAVERN"].includes(structureType);

if (isSpecialStructure && !hasProductionStructure) {
  return { needsConfirmation: true, reason: "no_production" };
}
```

A verificação é global (todos os territórios do clã). Se o jogador já tem Fazenda em outro território, o aviso não aparece.

**Critérios de aceite:**
- Função `build()` retorna flag de confirmação quando estrutura especial é construída sem produção
- Verificação cobre TODOS os territórios do clã (não apenas o território atual)
- Se jogador já tem Fazenda/Serraria/Mina em QUALQUER território, flag não é ativada
- Aviso aparece para TODAS as facções (não apenas Umbral)

### F-102 — Dialog de confirmação para construção sem economia

Em `/src/app/game/territory/[id]/page.tsx`:

Adicionar dialog de confirmação quando a condição de risco for detectada:

```
⚠️ Estrutura Especializada

"Guilda das Sombras" não produz recursos.
Você ainda não tem nenhuma estrutura de produção (Fazenda, Serraria ou Mina).

Construir sem renda pode criar um gargalo econômico difícil de recuperar.

💡 Sugestão: construa uma Fazenda ou Mina primeiro para garantir renda base.

[Construir Mesmo Assim]  [Cancelar]
```

O botão "Construir Mesmo Assim" executa a construção normalmente. "Cancelar" fecha o dialog sem ação.

**Critérios de aceite:**
- Dialog aparece ao construir Shadow Guild ou Taverna sem produção em nenhum território
- Dialog explica que a estrutura não produz recursos e sugere construir produção primeiro
- Botão "Construir Mesmo Assim" executa a construção normalmente
- Botão "Cancelar" aborta a construção
- Dialog não é bloqueante — jogador pode ignorar e construir

### F-103 — TipBanner para facção Umbral no T1

Em `/src/components/game/hud/TipBanner.tsx`:

Adicionar tip contextual para jogadores Umbral no turno 1:

```
💡 Dica Umbral: Sua facção brilha com espiões, mas espiões custam ouro.
Construa uma Fazenda e Mina antes da Guilda das Sombras para garantir renda.
```

Este tip aparece apenas para `clan.origin === "UMBRAL"` no turno 1, seguindo o padrão de TipBanner já existente no codebase (implementado em S4).

**Critérios de aceite:**
- TipBanner aparece para jogadores Umbral no turno 1
- Texto sugere build order econômica antes de Shadow Guild
- Tip segue padrão visual existente do TipBanner
- Tip não aparece para outras facções
- Tip não reaparece após turno 1

---

## Limites

- NÃO bloqueia a construção — apenas avisa
- NÃO altera custo ou mecânica da Shadow Guild
- NÃO adiciona tutorial de build order para outras facções
- NÃO implementa sistema de sugestões de construção genérico

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

F-102 depende de F-101 (flag de confirmação retornada pela store). F-103 é independente.
