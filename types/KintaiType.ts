import { WORK_TYPE } from "@/lib/kintaiUtil";

export type WorkType = (typeof WORK_TYPE)[keyof typeof WORK_TYPE];

export interface KintaiProps {
  id?: number;
  yearMonth: YearMonthType;
  kintaiDetails: KintaiDetailProps[];
}

export interface KintaiDetailProps {
  id?: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  breakTime: number;
  workType: WorkType;
  remarks?: string;
  userId?: number;
  kintaiId?: number;
}

export interface YearMonthType {
  year: number;
  month: number;
}

export interface saveKintaiDetailDto {
  id: number | undefined;
  kintaiId: number;
  yearMonth: YearMonthType;
  day: number;
  startTime: Date;
  endTime: Date;
  breakTime: number;
  workType: WorkType;
  remarks: string;
}
