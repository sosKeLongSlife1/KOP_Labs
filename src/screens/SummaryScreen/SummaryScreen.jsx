import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton.jsx";

function SummaryScreen({ score, onRestart }) {
  return (
    <div>
      <h2>Game Over</h2>
      <p>Your score: {score}</p>

      <PrimaryButton onClick={onRestart}>
        Restart
      </PrimaryButton>
    </div>
  );
}

export default SummaryScreen;
