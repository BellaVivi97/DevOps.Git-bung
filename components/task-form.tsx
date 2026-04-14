"use client";

import { FormEvent, useState } from "react";

interface TaskFormProps {
  onSubmit: (payload: { title: string; description?: string }) => Promise<void>;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ title, description });
      setTitle("");
      setDescription("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-3">
      <h2 className="text-xl font-semibold">Neue Aufgabe</h2>
      <label className="grid gap-1">
        <span className="text-sm font-medium text-slate-700">Titel</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="z. B. API-Dokumentation schreiben"
          minLength={3}
          required
          className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium text-slate-700">Beschreibung</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-xl bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Wird gespeichert..." : "Aufgabe anlegen"}
      </button>
    </form>
  );
}
