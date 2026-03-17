import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { weeklyVolumes } from '../../data/sentimentTimeSeries';
import { feedbackItems } from '../../data/feedbackItems';
import SentimentChart from './SentimentChart';
import CategoryBreakdownTable from './CategoryBreakdownTable';
import PageHeader from '../layout/PageHeader';

export default function SentimentDashboard() {
  const totalFeedback = feedbackItems.length;
  const avgSentiment =
    feedbackItems.reduce((sum, f) => sum + f.sentimentScore, 0) / totalFeedback;
  const npsItems = feedbackItems.filter((f) => f.npsScore !== undefined);
  const avgNps = npsItems.length
    ? npsItems.reduce((sum, f) => sum + (f.npsScore ?? 0), 0) / npsItems.length
    : 0;

  const volumeChartData = weeklyVolumes.map((w) => ({
    week: w.weekOf.slice(5),
    support: w.support,
    sales: w.sales,
    nps: w.nps,
  }));

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Sentiment Trends" subtitle="26-week analysis across all sources" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Key metrics row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Feedback', value: String(totalFeedback) },
            { label: 'Avg Sentiment', value: avgSentiment >= 0 ? `+${avgSentiment.toFixed(2)}` : avgSentiment.toFixed(2) },
            { label: 'Avg NPS', value: avgNps.toFixed(1) },
            { label: 'Trend', value: '\u2193 Declining' },
          ].map((m) => (
            <div key={m.label} className="border border-gray-400 px-4 py-3">
              <div className="text-[10px] text-gray-500 uppercase">{m.label}</div>
              <div className="text-lg font-bold mt-0.5">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Sentiment line chart */}
        <SentimentChart />

        {/* Volume bar chart */}
        <div className="border border-gray-400 p-4">
          <h3 className="text-xs font-bold uppercase mb-3">Feedback Volume Per Week</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={volumeChartData}>
              <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fontFamily: 'monospace' }} interval={3} />
              <YAxis tick={{ fontSize: 10, fontFamily: 'monospace' }} />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
              <Bar dataKey="support" stackId="a" fill="#111827" isAnimationActive={false} />
              <Bar dataKey="sales" stackId="a" fill="#6b7280" isAnimationActive={false} />
              <Bar dataKey="nps" stackId="a" fill="#d1d5db" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown table */}
        <CategoryBreakdownTable />
      </div>
    </div>
  );
}
