import OutputBtn from "@/components/outputBtn";
import { tempalteListType } from "@/repository/templateRepository";
import { TemplateType } from "@/types/TemplateType";

interface OutputModalProps {
  modalId: string;
  templates: tempalteListType;
}

export default function OutputModal({ modalId, templates }: OutputModalProps) {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-neutral-700">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg text-neutral-300">勤務表を出力しますか？</h3>
        <div
          className={`mt-5 grid ${
            templates.length > 1 && "grid-cols-2"
          } gap-5 *:select-none`}
        >
          {templates.map((data, index) => (
            <OutputBtn
              key={index}
              templateType={data.tempalte.type as TemplateType}
              title={data.tempalte.name}
            />
          ))}
        </div>
      </div>
    </dialog>
  );
}
