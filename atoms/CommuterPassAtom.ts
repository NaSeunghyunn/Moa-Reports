import { CommuterPassType, ItemGroups } from "@/types/CommuterPassType";
import { atom } from "jotai";

export const itemGroupsAtom = atom<ItemGroups>({
  USE: [],
  UNUSED: [],
});

export const activeItemAtom = atom<CommuterPassType | null>(null);
