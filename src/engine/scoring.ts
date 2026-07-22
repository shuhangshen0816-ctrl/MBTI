import type {
  Answers,
  AlignmentResult,
  BigFiveResult,
  EnneagramResult,
  InstinctResult,
  MBTIResult,
  Question,
  TestResults,
} from '../types';

const ENNEAGRAM_NAMES_CLEAN: Record<number, string> = {
  1: '完美主义者',
  2: '助人者',
  3: '成就者',
  4: '个体主义者',
  5: '调查者',
  6: '忠诚者',
  7: '热情者',
  8: '挑战者',
  9: '和平者',
};

const ALIGNMENT_MAP: Record<string, { nameCn: string }> = {
  'Lawful Good': { nameCn: '守序善良' },
  'Neutral Good': { nameCn: '中立善良' },
  'Chaotic Good': { nameCn: '混乱善良' },
  'Lawful Neutral': { nameCn: '守序中立' },
  'True Neutral': { nameCn: '绝对中立' },
  'Chaotic Neutral': { nameCn: '混乱中立' },
  'Lawful Evil': { nameCn: '守序邪恶' },
  'Neutral Evil': { nameCn: '中立邪恶' },
  'Chaotic Evil': { nameCn: '混乱邪恶' },
};

function likertDelta(value: number, weight: number): number {
  return (value - 3) * weight;
}

function initScores(): Record<string, number> {
  return {
    EI: 0, SN: 0, TF: 0, JP: 0,
    O: 0, C: 0, E: 0, A: 0, N: 0,
    e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0, e7: 0, e8: 0, e9: 0,
    LC: 0, GE: 0,
    sp: 0, sx: 0, so: 0,
  };
}

function accumulateScores(questions: Question[], answers: Answers): Record<string, number> {
  const scores = initScores();

  for (const q of questions) {
    const answer = answers[q.id];
    if (!answer) continue;

    for (const [key, weight] of Object.entries(q.weights)) {
      if (weight !== undefined) {
        scores[key] = (scores[key] ?? 0) + likertDelta(answer, weight);
      }
    }
  }

  return scores;
}

function scoreMBTI(scores: Record<string, number>): MBTIResult {
  const pick = (key: string, pos: string, neg: string) => {
    const s = scores[key] ?? 0;
    return { letter: s >= 0 ? pos : neg, score: Math.abs(s) };
  };

  const dimensions: MBTIResult['dimensions'] = {
    EI: pick('EI', 'E', 'I') as MBTIResult['dimensions']['EI'],
    SN: pick('SN', 'S', 'N') as MBTIResult['dimensions']['SN'],
    TF: pick('TF', 'T', 'F') as MBTIResult['dimensions']['TF'],
    JP: pick('JP', 'J', 'P') as MBTIResult['dimensions']['JP'],
  };

  return {
    type: `${dimensions.EI.letter}${dimensions.SN.letter}${dimensions.TF.letter}${dimensions.JP.letter}`,
    dimensions,
  };
}

function scoreBigFive(scores: Record<string, number>, questionCount: number): BigFiveResult {
  const normalize = (key: string) => {
    const raw = scores[key] ?? 0;
    const maxPossible = questionCount * 2 * 2;
    const pct = 50 + (raw / Math.max(maxPossible * 0.15, 1)) * 50;
    return Math.round(Math.min(100, Math.max(0, pct)));
  };

  return {
    O: normalize('O'),
    C: normalize('C'),
    E: normalize('E'),
    A: normalize('A'),
    N: normalize('N'),
  };
}

function scoreEnneagram(scores: Record<string, number>): EnneagramResult {
  const typeScores: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) {
    typeScores[i] = scores[`e${i}`] ?? 0;
  }

  const sorted = Object.entries(typeScores)
    .map(([t, s]) => ({ type: Number(t), score: s }))
    .sort((a, b) => b.score - a.score);

  const primary = sorted[0].type;
  const adjacent = [primary === 1 ? 9 : primary - 1, primary === 9 ? 1 : primary + 1];
  const wing = adjacent.reduce((best, t) =>
    typeScores[t] > typeScores[best] ? t : best
  , adjacent[0]);

  return {
    type: primary,
    wing,
    scores: typeScores,
    name: ENNEAGRAM_NAMES_CLEAN[primary],
  };
}

function scoreAlignment(scores: Record<string, number>): AlignmentResult {
  const lc = scores.LC ?? 0;
  const ge = scores.GE ?? 0;

  const lcLabel = lc > 8 ? 'Lawful' : lc < -8 ? 'Chaotic' : 'Neutral';
  const geLabel = ge > 8 ? 'Good' : ge < -8 ? 'Evil' : 'Neutral';

  let alignment: string;
  if (lcLabel === 'Neutral' && geLabel === 'Neutral') {
    alignment = 'True Neutral';
  } else {
    alignment = `${lcLabel} ${geLabel}`;
  }

  return {
    alignment,
    nameCn: ALIGNMENT_MAP[alignment]?.nameCn ?? alignment,
    lawfulChaotic: lc,
    goodEvil: ge,
  };
}

function scoreInstinct(scores: Record<string, number>): InstinctResult {
  const raw = { sp: scores.sp ?? 0, sx: scores.sx ?? 0, so: scores.so ?? 0 };
  const sorted = (Object.entries(raw) as [keyof typeof raw, number][])
    .sort((a, b) => b[1] - a[1]);

  return {
    primary: sorted[0][0],
    secondary: sorted[1][0],
    scores: raw,
    labels: { sp: '自保型 (SP)', sx: '一对一型 (SX)', so: '社交型 (SO)' },
  };
}

export function computeResults(questions: Question[], answers: Answers): TestResults {
  const scores = accumulateScores(questions, answers);
  const answeredCount = Object.keys(answers).length;

  return {
    mbti: scoreMBTI(scores),
    bigFive: scoreBigFive(scores, answeredCount),
    enneagram: scoreEnneagram(scores),
    alignment: scoreAlignment(scores),
    instinct: scoreInstinct(scores),
  };
}

export const MBTI_DESCRIPTIONS: Record<string, string> = {
  INTJ: '架构师 — 在数据废墟中构建未来蓝图的战略黑客',
  INTP: '逻辑学家 — 沉迷于解构一切系统的赛博哲思者',
  ENTJ: '指挥官 — 以绝对效率接管霓虹都市的领袖',
  ENTP: '辩论家 — 在规则边缘游走的创新破坏者',
  INFJ: '提倡者 — 看透人性代码的隐秘先知',
  INFP: '调停者 — 在机械世界中守护理想的浪漫主义者',
  ENFJ: '主人公 — 用魅力连接散落节点的网络核心',
  ENFP: '竞选者 — 点燃集体意识的自由火花',
  ISTJ: '物流师 — 维护系统稳定运行的可靠协议',
  ISFJ: '守卫者 — 在混乱中守护弱者的沉默护盾',
  ESTJ: '总经理 — 用铁律管理赛博帝国的执行者',
  ESFJ: '执政官 — 维系社群纽带的温暖节点',
  ISTP: '鉴赏家 — 精通一切机械的天才技师',
  ISFP: '探险家 — 在霓虹光影中寻找美的流浪艺术家',
  ESTP: '企业家 — 在危险边缘获取最大收益的行动派',
  ESFP: '表演者 — 用生命力点亮暗巷的街头明星',
};

export const ALIGNMENT_DESCRIPTIONS: Record<string, string> = {
  'Lawful Good': '你遵循协议行事，但核心驱动是保护弱者 — 赛博世界的白帽黑客',
  'Neutral Good': '灵活应变，目标始终是更大的善 — 游侠式的正义执行者',
  'Chaotic Good': '打破规则以达成正义 — 反抗公司暴政的自由斗士',
  'Lawful Neutral': '秩序即正义，规则高于一切 — 冷酷但可靠的安全协议',
  'True Neutral': '保持平衡，不偏不倚 — 在各方势力间游走的中立AI',
  'Chaotic Neutral': '自由至上，拒绝一切束缚 — 不可预测的混沌变量',
  'Lawful Evil': '利用规则达成私欲 — 精通法律的 corporate 操控者',
  'Neutral Evil': '纯粹利己，手段不限 — 冷血的赏金猎人',
  'Chaotic Evil': '以混乱为乐，毁灭即目的 — 释放病毒的终极威胁',
};

export { ENNEAGRAM_NAMES_CLEAN };
