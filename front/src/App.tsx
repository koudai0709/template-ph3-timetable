// W3 からの画面の入口。pnpm dev で開くと、この App が表示される
import { TimetableGrid } from "./components/TimetableGrid.tsx";
import courses from "./data/courses.json";
import type { Course } from "./types.ts";
import { isCourse } from "./w02/api.ts";

export default function App() {
  const courseData: unknown[] = courses;
  const validCourses: Course[] = courseData.filter(isCourse);

  return (
    <main className="p-4">
      <TimetableGrid courses={validCourses} />
    </main>
  );
}
