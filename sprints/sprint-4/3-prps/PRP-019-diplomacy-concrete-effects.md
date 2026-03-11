# PRP-019 — Efeitos Concretos de Diplomacia

**Specs:** S-022
**Prioridade:** Score 7/10 (D-035 — diplomacia sem efeito concreto, 4/6) — 3º sprint consecutivo sem melhoria
**Dependências:** Nenhuma

---

## Objetivo

Dar efeito mecânico real ao sistema de diplomacia. Atualmente, relações diplomáticas (`TRUSTED`, `NEUTRAL`, `HOSTILE`) existem como estado na UI e influenciam levemente o comportamento da AI, mas o jogador não observa nenhuma consequência concreta. Espa formou aliança e não podia ajudar o aliado sendo atacado. O aliado traiu sem sinal de alerta.

Após 3 sprints sem melhoria, a decisão é: implementar 1 efeito concreto por tipo de relação ou remover o sistema. Esta PRP implementa efeitos mínimos viáveis.

---

## Escopo

- **AI:** `/src/game/ai/AIController.ts` — pacto de não-agressão + prioridade HOSTILE + lógica de quebra
- **Engine:** `/src/game/engine/GameEngine.ts` — bloquear ataque a aliados + evento de quebra
- **Tela:** `/src/app/game/diplomacy/page.tsx` — indicador de saúde + timer do pacto
- **Tela:** `/src/components/game/map/Territory.tsx` — badge azul para territórios aliados
- **Tipos:** `/src/game/types/index.ts` — campos de saúde e turno de início da aliança

---

## Features

### F-060 — Pacto de não-agressão para relação TRUSTED

Em `/src/game/ai/AIController.ts`:

Quando relação entre jogador e AI clã é `TRUSTED`:
- AI **não ataca** territórios do jogador por 5 turnos após aliança formada
- Após 5 turnos, AI pode reavaliar aliança (chance de quebra baseada em personalidade)
- Se AI quebra aliança, relação muda para `NEUTRAL` (nunca direto a `HOSTILE`)

Em `/src/game/engine/GameEngine.ts`:

- Impedir expedições de ataque do jogador contra territórios de clãs `TRUSTED`
- Botão "Atacar" desabilitado para territórios aliados com tooltip: "Aliado — cancele a aliança antes de atacar"

**Critérios de aceite:**
- Clã aliado (TRUSTED) não ataca o jogador por 5 turnos após aliança
- Jogador não pode atacar territórios de clã aliado (botão desabilitado com tooltip)
- Aliança não pode ser quebrada nos primeiros 5 turnos pelo lado da AI
- Jogador pode cancelar aliança a qualquer momento via botão na página de diplomacia

### F-061 — Visibilidade de tropas aliadas no mapa

Em `/src/components/game/map/Territory.tsx`:

Territórios de clãs aliados (`TRUSTED`) exibem badges de defesa reais (não "?"), como se revelados por espião:
- Badge com ícone 🤝 em azul (`text-blue-400`)
- Tooltip: "Aliado — força visível pelo pacto"
- Não expira enquanto aliança durar

**Critérios de aceite:**
- Territórios aliados mostram badges de defesa reais (ícone 🤝, azul)
- Badges desaparecem imediatamente se aliança for quebrada
- Informação de tropas aliadas é precisa (não estimativa)

### F-062 — Prioridade de ataque HOSTILE na AI

Em `/src/game/ai/AIController.ts`:

Quando relação é `HOSTILE`:
- AI prioriza atacar territórios do jogador sobre outros alvos neutros
- Multiplicador de agressividade: +50% chance de escolher jogador como alvo

**Critérios de aceite:**
- Clã HOSTILE prioriza atacar jogador sobre outros alvos
- Comportamento é perceptível (não apenas marginal)

### F-063 — Indicador de saúde da aliança na página de diplomacia

Em `/src/app/game/diplomacy/page.tsx`:

Adicionar indicador visual de "saúde" da relação:

```
┌──────────────────────────────────┐
│ Clã Ferronatos                   │
│ Relação: ALIADO 🤝               │
│ Saúde: ████████░░ 80%            │
│ Pacto expira em: 3 turnos        │
│ [Cancelar Aliança]               │
└──────────────────────────────────┘
```

**Cálculo de saúde:**
- Inicia em 100% ao formar aliança
- -10% por turno se AI tem personalidade HOSTILE
- -20% se jogador ataca território próximo ao aliado
- -5% por turno passivo (decaimento natural)
- Quando saúde < 30%, aliança pode ser quebrada pela AI

**Critérios de aceite:**
- Página de diplomacia mostra saúde da aliança em barra visual + turnos restantes do pacto
- Saúde decresce conforme regras definidas
- Botão "Cancelar Aliança" funciona e muda relação para NEUTRAL

### F-064 — Notificação de quebra de aliança

Em `/src/game/engine/GameEngine.ts`:

Quando AI quebra aliança:
- Evento no log: "O Clã X rompeu a aliança! Relação mudou para Neutro."
- TipBanner (se sistema de tips ativo): "Aliança rompida — seus territórios perto de X estão vulneráveis"
- Transição de relação: `TRUSTED → NEUTRAL` (nunca direto a `HOSTILE` por quebra automática)

**Critérios de aceite:**
- Quando AI quebra aliança, evento aparece no log
- Relação muda para NEUTRAL (não HOSTILE)
- TipBanner alerta o jogador sobre a vulnerabilidade

---

## Limites

- NÃO implementa sistema de diplomacia completo (ofertas, contra-propostas, trocas)
- NÃO altera mecânica de reputação existente
- NÃO implementa aliança entre AI e AI (apenas jogador ↔ AI)
- NÃO implementa efeitos de NEUTRAL (comportamento padrão mantido)

---

## Dependências

Nenhuma. Este PRP pode ser implementado independentemente.

Se PRP-018 (Inteligência Militar) for implementado primeiro, F-061 pode reutilizar o sistema de TerritoryIntel para badges aliados. Caso contrário, implementar badge aliado de forma independente.
