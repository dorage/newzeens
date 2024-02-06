# Newzeens Monorepo

Korean newsletter aggregator

로컬환경에서 서버구동방법

```zsh
    pnpm ci
    pnpm start:backend:local
```

## Structure
### backend
- **service**
    
    service server made by hono

- **worker**

    web scraper

### packages
- **db-migrations**

    db migration files

- **kywely-schema**

    kysely schemes

### mono
- *(my own private packages)*