import { create } from "zustand";

const KEY = "ss_opts_v2";

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

function loadInitial() {
  const raw = localStorage.getItem(KEY);
  const parsed = raw ? safeParse(raw) : null;
  return { ...DEFAULTS, ...(parsed || {}) };
}

export const useOptionsState = create((set) => ({
  ...loadInitial(),

  setOptions: (patch) => {
    set((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(KEY, JSON.stringify({
        playerName: next.playerName,
        speedMs: next.speedMs,
        soundOn: next.soundOn,
      }));
      return next;
    });
  },

  resetOptions: () => {
    set(DEFAULTS);
    localStorage.setItem(KEY, JSON.stringify(DEFAULTS));
  },
}));
