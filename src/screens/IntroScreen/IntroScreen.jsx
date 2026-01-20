import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton.jsx";

function IntroScreen({ onStart, onOpenSettings, playerName }) {
  return (
    <div>
      <h2>Welcome to Simon Says</h2>

      {playerName ? (
        <p>Player: <b>{playerName}</b></p>
      ) : (
        <p style={{ opacity: 0.7 }}>Tip: set your player name in Settings</p>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <PrimaryButton onClick={onStart}>Start Game</PrimaryButton>
        <button onClick={onOpenSettings}>Settings</button>
      </div>
    </div>
  );
}

export default IntroScreen;
