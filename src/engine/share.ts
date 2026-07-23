import { QUESTIONS } from '../data/questions';
import { computeResults } from './scoring';
import type { Answers, LikertValue, TestResults } from '../types';

const SHARE_PARAM = 'share';
const VERSION = 1;

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(encoded: string): string | null {
  try {
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function encodeAnswers(answers: Answers): string {
  const payload = QUESTIONS.map((q) => String(answers[q.id] ?? 3)).join('');
  return toBase64Url(`${VERSION}:${payload}`);
}

export function decodeAnswers(token: string): Answers | null {
  const decoded = fromBase64Url(token);
  if (!decoded) return null;

  const [version, payload] = decoded.split(':');
  if (version !== String(VERSION) || !payload || payload.length !== QUESTIONS.length) {
    return null;
  }

  const answers: Answers = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const v = parseInt(payload[i], 10);
    if (v < 1 || v > 5) return null;
    answers[QUESTIONS[i].id] = v as LikertValue;
  }

  return answers;
}

export function resultsFromToken(token: string): TestResults | null {
  const answers = decodeAnswers(token);
  if (!answers) return null;
  return computeResults(QUESTIONS, answers);
}

export function buildShareUrl(answers: Answers): string {
  const token = encodeAnswers(answers);
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}#${SHARE_PARAM}=${token}`;
}

export function buildShareText(results: TestResults, url: string): string {
  const { mbti, enneagram, alignment, instinct } = results;
  return [
    '◈ 我的 CYBER PSYCHE 神经档案',
    '',
    `MBTI: ${mbti.type}`,
    `九型: ${enneagram.type}w${enneagram.wing} · ${enneagram.name}`,
    `大五: O${results.bigFive.O} C${results.bigFive.C} E${results.bigFive.E} A${results.bigFive.A} N${results.bigFive.N}`,
    `DnD阵营: ${alignment.nameCn}`,
    `本能复型: ${instinct.labels[instinct.primary]} / ${instinct.labels[instinct.secondary]}`,
    '',
    '来测测你的神经类型 →',
    url,
  ].join('\n');
}

export function setShareHash(answers: Answers): void {
  const token = encodeAnswers(answers);
  const url = `${window.location.pathname}${window.location.search}#${SHARE_PARAM}=${token}`;
  window.history.replaceState(null, '', url);
}

export function clearShareHash(): void {
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}

export function readShareFromLocation(): TestResults | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;

  const params = new URLSearchParams(hash);
  const token = params.get(SHARE_PARAM);
  if (!token) return null;

  return resultsFromToken(token);
}

export function readAnswersFromLocation(): Answers | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;

  const params = new URLSearchParams(hash);
  const token = params.get(SHARE_PARAM);
  if (!token) return null;

  return decodeAnswers(token);
}
