import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="card space-y-4">
        <p className="badge bg-brand-100 text-brand-900">Fullstack Uebung</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Task Manager mit Next.js 14, Prisma und SQLite
        </h1>
        <p className="max-w-2xl text-slate-600">
          Nutze dieses Projekt fuer Teamuebungen mit Feature-Branches,
          Pull-Requests und Merge-Konflikten in einem realistischen
          Fullstack-Setup.
        </p>
        <p className="max-w-2xl text-slate-600">
          Das Projekt beinhaltet eine einfache Task-Management-Anwendung mit
          Funktionen zum Erstellen, Bearbeiten und Anzeigen von Aufgaben.
        </p>
        <Link
          href="/tasks"
          className="inline-flex items-center rounded-xl bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-600"
        >
          Zu den Aufgaben
        </Link>
      </section>
    </main>
  );
}
