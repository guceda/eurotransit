import { useCallback } from "react";

const Navbar = ({ options, selected, setSelected, setAbout, about}) => {
  const setClass = useCallback(
    (method) => {
      return (!about && selected === method) ? "tab-nav-active" : "tab-nav-btn";
    },
    [selected, about]
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
          onClick={() => {
            setAbout(false);
            setSelected(opt.value);
          }}
        >
          {opt.label}
        </button>
      ))}
      <button
        key='about'
        className={`tab-nav-${about ? "active" : "btn"}`}
        onClick={() => setAbout(true)}
      >
        About
      </button>
    </div>
  );
};

export default Navbar;
