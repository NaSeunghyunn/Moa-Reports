"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { insertAtIndex, removeAtIndex } from "@/lib/array";
import { CommuterPassType } from "@/types/CommuterPassType";
import CommuterPassDroppable from "@/components/CommuterPassDroppable";
import CommuterPassSorttableItem from "@/components/CommuterPassSorttableItem";

interface ItemGroups {
  [key: string]: CommuterPassType[];
}

export default function CommuterPass() {
  const [itemGroups, setItemGroups] = useState<ItemGroups>({
    USE: [
      {
        id: 1,
        type: "USE",
        start: "品川",
        end: "高輪台",
        price: 32000,
        orderNumber: 1,
      },
      {
        id: 3,
        type: "USE",
        start: "竹ノ塚",
        end: "茅場町",
        price: 11000,
        orderNumber: 2,
      },
      {
        id: 2,
        type: "USE",
        start: "谷塚",
        end: "門前仲町",
        price: 23000,
        orderNumber: 3,
      },
    ],
    UNUSED: [
      {
        id: 4,
        type: "UNUSED",
        start: "西新井",
        end: "人形町",
        price: 9000,
        orderNumber: 4,
      },
      {
        id: 5,
        type: "UNUSED",
        start: "新宿",
        end: "新大久保",
        price: 1000,
        orderNumber: 5,
      },
      {
        id: 6,
        type: "UNUSED",
        start: "銀座",
        end: "三田",
        price: 3000,
        orderNumber: 6,
      },
    ],
  });
  const [activeItem, setActiveItem] = useState<CommuterPassType | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragEndEvent) => {
    const activeContainer = active.data.current?.sortable.containerId;
    const activeIndex = active.data.current?.sortable.index;
    if (activeContainer && activeIndex !== undefined) {
      setActiveItem(itemGroups[activeContainer][activeIndex]);
    }
  };

  const handleDragCancel = () => setActiveItem(null);

  const handleDragOver = ({ active, over }: DragEndEvent) => {
    const overId = over?.id;

    if (!overId || !activeItem) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current?.sortable.index;

        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          activeItem
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !activeItem) {
      setActiveItem(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current?.sortable.index;

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            activeItem
          );
        }

        return newItems;
      });
    }
    setActiveItem(null);
  };

  const moveBetweenContainers = (
    items: ItemGroups,
    activeContainer: string,
    activeIndex: number,
    overContainer: string,
    overIndex: number,
    item: CommuterPassType
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid p-5 h-dvh">
        <div className="flex flex-col gap-10 justify-center items-center -mt-16">
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
            />
          ))}
        </div>
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
