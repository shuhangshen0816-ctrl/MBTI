import type { Question } from '../types';

// 72 questions — each maps to multiple personality dimensions
export const QUESTIONS: Question[] = [
  // Block 1: Social & Energy (1-12)
  { id: 1, text: '在霓虹酒吧里，我更容易走向人群而非独自坐在角落。', weights: { EI: 2, E: 2, so: 1.5, e7: 1 } },
  { id: 2, text: '长时间社交后，我需要独处来「充电」。', weights: { EI: -2, E: -1.5, sp: 1, e5: 1.5 } },
  { id: 3, text: '我享受成为派对或聚会的焦点。', weights: { EI: 2, E: 2, sx: 1, e3: 1.5, e7: 1 } },
  { id: 4, text: '在陌生人面前开口对我来说很困难。', weights: { EI: -2, E: -2, e5: 1, e9: 1 } },
  { id: 5, text: '我更愿意通过文字/数据链交流，而非面对面。', weights: { EI: -1.5, E: -1.5, e5: 1.5, N: -0.5 } },
  { id: 6, text: '团队任务中，我自然承担协调者的角色。', weights: { EI: 1.5, E: 1.5, so: 2, e2: 1, e3: 1, JP: 1 } },
  { id: 7, text: '我更喜欢一对一的深度连接，而非大型社交。', weights: { EI: -1, sx: 2, e4: 1.5, e2: 1 } },
  { id: 8, text: '新的社交场合让我兴奋而非焦虑。', weights: { EI: 2, E: 2, O: 1, e7: 1.5, N: -1 } },
  { id: 9, text: '我宁可独自完成黑客任务，也不想依赖队友。', weights: { EI: -1.5, e5: 2, sp: 1, A: -0.5 } },
  { id: 10, text: '我会主动组织线下或线上的社群活动。', weights: { EI: 1.5, so: 2, e2: 1.5, e7: 1, GE: 1 } },
  { id: 11, text: '嘈杂的环境会快速耗尽我的精力。', weights: { EI: -2, N: 1, sp: 1.5, e4: 1 } },
  { id: 12, text: '我通过与他人互动来获取信息和灵感。', weights: { EI: 2, SN: -1, O: 1, so: 1, e7: 1 } },

  // Block 2: Perception & Intuition (13-24)
  { id: 13, text: '我更相信亲眼所见的证据，而非直觉预感。', weights: { SN: 2, O: -1, e6: 1, TF: 1 } },
  { id: 14, text: '我能从碎片数据中感知到隐藏的模式和趋势。', weights: { SN: -2, O: 2, e5: 1, e4: 1, N: 1 } },
  { id: 15, text: '讨论未来可能性比解决眼前问题更让我兴奋。', weights: { SN: -2, O: 2, e7: 1.5, JP: -1 } },
  { id: 16, text: '我注重细节和具体步骤，而非宏观愿景。', weights: { SN: 2, C: 1.5, e1: 1, JP: 1.5 } },
  { id: 17, text: '抽象概念和隐喻比实际操作更吸引我。', weights: { SN: -2, O: 2, e4: 1.5, e5: 1 } },
  { id: 18, text: '我倾向于用已验证的方法，而非实验新方案。', weights: { SN: 2, O: -1, C: 1, e6: 1.5, LC: 1 } },
  { id: 19, text: '我经常想象技术革新后的世界样貌。', weights: { SN: -2, O: 2, e7: 1, GE: 0.5 } },
  { id: 20, text: '实际操作和动手实践是我学习的主要方式。', weights: { SN: 2, C: 1, e8: 1, sp: 1 } },
  { id: 21, text: '我会注意到别人忽略的符号和隐藏含义。', weights: { SN: -2, O: 1.5, e4: 2, N: 1 } },
  { id: 22, text: '我更喜欢处理具体、可量化的任务。', weights: { SN: 2, C: 1.5, TF: 1, JP: 1 } },
  { id: 23, text: '「如果……会怎样」这类假设性问题让我着迷。', weights: { SN: -2, O: 2, e7: 1, e5: 1 } },
  { id: 24, text: '我依赖感官体验和即时反馈来做判断。', weights: { SN: 2, sp: 1, e8: 1, JP: -0.5 } },

  // Block 3: Thinking & Feeling (25-36)
  { id: 25, text: '做决策时，逻辑和数据比感受更重要。', weights: { TF: 2, A: -1, e5: 1, e1: 0.5 } },
  { id: 26, text: '我会优先考虑决策对他人的情感影响。', weights: { TF: -2, A: 2, e2: 1.5, GE: 1.5 } },
  { id: 27, text: '公平意味着一视同仁，而非特殊照顾。', weights: { TF: 2, e1: 1.5, LC: 1, GE: 0.5 } },
  { id: 28, text: '和谐的关系比赢得争论更重要。', weights: { TF: -2, A: 2, e9: 1.5, e2: 1 } },
  { id: 29, text: '我能在冲突中保持客观，不被情绪左右。', weights: { TF: 2, N: -1, e5: 1, e8: 0.5 } },
  { id: 30, text: '看到他人痛苦时，我会感同身受。', weights: { TF: -2, A: 2, e2: 2, GE: 1.5, N: 1 } },
  { id: 31, text: '批评应该直接、清晰，即使可能伤人。', weights: { TF: 2, A: -1.5, e8: 1, LC: 0.5 } },
  { id: 32, text: '我重视价值观一致，胜过逻辑完美。', weights: { TF: -2, O: 1, e4: 1.5, GE: 1 } },
  { id: 33, text: '效率是评价方案的首要标准。', weights: { TF: 2, C: 1, e3: 1.5, LC: 0.5 } },
  { id: 34, text: '我会为弱者发声，即使这对我没有好处。', weights: { TF: -2, GE: 2, e2: 1, e8: 0.5 } },
  { id: 35, text: '情感表达是软弱的表现，应当克制。', weights: { TF: 2, A: -2, e8: 1.5, GE: -1 } },
  { id: 36, text: '理解「为什么」比知道「是什么」更重要。', weights: { TF: -1, O: 1.5, e4: 1.5, SN: -1 } },

  // Block 4: Judging & Perceiving (37-48)
  { id: 37, text: '我喜欢提前规划，按时间表执行任务。', weights: { JP: 2, C: 2, LC: 1.5, e1: 1, sp: 1 } },
  { id: 38, text: '即兴发挥和灵活应变让我更有活力。', weights: { JP: -2, O: 1.5, e7: 1.5, LC: -1.5 } },
  { id: 39, text: '未完成的待办事项会让我焦虑。', weights: { JP: 2, C: 2, N: 1, e1: 1.5, sp: 1 } },
  { id: 40, text: '我享受保持选项开放，最后一刻再决定。', weights: { JP: -2, O: 1, e7: 2, LC: -1 } },
  { id: 41, text: '我的数字空间（桌面/文件夹）通常井然有序。', weights: { JP: 2, C: 2, e1: 1.5, LC: 1 } },
  { id: 42, text: '严格的规则会扼杀创造力和自发性。', weights: { JP: -2, O: 2, LC: -2, e4: 1, e7: 1 } },
  { id: 43, text: '我倾向于快速做决定并付诸行动。', weights: { JP: 2, C: 1, e3: 1, e8: 1, TF: 1 } },
  { id: 44, text: '探索多种可能性比尽快得出结论更重要。', weights: { JP: -2, O: 2, SN: -1, e7: 1.5 } },
  { id: 45, text: '截止日期是神圣不可侵犯的。', weights: { JP: 2, C: 2, LC: 2, e1: 1.5, GE: 0.5 } },
  { id: 46, text: '我经常在最后一刻才完成工作，但质量不差。', weights: { JP: -2, C: -1, e7: 1, N: -0.5 } },
  { id: 47, text: '长期目标比短期享乐更能驱动我。', weights: { JP: 2, C: 2, e3: 1.5, sp: 1.5 } },
  { id: 48, text: '变化和不确定性是生活的调味剂。', weights: { JP: -2, O: 2, e7: 1.5, sx: 1, LC: -1.5 } },

  // Block 5: Morality & Alignment (49-60)
  { id: 49, text: '即使规则不合理，我也倾向于先遵守再寻求改变。', weights: { LC: 2, GE: 0.5, JP: 1, e1: 1.5, e6: 1 } },
  { id: 50, text: '为了更大的善，我愿意打破某些规则。', weights: { LC: -2, GE: 2, e7: 1, e8: 0.5 } },
  { id: 51, text: '我会利用系统漏洞为自己谋利，只要不直接伤人。', weights: { GE: -1.5, LC: -1, e3: 1, e7: 1, A: -1 } },
  { id: 52, text: '看到不公正时，我无法袖手旁观。', weights: { GE: 2, e8: 1.5, e1: 1, e2: 1, TF: -1 } },
  { id: 53, text: '权力应该被用来保护秩序和稳定。', weights: { LC: 2, GE: 0.5, e8: 1.5, e1: 1, JP: 1 } },
  { id: 54, text: '我享受挑战权威和颠覆现有结构。', weights: { LC: -2, O: 1.5, e8: 1.5, e4: 1, GE: -0.5 } },
  { id: 55, text: '帮助他人是我的内在驱动力，即使没有回报。', weights: { GE: 2, e2: 2, A: 2, TF: -1.5 } },
  { id: 56, text: '在资源有限时，我会优先保障自己的生存。', weights: { GE: -2, sp: 2, e6: 1, A: -1.5 } },
  { id: 57, text: '复仇是正义的一种形式。', weights: { GE: -2, LC: -1, e8: 2, A: -2 } },
  { id: 58, text: '我信奉「手段不重要，结果才重要」。', weights: { GE: -1.5, TF: 2, e3: 2, LC: -1 } },
  { id: 59, text: '混乱中蕴藏着创造新秩序的机会。', weights: { LC: -2, O: 2, e7: 1.5, e8: 1, GE: -0.5 } },
  { id: 60, text: '我会牺牲个人利益来维护社群的整体福祉。', weights: { GE: 2, so: 2, e2: 1.5, e9: 1, A: 2 } },

  // Block 6: Instinct & Deep Traits (61-72)
  { id: 61, text: '财务安全感和物质保障是我最大的焦虑来源。', weights: { sp: 2, N: 1.5, e6: 1.5, C: 1 } },
  { id: 62, text: '一段深刻的亲密关系比任何成就都重要。', weights: { sx: 2, e2: 1.5, e4: 2, TF: -1.5 } },
  { id: 63, text: '我在群体中的地位和认可度驱动着我的行为。', weights: { so: 2, e3: 2, E: 1, e2: 0.5 } },
  { id: 64, text: '我关注身体健康和日常舒适，胜过精神追求。', weights: { sp: 2, SN: 1, e9: 1, O: -1 } },
  { id: 65, text: '强烈的情感体验和激情是我生活的核心。', weights: { sx: 2, O: 1.5, e4: 2, e7: 1, N: 1 } },
  { id: 66, text: '我天然理解社交动态和群体层级。', weights: { so: 2, E: 1.5, e3: 1, e2: 1, e8: 0.5 } },
  { id: 67, text: '囤积资源（信息、物资、技能）让我有安全感。', weights: { sp: 2, e5: 1.5, e6: 1.5, C: 1 } },
  { id: 68, text: '我会为所爱之人做出极端牺牲。', weights: { sx: 2, e2: 2, GE: 1.5, A: 2, TF: -2 } },
  { id: 69, text: '参与集体运动和公共事务让我感到充实。', weights: { so: 2, GE: 1, e2: 1, e7: 1, E: 1 } },
  { id: 70, text: '我容易因未来的不确定性而失眠焦虑。', weights: { N: 2, e6: 2, sp: 1, SN: -0.5 } },
  { id: 71, text: '我对艺术、哲学和非传统思想有强烈兴趣。', weights: { O: 2, SN: -1.5, e4: 2, e5: 1, JP: -1 } },
  { id: 72, text: '完成任务后的成就感是我最大的动力来源。', weights: { C: 2, e3: 2, JP: 2, e1: 1, sp: 0.5 } },
];

export const LIKERT_LABELS = [
  { value: 1 as const, label: '完全不同意', short: '1' },
  { value: 2 as const, label: '不同意', short: '2' },
  { value: 3 as const, label: '中立', short: '3' },
  { value: 4 as const, label: '同意', short: '4' },
  { value: 5 as const, label: '完全同意', short: '5' },
];
