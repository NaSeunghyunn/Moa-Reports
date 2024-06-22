import { WORK_TYPE } from "@/lib/kintaiUtil";

export type WorkType = (typeof WORK_TYPE)[keyof typeof WORK_TYPE];

export interface KintaiDetailProps {
  id?: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  breakTime: number;
  workType: WorkType;
  remarks?: string;
  userId?: number;
}
