import { TransportaionsOfDayType } from "@/types/TransportaionType";
import { atom } from "jotai";

const initialItems: TransportaionsOfDayType = [1, 2, 3, 4, 5].map((item) => ({
  id: item,
  date: new Date(2024, 6, 1),
  start: `獨協大学前${item}`,
  end: `高輪台${item}`,
  isTwoWayDirection: item % 2 === 0,
  goal: `goal${item}`,
  vehicle: `vehicle${item}`,
  price: item * 2350,
}));

const initialItems2: TransportaionsOfDayType = [11].map((item) => ({
  id: item,
  date: new Date(2024, 6, 22),
  start: `start${item}`,
  end: `end${item}`,
  isTwoWayDirection: item % 2 !== 0,
  goal: `goal${item}`,
  vehicle: `vehicle${item}`,
  price: item * 50,
}));

const initialItemss: TransportaionsOfDayType[] = [initialItems, initialItems2];

export const transprotationsAtom =
  atom<TransportaionsOfDayType[]>(initialItemss);
export const selectedTransportationsOfDayAtom =
  atom<TransportaionsOfDayType>(initialItems);
export const selectedTransportationsOfDayIndexAtom = atom<number>(0);
