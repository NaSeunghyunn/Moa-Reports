import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  selectedTransportationsOfDayIndexAtom,
  selectedTransportationsOfDayAtom,
  transprotationsAtom,
  allGoalAtom,
  allVehicleAtom,
} from "@/atoms/TransportationAtom";

interface TransportationItemProps {
  itemIndex: number;
}

export default function TransportationItem({
  itemIndex,
}: TransportationItemProps) {
  const [transportations, setTransportations] = useAtom(transprotationsAtom);
  const transportationsOfDayIndex = useAtomValue(
    selectedTransportationsOfDayIndexAtom
  );
  const [selectedTransportationsOfDay, setSelectedTransportationsOfDay] =
    useAtom(selectedTransportationsOfDayAtom);
  const allGoal = useAtomValue(allGoalAtom);
  const allVehicle = useAtomValue(allVehicleAtom);

  const [localData, setLocalData] = useState(
    Array.from({ length: transportations.length }, () =>
      Array(selectedTransportationsOfDay?.length).fill({
        start: "",
        end: "",
        isTwoWayDirection: true,
        goal: "",
        vehicle: "",
        price: "",
      })
    )
  );
  const [displayData, setDisplayData] = useState({
    start: "",
    end: "",
    isTwoWayDirection: true,
    goal: "",
    vehicle: "",
    price: "",
  });
  const [isModified, setIsModified] = useState<boolean[][]>(
    Array.from({ length: transportations.length }, () =>
      Array(selectedTransportationsOfDay?.length).fill(false)
    )
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedTransportationsOfDay) return;

    const item = selectedTransportationsOfDay[itemIndex];

    if (item && !isModified[transportationsOfDayIndex][itemIndex]) {
      const newLocalData = [...localData];
      newLocalData[transportationsOfDayIndex][itemIndex] = {
        start: item.start,
        end: item.end,
        isTwoWayDirection: item.isTwoWayDirection,
        goal: item.goal,
        vehicle: item.vehicle,
        price: item.price?.toString(),
      };
      setLocalData(newLocalData);

      setDisplayData(newLocalData[transportationsOfDayIndex][itemIndex]);
    } else {
      setDisplayData(localData[transportationsOfDayIndex][itemIndex]);
    }

    if (allGoal !== "_") {
      updateField("goal", allGoal);
    }

    if (allVehicle !== "_") {
      updateField("vehicle", allVehicle);
    }
  }, [selectedTransportationsOfDay, allGoal, allVehicle, itemIndex]);

  const updateField = (field: string, value: string) => {
    setDisplayData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (value !== localData[transportationsOfDayIndex][itemIndex]?.[field]) {
      const newLocalData = [...localData];
      newLocalData[transportationsOfDayIndex][itemIndex] = {
        ...newLocalData[transportationsOfDayIndex][itemIndex],
        [field]: value,
      };
      setLocalData(newLocalData);

      setIsModified((prev) => {
        const newIsModified = [...prev];
        newIsModified[transportationsOfDayIndex][itemIndex] = true;
        return newIsModified;
      });
    }
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setDisplayData((prev) => ({
      ...prev,
      [key]: value,
    }));

    const newLocalData = [...localData];
    newLocalData[transportationsOfDayIndex][itemIndex] = {
      ...newLocalData[transportationsOfDayIndex][itemIndex],
      [key]: value,
    };
    setLocalData(newLocalData);

    setIsModified((prev) => {
      const newIsModified = [...prev];
      newIsModified[transportationsOfDayIndex][itemIndex] = true;
      return newIsModified;
    });
  };

  const onclickSave = () => {
    const currentData = localData[transportationsOfDayIndex][itemIndex];

    if (
      !currentData.start ||
      !currentData.end ||
      !currentData.goal ||
      !currentData.vehicle ||
      !currentData.price
    )
      return;

    setIsLoading(true);

    const newItems = getNewItems();

    setSelectedTransportationsOfDay(newItems);
    setTransportations((prev) => [
      ...prev.slice(0, transportationsOfDayIndex),
      newItems,
      ...prev.slice(transportationsOfDayIndex + 1),
    ]);

    setIsModified((prev) => {
      const newIsModified = [...prev];
      newIsModified[transportationsOfDayIndex][itemIndex] = false;
      return newIsModified;
    });

    setIsLoading(false);
  };

  const getNewItems = () => {
    if (!selectedTransportationsOfDay) return [];

    const newItem = {
      ...selectedTransportationsOfDay[itemIndex],
      date: selectedTransportationsOfDay[0].date,
      ...localData[transportationsOfDayIndex][itemIndex],
      price: +localData[transportationsOfDayIndex][itemIndex].price,
    };

    const newItems = [...selectedTransportationsOfDay];
    newItems[itemIndex] = newItem;
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
        disabled={
          isLoading || !isModified[transportationsOfDayIndex][itemIndex]
        }
        onClick={onclickSave}
      >
        {isLoading ? (
          <span className="loading loading-dots loading-md text-white"></span>
        ) : isModified[transportationsOfDayIndex][itemIndex] ? (
          "保存"
        ) : (
          "変更待ち"
        )}
      </button>
    </div>
  );
}
