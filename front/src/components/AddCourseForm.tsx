import { useState, type FormEvent } from "react";
import type { Course, Day } from "../types.ts";

type AddCourseFormProps = {
  courses: Course[];
  onAdd: (course: Course) => void;
};

function toDay(value: string): Day | null {
  const day = Number(value);
  if (String(day) === value && (day === 1 || day === 2 || day === 3 || day === 4 || day === 5)) {
    return day;
  }
  return null;
}

export function AddCourseForm({ courses, onAdd }: AddCourseFormProps) {
  const [day, setDay] = useState<Day | null>(null);
  const [courseId, setCourseId] = useState("");
  const candidates = courses.filter((course) => course.day === day);
  const selectedCourse = candidates.find((course) => String(course.id) === courseId);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (selectedCourse) {
      onAdd(selectedCourse);
    }
  }

  return (
    <form className="flex flex-wrap items-end gap-3" onSubmit={handleSubmit}>
      <label className="grid gap-1">
        曜日
        <select
          className="rounded border p-2"
          value={day ?? ""}
          onChange={(event) => {
            setDay(toDay(event.currentTarget.value));
            setCourseId("");
          }}
        >
          <option value="">曜日を選択</option>
          <option value="1">月</option>
          <option value="2">火</option>
          <option value="3">水</option>
          <option value="4">木</option>
          <option value="5">金</option>
        </select>
      </label>
      <label className="grid min-w-0 max-w-full gap-1">
        授業
        <select
          className="min-w-0 rounded border p-2"
          value={selectedCourse ? courseId : ""}
          onChange={(event) => setCourseId(event.currentTarget.value)}
          disabled={candidates.length === 0}
        >
          <option value="">授業を選択</option>
          {candidates.map((course) => (
            <option key={course.id} value={course.id}>
              {course.period}限 {course.name}
            </option>
          ))}
        </select>
      </label>
      <button
        className="rounded bg-blue-800 px-3 py-2 text-white disabled:opacity-50"
        type="submit"
        disabled={!selectedCourse}
      >
        時間割に入れる
      </button>
    </form>
  );
}
