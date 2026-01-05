# Deploy - Ryudragon (Dice&Cards Era)

> Padrao de deploy: [DEPLOY_PATTERN.md](./DEPLOY_PATTERN.md)

## Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                          RYUDRAGON                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      App (Next.js)                        │   │
│  │                   Dice&Cards Era Game                     │   │
│  └────────────────────────────┬─────────────────────────────┘   │
│                               │                                  │
│               ┌───────────────┴───────────────┐                 │
│               ▼                               ▼                 │
│       ┌──────────────┐               ┌──────────────┐          │
│       │  PostgreSQL  │               │    Redis     │          │
│       │    (main)    │               │   (Cache)    │          │
│       └──────────────┘               └──────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Estrutura de Dados

```
./data/
├── postgres/     # Database principal (CRITICO)
└── redis/        # Cache + sessoes
```

**Backup/Restore:**
```bash
rsync -av ./data/ /backup/ryudragon/
rsync -av /backup/ryudragon/ ./data/ && docker compose up -d
```

---

## Inicializacao Rapida

### Desenvolvimento

```bash
# 1. Levantar infraestrutura
docker compose -f docker-compose.dev.yml up -d

# 2. Rodar app localmente
npm install
npm run dev    # App em localhost:8000
```

### Staging/Production

```bash
# Staging
docker compose -f docker-compose.staging.yml up -d ryudragon-staging-app

# Production
docker compose up -d ryudragon-app
```

---

## Ambientes

| Ambiente | Compose | URL | Database |
|----------|---------|-----|----------|
| DEV | `docker-compose.dev.yml` | http://localhost:8000 | Docker (localhost:8032) |
| STAGING | `docker-compose.staging.yml` | https://h.ryudragon.dev | Docker interno |
| PROD | `docker-compose.yml` | https://ryudragon.dev | Docker interno |

---

## URLs

| Servico | Desenvolvimento | Producao |
|---------|-----------------|----------|
| App | http://localhost:8000 | https://ryudragon.dev |

---

## Configuracao

```
.env                → Config base (commitavel)
.env.secrets        → Credenciais sensiveis (NAO commitar!)
.env.example        → Template para novos devs
.env.development    → Config dev
.env.staging        → Config staging
.env.production     → Config producao
```

---

## Servicos

### PostgreSQL
| Item | Dev (local) | Docker (staging/prod) |
|------|-------------|------------------------|
| Host | `localhost` | `ryudragon-{env}-postgres` |
| Port | `8032` | `5432` |
| Database | `main` | `main` |
| Dados | `./data/postgres/` | `./data/postgres/` |

### Redis
| Item | Dev (local) | Docker (staging/prod) |
|------|-------------|------------------------|
| Host | `localhost` | `ryudragon-{env}-redis` |
| Port | `8079` | `6379` |
| Dados | `./data/redis/` | `./data/redis/` |

### App (Next.js)
| Item | Valor |
|------|-------|
| Port | `8000` |
| Framework | Next.js |

---

## Health Checks

```bash
# Redis
docker compose -f docker-compose.dev.yml exec ryudragon-dev-redis redis-cli ping    # PONG

# PostgreSQL
docker compose -f docker-compose.dev.yml exec ryudragon-dev-postgres pg_isready -U postgres   # accepting connections

# App (quando rodando)
curl -s http://localhost:8000/api/health    # {"status":"ok"}
```

---

## Troubleshooting

### PostgreSQL nao conecta
```bash
docker compose -f docker-compose.dev.yml ps ryudragon-dev-postgres
docker compose -f docker-compose.dev.yml logs ryudragon-dev-postgres
docker compose -f docker-compose.dev.yml restart ryudragon-dev-postgres
```

### Redis connection refused
```bash
docker compose -f docker-compose.dev.yml ps ryudragon-dev-redis
docker compose -f docker-compose.dev.yml restart ryudragon-dev-redis
```

### Permissoes em ./data/
```bash
ls -la ./data/
# Em Windows/NTFS: chmod 777 eh aplicado automaticamente
# Em Linux: verificar se init rodou corretamente
```

### Reset completo (dev)
```bash
docker compose -f docker-compose.dev.yml down
rm -rf data/
docker compose -f docker-compose.dev.yml up -d
```

---

## Coolify Deploy

> Padrao de deploy: [DEPLOY_PATTERN.md](./DEPLOY_PATTERN.md)

### UUIDs (preencher apos criar no Coolify)

| Recurso | UUID |
|---------|------|
| Project | *(a criar)* |
| Server | *(a criar)* |
| Deploy Key | *(a criar)* |
| App Staging | *(a criar)* |
| App Production | *(a criar)* |

### Configuracao por Ambiente

**Staging:**
```
Branch: develop
Compose: /docker-compose.staging.yml
Build: docker compose -f docker-compose.staging.yml build ryudragon-staging-app
Start: docker compose -f docker-compose.staging.yml up -d ryudragon-staging-app
```

**Production:**
```
Branch: main
Compose: /docker-compose.yml
Build: docker compose build ryudragon-app
Start: docker compose up -d ryudragon-app
```

---

## Referencias

- Padrao de deploy: `DEPLOY_PATTERN.md`
- Especificacao MVP: `specs/DRAFT-1-MVP.md`
- Variaveis de ambiente: `.env.example`
