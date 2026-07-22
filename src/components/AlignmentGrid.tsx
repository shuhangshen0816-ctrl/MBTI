const ALIGNMENTS = [
  ['Lawful Good', 'Neutral Good', 'Chaotic Good'],
  ['Lawful Neutral', 'True Neutral', 'Chaotic Neutral'],
  ['Lawful Evil', 'Neutral Evil', 'Chaotic Evil'],
];

const ALIGNMENT_CN: Record<string, string> = {
  'Lawful Good': '守序善良',
  'Neutral Good': '中立善良',
  'Chaotic Good': '混乱善良',
  'Lawful Neutral': '守序中立',
  'True Neutral': '绝对中立',
  'Chaotic Neutral': '混乱中立',
  'Lawful Evil': '守序邪恶',
  'Neutral Evil': '中立邪恶',
  'Chaotic Evil': '混乱邪恶',
};

interface AlignmentGridProps {
  lawfulChaotic: number;
  goodEvil: number;
  activeAlignment: string;
}

export function AlignmentGrid({ activeAlignment }: AlignmentGridProps) {
  return (
    <div className="alignment-grid">
      <div className="alignment-axis-y">善良 ↑</div>
      <div className="alignment-matrix">
        {ALIGNMENTS.map((row, ri) => (
          <div key={ri} className="alignment-row">
            {row.map((cell) => (
              <div
                key={cell}
                className={`alignment-cell ${cell === activeAlignment ? 'alignment-cell--active' : ''}`}
              >
                <span className="cell-cn">{ALIGNMENT_CN[cell]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="alignment-axis-x">守序 ← → 混乱</div>
    </div>
  );
}
