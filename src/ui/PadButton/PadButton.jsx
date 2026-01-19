function PadButton({ color, onClick, isActive = false, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="pad"
      style={{
        width: 100,
        height: 100,
        backgroundColor: color,
        border: "none",
        borderRadius: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        filter: isActive ? "brightness(1.3)" : "none",
        transform: isActive ? "scale(0.97)" : "none",
        transition: "transform 80ms linear, filter 80ms linear",
      }}
    />
  );
}

export default PadButton;
