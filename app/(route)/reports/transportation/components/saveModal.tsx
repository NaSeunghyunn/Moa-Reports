import { ModalProps } from "@/types/modal";
import TransportationItem from "./TransportationItem";
import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedTransportationsOfDayAtom,
  transprotationsAtom,
} from "@/atoms/TransportationAtom";

export default function TransportationModal({ id }: ModalProps) {
  const setTransportations = useSetAtom(transprotationsAtom);
  const selectedTransportationsOfDay = useAtomValue(
    selectedTransportationsOfDayAtom
  );

  return (
    <dialog id={id} className="modal pb-10">
      <div className="modal-box bg-neutral-700 w-full min-h-dvh">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg pb-10">1(月)</h3>
        {selectedTransportationsOfDay.map((_, index) => (
          <div key={index} className="border-b border-b-gray-600 mb-5">
            <TransportationItem itemIndex={index} />
          </div>
        ))}
        <TransportationItem itemIndex={-1} />
      </div>
    </dialog>
  );
}
