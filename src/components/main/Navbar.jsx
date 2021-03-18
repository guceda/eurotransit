import { useCallback } from "react";

const Navbar = ({ options, selected, setSelected }) => {
  const setClass = useCallback(
    (method) => {
      return selected === method ? "tab-nav-active" : "tab-nav-btn";
    },
    [selected]
  );

  return (
    <div className={"tab navbar"}>
      <div className="appTitle">
        <h4>eurotransit</h4>
      </div>
      <div className="verticalBar"></div>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={setClass(opt.value)}
          onClick={() => setSelected(opt.value)}
        >
          {opt.label}
        </button>
      ))}
      <button className="tab-nav-btn">About</button>
    </div>
  );
};

export default Navbar;
