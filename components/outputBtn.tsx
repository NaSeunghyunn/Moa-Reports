"use client";
import { useState } from "react";
import { more, smt } from "@/lib/excel/downloadKintai";
import { useAtomValue } from "jotai";
import { kintaiListAtom, yearMonthAtom } from "@/atoms";
import { TEMPLATE_TYPE } from "@/lib/templateUtil";
import { TemplateType } from "@/types/TemplateType";

interface outputBtnProps {
  templateType: string;
  title: string;
}

export default function OutputBtn({ templateType, title }: outputBtnProps) {
  const [loading, setLoading] = useState(false);
  const yearMonth = useAtomValue(yearMonthAtom);
  const kintaiList = useAtomValue(kintaiListAtom);
  if (!yearMonth) {
    return null;
  }

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (TEMPLATE_TYPE.SMT === templateType) {
        await smt.downloadKintai({ yearMonth, kintaiList });
      } else {
        await more.downloadKintai({ yearMonth, kintaiList });
      }
    } catch (error) {
      alert("エラーが発生しました。もう一度やり直してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="bg-green-500 p-3 rounded-2xl w-full hover:bg-green-700 focus:bg-green-400 transition-colors disabled:bg-gray-500"
    >
      {loading ? (
        <span className="loading loading-dots loading-md text-white"></span>
      ) : (
        <span>{title}</span>
      )}
    </button>
  );
}
