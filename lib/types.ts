import type { Task } from "@prisma/client";

export const TASK_STATUSES = ["OPEN", "IN_PROGRESS", "DONE"] as const;
export type TaskStatusValue = (typeof TASK_STATUSES)[number];

export type TaskEntity = Omit<Task, "status"> & { status: TaskStatusValue };

export function isTaskStatus(value: string): value is TaskStatusValue {
  return TASK_STATUSES.includes(value as TaskStatusValue);
}

export function toTaskEntity(task: Task): TaskEntity | null {
  if (!isTaskStatus(task.status)) {
    return null;
  }

  return {
    ...task,
    status: task.status,
  };
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatusValue;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatusValue;
}

export interface ApiSuccess<T> {
  data: T;
}

export interface ApiError {
  error: string;
}
