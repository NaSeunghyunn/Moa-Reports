"use client";
import { ClockIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import {
  WORK_TYPE,
  calculateWorkingTime,
  formatWorkingTime,
  getDayOfWeek,
  isDayOff,
  nextYearMonth,
  prevYearMonth,
  toYearMonthStr,
} from "@/lib";
import Modal from "./modal";
import { KintaiDetailProps, KintaiProps } from "@/types";
import { useAtom, useSetAtom } from "jotai";
import { kintaiIdAtom, kintaiListAtom, selectedKintaiAtom } from "@/atoms";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

interface KintaiClientProps {
  kintai: KintaiProps;
}

export default function KintaiClient({ kintai }: KintaiClientProps) {
  const [kintaiList, setKintaiList] = useAtom(kintaiListAtom);
  const setKintaiId = useSetAtom(kintaiIdAtom);
  const setKintaiDetail = useSetAtom(selectedKintaiAtom);

  useEffect(() => {
    setKintaiList(kintai.kintaiDetails);
    setKintaiId(kintai.id);
  }, [kintai, setKintaiList, setKintaiId]);

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
      <Modal modalId="kintai_modal" />
      <div className="fixed w-full max-w-screen-sm h-10">
        <div className="flex justify-between items-center bg-neutral-900 px-5 py-3">
          <div className="flex justify-between items-center">
            <Link href={`./${toYearMonthStr(prevYearMonth(kintai.yearMonth))}`}>
              <ArrowLeft className="size-10" />
            </Link>
            <span className="text-green-500 text-lg w-24 text-center">{`${kintai.yearMonth.year}年${kintai.yearMonth.month}月`}</span>
            <Link href={`./${toYearMonthStr(nextYearMonth(kintai.yearMonth))}`}>
              <ArrowRight className="size-10" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-1">
            <ClockIcon className="size-4" />
            {kintaiList.reduce(
              (acc, current) =>
                acc +
                calculateWorkingTime(
                  current.startTime,
                  current.endTime,
                  current.breakTime,
                  current.workType
                ),
              0
            )}
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2 pb-20 pt-20">
        {kintaiList.map((kintai, index) => (
          <div
            key={index}
            className="flex justify-between border rounded-lg p-5 cursor-pointer select-none"
            onClick={() => rowOnclick(kintai)}
          >
            <span
              className={`min-w-14 ${isDayOff(kintai.date) && "text-red-500"}`}
            >{`${kintai.date.getDate()}(${getDayOfWeek(kintai.date)})`}</span>
            {kintai.workType === WORK_TYPE.WORK && (
              <>
                <span className="-ml-5">
                  {formatWorkingTime(kintai.startTime, kintai.endTime)}
                </span>
                <div className="flex gap-1.5 items-center">
                  <ClockIcon className="size-4" />
                  <span>
                    {`${calculateWorkingTime(
                      kintai.startTime,
                      kintai.endTime,
                      kintai.breakTime,
                      kintai.workType
                    )}`}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
