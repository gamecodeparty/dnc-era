# S-002 — Tutorial Contextual

**Discovery:** D-004 (score 9/10, frequencia 3/6 criticos)
**Tipo:** Pain — Ausencia de tutorial contextual

---

## Objetivo

Substituir a dependencia da pagina separada `/game/como-jogar` por missoes-guia contextuais nos primeiros turnos. O jogador deve receber orientacao inline (highlights, tooltips, setas) sem sair da pagina principal `/game`.

---

## Implementacao

### 1. Sistema de missoes do tutorial

**Novo arquivo:** `/src/stores/tutorialStore.ts`

```typescript
interface TutorialState {
  completed: boolean;
  currentStep: number;
  dismissedSteps: string[];
}
```

**Sequencia de missoes (5 passos):**

| Step | Turno | Trigger | Mensagem | Highlight |
|------|-------|---------|----------|-----------|
| 1 | T1 | Inicio do jogo | "Construa uma estrutura de producao (Farm, Sawmill ou Mine) para gerar recursos." | Botao "Gerenciar Territorio" do T0 |
| 2 | T1-T3 | Apos construir 1a estrutura | "Construa um Barracks para recrutar soldados. Voce precisara de tropas para a Era da Guerra." | Slot vazio no territorio |
| 3 | T3-T5 | Apos construir Barracks | "Recrute pelo menos 3 soldados. Clique em Gerenciar Territorio para treinar unidades." | Botao de recrutamento |
| 4 | T5+ | Apos recrutar 3+ unidades | "Wall reduz dano recebido. Considere construir uma em territorios de fronteira." | Slot de construcao |
| 5 | Era War | Transicao para Era da Guerra | "A paz acabou! Agora voce pode atacar territorios inimigos. Clique num territorio inimigo para atacar." | Territorio inimigo no mapa |

### 2. Componente TutorialOverlay

**Novo arquivo:** `/src/components/game/tutorial/TutorialOverlay.tsx`

- Renderiza um banner/toast persistente no topo da area de jogo (abaixo do header)
- Conteudo: icone de missao + texto da missao atual + botao "Entendi" para dispensar
- Opcionalmente: seta/highlight apontando para o elemento alvo (usando CSS overlay com pointer-events: none)
- Botao "Pular tutorial" dispensa todos os passos restantes
- Animacao de entrada suave (Framer Motion fade-in)

### 3. Persistencia

- Salvar estado do tutorial no `localStorage` (key: `dnc-tutorial-state`)
- Jogador que ja completou o tutorial nao ve novamente
- Reset disponivel em configuracoes (futuro)

### 4. Integracao com pagina do jogo

**Arquivo:** `/src/app/game/page.tsx`

- Importar `TutorialOverlay`
- Renderizar condicionalmente se tutorial nao foi completado
- Passar `currentTurn`, `territories`, `clans` para que o overlay avalie triggers

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/stores/tutorialStore.ts` | **Novo** — Store Zustand do tutorial |
| `/src/components/game/tutorial/TutorialOverlay.tsx` | **Novo** — Componente de overlay |
| `/src/app/game/page.tsx` | Integrar TutorialOverlay |

---

## Criterios de Aceite

1. Ao iniciar um novo jogo, missao 1 aparece no turno 1 sem necessidade de navegar
2. Cada missao aparece automaticamente quando o trigger eh satisfeito
3. Jogador pode dispensar missao individual ("Entendi") ou pular todo o tutorial
4. Tutorial nao aparece para jogadores que ja completaram (localStorage)
5. Missoes nao bloqueiam gameplay — sao informativos, nao modais
6. Step 5 aparece na transicao de era (Era da Guerra)
7. O tutorial funciona tanto em desktop quanto mobile
