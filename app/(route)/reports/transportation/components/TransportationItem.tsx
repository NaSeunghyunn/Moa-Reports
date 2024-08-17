import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  selectedTransportationsOfDayIndexAtom,
  selectedTransportationsOfDayAtom,
  transprotationsAtom,
} from "@/atoms/TransportationAtom";

interface TransportationItemProps {
  itemIndex: number;
}

export default function TransportationItem({
  itemIndex,
}: TransportationItemProps) {
  const setTransportations = useSetAtom(transprotationsAtom);
  const transportationsOfDayIndexindex = useAtomValue(
    selectedTransportationsOfDayIndexAtom
  );
  const [selectedTransportationsOfDay, setSelectedTransportationsOfDay] =
    useAtom(selectedTransportationsOfDayAtom);

  const [localData, setLocalData] = useState({
    start: "",
    end: "",
    isTwoWayDirection: true,
    goal: "",
    vehicle: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const item = selectedTransportationsOfDay[itemIndex];
    if (item && !isModified) {
      setLocalData({
        start: item.start,
        end: item.end,
        isTwoWayDirection: item.isTwoWayDirection,
        goal: item.goal,
        vehicle: item.vehicle,
        price: item.price?.toString(),
      });
    }
  }, [selectedTransportationsOfDay, itemIndex]);

  const handleInputChange = (key: string, value: string | boolean) => {
    setIsModified(true);
    setLocalData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onclickSave = () => {
    if (
      !localData.start ||
      !localData.end ||
      !localData.goal ||
      !localData.vehicle ||
      !localData.price
    )
      return;

    setIsLoading(true);

    const newItems = getNewItems();

    setSelectedTransportationsOfDay(newItems);
    setTransportations((prev) => [
      ...prev.slice(0, transportationsOfDayIndexindex),
      newItems,
      ...prev.slice(transportationsOfDayIndexindex + 1),
    ]);

    setIsModified(false);
    setIsLoading(false);
  };

  const getNewItems = () => {
    const newItem = {
      ...selectedTransportationsOfDay[itemIndex],
      date: selectedTransportationsOfDay[0].date,
      ...localData,
      price: +localData.price,
    };

    if (itemIndex === -1) {
      setLocalData({
        start: "",
        end: "",
        isTwoWayDirection: true,
        goal: "",
        vehicle: "",
        price: "",
      });
      return [...selectedTransportationsOfDay, newItem];
    }
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
            value={localData.start}
            onChange={(e) => handleInputChange("start", e.currentTarget.value)}
          />
          <label className="swap swap-flip border p-1 rounded-xl">
            <input
              type="checkbox"
              onChange={() =>
                handleInputChange(
                  "isTwoWayDirection",
                  !localData.isTwoWayDirection
                )
              }
              checked={localData.isTwoWayDirection}
            />
            <div className="swap-off flex justify-center items-center">→</div>
            <div className="swap-on flex justify-center items-center">⇄</div>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-gray-700"
            value={localData.end}
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
            value={localData.goal}
            onChange={(e) => handleInputChange("goal", e.currentTarget.value)}
          />
        </div>
        <div>
          <span>乗物</span>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-gray-700"
            value={localData.vehicle}
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
            value={localData.price}
            onChange={(e) => handleInputChange("price", e.currentTarget.value)}
          />
        </div>
      </div>
      <button
        className="bg-green-500 w-full p-3 rounded-xl hover:bg-green-400 focus:bg-green-400 transition-colors disabled:bg-gray-700"
        disabled={isLoading || !isModified}
        onClick={onclickSave}
      >
        {isLoading ? (
          <span className="loading loading-dots loading-md text-white"></span>
        ) : isModified ? (
          "保存"
        ) : (
          "変更待ち"
        )}
      </button>
    </div>
  );
}
