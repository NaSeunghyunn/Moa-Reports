import { useDroppable } from "@dnd-kit/core";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function CommuterPassRemoveDroppable() {
  const { setNodeRef, isOver } = useDroppable({ id: "REMOVE" });
  const style = {
    backgroundColor: isOver ? "#60a5fa" : "",
    opacity: isOver ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex justify-center items-center w-full min-h-24 rounded-xl"
    >
      <TrashIcon className="size-5" />
    </div>
  );
}
