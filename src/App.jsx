import React from "react";

import Main from "./components/Main";
import Loading from "./components/Loading";
import Error from "./components/Error";

import useDatasets from "./hooks/useDatasets";

import "./App.css";

function App() {
  const [data, error] = useDatasets();

  return (
    <div className="App">
      {error ? <Error /> : data ? <Main datasets={data} /> : <Loading />}
    </div>
  );
}

export default App;
