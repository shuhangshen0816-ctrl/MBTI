import { useState } from 'react';
import type { Answers, LikertValue } from '../types';
import { QUESTIONS, LIKERT_LABELS } from '../data/questions';

interface QuizProps {
  onComplete: (answers: Answers) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const question = QUESTIONS[current];
  const progress = ((current + 1) / QUESTIONS.length) * 100;
  const selected = answers[question.id];

  const select = (value: LikertValue) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);

    if (current < QUESTIONS.length - 1) {
      setTimeout(() => setCurrent((c) => c + 1), 280);
    } else {
      setTimeout(() => onComplete(next), 400);
    }
  };

  const goBack = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  return (
    <div className="quiz">
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-meta">
          <span className="quiz-counter">
            NODE <strong>{String(current + 1).padStart(2, '0')}</strong>
            <span className="quiz-total"> / {QUESTIONS.length}</span>
          </span>
          <span className="quiz-pct">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="quiz-body" key={question.id}>
        <p className="question-text">{question.text}</p>

        <div className="likert-grid">
          {LIKERT_LABELS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={`likert-btn ${selected === value ? 'likert-btn--selected' : ''}`}
              onClick={() => select(value)}
            >
              <span className="likert-num">{value}</span>
              <span className="likert-label">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={goBack}
          disabled={current === 0}
        >
          ← 上一题
        </button>
      </div>
    </div>
  );
}
