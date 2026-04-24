import { useState, useCallback, useRef } from 'react';

/** Fair coin flip using Math.random() (uniform distribution, ~50/50) */
function flipCoin() {
  return Math.random() < 0.5 ? 'H' : 'T';
}

function flipBatch(n) {
  return Array.from({ length: n }, flipCoin);
}

/**
 * Returns simulation state and control functions.
 * Status flow: idle → running → done
 */
export function useSimulation() {
  const [status, setStatus]           = useState('idle');   // 'idle' | 'running' | 'done'
  const [batches, setBatches]         = useState([]);
  const [stoppedEarly, setStoppedEarly] = useState(false);
  const abortRef = useRef(false);

  const run = useCallback(async (coinsPerBatch, numBatches) => {
    abortRef.current = false;
    setBatches([]);
    setStoppedEarly(false);
    setStatus('running');

    // Adaptive delay: faster for more batches to avoid long waits
    const delay = numBatches <= 20 ? 350 : numBatches <= 50 ? 200 : 100;

    for (let i = 0; i < numBatches; i++) {
      if (abortRef.current) return;

      const coins = flipBatch(coinsPerBatch);
      const allTails = coins.every(c => c === 'T');

      setBatches(prev => [...prev, {
        id: i + 1,
        coins,
        allTails,
        headsCount: coins.filter(c => c === 'H').length,
      }]);

      if (allTails) {
        setStoppedEarly(true);
        setStatus('done');
        return;
      }

      // Pause between batches for step-by-step visual reveal
      await new Promise(r => setTimeout(r, delay));
      if (abortRef.current) return;
    }

    setStatus('done');
  }, []);

  const reset = useCallback(() => {
    abortRef.current = true;
    setBatches([]);
    setStoppedEarly(false);
    setStatus('idle');
  }, []);

  const totalHeads = batches.reduce((sum, b) => sum + b.headsCount, 0);
  const totalCoins = batches.reduce((sum, b) => sum + b.coins.length, 0);

  return { status, batches, stoppedEarly, totalHeads, totalCoins, run, reset };
}
