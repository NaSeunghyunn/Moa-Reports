export async function fetchHolidays(yearMonth: string) {
  const response = await fetch(
    `https://holidays-jp.github.io/api/v1/${yearMonth.split("-")[0]}/date.json`
  );

  if (response.ok) {
    const result = await response.json();
    const holidays = Object.keys(result);
    const targetMonth = +yearMonth.split("-")[1];
    return holidays
      .filter((data) => +data.split("-")[1] === targetMonth)
      .map((data) => +data.split("-")[2]);
  }

  return [];
}
