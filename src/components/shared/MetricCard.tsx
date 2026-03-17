interface MetricCardProps {
  label: string;
  value: string;
}

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="border border-gray-400 px-4 py-3">
      <div className="text-[10px] text-gray-500 uppercase">{label}</div>
      <div className="text-lg font-bold mt-0.5">{value}</div>
    </div>
  );
}
