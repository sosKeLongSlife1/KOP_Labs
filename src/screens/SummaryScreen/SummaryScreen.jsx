import { useMemo } from "react";
import { useScoreboardState } from "../../state/useScoreboardState.js";
import styles from "./SummaryScreen.module.css";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

function SummaryScreen({ currentUserId, onPlayAgain, onBack }) {
  const results = useScoreboardState((s) => s.results);
  const clearResults = useScoreboardState((s) => s.clearResults);

  const sorted = useMemo(() => {
    return [...results].sort((a, b) => b.score - a.score);
  }, [results]);

  return (
    <div className={styles.wrap}>
      <h2>Results</h2>

      <div className={styles.actions}>
        <button onClick={onBack}>Back</button>
        <button onClick={onPlayAgain}>Play again</button>
        <button onClick={clearResults} disabled={results.length === 0}>
          Clear
        </button>
      </div>

      {sorted.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No results yet. Play a round 🙂</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Score</th>
                <th>Level</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((r, idx) => (
                <tr
                  key={r.id}
                  className={r.userId === currentUserId ? styles.meRow : undefined}
                >
                  <td>{idx + 1}</td>
                  <td>{r.playerName}</td>
                  <td>{r.score}</td>
                  <td>{r.level}</td>
                  <td>{formatDate(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SummaryScreen;
