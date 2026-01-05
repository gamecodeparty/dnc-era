# Padrao de Deploy - Coolify + Docker Compose

Padrao completo para deploy de aplicacoes via Coolify com Docker Compose e Traefik externo.

---

## Visao Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                         COOLIFY                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │ App: staging    │    │ App: production │                    │
│  │ branch: develop │    │ branch: main    │                    │
│  └────────┬────────┘    └────────┬────────┘                    │
│           │                      │                              │
│           ▼                      ▼                              │
│  docker-compose.staging.yml    docker-compose.yml               │
│  (apenas servico exposto)      (stack completa + ./data/)       │
└─────────────────────────────────────────────────────────────────┘
                    │
                    ▼
            ┌───────────────┐
            │    TRAEFIK    │  (externo, rede codr-net)
            └───────────────┘
```

---

## Principio Fundamental

**Todo dado persistente DEVE estar em `./data/`**

Em caso de desastre, o restore consiste em:
1. Clonar o repositorio
2. Restaurar `./data/` do backup
3. `docker compose up -d`

Se faltar qualquer informacao apos esse processo, o padrao falhou.

---

## Estrutura de Arquivos

```
/projeto/
├── docker-compose.yml            # Production (stack completa)
├── docker-compose.staging.yml    # Staging (apenas servico exposto)
├── DEPLOY.md                     # Parametros especificos do projeto
├── .env                          # Variaveis de ambiente
├── .gitignore                    # Deve incluir data/
├── data/                         # <-- BACKUP AQUI (NAO COMMITADO)
│   ├── postgres/
│   ├── redis/
│   └── ...
└── <app>/
    └── Dockerfile
```

**Importante:** A pasta `data/` deve estar no `.gitignore`:
```gitignore
# Dados persistentes (backup separado)
data/
```

Os dados sao backupeados via rsync/restic, nao via git.

---

## Fluxo de Inicializacao (Production)

```
docker compose up -d
    │
    ▼
┌──────────────────────────────────────────┐
│ init (busybox)                           │
│ - Cria estrutura de pastas em ./data/    │
│ - Ajusta permissoes por servico          │
│ - Exit 0                                 │
└──────────────────────────────────────────┘
    │ service_completed_successfully
    ▼
┌──────────────────────────────────────────┐
│ Servicos de infraestrutura               │
│ (postgres, redis, rabbitmq...)           │
│ depends_on: init                         │
└──────────────────────────────────────────┘
    │ service_healthy
    ▼
┌──────────────────────────────────────────┐
│ Servicos de aplicacao                    │
│ (api, worker, frontend...)               │
└──────────────────────────────────────────┘
```

### Permissoes: Linux vs Windows

O servico `init` precisa de comandos diferentes dependendo do ambiente:

**Linux (Producao)** - usar `chown` com UIDs especificos:
```yaml
command: |
  sh -c "
    mkdir -p /data/postgres /data/redis /data/n8n &&
    chown -R 999:999 /data/postgres &&
    chown -R 999:999 /data/redis &&
    chown -R 1000:1000 /data/n8n &&
    echo 'Init complete'
  "
```

**Windows/NTFS (Desenvolvimento)** - usar `chmod 777`:
```yaml
command: |
  sh -c "
    mkdir -p /data/postgres /data/redis /data/n8n &&
    chmod -R 777 /data &&
    echo 'Init complete'
  "
```

> **Por que?** NTFS nao suporta UIDs/GIDs do Linux. O `chown` executa sem erro mas nao tem efeito. Containers como PostgreSQL falham com "Permission denied" ao tentar acessar os arquivos.

---

## Docker Compose - Production

Stack completa com servico `init` e volumes em `./data/`:

```yaml
services:
  # Cria estrutura de pastas com permissoes
  init:
    image: busybox:latest
    container_name: ${PROJECT}-init
    command: |
      sh -c "
        mkdir -p /data/postgres /data/redis /data/n8n ... &&
        chown -R 1000:1000 /data/n8n &&
        chown -R 999:999 /data/rabbitmq &&
        echo 'Init complete'
      "
    volumes:
      - ./data:/data
    restart: "no"

  # Infraestrutura depende do init
  postgres:
    depends_on:
      init:
        condition: service_completed_successfully
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    # ...

  # Servico exposto com labels Traefik
  app:
    container_name: ${PROJECT}-app
    labels:
      - traefik.enable=true
      - traefik.docker.network=codr-net
      - traefik.http.routers.${PROJECT}.rule=Host(`${DOMAIN}`)
      - traefik.http.routers.${PROJECT}.entrypoints=websecure
      - traefik.http.routers.${PROJECT}.tls.certresolver=letsencrypt
      - traefik.http.services.${PROJECT}.loadbalancer.server.port=${PORT}
    networks:
      - codr-net

networks:
  codr-net:
    external: true
```

---

## Docker Compose - Staging

Apenas o servico exposto (infraestrutura externa/compartilhada):

```yaml
services:
  app:
    build:
      context: ./app
      dockerfile: Dockerfile
    image: ${PROJECT}-staging-app:latest
    container_name: ${PROJECT}-staging-app
    environment:
      - DATABASE_URL=${DATABASE_URL}  # Banco externo
    labels:
      - traefik.enable=true
      - traefik.docker.network=codr-net
      - traefik.http.routers.${PROJECT}-staging.rule=Host(`h.${DOMAIN}`)
      - traefik.http.routers.${PROJECT}-staging.entrypoints=websecure
      - traefik.http.routers.${PROJECT}-staging.tls.certresolver=letsencrypt
      - traefik.http.services.${PROJECT}-staging.loadbalancer.server.port=${PORT}
    networks:
      - codr-net

networks:
  codr-net:
    external: true
```

---

## Referencia de UIDs/Paths

| Servico | Path interno | Usuario | O que contem |
|---------|--------------|---------|--------------|
| PostgreSQL | `/var/lib/postgresql/data` | 999:999 | Database files |
| MySQL | `/var/lib/mysql` | 999:999 | Database files |
| Redis | `/data` | 999:999 | AOF + RDB |
| MongoDB | `/data/db` | 999:999 | Database files |
| RabbitMQ | `/var/lib/rabbitmq` | 999:999 | Queues + configs |
| n8n | `/home/node/.n8n` | 1000:1000 | Workflows + credentials |
| MinIO | `/data` | 1000:1000 | Object storage |
| Grafana | `/var/lib/grafana` | 472:472 | Dashboards + configs |
| Prometheus | `/prometheus` | 65534:65534 | Metrics |
| Evolution | `/evolution/instances` + `/evolution/store` | root | WhatsApp sessions |
| Keycloak | `/opt/keycloak/data` | 1000:1000 | Realm configs |
| Elasticsearch | `/usr/share/elasticsearch/data` | 1000:1000 | Indices |
| InfluxDB | `/var/lib/influxdb2` | 1000:1000 | Time series |

---

## Coolify - Criar Application

### Via API (Deploy Key)

```bash
POST /api/v1/applications/private-deploy-key

{
  "project_uuid": "<PROJECT_UUID>",
  "server_uuid": "<SERVER_UUID>",
  "environment_name": "staging",
  "name": "<project>-staging",
  "git_repository": "git@github.com:<org>/<repo>.git",
  "git_branch": "develop",
  "private_key_uuid": "<DEPLOY_KEY_UUID>",
  "build_pack": "dockercompose",
  "ports_exposes": "<PORT>",
  "instant_deploy": false
}
```

### Configurar Compose

```bash
PATCH /api/v1/applications/<APP_UUID>

# Staging
{
  "docker_compose_location": "/docker-compose.staging.yml",
  "docker_compose_custom_build_command": "docker compose -f docker-compose.staging.yml build <service>",
  "docker_compose_custom_start_command": "docker compose -f docker-compose.staging.yml up -d <service>"
}

# Production
{
  "docker_compose_location": "/docker-compose.yml",
  "docker_compose_custom_build_command": "docker compose build <service>",
  "docker_compose_custom_start_command": "docker compose up -d <service>"
}
```

### Adicionar Env Vars

```bash
POST /api/v1/applications/<APP_UUID>/envs

{ "key": "DATABASE_URL", "value": "postgres://..." }
```

### Trigger Deploy

```bash
POST /api/v1/deploy?uuid=<APP_UUID>
```

---

## API Reference

### Aplicacoes

| Operacao | Metodo | Endpoint |
|----------|--------|----------|
| Criar app (deploy key) | POST | `/api/v1/applications/private-deploy-key` |
| Criar app (compose raw) | POST | `/api/v1/applications/dockercompose` |
| Atualizar app | PATCH | `/api/v1/applications/<UUID>` |
| Listar apps | GET | `/api/v1/applications` |
| Obter app | GET | `/api/v1/applications/<UUID>` |
| Adicionar env var | POST | `/api/v1/applications/<UUID>/envs` |
| Logs runtime | GET | `/api/v1/applications/<UUID>/logs?lines=100` |

### Deployments

| Operacao | Metodo | Endpoint |
|----------|--------|----------|
| Trigger deploy | GET/POST | `/api/v1/deploy?uuid=<APP_UUID>` |
| Status (sem logs) | GET | `/api/v1/deployments/<DEPLOY_UUID>` |
| Lista com logs | GET | `/api/v1/deployments/applications/<APP_UUID>` |
| Cancelar | POST | `/api/v1/deployments/<DEPLOY_UUID>/cancel` |

> **Nota:** O endpoint `/api/v1/deployments/<UUID>` retorna status mas NAO inclui logs de build.
> Para obter logs de build, usar `/api/v1/deployments/applications/<APP_UUID>` que retorna lista de deployments COM logs.

---

## Workflow Completo de Deploy

Variaveis necessarias:
```bash
COOLIFY_HOST="docker.codrstudio.dev"    # Seu host Coolify
COOLIFY_API_TOKEN="seu-token"            # Token da API
APP_UUID="uuid-da-aplicacao"             # UUID do app no Coolify
DOMAIN="seu-dominio.com"                 # Dominio da aplicacao
```

### 1. Push (opcional)

Se houver mudancas para commitar:
```bash
git add . && git commit -m "feat: descricao" && git push origin <branch>
```

> **Nota:** Este passo e opcional. O trigger de deploy (Step 2) funciona mesmo sem mudancas - faz re-deploy do ultimo commit.

### 2. Trigger Deploy

```bash
curl -s -X GET "https://$COOLIFY_HOST/api/v1/deploy?uuid=$APP_UUID" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN"
```

Resposta:
```json
{"deployments":[{"message":"Application <name> deployment queued.","resource_uuid":"<APP_UUID>","deployment_uuid":"<DEPLOY_UUID>"}]}
```

Extrair DEPLOY_UUID (opcional, para automacao):
```bash
DEPLOY_UUID=$(curl -s -X GET "https://$COOLIFY_HOST/api/v1/deploy?uuid=$APP_UUID" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN" | grep -o '"deployment_uuid":"[^"]*"' | cut -d'"' -f4)
```

### 3. Monitorar Status

```bash
curl -s "https://$COOLIFY_HOST/api/v1/deployments/$DEPLOY_UUID" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN" | grep -o '"status":"[^"]*"'
```

Resultado: `"status":"queued"` | `"status":"in_progress"` | `"status":"finished"` | `"status":"failed"`

Repetir a cada 30s ate `finished` ou `failed`.

### 4. Logs de Build (se failed)

```bash
curl -s "https://$COOLIFY_HOST/api/v1/deployments/applications/$APP_UUID" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN"
```

Retorna array `deployments[]` com campo `logs` contendo historico de build.

### 5. Logs de Runtime

```bash
curl -s "https://$COOLIFY_HOST/api/v1/applications/$APP_UUID/logs?lines=50" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN"
```

Retorna `{"logs":"..."}` com output do container.

### 6. Health Check

```bash
curl -s "https://$DOMAIN/api/health"
```

Esperado: `{"status":"healthy",...}`

---

## Configuracao de Build/Start Commands

O Coolify precisa saber qual service do docker-compose buildar e iniciar.

### Atualizar via API

```bash
curl -X PATCH "https://<COOLIFY_HOST>/api/v1/applications/<APP_UUID>" \
  -H "Authorization: Bearer $COOLIFY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "docker_compose_custom_build_command": "docker compose -f docker-compose.staging.yml build <SERVICE_NAME>",
    "docker_compose_custom_start_command": "docker compose -f docker-compose.staging.yml up -d <SERVICE_NAME>"
  }'
```

### Importante

O `<SERVICE_NAME>` deve corresponder EXATAMENTE ao nome do service no docker-compose.yml.

Exemplo:
- Se o service e `interclinicas-portal-staging`, o comando deve ser:
  ```
  docker compose -f docker-compose.staging.yml build interclinicas-portal-staging
  ```
- Se usar nome errado (ex: `portal`), o deploy falha com:
  ```
  Error: no such service: portal
  ```

---

## Convencoes

### Nomes

```
Containers:   <projeto>-<servico>           (prod)
              <projeto>-staging-<servico>   (staging)

Routers:      <projeto>-<servico>           (prod)
              <projeto>-staging-<servico>   (staging)

Dominios:     <dominio>                     (prod)
              h.<dominio>                   (staging)
```

### Volumes

```yaml
# ERRADO - Volume nomeado
volumes:
  - postgres_data:/var/lib/postgresql/data

# CERTO - Bind mount relativo
volumes:
  - ./data/postgres:/var/lib/postgresql/data
```

---

## Backup/Restore

```bash
# Backup
rsync -av ./data/ /backup/PROJETO/

# Restore
rsync -av /backup/PROJETO/ ./data/
docker compose up -d
```

---

## Migracao de Named Volumes para Bind Mounts

Se o projeto ja usa named volumes e precisa migrar para `./data/`:

### 1. Exportar dados dos volumes existentes

```bash
# Parar containers
docker compose down

# Para cada volume, exportar para ./data/
docker run --rm -v postgres_data:/source -v $(pwd)/data/postgres:/dest busybox cp -a /source/. /dest/
docker run --rm -v redis_data:/source -v $(pwd)/data/redis:/dest busybox cp -a /source/. /dest/
docker run --rm -v n8n_data:/source -v $(pwd)/data/n8n:/dest busybox cp -a /source/. /dest/
```

### 2. Atualizar docker-compose.yml

Trocar volumes nomeados por bind mounts:
```yaml
# ANTES
volumes:
  - postgres_data:/var/lib/postgresql/data

# DEPOIS
volumes:
  - ./data/postgres:/var/lib/postgresql/data
```

Remover secao `volumes:` no final do arquivo.

### 3. Limpar e reiniciar

```bash
# Remover volumes antigos (opcional, apos confirmar que ./data/ funciona)
docker volume rm postgres_data redis_data n8n_data

# Subir com novos bind mounts
docker compose up -d
```

### Alternativa: Reset completo (dev/staging)

Se os dados podem ser perdidos:
```bash
docker compose down
rm -rf data/
docker compose up -d
# Seed vai repopular a base
```

---

## Checklist - Novo Projeto

- [ ] Criar `docker-compose.yml` (production) com init + ./data/
- [ ] Criar `docker-compose.staging.yml` (apenas servico exposto)
- [ ] Criar `DEPLOY.md` com parametros especificos
- [ ] Adicionar Deploy Key ao repositorio Git
- [ ] Criar Application no Coolify (staging)
- [ ] Configurar docker_compose_location e custom commands
- [ ] Adicionar variaveis de ambiente
- [ ] Testar deploy staging
- [ ] Repetir para production (branch main)

---

## Checklist - Analise de Servico

Para CADA servico no docker-compose:
- [ ] Este servico armazena dados que nao podem ser perdidos?
- [ ] Onde o container armazena esses dados internamente?
- [ ] Qual usuario/grupo o container usa (para permissoes)?

---

## Validacao Final

1. Se eu perder TUDO exceto o git repo e ./data/, consigo restaurar?
2. Ha algum dado em /var/lib/docker/volumes/ que deveria estar em ./data/?
3. Ha credentials, API keys, ou configs que nao estao no .env ou ./data/?

Se qualquer resposta for "nao" (1) ou "sim" (2 e 3), o padrao nao foi aplicado.

---

## Troubleshooting

### 404 no Traefik

```bash
# Container na rede?
docker network inspect codr-net

# Labels corretas?
docker inspect <container> | jq '.[0].Config.Labels'
```

### Deploy falha sem logs

1. Verificar se arquivo compose existe no branch
2. Verificar sintaxe YAML (sem acentos/caracteres especiais)
3. Verificar docker_compose_location

### Container nao inicia

1. Verificar depends_on com service_healthy
2. Para staging, remover dependencias de servicos locais
3. Verificar variaveis de ambiente obrigatorias

### PostgreSQL: "Permission denied" ou "could not open file"

**Sintoma:**
```
Error: could not open file "global/pg_filenode.map": Permission denied
```

**Causa:** Bind mount em `./data/postgres` com permissoes incompativeis.

**Solucoes:**

1. **Windows/NTFS:** Usar `chmod 777` no init em vez de `chown`
2. **Linux:** Verificar se o init esta usando UID correto (999:999 para postgres)
3. **Reset:** Se aceitavel perder dados:
   ```bash
   docker compose down
   rm -rf data/postgres
   docker compose up -d
   ```

### Migracao corrompida ou incompleta

**Sintoma:** Seed ou app falha com "column X does not exist" ou "relation Y does not exist"

**Solucao:** Resetar base e rodar migrations do zero:
```bash
docker compose down
rm -rf data/postgres
docker compose up -d
# Migrations rodam automaticamente no entrypoint
```

---

## Anti-patterns

**NAO faca:**
- Volumes nomeados (`volume_name:/path`)
- Dados em paths absolutos (`/var/data/projeto:/path`)
- Configs hardcoded no container
- Secrets fora do .env ou ./data/
- Staging com stack completa de infra local

**FACA:**
- Bind mounts relativos (`./data/servico:/path`)
- Servico init para criar estrutura
- Staging apenas com servico exposto
- Tudo restauravel com git clone + restore de ./data/

---

## Docker Compose - Development

Ambiente local onde a **aplicacao roda fora do Docker** (ex: `npm run dev`) enquanto a **infraestrutura roda no Docker** (banco, cache, filas, etc).

### Principio

Separar o que precisa de hot-reload (codigo) do que e estatico (infra):

```
┌─────────────────────────────────────────────────────────┐
│  DOCKER (docker-compose.dev.yml)                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ postgres│ │  redis  │ │rabbitmq │ │  etc... │       │
│  │  :7032  │ │  :7079  │ │  :7072  │ │         │       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
└────────────────────────┬────────────────────────────────┘
                         │ localhost:70XX
                         ▼
┌─────────────────────────────────────────────────────────┐
│  LOCAL (npm run dev)                                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │  App (hot-reload)                    :7000      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Nomenclatura

```
Containers: {projeto}-{servico}-dev
Exemplo:    myapp-postgres-dev, myapp-redis-dev
```

### Padrao de Portas

Derivar portas da porta base do app. Usar formato `{BASE}{SUFFIX}`:

```
BASE = primeiros 2 digitos da porta do app (ex: 70 para porta 7000)
SUFFIX = ultimos 2 digitos da porta padrao do servico

Exemplos (app na porta 7000, BASE=70):
  PostgreSQL (5432) → 7032 (70 + 32)
  Redis (6379)      → 7079 (70 + 79)
  RabbitMQ (5672)   → 7072 (70 + 72)
  MongoDB (27017)   → 7017 (70 + 17)
```

Para servicos especiais:
```
Backend/API:  {BASE}07  (ex: 7007) - padrao X00X
Worker/Queue: {BASE}70  (ex: 7070) - padrao X0X0
```

### Portas por Ambiente

Usar o padrão `X_00` onde `_` indica o ambiente:

| Ambiente | Padrão | Frontend | Backend | Backbone |
|----------|--------|----------|---------|----------|
| **Dev** | X000 | 7000 | 7007 | 7070 |
| **Staging local** | XX00 | 7700 | 7707 | 7770 |

Isso permite rodar dev e staging local simultaneamente sem conflito de portas.

```yaml
# docker-compose.staging.yml (para teste local)
ports:
  - "7700:7000"  # Frontend staging em localhost:7700
```

### Como Construir

1. **Identificar servicos de infraestrutura** no docker-compose.yml de producao
2. **Copiar para docker-compose.dev.yml** sem o servico do app
3. **Renomear containers** de `-staging` ou sem sufixo para `-dev`
4. **Expor portas** seguindo o padrao acima
5. **Usar chmod 777** no init (Windows/NTFS compativel)

### Estrutura Generica

```yaml
# docker-compose.dev.yml
services:
  ${PROJECT}-init-dev:
    image: busybox:latest
    command: sh -c "mkdir -p /data/... && chmod -R 777 /data"
    volumes: ["./data:/data"]
    restart: "no"

  ${PROJECT}-<servico>-dev:
    image: <imagem>
    depends_on:
      ${PROJECT}-init-dev:
        condition: service_completed_successfully
    ports:
      - "${BASE}${SUFFIX}:${PORTA_INTERNA}"
    volumes:
      - ./data/<servico>:<path_interno>
    networks:
      - internal

networks:
  internal:
    driver: bridge
```

### Scripts npm

```json
{
  "scripts": {
    "dev": "<comando para rodar app localmente>",
    "dev:infra": "docker compose -f docker-compose.dev.yml up -d",
    "dev:infra:down": "docker compose -f docker-compose.dev.yml down",
    "dev:infra:logs": "docker compose -f docker-compose.dev.yml logs -f"
  }
}
```

### Fluxo de Uso

```bash
# 1. Levantar infraestrutura
npm run dev:infra

# 2. Rodar app localmente (hot-reload)
npm run dev

# App conecta em localhost:{BASE}{SUFFIX}
# Ex: DATABASE_URL=postgres://...@localhost:7032/main
```

### Checklist

- [ ] Todos os servicos de infra do production estao no dev?
- [ ] Todas as portas seguem o padrao {BASE}{SUFFIX}?
- [ ] O app consegue conectar via localhost nas portas expostas?
- [ ] O .env de desenvolvimento aponta para localhost:{portas}?
