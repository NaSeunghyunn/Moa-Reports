import { getUsername } from "@/service/UserService";
import { KintaiDetailProps, YearMonthType } from "@/types";
import ExcelJS, { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { calculateWorkingTime, getDayOfWeek } from "../dateUtil";
import { WORK_TYPE } from "../kintaiUtil";

interface kintaiExcelProps {
  yearMonth: YearMonthType;
  kintaiList: KintaiDetailProps[];
}

export const more = {
  downloadKintai: async function ({ yearMonth, kintaiList }: kintaiExcelProps) {
    const { workbook, worksheet } = await readTemplate(
      `/excelTemplate/more_kintai_template${kintaiList.length}.xlsx`
    );

    worksheet.getCell("B4").value = yearMonth.year;
    worksheet.getCell("E4").value = yearMonth.month;
    const username = await getUsername();
    worksheet.getCell("V4").value = username;

    let rowIndex = 7;
    kintaiList.forEach((kintai) => {
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

    saveExcel(workbook, `勤務表_${yearMonth.month}月_${username}.xlsx`);
  },
};

export const smt = {
  downloadKintai: async function ({ yearMonth, kintaiList }: kintaiExcelProps) {
    const { workbook, worksheet } = await readTemplate(
      `/excelTemplate/smt_kintai_template${kintaiList.length}.xlsx`
    );

    const username = await getUsername();
    worksheet.getCell("B4").value = username;
    worksheet.getCell("A5").value = `${yearMonth.year}年 ${String(
      yearMonth.month
    ).padStart(2, "0")}月度`;

    let totalWorkingTime = 0;
    let rowIndex = 7;
    kintaiList.forEach((kintai) => {
      const row = worksheet.getRow(rowIndex);
      row.getCell("A").value = adjustOffset(kintai.date).getDate();
      row.getCell("B").value = getDayOfWeek(kintai.date);
      if (kintai.workType === WORK_TYPE.WORK) {
        row.getCell("C").value = adjustOffset(kintai.startTime);
        row.getCell("E").value = adjustOffset(kintai.endTime);
        const workingTime = calculateWorkingTime(
          kintai.startTime,
          kintai.endTime,
          kintai.breakTime,
          kintai.workType
        );
        row.getCell("G").value = workingTime;
        totalWorkingTime += workingTime;
        row.getCell("H").value = kintai.breakTime / 24;
      }
      row.getCell("I").value =
        kintai.workType === WORK_TYPE.WORK ? "出勤" : "休み";
      row.getCell("N").value = kintai.remarks;
      rowIndex++;
    });
    worksheet.getCell(`G${rowIndex}`).value = `${formatTime(totalWorkingTime)}`;

    saveExcel(workbook, `勤務表_${yearMonth.month}月_${username}.xlsx`);
  },
};

function adjustOffset(date: Date) {
  let adjustedDate = new Date(date);
  adjustedDate.setHours(adjustedDate.getHours() + 9);
  return adjustedDate;
}

function timeValue(date: Date) {
  return date.getHours() / 24 + date.getMinutes() / 1440;
}

function formatTime(numTime: number): string {
  const hours = Math.floor(numTime);
  const minutes = (numTime % 1) * 60;

  const formattedMinutes = minutes.toFixed(0).padStart(2, "0");

  return `${hours}:${formattedMinutes}`;
}

async function readTemplate(templateUrl: string) {
  const workbook = new ExcelJS.Workbook();

  const response = await fetch(templateUrl);
  const arrayBuffer = await response.arrayBuffer();

  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error("テンプレートファイルの読込に失敗しました。");
  }

  return {
    workbook,
    worksheet,
  };
}

async function saveExcel(workbook: Workbook, fileName: string) {
  const buffer = await workbook.xlsx.writeBuffer();
  const mimeType = {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  const blob = new Blob([buffer], mimeType);

  saveAs(blob, fileName);
}
