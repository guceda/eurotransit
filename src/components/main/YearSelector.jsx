import { useCallback } from "react";
import Autoplay from './Autoplay';

const YearSelector = ({ options, selected, setSelected, }) => {
  const setClass = useCallback(
    (method) => {
      return selected === method ? "tab-active" : "tab-btn";
    },
    [selected]
  );

  return (
    <div className={"tab year-selector"}>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={setClass(opt.value)}
          onClick={() => setSelected(opt.value)}
        >
          {opt.label}
        </button>
      ))}
      <Autoplay setYear={setSelected} year={selected} play={false} />
    </div>
  );
};

export default YearSelector;
