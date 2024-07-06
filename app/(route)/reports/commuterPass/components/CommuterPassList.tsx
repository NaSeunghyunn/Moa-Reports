import CommuterPassItems from "./CommuterPassItems";
import Indicator from "./indicator";

interface CommuterPassListProps {
  indicatorTitle: string;
  indicatorColor: "primary" | "neutral";
  commuterPassList: number[];
  commuterPassColor: "green" | "neutral";
}

export default function CommuterPassList({
  indicatorTitle,
  indicatorColor,
  commuterPassList,
  commuterPassColor,
}: CommuterPassListProps) {
  return (
    <div className="indicator w-full">
      <Indicator title={indicatorTitle} bgColor={indicatorColor} />
      <CommuterPassItems
        commuterPassList={commuterPassList}
        itemColor={commuterPassColor}
      />
    </div>
  );
}
