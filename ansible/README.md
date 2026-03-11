# Docusaurus Docs - Ansible Deployment

## Struktúra

```
ansible/
├── deploy-docs.yml                          # Fő playbook
├── inventory/
│   └── hosts.yml                            # Célszerver(ek)
└── roles/
    └── docusaurus-docs/
        ├── defaults/
        │   └── main.yml                     # Konfigurációs változók
        ├── files/
        │   └── scenarios/                   # Scenario tartalom (statikus fájlok)
        │       ├── network-infra/
        │       │   ├── _category_.json
        │       │   ├── overview.md
        │       │   └── vpn-guide.md
        │       └── dev-standards/
        │           ├── _category_.json
        │           ├── code-review.md
        │           ├── ci-cd.md
        │           └── git-conventions.md
        └── tasks/
            └── main.yml                     # Deploy logika
```

## Hogyan működik

1. A `files/scenarios/` mappában minden scenario saját alkönyvtárban található, kész `.md` fájlokkal és `_category_.json`-nel
2. A deploy során az Ansible `copy` modullal másolja a fájlokat a `docs/{{ scenario_name }}/` mappába
3. Minden `.md` fájl frontmatter-ében egyedi ID van: `id: {{ scenario_name }}-{{ page_id }}`
4. **Nincs ID ütközés**, mert a scenario név prefix-ként szerepel
5. A fájlok közvetlenül szerkeszthetők — nincs szükség YAML multiline stringekre vagy Jinja2 template-ekre

## Projekt útvonal

- **Helyi fejlesztés**: Az útvonal automatikusan felismerésre kerül a playbook helyéből
- **Produkciós/távoli szerverek**: Felülírhatod a `docusaurus_path` változót az inventory-ban vagy `-e` paraméterrel:

```bash
# Inventory-ban (hosts.yml):
docusaurus_path: /opt/docusaurus

# Vagy parancssorban:
ansible-playbook -i inventory/hosts.yml deploy-docs.yml -e "docusaurus_path=/opt/docusaurus"
```
## Használat

### Összes scenario deploy
```bash
cd ansible
ansible-playbook -i inventory/hosts.yml deploy-docs.yml
```

### Egy adott scenario deploy
```bash
ansible-playbook -i inventory/hosts.yml deploy-docs.yml -e "deploy_scenario=network-infra"
```

### Dry-run (változások megtekintése deploy nélkül)
```bash
ansible-playbook -i inventory/hosts.yml deploy-docs.yml --check --diff
```

### Automatikus újraindítás

A deployment után a Docusaurus dev konténer automatikusan újraindul, hogy az új könyvtárakat felismerje (a `--poll` flag csak a meglévő fájlokat figyeli, új mappákat nem). Ez kikapcsolható:

```bash
ansible-playbook -i inventory/hosts.yml deploy-docs.yml -e "docker_compose_restart=false"
```

## Új scenario hozzáadása

Hozz létre egy új mappát a `files/scenarios/` alatt:

```
ansible/roles/docusaurus-docs/files/scenarios/my-new-scenario/
├── _category_.json
└── overview.md
```

**`_category_.json`:**
```json
{
  "label": "My New Scenario",
  "position": 12
}
```

**`overview.md`:**
```markdown
---
sidebar_position: 1
id: my-new-scenario-overview
title: "Overview"
description: "Overview - My New Scenario"
---

# Overview

Az oldal tartalma itt...
```

A scenario neve a mappa neve lesz (`my-new-scenario`), és minden `.md` fájl `id` mezőjében prefix-ként szerepel.

## ID ütközés megelőzés

A rendszer automatikusan prefix-eli az ID-kat:

| Scenario | Page ID | Generált Docusaurus ID |
|----------|---------|----------------------|
| network-infra | overview | `network-infra-overview` |
| dev-standards | overview | `dev-standards-overview` |
| my-scenario | overview | `my-scenario-overview` |

Ugyanaz a `page.id` (pl. `overview`) különböző scenario-kban **soha nem ütközik**.

## Fontos megjegyzések

- **Automatikus újraindítás**: A deployment után a Docusaurus dev konténer automatikusan újraindul új könyvtárak felismeréséhez
- **Orphan cleanup**: Csak teljes deploy esetén fut (összes scenario), egyedi scenario deploy esetén nem törli a többi scenario mappáját
- **Újraindítás kikapcsolása**: `docker_compose_restart: false` változóval
- **Fájl-alapú szerkesztés**: A scenario tartalmakat közvetlenül a `.md` fájlokban szerkesztheted — nem kell YAML-t módosítani
