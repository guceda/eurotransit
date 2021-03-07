import { useCallback } from "react";

const Navbar = ({ options, selected, setSelected, position }) => {
  const setClass = useCallback(
    (method) => {
      return selected === method ? "tab-active" : "tab-btn";
    },
    [selected]
  );

  const setStyles = () => {
    return position === 'top' ? 'navbar' : 'year-selector';
  }

  return (
    <div className={"tab" + ' ' + setStyles()}>
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
