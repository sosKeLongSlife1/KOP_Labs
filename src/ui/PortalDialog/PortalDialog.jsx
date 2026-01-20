import { createPortal } from "react-dom";

function PortalDialog({ title, children, actions }) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "min(520px, 100%)",
          background: "white",
          borderRadius: 10,
          padding: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>{title}</h3>

        <div style={{ display: "grid", gap: 10 }}>
          {children}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          {actions}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default PortalDialog;
