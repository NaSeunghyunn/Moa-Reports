import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SorttableItem from "./CommuterPassSorttableItem";
import Indicator from "@/components/Indicator";
import { CommuterPassType } from "@/types/CommuterPassType";

interface CommuterPassDroppableProps {
  id: string;
  items: CommuterPassType[];
  itemColor: "green" | "neutral";
  indicatorTitle: string;
  indicatorColor: "primary" | "neutral";
}

export default function CommuterPassDroppable({
  id,
  items,
  itemColor,
  indicatorTitle,
  indicatorColor,
}: CommuterPassDroppableProps) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div className="indicator w-full" ref={setNodeRef}>
        <Indicator title={indicatorTitle} bgColor={indicatorColor} />
        <div className="grid grid-cols-1 gap-3 border border-neutral-500 w-full min-h-24 p-5 rounded-lg">
          {items.map((data) => (
            <SorttableItem
              key={data.id}
              id={data.id}
              item={data}
              itemColor={itemColor}
            />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
