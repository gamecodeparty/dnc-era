# PRP-025 — Explicação Mecânica nas Transições de Era

**Specs:** S-030
**Prioridade:** Score 7/10 (D-045 — Era da Guerra sem explicação mecânica, 2/6)
**Dependências:** Nenhuma

---

## Objetivo

Adicionar texto explicativo na tela de transição de era informando o que muda mecanicamente. Felix jogou 2-3 turnos da Era da Guerra como se fosse Era da Paz porque a animação não comunicou as novas regras. A animação é unanimemente elogiada (G-001, score 10/10, 4 sprints) — a alteração deve preservar o impacto visual e adicionar contexto sem poluir.

---

## Escopo

- **Tela:** `/src/components/game/fx/EraTransition.tsx` — bloco de texto mecânico com animação atrasada

---

## Features

### F-079 — Texto mecânico na transição de era

Em `/src/components/game/fx/EraTransition.tsx`:

Adicionar bloco de texto abaixo da descrição existente, com aparição atrasada (após animação principal):

**Era da Guerra (PEACE → WAR):**
```
O que muda:
• Clãs podem atacar territórios uns dos outros
• AI se torna mais agressiva — proteja seus territórios
• Novas cartas de combate disponíveis
```

**Era da Invasão (WAR → INVASION):**
```
O que muda:
• A Horda ataca a cada 3 turnos (força crescente: 50→300)
• Alvo: o clã com mais territórios
• Alianças podem ser formadas para sobreviver
```

Definir textos como constante:

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

**Critérios de aceite:**
- Transição para Era da Guerra exibe 3 bullet points explicando novas regras
- Transição para Era da Invasão exibe 3 bullet points sobre a Horda
- Transição de Era da Paz (início do jogo) NÃO exibe texto mecânico
- Animação de transição existente não é alterada (apenas adicionado o bloco de texto)

### F-080 — Animação sequencial dos bullet points

Em `/src/components/game/fx/EraTransition.tsx`:

- Texto aparece 2 segundos após o título da era (delay para não competir)
- Fade-in com slide-up suave (Framer Motion `opacity: 0→1, y: 20→0`)
- Cada bullet point aparece com 300ms de delay entre eles
- Fonte menor que o título (`text-sm text-slate-300`)
- Fundo semi-transparente para legibilidade (`bg-black/40 rounded-lg px-4 py-3`)
- Desaparece junto com o resto da animação de transição

**Critérios de aceite:**
- Texto aparece 2 segundos após o título da era
- Cada bullet point aparece sequencialmente com delay de 300ms
- Estilo visual não compete com a animação principal (fonte menor, fundo semi-transparente)

---

## Limites

- NÃO altera a animação de transição existente (apenas adiciona texto)
- NÃO implementa tutorial interativo durante a transição
- NÃO exibe texto na transição inicial para Era da Paz (início do jogo)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
