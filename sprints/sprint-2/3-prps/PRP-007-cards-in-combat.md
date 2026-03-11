# PRP-007 — Cartas no Fluxo de Combate

**Specs:** S-008
**Prioridade:** Score 8/10 (D-024 — cartas inutilizáveis sem combate, 5/6 agentes afetados)
**Dependências:** PRP-006 (UI de Ataque PvP)

---

## Objetivo

Integrar o sistema de cartas ao fluxo de ataque para que o jogador possa ativar cartas de combate DENTRO do `ExpeditionModal`, sem navegar para `/game/cards` separadamente. Cartas ofensivas (Reforços, Informante, Sabotagem) são oferecidas no momento relevante — durante a composição do ataque.

---

## Escopo

- **Tela:** Seção "Cartas Disponíveis" no `ExpeditionModal` (modo ataque)
- **Store:** `sendExpedition()` aceita `cardType` opcional, consome carta da mão
- **Tipos:** Campo `cardType` no tipo `Expedition`

---

## Features

### F-024 — Painel de cartas no ExpeditionModal

Em `/src/components/game/expedition/ExpeditionModal.tsx`:

Adicionar seção "Cartas Disponíveis" entre seleção de unidades e preview de combate:
- Listar apenas cartas na mão do jogador com contexto relevante ao ataque: `combat` (Reforços), `espionage` (Informante), `aggression` (Sabotagem)
- Cada carta exibe: nome, efeito resumido, botão "Ativar"
- Ao ativar, carta marcada como `selectedCard` no estado local do modal
- Apenas 1 carta por ataque
- Preview de combate recalcula incluindo bônus:
  - Reforços: `attackPower * 1.5`
  - Informante: remove "~" da defesa (mostra valor exato)
- Se jogador não tem cartas relevantes: "Sem cartas de combate disponíveis"
- Cartas de economia/defesa NÃO aparecem no modal de ataque

**Critérios de aceite:**
- Seção lista cartas relevantes do jogador ao abrir modal de ataque
- Ativar Reforços aumenta attackPower em 50% no preview
- Ativar Informante remove aproximação "~" da defesa no preview
- Apenas 1 carta ativa por ataque
- Cartas irrelevantes (economia, defesa) não listadas

### F-025 — Consumo de carta ao confirmar ataque

Em `/src/stores/gameStore.ts`:

Modificar `sendExpedition()` (ou criar variante):
- Aceitar parâmetro opcional `cardType: CardType | null`
- Se carta fornecida:
  - Remover carta da mão do jogador (decrementar quantidade)
  - Armazenar `cardBonus` na expedição para uso na resolução de combate
  - Reforços: `attackerCardBonus = 0.5` (passado para `executeCombat`)
  - Informante: revelar unidades do território alvo
  - Sabotagem: flag para destruir estrutura após combate vitorioso

Em `/src/game/types/index.ts`:
- Adicionar campo opcional `cardType` ao tipo `Expedition` (se não existir)

**Critérios de aceite:**
- Confirmar ataque com carta ativa remove carta da mão
- Bônus da carta aplicado no cálculo de combate real (não só preview)
- Tipo `Expedition` aceita `cardType` opcional
- Ataque sem carta funciona normalmente (retrocompatível)

---

## Limites

- NÃO modifica a página `/game/cards` existente — cartas econômicas/defesa permanecem lá
- NÃO implementa cartas defensivas no modal (ativação passiva pré-combate é futuro)
- NÃO adiciona novas cartas — apenas integra as existentes ao fluxo de ataque
- NÃO altera lógica de distribuição de cartas (Taverna)

---

## Dependências

- **PRP-006** (UI de Ataque PvP) — requer que o `ExpeditionModal` seja acessível em modo ataque via botão "Atacar". Se PRP-006 não estiver pronto, este PRP não pode ser implementado.
