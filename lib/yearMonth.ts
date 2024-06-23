import { YearMonthType } from "@/types";

export const nextYearMonth = ({
  year,
  month,
}: YearMonthType): YearMonthType => {
  const date = new Date(year, month, 1);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};

export const prevYearMonth = ({
  year,
  month,
}: YearMonthType): YearMonthType => {
  const date = new Date(year, month - 2, 1);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};

export const toYearMonth = (yearMonth: string): YearMonthType => {
  const [year, month] = yearMonth.split("-");
  return {
    year: +year,
    month: +month,
  };
};

export const toYearMonthStr = ({ year, month }: YearMonthType) =>
  `${year}-${month}`;
