interface IndicatorProps {
  title: string;
  bgColor: "primary" | "neutral";
}

export default function Indicator({ title, bgColor }: IndicatorProps) {
  return (
    <span
      className={`indicator-item indicator-center badge badge-${bgColor} p-3`}
    >
      {title}
    </span>
  );
}
