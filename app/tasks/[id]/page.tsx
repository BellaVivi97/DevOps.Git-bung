import { notFound } from "next/navigation";
import TaskDetailForm from "@/components/task-detail-form";
import { prisma } from "@/lib/prisma";
import { toTaskEntity } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const taskId = Number(params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    notFound();
  }

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  const typedTask = task ? toTaskEntity(task) : null;

  if (!typedTask) {
    notFound();
  }

  return (
    <main className="page-shell">
      <TaskDetailForm task={typedTask} />
    </main>
  );
}
