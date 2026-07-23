import type { Question } from '../types';

// 72 questions — each maps to multiple personality dimensions
export const QUESTIONS: Question[] = [
  // Block 1: Social & Energy (1-12)
  { id: 1, text: '走进霓虹酒吧时，我会直接融入人群，而不是悄悄找个安静角落。', weights: { EI: 2, E: 2, so: 1.5, e7: 1 } },
  { id: 2, text: '一整天开会后，我更愿意回房间安静看书来“充电”。', weights: { EI: -2, E: -1.5, sp: 1, e5: 1.5 } },
  { id: 3, text: '在派对上，我喜欢成为众人关注的那个讲话者或表演者。', weights: { EI: 2, E: 2, sx: 1, e3: 1.5, e7: 1 } },
  { id: 4, text: '第一次见陌生人时，主动开口对我来说像迈出一大步。', weights: { EI: -2, E: -2, e5: 1, e9: 1 } },
  { id: 5, text: '我更愿意通过语音、短讯或数据交流，而不是面对面谈话。', weights: { EI: -1.5, E: -1.5, e5: 1.5, N: -0.5 } },
  { id: 6, text: '在团队项目里，我通常主动整理时间表、安排讨论流程。', weights: { EI: 1.5, E: 1.5, so: 2, e2: 1, e3: 1, JP: 1 } },
  { id: 7, text: '我更喜欢和一个朋友深聊，而不是参加大型社交聚会。', weights: { EI: -1, sx: 2, e4: 1.5, e2: 1 } },
  { id: 8, text: '面对新的社交场合，我是感到好奇兴奋，而不是紧张害怕。', weights: { EI: 2, E: 2, O: 1, e7: 1.5, N: -1 } },
  { id: 9, text: '我更愿意独自完成黑客任务，而不是过分依赖队友。', weights: { EI: -1.5, e5: 2, sp: 1, A: -0.5 } },
  { id: 10, text: '我会主动组织线上聚会、读书会或小型社群活动。', weights: { EI: 1.5, so: 2, e2: 1.5, e7: 1, GE: 1 } },
  { id: 11, text: '嘈杂的咖啡馆或派对会很快耗尽我的精力。', weights: { EI: -2, N: 1, sp: 1.5, e4: 1 } },
  { id: 12, text: '我常通过和别人讨论来获取新的灵感和信息。', weights: { EI: 2, SN: -1, O: 1, so: 1, e7: 1 } },

  // Block 2: Perception & Intuition (13-24)
  { id: 13, text: '在评估方案时，我更相信实际数据，而不是直觉预感。', weights: { SN: 2, O: -1, e6: 1, TF: 1 } },
  { id: 14, text: '我能从零散信息中看出隐藏的趋势和模式。', weights: { SN: -2, O: 2, e5: 1, e4: 1, N: 1 } },
  { id: 15, text: '比起解决眼前问题，我更喜欢讨论未来可能会发生的变化。', weights: { SN: -2, O: 2, e7: 1.5, JP: -1 } },
  { id: 16, text: '我习惯先把每一个具体步骤写清楚，再开始执行。', weights: { SN: 2, C: 1.5, e1: 1, JP: 1.5 } },
  { id: 17, text: '抽象概念和隐喻比实际操作更能吸引我。', weights: { SN: -2, O: 2, e4: 1.5, e5: 1 } },
  { id: 18, text: '我倾向于用已验证的方法，而不是马上尝试全新方案。', weights: { SN: 2, O: -1, C: 1, e6: 1.5, LC: 1 } },
  { id: 19, text: '我经常想象未来技术变革后城市生活的样子。', weights: { SN: -2, O: 2, e7: 1, GE: 0.5 } },
  { id: 20, text: '在学习新技能时，我更喜欢先动手实践，而不是先读理论。', weights: { SN: 2, C: 1, e8: 1, sp: 1 } },
  { id: 21, text: '我容易注意到别人忽略的暗示或符号。', weights: { SN: -2, O: 1.5, e4: 2, N: 1 } },
  { id: 22, text: '我更喜欢处理有明确目标和可量化结果的任务。', weights: { SN: 2, C: 1.5, TF: 1, JP: 1 } },
  { id: 23, text: '我喜欢思考“如果这样会怎样”这类假设性情景。', weights: { SN: -2, O: 2, e7: 1, e5: 1 } },
  { id: 24, text: '我更依赖现实体验和即时反馈来决定下一步。', weights: { SN: 2, sp: 1, e8: 1, JP: -0.5 } },

  // Block 3: Thinking & Feeling (25-36)
  { id: 25, text: '做决策时，我会先看逻辑和数据，而不是凭感觉。', weights: { TF: 2, A: -1, e5: 1, e1: 0.5 } },
  { id: 26, text: '我会优先考虑这个决定是否会伤害到他人情绪。', weights: { TF: -2, A: 2, e2: 1.5, GE: 1.5 } },
  { id: 27, text: '在我看来，公平就是按照相同规则对待每个人。', weights: { TF: 2, e1: 1.5, LC: 1, GE: 0.5 } },
  { id: 28, text: '和谐关系比在争论中赢更重要。', weights: { TF: -2, A: 2, e9: 1.5, e2: 1 } },
  { id: 29, text: '遇到冲突时，我能保持客观，不让情绪掌控我。', weights: { TF: 2, N: -1, e5: 1, e8: 0.5 } },
  { id: 30, text: '看到别人受伤或难过，我会很自然地感同身受。', weights: { TF: -2, A: 2, e2: 2, GE: 1.5, N: 1 } },
  { id: 31, text: '我觉得给别人反馈时，直接清晰比委婉更好。', weights: { TF: 2, A: -1.5, e8: 1, LC: 0.5 } },
  { id: 32, text: '我更看重一个方案是否符合我的价值观，而不是是否完全合理。', weights: { TF: -2, O: 1, e4: 1.5, GE: 1 } },
  { id: 33, text: '在工作中，我最看重方案是否高效、可执行。', weights: { TF: 2, C: 1, e3: 1.5, LC: 0.5 } },
  { id: 34, text: '即使没有回报，我也会为弱势者发声。', weights: { TF: -2, GE: 2, e2: 1, e8: 0.5 } },
  { id: 35, text: '我觉得过度表达情绪会显得不够坚强。', weights: { TF: 2, A: -2, e8: 1.5, GE: -1 } },
  { id: 36, text: '我更想知道事情背后的原因，而不是仅仅知道是什么发生了。', weights: { TF: -1, O: 1.5, e4: 1.5, SN: -1 } },

  // Block 4: Judging & Perceiving (37-48)
  { id: 37, text: '我更喜欢提前安排工作并按时间表执行。', weights: { JP: 2, C: 2, LC: 1.5, e1: 1, sp: 1 } },
  { id: 38, text: '在需要临场应对的场景中，我会感觉更有活力。', weights: { JP: -2, O: 1.5, e7: 1.5, LC: -1.5 } },
  { id: 39, text: '未完成的待办事项会让我心里不安。', weights: { JP: 2, C: 2, N: 1, e1: 1.5, sp: 1 } },
  { id: 40, text: '我喜欢保持选项开放，最后一刻再决定。', weights: { JP: -2, O: 1, e7: 2, LC: -1 } },
  { id: 41, text: '我的桌面和文件夹通常保持很整齐。', weights: { JP: 2, C: 2, e1: 1.5, LC: 1 } },
  { id: 42, text: '我觉得很多规则会扼杀创造力和自发性。', weights: { JP: -2, O: 2, LC: -2, e4: 1, e7: 1 } },
  { id: 43, text: '我倾向于快速决定并马上开始执行。', weights: { JP: 2, C: 1, e3: 1, e8: 1, TF: 1 } },
  { id: 44, text: '对我来说，探索多种可能性比尽快结论更重要。', weights: { JP: -2, O: 2, SN: -1, e7: 1.5 } },
  { id: 45, text: '我把截止日期当作必须遵守的承诺。', weights: { JP: 2, C: 2, LC: 2, e1: 1.5, GE: 0.5 } },
  { id: 46, text: '我经常在最后一刻冲刺完成工作，但最后结果仍然不错。', weights: { JP: -2, C: -1, e7: 1, N: -0.5 } },
  { id: 47, text: '长期目标比眼前的享乐更能驱动我。', weights: { JP: 2, C: 2, e3: 1.5, sp: 1.5 } },
  { id: 48, text: '我认为生活需要一些变化和不确定性来保持新鲜感。', weights: { JP: -2, O: 2, e7: 1.5, sx: 1, LC: -1.5 } },

  // Block 5: Morality & Alignment (49-60)
  { id: 49, text: '即使规则看起来不合理，我也会先遵守再寻找改进方式。', weights: { LC: 2, GE: 0.5, JP: 1, e1: 1.5, e6: 1 } },
  { id: 50, text: '为了更大的善，我愿意打破某些常规做法。', weights: { LC: -2, GE: 2, e7: 1, e8: 0.5 } },
  { id: 51, text: '如果系统漏洞能带来优势，我会考虑利用它。', weights: { GE: -1.5, LC: -1, e3: 1, e7: 1, A: -1 } },
  { id: 52, text: '看到不公平时，我很难选择袖手旁观。', weights: { GE: 2, e8: 1.5, e1: 1, e2: 1, TF: -1 } },
  { id: 53, text: '我认为权力应该用来维护秩序和稳定。', weights: { LC: 2, GE: 0.5, e8: 1.5, e1: 1, JP: 1 } },
  { id: 54, text: '我喜欢挑战权威，尝试改变现有结构。', weights: { LC: -2, O: 1.5, e8: 1.5, e4: 1, GE: -0.5 } },
  { id: 55, text: '帮助别人让我觉得自己活得有价值，即使没有回报。', weights: { GE: 2, e2: 2, A: 2, TF: -1.5 } },
  { id: 56, text: '在资源有限时，我会优先保障自己的生存安全。', weights: { GE: -2, sp: 2, e6: 1, A: -1.5 } },
  { id: 57, text: '我觉得在某些情况下复仇是一种正义回应。', weights: { GE: -2, LC: -1, e8: 2, A: -2 } },
  { id: 58, text: '我更注重结果是否达成，而不是用了什么手段。', weights: { GE: -1.5, TF: 2, e3: 2, LC: -1 } },
  { id: 59, text: '我认为混乱里常常隐藏着创造新秩序的机会。', weights: { LC: -2, O: 2, e7: 1.5, e8: 1, GE: -0.5 } },
  { id: 60, text: '我愿意牺牲个人利益来维护团队或社群的整体福祉。', weights: { GE: 2, so: 2, e2: 1.5, e9: 1, A: 2 } },

  // Block 6: Instinct & Deep Traits (61-72)
  { id: 61, text: '没有足够存款和后备资源会让我感到不安。', weights: { sp: 2, N: 1.5, e6: 1.5, C: 1 } },
  { id: 62, text: '我认为与某人建立深刻亲密关系比事业成就更重要。', weights: { sx: 2, e2: 1.5, e4: 2, TF: -1.5 } },
  { id: 63, text: '我会为在团队中的地位和认可付出努力。', weights: { so: 2, e3: 2, E: 1, e2: 0.5 } },
  { id: 64, text: '我更在乎饮食、运动和日常舒适，而不是抽象理想。', weights: { sp: 2, SN: 1, e9: 1, O: -1 } },
  { id: 65, text: '我希望生活充满强烈的情感体验和激情瞬间。', weights: { sx: 2, O: 1.5, e4: 2, e7: 1, N: 1 } },
  { id: 66, text: '我很容易看出团队里的权力关系和社交动态。', weights: { so: 2, E: 1.5, e3: 1, e2: 1, e8: 0.5 } },
  { id: 67, text: '囤积信息、物资或技能让我觉得更有安全感。', weights: { sp: 2, e5: 1.5, e6: 1.5, C: 1 } },
  { id: 68, text: '我愿意为所爱的人做出极大的牺牲。', weights: { sx: 2, e2: 2, GE: 1.5, A: 2, TF: -2 } },
  { id: 69, text: '参加集体运动或公共项目让我感到充实。', weights: { so: 2, GE: 1, e2: 1, e7: 1, E: 1 } },
  { id: 70, text: '关于未来不确定性，我常常感到难以入睡。', weights: { N: 2, e6: 2, sp: 1, SN: -0.5 } },
  { id: 71, text: '我对艺术、哲学和非传统思想有特别强的兴趣。', weights: { O: 2, SN: -1.5, e4: 2, e5: 1, JP: -1 } },
  { id: 72, text: '完成任务后的成就感是我继续前进的最大动力。', weights: { C: 2, e3: 2, JP: 2, e1: 1, sp: 0.5 } },
];

export const LIKERT_LABELS = [
  { value: 1 as const, label: '完全不同意', short: '1' },
  { value: 2 as const, label: '不同意', short: '2' },
  { value: 3 as const, label: '中立', short: '3' },
  { value: 4 as const, label: '同意', short: '4' },
  { value: 5 as const, label: '完全同意', short: '5' },
];
