# PRP-002 — Tutorial Contextual

**Specs:** S-002
**Prioridade:** Score 9/10 (D-004 — sem tutorial contextual, causa eliminação precoce de novatos)
**Dependências:** Nenhuma

---

## Objetivo

Substituir a dependência da página separada `/game/como-jogar` por missões-guia contextuais nos primeiros turnos. O jogador recebe orientação inline (highlights, tooltips, setas) sem sair da página principal `/game`.

---

## Escopo

- **Store:** Novo `tutorialStore` (Zustand) para estado do tutorial
- **Componente:** Novo `TutorialOverlay` com banner/toast persistente
- **Tela:** Integração com `/src/app/game/page.tsx`
- **Persistência:** `localStorage` (key: `dnc-tutorial-state`)

---

## Features

### F-004 — Store do tutorial (tutorialStore)

Criar `/src/stores/tutorialStore.ts` com Zustand:

```typescript
interface TutorialState {
  completed: boolean;
  currentStep: number;
  dismissedSteps: string[];
}
```

Actions:
- `advanceStep()` — avança para próximo step se trigger satisfeito
- `dismissStep(stepId)` — dispensa step individual
- `skipAll()` — pula todo o tutorial
- `reset()` — reseta tutorial (futuro: configurações)

Persistir em `localStorage` key `dnc-tutorial-state`. Jogador que completou não vê novamente.

**Critérios de aceite:**
- Estado persiste entre sessões via localStorage
- Jogador que completou tutorial não vê novamente

### F-005 — Componente TutorialOverlay

Criar `/src/components/game/tutorial/TutorialOverlay.tsx`:

- Banner/toast persistente no topo da área de jogo (abaixo do header)
- Conteúdo: ícone de missão + texto da missão atual + botão "Entendi"
- Seta/highlight opcional apontando para elemento alvo (CSS overlay, pointer-events: none)
- Botão "Pular tutorial" dispensa todos os passos restantes
- Animação de entrada suave (Framer Motion fade-in)

5 missões sequenciais:

| Step | Turno | Trigger | Mensagem |
|------|-------|---------|----------|
| 1 | T1 | Início do jogo | "Construa uma estrutura de produção (Farm, Sawmill ou Mine) para gerar recursos." |
| 2 | T1-T3 | Após construir 1ª estrutura | "Construa um Barracks para recrutar soldados." |
| 3 | T3-T5 | Após construir Barracks | "Recrute pelo menos 3 soldados." |
| 4 | T5+ | Após recrutar 3+ unidades | "Wall reduz dano recebido. Construa uma em territórios de fronteira." |
| 5 | Era War | Transição para Era da Guerra | "A paz acabou! Clique num território inimigo para atacar." |

**Critérios de aceite:**
- Cada missão aparece automaticamente quando trigger satisfeito
- Missões não bloqueiam gameplay (informativos, não modais)
- Botão "Entendi" dispensa missão individual
- "Pular tutorial" dispensa todos

### F-006 — Integração com página do jogo

Em `/src/app/game/page.tsx`:
- Importar e renderizar `TutorialOverlay` condicionalmente (se tutorial não completado)
- Passar `currentTurn`, `territories`, `clans` para avaliação de triggers
- Funcionar em desktop e mobile

**Critérios de aceite:**
- Missão 1 aparece no turno 1 sem navegação
- Step 5 aparece na transição de era
- Tutorial funciona em desktop e mobile

---

## Limites

- NÃO modifica a página `/game/como-jogar` existente
- NÃO implementa highlighting avançado com spotlight/mask — apenas seta/tooltip simples
- NÃO persiste no banco de dados — apenas localStorage
- Máximo 5 missões neste PRP — expansão futura em sprints posteriores

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
