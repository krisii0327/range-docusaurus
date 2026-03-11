---
sidebar_position: 3
id: dev-standards-git-conventions
title: "Git Conventions"
description: "Git Conventions - Development Standards"
---

# Git Conventions

## Branch Naming

```
feature/TICKET-123-short-description
bugfix/TICKET-456-fix-login-error
hotfix/TICKET-789-security-patch
release/v2.1.0
```

## Commit Messages

We follow the **Conventional Commits** standard:

```
type(scope): description

feat(auth): add OAuth2 login support
fix(api): resolve timeout on large file uploads
docs(readme): update installation instructions
refactor(core): simplify database connection pool
```

### Types

- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `test` — Adding or correcting tests
- `chore` — Maintenance tasks

## Pull Request Template

Every PR must include:
- **What**: Brief description of the change
- **Why**: Business or technical reason
- **Testing**: How it was tested
- **Screenshots**: If UI changes are involved
