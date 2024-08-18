import { getDateDayOfWeek, isDayOff } from "@/lib";
import { TransportaionsOfDayType } from "@/types/TransportaionType";

interface TransportationProps {
  transportations: TransportaionsOfDayType;
}

export default function Transportation({
  transportations,
}: TransportationProps) {
  return (
    <div>
      <div className="rounded-lg bg-neutral-600 select-none">
        {
          <div
            className={`${
              isDayOff(transportations[0].date) && "text-red-500"
            } px-5 pb-3 pt-4 text-xl font-semibold`}
          >
            <span>{getDateDayOfWeek(transportations[0].date)}</span>
          </div>
        }
        {transportations.map((transportation, index) => (
          <div
            key={index}
            className="first:pt-5 last:pb-5 px-3 flex justify-between items-center *:text-start"
          >
            {transportation.goal !== "出勤" ? (
              <div className="flex gap-2 w-full ps-3">
                {transportation.goal}
              </div>
            ) : (
              <div className="flex gap-2 w-full ps-3">
                <div>
                  <span>{transportation.start}</span>
                </div>
                <div>{transportation.isTwoWayDirection ? "⇄" : "→"}</div>
                <div>
                  <span>{transportation.end}</span>
                </div>
              </div>
            )}

            <div className="min-w-14">
              {`￥${transportation.price.toLocaleString()}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
