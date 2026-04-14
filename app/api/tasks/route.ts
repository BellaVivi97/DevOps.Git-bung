import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  TASK_STATUSES,
  isTaskStatus,
  toTaskEntity,
  type ApiError,
  type ApiSuccess,
  type CreateTaskInput,
  type TaskEntity,
} from "@/lib/types";

const statusValues = [...TASK_STATUSES];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");

    const whereClause =
      statusParam && isTaskStatus(statusParam) ? { status: statusParam } : {};

    const rawTasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    const tasks = rawTasks
      .map((task) => toTaskEntity(task))
      .filter((task): task is TaskEntity => task !== null);

    return NextResponse.json<ApiSuccess<TaskEntity[]>>({ data: tasks });
  } catch {
    return NextResponse.json<ApiError>(
      { error: "Aufgaben konnten nicht geladen werden." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateTaskInput;

    if (!body.title || body.title.trim().length < 3) {
      return NextResponse.json<ApiError>(
        { error: "Der Titel muss mindestens 3 Zeichen haben." },
        { status: 400 },
      );
    }

    if (body.status && !isTaskStatus(body.status)) {
      return NextResponse.json<ApiError>(
        { error: "Ungueltiger Statuswert." },
        { status: 400 },
      );
    }

    const rawTask = await prisma.task.create({
      data: {
        title: body.title.trim(),
        description: body.description?.trim() || null,
        status: body.status ?? "OPEN",
      },
    });

    const task = toTaskEntity(rawTask);

    if (!task) {
      return NextResponse.json<ApiError>(
        { error: "Aufgabe enthaelt ungueltigen Status." },
        { status: 500 },
      );
    }

    return NextResponse.json<ApiSuccess<TaskEntity>>(
      { data: task },
      { status: 201 },
    );
  } catch {
    return NextResponse.json<ApiError>(
      { error: "Aufgabe konnte nicht erstellt werden." },
      { status: 500 },
    );
  }
}
