# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Dice&Cards Era** (codename: RyuDragon) - Browser-based turn-based strategy game inspired by classic browser games like RyuDragon and Tribal Wars. Single-player with AI opponents, set in a medieval dark-fantasy world.

The game follows a three-era structure: **Build → Expand → Survive** (Peace → War → Invasion).

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL 16 + Prisma ORM
- **Cache**: Redis 7
- **Auth**: NextAuth.js (credentials)
- **State**: Zustand
- **UI**: Tailwind CSS + shadcn/ui + Framer Motion
- **Deploy**: Docker Compose + Coolify + Traefik
- **Package Manager**: pnpm

## Development Commands

```bash
# Start everything (recommended)
pnpm dev:all

# Or step by step:
pnpm dev:infra      # Start PostgreSQL + Redis
pnpm db:migrate     # Apply migrations
pnpm dev            # Start Next.js app

# Database commands
pnpm db:generate    # Generate Prisma client
pnpm db:migrate:dev # Create new migration
pnpm db:seed        # Seed database
pnpm db:reset       # Reset and reseed
pnpm db:studio      # Open Prisma Studio

# Stop infrastructure
pnpm dev:infra:down
```

## Default Credentials

After running `npm run db:seed`, the following user is created:

| Field    | Value            |
|----------|------------------|
| Email    | admin@mail.com   |
| Password | 12345678         |

## Environment Setup

1. Copy `.env.example` to `.env.secrets`
2. Generate secrets:
   - `POSTGRES_PASSWORD`: any secure password
   - `NEXTAUTH_SECRET`: generate with `openssl rand -base64 32`

## Port Conventions

| Service    | Dev Port | Internal |
|------------|----------|----------|
| App        | 8000     | 8000     |
| PostgreSQL | 8032     | 5432     |
| Redis      | 8079     | 6379     |

Port pattern: `80XX` where `XX` = last 2 digits of standard port.

## Docker Compose Files

| File                        | Purpose                              |
|-----------------------------|--------------------------------------|
| `docker-compose.dev.yml`    | Local dev (infra only, app runs via npm) |
| `docker-compose.staging.yml`| Staging (full stack, h.ryudragon.dev)   |
| `docker-compose.yml`        | Production (full stack, ryudragon.dev)  |

## Data Persistence

All persistent data lives in `./data/` (gitignored). The `init` service in Docker Compose creates the directory structure with correct permissions.

```
./data/
├── postgres/   # Database files
└── redis/      # Cache + sessions
```

## Key Specifications

- **MVP Scope**: `specs/DRAFT-1-MVP.md` - Defines minimal viable game
- **Full Design**: `specs/DRAFT-1.md` - Complete game design document
- **Art Direction**: `specs/ART-DIRECTION.md` - Visual design guide (colors, typography, animations)
- **Deploy Pattern**: `DEPLOY_PATTERN.md` - Coolify/Docker deployment standard
- **Deploy Config**: `DEPLOY.md` - Project-specific deployment details

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth routes (login, register)
│   ├── (game)/             # Game routes
│   │   └── page.tsx        # Main game screen with map
│   └── api/
│       ├── auth/           # NextAuth API
│       ├── game/           # Game API endpoints
│       └── health/         # Health check
├── components/
│   ├── ui/                 # shadcn/ui components (Button, Card, etc)
│   │   └── medieval/       # Medieval-themed components (MedievalCard, MedievalButton, etc)
│   └── game/               # Game-specific components
│       ├── map/            # GameMap, Territory
│       ├── sidebar/        # ResourcePanel, ClanPanel
│       ├── hud/            # EraIndicator, EndTurnButton
│       └── fx/             # Animation effects (ResourcePopup, TurnBanner, etc)
├── game/                   # Core game engine
│   ├── engine/             # GameEngine, TurnSystem, CombatSystem, etc
│   ├── ai/                 # AIController, personalities
│   ├── constants/          # Balance values, origins, structures, units, cards
│   └── types/              # TypeScript interfaces
├── lib/                    # Utilities (db, redis, auth, utils, animations)
├── hooks/                  # React hooks (useGameAnimations, useReducedMotion)
└── stores/                 # Zustand stores

prisma/
└── schema.prisma           # Database schema

database/
├── seed/                   # Seed scripts
└── README.md               # Database documentation
```

## Game Entities

- **Clan**: Player or AI, has resources, population, reputation, origin
- **Territory**: 12 positions in 4x3 grid, has bonus resource
- **Structure**: 8 types (Farm, Sawmill, Mine, Barracks, Stable, Wall, Tavern, Shadow Guild)
- **Unit**: 4 types (Soldier, Archer, Knight, Spy)
- **Card**: 6 types (Reinforcements, Improvised Walls, Bountiful Harvest, Informant, Sabotage, Forced Truce)

## Game Balance

- **Eras**: Peace (15 turns), War (20 turns), Invasion (15 turns) = 50 total
- **Starting Resources**: 100 grain, 50 wood, 50 gold
- **Combat**: Attack > Defense * 1.5 = Decisive Victory
- **Horda**: Attacks every 3 turns in Era 3, strength 50→100→150→200→300

## File Encoding

Always save files in UTF-8 encoding.

## Notas

- Não crie arquivo .env, .env.local ou qualquer outra variação de .env neste projeto.