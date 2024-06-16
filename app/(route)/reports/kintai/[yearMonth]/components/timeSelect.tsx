import { useTimeAtom } from "@/hooks/useTimeAtom";
import React, { useState } from "react";

interface TimeSelectProps {
  name: "start" | "end";
  title: string;
}
export default function TimeSelect({ name, title }: TimeSelectProps) {
  const [time, setTime] = useTimeAtom(name);

  const onChangeHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = new Date(time!);
    newTime?.setHours(+e.target.value);
    setTime(newTime);
  };

  const onChangeMinute = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = new Date(time!);
    newTime?.setMinutes(+e.target.value);
    setTime(newTime);
  };

  return (
    <div>
      <span>{title}</span>
      <div className="flex gap-8">
        <div className="flex gap-2 items-center">
          <select
            name={`${name}Hour`}
            value={time?.getHours() ?? 9}
            onChange={onChangeHour}
            className="select w-24 bg-neutral-900 border-white focus:border-white"
          >
            {[
              5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
              23,
            ].map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span>時</span>
        </div>
        <div className="flex gap-2 items-center">
          <select
            name={`${name}Minute`}
            value={time?.getMinutes() ?? 0}
            onChange={onChangeMinute}
            className="select w-24 bg-neutral-900 border-white focus:border-white"
          >
            <option value={0}>0</option>
            <option value={30}>30</option>
          </select>
          <span>分</span>
        </div>
      </div>
    </div>
  );
}
