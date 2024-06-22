import "server-only";
import { KintaiDetailProps } from "../types/KintaiType";

export function findKintais(yearMonth: string): KintaiDetailProps[] {
  const [year, month] = yearMonth.split("-");
  const lastDate = new Date(+year, +month, 0).getDate();

  return [];
}
