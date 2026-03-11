# S-009 — Onboarding de Expedicoes

**Discovery:** D-026 (score 8/10, frequencia 3/6)
**Tipo:** Pain — Expedicoes escondidas (melhor sistema nao apresentado)
**Amplifica:** G-007 (score 9/10 — expedicoes como loop de risco/recompensa)

---

## Objetivo

Apresentar o sistema de Expedicoes ao jogador nos primeiros turnos, sem depender de navegacao acidental. As Expedicoes sao o sistema mais satisfatorio do jogo (unanimidade no playtesting), mas 2 de 3 agentes que as usaram as descobriram por acidente.

O onboarding deve ser nao-intrusivo (nao bloquear gameplay) e contextual (aparecer no momento certo).

---

## Implementacao

### 1. Call-to-action contextual no mapa

**Arquivo:** `/src/components/game/map/GameMap.tsx`

Adicionar componente `ExpeditionHint` que aparece quando:
- Turno >= 3 (jogador ja construiu algo e entende o basico)
- Jogador nunca enviou uma expedicao (verificar `expeditions.length === 0` no store)
- Existe pelo menos 1 territorio neutro no mapa

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🗺 Territorios neutros possuem locais para  │
│  Expedicao! Clique num territorio neutro     │
│  para enviar tropas em busca de recursos.    │
│                                    [Entendi] │
└──────────────────────────────────────────────┘
```

- Banner flutuante na parte inferior do mapa (acima do bottom nav)
- Animacao de entrada fade-in (Framer Motion)
- Botao "Entendi" dispensa permanentemente (salvar no `localStorage` key: `dnc-expedition-hint-dismissed`)
- Desaparece automaticamente apos o jogador enviar a primeira expedicao

### 2. Highlight visual em territorios com expedicoes disponiveis

**Arquivo:** `/src/components/game/map/Territory.tsx`

Territorios neutros (sem dono) devem exibir indicador sutil de que Expedicoes estao disponiveis:
- Icone pequeno de bussola/mapa no canto do territory tile
- Tooltip no hover: "Envie tropas para explorar este local"
- Apenas se o jogador tem unidades em algum territorio

### 3. Evento de boas-vindas no log

**Arquivo:** `/src/stores/gameStore.ts`

No turno 3, se o jogador nao enviou expedicoes, adicionar evento ao log:
- Tipo: `HINT`
- Texto: "Seus batedores reportam locais inexplorados no mapa. Envie tropas a um territorio neutro para iniciar uma Expedicao."
- Estilo visual diferenciado do log normal (cor dourada/amber para hints)

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/map/GameMap.tsx` | Componente `ExpeditionHint` condicional |
| `/src/components/game/map/Territory.tsx` | Icone de expedicao em territorios neutros |
| `/src/stores/gameStore.ts` | Evento HINT no turno 3 |

---

## Criterios de Aceite

1. No turno 3, se jogador nunca fez expedicao, banner hint aparece no mapa
2. Territorios neutros exibem indicador visual de expedicao disponivel
3. Banner desaparece ao clicar "Entendi" ou ao enviar primeira expedicao
4. Hint persiste entre sessoes via localStorage (nao reaparece se ja dispensado)
5. Evento no log no turno 3 menciona expedicoes como opcao
6. Nenhum dos indicadores bloqueia gameplay ou exige acao obrigatoria
7. Hint nao aparece se nao ha territorios neutros (ex: todos conquistados)
