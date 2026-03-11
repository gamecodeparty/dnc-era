# PRP-016 — Explicação de Mecânicas da Horda

**Specs:** S-019
**Prioridade:** Score 8/10 (D-033 — Horda não explica mecânica de targeting, 4/6)
**Dependências:** Nenhuma

---

## Objetivo

Comunicar ao jogador como a Horda funciona ANTES e DURANTE a Era da Invasão. Atualmente a Horda aparece sem explicação de que ataca o clã com mais territórios, qual território é alvo, ou quando o próximo ataque ocorre. A mecânica está implementada em `GameEngine.ts`: a cada 3 turnos na Era 3, a Horda ataca o clã com mais territórios com força escalante [50, 100, 150, 200, 300].

---

## Escopo

- **Tela:** `page.tsx` — modal informativo na transição para Era da Invasão
- **HUD:** `EraIndicator.tsx` — countdown de próximo ataque da Horda
- **Tela:** `Territory.tsx` — indicador de clã-alvo da Horda no mapa
- **Store:** `gameStore.ts` — mensagem detalhada de evento HORDA_ATTACK

---

## Features

### F-049 — Modal informativo ao iniciar Era da Invasão

Em `/src/app/game/page.tsx` ou componente de transição de era:

Quando a era muda para INVASION, exibir modal informativo APÓS a animação de transição:

```
┌─────────────────────────────────────┐
│ ☠ ERA DA INVASÃO                    │
│                                     │
│ A Horda das Terras Sombrias invade! │
│                                     │
│ • Ataca a cada 3 turnos             │
│ • Alvo: o clã com MAIS territórios  │
│ • Força crescente: 50 → 100 → 300  │
│                                     │
│ Quanto mais territórios você tem,   │
│ mais a Horda o perseguirá.          │
│                                     │
│            [Entendi]                │
└─────────────────────────────────────┘
```

**Comportamento:**
- Aparece uma única vez por partida (flag no state)
- Botão "Entendi" fecha o modal
- Estilo medieval dark (bg escuro, borda vermelha, ícone de caveira)

**Critérios de aceite:**
- Modal aparece ao iniciar Era da Invasão com regras da Horda
- Modal aparece apenas uma vez por partida
- Botão "Entendi" fecha o modal

### F-050 — Countdown de próximo ataque da Horda no HUD

Em `/src/components/game/hud/EraIndicator.tsx` ou componente novo:

Durante a Era da Invasão, exibir countdown no HUD:

```
☠ Horda: 2 turnos | Força: 100
```

**Cálculo:**
- Turnos restantes = 3 - ((turno_atual - inicio_era3) % 3)
- Força = HORDE_WAVES[wave_index]

**Cor:**
- 3 turnos: branco (neutro)
- 2 turnos: amarelo (aviso)
- 1 turno: vermelho com pulse (iminente)

**Critérios de aceite:**
- HUD mostra countdown de turnos até próximo ataque + força estimada
- Countdown muda de cor conforme se aproxima (branco → amarelo → vermelho)
- Countdown só aparece durante Era da Invasão

### F-051 — Indicador de clã-alvo da Horda no mapa

Em `/src/components/game/map/Territory.tsx`:

O clã atualmente com mais territórios (alvo da Horda) deve ter indicador visual:
- Ícone ☠ pequeno no canto dos territórios do clã-alvo
- Tooltip: "Alvo da Horda — este clã tem mais territórios"
- Se o jogador for o alvo, highlight mais proeminente (borda vermelha com pulse)

**Critérios de aceite:**
- Clã-alvo da Horda tem indicador visual (☠) nos territórios no mapa
- Se jogador é o alvo, indicador é mais proeminente
- Indicador atualiza quando a posse de territórios muda

### F-052 — Evento de Horda detalhado no log

Em `/src/stores/gameStore.ts` (evento HORDA_ATTACK):

Melhorar a mensagem do evento HORDA_ATTACK para incluir contexto:

```
☠ A Horda atacou! Força: 100
Alvo: Seu clã (4 territórios — o maior)
Defesa total: 45 — DERROTADO
Perdeu: Território 7

Próximo ataque: Turno 42 | Força: 150
```

**Critérios de aceite:**
- Evento de Horda no log mostra alvo, motivo (mais territórios), resultado, e próximo ataque
- Distingue visualmente quando o jogador é o alvo vs outro clã
- Inclui informação sobre o próximo ataque (turno e força)

---

## Limites

- NÃO altera a mecânica da Horda em si — apenas comunica ao jogador
- NÃO implementa contra-ataque ou negociação com a Horda
- NÃO altera a fórmula de targeting ou força da Horda

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.
