# Database - Dice&Cards Era

## Estrutura

```
database/
├── seed/
│   └── index.ts    # Script de seed principal
└── README.md
```

## Comandos

```bash
# Gerar cliente Prisma
pnpm db:generate

# Criar nova migration (desenvolvimento)
pnpm db:migrate:dev

# Aplicar migrations (producao)
pnpm db:migrate

# Push schema sem migration (desenvolvimento rapido)
pnpm db:push

# Seed da base
pnpm db:seed

# Reset completo (apaga tudo e reaplica)
pnpm db:reset

# Abrir Prisma Studio
pnpm db:studio
```

## Migrations

As migrations sao gerenciadas pelo Prisma e ficam em `prisma/migrations/`.

Para criar uma nova migration:
```bash
pnpm db:migrate:dev --name nome_da_migration
```

## Schema

O schema do banco esta em `prisma/schema.prisma`.

### Entidades Principais

- **User** - Autenticacao
- **Game** - Estado do jogo (turn, era, status)
- **GamePlayer** - Liga User -> Game -> Clan
- **Clan** - Recursos, populacao, reputacao, origem
- **Territory** - Posicao no mapa (0-11), bonus, owner
- **Structure** - Tipo, nivel (1-3), territorio
- **Unit** - Tipo, quantidade, clan, territorio
- **ClanCard** - Cartas do clan
- **DiplomacyRelation** - Relacoes entre clans
- **GameEvent** - Log de eventos (combate, construcao, etc)
