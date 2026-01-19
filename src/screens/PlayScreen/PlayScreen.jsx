import GamePad from "../../ui/GamePad/GamePad.jsx";

function PlayScreen({ onFinish }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h2>Game</h2>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24 }}>
        <div>
          <p>Level: —</p>
          <button onClick={onFinish}>Finish</button>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <GamePad />
        </div>
      </div>
    </div>
  );
}

export default PlayScreen;
