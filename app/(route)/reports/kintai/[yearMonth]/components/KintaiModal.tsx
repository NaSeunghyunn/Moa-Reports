"use client";
import FormInput from "@/components/input";
import { WorkType } from "@/types/KintaiType";
import React, { useEffect, useState } from "react";
import TimeSelect from "./timeSelect";
import { calculateWorkingTime, formatDayJA } from "@/lib/dateUtil";
import FormBtn from "@/components/button";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom, useAtomValue } from "jotai";
import {
  breakTimeAtom,
  endTimeAtom,
  kintaiIdAtom,
  kintaiListAtom,
  selectedKintaiAtom,
  startTimeAtom,
  yearMonthAtom,
} from "@/atoms";
import { WORK_TYPE } from "@/lib/kintaiUtil";
import { handleSubmit } from "./handleSubmit";

interface ModalProps {
  modalId: string;
}

export default function KintaiModal({ modalId }: ModalProps) {
  const [kintaiList, setKintaiList] = useAtom(kintaiListAtom);
  const kintaiDetail = useAtomValue(selectedKintaiAtom);
  const yearMonth = useAtomValue(yearMonthAtom);

  const [selectedWorkType, setSelectedWorkType] = useState<WorkType>(
    kintaiDetail?.workType || WORK_TYPE.WORK
  );
  const [remarks, setRemarks] = useState(kintaiDetail?.remarks ?? "");
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
  const [breakTime, setBreakTime] = useAtom(breakTimeAtom);
  const [kintaiId, setKintaiId] = useAtom(kintaiIdAtom);

  const onChangeWorkType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkType(e.currentTarget.value);
  };
  const onChangeBreakTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreakTime(+e.currentTarget.value);
  };
  const onChangeRemarks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(e.currentTarget.value);
  };

  const handleFormSubmit = async () => {
    await handleSubmit(
      kintaiId,
      kintaiDetail!,
      yearMonth!,
      startTime!,
      endTime!,
      breakTime,
      selectedWorkType,
      remarks,
      kintaiList,
      setKintaiList,
      setKintaiId
    );
  };

  useEffect(() => {
    if (kintaiDetail) {
      setSelectedWorkType(kintaiDetail.workType);
      setStartTime(kintaiDetail.startTime);
      setEndTime(kintaiDetail.endTime);
      setBreakTime(kintaiDetail.breakTime || 1);
      setRemarks(kintaiDetail.remarks ?? "");
    }
  }, [kintaiDetail]);

  return (
    <dialog id={modalId} className="modal">
      {kintaiDetail && (
        <div className="modal-box bg-neutral-700 w-full">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg mb-2">
              {formatDayJA(kintaiDetail.date)}
            </h3>
            <form method="dialog">
              <button className="text-white rounded-full hover:bg-gray-500 focus:bg-gray-500 p-2 border-none outline-none">
                <XMarkIcon className="size-6" />
              </button>
            </form>
          </div>
          <div className="p-5">
            <form method="dialog" className="flex flex-col gap-5">
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
                  <TimeSelect name="start" title="開始時間" />
                  <TimeSelect name="end" title="終了時間" />

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span>休憩時間</span>
                      <select
                        className="select bg-neutral-900 border-white focus:border-white"
                        value={breakTime}
                        onChange={onChangeBreakTime}
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="size-7" />
                      <FormInput
                        name="workTime"
                        className="bg-neutral-700 p-1 text-white border-none outline-none select-none"
                        value={calculateWorkingTime(
                          startTime,
                          endTime,
                          breakTime,
                          selectedWorkType
                        )}
                        readOnly
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <span>備考</span>
                <FormInput
                  name="workTime"
                  placeholder="備考"
                  onChange={onChangeRemarks}
                  value={remarks}
                />
              </div>
              <FormBtn value="変更" onClick={handleFormSubmit}></FormBtn>
            </form>
          </div>
        </div>
      )}
    </dialog>
  );
}
