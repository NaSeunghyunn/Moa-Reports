"use client";
import { ClockIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import {
  WORK_TYPE,
  calculateWorkingTime,
  formatWorkingTime,
  nextYearMonth,
  prevYearMonth,
  toYearMonthStr,
} from "@/lib";
import { KintaiDetailProps, KintaiProps } from "@/types";
import { useAtom, useSetAtom } from "jotai";
import {
  kintaiIdAtom,
  kintaiListAtom,
  selectedKintaiAtom,
  yearMonthAtom,
} from "@/atoms";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PrintOutlined } from "@mui/icons-material";
import OutputModal from "./OutputModal";
import KintaiModal from "./KintaiModal";
import { tempalteListType } from "@/repository/templateRepository";

interface KintaiClientProps {
  kintai: KintaiProps;
  templates: tempalteListType;
}

export default function KintaiClient({ kintai, templates }: KintaiClientProps) {
  const [kintaiList, setKintaiList] = useAtom(kintaiListAtom);
  const setKintaiId = useSetAtom(kintaiIdAtom);
  const setKintaiDetail = useSetAtom(selectedKintaiAtom);
  const setYearMonth = useSetAtom(yearMonthAtom);

  useEffect(() => {
    setKintaiList(kintai.kintaiDetails);
    setKintaiId(kintai.id);
    setYearMonth(kintai.yearMonth);
  }, [kintai, setKintaiList, setKintaiId, setYearMonth]);

  const rowOnclick = (kintai: KintaiDetailProps) => {
    setKintaiDetail(kintai);
    const modalElement = document.getElementById(
      "kintai_modal"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const onclickOutput = () => {
    const modalElement = document.getElementById(
      "output_modal"
    ) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };
  return (
    <div>
      <KintaiModal modalId="kintai_modal" />
      <OutputModal modalId="output_modal" templates={templates} />
      <div className="fixed w-full max-w-screen-sm h-10">
        <div className="flex justify-between items-center bg-neutral-900 px-5 py-3 select-none">
          <div className="flex justify-between items-center">
            <Link href={`./${toYearMonthStr(prevYearMonth(kintai.yearMonth))}`}>
              <ArrowLeft className="text-white" />
            </Link>
            <span className="text-white text-lg w-24 text-center">{`${kintai.yearMonth.year}年${kintai.yearMonth.month}月`}</span>
            <Link href={`./${toYearMonthStr(nextYearMonth(kintai.yearMonth))}`}>
              <ArrowRight className="text-white" />
            </Link>
          </div>
          <button
            onClick={onclickOutput}
            className="bg-green-500 py-1 px-2 rounded-xl"
          >
            <div className="flex items-center justify-center gap-2 px-2">
              <PrintOutlined />
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
          </button>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2 pb-20 pt-16">
        {kintaiList.map((kintai, index) => (
          <div
            key={index}
            className="flex justify-between border rounded-lg p-5 cursor-pointer select-none"
            onClick={() => rowOnclick(kintai)}
          >
            <span
              className={`min-w-14 ${kintai.isDayOff && "text-red-500"}`}
            >{`${kintai.date.getDate()}(${kintai.dayOfWeek})`}</span>
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
