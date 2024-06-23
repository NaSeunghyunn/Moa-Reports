export const isWork = (workType: string): boolean =>
  workType === WORK_TYPE.WORK;

export const WORK_TYPE = {
  WORK: "WORK",
  DAY_OFF: "DAY_OFF",
};
