"use client";

import { PrintOutlined } from "@mui/icons-material";
import Transportation from "./components/Transportation";
import TransportationModal from "./components/saveModal";
import { openModal } from "@/lib/modalUtil";
import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedTransportationsOfDayIndexAtom,
  selectedTransportationsOfDayAtom,
  transprotationsAtom,
} from "@/atoms/TransportationAtom";
import { TransportaionsOfDayType } from "@/types/TransportaionType";

export default function Transportations() {
  const transportationModalId = "transportationModal";
  const transportations = useAtomValue(transprotationsAtom);
  const setSelectedTransportationsOfDay = useSetAtom(
    selectedTransportationsOfDayAtom
  );
  const setSelectedTransportationsOfDayIndex = useSetAtom(
    selectedTransportationsOfDayIndexAtom
  );
  const onClickRow = (
    transportationList: TransportaionsOfDayType,
    index: number
  ) => {
    openModal(transportationModalId);
    setSelectedTransportationsOfDay(transportationList);
    setSelectedTransportationsOfDayIndex(index);
  };
  return (
    <div>
      <TransportationModal id={transportationModalId} />
      <div className="fixed w-full max-w-screen-sm h-10">
        <div className="flex justify-between items-center bg-neutral-900 px-5 py-3 select-none">
          <span>7月</span>
          <PrintOutlined />
        </div>
      </div>
      <div className="px-5 pt-14 pb-24">
        <div className="flex flex-col gap-2">
          {transportations.map((item, index) => (
            <div key={index} onClick={() => onClickRow(item, index)}>
              <Transportation transportations={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
