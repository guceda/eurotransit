import { useState, useEffect, useCallback } from 'react';
import { parse } from "papaparse";

import { BASE_URL, DATASETS } from "./constants";
import { formatDataSets } from './utils';


export const useDatasets = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const format =  useCallback((ds) => formatDataSets(ds),[]);

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
            const formated = format(data);
            setData(formated);
          }, 1500);
        }
      })
      .catch(setError);
  }, [format]);

  return [data, error];

}