import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { sentimentTimeSeries } from '../../data/sentimentTimeSeries';

export default function SentimentChart() {
  // Aggregate per-source data (category='all') into chart-friendly format
  const sourceData = sentimentTimeSeries.filter((d) => d.category === 'all');
  const weeks = [...new Set(sourceData.map((d) => d.weekOf))].sort();

  const chartData = weeks.map((week) => {
    const support = sourceData.find((d) => d.weekOf === week && d.source === 'support');
    const sales = sourceData.find((d) => d.weekOf === week && d.source === 'sales');
    const nps = sourceData.find((d) => d.weekOf === week && d.source === 'nps');
    return {
      week: week.slice(5), // MM-DD
      support: support?.avgSentiment ?? 0,
      sales: sales?.avgSentiment ?? 0,
      nps: nps?.avgSentiment ?? 0,
    };
  });

  return (
    <div className="border border-gray-400 p-4">
      <h3 className="text-xs font-bold uppercase mb-3">Sentiment Over Time (26 weeks)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 10, fontFamily: 'monospace' }}
            interval={3}
          />
          <YAxis
            domain={[-1, 1]}
            tick={{ fontSize: 10, fontFamily: 'monospace' }}
            tickFormatter={(v: number) => v.toFixed(1)}
          />
          <Legend
            wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }}
          />
          <Line
            type="monotone"
            dataKey="support"
            stroke="#111827"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#6b7280"
            strokeWidth={1.5}
            strokeDasharray="6 3"
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="nps"
            stroke="#9ca3af"
            strokeWidth={1.5}
            strokeDasharray="2 2"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
