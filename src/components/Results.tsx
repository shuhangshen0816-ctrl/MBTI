import { RadarChart } from './RadarChart';
import { AlignmentGrid } from './AlignmentGrid';
import { SharePanel } from './SharePanel';
import type { Answers, TestResults } from '../types';
import {
  MBTI_DESCRIPTIONS,
  ALIGNMENT_DESCRIPTIONS,
  ENNEAGRAM_NAMES_CLEAN,
} from '../engine/scoring';

interface ResultsProps {
  results: TestResults;
  answers: Answers | null;
  isSharedView?: boolean;
  onRestart: () => void;
  onStartOwnTest: () => void;
}

const BIG_FIVE_LABELS: Record<string, string> = {
  O: '开放性',
  C: '尽责性',
  E: '外向性',
  A: '宜人性',
  N: '神经质',
};

function profileId(mbti: string): string {
  const hash = mbti.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return `NX-${hash.toString(16).toUpperCase().padStart(4, '0')}`;
}

export function Results({ results, answers, isSharedView, onRestart, onStartOwnTest }: ResultsProps) {
  const { mbti, bigFive, enneagram, alignment, instinct } = results;
  const mbtiDesc = MBTI_DESCRIPTIONS[mbti.type] ?? '独特的神经类型组合';
  const alignDesc = ALIGNMENT_DESCRIPTIONS[alignment.alignment] ?? '';
  const id = profileId(mbti.type);

  const topBigFive = (Object.entries(bigFive) as [keyof typeof bigFive, number][])
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="results">
      {isSharedView && (
        <div className="shared-banner shared-banner--top">
          <p>◈ 你正在查看好友分享的神经档案</p>
          <button type="button" className="btn btn--primary btn--sm" onClick={onStartOwnTest}>
            ▶ 我也测一测
          </button>
        </div>
      )}

      <header className="results-header">
        <div className="results-header-inner">
          <div>
            <p className="results-tag">// SCAN COMPLETE · PROFILE {id}</p>
            <h1 className="results-title glitch" data-text="神经档案已生成">
              神经档案已生成
            </h1>
            <p className="results-sub">NEURAL PROFILE v2.077 — ALL SYSTEMS ANALYZED</p>
          </div>
          <div className="results-type-badge">
            <span className="badge-label">PRIMARY TYPE</span>
            <span className="badge-type">{mbti.type}</span>
          </div>
        </div>
      </header>

      <section className="summary-strip" aria-label="结果概览">
        <div className="summary-item summary-item--hero">
          <span className="summary-key">MBTI</span>
          <span className="summary-val summary-val--lg">{mbti.type}</span>
        </div>
        <div className="summary-item">
          <span className="summary-key">九型</span>
          <span className="summary-val">{enneagram.type}w{enneagram.wing}</span>
          <span className="summary-sub">{ENNEAGRAM_NAMES_CLEAN[enneagram.type]}</span>
        </div>
        <div className="summary-item">
          <span className="summary-key">阵营</span>
          <span className="summary-val">{alignment.nameCn}</span>
        </div>
        <div className="summary-item">
          <span className="summary-key">本能</span>
          <span className="summary-val">{instinct.primary.toUpperCase()}/{instinct.secondary.toUpperCase()}</span>
          <span className="summary-sub">{instinct.labels[instinct.primary].split(' ')[0]}</span>
        </div>
        <div className="summary-item">
          <span className="summary-key">大五峰值</span>
          <span className="summary-val">{BIG_FIVE_LABELS[topBigFive[0]]}</span>
          <span className="summary-sub">{topBigFive[1]}%</span>
        </div>
      </section>

      <div className="results-grid">
        <section className="result-card result-card--hero">
          <div className="card-corner card-corner--tl" aria-hidden="true" />
          <div className="card-corner card-corner--br" aria-hidden="true" />
          <div className="card-label">MBTI · 神经类型</div>
          <div className="hero-split">
            <div className="hero-main">
              <div className="mbti-type">{mbti.type}</div>
              <p className="mbti-desc">{mbtiDesc}</p>
            </div>
            <div className="dim-bars">
              {(['EI', 'SN', 'TF', 'JP'] as const).map((d) => {
                const dim = mbti.dimensions[d];
                const total = dim.score + 10;
                const pct = Math.min(100, (dim.score / total) * 100 + 50);
                return (
                  <div key={d} className="dim-bar">
                    <div className="dim-bar-head">
                      <span className="dim-label">{d[0]} ↔ {d[1]}</span>
                      <span className="dim-letter">{dim.letter}</span>
                    </div>
                    <div className="dim-track">
                      <div
                        className="dim-fill"
                        style={{
                          width: `${pct}%`,
                          background: dim.letter === d[0] ? 'var(--neon-cyan)' : 'var(--neon-magenta)',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="result-card">
          <div className="card-label">九型人格 · ENNEAGRAM</div>
          <div className="enneagram-display">
            <span className="enneagram-num">{enneagram.type}</span>
            <span className="enneagram-wing">w{enneagram.wing}</span>
          </div>
          <p className="enneagram-name">{ENNEAGRAM_NAMES_CLEAN[enneagram.type]}</p>
          <div className="enneagram-bars">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => {
              const scores = Object.values(enneagram.scores);
              const max = Math.max(...scores.map(Math.abs), 1);
              const raw = enneagram.scores[t];
              const pct = Math.max(5, ((raw + max) / (2 * max)) * 100);
              return (
                <div key={t} className={`e-bar ${t === enneagram.type ? 'e-bar--active' : ''}`}>
                  <span>{t}</span>
                  <div className="e-track"><div className="e-fill" style={{ height: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="result-card">
          <div className="card-label">大五人格 · BIG FIVE</div>
          <RadarChart data={bigFive} labels={BIG_FIVE_LABELS} />
          <div className="bigfive-list">
            {(['O', 'C', 'E', 'A', 'N'] as const).map((k) => (
              <div key={k} className="bf-row">
                <span>{BIG_FIVE_LABELS[k]}</span>
                <div className="bf-track">
                  <div className="bf-fill" style={{ width: `${bigFive[k]}%` }} />
                </div>
                <span className="bf-val">{bigFive[k]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="result-card">
          <div className="card-label">DnD 阵营 · ALIGNMENT</div>
          <AlignmentGrid
            lawfulChaotic={alignment.lawfulChaotic}
            goodEvil={alignment.goodEvil}
            activeAlignment={alignment.alignment}
          />
          <div className="alignment-result">
            <span className="alignment-name">{alignment.nameCn}</span>
            <span className="alignment-en">{alignment.alignment}</span>
          </div>
          <p className="alignment-desc">{alignDesc}</p>
        </section>

        <section className="result-card result-card--wide">
          <div className="card-label">本能复型 · INSTINCTUAL VARIANT</div>
          <div className="instinct-row">
            {(['sp', 'sx', 'so'] as const).map((key) => {
              const scores = instinct.scores;
              const max = Math.max(...Object.values(scores).map(Math.abs), 1);
              const pct = Math.max(10, ((scores[key] + max) / (2 * max)) * 100);
              const isPrimary = key === instinct.primary;
              const isSecondary = key === instinct.secondary;
              return (
                <div key={key} className={`instinct-block ${isPrimary ? 'instinct--primary' : ''} ${isSecondary ? 'instinct--secondary' : ''}`}>
                  <div className="instinct-label">{instinct.labels[key]}</div>
                  <div className="instinct-bar">
                    <div className="instinct-fill" style={{ width: `${pct}%` }} />
                  </div>
                  {isPrimary && <span className="instinct-badge">主型</span>}
                  {isSecondary && <span className="instinct-badge instinct-badge--sec">副型</span>}
                </div>
              );
            })}
          </div>
          <p className="instinct-summary">
            主型: {instinct.labels[instinct.primary]} · 副型: {instinct.labels[instinct.secondary]}
          </p>
        </section>
      </div>

      {answers && <SharePanel results={results} answers={answers} />}

      <footer className="results-footer">
        {!isSharedView ? (
          <button type="button" className="btn btn--ghost" onClick={onRestart}>
            ↺ 重新扫描
          </button>
        ) : (
          <button type="button" className="btn btn--ghost" onClick={onStartOwnTest}>
            ▶ 开始我的扫描
          </button>
        )}
        <p className="disclaimer">
          本测试为娱乐与自我探索用途，基于多维度心理模型估算，非临床诊断。
        </p>
      </footer>
    </div>
  );
}
