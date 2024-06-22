import { KintaiDetailProps, WorkType } from "@/types/KintaiType";

export const handleSubmit = async (
  kintaiDetail: KintaiDetailProps,
  startTime: Date | null,
  endTime: Date | null,
  breakTime: number,
  selectedWorkType: WorkType,
  remarks: string,
  kintaiList: KintaiDetailProps[],
  setKintaiList: (value: KintaiDetailProps[]) => void
) => {
  if (!kintaiDetail) return;

  const updatedDetail: KintaiDetailProps = {
    ...kintaiDetail,
    workType: selectedWorkType,
    startTime: startTime ?? kintaiDetail.startTime,
    endTime: endTime ?? kintaiDetail.endTime,
    breakTime,
    remarks,
  };

  const newKintaiList = kintaiList.map((kintai) =>
    kintai.date.getDate() === kintaiDetail.date.getDate()
      ? updatedDetail
      : kintai
  );
  setKintaiList(newKintaiList);
};
