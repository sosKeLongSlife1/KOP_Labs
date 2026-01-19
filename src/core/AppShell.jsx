import { useState } from "react";

import AppHeader from "../ui/AppHeader/AppHeader.jsx";

import IntroScreen from "../screens/IntroScreen/IntroScreen.jsx";
import PlayScreen from "../screens/PlayScreen/PlayScreen.jsx";
import SummaryScreen from "../screens/SummaryScreen/SummaryScreen.jsx";

function AppShell() {
  const [screen, setScreen] = useState("intro");

  return (
    <div>
      <AppHeader />

      {screen === "intro" && (
        <IntroScreen onStart={() => setScreen("play")} />
      )}

      {screen === "play" && (
        <PlayScreen onFinish={() => setScreen("summary")} />
      )}

      {screen === "summary" && (
        <SummaryScreen onRestart={() => setScreen("intro")} />
      )}
    </div>
  );
}

export default AppShell;
