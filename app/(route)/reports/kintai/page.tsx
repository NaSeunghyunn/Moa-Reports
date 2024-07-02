"use client";
import FormBtn from "@/components/button";
import { useState } from "react";
import { useFormState } from "react-dom";
import { kintaiList } from "./action";
import { IStateErrors } from "./formSchema";

export default function Kintai() {
  const [state, action] = useFormState<IStateErrors | null>(kintaiList, null);
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(+e.target.value);
  };

  const onChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(+e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-100dvh">
      <form action={action} className="flex flex-col gap-5">
        <div className="flex gap-10 items-center justify-center">
          <div className="flex gap-1 items-center">
            <select
              name="year"
              className="select max-w-xs bg-neutral-900 border-white focus:border-white"
              value={selectedYear}
              onChange={onChangeYear}
            >
              <option value={now.getFullYear() - 1}>
                {now.getFullYear() - 1}
              </option>
              <option value={now.getFullYear()}>{now.getFullYear()}</option>
              <option value={now.getFullYear() + 1}>
                {now.getFullYear() + 1}
              </option>
            </select>
            <span className="text-gray-400">年</span>
          </div>
          <div className="flex gap-1 items-center">
            <select
              name="month"
              className="select max-w-xs bg-neutral-900 border-white focus:border-white"
              value={selectedMonth}
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
        {state?.fieldErrors.year?.map((_, index) => (
          <span
            key={index}
            className="text-red-500"
          >{`年度は${state.fieldErrors.year}`}</span>
        ))}
        {state?.fieldErrors.month?.map((_, index) => (
          <span
            key={index}
            className="text-red-500"
          >{`月は${state?.fieldErrors.month}`}</span>
        ))}
        <FormBtn value="次へ" />
      </form>
    </div>
  );
}
