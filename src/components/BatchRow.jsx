import styles from './BatchRow.module.css';

export function BatchRow({ batch, index }) {
  const coinSize = batch.coins.length > 20 ? 'sm' : batch.coins.length > 10 ? 'md' : 'lg';

  return (
    <div
      className={`${styles.row} ${batch.allTails ? styles.rowAllTails : ''}`}
      style={{ animationDelay: `${Math.min(index * 40, 200)}ms` }}
      role="listitem"
    >
      <div className={styles.meta}>
        <span className={styles.batchNum}>#{batch.id}</span>
        <span className={styles.summary}>
          <span className={styles.headsCount}>{batch.headsCount}H</span>
          <span className={styles.sep}>·</span>
          <span className={styles.tailsCount}>{batch.coins.length - batch.headsCount}T</span>
        </span>
        {batch.allTails && (
          <span className={styles.stopBadge} aria-label="All tails – stopped">
            ⛔ All Tails
          </span>
        )}
      </div>

      <div
        className={`${styles.coins} ${styles[`coins--${coinSize}`]}`}
        aria-label={`Batch ${batch.id}: ${batch.coins.join(' ')}`}
      >
        {batch.coins.map((coin, i) => (
          <span
            key={i}
            className={`${styles.coin} ${coin === 'H' ? styles.coinH : styles.coinT}`}
            style={{ '--i': i }}
            aria-hidden="true"
          >
            {coin}
          </span>
        ))}
      </div>
    </div>
  );
}
