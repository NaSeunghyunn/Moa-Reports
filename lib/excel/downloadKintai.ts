import { getUsername } from "@/service/UserService";
import { KintaiDetailProps, YearMonthType } from "@/types";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { getDayOfWeek } from "../dateUtil";
import { WORK_TYPE } from "../kintaiUtil";

interface kintaiExcelProps {
  yearMonth: YearMonthType;
  kintaiList: KintaiDetailProps[];
}

export async function downloadKintai({
  yearMonth,
  kintaiList,
}: kintaiExcelProps) {
  const workbook = new ExcelJS.Workbook();
  const templateUrl = `/excelTemplate/more_kintai_template${kintaiList.length}.xlsx`;

  const response = await fetch(templateUrl);
  const arrayBuffer = await response.arrayBuffer();

  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error("テンプレートファイルの読込に失敗しました。");
  }

  worksheet.getCell("B4").value = yearMonth.year;
  worksheet.getCell("E4").value = yearMonth.month;
  const username = await getUsername();
  worksheet.getCell("V4").value = username;

  let rowIndex = 7;
  kintaiList.forEach((kintai, index) => {
    const row = worksheet.getRow(rowIndex);
    row.getCell("C").value = getDayOfWeek(kintai.date);
    row.getCell("B").value = adjustOffset(kintai.date);
    if (kintai.workType === WORK_TYPE.WORK) {
      row.getCell("D").value = timeValue(kintai.startTime);
      row.getCell("H").value = timeValue(kintai.endTime);
      row.getCell("L").value = kintai.breakTime / 24;
    }
    row.getCell("T").value = kintai.remarks;
    rowIndex++;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const mimeType = {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  const blob = new Blob([buffer], mimeType);

  saveAs(blob, `勤務表_${yearMonth.month}月_${username}.xlsx`);
}

function adjustOffset(date: Date) {
  let adjustedDate = new Date(date);
  adjustedDate.setHours(adjustedDate.getHours() + 9);
  return adjustedDate;
}

function timeValue(date: Date) {
  return date.getHours() / 24 + date.getMinutes() / 1440;
}
