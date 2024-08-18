import {
  AllGoalType,
  AllVehicleType,
  TransportaionsOfDayType,
} from "@/types/TransportaionType";
import { atom } from "jotai";

export const transprotationsAtom = atom<TransportaionsOfDayType[]>([]);
export const selectedTransportationsOfDayAtom =
  atom<TransportaionsOfDayType | null>(null);
export const selectedTransportationsOfDayIndexAtom = atom<number>(0);
export const allGoalAtom = atom<AllGoalType>("_");
export const allVehicleAtom = atom<AllVehicleType>("_");
