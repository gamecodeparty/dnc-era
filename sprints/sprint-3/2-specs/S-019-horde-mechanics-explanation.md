# S-019 — Explicacao de Mecanicas da Horda

**Discovery:** D-033 (score 8/10, frequencia 4/6)
**Tipo:** Pain — Horda nao explica mecanica de targeting

---

## Objetivo

Comunicar ao jogador como a Horda funciona ANTES e DURANTE a Era da Invasao. Atualmente a Horda aparece sem explicacao de que ataca o cla com mais territorios, qual territorio eh alvo, ou quando o proximo ataque ocorre. O evento HORDA_ATTACK eh registrado no log mas sem contexto previo.

A mecanica esta implementada em `GameEngine.ts` (linhas 56-197): a cada 3 turnos na Era 3, a Horda ataca o cla com mais territorios com forca escalante [50, 100, 150, 200, 300].

---

## Implementacao

### 1. Tooltip de introducao ao iniciar Era da Invasao

**Arquivo:** `/src/app/game/page.tsx` ou componente de transicao de era

Quando a era muda para INVASION, exibir modal/tooltip informativo APOS a animacao de transicao:

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
- Aparece uma unica vez por partida (flag no state)
- Botao "Entendi" fecha o modal
- Estilo medieval dark (bg escuro, borda vermelha, icone de caveira)

### 2. Indicador de proximo ataque da Horda no HUD

**Arquivo:** `/src/components/game/hud/EraIndicator.tsx` ou componente novo

Durante a Era da Invasao, exibir countdown no HUD:

```
☠ Horda: 2 turnos | Força: 100
```

**Calculo:**
- Turnos restantes = 3 - ((turno_atual - inicio_era3) % 3)
- Forca = HORDE_WAVES[wave_index] onde wave_index = Math.floor((turno_atual - inicio_era3) / 3)

**Cor:**
- 3 turnos: branco (neutro)
- 2 turnos: amarelo (aviso)
- 1 turno: vermelho com pulse (iminente)

### 3. Indicador de alvo no mapa

**Arquivo:** `/src/components/game/map/Territory.tsx`

O cla atualmente com mais territorios (alvo da Horda) deve ter indicador visual sutil:

- Icone ☠ pequeno no canto dos territorios do cla-alvo
- Tooltip: "Alvo da Horda — este clã tem mais territórios"
- Se o jogador for o alvo, highlight mais proeminente (borda vermelha com pulse)

### 4. Evento de Horda no log com detalhes

**Arquivo:** `/src/stores/gameStore.ts` (evento HORDA_ATTACK)

Melhorar a mensagem do evento HORDA_ATTACK para incluir contexto:

```
☠ A Horda atacou! Força: 100
Alvo: Seu clã (4 territórios — o maior)
Defesa total: 45 — DERROTADO
Perdeu: Território 7

Próximo ataque: Turno 42 | Força: 150
```

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/app/game/page.tsx` | Modal informativo na transicao para Era da Invasao |
| `/src/components/game/hud/EraIndicator.tsx` | Countdown de proximo ataque da Horda |
| `/src/components/game/map/Territory.tsx` | Indicador de cla-alvo da Horda |
| `/src/stores/gameStore.ts` | Mensagem detalhada de evento HORDA_ATTACK |

---

## Criterios de Aceite

1. Modal explicativo aparece ao iniciar Era da Invasao com regras da Horda
2. Modal aparece apenas uma vez por partida
3. HUD mostra countdown de turnos ate proximo ataque + forca estimada
4. Countdown muda de cor conforme se aproxima (branco → amarelo → vermelho)
5. Cla-alvo da Horda tem indicador visual (☠) nos territorios no mapa
6. Se jogador eh o alvo, indicador eh mais proeminente
7. Evento de Horda no log mostra alvo, motivo (mais territorios), resultado, e proximo ataque
