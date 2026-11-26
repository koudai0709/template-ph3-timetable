// W1 の POSSE課題：ここに型 Day・Course と、関数 formatCourse・coursesOnDay・sortCourses を書く
export type Day = 1 | 2 | 3 | 4 | 5;

export type Course = {
  id: number;
  code: string;
  name: string;
  teacher: string | null;
  day: Day;
  period: number;
  room: string;
  credits: number;
  required: boolean;
};

const dayLabels: Record<Day, string> = {
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
};

export function formatCourse(course: Course): string {
  const teacher = course.teacher ?? "担当未定";
  return `${dayLabels[course.day]}${course.period} ${course.name}（${course.room}／${teacher}）`;
}

export function coursesOnDay(courses: Course[], day: Day): Course[] {
  return courses.filter((course) => course.day === day);
}

export function sortCourses(courses: Course[]): Course[] {
  return [...courses].sort((a, b) => a.day - b.day || a.period - b.period);
}
