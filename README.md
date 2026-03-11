# CodeTechSolutions Dokumentációs Portál

Belső dokumentációs portál Docusaurus alapokon, Ansible-lel telepített forgatókönyv-alapú tartalommal.

## Tartalomjegyzék

- [Projekt áttekintés](#projekt-áttekintés)
- [Architektúra](#architektúra)
- [Indítás](#indítás)
- [Ansible telepítés](#ansible-telepítés)
  - [Docs forgatókönyv telepítés](ansible/DOCS-DEPLOY.md) — részletes útmutató
  - [Blog bejegyzések telepítés](ansible/BLOG-DEPLOY.md) — részletes útmutató
- [Fájlstruktúra](#fájlstruktúra)

## Projekt áttekintés

Ez egy dockerizált Docusaurus-alapú dokumentációs rendszer a CodeTechSolutions számára. A rendszer két rétegű architektúrát használ:

- **Alap tartalom**: statikus dokumentáció (szervezeti, projekt, bevezető)
- **Forgatókönyvek**: dinamikus tartalom Ansible-lel telepítve

## Architektúra

```
┌─────────────────────────────────────────────────────────────┐
│                    Docusaurus Portál                       │
├─────────────────────────────────────────────────────────────┤
│  Alap réteg                                                │
│  ├── docs/intro.md                                          │
│  ├── docs/organization/                                     │
│  ├── docs/projects/                                         │
│  ├── blog/                                                  │
│  ├── src/                                                   │
│  └── static/                                                │
├─────────────────────────────────────────────────────────────┤
│  Ansible-managed réteg                                      │
│  ├── docs/dev-standards/     ← ansible docs role            │
│  ├── docs/network-infra/     ← ansible docs role            │
│  └── blog/*.md               ← ansible blog role            │
                              └─────────────────────────────────────────────────────────────┘
                              ▲
                              │
                    ┌─────────────────┐
                    │  Ansible Roles  │
                    │  docusaurus-docs │
                    │  docusaurus-blog │
                    └─────────────────┘
```

## Működés

1. **Alap Docusaurus** Docker-ben fut (`docker compose up -d`)
2. **Ansible playbook** átmásolja a forgatókönyv könyvtárakat a `docs/` és blog bejegyzéseket a `blog/` mappába
3. **Docusaurus automatikusan** észleli az új és módosult markdown fájlokat
4. **Docker dev konténer** automatikusan újraindul, ha új könyvtárak kerültek hozzáadásra
2. **Ansible playbook** átmásolja a forgatókönyv könyvtárakat a `docs/` mappába
3. **Docusaurus automatikusan** észleli az új markdown fájlokat
4. **Docker dev konténer** újraindul, ha új könyvtárak kerültek hozzáadásra

## Indítás

```bash
docker compose up -d
```

A parancs lebuildeli a Docker image-et és elindítja a dev szervert. Elérhető: http://localhost:3000

Jelenleg minden localhost-on fut. Amennyiben ez később változik (pl. távoli szerverre költözik a portál), a következő helyeken kell módosítani az eléréseket:

- `ansible/inventory/hosts.yml` — célszerver címe és kapcsolódási mód
- `docusaurus.config.js` — `url` mező (jelenleg placeholder)
- `docker-compose.yml` — port mapping, ha szükséges

## Ansible telepítés

Általános Ansible dokumentáció: [ansible/README.md](ansible/README.md)

| Típus | Playbook | Részletes útmutató |
|-------|----------|-------------------|
| Docs forgatókönyvek | `deploy-docs.yml` | [DOCS-DEPLOY.md](ansible/DOCS-DEPLOY.md) |
| Blog bejegyzések | `deploy-blog.yml` | [BLOG-DEPLOY.md](ansible/BLOG-DEPLOY.md) |

### Gyors parancsok

```bash
# Docs forgatókönyvek telepítése
cd ansible
ansible-playbook -i inventory/hosts.yml deploy-docs.yml

# Blog bejegyzések telepítése
ansible-playbook -i inventory/hosts.yml deploy-blog.yml
```

## Fájlstruktúra

```
.
├── .dockerignore
├── .gitignore
├── Dockerfile                  # Multi-stage: base → dev/prod → serve/caddy
├── docker-compose.yml          # Dev service 3000-es porton
├── package.json
├── package-lock.json
├── docusaurus.config.js
├── sidebars.js
├── src/                        # Egyedi oldalak, CSS
├── static/                     # Statikus eszközök (logo, favicon)
├── blog/                       # Blog bejegyzések
├── docs/                       # Dokumentáció gyökér
│   ├── intro.md                # Üdvözlő oldal (alap)
│   ├── organization/           # Alap
│   └── projects/               # Alap
│   # Ansible telepíti ide a forgatókönyv könyvtárakat (gitignored):
│   # ├── dev-standards/        # ← ansible forgatókönyvekből
│   # └── network-infra/        # ← ansible forgatókönyvekből
└── ansible/
    ├── README.md               # Ansible áttekintés
    ├── DOCS-DEPLOY.md         # Docs telepítési útmutató
    ├── BLOG-DEPLOY.md         # Blog telepítési útmutató
    ├── deploy-docs.yml         # Docs playbook
    ├── deploy-blog.yml         # Blog playbook
    ├── inventory/
    │   └── hosts.yml
    └── roles/
        ├── docusaurus-docs/
        │   ├── defaults/main.yml
        │   ├── tasks/main.yml
        │   └── files/scenarios/
        │       ├── dev-standards/
        │       └── network-infra/
        └── docusaurus-blog/
            ├── defaults/main.yml
            ├── tasks/main.yml
            └── files/posts/
                └── *.md
```