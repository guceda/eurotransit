import { useState, useEffect, useCallback, useMemo } from "react";
import { parse } from "papaparse";

import { BASE_URL, DATASETS } from "./constants";
import { formatDataSets } from "./utils";

export const useDatasets = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const format = useCallback((ds) => formatDataSets(ds), []);

  const handleError = (err) => {
    setError(err);
    console.error("Error retrieving the data:", err);
  };

  useEffect(() => {
    const promises = Object.values(DATASETS).map((dataset) =>
      fetch(BASE_URL + dataset)
        .then((response) => response.text())
        .then(async (v) => {
          const parsed = await parse(v);
          return {
            res: parsed,
            name: dataset,
          };
        })
        .catch(handleError)
    );

    Promise.all(promises)
      .then((res) => {
        const errors = res.filter((x) => x.res.errors.length > 0);
        const isError = errors.length > 0;

        if (isError) {
          handleError(errors);
        } else {
          const data = res.map((x) => ({
            content: x.res.data,
            dataset: x.name,
          }));
          setTimeout(() => {
            const formated = format(data);
            setData(formated);
          }, 1500);
        }
      })
      .catch(handleError);
  }, [format]);

  return [data, error];
};

export const useDatasetsLimits = (data) => {
  const limits = useMemo(() => {
    let max = -Infinity;
    let min = Infinity;
    Object.values(data).forEach((country) =>
      Object.values(country).forEach((val) => {
        if (val) {
          max = Math.max(val, max);
          min = Math.min(val, min);
        }
      })
    );
    return [max, min];
  }, [data]);

  return limits;
};
