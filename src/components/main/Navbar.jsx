import { useCallback } from "react";

const Navbar = ({ options, selected, setSelected }) => {
  const setClass = useCallback(
    (method) => {
      return selected === method ? "tab-active" : "tab-btn";
    },
    [selected]
  );

  return (
    <div className={"tab navbar"}>
      <div class="appTitle">
        <h4>eurotransit</h4>
      </div>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={setClass(opt.value)}
          onClick={() => setSelected(opt.value)}
        >
          {opt.label}
        </button>
      ))}
      {/* <button className="tab-btn">About</button> */}
    </div>
  );
};

export default Navbar;
