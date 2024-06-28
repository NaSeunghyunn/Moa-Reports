"use client";
import { useState } from "react";
import { downloadKintai } from "@/lib/excel/downloadKintai";
import { PrintOutlined } from "@mui/icons-material";
import { useAtomValue } from "jotai";
import { kintaiListAtom, yearMonthAtom } from "@/atoms";

export default function OutputBtn() {
  const [loading, setLoading] = useState(false);
  const yearMonth = useAtomValue(yearMonthAtom);
  const kintaiList = useAtomValue(kintaiListAtom);
  if (!yearMonth) {
    return null;
  }

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadKintai({ yearMonth, kintaiList });
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
      className="flex gap-1 border-green-600 border px-3 py-1 rounded-xl bg-green-600 disabled:bg-gray-500"
    >
      {loading ? (
        <span className="loading loading-dots loading-md text-white"></span>
      ) : (
        <>
          <PrintOutlined />
          <span>出力</span>
        </>
      )}
    </button>
  );
}
