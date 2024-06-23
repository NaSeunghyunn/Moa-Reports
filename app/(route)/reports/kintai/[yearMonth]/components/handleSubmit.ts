import { saveKintai, saveKintaiDetail } from "@/service/KintaiService";
import { KintaiDetailProps, WorkType } from "@/types/KintaiType";

export const handleSubmit = async (
  kintaiId: number | undefined,
  kintaiDetail: KintaiDetailProps,
  startTime: Date,
  endTime: Date,
  breakTime: number,
  selectedWorkType: WorkType,
  remarks: string,
  kintaiList: KintaiDetailProps[],
  setKintaiList: (value: KintaiDetailProps[]) => void,
  setKintaiId: (value: number) => void
) => {
  const findKintaiId = await getKintaiId(kintaiId, kintaiDetail);
  setKintaiId(+findKintaiId);

  const saveKintai = await saveKintaiDetail({
    id: kintaiDetail.id,
    kintaiId: findKintaiId,
    day: kintaiDetail.date.getDate(),
    startTime: startTime!,
    endTime,
    breakTime,
    workType: selectedWorkType,
    remarks,
  });

  const updatedDetail: KintaiDetailProps = {
    ...kintaiDetail,
    id: saveKintai.id,
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

const getKintaiId = async (
  kintaiId: number | undefined,
  kintaiDetail: KintaiDetailProps
) => {
  if (kintaiId) {
    return kintaiId;
  } else {
    const result = await saveKintai({
      year: kintaiDetail.date.getFullYear(),
      month: kintaiDetail.date.getMonth() + 1,
    });
    return result.id;
  }
};
