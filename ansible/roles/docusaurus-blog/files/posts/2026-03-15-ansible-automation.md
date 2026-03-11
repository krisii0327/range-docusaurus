---
title: "Dokumentáció automatizálás Ansible-lel"
authors:
  - name: Platform Engineering
    title: DevOps
tags: [ansible, automation, devops]
description: "Hogyan automatizáltuk a belső dokumentáció telepítését Ansible playbook-ok segítségével."
---

A CodeTechSolutions-nél az Ansible segítségével automatizáltuk a dokumentációs portál tartalmának kezelését. Ez a bejegyzés bemutatja, hogyan működik a rendszer és milyen előnyökkel jár.

<!-- truncate -->

## Miért Ansible?

A dokumentáció karbantartása gyakran manuális és hibalehetőségekkel teli folyamat. Az Ansible lehetővé teszi, hogy:

- **Verziókezelt tartalmat** telepítsünk automatikusan
- **Konzisztens környezetet** biztosítsunk minden telepítéshez
- **Egyszerűen visszaállítható** legyen bármely korábbi állapot

## Hogyan működik?

A rendszer két fő komponensből áll:

### Forgatókönyv-alapú dokumentáció
Minden projekt vagy téma saját forgatókönyvként (scenario) él az Ansible role-ban. Egy egyszerű `ansible-playbook` paranccsal telepíthetők a Docusaurus `docs/` mappájába.

### Blog bejegyzések kezelése
A blog bejegyzések szintén Ansible-lel kezelhetők. Az új posztokat a role `files/posts/` mappájába helyezzük, majd a playbook gondoskodik a telepítésről.

## Eredmények

Az automatizálás bevezetése óta:

- A dokumentáció frissítése percek alatt megtörténik
- Nincs manuális fájlmásolás vagy szerkesztés a szerveren
- A tartalom mindig konzisztens és naprakész
