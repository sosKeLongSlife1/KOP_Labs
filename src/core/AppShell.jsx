import { useState } from "react";

import AppHeader from "../ui/AppHeader/AppHeader.jsx";

import IntroScreen from "../screens/IntroScreen/IntroScreen.jsx";
import PlayScreen from "../screens/PlayScreen/PlayScreen.jsx";
import SummaryScreen from "../screens/SummaryScreen/SummaryScreen.jsx";

import usePatternEngine from "../logic/usePatternEngine.js";

function AppShell() {
  const [screen, setScreen] = useState("intro"); 

  const engine = usePatternEngine({
    padsCount: 5,
    speedMs: 650,
  });

  const resolvedScreen = engine.phase === "gameover" ? "summary" : screen;

  return (
    <div>
      <AppHeader />

      {resolvedScreen === "intro" && (
        <IntroScreen
          onStart={() => {
            setScreen("play");
            engine.start();
          }}
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
    </div>
  );
}

export default AppShell;
