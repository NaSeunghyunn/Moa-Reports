import { ModalProps } from "@/types/modal";
import TransportationItem from "./TransportationItem";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  allGoalAtom,
  allVehicleAtom,
  selectedTransportationsOfDayAtom,
  transprotationsAtom,
} from "@/atoms/TransportationAtom";

export default function TransportationModal({ id }: ModalProps) {
  const setTransportations = useSetAtom(transprotationsAtom);
  const selectedTransportationsOfDay = useAtomValue(
    selectedTransportationsOfDayAtom
  );
  const [allGoal, setAllGoal] = useAtom(allGoalAtom);
  const [allVehicle, setAllVehicle] = useAtom(allVehicleAtom);

  return (
    <dialog id={id} className="modal pb-10">
      <div className="modal-box bg-neutral-700 w-full min-h-dvh pt-10">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-9">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg pb-10">1(月)</h3>
        <div className="flex gap-3">
          <span>全て</span>
          <div className="flex flex-col gap-2 pb-5 select-none">
            <div className="flex gap-4 *:rounded-xl *:border *:px-3">
              <button
                className="disabled:bg-gray-900"
                disabled={allGoal === "テレワーク"}
                onClick={(e) => setAllGoal("テレワーク")}
              >
                テレワーク
              </button>
              <button
                className="disabled:bg-gray-900"
                disabled={allGoal === "出勤"}
                onClick={(e) => setAllGoal("出勤")}
              >
                出勤
              </button>
              <button
                className="disabled:bg-gray-900"
                disabled={allGoal === ""}
                onClick={(e) => setAllGoal("")}
              >
                目的無し
              </button>
            </div>
            <div className="flex gap-4 *:rounded-xl *:border *:px-3">
              <button
                className="disabled:bg-gray-900"
                disabled={allVehicle === "電車"}
                onClick={(e) => setAllVehicle("電車")}
              >
                電車
              </button>
              <button
                className="disabled:bg-gray-900"
                disabled={allVehicle === "バス"}
                onClick={(e) => setAllVehicle("バス")}
              >
                バス
              </button>
              <button
                className="disabled:bg-gray-900"
                disabled={allVehicle === "電車、バス"}
                onClick={(e) => setAllVehicle("電車、バス")}
              >
                電車、バス
              </button>
              <button
                className="disabled:bg-gray-900"
                disabled={allVehicle === ""}
                onClick={(e) => setAllVehicle("")}
              >
                乗物無し
              </button>
            </div>
          </div>
        </div>
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
