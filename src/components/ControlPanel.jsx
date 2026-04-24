import { useState } from 'react';
import styles from './ControlPanel.module.css';

const DEFAULT_COINS = 5;
const DEFAULT_BATCHES = 10;

export function ControlPanel({ status, onStart, onReset }) {
  const [coinsPerBatch, setCoinsPerBatch] = useState(DEFAULT_COINS);
  const [numBatches, setNumBatches]       = useState(DEFAULT_BATCHES);

  const isRunning = status === 'running';
  const isDone    = status === 'done';

  function handleSubmit(e) {
    e.preventDefault();
    const coins   = Math.max(1, Math.min(50, parseInt(coinsPerBatch, 10) || 1));
    const batches = Math.max(1, Math.min(100, parseInt(numBatches,   10) || 1));
    onStart(coins, batches);
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit} aria-label="Simulation controls">
      <div className={styles.header}>
        <span className={styles.icon}>🪙</span>
        <div>
          <h1 className={styles.title}>Coin Roll Simulator</h1>
          <p className={styles.subtitle}>Flip coins in batches · count all heads</p>
        </div>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>Coins per batch</span>
          <div className={styles.inputWrap}>
            <input
              type="number"
              className={styles.input}
              value={coinsPerBatch}
              onChange={e => setCoinsPerBatch(e.target.value)}
              min={1}
              max={50}
              disabled={isRunning}
              aria-describedby="coins-hint"
            />
            <span className={styles.inputUnit}>coins</span>
          </div>
          <span id="coins-hint" className={styles.hint}>1 – 50</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Max batches</span>
          <div className={styles.inputWrap}>
            <input
              type="number"
              className={styles.input}
              value={numBatches}
              onChange={e => setNumBatches(e.target.value)}
              min={1}
              max={100}
              disabled={isRunning}
              aria-describedby="batches-hint"
            />
            <span className={styles.inputUnit}>batches</span>
          </div>
          <span id="batches-hint" className={styles.hint}>1 – 100</span>
        </label>
      </div>

      <div className={styles.actions}>
        {!isDone ? (
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={isRunning}
            aria-busy={isRunning}
          >
            {isRunning ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Simulating…
              </>
            ) : (
              <>
                <span aria-hidden="true">▶</span>
                Start Simulation
              </>
            )}
          </button>
        ) : (
          <button type="button" className={styles.btnSecondary} onClick={onReset}>
            <span aria-hidden="true">↺</span>
            Run Again
          </button>
        )}
      </div>
    </form>
  );
}
