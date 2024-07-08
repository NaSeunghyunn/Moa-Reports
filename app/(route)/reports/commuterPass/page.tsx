"use client";
import React, { useEffect } from "react";
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
import { useAtom } from "jotai";
import { activeItemAtom, itemGroupsAtom } from "@/atoms";
import { uuid } from "@/lib/uuid";
import { useCommuterPassDnd } from "@/lib/commuterPassUtil";
import CommuterPassRemoveDroppable from "@/components/CommuterPassRemoveDroppable";

export default function CommuterPass() {
  const [itemGroups, setItemGroups] = useAtom(itemGroupsAtom);
  const [activeItem, setActiveItem] = useAtom(activeItemAtom);

  useEffect(() => {
    setItemGroups(() => ({
      USE: [
        {
          id: uuid(),
          commuterPassId: 1,
          type: "USE",
          start: "品川",
          end: "高輪台",
          price: 32000,
          orderNumber: 1,
        },
        {
          id: uuid(),
          commuterPassId: 2,
          type: "USE",
          start: "竹ノ塚",
          end: "茅場町",
          price: 11000,
          orderNumber: 2,
        },
        {
          id: uuid(),
          commuterPassId: 3,
          type: "USE",
          start: "谷塚",
          end: "門前仲町",
          price: 23000,
          orderNumber: 3,
        },
      ],
      UNUSED: [
        {
          id: uuid(),
          commuterPassId: 4,
          type: "UNUSED",
          start: "西新井",
          end: "人形町",
          price: 9000,
          orderNumber: 4,
        },
        {
          id: uuid(),
          commuterPassId: 5,
          type: "UNUSED",
          start: "新宿",
          end: "新大久保",
          price: 1000,
          orderNumber: 5,
        },
        {
          id: uuid(),
          commuterPassId: 6,
          type: "UNUSED",
          start: "銀座",
          end: "三田",
          price: 3000,
          orderNumber: 6,
        },
      ],
    }));
  }, [setItemGroups]);

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
    <DndContext
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
  );
}
