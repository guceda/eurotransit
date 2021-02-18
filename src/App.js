import React, { useState } from "react";
import Main from "./components/Main";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  setTimeout(() =>{setData(22)}, 2000)

  return (
    <div className="App">
      <header className="App-header">{data ? <Main /> : <Loading />}</header>
    </div>
  );
}

export default App;
