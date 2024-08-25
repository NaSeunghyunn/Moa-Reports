import {
  allGoalAtom,
  allVehicleAtom,
  selectedTransportationsOfDayAtom,
  selectedTransportationsOfDayIndexAtom,
  transprotationsAtom,
} from "@/atoms/TransportationAtom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export default function TransportationNewItem() {
  const [transportations, setTransportations] = useAtom(transprotationsAtom);
  const transportationsOfDayIndex = useAtomValue(
    selectedTransportationsOfDayIndexAtom
  );
  const [selectedTransportationsOfDay, setSelectedTransportationsOfDay] =
    useAtom(selectedTransportationsOfDayAtom);
  const allGoal = useAtomValue(allGoalAtom);
  const allVehicle = useAtomValue(allVehicleAtom);
  const [localData, setLocalData] = useState(
    new Array(transportations.length).fill({
      start: "",
      end: "",
      isTwoWayDirection: true,
      goal: "",
      vehicle: "",
      price: "",
      isModified: false,
    })
  );
  const [displayData, setDisplayData] = useState({
    start: "",
    end: "",
    isTwoWayDirection: true,
    goal: "",
    vehicle: "",
    price: "",
    isModified: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentData = localData[transportationsOfDayIndex];
    if (!currentData) return;

    setDisplayData(currentData);

    if (allGoal !== "_") {
      updateField("goal", allGoal);
    }

    if (allVehicle !== "_") {
      updateField("vehicle", allVehicle);
    }
  }, [localData, transportationsOfDayIndex, allGoal, allVehicle]);

  const updateField = (field: string, value: string) => {
    setDisplayData((prev) => ({
      ...prev,
      [field]: value,
      isModified: true,
    }));
    if (value !== localData[transportationsOfDayIndex]?.[field]) {
      const newLocalData = [...localData];
      newLocalData[transportationsOfDayIndex] = {
        ...newLocalData[transportationsOfDayIndex],
        [field]: value,
        isModified: true,
      };
      setLocalData(newLocalData);
    }
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setDisplayData((prev) => ({
      ...prev,
      [key]: value,
      isModified: true,
    }));

    const newLocalData = [...localData];
    newLocalData[transportationsOfDayIndex] = {
      ...newLocalData[transportationsOfDayIndex],
      [key]: value,
      isModified: true,
    };
    setLocalData(newLocalData);
  };

  const onclickSave = () => {
    const currentData = localData[transportationsOfDayIndex];

    if (
      !currentData.start ||
      !currentData.end ||
      !currentData.goal ||
      !currentData.vehicle ||
      !currentData.price
    )
      return;

    setIsLoading(true);

    if (!selectedTransportationsOfDay) return;

    const newItems = getNewItems();

    setSelectedTransportationsOfDay(newItems);
    setTransportations((prev) => [
      ...prev.slice(0, transportationsOfDayIndex),
      newItems,
      ...prev.slice(transportationsOfDayIndex + 1),
    ]);

    setDisplayData((prev) => ({
      start: "",
      end: "",
      isTwoWayDirection: true,
      goal: "",
      vehicle: "",
      price: "",
      isModified: false,
    }));

    setLocalData((prev) => {
      const newLocalData = [...prev];
      newLocalData[transportationsOfDayIndex] = {
        start: "",
        end: "",
        isTwoWayDirection: true,
        goal: "",
        vehicle: "",
        price: "",
        isModified: false,
      };
      return newLocalData;
    });

    setIsLoading(false);
  };

  const getNewItems = () => {
    if (!selectedTransportationsOfDay) return [];

    const newItem = {
      date: selectedTransportationsOfDay[0].date,
      ...localData[transportationsOfDayIndex],
      price: +localData[transportationsOfDayIndex].price,
    };

    const newItems = [...selectedTransportationsOfDay, newItem];
    return newItems;
  };

  return (
    <div className="flex flex-col gap-2 p-2 my-2 border border-white rounded-xl">
      <div>
        <span className="text-sm">区間</span>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-gray-700"
            value={displayData.start}
            onChange={(e) => handleInputChange("start", e.currentTarget.value)}
          />
          <label className="swap swap-flip border p-1 rounded-xl">
            <input
              type="checkbox"
              onChange={() =>
                handleInputChange(
                  "isTwoWayDirection",
                  !displayData.isTwoWayDirection
                )
              }
              checked={displayData.isTwoWayDirection}
            />
            <div className="swap-off flex justify-center items-center">→</div>
            <div className="swap-on flex justify-center items-center">⇄</div>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-gray-700"
            value={displayData.end}
            onChange={(e) => handleInputChange("end", e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <span>目的</span>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-gray-700"
            value={displayData.goal}
            onChange={(e) => handleInputChange("goal", e.currentTarget.value)}
          />
        </div>
        <div>
          <span>乗物</span>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-gray-700"
            value={displayData.vehicle}
            onChange={(e) =>
              handleInputChange("vehicle", e.currentTarget.value)
            }
          />
        </div>
        <div>
          <span>金額</span>
          <input
            type="number"
            className="input input-bordered w-full max-w-xs text-gray-700"
            value={displayData.price}
            onChange={(e) => handleInputChange("price", e.currentTarget.value)}
          />
        </div>
      </div>
      <button
        className="bg-green-500 w-full p-3 rounded-xl hover:bg-green-400 focus:bg-green-400 transition-colors disabled:bg-gray-700"
        disabled={isLoading || !displayData.isModified}
        onClick={onclickSave}
      >
        {isLoading ? (
          <span className="loading loading-dots loading-md text-white"></span>
        ) : displayData.isModified ? (
          "保存"
        ) : (
          "変更待ち"
        )}
      </button>
    </div>
  );
}
