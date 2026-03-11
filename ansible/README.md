# Docusaurus - Ansible Deployment

## Struktúra

```
ansible/
├── README.md                # Áttekintés (ez a fájl)
├── DOCS-DEPLOY.md          # Docs telepítési útmutató
├── BLOG-DEPLOY.md          # Blog telepítési útmutató
├── deploy-docs.yml          # Docs playbook
├── deploy-blog.yml          # Blog playbook
├── inventory/
│   └── hosts.yml                # Célszerver(ek)
└── roles/
    ├── docusaurus-docs/         # Docs scenario role
    └── docusaurus-blog/         # Blog deploy role
```

## Részletes útmutatók

| Típus | Útmutató | Playbook |
|-------|----------|----------|
| Docs forgatókönyvek | [DOCS-DEPLOY.md](DOCS-DEPLOY.md) | `deploy-docs.yml` |
| Blog bejegyzések | [BLOG-DEPLOY.md](BLOG-DEPLOY.md) | `deploy-blog.yml` |

## Hogyan működik

- A **docs role** forgatókönyv könyvtárakat másol a `docs/` mappába, ID ütközés-mentes prefix rendszerrel
- A **blog role** blog bejegyzéseket másol a `blog/` mappába, baseline postok védelmével
- Mindkét role támogatja a dry-run-t, automatikus konténer újraindítást és orphan cleanup-ot

## Projekt útvonal

- **Helyi fejlesztés**: Az útvonal automatikusan felismerésre kerül a playbook helyéből
- **Produkciós/távoli szerverek**: Felülírható a `docusaurus_path` változóval:

```bash
ansible-playbook -i inventory/hosts.yml deploy-docs.yml -e "docusaurus_path=/opt/docusaurus"
```

## Gyors parancsok

```bash
# Docs forgatókönyvek telepítése
cd ansible
ansible-playbook -i inventory/hosts.yml deploy-docs.yml

# Blog bejegyzések telepítése
ansible-playbook -i inventory/hosts.yml deploy-blog.yml

# Dry-run
ansible-playbook -i inventory/hosts.yml deploy-docs.yml --check --diff
```
