"use client";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import CommuterPassDroppable from "@/components/CommuterPassDroppable";
import CommuterPassSorttableItem from "@/components/CommuterPassSorttableItem";
import { useAtomValue } from "jotai";
import { activeItemAtom, itemGroupsAtom } from "@/atoms";
import { useCommuterPassDnd } from "@/lib/commuterPassUtil";
import CommuterPassRemoveDroppable from "@/components/CommuterPassRemoveDroppable";
import { useIsModified } from "@/hooks/useIsModified";
import { useId } from "react";

export default function CommuterPass() {
  const itemGroups = useAtomValue(itemGroupsAtom);
  const activeItem = useAtomValue(activeItemAtom);
  const isModified = useIsModified(itemGroups);
  const id = useId();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { handleDragStart, handleDragCancel, handleDragOver, handleDragEnd } =
    useCommuterPassDnd();

  return (
    <div className="relative">
      {isModified && (
        <div className="absolute top-3 right-10 z-10 opacity-90">
          <button className="bg-sky-500 py-2 px-3 rounded-xl">
            変更を反映
          </button>
        </div>
      )}
      <DndContext
        id={id}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-3 justify-between pt-16 pb-24 px-5 h-dvh overflow-y-auto">
          <div className="flex flex-col gap-10 justify-center items-center">
            {Object.keys(itemGroups).map((group) => (
              <CommuterPassDroppable
                key={group}
                id={group}
                items={itemGroups[group]}
                itemColor={group === "USE" ? "green" : "neutral"}
                indicatorTitle={group === "USE" ? "使用中" : "未使用"}
                indicatorColor={
                  group === "USE" ? "badge-primary" : "badge-neutral"
                }
                isUse={group === "USE"}
              />
            ))}
          </div>
          <CommuterPassRemoveDroppable />
        </div>
        <DragOverlay>
          {activeItem ? (
            <CommuterPassSorttableItem
              id={activeItem.id}
              item={activeItem}
              itemColor="blue"
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
