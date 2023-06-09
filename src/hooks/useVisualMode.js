import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);
  function transition(newMode, replace = false) {
    if (!replace){
    setMode(newMode)
    history.push(newMode)
  } else {
    setMode(newMode)
    history[history.length - 1] = newMode
  }
  }
  function back() {
    if(!(history[history.length - 1] === initial)){
      history.pop()
      setMode(history[history.length - 1])
    }
  }
  return { mode, transition, back };
}
  