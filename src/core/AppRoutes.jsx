import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";

import IntroScreen from "../screens/IntroScreen/IntroScreen.jsx";
import PlayScreen from "../screens/PlayScreen/PlayScreen.jsx";
import SummaryScreen from "../screens/SummaryScreen/SummaryScreen.jsx";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen.jsx";

import useSavedOptions from "../logic/useSavedOptions.js";
import usePatternEngine from "../logic/usePatternEngine.js";
import slugify from "../logic/slugify.js";

import PortalDialog from "../ui/PortalDialog/PortalDialog.jsx";
import PrimaryButton from "../ui/PrimaryButton/PrimaryButton.jsx";

// --- маленький guard-компонент для /:userId/play та /:userId/results
function RequireUser({ children }) {
  const { userId } = useParams();
  const { options } = useSavedOptions();
  const expected = slugify(options.playerName);

  if (!expected) return <Navigate to="/" replace />;
  if (userId !== expected) return <Navigate to={`/${expected}/play`} replace />;

  return children;
}

export default function AppRoutes() {
  const navigate = useNavigate();
  const { options, updateOptions } = useSavedOptions();

  const engine = usePatternEngine({
    padsCount: 5,
    speedMs: options.speedMs,
    soundOn: options.soundOn,
  });

  const userId = slugify(options.playerName);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <IntroScreen
              playerName={options.playerName}
              onOpenSettings={() => navigate("/settings")}
              onStart={() => {
                if (!userId) {
                  navigate("/settings");
                  return;
                }
                engine.reset();
                engine.start();
                navigate(`/${userId}/play`);
              }}
            />
          }
        />

        <Route
          path="/settings"
          element={
            <SettingsScreen
              initialOptions={options}
              onSave={updateOptions}
              onBack={() => navigate("/")}
            />
          }
        />

        <Route
          path="/:userId/play"
          element={
            <RequireUser>
              <PlayScreen
                level={engine.level}
                phase={engine.phase}
                activeIndex={engine.activeIndex}
                onStart={engine.start}
                onPadPress={engine.press}
              />
            </RequireUser>
          }
        />

        <Route
          path="/:userId/results"
          element={
            <RequireUser>
              <SummaryScreen
                score={engine.score}
                onRestart={() => {
                  engine.reset();
                  navigate("/");
                }}
              />
            </RequireUser>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ✅ Portal Game Over (Етап 3) — тепер навігація роутером */}
      {engine.phase === "gameover" && (
        <PortalDialog
          title="Game Over"
          actions={
            <>
              <PrimaryButton
                onClick={() => {
                  engine.reset();
                  engine.start();
                  navigate(`/${userId || "player"}/play`);
                }}
              >
                Try again
              </PrimaryButton>

              <button
                onClick={() => {
                  engine.reset();
                  navigate("/");
                }}
              >
                Back to menu
              </button>

              <button
                onClick={() => {
                  navigate(`/${userId}/results`);
                }}
                disabled={!userId}
              >
                View results
              </button>
            </>
          }
        >
          <p>
            Player: <b>{options.playerName || "—"}</b>
          </p>
          <p>
            Score: <b>{engine.score}</b>
          </p>
        </PortalDialog>
      )}
    </>
  );
}
