import React, { useState } from "react";

interface TimeSelectProps {
  name: "start" | "end";
  title: string;
  date?: Date;
}
export default function TimeSelect({ name, title, date }: TimeSelectProps) {
  const [hour, setHour] = useState(date?.getHours() ?? 9);
  const [minute, setMinute] = useState(date?.getMinutes() ?? 0);

  const onChangeHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(+e.target.value);
  };

  const onChangeMinute = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinute(+e.target.value);
  };

  return (
    <div>
      <span>{title}</span>
      <div className="flex gap-8">
        <div className="flex gap-2 items-center">
          <select
            name={`${name}Hour`}
            value={hour}
            onChange={onChangeHour}
            className="select w-24 bg-neutral-900 border-white focus:border-white"
          >
            {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((hour) => (
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
            value={minute}
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
