"use server";
import { fetchHolidays } from "@/lib/fetch/fetchHolidays";
import {
  KintaiDetailProps,
  KintaiProps,
  YearMonthType,
  saveKintaiDetailDto,
} from "@/types";
import {
  getDayOfWeek,
  getTokyoDateTime,
  isDayOff as checkDayOff,
  toYearMonth,
  toYearMonthStr,
  WORK_TYPE,
} from "@/lib";
import getSession from "@/lib/session";
import {
  KintaiDetailsPrismaType,
  KintaiPrismaType,
  findKintais,
  insertKintai,
  upsertKintaiDetail,
} from "@/repository";
import { revalidatePath } from "next/cache";

export async function saveKintaiDetail(saveCond: saveKintaiDetailDto) {
  const result = await upsertKintaiDetail(saveCond);
  revalidatePath(`reports/kintai/${toYearMonthStr(saveCond.yearMonth)}`);
  return result;
}

export async function saveKintai({ year, month }: YearMonthType) {
  const userId = (await getSession()).id!;
  return await insertKintai({ year, month }, userId);
}

export async function getKintai(yearMonth: string): Promise<KintaiProps> {
  const userId = (await getSession()).id!;
  const kintai: KintaiPrismaType = await findKintais(yearMonth, userId);
  const kintaiDetails = await getKintaiDetails(yearMonth, kintai);
  return {
    id: kintai?.id,
    yearMonth: toYearMonth(yearMonth),
    kintaiDetails,
  };
}

const getKintaiDetails = async (yearMonth: string, data: KintaiPrismaType) => {
  const holidays = await fetchHolidays(yearMonth);

  const { year, month } = toYearMonth(yearMonth);
  const lastDate = new Date(+year, +month, 0).getDate();
  return Array.from({ length: lastDate }, (_, index) => index + 1).map(
    (day): KintaiDetailProps => {
      const findKintaiDetail = data?.Kintais.find(
        (detail) => detail.day === day
      );
      const isHoliday = holidays.includes(day);

      if (findKintaiDetail) {
        return transformKintaiDetail(
          { year, month },
          findKintaiDetail,
          data?.userId!,
          isHoliday
        );
      }

      return createDefaultKintaiDetail(+year, +month, day, isHoliday);
    }
  );
};

const transformKintaiDetail = (
  { year, month }: YearMonthType,
  kintaiDetail: KintaiDetailsPrismaType,
  userId: number,
  isHoliday: boolean
): KintaiDetailProps => {
  const date = new Date(year, month - 1, kintaiDetail.day);
  return {
    id: kintaiDetail.id,
    date,
    dayOfWeek: getDayOfWeek(date),
    startTime: kintaiDetail.startTime,
    endTime: kintaiDetail.endTime,
    breakTime: kintaiDetail.breakTime,
    workType: kintaiDetail.workType,
    remarks: kintaiDetail.remarks ?? undefined,
    userId,
    isDayOff: checkDayOff(date) || isHoliday,
  };
};

const createDefaultKintaiDetail = (
  year: number,
  month: number,
  day: number,
  isHoliday: boolean
): KintaiDetailProps => {
  const date = new Date(year, month - 1, day);
  const isDayOff = checkDayOff(date) || isHoliday;
  return {
    date,
    dayOfWeek: getDayOfWeek(date),
    startTime: getTokyoDateTime({
      year,
      month,
      day,
      hour: 9,
      minute: 0,
    }),
    endTime: getTokyoDateTime({
      year,
      month,
      day,
      hour: 18,
      minute: 0,
    }),
    breakTime: 1,
    workType: isDayOff ? WORK_TYPE.DAY_OFF : WORK_TYPE.WORK,
    remarks: isHoliday ? "祝日" : undefined,
    isDayOff,
  };
};
