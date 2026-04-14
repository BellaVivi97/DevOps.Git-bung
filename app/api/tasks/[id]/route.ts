import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  TASK_STATUSES,
  isTaskStatus,
  toTaskEntity,
  type ApiError,
  type ApiSuccess,
  type TaskEntity,
  type UpdateTaskInput,
} from "@/lib/types";

const statusValues = [...TASK_STATUSES];

function parseId(id: string) {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseId(params.id);

    if (!id) {
      return NextResponse.json<ApiError>(
        { error: "Ungueltige ID." },
        { status: 400 },
      );
    }

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return NextResponse.json<ApiError>(
        { error: "Aufgabe nicht gefunden." },
        { status: 404 },
      );
    }

    const typedTask = toTaskEntity(task);

    if (!typedTask) {
      return NextResponse.json<ApiError>(
        { error: "Aufgabe enthaelt ungueltigen Status." },
        { status: 500 },
      );
    }

    return NextResponse.json<ApiSuccess<TaskEntity>>({ data: typedTask });
  } catch {
    return NextResponse.json<ApiError>(
      { error: "Aufgabe konnte nicht geladen werden." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseId(params.id);

    if (!id) {
      return NextResponse.json<ApiError>(
        { error: "Ungueltige ID." },
        { status: 400 },
      );
    }

    const body = (await request.json()) as UpdateTaskInput;

    if (body.title !== undefined && body.title.trim().length < 3) {
      return NextResponse.json<ApiError>(
        { error: "Der Titel muss mindestens 3 Zeichen haben." },
        { status: 400 },
      );
    }

    if (body.status !== undefined && !isTaskStatus(body.status)) {
      return NextResponse.json<ApiError>(
        { error: "Ungueltiger Statuswert." },
        { status: 400 },
      );
    }

    const existingTask = await prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      return NextResponse.json<ApiError>(
        { error: "Aufgabe nicht gefunden." },
        { status: 404 },
      );
    }

    const rawTask = await prisma.task.update({
      where: { id },
      data: {
        title: body.title?.trim(),
        description:
          body.description !== undefined
            ? body.description.trim() || null
            : undefined,
        status: body.status,
      },
    });

    const task = toTaskEntity(rawTask);

    if (!task) {
      return NextResponse.json<ApiError>(
        { error: "Aufgabe enthaelt ungueltigen Status." },
        { status: 500 },
      );
    }

    return NextResponse.json<ApiSuccess<TaskEntity>>({ data: task });
  } catch {
    return NextResponse.json<ApiError>(
      { error: "Aufgabe konnte nicht aktualisiert werden." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseId(params.id);

    if (!id) {
      return NextResponse.json<ApiError>(
        { error: "Ungueltige ID." },
        { status: 400 },
      );
    }

    const existingTask = await prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      return NextResponse.json<ApiError>(
        { error: "Aufgabe nicht gefunden." },
        { status: 404 },
      );
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json<ApiSuccess<{ id: number }>>({ data: { id } });
  } catch {
    return NextResponse.json<ApiError>(
      { error: "Aufgabe konnte nicht geloescht werden." },
      { status: 500 },
    );
  }
}
