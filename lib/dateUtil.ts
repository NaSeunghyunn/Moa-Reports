import { DateTime } from "luxon";
import { TokyoDateType } from "@/types";
import { WORK_TYPE } from "./kintaiUtil";
import moment from "moment";

const TIME_ZONE = "Asia/Tokyo";

export const formatDayJA = (date: Date): string => `${date.getDate()}日`;

export const calculateWorkingTime = (
  startTime: Date | undefined | null,
  endTime: Date | undefined | null,
  breakTime: number,
  workType: string
): number => {
  if (!startTime || !endTime) return 0;

  if (workType === WORK_TYPE.DAY_OFF) return 0;

  const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const endTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes();

  let totalWorkingMinutes = endTimeMinutes - startTimeMinutes;
  const totalWorkingHours = totalWorkingMinutes / 60;

  return totalWorkingHours - breakTime;
};

export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};

export const getDayOfWeek = (date: Date): string => {
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  return daysOfWeek[date.getDay()];
};

export const formatWorkingTime = (
  startTime: Date | undefined,
  endTime: Date | undefined
) => {
  if (!startTime || !endTime) return;
  return `${formatTime(startTime)} ~ ${formatTime(endTime)}`;
};

export const isDayOff = (date: Date) => {
  return date.getDay() === 0 || date.getDay() === 6;
};

export const getTokyoDateTime = ({
  year,
  month,
  day,
  hour,
  minute,
}: TokyoDateType) => {
  const dateTime = DateTime.fromObject(
    {
      year,
      month,
      day,
      hour: hour ?? 0,
      minute: minute ?? 0,
    },
    { zone: "Asia/Tokyo" }
  );
  return dateTime.toJSDate();
};

export const getLastDay = () => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return date.getDate();
};

export const getOneMonthLaterMonthDay = (date: Date) => {
  let result = moment(date);
  result.add(1, "M").subtract(1, "days");
  return `${result.month() + 1}/${result.date()}`;
};

export const getOneMonthLaterMonthDayFromDay = (day: number) => {
  const date = moment().date(day).toDate();
  return getOneMonthLaterMonthDay(date);
};

export const getOneMonthLaterMonthDayRange = (day: number) => {
  const date = moment().date(day).toDate();
  return `${date.getMonth() + 1}/${date.getDate()}〜${getOneMonthLaterMonthDay(
    date
  )}`;
};
