import GamePad from "../../ui/GamePad/GamePad.jsx";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton.jsx";

function PlayScreen({ level, phase, activeIndex, onStart, onPadPress }) {
  const isIdle = phase === "idle";
  const isShowing = phase === "showing";
  const isInput = phase === "input";

  return (
    <div>
      <h2>Game</h2>
      <p>Level: {level || "—"}</p>
      <p>Status: {phase}</p>

      {isIdle && (
        <PrimaryButton onClick={onStart}>Start</PrimaryButton>
      )}

      <GamePad
        activeIndex={activeIndex}
        onPadPress={onPadPress}
        disabled={!isInput}
      />

      {isShowing && <p>Watch the pattern…</p>}
      {isInput && <p>Your turn!</p>}
    </div>
  );
}

export default PlayScreen;

