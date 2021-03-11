import { useState } from "react";
import { IoPlay } from "react-icons/io5";

import useAutoplay from "../../hooks/useAutoplay";
import { YEAR_OPTS } from "../../constants";

const Autoplay = ({ setYear, year, play }) => {
  const [playing, setPlaying] = useState(play);

  useAutoplay(() => {
    if (playing) {
      if (year === YEAR_OPTS[0].value) {
        setYear(YEAR_OPTS[YEAR_OPTS.length - 1].value);
      } else {
        setYear(year - 1);
      }
    }
  }, 1000);

  return (
    <button
      className={playing ? "tab-active" : "tab-btn"}
      onClick={() => setPlaying(!playing)}
    >
      <IoPlay />
    </button>
  );
};

export default Autoplay;
