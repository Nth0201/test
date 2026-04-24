import styles from './SummaryBanner.module.css';

export function SummaryBanner({ batches, totalHeads, totalCoins, stoppedEarly }) {
  const headsPercent = totalCoins > 0
    ? Math.round((totalHeads / totalCoins) * 100)
    : 0;

  return (
    <div
      className={`${styles.banner} ${stoppedEarly ? styles.bannerEarly : styles.bannerDone}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.icon} aria-hidden="true">
        {stoppedEarly ? '⛔' : '✅'}
      </div>

      <div className={styles.content}>
        <p className={styles.headline}>
          {stoppedEarly
            ? `Stopped at batch #${batches.length} — all tails`
            : `All ${batches.length} batch${batches.length !== 1 ? 'es' : ''} completed`}
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalHeads}</span>
            <span className={styles.statLabel}>Total Heads</span>
          </div>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalCoins - totalHeads}</span>
            <span className={styles.statLabel}>Total Tails</span>
          </div>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.stat}>
            <span className={styles.statValue}>{headsPercent}%</span>
            <span className={styles.statLabel}>Heads Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
