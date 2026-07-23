import { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { QUESTIONS } from './data/questions';
import { computeResults } from './engine/scoring';
import {
  setShareHash,
  clearShareHash,
  readShareFromLocation,
  readAnswersFromLocation,
} from './engine/share';
import type { Answers, AppPhase, TestResults } from './types';
import './index.css';

function App() {
  const [phase, setPhase] = useState<AppPhase>('welcome');
  const [results, setResults] = useState<TestResults | null>(null);
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [isSharedView, setIsSharedView] = useState(false);

  useEffect(() => {
    const shared = readShareFromLocation();
    if (shared) {
      setResults(shared);
      setAnswers(readAnswersFromLocation());
      setIsSharedView(true);
      setPhase('results');
    }
  }, []);

  const handleComplete = (completedAnswers: Answers) => {
    const computed = computeResults(QUESTIONS, completedAnswers);
    setAnswers(completedAnswers);
    setResults(computed);
    setIsSharedView(false);
    setPhase('results');
    setShareHash(completedAnswers);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setResults(null);
    setAnswers(null);
    setIsSharedView(false);
    clearShareHash();
    setPhase('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOwnTest = () => {
    setResults(null);
    setAnswers(null);
    setIsSharedView(false);
    clearShareHash();
    setPhase('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <div className="bg-grid" aria-hidden="true" />
      {phase === 'welcome' && <Welcome onStart={() => setPhase('quiz')} />}
      {phase === 'quiz' && <Quiz onComplete={handleComplete} />}
      {phase === 'results' && results && (
        <Results
          results={results}
          answers={answers}
          isSharedView={isSharedView}
          onRestart={handleRestart}
          onStartOwnTest={handleStartOwnTest}
        />
      )}
    </div>
  );
}

export default App;
