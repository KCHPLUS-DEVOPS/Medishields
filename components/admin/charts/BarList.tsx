export default function BarList({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-ink/70">{item.label}</span>
            <span className="font-medium text-ink">{item.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-ink/5">
            <div
              className="h-full rounded-full bg-teal transition-all duration-700 ease-out"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-sm text-ink/40">No data yet.</p>}
    </div>
  );
}
