export default function DonutRing({
  segments,
  size = 140,
  strokeWidth = 16,
  centerLabel,
  centerValue,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string | number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  let offsetAccum = 0;
  const arcs = segments.map((s) => {
    const fraction = s.value / total;
    const dash = fraction * circumference;
    const arc = { ...s, dash, gap: circumference - dash, offset: -offsetAccum };
    offsetAccum += dash;
    return arc;
  });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(14,20,20,0.08)"
          strokeWidth={strokeWidth}
        />
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeDashoffset={arc.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      {(centerLabel || centerValue !== undefined) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue !== undefined && (
            <span className="font-display text-2xl font-medium text-ink">{centerValue}</span>
          )}
          {centerLabel && <span className="text-xs text-ink/50">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}
