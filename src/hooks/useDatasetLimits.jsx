import { useMemo } from "react";

const useDatasetsLimits = (data) => {
  const limits = useMemo(() => {
    let max = -Infinity;
    let min = Infinity;
    Object.values(data).forEach((year) => {
      return Object.values(year).forEach((country) => {
        let all = 0;
        Object.values(country).forEach((val) => {
          if(val) all+=val;
        })
        if (all) {
          max = Math.max(all, max);
          min = Math.min(all, min);
        }
      }
      );
    });
    return [max, min];
  }, [data]);

  return limits;
};

export default useDatasetsLimits;
