"use client";

import {
  selectedTransportationsOfDayAtom,
  selectedTransportationsOfDayIndexAtom,
  transprotationsAtom,
} from "@/atoms/TransportationAtom";
import { openModal } from "@/lib/modalUtil";
import {
  TransportaionsOfDayType,
  TransportationsType,
} from "@/types/TransportaionType";
import { useSetAtom } from "jotai";
import TransportationModal from "./saveModal";
import { PrintOutlined } from "@mui/icons-material";
import Transportation from "./Transportation";
import { useEffect } from "react";
import { getCurrentMonth } from "@/lib";

interface TransportationClientProps {
  transportations: TransportationsType;
}

export default function TransportationClient({
  transportations,
}: TransportationClientProps) {
  const transportationModalId = "transportationModal";
  const transportaionsOfDayList = transportations.transportaionsOfDayList;
  const setTransportations = useSetAtom(transprotationsAtom);
  const setSelectedTransportationsOfDay = useSetAtom(
    selectedTransportationsOfDayAtom
  );
  const setSelectedTransportationsOfDayIndex = useSetAtom(
    selectedTransportationsOfDayIndexAtom
  );

  useEffect(() => {
    setTransportations(transportaionsOfDayList);
  }, [transportaionsOfDayList]);

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
          <span>{`${getCurrentMonth()}月`}</span>
          <PrintOutlined />
        </div>
      </div>
      <div className="px-5 pt-14 pb-24">
        <div className="flex flex-col gap-2">
          {transportaionsOfDayList.map((item, index) => (
            <div key={index} onClick={() => onClickRow(item, index)}>
              <Transportation transportations={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
