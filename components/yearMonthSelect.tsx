"use client";

import { useEffect, useMemo, useState } from "react";

export default function YearMonth() {
  const now = useMemo(() => new Date(), []);
  const [year, setYear] = useState(now.getFullYear());
  const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(+e.target.value);
  };

  const [month, setMonth] = useState(now.getMonth() + 1);
  const onChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(+e.target.value);
  };

  useEffect(() => {
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
  }, [now, setYear, setMonth]);

  return (
    <div className="flex gap-10 items-center justify-center">
      <div className="flex gap-1 items-center">
        <select
          name="year"
          className="select max-w-xs bg-neutral-900 border-white focus:border-white"
          value={year}
          onChange={onChangeYear}
        >
          <option value={now.getFullYear() - 1}>{now.getFullYear() - 1}</option>
          <option value={now.getFullYear()}>{now.getFullYear()}</option>
          <option value={now.getFullYear() + 1}>{now.getFullYear() + 1}</option>
        </select>
        <span className="text-gray-400">年</span>
      </div>
      <div className="flex gap-1 items-center">
        <select
          name="month"
          className="select max-w-xs bg-neutral-900 border-white focus:border-white"
          value={month}
          onChange={onChangeMonth}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <span className="text-gray-400">月</span>
      </div>
    </div>
  );
}
