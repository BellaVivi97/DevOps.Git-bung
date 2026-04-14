import { prisma } from "@/lib/prisma";
import TaskBoard from "@/components/task-board";
import { toTaskEntity, type TaskEntity } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const rawTasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  const tasks: TaskEntity[] = rawTasks
    .map((task) => toTaskEntity(task))
    .filter((task): task is TaskEntity => task !== null);

  return (
    <main className="page-shell">
      <TaskBoard initialTasks={tasks} />
    </main>
  );
}
