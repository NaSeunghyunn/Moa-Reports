export const isDayOff = (workType: string): boolean =>
  workType === WORK_TYPE.DAY_OFF;

export const isWork = (workType: string): boolean =>
  workType === WORK_TYPE.WORK;

export const WORK_TYPE = {
  WORK: "WORK",
  DAY_OFF: "DAY_OFF",
};
