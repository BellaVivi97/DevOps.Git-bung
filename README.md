# Task Manager Uebungsprojekt (Next.js 14 + Prisma + SQLite)

Dieses Repository ist ein Fullstack-Uebungsprojekt fuer Teamarbeit mit Feature-Branches und Pull-Requests.

## Tech-Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Prisma ORM
- SQLite
- Next.js Route Handler unter `app/api/...`

## Projektstruktur

```txt
/app
  /api/tasks/route.ts
  /api/tasks/[id]/route.ts
  /tasks/page.tsx
  /tasks/[id]/page.tsx
  layout.tsx
  page.tsx
/components
  status-filter.tsx
  status-pill.tsx
  task-board.tsx
  task-detail-form.tsx
  task-form.tsx
  task-list.tsx
/lib
  prisma.ts
  types.ts
/prisma
  schema.prisma
```

## Setup

1. Dependencies installieren

```bash
npm install
```

2. Umgebungsvariable anlegen

```bash
cp .env.example .env
```

3. Prisma Client generieren und Migration ausfuehren

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

4. Entwicklungsserver starten

```bash
npm run dev
```

Danach ist die App unter http://localhost:3000 erreichbar.

## Git-Workflow (Feature-Branch + PR)

- Hauptbranch: `main`
- Jedes Feature wird in einem eigenen Branch entwickelt: `feature/kurze-beschreibung`
- Merge in `main` erfolgt ausschliesslich via Pull Request
- Fuer 2-3 Personen: parallele Entwicklung auf getrennten Branches, taegliches Rebase oder Merge von `main` empfohlen

## Feature-Aufteilung fuer die Branch-Uebung

Die folgenden Features sind bewusst so zugeschnitten, dass sie 3-5 Dateien beruehren und realistisch Konflikte erzeugen koennen.

1. `feature/task-create-form`

- `components/task-form.tsx`
- `components/task-board.tsx`
- `app/api/tasks/route.ts`

2. `feature/task-status-filter`

- `components/status-filter.tsx`
- `components/task-board.tsx`
- `components/task-list.tsx`

3. `feature/task-detail-edit`

- `app/tasks/[id]/page.tsx`
- `components/task-detail-form.tsx`
- `app/api/tasks/[id]/route.ts`

4. `feature/task-delete-flow`

- `components/task-list.tsx`
- `components/task-detail-form.tsx`
- `app/api/tasks/[id]/route.ts`

5. `feature/task-list-layout`

- `app/tasks/page.tsx`
- `components/task-board.tsx`
- `app/globals.css`

6. `feature/task-api-error-handling`

- `app/api/tasks/route.ts`
- `app/api/tasks/[id]/route.ts`
- `lib/types.ts`

## Anleitung fuer den ersten Merge / Pull Request

1. Branch erstellen und wechseln

```bash
git checkout -b feature/task-create-form
```

2. Feature implementieren (nur Scope des Branches)

3. Aenderungen pruefen und committen

```bash
git status
git add .
git commit -m "feat: add task create form"
```

4. Branch pushen

```bash
git push -u origin feature/task-create-form
```

5. Pull Request von `feature/task-create-form` nach `main` erstellen

- Beschreibung: Ziel, geaenderte Dateien, Testschritte
- Reviewer aus dem Team zuweisen

6. Nach Review mergen und lokal aktualisieren

```bash
git checkout main
git pull
```

## API-Uebersicht

- `GET /api/tasks` - alle Aufgaben laden
- `GET /api/tasks?status=OPEN|IN_PROGRESS|DONE` - gefiltert laden
- `POST /api/tasks` - neue Aufgabe erstellen
- `GET /api/tasks/:id` - Aufgabe per ID laden
- `PATCH /api/tasks/:id` - Aufgabe aktualisieren
- `DELETE /api/tasks/:id` - Aufgabe loeschen

Alle Route-Handler verwenden `try/catch` und geben JSON mit `NextResponse.json()` zurueck.
