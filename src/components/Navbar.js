import React, { useCallback } from "react";

const Navbar = ({ options, selected, setSelected }) => {
  const setClass = useCallback(
    (method) => {
      return selected === method ? "tab-active" : "tab-btn";
    },
    [selected]
  );

  return (
    <div className="navbar">
      <div className="tab">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={setClass(opt.value)}
            onClick={() => setSelected(opt.value)}
          >
            {opt.label}
          </button>
        ))}
        <button className="tab-btn">About</button>
      </div>
    </div>
  );
};

export default Navbar;
