# PRP-017 — Sistema de Dicas Contextuais

**Specs:** S-020
**Prioridade:** Score 9/10 (D-040 — sem tutorial, 3/6) + Score 7/10 (D-031 — ouro gargalo, 5/6) + Score 6/10 (D-039 — reforço desconhecido, 3/6)
**Dependências:** Nenhuma

---

## Objetivo

Criar um sistema leve de dicas contextuais que guia o jogador nos primeiros turnos e destaca informações críticas em momentos específicos. NÃO é um tutorial completo com sequência rígida — são dicas que aparecem uma vez cada, no momento certo, baseadas no estado do jogo. Aborda três discoveries simultaneamente: D-040 (onboarding), D-031 (ouro como gargalo), D-039 (mecânica de reforço desconhecida).

---

## Escopo

- **Hook:** `useTips.ts` (novo) — gerenciamento de estado de dicas
- **Componente:** `TipBanner.tsx` (novo) — banner flutuante de dica
- **Tela:** `page.tsx` — integração do hook e componente no layout

---

## Features

### F-053 — Hook useTips com sistema de triggers

Criar `/src/hooks/useTips.ts`:

Hook que gerencia estado de dicas exibidas:

```typescript
interface Tip {
  id: string;
  trigger: (state: GameState) => boolean;
  message: string;
  icon: string;
}
```

**Dicas definidas:**

| ID | Trigger | Mensagem |
|----|---------|----------|
| `tip-01-build-farm` | Turno 1, nenhuma estrutura construída | "Boa primeira jogada: construa uma **Farm** para gerar grão. Clique num território seu para ver opções." |
| `tip-02-build-mine` | Turno 2-3, nenhuma Mine, ouro < 20 | "Construa uma **Mine** o quanto antes! Ouro é o recurso mais escasso e necessário para quase tudo." |
| `tip-03-train-units` | Turno 3-4, Barracks construído, 0 unidades | "Você tem um Quartel! Treine soldados para defender seus territórios e expandir na Era da Guerra." |
| `tip-04-reinforce` | 2+ territórios com unidades, nunca fez REINFORCE | "Sabia que pode **mover tropas** entre seus territórios? Use a opção 'Reforçar' no menu de expedição." |
| `tip-05-war-coming` | Turno 13-14, Era da Paz | "A Era da Guerra começa no turno 16! Certifique-se de ter tropas para defender e atacar." |
| `tip-06-cards` | Tem cartas, nunca usou nenhuma | "Você tem cartas! Use-as ao enviar expedições de ataque para vantagem extra." |

**Estado persistido em localStorage** (key: `dnc-dismissed-tips`) para não repetir dicas em partidas futuras.

**Critérios de aceite:**
- Cada dica aparece no máximo 1 vez por partida
- Triggers avaliam corretamente o estado do jogo
- Estado persistido em localStorage entre partidas
- Máximo 1 dica ativa por vez (prioridade pela ordem da lista)

### F-054 — Componente TipBanner

Criar `/src/components/game/hud/TipBanner.tsx`:

Banner flutuante que aparece no topo da tela de jogo:

```
┌─────────────────────────────────────────────┐
│ 💡 Construa uma Mine o quanto antes!        │
│    Ouro é o recurso mais escasso.      [✕]  │
└─────────────────────────────────────────────┘
```

**Estilo:**
- Fundo semi-transparente dourado (`bg-amber-900/80 border-amber-500/50`)
- Ícone à esquerda, texto curto, botão X para fechar
- Posição fixa no topo, acima do mapa
- Animação slide-in de cima para baixo (Framer Motion)
- Auto-dismiss após 10 segundos se o jogador não interagir
- Máximo 1 dica visível por vez

**Critérios de aceite:**
- Banner aparece com animação slide-in
- Botão X fecha a dica e marca como vista
- Auto-fechamento após 10 segundos
- Estilo medieval consistente com o resto da UI

### F-055 — Integração do sistema de dicas no layout do jogo

Em `/src/app/game/page.tsx`:

Adicionar `useTips()` hook e renderizar `TipBanner` no layout:

```typescript
const { currentTip, dismissTip } = useTips();

return (
  <>
    {currentTip && (
      <TipBanner tip={currentTip} onDismiss={() => dismissTip(currentTip.id)} />
    )}
    {/* ... resto do layout */}
  </>
);
```

**Critérios de aceite:**
- TipBanner integrado no layout sem afetar outros componentes
- Dicas não bloqueiam interação com o jogo (banner é overlay)
- Fluxo de jogo normal não é afetado pela presença de dicas

---

## Limites

- NÃO é um tutorial interativo com sequência forçada — são dicas opcionais
- NÃO bloqueia ações do jogador — apenas sugere
- NÃO implementa sistema de missões/quests guiadas
- NÃO inclui dicas sobre combate PvP ou Horda (cobertos por PRP-016)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

PRP-012 (Destaque de Cartas) complementa a dica `tip-06-cards` ao tornar cartas visíveis no momento do combate.
