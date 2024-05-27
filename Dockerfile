# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.0.0
ARG PNPM_VERSION=8.15.6

FROM node:${NODE_VERSION}-alpine AS base
# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# install remote packages by pnpm fetch
FROM base AS fetch
WORKDIR /usr/src/app
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# build services by pnpm deploy
FROM fetch as build
WORKDIR /usr/src/app
COPY . .
RUN pnpm install -r --offline --prod
RUN pnpm --filter=./backend/service deploy /prod/backend/service
RUN pnpm --filter=./packages/kysely-schema deploy /prod/packages/kysely-schema

# backend/service
FROM base AS backend_service
COPY --from=build /prod/backend/service /prod/backend/service
WORKDIR /prod/backend/service
# Run the application.
CMD pnpm start

# packages/kysely-schema
FROM base AS packages_kysely-schema
COPY --from=build /prod/packages/kysely-schema /prod/packages/kysely-schema
WORKDIR /prod/packages/kysely-schema
CMD pnpm migrator:production
