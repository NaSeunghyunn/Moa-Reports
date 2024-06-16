"use client";
import FormInput from "@/components/input";
import { KintaiDetailProps, WORK_TYPE } from "@/types/KintaiType";
import React, { useEffect, useState } from "react";
import TimeSelect from "./timeSelect";
import { calculateWorkingTime, formatDayJA } from "@/lib/dateUtil";
import FormBtn from "@/components/button";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  modalId: string;
  kintaiDetail: KintaiDetailProps;
}

export default function Modal({ modalId, kintaiDetail }: ModalProps) {
  const [selectedWorkType, setSelectedWorkType] = useState(
    kintaiDetail.workType
  );
  const onChangeWorkType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkType(e.currentTarget.value);
  };
  useEffect(() => {
    setSelectedWorkType(kintaiDetail.workType);
  }, [kintaiDetail]);
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-neutral-700 w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg mb-2">
            {formatDayJA(kintaiDetail.date)}
          </h3>
          <form>
            <button className="text-white rounded-full hover:bg-gray-500 focus:bg-gray-500 p-2 border-none outline-none">
              <XMarkIcon className="size-6" />
            </button>
          </form>
        </div>
        <div className="p-5">
          <form className="flex flex-col gap-5">
            <select
              name="workType"
              value={selectedWorkType}
              onChange={onChangeWorkType}
              className="select w-24 bg-neutral-900 border-white focus:border-white"
            >
              <option value={WORK_TYPE.WORK}>出勤</option>
              <option value={WORK_TYPE.DAY_OFF}>休み</option>
            </select>
            {selectedWorkType === WORK_TYPE.WORK && (
              <>
                <TimeSelect
                  name="start"
                  title="開始時間"
                  date={kintaiDetail.startTime}
                />
                <TimeSelect
                  name="end"
                  title="終了時間"
                  date={kintaiDetail.startTime}
                />
              </>
            )}

            <div className="flex items-center">
              <ClockIcon className="size-7" />
              <FormInput
                name="workTime"
                className="bg-neutral-700 p-1 text-white border-none outline-none select-none"
                value={calculateWorkingTime(
                  kintaiDetail.startTime,
                  kintaiDetail.endTime,
                  kintaiDetail.breakTime
                )}
                readOnly
              />
            </div>
            <div>
              <span>備考</span>
              <FormInput name="workTime" placeholder="備考" />
            </div>
            <FormBtn value="変更"></FormBtn>
          </form>
        </div>
      </div>
      //{" "}
    </dialog>
  );
}
