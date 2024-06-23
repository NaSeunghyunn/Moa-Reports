import { KintaiDetailProps } from "@/types/KintaiType";
import { atom } from "jotai";

export const startTimeAtom = atom<Date | null>(null);
export const endTimeAtom = atom<Date | null>(null);
export const breakTimeAtom = atom<number>(1);
export const kintaiListAtom = atom<KintaiDetailProps[]>([]);
export const selectedKintaiAtom = atom<KintaiDetailProps | null>(null);
export const kintaiIdAtom = atom<number | undefined>(undefined);
