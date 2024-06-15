export const formatDayJA = (date: Date): string => `${date.getDate()}日`;

export const calculateWorkingTime = (
  startTime: Date | undefined,
  endTime: Date | undefined,
  breakTime: number
): number => {
  if (!startTime || !endTime) {
    return 0;
  }

  // startTime, endTime, breakTime을 분 단위로 변환합니다.
  const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const endTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes();

  // 총 근무 시간을 분 단위로 계산합니다.
  let totalWorkingMinutes = endTimeMinutes - startTimeMinutes;

  // 분 단위를 시간으로 변환하여 반환합니다.
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
