---
sidebar_position: 1
id: dev-standards-code-review
title: "Code Review Process"
description: "Code Review Process - Development Standards"
---

# Code Review Process

## Overview

Every code change at CodeTechSolutions must go through peer review before merging. This ensures code quality, knowledge sharing, and reduces bugs in production.

## Workflow

1. **Create a feature branch** from `main`
2. **Develop and commit** your changes with clear commit messages
3. **Open a Pull Request** on Gitea with a descriptive title
4. **Request review** from at least one team member
5. **Address feedback** and push updates
6. **Merge** once approved (squash merge preferred)

## Review Checklist

Reviewers should check for:

- [ ] Code follows project style guide
- [ ] Unit tests are included for new functionality
- [ ] No hardcoded secrets or credentials
- [ ] Error handling is appropriate
- [ ] Documentation is updated if needed

## SLA

- Reviews should be completed within **4 business hours**
- If no reviewer is available, escalate to the Dev Lead (Kristóf Varga)
