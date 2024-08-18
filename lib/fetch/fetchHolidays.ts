export async function fetchHolidays(yearMonth: string) {
  const yearMonthSplit = yearMonth.split("-");
  const year = +yearMonthSplit[0];
  const month = +yearMonthSplit[1];

  return await fetchHolidaysOfNumberYearMonth(year, month);
}

export async function fetchHolidaysOfNumberYearMonth(
  year: number,
  month: number
) {
  const response = await fetch(
    `https://holidays-jp.github.io/api/v1/${year}/date.json`
  );

  if (response.ok) {
    const result = await response.json();
    const holidays = Object.keys(result);
    const targetMonth = month;
    return holidays
      .filter((data) => +data.split("-")[1] === targetMonth)
      .map((data) => +data.split("-")[2]);
  }

  return [];
}
