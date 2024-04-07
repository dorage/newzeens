# Newzeens Monorepo

Korean newsletter aggregator service

## Installation

```bash
pnpm install
```

## Run

```bash

```

## Project Structure

``` 
.
+-- backend
|   +-- service
|   +-- worker 
+-- frontend
|   +-- admin
|   +-- client
+-- packages
    +-- kysely-migrator
    +-- kysely-schema

```
**backend/service**

**backend/worker**

**frontend/admin**

**frontend/client**

**packages/kysely-migrator**

**packages/kysely-schema**

## Git

### Branch Convention

| prefix | description |
| --- | --- |
| add/ | 새로운 기능 |
| bugfix/ | 버그 수정 |
| release/ | 릴리즈 브랜치 |
| hotfix/ | release/** 브랜치의 버그 수정 |
| docs/ | readme 및 기타 문서 수정 브랜치 |

### Commit Convention

```
<type>[optional scope]: <description>
```

| type | description |
| --- | --- |
| add | 새로운 기능 |
| fix | 버그 수정 |
| style | 코드 포맷팅 수정 |
| chore | 설정 수정(ex. dotenv 업데이트) |
| test | 테스트 추가, 리팩토링 |
| refactor | 리팩토링(ex. 변수명 수정) |


## Team

| name | role |
| --- | --- |
| 김혜연 | Design |
| 이한울 | Front-End |
| 이강현 | Back-End |
