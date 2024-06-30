import OutputBtn from "@/components/outputBtn";
import { TEMPLATE_TYPE } from "@/lib/templateUtil";

export default function OutputModal() {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-neutral-700">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg text-neutral-300">勤務表を出力しますか？</h3>
        <div className="mt-5 grid grid-cols-2 gap-5 *:select-none">
          <OutputBtn templateType={TEMPLATE_TYPE["MORE"]} title="MORE" />{" "}
          <OutputBtn templateType={TEMPLATE_TYPE["SMT"]} title="SMT" />
        </div>
      </div>
    </dialog>
  );
}
