# PRP-008 — Onboarding de Expedições

**Specs:** S-009
**Prioridade:** Score 8/10 (D-026 — expedições escondidas, melhor sistema não apresentado)
**Dependências:** Nenhuma

---

## Objetivo

Apresentar o sistema de Expedições ao jogador nos primeiros turnos com indicadores visuais não-intrusivos. Expedições são o sistema mais satisfatório do jogo (unanimidade no playtesting), mas novatos as descobrem por acidente. O onboarding contextual resolve isso sem bloquear gameplay.

---

## Escopo

- **Mapa:** Componente `ExpeditionHint` (banner flutuante) em `GameMap.tsx`
- **Mapa:** Ícone de expedição em territórios neutros em `Territory.tsx`
- **Store:** Evento HINT no log do turno 3 em `gameStore.ts`
- **Persistência:** `localStorage` (key: `dnc-expedition-hint-dismissed`)

---

## Features

### F-026 — Banner de onboarding de expedições no mapa

Em `/src/components/game/map/GameMap.tsx`:

Criar componente `ExpeditionHint` que aparece quando:
- Turno >= 3
- Jogador nunca enviou expedição (`expeditions.length === 0` no store)
- Existe ≥1 território neutro no mapa

Visual: banner flutuante na parte inferior do mapa (acima do bottom nav) com texto explicativo e botão "Entendi".
- Animação de entrada fade-in (Framer Motion)
- "Entendi" dispensa permanentemente via `localStorage` key `dnc-expedition-hint-dismissed`
- Desaparece automaticamente após jogador enviar primeira expedição

**Critérios de aceite:**
- Banner aparece no turno 3 se jogador nunca fez expedição
- "Entendi" dispensa permanentemente (persiste entre sessões)
- Banner desaparece ao enviar primeira expedição
- Não aparece se não há territórios neutros
- Não bloqueia gameplay

### F-027 — Indicador visual de expedição em territórios neutros

Em `/src/components/game/map/Territory.tsx`:

Territórios neutros (sem dono) exibem indicador de expedição disponível:
- Ícone pequeno de bússola/mapa no canto do tile
- Tooltip no hover: "Envie tropas para explorar este local"
- Apenas se jogador tem unidades em algum território

**Critérios de aceite:**
- Territórios neutros mostram ícone de expedição
- Tooltip aparece no hover
- Ícone não aparece se jogador não tem unidades
- Indicador não interfere com outros ícones do tile

### F-028 — Evento HINT no log do turno 3

Em `/src/stores/gameStore.ts`:

No turno 3, se jogador não enviou expedições, adicionar evento ao log:
- Tipo: `HINT`
- Texto: "Seus batedores reportam locais inexplorados no mapa. Envie tropas a um território neutro para iniciar uma Expedição."
- Estilo visual diferenciado (cor dourada/amber para hints)

**Critérios de aceite:**
- Evento HINT aparece no log no turno 3 se sem expedições
- Estilo visual distinto do log normal (cor amber)
- Evento não aparece se jogador já enviou expedição
- Tipo HINT adicionado ao enum de tipos de evento (se não existir)

---

## Limites

- NÃO modifica o sistema de expedições em si — apenas apresenta ao jogador
- NÃO adiciona novos locais de expedição
- NÃO implementa tutorial passo-a-passo — apenas hints contextuais
- NÃO persiste no banco de dados — apenas localStorage

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
