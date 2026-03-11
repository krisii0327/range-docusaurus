# Blog Bejegyzések Telepítés

A blog bejegyzések az Ansible `docusaurus-blog` role segítségével telepíthetők a Docusaurus `blog/` mappájába.

## Működés

1. A `files/posts/` mappában minden blog bejegyzés önálló `.md` fájlként található
2. A deploy során az Ansible `copy` modullal másolja a fájlokat a `blog/` mappába
3. A Docusaurus automatikusan felismeri az új bejegyzéseket
4. A fájlnév konvenció: `YYYY-MM-DD-bejegyzes-cime.md`

## Használat

### Blog bejegyzések deploy
```bash
cd ansible
ansible-playbook -i inventory/hosts.yml deploy-blog.yml
```

### Dry-run (változások megtekintése deploy nélkül)
```bash
ansible-playbook -i inventory/hosts.yml deploy-blog.yml --check --diff
```

### Orphan cleanup (nem baseline postok törlése)
```bash
ansible-playbook -i inventory/hosts.yml deploy-blog.yml -e "cleanup_blog=true"
```

Az orphan cleanup csak explicit kérésre fut. Ilyenkor törli azokat a bejegyzéseket a `blog/` mappából, amelyek nincsenek sem a baseline-ban, sem az Ansible role `files/posts/` mappájában.

## Új blog bejegyzés hozzáadása

### Ansible-lel (managed)

1. Hozz létre egy `.md` fájlt:
   ```
   ansible/roles/docusaurus-blog/files/posts/2026-04-10-new-post.md
   ```

2. Írd meg a bejegyzést a megfelelő formátummal (lásd lentebb)

3. Telepítsd:
   ```bash
   cd ansible
   ansible-playbook -i inventory/hosts.yml deploy-blog.yml
   ```

### Kézzel (baseline)

Közvetlenül a `blog/` mappába is elhelyezhetsz `.md` fájlokat. Ezek baseline bejegyzésekként kezelődnek — az orphan cleanup nem törli őket, amennyiben szerepelnek a `defaults/main.yml` `baseline_posts` listájában.

## Blog post formátum

```markdown
---
title: "Bejegyzés címe"
authors:
  - name: Szerző Név
    title: Csapat
tags: [tag1, tag2]
description: "Rövid leírás a bejegyzésről."
---

A bejegyzés bevezető része, ami a blog listában is megjelenik.

<!-- truncate -->

A teljes bejegyzés tartalma itt folytatódik...
```

### Frontmatter mezők

| Mező | Kötelező | Leírás |
|------|----------|--------|
| `title` | igen | A bejegyzés címe |
| `authors` | nem | Szerző(k) neve és pozíciója |
| `tags` | nem | Címkék a bejegyzéshez |
| `description` | nem | Rövid leírás (SEO, előnézet) |

### Truncate

A `<!-- truncate -->` komment jelzi, hol vágja el a Docusaurus az előnézetet a blog listában. Minden ami e felett van, megjelenik a lista nézetben; az alatta lévő tartalom csak a teljes bejegyzés oldalán látható.

## Baseline vs Ansible-managed

A `defaults/main.yml`-ben definiált `baseline_posts` védi a kézzel kezelt bejegyzéseket:

```yaml
baseline_posts:
  - "2025-03-01-welcome.md"
  - "2025-02-15-building-modern-docs.md"
```

Ha új baseline bejegyzést adsz hozzá kézzel a `blog/` mappába, add hozzá a `baseline_posts` listához is, hogy az orphan cleanup ne törölje.

## Automatikus újraindítás

A deployment után a Docusaurus dev konténer automatikusan újraindul, ha változás történt. Kikapcsolható:

```bash
ansible-playbook -i inventory/hosts.yml deploy-blog.yml -e "docker_compose_restart=false"
```
