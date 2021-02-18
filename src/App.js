import React, { useState, useEffect } from "react";
import Papa from "papaparse";

import Main from "./components/Main";
import Loading from "./components/Loading";
import { BASE_URL, DATASETS } from "./constants";

import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const promises = DATASETS.map((dataset) =>
      fetch(BASE_URL + dataset)
        .then((response) => response.text())
        .then((v) => Papa.parse(v))
    );

    Promise.all(promises).then((res) => {
      const data = res.map((x) => x.data);
      console.log('data loaded', data);
      setData(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {data ? <Main datasets={data} /> : <Loading />}
      </header>
    </div>
  );
}

export default App;
