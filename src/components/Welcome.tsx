interface WelcomeProps {
  onStart: () => void;
}

const MODULES = [
  { id: 'mbti', code: 'NT-01', name: 'MBTI', desc: '神经类型', color: 'cyan' },
  { id: 'ocean', code: 'BF-02', name: 'OCEAN', desc: '大五人格', color: 'purple' },
  { id: 'ennea', code: 'EN-03', name: 'ENNEA', desc: '九型人格', color: 'yellow' },
  { id: 'dnd', code: 'AL-04', name: 'DnD', desc: '道德阵营', color: 'magenta' },
  { id: 'inst', code: 'IV-05', name: 'INST', desc: '本能复型', color: 'cyan' },
] as const;

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="welcome">
      <div className="hud hud--tl" aria-hidden="true" />
      <div className="hud hud--tr" aria-hidden="true" />
      <div className="hud hud--bl" aria-hidden="true" />
      <div className="hud hud--br" aria-hidden="true" />

      <div className="welcome-layout">
        <div className="welcome-hero">
          <div className="status-bar">
            <span className="status-dot" />
            <span>SYS.ONLINE</span>
            <span className="status-sep">|</span>
            <span className="status-blink">AWAITING INPUT</span>
          </div>

          <p className="welcome-tag">// NEURAL TYPE SCANNER v2.077</p>
          <h1 className="welcome-title">
            <span className="title-line">CYBER</span>
            <span className="title-line title-line--accent">PSYCHE</span>
          </h1>
          <p className="welcome-subtitle">神经类型扫描系统</p>
          <p className="welcome-lead">
            一次深度扫描，解码隐藏在神经回路中的<strong>五重人格矩阵</strong>。
            在霓虹与数据的交界处，找到你的赛博身份。
          </p>

          <div className="welcome-stats">
            <div className="stat-chip">
              <span className="stat-val">72</span>
              <span className="stat-key">扫描节点</span>
            </div>
            <div className="stat-chip">
              <span className="stat-val">~8</span>
              <span className="stat-key">分钟</span>
            </div>
            <div className="stat-chip">
              <span className="stat-val">5</span>
              <span className="stat-key">人格维度</span>
            </div>
            <div className="stat-chip stat-chip--accent">
              <span className="stat-val">0</span>
              <span className="stat-key">数据上传</span>
            </div>
          </div>

          <button type="button" className="btn btn--primary btn--hero" onClick={onStart}>
            <span className="btn-glow">▶ 启动神经扫描</span>
          </button>
          <p className="welcome-footnote">LOCAL COMPUTE · PRIVACY SHIELD ACTIVE</p>
        </div>

        <div className="welcome-modules">
          <div className="modules-header">
            <span className="card-label">分析模块 · MODULES</span>
            <span className="modules-count">05/05 READY</span>
          </div>
          <div className="module-grid">
            {MODULES.map((mod, i) => (
              <div
                key={mod.id}
                className={`module-card module-card--${mod.color}`}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className="module-code">{mod.code}</span>
                <span className="module-name">{mod.name}</span>
                <span className="module-desc">{mod.desc}</span>
                <span className="module-status">● ACTIVE</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
