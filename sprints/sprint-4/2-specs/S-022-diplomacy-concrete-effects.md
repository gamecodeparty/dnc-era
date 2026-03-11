# S-022 — Efeitos Concretos de Diplomacia

**Discovery:** D-035 (score 7/10, frequencia 4/6)
**Tipo:** Pain — Diplomacia sem efeito concreto observavel (3 sprints consecutivos)

---

## Objetivo

Dar efeito mecanico real ao sistema de diplomacia. Atualmente, relacoes diplomaticas (`TRUSTED`, `NEUTRAL`, `HOSTILE`) existem como estado na UI e influenciam levemente o comportamento da AI, mas o jogador nao observa nenhuma consequencia concreta de formar alianças ou declarar guerra. Espa formou alianca e nao podia ajudar o aliado sendo atacado. O aliado traiu sem qualquer sinal de alerta.

Apos 3 sprints sem melhoria, a recomendacao eh: **implementar 1 efeito concreto por tipo de relacao** ou remover o sistema. Esta spec implementa efeitos minimos viaveis.

---

## Implementacao

### 1. Efeito TRUSTED (Aliado): Pacto de Nao-Agressao

**Arquivo:** `/src/game/ai/AIController.ts`

Quando relacao entre jogador e AI cla eh `TRUSTED`:
- AI **nao ataca** territorios do jogador por 5 turnos apos alianca formada
- Apos 5 turnos, AI pode reavaliar alianca (chance de quebra baseada em personalidade)
- Se AI quebra alianca, relacao muda para `NEUTRAL` (nao direto a `HOSTILE`)

**Arquivo:** `/src/game/engine/GameEngine.ts`

- Impedir expedicoes de ataque do jogador contra territorios de clas `TRUSTED`
- Botao "Atacar" desabilitado para territorios aliados com tooltip: "Aliado — cancele a alianca antes de atacar"

### 2. Efeito TRUSTED: Visibilidade de Tropas do Aliado

**Arquivo:** `/src/components/game/map/Territory.tsx`

Territorios de clas aliados (`TRUSTED`) exibem badges de defesa reais (nao "?"), como se revelados por espiao:
- Badge com icone 🤝 em azul (`text-blue-400`)
- Tooltip: "Aliado — forca visivel pelo pacto"
- Nao expira enquanto alianca durar

### 3. Efeito HOSTILE: Prioridade de Ataque da AI

**Arquivo:** `/src/game/ai/AIController.ts`

Quando relacao eh `HOSTILE`:
- AI prioriza atacar territorios do jogador sobre outros alvos neutros
- Multiplicador de agressividade: +50% chance de escolher jogador como alvo

### 4. Indicador de Saude da Alianca

**Arquivo:** `/src/app/game/diplomacy/page.tsx`

Adicionar indicador visual de "saude" da relacao:

```
┌──────────────────────────────────┐
│ Cla Ferronatos                   │
│ Relacao: ALIADO 🤝               │
│ Saude: ████████░░ 80%            │
│ Pacto expira em: 3 turnos        │
│ [Cancelar Alianca]               │
└──────────────────────────────────┘
```

**Calculo de saude:**
- Inicia em 100% ao formar alianca
- -10% por turno se AI tem personalidade HOSTILE
- -20% se jogador ataca territorio proximo ao aliado
- -5% por turno passivo (decaimento natural)
- Quando saude < 30%, alianca pode ser quebrada pela AI

### 5. Notificacao de Quebra de Alianca

**Arquivo:** `/src/game/engine/GameEngine.ts`

Quando AI quebra alianca:
- Evento no log: "O Cla X rompeu a alianca! Relacao mudou para Neutro."
- TipBanner (se sistema de tips ativo): "Alianca rompida — seus territorios perto de X estao vulneraveis"
- Transicao de relacao: `TRUSTED → NEUTRAL` (nunca direto a `HOSTILE` por quebra automatica)

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/game/ai/AIController.ts` | Pacto de nao-agressao + prioridade HOSTILE + logica de quebra |
| `/src/game/engine/GameEngine.ts` | Bloquear ataque a aliados + evento de quebra |
| `/src/app/game/diplomacy/page.tsx` | Indicador de saude + timer do pacto |
| `/src/components/game/map/Territory.tsx` | Badge azul para territorios aliados |
| `/src/game/types/index.ts` | Campos de saude e turno de inicio da alianca |

---

## Criterios de Aceite

1. Cla aliado (TRUSTED) nao ataca o jogador por 5 turnos apos alianca
2. Jogador nao pode atacar territorios de cla aliado (botao desabilitado com tooltip)
3. Territorios aliados mostram badges de defesa reais (icone 🤝, azul)
4. Cla HOSTILE prioriza atacar jogador sobre outros alvos
5. Pagina de diplomacia mostra saude da alianca em barra visual + turnos restantes do pacto
6. Quando AI quebra alianca, evento aparece no log e relacao muda para NEUTRAL
7. Alianca nao pode ser quebrada nos primeiros 5 turnos pelo lado da AI
8. Jogador pode cancelar alianca a qualquer momento via botao na pagina de diplomacia
