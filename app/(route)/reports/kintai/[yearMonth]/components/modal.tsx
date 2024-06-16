"use client";
import FormInput from "@/components/input";
import { KintaiDetailProps, WORK_TYPE } from "@/types/KintaiType";
import React, { useEffect, useState } from "react";
import TimeSelect from "./timeSelect";
import { calculateWorkingTime, formatDayJA } from "@/lib/dateUtil";
import FormBtn from "@/components/button";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import {
  breakTimeAtom,
  endTimeAtom,
  kintaiListAtom,
  selectedKintaiAtom,
  startTimeAtom,
} from "@/atoms";

interface ModalProps {
  modalId: string;
}

export default function Modal({ modalId }: ModalProps) {
  const [kintaiList, setKitaiList] = useAtom(kintaiListAtom);
  const [kintaiDetail, setKintaiDetail] = useAtom(selectedKintaiAtom);

  const [selectedWorkType, setSelectedWorkType] = useState(
    kintaiDetail?.workType || WORK_TYPE.WORK
  );

  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
  const [breakTime, setBreakTime] = useAtom(breakTimeAtom);

  const onChangeWorkType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === WORK_TYPE.DAY_OFF) {
      setStartTime(null);
      setEndTime(null);
    }
    setSelectedWorkType(e.currentTarget.value);
  };
  const onChangeBreakTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreakTime(+e.currentTarget.value);
  };

  const handleSubmit = async () => {
    if (!kintaiDetail) return;

    const updatedDetail: KintaiDetailProps = {
      ...kintaiDetail,
      workType: selectedWorkType,
      startTime: startTime ?? undefined,
      endTime: endTime ?? undefined,
      breakTime,
    };

    const newKintaiList = kintaiList.map((kintai) =>
      kintai.date.getDate() === kintaiDetail.date.getDate()
        ? updatedDetail
        : kintai
    );
    setKitaiList(newKintaiList);
  };

  useEffect(() => {
    if (kintaiDetail) {
      setSelectedWorkType(kintaiDetail.workType);
      setStartTime(kintaiDetail.startTime ?? null);
      setEndTime(kintaiDetail.endTime ?? null);
      setBreakTime(kintaiDetail.breakTime || 1);
    }
  }, [kintaiDetail]);

  return (
    <dialog id={modalId} className="modal">
      {
        kintaiDetail && (
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
                            breakTime
                          )}
                          readOnly
                        />
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <span>備考</span>
                  <FormInput name="workTime" placeholder="備考" />
                </div>
                <FormBtn value="変更" onClick={handleSubmit}></FormBtn>
              </form>
            </div>
          </div>
        )
        //{" "}
      }
    </dialog>
  );
}
