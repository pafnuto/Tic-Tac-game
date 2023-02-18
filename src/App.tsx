import { useReducer, useState, useRef } from "react";
import cssClass from './App.module.css'
import { Game as GameClass } from "./types";
import { initialGameHistory, gameReducer } from "./redux/GameReducer";


function App() {

  const [gameHistory, dispatch] = useReducer(gameReducer, initialGameHistory);
  const [moveNumber, setMoveNumber] = useState(0);
  const topOfPageRef = useRef<HTMLHeadingElement>(null);

  
  return (
<h1>hui</h1>
  )
}

export default App
