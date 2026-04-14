"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import StatusPill from "@/components/status-pill";
import {
  TASK_STATUSES,
  type ApiError,
  type TaskEntity,
  type TaskStatusValue,
} from "@/lib/types";

interface TaskDetailFormProps {
  task: TaskEntity;
}

async function toError(response: Response): Promise<string> {
  const body = (await response.json()) as ApiError;
  return body.error;
}

export default function TaskDetailForm({ task }: TaskDetailFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [status, setStatus] = useState<TaskStatusValue>(task.status);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSaving(true);

    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });

    setIsSaving(false);

    if (!response.ok) {
      setMessage(await toError(response));
      return;
    }

    setMessage("Aenderungen gespeichert.");
    router.refresh();
  }

  async function handleDelete() {
    setMessage("");
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setMessage(await toError(response));
      return;
    }

    router.push("/tasks");
    router.refresh();
  }

  return (
    <section className="space-y-6">
      <header className="card space-y-2">
        <p className="text-sm text-slate-500">Aufgabe #{task.id}</p>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Aufgabe bearbeiten
          </h1>
          <StatusPill status={status} />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="card grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-700">Titel</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            minLength={3}
            required
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-700">
            Beschreibung
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as TaskStatusValue)
            }
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value={TASK_STATUSES[0]}>Offen</option>
            <option value={TASK_STATUSES[1]}>In Arbeit</option>
            <option value={TASK_STATUSES[2]}>Erledigt</option>
          </select>
        </label>

        {message ? (
          <p className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
            {message}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? "Speichert..." : "Speichern"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-xl bg-rose-100 px-4 py-2 font-medium text-rose-800"
          >
            Aufgabe loeschen
          </button>
          <Link
            href="/tasks"
            className="rounded-xl bg-slate-200 px-4 py-2 font-medium text-slate-800"
          >
            Zurueck zur Liste
          </Link>
        </div>
      </form>
    </section>
  );
}
