import { useMemo } from "react";

const useDatasetsLimits = (data) => {
  const limits = useMemo(() => {
    let max = -Infinity;
    let min = Infinity;
    Object.values(data).forEach((year) => {
        return Object.values(year).forEach((country) =>
          Object.values(country).forEach((val) => {
            if (val) {
              max = Math.max(val, max);
              min = Math.min(val, min);
            }
          })
        );
      });
    return [max, min];
  }, [data]);

  return limits;
};

export default useDatasetsLimits;
