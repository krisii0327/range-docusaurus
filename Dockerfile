# syntax=docker/dockerfile:1

# Stage 1: Base - install dependencies
FROM node:lts AS base
ENV FORCE_COLOR=0
RUN corepack enable
WORKDIR /opt/docusaurus

# Copy package files and install dependencies INTO the image
COPY package.json package-lock.json ./
RUN npm ci

# Copy config files that rarely change
COPY docusaurus.config.js sidebars.js ./

# Stage 2a: Development mode
FROM base AS dev
WORKDIR /opt/docusaurus
EXPOSE 3000
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll", "1000"]

# Stage 2b: Production build
FROM base AS prod
WORKDIR /opt/docusaurus
COPY . /opt/docusaurus/
RUN npm run build

# Stage 3a: Serve with docusaurus serve
FROM prod AS serve
EXPOSE 3000
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--no-open"]

# Stage 3b: Serve with Caddy
FROM caddy:2-alpine AS caddy
COPY --from=prod /opt/docusaurus/Caddyfile /etc/caddy/Caddyfile
COPY --from=prod /opt/docusaurus/build /var/docusaurus
