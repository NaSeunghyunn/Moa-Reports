import { WORK_TYPE } from "@/types/KintaiType";

export const isDayOff = (workType: string): boolean =>
  workType === WORK_TYPE.DAY_OFF;

export const isWork = (workType: string): boolean =>
  workType === WORK_TYPE.WORK;
