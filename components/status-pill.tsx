import type { TaskStatusValue } from "@/lib/types";

const statusClasses: Record<TaskStatusValue, string> = {
  OPEN: "bg-amber-100 text-amber-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-emerald-100 text-emerald-800",
};

const statusLabels: Record<TaskStatusValue, string> = {
  OPEN: "Offen",
  IN_PROGRESS: "In Arbeit",
  DONE: "Erledigt",
};

export default function StatusPill({ status }: { status: TaskStatusValue }) {
  return (
    <span className={`badge ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
