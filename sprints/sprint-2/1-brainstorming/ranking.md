# Ranking Final — Sprint-2-Baseline

> **Metodologia de pontuação** (conforme GameEngine.checkGameEnd):
> - Território × 100 pts
> - Populacao × 10 pts
> - Ouro × 1 pt
> - Unidade × 5 pts

---

## Tabela de Resultados

| Pos | Agente | Facção | Estratégia | Territórios | Unidades | Ouro | Pontuação | Nota ao Jogo |
|-----|--------|--------|------------|-------------|---------|------|-----------|--------------|
| 🥇 1 | Agent-A (Mira) | Verdâneos | Econômica Agressiva | 2 | 3 soldados | 85 | **1.300** | 4/10 |
| 🥈 2 | Agent-D (Pedra) | Ferronatos | Militar Reativa | 1 | 2 soldados | 30 | **1.140** | 6/10 |
| 🥈 2 | Agent-F (Gugu) | Ferronatos | Instintiva Novato | 1 | 1 soldado | 35 | **1.140** | 6/10 |
| 4 | Agent-C (Ferro) | Ferronatos | Militar Ofensiva | 2 | 5 soldados | 40 | **1.265** | 3/10 |
| 5 | Agent-E (Vespera) | Umbral | Espionagem | 1 | 2 espiões | 55 | **1.165** | 6/10 |
| 6 | Agent-B (Bastião) | Verdâneos | Econômica Defensiva | 2 | 5 soldados | 5 | **1.230** | 5/10 |

---

### Pontuação Detalhada

| Agente | Territórios (×100) | Pop (×10) | Ouro (×1) | Unidades (×5) | **TOTAL** |
|--------|-------------------|-----------|-----------|---------------|-----------|
| Agent-A | 200 | 1.000 | 85 | 15 | **1.300** |
| Agent-B | 200 | 1.000 | 5 | 25 | **1.230** |
| Agent-C | 200 | 1.000 | 40 | 25 | **1.265** |
| Agent-D | 100 | 1.000 | 30 | 10 | **1.140** |
| Agent-E | 100 | 1.000 | 55 | 10 | **1.165** |
| Agent-F | 100 | 1.000 | 35 | 5 | **1.140** |

---

## Observações

**Campeã: Agent-A (Mira)** — venceu por acúmulo passivo de ouro ao longo de 25 turnos, não por expansão territorial. Irônico para uma estratégia declarada como "econômica agressiva" — a agressão nunca foi possível.

**Último Lugar: Agent-B (Bastião)** — sofreu o pior começo (Muralha no T1 = lock de recursos) mas recuperou na Era da Invasão. A nota mais baixa em pontuação (1.230 é baixa comparada ao grupo, dado que construiu estratégia erroneamente).

**Nota média dos 6 agentes: 5.0/10**

**Observação crítica de sistema**: A diferença de pontuação entre 1.º e 6.º é de apenas 160 pontos — em um total possível de muito mais. Isso indica que a mecânica de pontuação por territórios (×100) é dominada pela população (×10 × 100 pessoas = 1.000 fixos). Todos os agentes terminaram com população padrão de 100, resultando em 1.000 pontos fixos. A diferença real veio apenas de territórios extras e ouro — muito pouca variação para 25 turnos de jogo.

**Erro de design identificado**: A população nunca muda ao longo do jogo (nenhum agente viu a população subir ou descer). O valor de 1.000 pontos de população é idêntico para todos. Isso torna a pontuação de população irrelevante como diferenciador.
