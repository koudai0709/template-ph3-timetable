import type { Course } from "../types.ts";

type SelectedCourseListProps = {
  courses: Course[];
  onRemove: (id: number) => void;
};

export function SelectedCourseList({ courses, onRemove }: SelectedCourseListProps) {
  return (
    <ul className="space-y-2">
      {courses.map((course) => (
        <li key={course.id} className="flex items-center gap-2">
          <span>{course.name}</span>
          <button className="rounded border px-2 py-1" type="button" onClick={() => onRemove(course.id)}>
            外す
          </button>
        </li>
      ))}
    </ul>
  );
}
