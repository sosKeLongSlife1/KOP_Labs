import PadButton from "../PadButton/PadButton.jsx";

function GamePad() {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,              
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PadButton color="#00ffff" />
      <PadButton color="#ff00ff" />
      <PadButton color="#5f9ea0" />
      <PadButton color="#7cfc00" />
      <PadButton color="#8b4513" />
    </div>
  );
}

export default GamePad;
