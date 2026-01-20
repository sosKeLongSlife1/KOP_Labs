import { useEffect, useRef, useState } from "react";

const DEFAULT_SPEED_MS = 650;   // швидкість показу
const FLASH_RATIO = 0.6;        // час підсвітки

function randInt(max) {
  return Math.floor(Math.random() * max);
}

export default function usePatternEngine({
  padsCount = 5,
  speedMs = DEFAULT_SPEED_MS,
  soundOn = false,
} = {}) {
  const [phase, setPhase] = useState("idle");
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);

  const [sequence, setSequence] = useState([]); // number[]
  const [activeIndex, setActiveIndex] = useState(null);
  const [inputIndex, setInputIndex] = useState(0);

  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const beep = () => {
    if (!soundOn) return;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = 520;
      gain.gain.value = 0.06;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      setTimeout(() => {
        osc.stop();
        ctx.close();
      }, 70);
    
  };

  const playSequence = (seq) => {
    clearTimers();
    setPhase("showing");
    setActiveIndex(null);

    seq.forEach((pad, i) => {
      const tOn = setTimeout(() => {
        setActiveIndex(pad);
        beep();
      }, i * speedMs);

      const tOff = setTimeout(() => {
        setActiveIndex(null);
      }, i * speedMs + speedMs * FLASH_RATIO);

      timersRef.current.push(tOn, tOff);
    });

    const tEnd = setTimeout(() => {
      setPhase("input");
      setInputIndex(0);
    }, seq.length * speedMs + 50);

    timersRef.current.push(tEnd);
  };

  const start = () => {
    clearTimers();
    const first = randInt(padsCount);
    const seq = [first];

    setSequence(seq);
    setLevel(1);
    setScore(0);
    setInputIndex(0);
    setActiveIndex(null);

    playSequence(seq);
  };

  const reset = () => {
    clearTimers();
    setPhase("idle");
    setLevel(0);
    setScore(0);
    setSequence([]);
    setActiveIndex(null);
    setInputIndex(0);
  };

  const press = (index) => {
    if (phase !== "input") return;

    const expected = sequence[inputIndex];
    if (index !== expected) {
      setPhase("gameover");
      return;
    }

    const nextInputIndex = inputIndex + 1;
    setInputIndex(nextInputIndex);

    setScore((s) => s + 1);

    if (nextInputIndex === sequence.length) {
      const next = randInt(padsCount);
      const nextSeq = [...sequence, next];

      setSequence(nextSeq);
      setLevel((l) => l + 1);

      const t = setTimeout(() => playSequence(nextSeq), 350);
      timersRef.current.push(t);
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return {
    phase,
    level,
    score,
    activeIndex,
    start,
    reset,
    press,
  };
}
