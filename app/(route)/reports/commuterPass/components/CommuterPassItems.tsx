interface CommuterPassListProps {
  commuterPassList: number[];
  itemColor: "neutral" | "green";
}

export default function CommuterPassItems({
  commuterPassList,
  itemColor,
}: CommuterPassListProps) {
  return (
    <div className="grid grid-cols-1 gap-3 border border-neutral-500 w-full min-h-24 p-5 rounded-lg">
      {commuterPassList.map((data) => (
        <div
          className={`bg-${itemColor}-500 border-${itemColor}-700 flex justify-around h-12 items-center rounded-lg border-2 select-none`}
        >
          <span>品川 ⇄ 高輪台</span>
          <span>23000円</span>
        </div>
      ))}
    </div>
  );
}
