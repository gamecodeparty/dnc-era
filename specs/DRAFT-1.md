# Dice&Cards Era — Game Design Draft v1

> **Produto experimental** da marca Dice&Cards RPG
> Browser-based strategy game | Single-player com IA

---

## Conceito Central

**Dice&Cards Era** é um jogo de estratégia baseado em turnos onde o jogador lidera um clã em um mundo medieval dark-fantasy. O jogo se desenrola em três eras distintas, cada uma com desafios e objetivos únicos, culminando em uma luta pela sobrevivência contra uma invasão sobrenatural.

### Premissa Narrativa

*Há uma geração, a Grande Guerra devastou os reinos. Milhões morreram. Cidades foram reduzidas a cinzas. Os sobreviventes, exaustos, firmaram o Pacto das Cinzas — um tratado frágil que mantém uma paz tensa entre os clãs remanescentes.*

*Você lidera um desses clãs. Seu povo olha para você em busca de orientação enquanto o mundo se reconstrói. Mas sussurros de traição ecoam nas sombras, e algo antigo desperta nas profundezas...*

### Loop Principal

```
CONSTRUIR → EXPANDIR → SOBREVIVER
   Era 1       Era 2       Era 3
```

---

## As Três Eras

### Era 1: A Paz das Cinzas (Reconstrução)

**Duração sugerida:** ~30% do jogo

**Contexto:** O mundo está em reconstrução. Os tratados mantêm as tensões sob controle, mas a desconfiança é palpável. Clãs competem por recursos escassos através de comércio e diplomacia.

**Objetivos:**
- Estabelecer a base do clã
- Acumular recursos
- Recrutar população e especialistas
- Formar alianças diplomáticas
- Preparar-se para o inevitável conflito

**Mecânicas Predominantes:**
- Construção de estruturas
- Gestão de recursos
- Diplomacia e comércio
- Espionagem (limitada)
- Eventos narrativos de tensão crescente

**Restrições:**
- Ataques diretos são proibidos (violam o Pacto)
- Ações hostis geram penalidades de reputação
- Foco em crescimento econômico

**Transição para Era 2:**
Um evento catalisador (traição, assassinato, sabotagem) rompe o Pacto. O jogador pode influenciar como isso acontece.

---

### Era 2: A Era da Guerra (Expansão)

**Duração sugerida:** ~40% do jogo

**Contexto:** O Pacto foi rompido. Sem a lei, os clãs se voltam uns contra os outros. É uma corrida por território, recursos e poder antes que seja tarde demais.

**Objetivos:**
- Expandir território
- Enfraquecer ou eliminar clãs rivais
- Acumular poder militar
- Garantir recursos estratégicos
- Formar ou quebrar alianças táticas

**Mecânicas Predominantes:**
- Combate em larga escala
- Cercos e conquistas
- Espionagem agressiva
- Diplomacia volátil (alianças temporárias)
- Gestão de frentes de batalha

**Dinâmica:**
- Clãs de IA competem ativamente entre si
- Alianças se formam e se desfazem
- Recursos se tornam mais escassos
- Reputação afeta quem aceita alianças

**Transição para Era 3:**
Sinais ominosos começam a aparecer. Avistamentos estranhos. Aldeias desaparecidas. Então, *eles* chegam.

---

### Era 3: A Invasão (Sobrevivência)

**Duração sugerida:** ~30% do jogo

**Contexto:** Uma força alienígena/sobrenatural invade o mundo. Clãs que eram inimigos mortais agora precisam decidir: cooperar ou perecer sozinhos.

**Objetivos:**
- Sobreviver às ondas de invasão
- Proteger território essencial
- Formar coalizões de sobrevivência
- Encontrar a fraqueza do inimigo
- Objetivo final: repelir ou resistir à invasão

**Mecânicas Predominantes:**
- Defesa territorial
- Gestão de recursos em escassez extrema
- Diplomacia de sobrevivência
- Eventos de horda/invasão
- Sacrifícios táticos

**Dinâmica:**
- Inimigo comum força cooperação
- Clãs enfraquecidos na Era 2 podem não sobreviver
- Escolhas morais difíceis (abandonar aliados? sacrificar territórios?)
- Múltiplos finais baseados em desempenho

---

## Sistema de Clãs

### Atributos do Clã

| Atributo | Descrição |
|----------|-----------|
| **População** | Número de habitantes (trabalhadores, soldados, especialistas) |
| **Território** | Regiões controladas e suas características |
| **Tesouro** | Recursos acumulados |
| **Reputação** | Como outros clãs o veem (afeta diplomacia) |
| **Moral** | Estado do povo (afeta produtividade e deserção) |
| **Poder Militar** | Força combinada do exército |

### Origens do Clã (Escolha Inicial)

Inspirado no sistema de origens do RyuDragon, cada origem oferece bônus e estilo de jogo únicos:

#### 1. Os Ferronatos (Indústria/Guerra)
- **Bônus:** +20% produção de armas e armaduras
- **Especial:** Unidades de cerco superiores
- **Fraqueza:** Menor produção de alimentos
- **Estilo:** Agressivo, militar

#### 2. Os Verdâneos (Natureza/Sustento)
- **Bônus:** +20% produção de alimentos, cura mais rápida
- **Especial:** Unidades de arqueiros de elite
- **Fraqueza:** Estruturas menos resistentes
- **Estilo:** Defensivo, sustentável

#### 3. Os Umbral (Sombras/Espionagem)
- **Bônus:** +30% eficiência de espiões
- **Especial:** Assassinos, sabotadores
- **Fraqueza:** Exército menor
- **Estilo:** Indireto, manipulativo

#### 4. Os Áureos (Comércio/Diplomacia)
- **Bônus:** +25% em trocas comerciais
- **Especial:** Mercenários mais baratos
- **Fraqueza:** Tropas próprias mais caras
- **Estilo:** Econômico, diplomático

#### 5. Os Cinzentos (Equilíbrio/Adaptação)
- **Bônus:** Sem penalidades, pequenos bônus em tudo
- **Especial:** Adaptam-se ao estilo do oponente
- **Fraqueza:** Sem especialização forte
- **Estilo:** Versátil, reativo

---

## Sistema de Recursos

### Recursos Básicos

| Recurso | Uso Principal | Obtenção |
|---------|--------------|----------|
| **Grãos** | Alimentar população, moral | Fazendas, comércio |
| **Madeira** | Construções, cercos | Serrarias, florestas |
| **Pedra** | Fortificações, estruturas avançadas | Pedreiras |
| **Ferro** | Armas, armaduras | Minas, comércio |
| **Ouro** | Comércio, pagamentos, mercenários | Minas, impostos, pilhagem |

### Recursos Especiais

| Recurso | Efeito | Raridade |
|---------|--------|----------|
| **Cristais Arcanos** | Unidades especiais, eventos | Raro |
| **Relíquias** | Bônus únicos permanentes | Muito raro |
| **Conhecimento Antigo** | Desbloqueia tecnologias | Raro |

---

## Sistema de Construção

### Categorias de Estruturas

#### Produção
- **Fazenda** — Produz grãos
- **Serraria** — Produz madeira
- **Pedreira** — Produz pedra
- **Mina de Ferro** — Produz ferro
- **Mina de Ouro** — Produz ouro

#### Militar
- **Quartel** — Treina infantaria básica
- **Estábulo** — Treina cavalaria
- **Campo de Tiro** — Treina arqueiros
- **Oficina de Cerco** — Constrói armas de cerco
- **Academia de Guerra** — Treina unidades de elite

#### Defesa
- **Muralha** — Defesa básica
- **Torres de Vigia** — Detecção antecipada
- **Fosso** — Retarda invasores
- **Fortaleza** — Defesa avançada, último reduto

#### Especial
- **Taverna** — Recrutamento, informações
- **Mercado** — Comércio com outros clãs
- **Templo** — Moral, eventos especiais
- **Guilda de Espiões** — Espionagem, sabotagem
- **Biblioteca** — Pesquisa, upgrades

### Níveis de Desenvolvimento

Cada estrutura pode ser melhorada até **Nível 5**:
- **Nível 1:** Básico
- **Nível 2:** Eficiente
- **Nível 3:** Avançado
- **Nível 4:** Superior
- **Nível 5:** Magistral

---

## Sistema Militar

### Tipos de Unidades

#### Infantaria
| Unidade | Força | Custo | Especial |
|---------|-------|-------|----------|
| **Milícia** | 1 | Baixo | Rápido de treinar |
| **Espadachim** | 3 | Médio | Balanceado |
| **Lanceiro** | 2 | Médio | Bônus vs cavalaria |
| **Guarda de Elite** | 5 | Alto | Defesa superior |

#### Arqueiros
| Unidade | Força | Custo | Especial |
|---------|-------|-------|----------|
| **Arqueiro** | 2 | Médio | Ataque à distância |
| **Besta** | 3 | Médio-Alto | Penetração de armadura |
| **Arqueiro de Elite** | 4 | Alto | Precisão, primeiro ataque |

#### Cavalaria
| Unidade | Força | Custo | Especial |
|---------|-------|-------|----------|
| **Batedor** | 2 | Médio | Velocidade, reconhecimento |
| **Cavaleiro** | 5 | Alto | Carga devastadora |
| **Cavalaria Pesada** | 7 | Muito Alto | Tank, lento |

#### Especiais
| Unidade | Força | Custo | Especial |
|---------|-------|-------|----------|
| **Espião** | 0 | Médio | Informação, sabotagem |
| **Assassino** | 1 | Alto | Elimina líderes |
| **Catapulta** | 0 | Alto | Destrói estruturas |
| **Aríete** | 0 | Médio | Destrói portões |

### Sistema de Heróis

Heróis são personagens únicos que lideram exércitos e fornecem bônus:

**Atributos de Heróis:**
- **Comando** — Bônus de moral e eficiência das tropas
- **Combate** — Força pessoal em batalha
- **Estratégia** — Reduz perdas, melhora táticas
- **Carisma** — Diplomacia, recrutamento

**Tipos de Heróis:**
- **Comandante** — Bônus para exércitos grandes
- **Campeão** — Força pessoal excepcional
- **Estrategista** — Reduz perdas, melhora defesa
- **Diplomata** — Melhora relações, evita conflitos
- **Mestre de Sombras** — Especialista em espionagem

---

## Sistema de Combate

### Fases do Combate

```
1. PREPARAÇÃO
   - Escolha de tropas
   - Posicionamento
   - Atribuição de heróis

2. APROXIMAÇÃO
   - Arqueiros atacam
   - Batedores reconhecem
   - Moral é testada

3. ENGAJAMENTO
   - Infantaria colide
   - Cavalaria flanqueia
   - Heróis duelam

4. RESOLUÇÃO
   - Cálculo de perdas
   - Rota ou vitória
   - Pilhagem/Defesa
```

### Modificadores de Combate

- **Terreno:** Florestas, montanhas, planícies, rios
- **Clima:** Chuva, neve, calor (afeta moral e movimento)
- **Fortificações:** Muralhas, torres, fossos
- **Moral:** Alta = bônus, Baixa = chance de rota
- **Suprimentos:** Exércitos sem suprimentos enfraquecem

### Resultado de Batalhas

| Resultado | Consequência |
|-----------|--------------|
| **Vitória Decisiva** | Território conquistado, pilhagem máxima, moral +++ |
| **Vitória** | Território contestado, pilhagem parcial, moral + |
| **Empate** | Ambos recuam, perdas mútuas |
| **Derrota** | Recuo, perdas pesadas, moral -- |
| **Derrota Catastrófica** | Exército destruído, território perdido, moral --- |

---

## Sistema de Diplomacia

### Ações Diplomáticas

| Ação | Efeito | Requisito |
|------|--------|-----------|
| **Tratado de Paz** | Proíbe ataques mútuos | Reputação neutra+ |
| **Aliança Comercial** | Bônus em trocas | Relação amigável |
| **Aliança Militar** | Defesa mútua | Relação forte |
| **Vassalagem** | Clã menor se submete | Superioridade militar |
| **Declaração de Guerra** | Libera ataques | — |

### Reputação

A reputação afeta como outros clãs interagem com você:

| Nível | Efeito |
|-------|--------|
| **Honrado** | Todos aceitam alianças, bônus em tratados |
| **Respeitado** | Maioria aceita alianças |
| **Neutro** | Interações normais |
| **Suspeito** | Dificuldade em alianças |
| **Traiçoeiro** | Ninguém confia, alvejado |

**Ações que afetam reputação:**
- Honrar tratados (+)
- Quebrar tratados (---)
- Ajudar aliados (+)
- Abandonar aliados (--)
- Atacar sem provocação (-)

---

## Sistema de IA (Clãs Rivais)

### Personalidades de IA

Cada clã de IA tem uma personalidade que guia suas decisões:

| Personalidade | Comportamento |
|---------------|---------------|
| **Conquistador** | Agressivo, expande constantemente |
| **Defensor** | Foca em fortificações, reage a ameaças |
| **Mercador** | Prioriza economia, evita conflitos |
| **Oportunista** | Ataca os fracos, alia-se aos fortes |
| **Paranoico** | Desconfia de todos, espionagem intensa |
| **Diplomata** | Busca alianças, evita guerras |

### Comportamento por Era

**Era 1:**
- IAs focam em crescimento
- Competição por recursos via comércio
- Formação de blocos de aliança

**Era 2:**
- IAs com personalidade agressiva atacam primeiro
- Formação e quebra de alianças
- Oportunistas atacam quem está perdendo

**Era 3:**
- IAs recalculam prioridades (sobrevivência)
- Inimigos podem propor alianças
- Alguns podem se recusar (orgulho) e perecer

---

## Progressão e Condições de Vitória

### Métricas de Sucesso

| Métrica | Descrição |
|---------|-----------|
| **Territórios Controlados** | Quantas regiões você domina |
| **População** | Tamanho do seu povo |
| **Poder Militar** | Força do seu exército |
| **Riqueza** | Recursos acumulados |
| **Influência** | Alianças e reputação |
| **Sobreviventes** | Quantos sobreviveram à Era 3 |

### Tipos de Vitória

1. **Sobrevivência** — Seu clã sobrevive à invasão (mínimo)
2. **Resistência** — Sobrevive com força significativa
3. **Triunfo** — Lidera a coalizão que repele a invasão
4. **Dominação** — Termina como o clã mais poderoso
5. **Legado** — Maximiza população sobrevivente (humanitário)

### Finais Possíveis

- **Final Sombrio:** Apenas seu clã sobrevive, mundo em ruínas
- **Final Agridoce:** Vitória custosa, muitos perdidos
- **Final Esperançoso:** Coalizão forte, mundo pode se reconstruir
- **Final Glorioso:** Invasão completamente repelida, seu clã é lenda

---

## Interface e UX (Sugestões)

### Tela Principal

```
┌─────────────────────────────────────────────────────────┐
│  DICE&CARDS ERA              Era: Paz das Cinzas  Turno: 23  │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────────────────────────────────┐   │
│  │ RECURSOS│  │                                     │   │
│  │ Grãos:  │  │           MAPA DO MUNDO             │   │
│  │ Madeira:│  │                                     │   │
│  │ Pedra:  │  │     [Regiões, clãs, movimentos]     │   │
│  │ Ferro:  │  │                                     │   │
│  │ Ouro:   │  │                                     │   │
│  └─────────┘  └─────────────────────────────────────┘   │
│  ┌─────────┐  ┌─────────────────────────────────────┐   │
│  │ CLÃ     │  │ AÇÕES DO TURNO                      │   │
│  │ Pop:    │  │ [Construir] [Treinar] [Mover]       │   │
│  │ Moral:  │  │ [Diplomacia] [Espionagem] [Passar]  │   │
│  │ Rep:    │  └─────────────────────────────────────┘   │
│  └─────────┘                                            │
├─────────────────────────────────────────────────────────┤
│  [LOG DE EVENTOS]                                       │
│  > Os Ferronatos propõem aliança comercial              │
│  > Espiões reportam movimentação no norte               │
└─────────────────────────────────────────────────────────┘
```

### Elementos de Dark Fantasy

- **Paleta de cores:** Tons escuros, vermelhos profundos, dourados envelhecidos
- **Tipografia:** Serifada, medieval, mas legível
- **Ilustrações:** Atmosfera sombria, inspirada em Dragon Age
- **Som:** Ambiente tenso, músicas épicas em batalhas
- **Narrativa:** Tons maduros, escolhas morais difíceis

---

## Elementos de "Dice & Cards"

Para conectar com a marca Dice&Cards RPG:

### Sistema de Dados (Dice)

Eventos aleatórios e combates podem usar rolagens virtuais:
- **Críticos:** Rolagens excepcionais causam eventos especiais
- **Falhas críticas:** Desastres inesperados
- **Modificadores:** Seus stats modificam as rolagens

### Sistema de Cartas (Cards)

Cartas de evento que o jogador coleta e pode usar:
- **Cartas de Tática:** Bônus em combate específico
- **Cartas de Evento:** Causam acontecimentos no mundo
- **Cartas de Herói:** Invocam heróis temporários
- **Cartas de Destino:** Alteram resultados de ações

Exemplo:
```
┌────────────────────┐
│ EMBOSCADA          │
│ [Carta de Tática]  │
│                    │
│ Sua próxima defesa │
│ causa +50% dano ao │
│ atacante.          │
│                    │
│ Uso: Uma vez       │
└────────────────────┘
```

---

## Escopo Técnico (Sugestões)

### Stack Sugerida

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | React/Vue + Canvas/SVG para mapa |
| **Estado** | Zustand ou Redux |
| **Backend** | Node.js ou serverless (opcional para saves) |
| **Persistência** | LocalStorage / IndexedDB (offline-first) |
| **IA** | State machines + behavior trees |

### MVP (Produto Mínimo Viável)

1. Uma origem jogável
2. Três clãs de IA com personalidades simples
3. Sistema básico de recursos (3 tipos)
4. Combate simplificado
5. As três eras com transições
6. Um tipo de vitória

### Expansões Futuras

- [ ] Todas as 5 origens
- [ ] Sistema de cartas completo
- [ ] Mais personalidades de IA
- [ ] Modo campanha com narrativa
- [ ] Achievements
- [ ] Leaderboards (pontuação alta)

---

## Próximos Passos

1. **Validar conceito** — Este draft atende à visão?
2. **Definir escopo MVP** — O que é essencial para a primeira versão?
3. **Prototipar mecânicas** — Testar loop de gameplay em papel/planilha
4. **Design visual** — Definir arte conceitual e UI
5. **Desenvolvimento** — Implementar MVP

---

## Referências

- **RyuDragon** (Decadium Studios) — Mecânicas de clã, eras, recursos
- **Dragon Age: Origins** — Tom narrativo, dark fantasy, escolhas morais
- **Crusader Kings** — Diplomacia, intriga, gestão de dinastia
- **Tribal Wars** — Simplicidade de browser game estratégico
- **Darkest Dungeon** — Atmosfera dark, gestão de recursos sob pressão
