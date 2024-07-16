import { useAtom } from "jotai";
import FormBtn from "./button";
import { itemGroupsAtom } from "@/atoms";
import { insertAtIndex } from "@/lib/array";
import { newitem } from "@/lib/commuterPassUtil";
import { useState } from "react";
import { getLastDay, getOneMonthLaterMonthDayFromDay } from "@/lib";

interface CommuterPassAddModalProps {
  modalId: string;
}

export default function CommuterPassAddModal({
  modalId,
}: CommuterPassAddModalProps) {
  const [itemGroups, setItemGroups] = useAtom(itemGroupsAtom);
  const [startDay, setStartDay] = useState("1");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");
  const [isStartDayError, setStartDayError] = useState(false);
  const [isStartError, setStartError] = useState(false);
  const [isEndError, setEndError] = useState(false);
  const [isPriceError, setPriceError] = useState(false);

  const handleAddItem = () => {
    let isError = false;
    if (start.trim().length === 0) {
      setStartError(true);
      isError = true;
    } else {
      setStartError(false);
    }

    if (end.trim().length === 0) {
      setEndError(true);
      isError = true;
    } else {
      setEndError(false);
    }

    if (isNaN(+price) || +price <= 0) {
      setPriceError(true);
      isError = true;
    } else {
      setPriceError(false);
    }

    if (isNaN(+startDay) || +startDay <= 0 || +startDay > 31) {
      setStartDayError(true);
      isError = true;
    } else {
      setStartDayError(false);
    }

    if (isError) return;

    const groupId = startDay;

    const newItem = newitem(+startDay, start, end, +price);
    if (groupId in itemGroups) {
      setItemGroups(() => ({
        ...itemGroups,
        [groupId]: insertAtIndex(
          itemGroups[groupId],
          itemGroups[groupId].length + 1,
          newItem
        ),
      }));
    } else {
      setItemGroups(() => ({
        [groupId]: [newItem],
        ...itemGroups,
      }));
    }

    setStart("");
    setEnd("");
    setPrice("");

    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  };

  const onChangeStart = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStart(e.currentTarget.value);

  const onChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEnd(e.currentTarget.value);

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrice(e.currentTarget.value);

  const onChangeStartDay = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStartDay(e.currentTarget.value);

  const lastDay = new Date().getDate();

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-neutral-700 w-full">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-col justify-center items-center gap-3 p-5 *:w-full *:max-w-xs">
          <div className="flex justify-center items-center gap-4 *:w-full *:max-w-xs">
            <label className="form-control">
              <div className="label">
                <span className="label-text text-neutral-400">購入日</span>
              </div>
              <select
                value={startDay}
                onChange={onChangeStartDay}
                className="select w-24 bg-neutral-900 border-white focus:border-white"
              >
                {Array.from({ length: getLastDay() }, (_, i) => i + 1).map(
                  (i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  )
                )}
              </select>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text text-neutral-400">終了日</span>
              </div>
              <span className="ps-1">
                {getOneMonthLaterMonthDayFromDay(+startDay)}
              </span>
            </label>
          </div>
          {isStartDayError && (
            <p className="text-red-500 p-1">正しくありません。</p>
          )}
          <label className="form-control">
            <div className="label">
              <span className="label-text text-neutral-400">乗車駅</span>
            </div>
            <input
              type="text"
              placeholder="ex. 品川"
              className="input input-bordered w-full max-w-xs text-neutral-800"
              value={start}
              onChange={onChangeStart}
            />
            {isStartError && (
              <p className="text-red-500 p-1">入力してください。</p>
            )}
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-neutral-400">降車駅</span>
            </div>
            <input
              type="text"
              placeholder="ex. 新宿"
              className="input input-bordered w-full max-w-xs text-neutral-800"
              value={end}
              onChange={onChangeEnd}
            />
            {isEndError && (
              <p className="text-red-500 p-1">入力してください。</p>
            )}
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-neutral-400">発売額</span>
            </div>
            <input
              type="number"
              placeholder="ex. 15000"
              className="input input-bordered w-full max-w-xs text-neutral-800"
              value={price}
              onChange={onChangePrice}
            />
            {isPriceError && (
              <p className="text-red-500 p-1">正しくありません。</p>
            )}
          </label>
          <div className="flex flex-col w-full max-w-xs mt-5">
            <FormBtn value="追加" onClick={handleAddItem} />
          </div>
        </div>
      </div>
    </dialog>
  );
}
