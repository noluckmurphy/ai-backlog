import { useState } from 'react';
import { ActiveView } from './types';
import Sidebar from './components/layout/Sidebar';
import FeedbackFeed from './components/feedback/FeedbackFeed';
import SentimentDashboard from './components/sentiment/SentimentDashboard';
import SuggestedItemsList from './components/backlog/SuggestedItemsList';
import RulesList from './components/rules/RulesList';
import SourcesList from './components/sources/SourcesList';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('feedback');

  const renderView = () => {
    switch (activeView) {
      case 'feedback': return <FeedbackFeed />;
      case 'sentiment': return <SentimentDashboard />;
      case 'backlog': return <SuggestedItemsList />;
      case 'rules': return <RulesList />;
      case 'sources': return <SourcesList />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
