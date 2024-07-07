import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SorttableItem from "./CommuterPassSorttableItem";
import Indicator from "@/components/Indicator";
import { CommuterPassType } from "@/types/CommuterPassType";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import CommuterPassAddModal from "./CommuterPassAddModal";

interface CommuterPassDroppableProps {
  id: string;
  items: CommuterPassType[];
  itemColor: "green" | "neutral";
  indicatorTitle: string;
  indicatorColor: "badge-primary" | "badge-neutral";
  isUse: boolean;
}

export default function CommuterPassDroppable({
  id,
  items,
  itemColor,
  indicatorTitle,
  indicatorColor,
  isUse,
}: CommuterPassDroppableProps) {
  const { setNodeRef } = useDroppable({ id });
  const modalId = "commuter_pass_add_modal";
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div className="indicator w-full" ref={setNodeRef}>
        <Indicator title={indicatorTitle} bgColor={indicatorColor} />
        <div className="grid grid-cols-1 gap-3 border border-neutral-500 w-full min-h-24 p-5 rounded-lg">
          {isUse && (
            <div className="flex justify-end items-center">
              <CommuterPassAddModal modalId={modalId} />
              <button
                className="size-8"
                onClick={() => {
                  const modal = document.getElementById(
                    modalId
                  ) as HTMLDialogElement;
                  modal.showModal();
                }}
              >
                <PlusCircleIcon className="text-neutral-300 hover:text-neutral-500 transition-colors" />
              </button>
            </div>
          )}
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
