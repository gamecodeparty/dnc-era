# Ranking Final — Sprint 01 Baseline

**Data:** 2026-03-10
**Agentes:** 6 | **Duração:** 50 turnos (ou até eliminação)

---

## Ranking

| # | Agente | Facção | Estratégia | Territórios | Gold Final | Unidades | Pontuação | Status |
|---|--------|--------|-----------|-------------|-----------|----------|-----------|--------|
| 1 | Agent-A (Marcos) | Verdaneos | Econômico Agressivo | 3 | 140 | 5 | 465 | Vitória |
| 2 | Agent-C (Rafael) | Ferronatos | Militar Ofensivo | 2 | 80 | 6 | 310 | Vitória |
| 3 | Agent-B (Sofia) | Verdaneos | Econômico Defensivo | 2 | 195 | 10 | 445 | Vitória |
| 4 | Agent-D (Paulo) | Ferronatos | Militar Reativo | 2 | 105 | 8 | 345 | Vitória |
| 5 | Agent-E (Isabela) | Umbral | Espionagem/Diplomacia | 0 | — | — | 0 | Eliminada (T33) |
| 6 | Agent-F (Carlos) | Ferronatos | Novato Instintivo | 0 | — | — | 0 | Eliminado (T22) |

### Fórmula de Pontuação
`Pontuação = (territórios × 100) + gold + (unidades × 5)`

*Nota: Population tracking retorna sempre 0 no client (TODO no código), portanto não incluído. Score real do engine backend difere.*

---

## Pontuações Detalhadas

### 1º — Agent-A: 465 pontos
- Territórios: 3 × 100 = 300
- Gold: 140
- Unidades: 5 × 5 = 25
- **Total: 465**

### 2º — Agent-B: 445 pontos (*)
- Territórios: 2 × 100 = 200
- Gold: 195
- Unidades: 10 × 5 = 50 (estimativa média)
- **Total: 445**

*Agent-B ficou em 2º lugar por gold acumulado, superando Agent-D que tinha menos gold mas mais unidades.*

### 3º — Agent-C: 310 pontos
- Territórios: 2 × 100 = 200
- Gold: 80
- Unidades: 6 × 5 = 30 (estimativa)
- **Total: 310**

*Nota: Agent-C terminou com apenas 2 territórios apesar de ter dominado boa parte da Era da Guerra — perdeu 2 para a Horda.*

### 4º — Agent-D: 345 pontos
- Territórios: 2 × 100 = 200
- Gold: 105
- Unidades: 8 × 5 = 40 (estimativa)
- **Total: 345**

### 5º/6º — Agent-E e Agent-F: 0 pontos
- Eliminados antes do fim do jogo.

---

## Tabela de NPS

| Agente | Nota |
|--------|------|
| Agent-A | 7 |
| Agent-B | 6 |
| Agent-C | 7 |
| Agent-D | 6 |
| Agent-E | 4 |
| Agent-F | 3 |
| **Média** | **5.5** |

**NPS médio: 5.5/10** — Abaixo da meta de qualidade. Indica que o jogo tem potencial mas barreiras significativas estão reduzindo a satisfação, especialmente para novatos e jogadores de facção Umbral.

---

## Observações do Ranking

**Facções:** Verdaneos (2 players, ambos sobreviveram) > Ferronatos (3 players, 2 sobreviveram, 1 eliminado) > Umbral (1 player, eliminada). Fortemente sugere que Umbral está broken.

**Estratégias bem-sucedidas:**
- Econômica (qualquer subfacção) = alta produção + Wall = boa sobrevivência
- Militar ofensiva = alta pontuação territorial mas vulnerável à Horda

**Estratégias problemáticas:**
- Espionagem = mecânica não implementada → derrota inevitável
- Novato instintivo = sem tutorial = eliminação rápida

**Correlação Wall vs Sobrevivência:**
Todos os 4 agentes que sobreviveram construíram Wall cedo. Os 2 eliminados não tinham Wall no momento da eliminação (Agent-E não construiu em T1, Agent-F não teve recursos para tal). **Wall é o gatekeeper de sobrevivência no estado atual do jogo.**
