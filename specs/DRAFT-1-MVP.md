# Dice&Cards Era — MVP Definition

> Escopo mínimo para uma versão jogável e validável do conceito

---

## Princípio do MVP

**Objetivo:** Criar uma versão jogável que permita experimentar o loop completo (Construir → Expandir → Sobreviver) em uma sessão de ~30-60 minutos.

**Critério de sucesso:** Um jogador consegue completar as 3 eras e entender a proposta do jogo.

---

## O Que Entra no MVP

### 1. Origens de Clã

**MVP: 3 origens** (reduzido de 5)

| Origem | Especialização | Bônus |
|--------|---------------|-------|
| **Ferronatos** | Guerra | +20% força militar |
| **Verdâneos** | Sustento | +20% produção de grãos |
| **Umbral** | Sombras | +30% eficiência de espiões |

*Racional: Cobrem os 3 estilos principais (agressivo, econômico, indireto)*

---

### 2. Recursos

**MVP: 3 recursos** (reduzido de 5+)

| Recurso | Uso |
|---------|-----|
| **Grãos** | Manter população, treinar tropas |
| **Madeira** | Construir estruturas |
| **Ouro** | Tudo (recurso universal, comércio) |

*Ferro e Pedra removidos. Simplifica economia sem perder profundidade.*

---

### 3. Estruturas

**MVP: 8 estruturas**

#### Produção (3)
| Estrutura | Produz | Níveis |
|-----------|--------|--------|
| **Fazenda** | Grãos | 1-3 |
| **Serraria** | Madeira | 1-3 |
| **Mina** | Ouro | 1-3 |

#### Militar (2)
| Estrutura | Desbloqueia | Níveis |
|-----------|-------------|--------|
| **Quartel** | Soldados, Arqueiros | 1-3 |
| **Estábulo** | Cavaleiros | 1-3 |

#### Defesa (1)
| Estrutura | Efeito | Níveis |
|-----------|--------|--------|
| **Muralha** | Defesa do território | 1-3 |

#### Especial (2)
| Estrutura | Função | Níveis |
|-----------|--------|--------|
| **Taverna** | Recruta população | 1-3 |
| **Guilda das Sombras** | Espionagem | 1-3 |

*3 níveis por estrutura (reduzido de 5). Suficiente para sensação de progressão.*

---

### 4. Unidades Militares

**MVP: 4 tipos de unidade**

| Unidade | Ataque | Defesa | Custo | Especial |
|---------|--------|--------|-------|----------|
| **Soldado** | 2 | 2 | 10 grãos, 5 ouro | — |
| **Arqueiro** | 3 | 1 | 10 grãos, 8 ouro | Ataca primeiro |
| **Cavaleiro** | 4 | 3 | 15 grãos, 15 ouro | Bônus em ataque |
| **Espião** | 0 | 0 | 5 grãos, 10 ouro | Revela inimigo |

*Sem heróis no MVP. Adiciona complexidade que pode ser testada depois.*

---

### 5. Sistema de Combate

**MVP: Combate simplificado**

```
PODER DE ATAQUE = Σ(unidades × ataque) × modificadores
PODER DE DEFESA = Σ(unidades × defesa) × modificadores + muralha

SE ataque > defesa × 1.5 → Vitória Decisiva
SE ataque > defesa       → Vitória
SE ataque ≈ defesa       → Empate (ambos perdem 50%)
SE defesa > ataque       → Derrota
```

**Modificadores:**
- Muralha: +20% defesa por nível
- Arqueiros: Causam dano antes do combate principal
- Cavaleiros: +30% em ataques (não em defesa)

**Resultado:**
- Vitória: Conquista território, pilha 50% dos recursos
- Empate: Ambos perdem tropas, ninguém conquista
- Derrota: Perde tropas, recua

---

### 6. Clãs de IA

**MVP: 4 clãs de IA** (+ jogador = 5 clãs total)

| Clã | Personalidade | Comportamento |
|-----|---------------|---------------|
| **Clã do Norte** | Conquistador | Ataca frequentemente, expande |
| **Clã do Sul** | Defensor | Fortalece, só ataca se ameaçado |
| **Clã do Leste** | Oportunista | Ataca os fracos, alia aos fortes |
| **Clã do Oeste** | Mercador | Foca economia, evita guerra |

**Comportamento simplificado:**
- Cada turno, IA avalia: recursos, força militar, ameaças
- Decide entre: construir, treinar, atacar, defender
- Personalidade influencia pesos das decisões

---

### 7. Diplomacia

**MVP: Sistema básico**

| Ação | Efeito | Disponibilidade |
|------|--------|-----------------|
| **Propor Paz** | Proíbe ataques por 5 turnos | Era 1, Era 3 |
| **Declarar Guerra** | Libera ataques | Era 2, Era 3 |
| **Propor Aliança** | Defesa mútua | Era 3 |

*Sem comércio ativo no MVP. Simplifica sem remover tensão diplomática.*

**Reputação:** Apenas 3 níveis
- **Confiável** — Outros aceitam propostas
- **Neutro** — Normal
- **Hostil** — Ninguém aceita paz/aliança

---

### 8. As Três Eras

#### Era 1: Paz das Cinzas
- **Duração:** 15 turnos
- **Regras:** Ataques proibidos (violação = reputação Hostil)
- **Foco:** Construir, acumular, espionar
- **Transição:** Evento automático de traição

#### Era 2: Era da Guerra
- **Duração:** 20 turnos
- **Regras:** Vale tudo
- **Foco:** Expandir, conquistar, enfraquecer rivais
- **Transição:** Evento de invasão

#### Era 3: Invasão
- **Duração:** 15 turnos
- **Regras:** Inimigo externo ataca todos
- **Foco:** Sobreviver, possivelmente cooperar
- **Mecânica:** A cada 3 turnos, "Horda" ataca clã aleatório

**A Horda (inimigo externo):**
- Força cresce a cada onda: 50 → 100 → 150 → 200 → 300
- Ataca o clã com maior território (ou aleatório)
- Clãs podem formar aliança para defesa conjunta

---

### 9. Condições de Fim

**MVP: 3 finais**

| Final | Condição |
|-------|----------|
| **Derrota** | Seu clã é destruído |
| **Sobrevivência** | Seu clã sobrevive à Era 3 |
| **Vitória** | Sobrevive com maior pontuação |

**Pontuação:**
```
PONTOS = (territórios × 100) + (população × 10) + (ouro × 1) + (tropas × 5)
```

---

### 10. Mapa e Territórios

**MVP: Mapa fixo com 12 territórios**

```
        [1]---[2]---[3]
         |     |     |
        [4]---[5]---[6]
         |     |     |
        [7]---[8]---[9]
         |     |     |
       [10]--[11]--[12]
```

**Distribuição inicial:**
- Jogador: 2 territórios (escolha)
- Cada IA: 2 territórios
- Neutros: 2 territórios (podem ser conquistados)

**Cada território tem:**
- Bônus de recurso (grãos, madeira ou ouro)
- Capacidade de estruturas (3-5)

---

### 11. Interface MVP

**Telas necessárias:**

1. **Tela Inicial**
   - Novo Jogo
   - Escolher Origem
   - (Continuar — se save existir)

2. **Tela Principal (Jogo)**
   - Mapa com territórios
   - Painel de recursos
   - Ações do turno
   - Log de eventos

3. **Tela de Território**
   - Estruturas construídas
   - Opções de construção
   - Tropas estacionadas

4. **Tela de Combate**
   - Comparação de forças
   - Resultado
   - Perdas

5. **Tela de Fim de Jogo**
   - Resultado (vitória/derrota/sobrevivência)
   - Pontuação
   - Jogar novamente

---

### 12. Sistema de Cartas (Simplificado)

**MVP: 6 cartas básicas**

O jogador começa com 2 cartas e ganha 1 por era.

| Carta | Efeito | Uso |
|-------|--------|-----|
| **Reforços** | +50% tropas em uma batalha | Combate |
| **Muralhas Improvisadas** | +100% defesa em um ataque | Defesa |
| **Colheita Farta** | Dobra produção de grãos por 3 turnos | Economia |
| **Informante** | Revela todas as tropas de um clã | Espionagem |
| **Sabotagem** | Destrói 1 estrutura inimiga | Agressão |
| **Trégua Forçada** | Impede ataques a você por 3 turnos | Defesa |

*Cartas são descartadas após uso. Não há deck building no MVP.*

---

## O Que NÃO Entra no MVP

| Feature | Motivo da Exclusão |
|---------|-------------------|
| Heróis | Adiciona camada de complexidade |
| 5 origens | 3 são suficientes para testar |
| 5 recursos | 3 cobrem as mecânicas |
| Comércio ativo | Diplomacia básica é suficiente |
| Sistema de dados visível | Pode ser interno, sem UI |
| Deck building | Cartas fixas simplificam |
| Múltiplos finais narrativos | Um final por resultado |
| Som/Música | Pode ser adicionado depois |
| Animações | Pode ser adicionado depois |
| Tutorial | Tooltips básicos bastam |
| Save/Load | LocalStorage simples |

---

## Estimativa de Escopo Técnico

### Componentes Principais

```
src/
├── core/
│   ├── game-state.ts      # Estado central do jogo
│   ├── turn-system.ts     # Lógica de turnos
│   ├── combat.ts          # Sistema de combate
│   └── ai.ts              # Comportamento dos clãs IA
├── entities/
│   ├── clan.ts            # Clã (jogador ou IA)
│   ├── territory.ts       # Território
│   ├── unit.ts            # Unidades militares
│   ├── structure.ts       # Estruturas
│   └── card.ts            # Cartas
├── systems/
│   ├── resource.ts        # Produção/consumo
│   ├── diplomacy.ts       # Relações entre clãs
│   ├── era.ts             # Transição de eras
│   └── invasion.ts        # Mecânica da Horda
├── ui/
│   ├── screens/           # Telas principais
│   ├── components/        # Componentes reutilizáveis
│   └── map/               # Renderização do mapa
└── data/
    ├── origins.json       # Dados das origens
    ├── structures.json    # Dados das estruturas
    ├── units.json         # Dados das unidades
    └── cards.json         # Dados das cartas
```

### Métricas Aproximadas

| Aspecto | Quantidade |
|---------|------------|
| Telas | 5 |
| Entidades | 5 tipos |
| Sistemas | 6 |
| Arquivos de dados | 4 |
| Clãs de IA | 4 |
| Territórios | 12 |
| Turnos totais | ~50 |

---

## Critérios de Aceitação do MVP

### Funcional

- [ ] Jogador pode escolher origem e iniciar jogo
- [ ] Sistema de turnos funciona (passar turno avança o jogo)
- [ ] Recursos são produzidos e consumidos corretamente
- [ ] Estruturas podem ser construídas e fazem efeito
- [ ] Tropas podem ser treinadas
- [ ] Combate resolve corretamente (ataque vs defesa)
- [ ] IAs tomam decisões e agem
- [ ] Transição entre eras acontece
- [ ] Horda ataca na Era 3
- [ ] Jogo termina com resultado claro
- [ ] Cartas podem ser usadas

### Jogabilidade

- [ ] Loop completo leva 30-60 minutos
- [ ] Decisões do jogador têm impacto visível
- [ ] IAs oferecem desafio (não são triviais)
- [ ] As 3 eras têm sensações distintas
- [ ] Final é satisfatório (vitória ou derrota clara)

---

## Próximos Passos

1. **[ ] Validar MVP** — Este escopo está adequado?
2. **[ ] Protótipo em papel** — Testar mecânicas offline
3. **[ ] Setup do projeto** — Estrutura, tooling, stack
4. **[ ] Core loop** — Estado, turnos, recursos
5. **[ ] Mapa e territórios** — Renderização básica
6. **[ ] Construção** — Estruturas funcionando
7. **[ ] Combate** — Sistema de batalha
8. **[ ] IA básica** — Clãs tomando decisões
9. **[ ] Eras** — Transições e regras específicas
10. **[ ] Cartas** — Sistema simplificado
11. **[ ] Polish** — UI, feedback, balanceamento
