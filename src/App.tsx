import { useState } from 'react';
import { Welcome } from './components/Welcome';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { QUESTIONS } from './data/questions';
import { computeResults } from './engine/scoring';
import type { Answers, AppPhase, TestResults } from './types';
import './index.css';

function App() {
  const [phase, setPhase] = useState<AppPhase>('welcome');
  const [results, setResults] = useState<TestResults | null>(null);

  const handleComplete = (answers: Answers) => {
    const computed = computeResults(QUESTIONS, answers);
    setResults(computed);
    setPhase('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setResults(null);
    setPhase('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <div className="bg-grid" aria-hidden="true" />
      {phase === 'welcome' && <Welcome onStart={() => setPhase('quiz')} />}
      {phase === 'quiz' && <Quiz onComplete={handleComplete} />}
      {phase === 'results' && results && (
        <Results results={results} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
