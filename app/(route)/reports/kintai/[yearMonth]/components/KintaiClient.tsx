"use client";
import { ClockIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  calculateWorkingTime,
  formatWorkingTime,
  getDayOfWeek,
  isDayOff,
} from "@/lib/dateUtil";
import Modal from "./modal";
import { KintaiDetailProps } from "@/types/KintaiType";

interface KintaiClientProps {
  kintais: KintaiDetailProps[];
}

export default function KintaiClient({ kintais }: KintaiClientProps) {
  const [kintaiDetail, setKintaiDetail] = useState<KintaiDetailProps>(
    kintais[3]
  );
  const rowOnclick = (kintai: KintaiDetailProps) => {
    setKintaiDetail(kintai);
    const modalElement = document.getElementById(
      "kintai_modal"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };
  return (
    <div>
      <Modal modalId="kintai_modal" kintaiDetail={kintaiDetail} />
      <div className="fixed w-full max-w-screen-sm h-10">
        <div className="flex justify-between items-center bg-neutral-900 px-5 py-3">
          <span className="text-green-500 text-lg">勤怠</span>
          <div className="flex items-center justify-center gap-1">
            <ClockIcon className="size-4" />
            {kintais.reduce(
              (acc, current) =>
                acc +
                calculateWorkingTime(
                  current.startTime,
                  current.endTime,
                  current.breakTime
                ),
              0
            )}
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2 pb-20 pt-14">
        {kintais.map((kintai) => (
          <div
            key={kintai.id}
            className="flex justify-between border rounded-lg p-5 cursor-pointer select-none"
            onClick={() => rowOnclick(kintai)}
          >
            <span
              className={`min-w-14 ${isDayOff(kintai.date) && "text-red-500"}`}
            >{`${kintai.date.getDate()}(${getDayOfWeek(kintai.date)})`}</span>
            <span className="-ml-5">
              {formatWorkingTime(kintai.startTime, kintai.endTime)}
            </span>
            <div className="flex gap-1.5 items-center">
              <ClockIcon className="size-4" />
              <span>
                {`${calculateWorkingTime(
                  kintai.startTime,
                  kintai.endTime,
                  kintai.breakTime
                )}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
