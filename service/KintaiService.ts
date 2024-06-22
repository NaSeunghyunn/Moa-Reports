import { fetchHolidays } from "@/lib/fetch/fetchHolidays";
import { findKintais } from "../repository/kintaiRepository";
import { KintaiDetailProps } from "../types/KintaiType";
import { isDayOff } from "@/lib/dateUtil";
import { WORK_TYPE } from "@/lib/kintaiUtil";

export async function getKintais(
  yearMonth: string
): Promise<KintaiDetailProps[]> {
  const holidays = await fetchHolidays(yearMonth);
  const kintais = findKintais(yearMonth);

  const [year, month] = yearMonth.split("-");
  const lastDate = new Date(+year, +month, 0).getDate();

  return Array.from({ length: lastDate }, (_, index) => index + 1).map(
    (day): KintaiDetailProps => {
      const findKintaiDetail = kintais.find(
        (kintai) => kintai.date.getDate() === day
      );

      if (findKintaiDetail) {
        return transformKintaiDetail(findKintaiDetail);
      }

      const isHoliday = holidays.includes(day);
      return createDefaultKintaiDetail(+year, +month, day, isHoliday);
    }
  );
}

const transformKintaiDetail = (
  kintaiDetail: KintaiDetailProps
): KintaiDetailProps => ({
  id: kintaiDetail.id,
  date: kintaiDetail.date,
  startTime: kintaiDetail.startTime,
  endTime: kintaiDetail.endTime,
  breakTime: kintaiDetail.breakTime,
  workType: kintaiDetail.workType,
  remarks: kintaiDetail.remarks,
  userId: kintaiDetail.userId,
});

const createDefaultKintaiDetail = (
  year: number,
  month: number,
  day: number,
  isHoliday: boolean
): KintaiDetailProps => ({
  date: new Date(year, month - 1, day),
  startTime: new Date(year, month - 1, day, 9, 0, 0),
  endTime: new Date(year, month - 1, day, 18, 0, 0),
  breakTime: 1,
  workType:
    isDayOff(new Date(+year, +month - 1, day)) || isHoliday
      ? WORK_TYPE.DAY_OFF
      : WORK_TYPE.WORK,
  remarks: isHoliday ? "祝日" : undefined,
});
