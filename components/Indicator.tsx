interface IndicatorProps {
  title: string;
  bgColor: "badge-primary" | "badge-neutral";
}

export default function Indicator({ title, bgColor }: IndicatorProps) {
  return (
    <span className={`indicator-item indicator-center badge ${bgColor} p-3`}>
      {title}
    </span>
  );
}
