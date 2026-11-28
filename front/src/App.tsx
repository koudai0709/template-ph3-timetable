// W3 からの画面の入口。pnpm dev で開くと、この App が表示される
import { useState } from "react";
import { AddCourseForm } from "./components/AddCourseForm.tsx";
import { SelectedCourseList } from "./components/SelectedCourseList.tsx";
import { TimetableGrid } from "./components/TimetableGrid.tsx";
import courses from "./data/courses.json";
import type { Course, Day } from "./types.ts";
import { isCourse } from "./w02/api.ts";

const courseData: unknown[] = courses;
const validCourses: Course[] = courseData.filter(isCourse);
const dayLabels: Record<Day, string> = {
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
};

export default function App() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const totalCredits = selectedCourses.reduce((total, course) => total + course.credits, 0);

  function addCourse(course: Course): void {
    const existing = selectedCourses.find(
      (selected) => selected.day === course.day && selected.period === course.period,
    );
    if (existing) {
      setNotice(`${dayLabels[existing.day]}${existing.period}にはすでに ${existing.name} があります`);
      return;
    }

    setSelectedCourses([...selectedCourses, course]);
    setNotice(null);
  }

  function removeCourse(id: number): void {
    setSelectedCourses((current) => current.filter((course) => course.id !== id));
  }

  return (
    <main className="space-y-4 p-4">
      <AddCourseForm courses={validCourses} onAdd={addCourse} />
      {notice && <p role="status">{notice}</p>}
      <TimetableGrid courses={selectedCourses} />
      <SelectedCourseList courses={selectedCourses} onRemove={removeCourse} />
      <p>合計 {totalCredits} 単位</p>
    </main>
  );
}
