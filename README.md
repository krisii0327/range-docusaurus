# CodeTechSolutions Dokumentációs Portál

Belső dokumentációs portál Docusaurus alapokon, Ansible-lel telepített forgatókönyv-alapú tartalommal.

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
│  Forgatókönyv réteg (Ansible-managed)                       │
│  ├── docs/dev-standards/     ← ansible telepítés           │
│  └── docs/network-infra/     ← ansible telepítés           │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
                    ┌─────────────────┐
                    │ Ansible Roles   │
                    │ scenarios/      │
                    │ ├── dev-standards/
                    │ └── network-infra/
                    └─────────────────┘
```

## Működés

1. **Alap Docusaurus** Docker-ben fut (`docker compose up`)
2. **Ansible playbook** átmásolja a forgatókönyv könyvtárakat a `docs/` mappába
3. **Docusaurus automatikusan** észleli az új markdown fájlokat
4. **Docker dev konténer** újraindul, ha új könyvtárak kerültek hozzáadásra

## Docker használat

### Fejlesztői mód
```bash
docker compose up
```
- Elérhető: http://localhost:3000
- Volume mount-ok: docs/, blog/, src/, static/, config fájlok
- Hot reload támogatás

## Ansible forgatókönyv telepítés

Részletes dokumentáció: [ansible/README.md](ansible/README.md)

### Összes forgatókönyv telepítése
```bash
cd ansible
ansible-playbook -i inventory/hosts.yml deploy-docs.yml
```

### Egyetlen forgatókönyv telepítése
```bash
ansible-playbook -i inventory/hosts.yml deploy-docs.yml -e "deploy_scenario=network-infra"
```

### Dry run
```bash
ansible-playbook -i inventory/hosts.yml deploy-docs.yml --check --diff
```

## Új forgatókönyv létrehozása

1. **Könyvtár létrehozása**:
   ```
   ansible/roles/docusaurus-docs/files/scenarios/my-scenario/
   ```

2. **Kategória konfiguráció** (`_category_.json`):
   ```json
   {
     "label": "My Scenario",
     "position": 3
   }
   ```

3. **Markdown fájlok** frontmatter-rel:
   ```markdown
   ---
   id: my-scenario-overview
   title: Áttekintés
   ---
   
   Forgatókönyv tartalma...
   ```

4. **Telepítés**:
   ```bash
   cd ansible
   ansible-playbook -i inventory/hosts.yml deploy-docs.yml
   ```

## Új blog bejegyzés hozzáadása

A blog bejegyzések a `blog/` mappában találhatók. Új bejegyzés hozzáadásához hozz létre egy markdown fájlt a következő névkonvencióval:

```
blog/YYYY-MM-DD-bejegyzes-cime.md
```

Példa (`blog/2025-04-10-new-feature.md`):

```markdown
---
title: "Új funkció bemutatása"
authors:
  - name: Fejlesztő Csapat
    title: Engineering
tags: [feature, announcement]
description: "Rövid leírás a bejegyzésről."
---

A bejegyzés bevezető része, ami a blog listában is megjelenik.

<!-- truncate -->

A teljes bejegyzés tartalma itt folytatódik...
```

A `<!-- truncate -->` komment jelzi, hol vágja el a Docusaurus az előnézetet a blog listában.

A dev szerver (`docker compose up`) automatikusan észleli az új fájlokat a `blog/` mappában.


## Alap vs Forgatókönyv

### Védett könyvtárak
A `ansible/roles/docusaurus-docs/defaults/main.yml` fájlban definiált `baseline_dirs` védi bizonyos docs könyvtárakat a törlés ellen:

- `organization/` - szervezeti dokumentáció
- `projects/` - projekt dokumentáció  
- `Test/` - teszt könyvtár (alapértelmezett)

### Automatikus tisztítás
Az Ansible-ből eltávolított forgatókönyvek automatikusan törlődnek a teljes telepítés során.

## Forgatókönyv könyvtárak

A `docs/` mappában lévő forgatókönyv könyvtárakat az Ansible kezeli, nem kézi szerkesztéssel.

Jelenlegi Ansible-managed forgatókönyv könyvtárak:
- `docs/dev-standards/`
- `docs/network-infra/`

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
    ├── README.md               # Részletes Ansible dokumentáció
    ├── deploy-docs.yml         # Fő playbook
    ├── inventory/
    │   └── hosts.yml
    └── roles/
        └── docusaurus-docs/
            ├── defaults/main.yml
            ├── tasks/main.yml
            └── files/scenarios/
                ├── dev-standards/
                └── network-infra/
```

## Megjegyzések

- A Dockerfile caddy stage-je hivatkozik egy Caddyfile-ra, ami még nem létezik
- A docusaurus.config.js mermaid téma támogatással rendelkezik
- Csak `dev` service van definiálva a docker-compose.yml-ben