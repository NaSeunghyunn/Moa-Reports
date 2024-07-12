import { uuid } from "@/lib/uuid";
import { CommuterPassType, ItemGroups } from "@/types/CommuterPassType";
import { atom } from "jotai";

const initialItemGroups: ItemGroups = {
  USE: [
    {
      id: uuid(),
      commuterPassId: 1,
      type: "USE",
      start: "品川",
      end: "高輪台",
      price: 32000,
      orderNumber: 1,
    },
    {
      id: uuid(),
      commuterPassId: 2,
      type: "USE",
      start: "竹ノ塚",
      end: "茅場町",
      price: 11000,
      orderNumber: 2,
    },
    {
      id: uuid(),
      commuterPassId: 3,
      type: "USE",
      start: "谷塚",
      end: "門前仲町",
      price: 23000,
      orderNumber: 3,
    },
  ],
  UNUSED: [
    {
      id: uuid(),
      commuterPassId: 4,
      type: "UNUSED",
      start: "西新井",
      end: "人形町",
      price: 9000,
      orderNumber: 4,
    },
    {
      id: uuid(),
      commuterPassId: 5,
      type: "UNUSED",
      start: "新宿",
      end: "新大久保",
      price: 1000,
      orderNumber: 5,
    },
    {
      id: uuid(),
      commuterPassId: 6,
      type: "UNUSED",
      start: "銀座",
      end: "三田",
      price: 3000,
      orderNumber: 6,
    },
  ],
};

export const itemGroupsAtom = atom<ItemGroups>(initialItemGroups);
//   {
//   USE: [],
//   UNUSED: [],
// });

export const activeItemAtom = atom<CommuterPassType | null>(null);
