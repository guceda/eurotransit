import { useState } from "react";
import { FaPlay } from "react-icons/fa";

import useAutoplay from "../../hooks/useAutoplay";
import { YEAR_OPTS } from "../../constants";

const Autoplay = ({ setYear, year, play }) => {
  const [playing, setPlaying] = useState(play);

  useAutoplay(() => {
    if (playing) {
      if (year === YEAR_OPTS[YEAR_OPTS.length - 1].value) {
        setYear(YEAR_OPTS[0].value);
      } else {
        setYear(year + 1);
      }
    }
  }, 1000);

  return (
    <button
      data-tip="Auto play"
      className={playing ? "tab-active" : "tab-btn"}
      onClick={() => setPlaying(!playing)}
    >
      <FaPlay />
    </button>
  );
};

export default Autoplay;
