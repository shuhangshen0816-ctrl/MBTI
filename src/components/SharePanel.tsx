import { useState, useCallback } from 'react';
import type { Answers, TestResults } from '../types';
import { buildShareUrl, buildShareText } from '../engine/share';

interface SharePanelProps {
  results: TestResults;
  answers: Answers;
}

type CopyState = 'idle' | 'link' | 'text';

export function SharePanel({ results, answers }: SharePanelProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const shareUrl = buildShareUrl(answers);
  const shareText = buildShareText(results, shareUrl);
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const flash = useCallback((state: CopyState) => {
    setCopyState(state);
    setTimeout(() => setCopyState('idle'), 2000);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      flash('link');
    } catch {
      // fallback for older browsers
      const input = document.createElement('textarea');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      flash('link');
    }
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      flash('text');
    } catch {
      flash('text');
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title: 'CYBER PSYCHE · 我的神经档案',
        text: shareText,
        url: shareUrl,
      });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        await copyLink();
      }
    }
  };

  return (
    <section className="share-panel">
      <div className="share-panel-header">
        <span className="card-label">分享神经档案 · SHARE</span>
        <p className="share-hint">链接包含完整结果，好友打开即可查看；也可自己测一遍</p>
      </div>

      <div className="share-url-box">
        <input
          className="share-url-input"
          readOnly
          value={shareUrl}
          onFocus={(e) => e.target.select()}
          aria-label="分享链接"
        />
      </div>

      <div className="share-actions">
        <button type="button" className="btn btn--primary btn--sm" onClick={copyLink}>
          {copyState === 'link' ? '✓ 链接已复制' : '⎘ 复制链接'}
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={copyText}>
          {copyState === 'text' ? '✓ 文案已复制' : '📋 复制分享文案'}
        </button>
        {canNativeShare && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={nativeShare}>
            ↗ 系统分享
          </button>
        )}
      </div>

      <div className="share-preview">
        <pre className="share-preview-text">{shareText}</pre>
      </div>
    </section>
  );
}
