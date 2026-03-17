import { useState, useEffect } from 'react';
import { defaultValueRules } from '../../data/valueRules';
import { ValueRule } from '../../types';
import RuleEditor from './RuleEditor';
import PageHeader from '../layout/PageHeader';

const STORAGE_KEY = 'ai-backlog-rules';

function loadRules(): ValueRule[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultValueRules;
  } catch {
    return defaultValueRules;
  }
}

function saveRules(rules: ValueRule[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
}

export default function RulesList() {
  const [rules, setRules] = useState<ValueRule[]>(loadRules);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    saveRules(rules);
  }, [rules]);

  const toggleActive = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const updateRule = (updated: ValueRule) => {
    setRules((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Value Rules" subtitle="Configure how customer feedback maps to business value" />
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {rules.map((rule) => (
          <div key={rule.id} className="border border-gray-400 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(rule.id)}
                    role="switch"
                    aria-checked={rule.isActive}
                    aria-label={`Toggle ${rule.name}`}
                    className={`w-8 h-4 border border-gray-400 relative ${
                      rule.isActive ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-2.5 h-2.5 transition-all ${
                        rule.isActive ? 'right-0.5 bg-gray-50' : 'left-0.5 bg-gray-500'
                      }`}
                    />
                  </button>
                  <h3 className="text-xs font-bold">{rule.name}</h3>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">{rule.description}</p>
              </div>
              <button
                onClick={() => setExpandedId(expandedId === rule.id ? null : rule.id)}
                className="text-[10px] underline text-gray-500 hover:text-gray-900 shrink-0"
              >
                {expandedId === rule.id ? 'collapse' : 'edit'}
              </button>
            </div>

            {/* Summary line */}
            <div className="flex gap-3 mt-2 flex-wrap">
              <span className="text-[10px] text-gray-500">
                Categories: {rule.conditions.categories.slice(0, 3).join(', ')}
                {rule.conditions.categories.length > 3 && ` +${rule.conditions.categories.length - 3}`}
              </span>
              <span className="text-[10px] text-gray-500">
                Threshold: {rule.conditions.sentimentThreshold}
              </span>
              <span className="text-[10px] text-gray-500">
                ${rule.valuation.estimatedValuePerIncident}/incident
              </span>
            </div>

            {expandedId === rule.id && (
              <RuleEditor rule={rule} onChange={updateRule} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
