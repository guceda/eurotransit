import { useEffect, useState } from "react";
import { YEAR_OPTS } from "../constants";

const useInterval = () => {
  const maxYear = YEAR_OPTS[YEAR_OPTS.length - 1].value;
  const minYear = YEAR_OPTS[0].value;

  const [currentCount, setCount] = useState(maxYear);
  const timer = () => setCount(currentCount - 1);

  useEffect(() => {
    if (currentCount <= minYear) return setCount(maxYear);
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [currentCount]);

  return currentCount;
};

export default useInterval;
