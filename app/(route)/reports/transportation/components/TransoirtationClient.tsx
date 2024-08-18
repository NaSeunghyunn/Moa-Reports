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
import { useAtom, useSetAtom } from "jotai";
import TransportationModal from "./saveModal";
import { PrintOutlined } from "@mui/icons-material";
import Transportation from "./Transportation";
import { useEffect } from "react";
import { getCurrentMonth } from "@/lib";

interface TransportationClientProps {
  transportationsData: TransportationsType;
}

export default function TransportationClient({
  transportationsData: transportationsData,
}: TransportationClientProps) {
  const transportationModalId = "transportationModal";
  const [transportations, setTransportations] = useAtom(transprotationsAtom);
  const setSelectedTransportationsOfDay = useSetAtom(
    selectedTransportationsOfDayAtom
  );
  const setSelectedTransportationsOfDayIndex = useSetAtom(
    selectedTransportationsOfDayIndexAtom
  );

  useEffect(() => {
    setTransportations(transportationsData.transportaionsOfDayList);
  }, [transportationsData]);

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
