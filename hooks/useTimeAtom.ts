import { endTimeAtom, startTimeAtom } from "@/atoms";
import { useAtom } from "jotai";

export const useTimeAtom = (type: "start" | "end") => {
  if (type === "start") {
    return useAtom(startTimeAtom);
  }
  return useAtom(endTimeAtom);
};
