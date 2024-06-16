import "server-only";
import { isDayOff } from "@/lib/dateUtil";
import { KintaiDetailProps, WORK_TYPE } from "../types/KintaiType";

export function findKintais(yearMonth: string): KintaiDetailProps[] {
  const [year, month] = yearMonth.split("-");
  const lastDate = new Date(+year, +month, 0).getDate();

  return Array.from({ length: lastDate }, (_, index) => index + 1).map(
    (data): KintaiDetailProps => ({
      id: data,
      date: new Date(+year, +month - 1, data),
      startTime: ![0, 6].includes(new Date(+year, +month - 1, data).getDay())
        ? new Date(+year, +month - 1, data, 9, 0, 0)
        : undefined,
      endTime: new Date(+year, +month - 1, data, 18, 0, 0),
      breakTime: 1,
      workType: isDayOff(new Date(+year, +month - 1, data))
        ? WORK_TYPE.DAY_OFF
        : WORK_TYPE.WORK,
      userId: 1,
    })
  );
}
