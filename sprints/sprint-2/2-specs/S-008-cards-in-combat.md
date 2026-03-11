# S-008 — Cartas no Fluxo de Combate

**Discoveries:** D-024 (score 8/10, frequencia 5/6), D-008 (score 5/10, frequencia 3/6)
**Tipo:** Pain — Sistema de cartas inutilizavel sem combate + cartas desconectadas do fluxo
**Depende de:** S-007 (UI de Ataque PvP)

---

## Objetivo

Integrar o sistema de cartas ao fluxo de ataque para que o jogador possa ativar cartas de combate DENTRO do modal de ataque, sem precisar navegar para `/game/cards` separadamente. As cartas de contexto "combat" e "defense" devem ser oferecidas no momento relevante.

Atualmente as cartas sao ativadas em `/game/cards` (pagina separada) e nao ha conexao entre ativar uma carta e iniciar um combate. O `ExpeditionModal` nao exibe cartas disponiveis.

---

## Implementacao

### 1. Painel de cartas no ExpeditionModal

**Arquivo:** `/src/components/game/expedition/ExpeditionModal.tsx`

Adicionar secao "Cartas Disponiveis" entre a selecao de unidades e o preview de combate:

```
┌─────────────────────────────────┐
│  Selecionar Unidades            │
│  [controles existentes]         │
│                                 │
│  ─── Cartas Disponiveis ───     │
│  [Reforcos +50% ATK]  [Ativar] │
│  [Informante]          [Ativar] │
│  Nenhuma carta ativa            │
│                                 │
│  ⚔ Preview de Combate           │
│  Seu Poder: ~85 (+50% Reforcos) │
│  ...                            │
└─────────────────────────────────┘
```

**Comportamento:**
- Listar apenas cartas na mao do jogador com contexto relevante:
  - Modo ataque: `combat` (Reforcos), `espionage` (Informante), `aggression` (Sabotagem)
  - Modo defesa (futuro): `defense` (Muralhas Improvisadas)
- Cada carta exibe: nome, efeito resumido, botao "Ativar"
- Ao ativar uma carta, ela eh marcada como `selectedCard` no estado local do modal
- Apenas 1 carta de combate pode ser ativa por ataque
- O preview de combate deve recalcular incluindo o bonus da carta ativada:
  - Reforcos: `attackPower * 1.5`
  - Informante: remove fog of war (mostra defesa exata, nao aproximada)

### 2. Consumo de carta ao confirmar ataque

**Arquivo:** `/src/stores/gameStore.ts`

Modificar a action `sendExpedition()` (ou criar variante `sendAttackWithCard()`):

- Aceitar parametro opcional `cardType: CardType | null`
- Se carta fornecida:
  - Remover carta da mao do jogador (decrementar quantidade)
  - Armazenar `cardBonus` na expedicao para uso na resolucao de combate
  - Reforcos: `attackerCardBonus = 0.5` (passado para `executeCombat`)
  - Informante: revelar unidades do territorio alvo (`revealedTerritories`)
  - Sabotagem: flag para destruir estrutura apos combate vitorioso

### 3. Cartas economicas e diplomaticas permanecem em /game/cards

Cartas de contexto `economy` (Colheita Abundante) e `defense` (Muralhas Improvisadas — ativacao passiva pre-combate) e `aggression` (Tregua Forcada) continuam sendo ativadas pela pagina de cartas existente. Esta spec foca apenas na integracao de cartas ofensivas ao modal de ataque.

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `/src/components/game/expedition/ExpeditionModal.tsx` | Secao de cartas disponiveis com ativacao inline |
| `/src/stores/gameStore.ts` | `sendExpedition()` aceita `cardType` e consome carta |
| `/src/game/types/index.ts` | Adicionar `cardType` ao tipo `Expedition` (se nao existir) |

---

## Criterios de Aceite

1. Ao abrir ExpeditionModal para ataque, secao "Cartas Disponiveis" lista cartas relevantes do jogador
2. Jogador pode ativar 1 carta por ataque
3. Ativar Reforcos aumenta o attackPower em 50% no preview de combate
4. Ativar Informante remove o "~" (aproximado) da defesa no preview
5. Ao confirmar ataque com carta ativa, carta eh removida da mao do jogador
6. Bonus da carta eh aplicado no calculo de combate real (nao so no preview)
7. Se jogador nao tem cartas relevantes, secao exibe "Sem cartas de combate disponiveis"
8. Cartas de economia/defesa nao aparecem no modal de ataque
