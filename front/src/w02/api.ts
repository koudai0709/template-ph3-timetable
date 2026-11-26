import type { Course } from "../w01/timetable.ts";
import type { FetchFn } from "./fake-api.ts";

export type LoadResult =
  | { ok: true; courses: Course[] }
  | { ok: false; reason: "server" | "network" }
  | { ok: false; reason: "invalid"; ids: number[] };

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isCourse(value: unknown): value is Course {
  if (!isObject(value)) {
    return false;
  }

  return (
    "id" in value && typeof value.id === "number" &&
    "code" in value && typeof value.code === "string" &&
    "name" in value && typeof value.name === "string" &&
    "teacher" in value && (typeof value.teacher === "string" || value.teacher === null) &&
    "day" in value && (
      value.day === 1 || value.day === 2 || value.day === 3 ||
      value.day === 4 || value.day === 5
    ) &&
    "period" in value && typeof value.period === "number" &&
    "room" in value && typeof value.room === "string" &&
    "credits" in value && typeof value.credits === "number" &&
    "required" in value && typeof value.required === "boolean"
  );
}

export async function loadCourses(fetchFn: FetchFn): Promise<LoadResult> {
  let response: Response;
  try {
    response = await fetchFn("/api/courses");
  } catch {
    return { ok: false, reason: "network" };
  }

  if (!response.ok) {
    return { ok: false, reason: "server" };
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, reason: "invalid", ids: [] };
  }

  if (!Array.isArray(body)) {
    return { ok: false, reason: "invalid", ids: [] };
  }

  const items: unknown[] = body;
  const courses: Course[] = [];
  const ids: number[] = [];

  for (const item of items) {
    if (isCourse(item)) {
      courses.push(item);
    } else if (isObject(item) && "id" in item && typeof item.id === "number") {
      ids.push(item.id);
    }
  }

  if (courses.length !== items.length) {
    return { ok: false, reason: "invalid", ids };
  }

  return { ok: true, courses };
}
