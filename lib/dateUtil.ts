export const formatDayJA = (date: Date): string => `${date.getDate()}日`;

export const calculateWorkingTime = (
  startTime: Date | undefined | null,
  endTime: Date | undefined | null,
  breakTime: number
): number => {
  if (!startTime || !endTime) {
    return 0;
  }

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
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayIndex = date.getDay();
  const dayOfWeek = days[dayIndex];
  return dayOfWeek;
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
