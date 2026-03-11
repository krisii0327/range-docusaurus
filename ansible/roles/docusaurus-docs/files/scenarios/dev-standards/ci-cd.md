---
sidebar_position: 2
id: dev-standards-ci-cd
title: "CI/CD Pipeline"
description: "CI/CD Pipeline - Development Standards"
---

# CI/CD Pipeline

## Pipeline Architecture

All CodeTechSolutions projects use a standardized CI/CD pipeline built on **Jenkins** and **Docker**.

```
Code Push → Jenkins Build → Unit Tests → SonarQube Scan → Docker Build → Deploy to Staging → Manual Approval → Deploy to Production
```

## Tools

| Tool | Purpose | Owner |
|------|---------|-------|
| Jenkins | Build orchestration | Márk Balogh (DevOps) |
| Docker | Containerization | Márk Balogh (DevOps) |
| SonarQube | Code quality | Lili Kiss (QA) |
| Gitea | Source control | Kristóf Varga (Dev Lead) |
| Harbor | Container registry | Eszter Nagy (Ops) |

## Environments

- **Development**: Auto-deployed on every push to feature branches
- **Staging**: Auto-deployed on merge to `main`
- **Production**: Manual approval required, deployed via Jenkins pipeline

## Rollback

In case of production issues:

```bash
# Rollback to previous version
jenkins-cli rollback --project PROJECT_NAME --version PREV_VERSION
```

Contact the DevOps team if you need assistance with pipeline configuration.
