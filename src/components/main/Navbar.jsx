import { useCallback } from "react";

const Navbar = ({ options, selected, setSelected, setAbout, about}) => {
  const setClass = useCallback(
    (method) => {
      return selected === method ? "tab-active" : "tab-btn";
    },
    [selected]
  );

  return (
    <div className="tab navbar">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={setClass(opt.value)}
          onClick={() => {
            setSelected(opt.value);
            setAbout(false);
          }}
        >
          {opt.label}
        </button>
      ))}
      <button
        key='about'
        className={`tab-btn ${about ? "tab-active" : "tab-btn"}`}
        onClick={() => setAbout(!about)}
      >
        About
      </button>
    </div>
  );
};

export default Navbar;
