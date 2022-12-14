import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory((prev) => [newMode, ...prev.slice(replace ? 1 : 0)]);
    setMode(newMode);
  };
  const back = () => {
    setHistory((prev) => {
      if (history.length <= 1) return;
      const newHistory = prev.slice(1);
      setMode(newHistory[0]);
      return newHistory;
    });
  };

  return { mode, transition, back };
};

export default useVisualMode;
