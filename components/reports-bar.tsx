"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  DirectionsSubwayFilled,
  DirectionsSubwayOutlined,
  WorkHistory,
  WorkHistoryOutlined,
} from "@mui/icons-material";

export default function ReprotsBar() {
  const pathname = usePathname();
  const isKintai = pathname.startsWith("/reports/kintai");
  const isTransportation = pathname.startsWith("/reports/transportation");
  const isCommuterPass = pathname.startsWith("/reports/commuterPass");
  return (
    <div className="fixed select-none bottom-0 w-full mx-auto max-w-screen-sm grid grid-cols-3 border-gray-600 border-t px-5 py-3 bg-neutral-900 *:text-white *:text-sm *:font-light">
      <Link
        href="/reports/kintai"
        className="flex flex-col items-center gap-px"
      >
        {isKintai ? (
          <WorkHistory className=" text-green-600" />
        ) : (
          <WorkHistoryOutlined />
        )}
        <span className={isKintai ? "text-green-600" : "text-white"}>勤怠</span>
      </Link>
      <Link
        href="/reports/transportation"
        className="flex flex-col items-center gap-px"
      >
        {isTransportation ? (
          <DirectionsSubwayFilled className=" text-green-600" />
        ) : (
          <DirectionsSubwayOutlined />
        )}
        <span className={isTransportation ? "text-green-600" : "text-white"}>
          交通費
        </span>
      </Link>
      <Link
        href="/reports/commuterPass"
        className="flex flex-col items-center gap-px"
      >
        {isCommuterPass ? (
          <CreditCard className=" text-green-600" />
        ) : (
          <CreditCard />
        )}
        <span className={isCommuterPass ? "text-green-600" : "text-white"}>
          定期券
        </span>
      </Link>
    </div>
  );
}
