# Dice&Cards Era

> Jogo de estrategia por turnos baseado em navegador, inspirado em classicos como RyuDragon e Tribal Wars.

**Status:** Em desenvolvimento (MVP)

## Sobre o Jogo

**Dice&Cards Era** (codename: `ryudragon`) e um jogo single-player com oponentes IA, ambientado em um mundo medieval dark-fantasy. O jogador lidera um cla atraves de tres eras distintas:

| Era | Turnos | Foco |
|-----|--------|------|
| **Paz** | 1-15 | Construir economia e expandir territorio |
| **Guerra** | 16-35 | Conflitos entre clas, diplomacia e conquistas |
| **Invasao** | 36-50 | Sobreviver a Horda que ameaca todos |

### Origens de Cla

| Origem | Especializacao | Bonus |
|--------|----------------|-------|
| **Ferronatos** | Guerra | +20% forca militar |
| **Verdaneos** | Economia | +20% producao de graos |
| **Umbral** | Espionagem | +30% eficiencia de espioes |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Database:** PostgreSQL 16 + Prisma ORM
- **Cache:** Redis 7
- **Auth:** NextAuth.js
- **State:** Zustand
- **UI:** Tailwind CSS + shadcn/ui + Framer Motion
- **Deploy:** Docker Compose + Coolify + Traefik

## Quick Start

### Pre-requisitos

- Node.js 20+
- pnpm
- Docker & Docker Compose

### Instalacao

```bash
# Clonar repositorio
git clone <repo-url>
cd ryudragon

# Instalar dependencias
pnpm install

# Copiar secrets (ajustar valores)
cp .env.secrets.example .env.secrets

# Iniciar tudo (infra + app)
pnpm dev:all
```

### Acessar

- **App:** http://localhost:8000
- **Prisma Studio:** `pnpm db:studio`

### Credenciais de Teste

Apos `pnpm db:seed`:

| Campo | Valor |
|-------|-------|
| Email | admin@mail.com |
| Senha | 12345678 |

## Comandos

```bash
# Desenvolvimento
pnpm dev:all        # Inicia infra + app
pnpm dev            # Apenas Next.js
pnpm dev:infra      # Apenas PostgreSQL + Redis

# Database
pnpm db:generate    # Gerar Prisma client
pnpm db:migrate     # Aplicar migrations
pnpm db:seed        # Popular banco
pnpm db:reset       # Reset + seed
pnpm db:studio      # Abrir Prisma Studio

# Parar
pnpm dev:infra:down # Parar containers
```

## Portas

| Servico | Porta |
|---------|-------|
| App | 8000 |
| PostgreSQL | 8032 |
| Redis | 8079 |

## Estrutura do Projeto

```
src/
├── app/                # Next.js App Router
│   ├── (auth)/         # Rotas de autenticacao
│   ├── (game)/         # Rotas do jogo
│   └── api/            # API endpoints
├── components/
│   ├── ui/             # shadcn/ui + medieval components
│   └── game/           # Componentes do jogo
├── game/               # Game engine
│   ├── engine/         # Core systems
│   ├── ai/             # AI controller
│   └── constants/      # Balanceamento
├── stores/             # Zustand stores
└── lib/                # Utilitarios

specs/                  # Documentos de design
prisma/                 # Schema do banco
```

## Documentacao

- [`specs/DRAFT-1-MVP.md`](specs/DRAFT-1-MVP.md) - Escopo do MVP
- [`specs/DRAFT-1.md`](specs/DRAFT-1.md) - Design completo do jogo
- [`specs/ART-DIRECTION.md`](specs/ART-DIRECTION.md) - Direcao de arte
- [`DEPLOY.md`](DEPLOY.md) - Deploy e infraestrutura
- [`CLAUDE.md`](CLAUDE.md) - Instrucoes para Claude Code

## License

Projeto privado - Todos os direitos reservados.
