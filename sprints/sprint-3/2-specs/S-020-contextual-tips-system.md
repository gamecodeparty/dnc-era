# S-020 — Sistema de Dicas Contextuais

**Discoveries:** D-040 (score 9/10, frequencia 3/6), D-031 (score 7/10, frequencia 5/6), D-039 (score 6/10, frequencia 3/6)
**Tipo:** Pain — Sem tutorial/onboarding + ouro nao comunicado como gargalo + reforco desconhecido

---

## Objetivo

Criar um sistema leve de dicas contextuais que guia o jogador nos primeiros turnos e destaca informacoes criticas em momentos especificos. NAO eh um tutorial completo com sequencia rigida — sao dicas que aparecem uma vez cada, no momento certo, baseadas no estado do jogo.

Aborda tres discoveries simultaneamente:
- **D-040:** Novatos nao sabem o que fazer nos primeiros turnos
- **D-031:** Ninguem sabe que Mine/ouro eh gargalo critico
- **D-039:** Mecanica de reforco (mover tropas) eh desconhecida

---

## Implementacao

### 1. Sistema de dicas (TipSystem)

**Arquivo:** `/src/hooks/useTips.ts` (novo)

Hook que gerencia estado de dicas exibidas:

```typescript
interface Tip {
  id: string;
  trigger: (state: GameState) => boolean;
  message: string;
  icon: string;
  position: 'top' | 'bottom' | 'territory' | 'sidebar';
}

function useTips(): {
  currentTip: Tip | null;
  dismissTip: (id: string) => void;
  dismissedTips: string[];
}
```

**Estado persistido em localStorage** para nao repetir dicas em partidas futuras (key: `dnc-dismissed-tips`).

### 2. Dicas definidas

| ID | Trigger | Mensagem | Momento |
|----|---------|----------|---------|
| `tip-01-build-farm` | Turno 1, nenhuma estrutura construida | "Boa primeira jogada: construa uma **Farm** para gerar grão. Clique num território seu para ver opções de construção." | Inicio do jogo |
| `tip-02-build-mine` | Turno 2-3, nenhuma Mine construida, ouro < 20 | "💰 Dica: construa uma **Mine** o quanto antes! Ouro é o recurso mais escasso e necessário para quase tudo." | Apos primeira construcao |
| `tip-03-train-units` | Turno 3-4, Barracks construido, 0 unidades | "Você tem um Quartel! Treine soldados para defender seus territórios e expandir na Era da Guerra." | Apos construir Barracks |
| `tip-04-reinforce` | Jogador tem 2+ territorios com unidades, nunca fez REINFORCE | "Sabia que pode **mover tropas** entre seus territórios? Use a opção 'Reforçar' no menu de expedição." | Quando tem multiplos territorios |
| `tip-05-war-coming` | Turno 13-14, Era da Paz prestes a acabar | "⚔ A Era da Guerra começa no turno 16! Certifique-se de ter tropas para defender e atacar." | Pre-transicao de era |
| `tip-06-cards` | Jogador tem cartas no inventario, nunca usou nenhuma | "🃏 Você tem cartas! Use-as ao enviar expedições de ataque para vantagem extra." | Quando tem cartas sem usar |

### 3. Componente TipBanner

**Arquivo:** `/src/components/game/hud/TipBanner.tsx` (novo)

Banner flutuante que aparece no topo da tela de jogo:

```
┌─────────────────────────────────────────────┐
│ 💡 Construa uma Mine o quanto antes!        │
│    Ouro é o recurso mais escasso.      [✕]  │
└─────────────────────────────────────────────┘
```

**Estilo:**
- Fundo semi-transparente dourado (`bg-amber-900/80 border-amber-500/50`)
- Icone a esquerda, texto curto, botao X para fechar
- Posicao fixa no topo, acima do mapa
- Animacao slide-in de cima para baixo (Framer Motion)
- Auto-dismiss apos 10 segundos se o jogador nao interagir
- Maximo 1 dica visivel por vez

### 4. Integracao no fluxo de jogo

**Arquivo:** `/src/app/game/page.tsx`

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

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/hooks/useTips.ts` | Novo hook com sistema de dicas + triggers |
| `/src/components/game/hud/TipBanner.tsx` | Novo componente de banner de dica |
| `/src/app/game/page.tsx` | Integrar useTips e TipBanner no layout |

---

## Criterios de Aceite

1. Dica de construir Farm aparece no turno 1 se nenhuma estrutura foi construida
2. Dica de Mine aparece nos turnos 2-3 se ouro < 20 e nenhuma Mine construida
3. Dica de treinar unidades aparece apos construir Barracks sem treinar ninguem
4. Dica de reforco aparece quando jogador tem 2+ territorios e nunca usou REINFORCE
5. Dica de Era da Guerra aparece nos turnos 13-14
6. Dica de cartas aparece quando jogador tem cartas e nunca usou nenhuma
7. Cada dica aparece no maximo 1 vez por partida (persistido em localStorage)
8. Botao X fecha a dica e marca como vista
9. Maximo 1 dica visivel por vez
10. Dicas auto-fecham apos 10 segundos
