# PROJECT.md

# AllSports League (ASL)

**Versión:** v0.18-alpha
**Estado:** En desarrollo (estable)

---

# Objetivo

Construir una plataforma moderna para la gestión de ligas, torneos, equipos y jugadores, con una arquitectura limpia, escalable y mantenible.

La prioridad es siempre mantener el proyecto compilando y evitar cambios que rompan funcionalidades existentes.

---

# Stack

* Next.js 16
* React 19
* TypeScript (Strict)
* TailwindCSS
* Supabase
* App Router

---

# Arquitectura

* app/
* components/
* features/
* services/
* lib/
* public/

Todo el código nuevo debe respetar esta estructura.

---

# Reglas de desarrollo

* Un sprint a la vez.
* Máximo un archivo completo por respuesta.
* Nunca modificar muchos archivos al mismo tiempo.
* Siempre entregar archivos completos.
* Reutilizar componentes y servicios existentes.
* No duplicar lógica.
* No romper funcionalidades existentes.
* Evitar el uso de `any`.
* TypeScript estricto.
* Analizar antes de modificar.
* Mantener una arquitectura limpia y modular.

---

# Flujo de trabajo

Al finalizar cada sprint:

```bash
npm run build
```

Si existe algún error:

* Resolverlo antes de continuar.
* No avanzar al siguiente sprint.

Después:

```bash
git add .
git commit -m "ASL-XXX descripción"
git push
```

Actualizar siempre:

* PROJECT.md
* CHANGELOG.md

---

# Estado actual

## Completado

* Authentication
* Dashboard
* Teams CRUD
* Players CRUD
* Tournament CRUD
* Fixtures
* Enter Results
* Standings
* Dashboard Statistics
* Upcoming Matches
* Latest Results
* Recent Activity
* Team Logos
* Team Banners
* Perfiles públicos de equipos
* Perfiles públicos de jugadores
* Eliminación de Team IDs visibles

---

# Seguridad

Resultados protegidos:

* Solo el propietario del torneo puede modificarlos.
* Los demás usuarios tienen acceso de solo lectura.
* Preparado para RLS en Supabase.

---

# Diseño

Actualmente migrando a Premium UI.

Incluye:

* Glassmorphism
* Gradientes
* Mejor tipografía
* Animaciones
* Responsive
* Componentes reutilizables

---

# Roadmap

## ASL-021

Premium UI

* Dashboard Premium
* Glassmorphism global
* Hero moderno
* Componentes visuales reutilizables
* Skeleton Loaders

## ASL-022

Plataforma pública

* Perfil público de torneos
* Landing Page
* Equipos destacados
* Jugadores destacados

## ASL-023

Rankings

* Equipos
* Jugadores
* Torneos

## ASL-024

Búsqueda global

## ASL-025

Notificaciones

## ASL-026

Admin Center

## ASL-027

Realtime

## ASL-028

Performance

## ASL-029

Release v1.0
