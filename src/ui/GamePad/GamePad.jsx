import PadButton from "../PadButton/PadButton.jsx";

const COLORS = ["#00ffff", "#ff00ff", "#5f9ea0", "#7cfc00", "#8b4513"];

function GamePad({ activeIndex, onPadPress, disabled = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {COLORS.map((c, i) => (
        <PadButton
          key={i}
          color={c}
          isActive={i === activeIndex}
          disabled={disabled}
          onClick={() => onPadPress(i)}
        />
      ))}
    </div>
  );
}

export default GamePad;

