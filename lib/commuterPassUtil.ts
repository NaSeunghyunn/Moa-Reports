import { CommuterPassType, ItemGroups } from "@/types/CommuterPassType";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { insertAtIndex, removeAtIndex } from "./array";
import { useAtom } from "jotai";
import { activeItemAtom, itemGroupsAtom } from "@/atoms";
import { uuid } from "./uuid";

export function useCommuterPassDnd() {
  const [itemGroups, setItemGroups] = useAtom(itemGroupsAtom);
  const [activeItem, setActiveItem] = useAtom(activeItemAtom);

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
    if (overContainer === "REMOVE") return;

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

      if (overContainer === "REMOVE") {
        handleRemoveDragEnd(activeContainer, activeIndex);
        return;
      }

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

  const handleRemoveDragEnd = (
    activeContainer: string,
    activeIndex: number
  ) => {
    setItemGroups((itemGroups) => {
      const updatedGroup = removeAtIndex(
        itemGroups[activeContainer],
        activeIndex
      );
      return {
        ...itemGroups,
        [activeContainer]: updatedGroup,
      };
    });
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

  return {
    handleDragStart,
    handleDragCancel,
    handleDragOver,
    handleDragEnd,
  };
}

export function newitem(
  startDay: number,
  start: string,
  end: string,
  price: number
): CommuterPassType {
  return {
    id: uuid(),
    type: "USE",
    startDay,
    start,
    end,
    price,
  };
}
