import "./App.css";
import Menu from './core/Menu'

import { useState } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Menu/>
    </div>
  );
}

export default App;
