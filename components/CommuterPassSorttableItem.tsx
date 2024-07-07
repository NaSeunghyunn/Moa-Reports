import { CommuterPassType } from "@/types/CommuterPassType";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CommuterPassSorttableItemProps {
  id: string;
  item: CommuterPassType;
  itemColor: "neutral" | "green" | "blue";
}

const itemColors = {
  neutral: "bg-neutral-500 border-neutral-700",
  green: "bg-green-500 border-green-700",
  blue: "bg-blue-500 border-blue-700",
};

export default function CommuterPassSorttableItem({
  id,
  item,
  itemColor,
}: CommuterPassSorttableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex justify-around h-12 items-center rounded-lg border-2 select-none ${itemColors[itemColor]}`}
    >
      <div>
        <span>{item.start}</span>
        <span className="px-2">⇄</span>
        <span>{item.end}</span>
      </div>
      <span>{`${item.price.toLocaleString()}円`}</span>
    </div>
  );
}
