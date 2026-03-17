import { ValueRule, FeedbackSource, ImpactType } from '../../types';

interface RuleEditorProps {
  rule: ValueRule;
  onChange: (rule: ValueRule) => void;
}

const allCategories = ['billing', 'onboarding', 'integrations', 'api', 'performance', 'ui_ux', 'documentation', 'pricing', 'mobile', 'security', 'reporting', 'reliability', 'support_quality', 'general'];
const allSources: FeedbackSource[] = ['support', 'sales', 'nps'];
const allSegments: ('enterprise' | 'mid-market' | 'smb')[] = ['enterprise', 'mid-market', 'smb'];
const impactTypes: ImpactType[] = ['churn_risk', 'expansion_opportunity', 'support_cost', 'time_saved'];

export default function RuleEditor({ rule, onChange }: RuleEditorProps) {
  const update = (patch: Partial<ValueRule>) => onChange({ ...rule, ...patch });
  const updateConditions = (patch: Partial<ValueRule['conditions']>) =>
    update({ conditions: { ...rule.conditions, ...patch } });
  const updateValuation = (patch: Partial<ValueRule['valuation']>) =>
    update({ valuation: { ...rule.valuation, ...patch } });

  const toggleCategory = (cat: string) => {
    const cats = rule.conditions.categories.includes(cat)
      ? rule.conditions.categories.filter((c) => c !== cat)
      : [...rule.conditions.categories, cat];
    updateConditions({ categories: cats });
  };

  const toggleSource = (src: FeedbackSource) => {
    const current = rule.conditions.sourceFilter || [];
    const next = current.includes(src)
      ? current.filter((s) => s !== src)
      : [...current, src];
    updateConditions({ sourceFilter: next.length ? next : undefined });
  };

  const toggleSegment = (seg: 'enterprise' | 'mid-market' | 'smb') => {
    const current = rule.conditions.segmentFilter || [];
    const next = current.includes(seg)
      ? current.filter((s) => s !== seg)
      : [...current, seg];
    updateConditions({ segmentFilter: next.length ? next : undefined });
  };

  return (
    <div className="border-t border-gray-300 mt-3 pt-3 space-y-4">
      {/* Conditions */}
      <div>
        <h4 className="text-[10px] font-bold uppercase text-gray-500 mb-2">Conditions</h4>

        <div className="space-y-2">
          <div>
            <label className="text-[10px] text-gray-500">Categories</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`text-[10px] px-1.5 py-0.5 border ${
                    rule.conditions.categories.includes(cat)
                      ? 'bg-gray-900 text-gray-50 border-gray-900'
                      : 'border-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="text-[10px] text-gray-500">Sentiment Threshold</label>
              <input
                type="number"
                step="0.1"
                min="-1"
                max="1"
                value={rule.conditions.sentimentThreshold}
                onChange={(e) => updateConditions({ sentimentThreshold: parseFloat(e.target.value) || 0 })}
                className="block w-20 px-2 py-1 text-xs border border-gray-400 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500">Min Volume/Week</label>
              <input
                type="number"
                min="0"
                value={rule.conditions.minVolumePerWeek}
                onChange={(e) => updateConditions({ minVolumePerWeek: parseInt(e.target.value) || 0 })}
                className="block w-20 px-2 py-1 text-xs border border-gray-400 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-500">Source Filter</label>
            <div className="flex gap-1 mt-1">
              {allSources.map((src) => (
                <button
                  key={src}
                  onClick={() => toggleSource(src)}
                  className={`text-[10px] px-1.5 py-0.5 border ${
                    (rule.conditions.sourceFilter || []).includes(src)
                      ? 'bg-gray-900 text-gray-50 border-gray-900'
                      : 'border-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-500">Segment Filter</label>
            <div className="flex gap-1 mt-1">
              {allSegments.map((seg) => (
                <button
                  key={seg}
                  onClick={() => toggleSegment(seg)}
                  className={`text-[10px] px-1.5 py-0.5 border ${
                    (rule.conditions.segmentFilter || []).includes(seg)
                      ? 'bg-gray-900 text-gray-50 border-gray-900'
                      : 'border-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Valuation */}
      <div>
        <h4 className="text-[10px] font-bold uppercase text-gray-500 mb-2">Valuation</h4>
        <div className="space-y-2">
          <div className="flex gap-4">
            <div>
              <label className="text-[10px] text-gray-500">Impact Type</label>
              <select
                value={rule.valuation.impactType}
                onChange={(e) => updateValuation({ impactType: e.target.value as ImpactType })}
                className="block px-2 py-1 text-xs border border-gray-400 mt-1"
              >
                {impactTypes.map((t) => (
                  <option key={t} value={t}>{t.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-gray-500">$/Incident</label>
              <input
                type="number"
                min="0"
                value={rule.valuation.estimatedValuePerIncident}
                onChange={(e) => updateValuation({ estimatedValuePerIncident: parseFloat(e.target.value) || 0 })}
                className="block w-24 px-2 py-1 text-xs border border-gray-400 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-500">Formula</label>
            <input
              type="text"
              value={rule.valuation.formula}
              onChange={(e) => updateValuation({ formula: e.target.value })}
              className="block w-full px-2 py-1 text-xs border border-gray-400 mt-1"
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-500">Confidence</label>
            <div className="flex gap-2 mt-1">
              {(['high', 'medium', 'low'] as const).map((level) => (
                <label key={level} className="flex items-center gap-1 text-[10px]">
                  <input
                    type="radio"
                    name={`confidence-${rule.id}`}
                    checked={rule.valuation.confidenceLevel === level}
                    onChange={() => updateValuation({ confidenceLevel: level })}
                    className="accent-gray-900"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
