import type { Course, Day } from "../types.ts";
import { PeriodCell } from "./PeriodCell.tsx";

type TimetableGridProps = {
  courses: Course[];
};

const weekdays: { day: Day; label: string }[] = [
  { day: 1, label: "月" },
  { day: 2, label: "火" },
  { day: 3, label: "水" },
  { day: 4, label: "木" },
  { day: 5, label: "金" },
];
const periods = [1, 2, 3, 4, 5, 6];

export function TimetableGrid({ courses }: TimetableGridProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] table-fixed border-collapse">
        <caption className="pb-3 text-left text-xl font-bold">時間割</caption>
        <thead className="bg-slate-100">
          <tr>
            <th scope="col" className="w-16 border border-slate-200 p-2">時限</th>
            {weekdays.map(({ day, label }) => (
              <th key={day} scope="col" className="border border-slate-200 p-2">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => (
            <tr key={period}>
              <th scope="row" className="border border-slate-200 bg-slate-100 p-2">{period}限</th>
              {weekdays.map(({ day }) => (
                <PeriodCell
                  key={day}
                  courses={courses.filter((course) => course.day === day && course.period === period)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
