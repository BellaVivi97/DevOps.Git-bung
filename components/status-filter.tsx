"use client";

import { TASK_STATUSES, type TaskStatusValue } from "@/lib/types";

interface StatusFilterProps {
  value: TaskStatusValue | "ALL";
  onChange: (value: TaskStatusValue | "ALL") => void;
}

const options: Array<{ value: TaskStatusValue | "ALL"; label: string }> = [
  { value: "ALL", label: "Alle" },
  { value: TASK_STATUSES[0], label: "Offen" },
  { value: TASK_STATUSES[1], label: "In Arbeit" },
  { value: TASK_STATUSES[2], label: "Erledigt" },
];

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
            value === option.value
              ? "bg-brand-500 text-white"
              : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
