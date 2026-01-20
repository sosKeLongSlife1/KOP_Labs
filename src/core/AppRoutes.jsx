import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";

import IntroScreen from "../screens/IntroScreen/IntroScreen.jsx";
import PlayScreen from "../screens/PlayScreen/PlayScreen.jsx";
import SummaryScreen from "../screens/SummaryScreen/SummaryScreen.jsx";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen.jsx";

import usePatternEngine from "../logic/usePatternEngine.js";
import slugify from "../logic/slugify.js";

import PortalDialog from "../ui/PortalDialog/PortalDialog.jsx";
import PrimaryButton from "../ui/PrimaryButton/PrimaryButton.jsx";

import { useOptionsState } from "../state/useOptionsState.js";
import { useScoreboardState } from "../state/useScoreboardState.js";

// guard для /:userId/play та /:userId/results
function RequireUser({ children }) {
  const { userId } = useParams();
  const playerName = useOptionsState((s) => s.playerName);
  const expected = slugify(playerName);

  if (!expected) return <Navigate to="/" replace />;
  if (userId !== expected) return <Navigate to={`/${expected}/play`} replace />;

  return children;
}

export default function AppRoutes() {
  const navigate = useNavigate();

  // options зі zustand
  const playerName = useOptionsState((s) => s.playerName);
  const speedMs = useOptionsState((s) => s.speedMs);
  const soundOn = useOptionsState((s) => s.soundOn);

  const userId = useMemo(() => slugify(playerName), [playerName]);

  // results зі zustand
  const addResult = useScoreboardState((s) => s.addResult);

  const engine = usePatternEngine({
    padsCount: 5,
    speedMs,
    soundOn,
  });

 
  const lastRecordedRef = useRef(null);

  useEffect(() => {
    if (engine.phase !== "gameover") {
      lastRecordedRef.current = null; 
      return;
    }
    if (!playerName || !userId) return;

    const token = `${userId}:${engine.score}:${engine.level}`;
    if (lastRecordedRef.current === token) return;

    lastRecordedRef.current = token;

    addResult({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      userId,
      playerName,
      score: engine.score,
      level: engine.level,
      createdAt: new Date().toISOString(),
    });
  }, [engine.phase, engine.score, engine.level, playerName, userId, addResult]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <IntroScreen
              playerName={playerName}
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

        <Route path="/settings" element={<SettingsScreen />} />

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
                currentUserId={userId}
                onPlayAgain={() => {
                  engine.reset();
                  engine.start();
                  navigate(`/${userId}/play`);
                }}
                onBack={() => navigate("/")}
              />
            </RequireUser>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Portal Game Over */}
      {engine.phase === "gameover" && (
        <PortalDialog
          title="Game Over"
          actions={
            <>
              <PrimaryButton
                onClick={() => {
                  engine.reset();
                  engine.start();
                  navigate(`/${userId}/play`);
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

              <button onClick={() => navigate(`/${userId}/results`)}>View results</button>
            </>
          }
        >
          <p>
            Player: <b>{playerName || "—"}</b>
          </p>
          <p>
            Score: <b>{engine.score}</b> · Level: <b>{engine.level}</b>
          </p>
        </PortalDialog>
      )}
    </>
  );
}
