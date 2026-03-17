import { useState } from 'react';
import { defaultDataSources } from '../../data/dataSources';
import { DataSource } from '../../types';
import SourceCard from './SourceCard';
import PageHeader from '../layout/PageHeader';

export default function SourcesList() {
  const [sources, setSources] = useState<DataSource[]>(defaultDataSources);

  const handleToggle = (id: string) => {
    setSources((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        return {
          ...s,
          status: s.status === 'disconnected' ? 'connected' : 'disconnected',
        };
      })
    );
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Data Sources" subtitle="Connected feedback channels" />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sources.map((source) => (
          <SourceCard key={source.id} source={source} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  );
}
