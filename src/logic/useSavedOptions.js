import { useEffect, useState } from "react";

const KEY = "ss_opts_v1";

const DEFAULTS = {
  playerName: "",
  speedMs: 650,
  soundOn: false,
};

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function useSavedOptions() {
  const [options, setOptions] = useState(() => {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? safeParse(raw) : null;
    return { ...DEFAULTS, ...(parsed || {}) };
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(options));
  }, [options]);

  const updateOptions = (patch) => {
    setOptions((prev) => ({ ...prev, ...patch }));
  };

  const resetOptions = () => setOptions(DEFAULTS);

  return { options, updateOptions, resetOptions };
}
