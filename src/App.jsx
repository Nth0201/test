import { useSimulation } from './hooks/useSimulation';
import { ControlPanel } from './components/ControlPanel';
import { ResultsPanel } from './components/ResultsPanel';
import styles from './App.module.css';

export default function App() {
  const {
    status,
    batches,
    stoppedEarly,
    totalHeads,
    totalCoins,
    run,
    reset,
  } = useSimulation();

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <ControlPanel
          status={status}
          onStart={run}
          onReset={reset}
        />

        <ResultsPanel
          status={status}
          batches={batches}
          stoppedEarly={stoppedEarly}
          totalHeads={totalHeads}
          totalCoins={totalCoins}
        />
      </div>
    </div>
  );
}
