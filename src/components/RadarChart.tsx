import type { BigFiveResult } from '../types';

interface RadarChartProps {
  data: BigFiveResult;
  labels: Record<string, string>;
}

const KEYS = ['O', 'C', 'E', 'A', 'N'] as const;
const CX = 120;
const CY = 120;
const R = 90;

function polar(i: number, total: number, radius: number) {
  const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

export function RadarChart({ data, labels }: RadarChartProps) {
  const gridLevels = [25, 50, 75, 100];

  const gridPolygons = gridLevels.map((level) => {
    const pts = KEYS.map((_, i) => {
      const p = polar(i, KEYS.length, (R * level) / 100);
      return `${p.x},${p.y}`;
    });
    return pts.join(' ');
  });

  const dataPoints = KEYS.map((k, i) => {
    const p = polar(i, KEYS.length, (R * data[k]) / 100);
    return `${p.x},${p.y}`;
  }).join(' ');

  const axisLines = KEYS.map((_, i) => {
    const p = polar(i, KEYS.length, R);
    return { x1: CX, y1: CY, x2: p.x, y2: p.y };
  });

  const labelPositions = KEYS.map((k, i) => {
    const p = polar(i, KEYS.length, R + 22);
    return { ...p, label: labels[k] ?? k };
  });

  return (
    <svg viewBox="0 0 240 240" className="radar-chart" aria-hidden="true">
      {gridPolygons.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(0, 255, 255, 0.15)"
          strokeWidth="1"
        />
      ))}
      {axisLines.map((line, i) => (
        <line
          key={i}
          {...line}
          stroke="rgba(0, 255, 255, 0.2)"
          strokeWidth="1"
        />
      ))}
      <polygon
        points={dataPoints}
        fill="rgba(255, 0, 128, 0.25)"
        stroke="var(--neon-magenta)"
        strokeWidth="2"
      />
      {KEYS.map((k, i) => {
        const p = polar(i, KEYS.length, (R * data[k]) / 100);
        return <circle key={k} cx={p.x} cy={p.y} r="4" fill="var(--neon-cyan)" />;
      })}
      {labelPositions.map(({ x, y, label }) => (
        <text
          key={label}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="radar-label"
          fontSize="10"
          fill="var(--text-dim)"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
