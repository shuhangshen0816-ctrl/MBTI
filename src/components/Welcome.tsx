interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="welcome">
      <div className="scanlines" aria-hidden="true" />
      <div className="welcome-content">
        <p className="welcome-tag">// NEURAL TYPE SCANNER v2.077</p>
        <h1 className="welcome-title">
          <span className="title-line">CYBER</span>
          <span className="title-line title-line--accent">PSYCHE</span>
        </h1>
        <p className="welcome-subtitle">神经类型扫描系统</p>

        <div className="welcome-desc">
          <p>
            一次扫描，解码你的<strong>五重人格矩阵</strong>：
          </p>
          <ul className="system-list">
            <li><span className="sys-icon">◈</span> MBTI 神经类型</li>
            <li><span className="sys-icon">◈</span> 大五人格 OCEAN</li>
            <li><span className="sys-icon">◈</span> 九型人格 Enneagram</li>
            <li><span className="sys-icon">◈</span> DnD 道德阵营</li>
            <li><span className="sys-icon">◈</span> 本能复型 SP/SX/SO</li>
          </ul>
        </div>

        <div className="welcome-meta">
          <span>72 题</span>
          <span className="meta-sep">·</span>
          <span>约 8 分钟</span>
          <span className="meta-sep">·</span>
          <span>本地计算，数据不上传</span>
        </div>

        <button type="button" className="btn btn--primary" onClick={onStart}>
          <span className="btn-glow">▶ 启动神经扫描</span>
        </button>
      </div>

      <div className="welcome-deco" aria-hidden="true">
        <div className="hex-grid" />
      </div>
    </div>
  );
}
