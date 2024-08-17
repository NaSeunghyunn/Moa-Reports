import { ModalProps } from "@/types/modal";
import TransportationItem from "./TransportationItem";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  allGoalAtom,
  allVehicleAtom,
  selectedTransportationsOfDayAtom,
  transprotationsAtom,
} from "@/atoms/TransportationAtom";
import { AllGoalType, AllVehicleType } from "@/types/TransportaionType";

export default function TransportationModal({ id }: ModalProps) {
  const setTransportations = useSetAtom(transprotationsAtom);
  const selectedTransportationsOfDay = useAtomValue(
    selectedTransportationsOfDayAtom
  );
  const [allGoal, setAllGoal] = useAtom(allGoalAtom);
  const [allVehicle, setAllVehicle] = useAtom(allVehicleAtom);

  const onClickAllGoal = (value: AllGoalType) => {
    setAllGoal((prev) => (prev === value ? "_" : value));
  };

  const onClickAllVehicle = (value: AllVehicleType) => {
    setAllVehicle((prev) => (prev === value ? "_" : value));
  };

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
                className={allGoal === "テレワーク" ? "bg-gray-900" : ""}
                onClick={() => onClickAllGoal("テレワーク")}
              >
                テレワーク
              </button>
              <button
                className={allGoal === "出勤" ? "bg-gray-900" : ""}
                onClick={() => onClickAllGoal("出勤")}
              >
                出勤
              </button>
              <button
                className={allGoal === "" ? "bg-gray-900" : ""}
                onClick={() => onClickAllGoal("")}
              >
                目的無し
              </button>
            </div>
            <div className="flex gap-4 *:rounded-xl *:border *:px-3">
              <button
                className={allVehicle === "電車" ? "bg-gray-900" : ""}
                onClick={() => onClickAllVehicle("電車")}
              >
                電車
              </button>
              <button
                className={allVehicle === "バス" ? "bg-gray-900" : ""}
                onClick={() => onClickAllVehicle("バス")}
              >
                バス
              </button>
              <button
                className={allVehicle === "電車、バス" ? "bg-gray-900" : ""}
                onClick={() => onClickAllVehicle("電車、バス")}
              >
                電車、バス
              </button>
              <button
                className={allVehicle === "" ? "bg-gray-900" : ""}
                onClick={() => onClickAllVehicle("")}
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
