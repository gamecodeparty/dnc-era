# S-030 — Explicacao Mecanica na Transicao de Era

**Discovery:** D-045 (score 7/10, frequencia 2/6)
**Tipo:** Pain — Animacao de transicao de era linda mas sem explicacao do que muda mecanicamente

---

## Objetivo

Adicionar texto explicativo na tela de transicao de era informando o que muda mecanicamente. Felix jogou 2-3 turnos da Era da Guerra como se fosse Era da Paz porque a animacao nao comunicou as novas regras. A animacao eh unanimemente elogiada (G-001, score 10/10, 4 sprints) — a alteracao deve preservar o impacto visual e adicionar contexto sem poluir.

---

## Implementacao

### 1. Texto mecanico na tela de transicao

**Arquivo:** `/src/components/game/fx/EraTransition.tsx`

Adicionar bloco de texto abaixo da descricao existente (linhas ~72-73), com aparicao atrasada (apos animacao principal):

**Era da Guerra (PEACE → WAR):**
```
O que muda:
• Clãs podem atacar territórios uns dos outros
• AI se torna mais agressiva — proteja seus territórios
• Novas cartas de combate disponíveis
```

**Era da Invasao (WAR → INVASION):**
```
O que muda:
• A Horda ataca a cada 3 turnos (força crescente: 50→300)
• Alvo: o clã com mais territórios
• Alianças podem ser formadas para sobreviver
```

### 2. Definicao dos textos por era

**Arquivo:** `/src/components/game/fx/EraTransition.tsx` ou `/src/lib/animations.ts`

```typescript
const ERA_MECHANICS: Record<string, string[]> = {
  WAR: [
    'Clãs podem atacar territórios uns dos outros',
    'AI se torna mais agressiva — proteja seus territórios',
    'Novas cartas de combate disponíveis',
  ],
  INVASION: [
    'A Horda ataca a cada 3 turnos (força crescente: 50→300)',
    'Alvo: o clã com mais territórios',
    'Alianças podem ser formadas para sobreviver',
  ],
};
```

### 3. Animacao do texto mecanico

- Texto aparece 2 segundos apos o titulo da era (delay para nao competir)
- Fade-in com slide-up suave (Framer Motion `opacity: 0→1, y: 20→0`)
- Cada bullet point aparece com 300ms de delay entre eles
- Fonte menor que o titulo (`text-sm text-slate-300`)
- Fundo semi-transparente para legibilidade (`bg-black/40 rounded-lg px-4 py-3`)
- Desaparece junto com o resto da animacao de transicao

### 4. Nao exibir na transicao inicial (PEACE)

A Era da Paz eh o inicio do jogo — nao precisa de explicacao mecanica na transicao. Apenas WAR e INVASION recebem texto explicativo.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/fx/EraTransition.tsx` | Bloco de texto mecanico com animacao atrasada |

---

## Criterios de Aceite

1. Transicao para Era da Guerra exibe 3 bullet points explicando novas regras
2. Transicao para Era da Invasao exibe 3 bullet points sobre a Horda
3. Texto aparece 2 segundos apos o titulo da era
4. Cada bullet point aparece sequencialmente com delay de 300ms
5. Estilo visual nao compete com a animacao principal (fonte menor, fundo semi-transparente)
6. Transicao de Era da Paz (inicio do jogo) NAO exibe texto mecanico
7. Animacao de transicao existente nao eh alterada (apenas adicionado o bloco de texto)
