"use client";

import Link from "next/link";
import StatusPill from "@/components/status-pill";
import {
  TASK_STATUSES,
  type TaskEntity,
  type TaskStatusValue,
} from "@/lib/types";

interface TaskListProps {
  tasks: TaskEntity[];
  onChangeStatus: (id: number, status: TaskStatusValue) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TaskList({
  tasks,
  onChangeStatus,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="card text-slate-600">
        Keine Aufgaben gefunden. Lege eine neue Aufgabe an.
      </div>
    );
  }

  return (
    <ul className="grid gap-3">
      {tasks.map((task) => (
        <li key={task.id} className="card space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900">
                {task.title}
              </h3>
              <p className="text-sm text-slate-600">
                {task.description || "Keine Beschreibung"}
              </p>
            </div>
            <StatusPill status={task.status} />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onChangeStatus(task.id, TASK_STATUSES[0])}
              className="rounded-lg bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800"
            >
              Offen
            </button>
            <button
              type="button"
              onClick={() => onChangeStatus(task.id, TASK_STATUSES[1])}
              className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              In Arbeit
            </button>
            <button
              type="button"
              onClick={() => onChangeStatus(task.id, TASK_STATUSES[2])}
              className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800"
            >
              Erledigt
            </button>
            <Link
              href={`/tasks/${task.id}`}
              className="rounded-lg bg-slate-200 px-3 py-1 text-sm font-medium text-slate-800"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded-lg bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800"
            >
              Loeschen
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
