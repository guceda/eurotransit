import { useState, useEffect } from 'react';
import { parse } from "papaparse";

import { BASE_URL, DATASETS } from "./constants";


export const useDatasets = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const promises = DATASETS.map((dataset) =>
      fetch(BASE_URL + dataset)
        .then((response) => response.text())
        .then((v) => parse(v))
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
          setTimeout(() => {
            setData(data);
          }, 1500);
        }
      })
      .catch(setError);
  }, []);

  return [data, error];

}