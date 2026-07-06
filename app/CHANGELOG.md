# CHANGELOG.md

# Changelog

---

# v0.3.2-alpha

## Authentication

✅ Login

✅ Sign Up

✅ Forgot Password

✅ Reset Password

---

## Dashboard

✅ Dashboard base

✅ StatCard reutilizable

✅ Refactor inicial

---

## Teams

✅ CRUD

✅ Logos

✅ Banner

✅ Edición

---

## Players

✅ CRUD

✅ Avatar

✅ PlayerService

✅ Team Players

---

## Tournament

✅ Creación

✅ Registro de equipos

✅ Equipos registrados

---

## Matches

✅ Round Robin

✅ MatchService

✅ MatchResultDialog

✅ Edit Result

✅ Save Result

✅ Finish Match

✅ Reopen Match

✅ Refresh automático

---

## Standings

✅ Tipo Standing

✅ StandingService

✅ Standings dinámicos

✅ StandingsTable

✅ Refactor inicial

---

## Arquitectura

✅ Organización por features

✅ Dashboard modular

✅ PlayerService movido a implementación dentro de `features`

✅ `services/player.service.ts` convertido en reexport

---

## Correcciones

* Restaurado `features/players/services/player.service.ts` tras una sobrescritura accidental.
* Eliminada referencia circular de `PlayerService`.
* Corregida resolución de imports del Dashboard.
* Restaurado `StandingsTable`.
* Corregida estructura del módulo Standings.
* Verificado `tsconfig`.
* Proyecto recuperado y compilando nuevamente.

---

## Estado actual

Build:

✅ Correcto

TypeScript:

✅ Sin errores

Next.js:

✅ Compila correctamente

---

## Próximo Sprint

ASL-029

### Objetivos

* Dashboard avanzado.
* Próximos partidos.
* Últimos resultados.
* Actividad reciente.
* Widgets reutilizables.
* Estadísticas en tiempo real.
* Base para gráficas.
* Preparación para Knockout Bracket.
