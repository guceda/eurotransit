import React, { useState, useEffect } from "react";
import Papa from "papaparse";

import Main from "./components/Main";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { BASE_URL, DATASETS } from "./constants";

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const promises = DATASETS.map((dataset) =>
      fetch(BASE_URL + dataset)
        .then((response) => response.text())
        .then((v) => Papa.parse(v))
        .catch(setError)
    );

    Promise.all(promises)
      .then((res) => {
        const errors = res.filter((x) => x.errors.length > 0);
        const isError = errors.length > 0;

        if (isError) {
          setError(isError);
        } else {
          const data = res.map((x) => x.data);
          setTimeout(() => setData(data), 1500);
        }
      })
      .catch(setError);
  }, []);

  return (
    <div className="App">
      {error ? <Error /> : data ? <Main datasets={data} /> : <Loading />}
    </div>
  );
}

export default App;
