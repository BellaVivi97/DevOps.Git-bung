"use client";

import { useMemo, useState } from "react";
import StatusFilter from "@/components/status-filter";
import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";
import type {
  ApiError,
  ApiSuccess,
  TaskEntity,
  TaskStatusValue,
} from "@/lib/types";

interface TaskBoardProps {
  initialTasks: TaskEntity[];
}

async function toJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export default function TaskBoard({ initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState<TaskEntity[]>(initialTasks);
  const [filter, setFilter] = useState<TaskStatusValue | "ALL">("ALL");
  const [message, setMessage] = useState<string>("");

  const visibleTasks = useMemo(() => {
    if (filter === "ALL") {
      return tasks;
    }

    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  async function createTask(payload: { title: string; description?: string }) {
    setMessage("");
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await toJson<ApiError>(response);
      setMessage(errorBody.error);
      return;
    }

    const body = await toJson<ApiSuccess<TaskEntity>>(response);
    setTasks((prev) => [body.data, ...prev]);
    setMessage("Aufgabe wurde erstellt.");
  }

  async function changeTaskStatus(id: number, status: TaskStatusValue) {
    setMessage("");
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorBody = await toJson<ApiError>(response);
      setMessage(errorBody.error);
      return;
    }

    const body = await toJson<ApiSuccess<TaskEntity>>(response);
    setTasks((prev) => prev.map((task) => (task.id === id ? body.data : task)));
  }

  async function deleteTask(id: number) {
    setMessage("");
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorBody = await toJson<ApiError>(response);
      setMessage(errorBody.error);
      return;
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));
    setMessage("Aufgabe wurde geloescht.");
  }

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <p className="badge bg-brand-100 text-brand-900">Task Manager</p>
        <h1 className="text-3xl font-bold tracking-tight">
          Aufgabenverwaltung
        </h1>
        <p className="text-slate-600">
          Aufgaben erstellen, Status anpassen und im Team ueber Feature-Branches
          entwickeln.
        </p>
      </header>

      <TaskForm onSubmit={createTask} />

      <div className="card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Aufgabenliste</h2>
          <StatusFilter value={filter} onChange={setFilter} />
        </div>
        {message ? (
          <p className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
            {message}
          </p>
        ) : null}
        <TaskList
          tasks={visibleTasks}
          onChangeStatus={changeTaskStatus}
          onDelete={deleteTask}
        />
      </div>
    </section>
  );
}
