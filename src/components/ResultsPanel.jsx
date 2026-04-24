import { useEffect, useRef } from 'react';
import { BatchRow } from './BatchRow';
import { SummaryBanner } from './SummaryBanner';
import styles from './ResultsPanel.module.css';

export function ResultsPanel({ status, batches, stoppedEarly, totalHeads, totalCoins }) {
  const bottomRef = useRef(null);
  const isDone = status === 'done';

  // Auto-scroll to latest batch while running
  useEffect(() => {
    if (status === 'running' && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [batches.length, status]);

  if (batches.length === 0 && status !== 'running') return null;

  return (
    <section className={styles.panel} aria-label="Simulation results">
      <div className={styles.heading}>
        <h2 className={styles.title}>Results</h2>
        {status === 'running' && (
          <span className={styles.liveBadge} aria-live="polite" aria-atomic="true">
            <span className={styles.liveDot} aria-hidden="true" />
            Batch {batches.length}
          </span>
        )}
        {isDone && (
          <span className={styles.doneBadge}>
            {batches.length} batch{batches.length !== 1 ? 'es' : ''}
          </span>
        )}
      </div>

      {isDone && (
        <SummaryBanner
          batches={batches}
          totalHeads={totalHeads}
          totalCoins={totalCoins}
          stoppedEarly={stoppedEarly}
        />
      )}

      <div
        className={styles.list}
        role="list"
        aria-label="Batch results"
      >
        {batches.map((batch, i) => (
          <BatchRow key={batch.id} batch={batch} index={i} />
        ))}
        <div ref={bottomRef} />
      </div>
    </section>
  );
}
