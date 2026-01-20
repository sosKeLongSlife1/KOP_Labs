import { useState } from "react";

import AppHeader from "../ui/AppHeader/AppHeader.jsx";

import IntroScreen from "../screens/IntroScreen/IntroScreen.jsx";
import PlayScreen from "../screens/PlayScreen/PlayScreen.jsx";
import SummaryScreen from "../screens/SummaryScreen/SummaryScreen.jsx";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen.jsx";

import useSavedOptions from "../logic/useSavedOptions.js";
import usePatternEngine from "../logic/usePatternEngine.js";

import PortalDialog from "../ui/PortalDialog/PortalDialog.jsx";
import PrimaryButton from "../ui/PrimaryButton/PrimaryButton.jsx";

function AppShell() {
  const [screen, setScreen] = useState("intro"); // intro | play | summary | settings

  const { options, updateOptions } = useSavedOptions();

  const engine = usePatternEngine({
    padsCount: 5,
    speedMs: options.speedMs,
    soundOn: options.soundOn,
  });

  // Автоперехід у summary
  const resolvedScreen = engine.phase === "gameover" ? "summary" : screen;

  return (
    <div>
      <AppHeader />

      {resolvedScreen === "intro" && (
        <IntroScreen
          playerName={options.playerName}
          onOpenSettings={() => setScreen("settings")}
          onStart={() => {
            setScreen("play");
            engine.start();
          }}
        />
      )}

      {resolvedScreen === "settings" && (
        <SettingsScreen
          initialOptions={options}
          onSave={updateOptions}
          onBack={() => setScreen("intro")}
        />
      )}

      {resolvedScreen === "play" && (
        <PlayScreen
          level={engine.level}
          phase={engine.phase}
          activeIndex={engine.activeIndex}
          onStart={engine.start}
          onPadPress={engine.press}
        />
      )}

      {resolvedScreen === "summary" && (
        <SummaryScreen
          score={engine.score}
          onRestart={() => {
            engine.reset();
            setScreen("intro");
          }}
        />
      )}

      {/* Portal Game Over */}
      {engine.phase === "gameover" && (
        <PortalDialog
          title="Game Over"
          actions={
            <>
              <PrimaryButton
                onClick={() => {
                  engine.reset();
                  setScreen("play");
                  engine.start();
                }}
              >
                Try again
              </PrimaryButton>

              <button
                onClick={() => {
                  engine.reset();
                  setScreen("intro");
                }}
              >
                Back to menu
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
          <p style={{ opacity: 0.75 }}>
            Tip: change speed/sound in Settings.
          </p>
        </PortalDialog>
      )}
    </div>
  );
}

export default AppShell;
