# PROJECT.md

# AllSports League

## Información general

**Proyecto:** AllSports League

**Versión actual:** v0.3.2-alpha

**Sprint actual:** ASL-029

**Estado:** Estable (Build limpio)

---

# Stack

* Next.js 16
* React 19
* TypeScript (strict)
* TailwindCSS
* Supabase
* Base UI / shadcn-ui
* Lucide Icons

---

# Arquitectura

## app/

Solo contiene páginas.

No debe contener lógica de negocio.

---

## features/

Contiene toda la lógica de negocio organizada por módulos.

Módulos actuales:

* auth
* dashboard
* matches
* players
* standings
* teams
* tournaments

---

## services/

Los servicios de la raíz existen únicamente como punto de acceso cuando es necesario.

La implementación real debe vivir dentro de `features`.

Ejemplo:

* `features/players/services/player.service.ts` ← implementación
* `services/player.service.ts` ← reexport

No duplicar lógica entre ambos.

---

## lib/

Contiene:

* supabase
* types
* utils

---

## components/

Componentes UI reutilizables.

---

# Módulos implementados

## Authentication

* Login
* Sign Up
* Forgot Password
* Reset Password

---

## Dashboard

* Estadísticas principales
* StatCard reutilizable
* Bienvenida dinámica

Pendiente:

* Próximos partidos
* Últimos resultados
* Actividad reciente
* Widgets
* Métricas

---

## Teams

* CRUD
* Logos
* Banners
* Detalle del equipo

---

## Players

* CRUD
* Avatar
* Búsqueda
* PlayerService
* Team Players

---

## Tournaments

* CRUD
* Registro de equipos
* Equipos registrados

---

## Matches

* Round Robin
* MatchService
* MatchResultDialog
* Edit Result
* Save Result
* Finish Match
* Reopen Match
* Refresh automático

---

## Standings

* StandingService
* StandingsPage
* StandingsTable
* Cálculo dinámico

---

# Convenciones

* TypeScript strict.
* Sin `any` innecesarios.
* Componentes reutilizables.
* No romper funcionalidades existentes.
* Mantener separación por módulos.
* Un archivo por respuesta.
* Archivo completo.
* Esperar siempre `npm run build`.

---

# Flujo de trabajo

Antes de modificar cualquier archivo:

1. Verificar si existe otro archivo con el mismo nombre.
2. Confirmar la ruta correcta.
3. Modificar únicamente un archivo.
4. Esperar el resultado del build.

Nunca asumir contenido de archivos no vistos.

---

# Estado actual

Build:

✅ Compila correctamente.

Última verificación:

* Next.js Build: OK
* TypeScript: OK

---

# Próximo Sprint (ASL-029)

Objetivo principal:

Dashboard Avanzado.

Orden recomendado:

1. Dashboard widgets.
2. Próximos partidos.
3. Últimos resultados.
4. Actividad reciente.
5. Dashboard charts.
6. Knockout Bracket.
7. Live Matches.
8. Estadísticas avanzadas.
9. Realtime.
