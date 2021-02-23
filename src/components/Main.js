import { useState, useMemo } from "react";
import chroma from 'chroma-js';
import ReactTooltip from "react-tooltip";

import MapChart from "./MapChart";
import Navbar from "./Navbar";
import { useDatasetsLimits } from "../customHooks";

import { TRANSPORT_OPTS, YEAR_OPTS } from "../constants";

const Main = ({ datasets }) => {
  const [year, setYear] = useState(2020);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [transport, setTransport] = useState("plane");

  const dataset = useMemo(() => datasets[transport][year], [
    datasets,
    transport,
    year,
  ]);

  const [max, min] = useDatasetsLimits(dataset);

  const scale = useMemo(() => {
    const range = ["lightgrey", "#11987F"];
    return chroma.scale(range).domain([min, max]);
  }, [max, min]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Navbar
        selected={transport}
        setSelected={setTransport}
        options={TRANSPORT_OPTS}
      />
      <Navbar selected={year} setSelected={setYear} options={YEAR_OPTS} />
      <MapChart
        dataset={dataset}
        scale={scale}
        selectedCountries={selectedCountries}
        setSelected={setSelectedCountries}
      />
    </div>
  );
};

export default Main;
