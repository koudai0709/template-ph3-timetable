import type { Course } from "../types.ts";
import { CourseCard } from "./CourseCard.tsx";

type PeriodCellProps = {
  courses: Course[];
};

export function PeriodCell({ courses }: PeriodCellProps) {
  return (
    <td className="border border-slate-200 p-2 align-top">
      {courses.length === 0 ? (
        <span className="text-slate-500">—</span>
      ) : (
        <div className="space-y-2">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </td>
  );
}