import type { Course } from "../types.ts";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="rounded border border-slate-200 bg-white p-2">
      <p className="font-semibold">{course.name}</p>
      <p className="text-sm text-slate-600">{course.room}／{course.teacher ?? "担当未定"}</p>
      {course.required && <p className="text-sm font-medium text-blue-800">必修</p>}
    </div>
  );
}
