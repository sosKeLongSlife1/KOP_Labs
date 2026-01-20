import { create } from "zustand";

const KEY = "ss_results_v1";

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
  return Array.isArray(parsed) ? parsed : [];
}

export const useScoreboardState = create((set) => ({
  results: loadInitial(), // [{id,userId,playerName,score,createdAt}]

  addResult: (item) => {
    set((prev) => {
      const next = [item, ...prev.results];
      localStorage.setItem(KEY, JSON.stringify(next));
      return { results: next };
    });
  },

  clearResults: () => {
    set({ results: [] });
    localStorage.setItem(KEY, JSON.stringify([]));
  },
}));
