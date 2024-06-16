export const WORK_TYPE = {
  WORK: "WORK",
  DAY_OFF: "DAY_OFF",
};

export interface KintaiDetailProps {
  id?: number;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  breakTime: number;
  workType: string;
  remarks?: string;
  userId: number;
}
