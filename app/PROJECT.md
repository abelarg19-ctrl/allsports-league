# 🏆 AllSports League

## Estado

**Versión:** v0.3.5-alpha

**Estado:** 🟢 Desarrollo activo

---

# Stack

- Next.js 16
- React 19
- TypeScript
- TailwindCSS
- Base UI
- Supabase
- Supabase Storage
- React Hook Form
- Zod

---

# Arquitectura

```
app/
components/
features/
hooks/
lib/
services/
public/
```

Todo código nuevo deberá vivir dentro de `features`.

---

# Módulos

## Auth

- ✅ Login

---

## Teams

- ✅ CRUD
- ✅ Perfil
- ✅ Editar
- ✅ Logo
- ✅ Banner
- ✅ Team Header

---

## Players

- ✅ CRUD
- ✅ Perfil
- ✅ Avatar
- ✅ Editar
- ✅ Eliminar
- ✅ Upload Avatar

---

## Tournaments

- ✅ CRUD
- ✅ TournamentService
- ✅ Tournament Registration Base
- 🚧 Register Teams
- ⬜ Fixtures
- ⬜ Standings
- ⬜ Brackets

---

## Matches

- ✅ MatchService
- ⬜ Match Center
- ⬜ Live
- ⬜ Results

---

# Servicios

- ✅ TeamService
- ✅ PlayerService
- ✅ TournamentService
- ✅ MatchService
- ✅ TeamStorageService

---

# Storage

- ✅ team-logos
- ✅ team-banners
- ✅ player-avatars

---

# Base de datos

- ✅ teams
- ✅ players
- ✅ tournaments
- ✅ tournament_teams

---

# Próximo Sprint

## ASL-020

- Register Team
- Tournament Teams
- Fixtures Generator

---

# Reglas

- Un archivo por sprint.
- Proyecto siempre compilando.
- Sin código duplicado.
- Componentes reutilizables.
- Servicios desacoplados.
- No lógica de negocio en páginas.

---

# Objetivo

Completar el **Tournament Engine** antes de comenzar estadísticas, rankings y organización de ligas.