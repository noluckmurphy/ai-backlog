import { categoryBreakdowns } from '../../data/categoryBreakdowns';
import { trendArrow } from '../../utils/sentimentHelpers';
import { formatSentimentScore } from '../../utils/formatters';

export default function CategoryBreakdownTable() {
  return (
    <div className="border border-gray-400">
      <h3 className="text-xs font-bold uppercase px-4 py-3 border-b border-gray-400">
        Category Breakdown
      </h3>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-400 bg-gray-100">
            <th className="text-left px-4 py-2 text-[10px] font-bold uppercase text-gray-500">Category</th>
            <th className="text-right px-4 py-2 text-[10px] font-bold uppercase text-gray-500">Mentions</th>
            <th className="text-right px-4 py-2 text-[10px] font-bold uppercase text-gray-500">Avg Sentiment</th>
            <th className="text-center px-4 py-2 text-[10px] font-bold uppercase text-gray-500">Trend</th>
            <th className="text-left px-4 py-2 text-[10px] font-bold uppercase text-gray-500">Top Keywords</th>
          </tr>
        </thead>
        <tbody>
          {categoryBreakdowns.map((cat) => (
            <tr key={cat.category} className="border-b border-gray-300 hover:bg-gray-50">
              <td className="px-4 py-2 font-bold">{cat.category}</td>
              <td className="px-4 py-2 text-right">{cat.totalMentions}</td>
              <td className="px-4 py-2 text-right font-mono">
                {formatSentimentScore(cat.avgSentiment)}
              </td>
              <td className="px-4 py-2 text-center text-base">
                {trendArrow(cat.trend)}
              </td>
              <td className="px-4 py-2 text-gray-500">
                {cat.topKeywords.slice(0, 3).join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
