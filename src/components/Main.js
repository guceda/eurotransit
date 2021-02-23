import { useState, useMemo } from "react";
import chroma from "chroma-js";
import ReactTooltip from "react-tooltip";

import MapChart from "./MapChart";
import Navbar from "./Navbar";
import { useDatasetsLimits } from "../customHooks";

import { TRANSPORT_OPTS, YEAR_OPTS } from "../constants";

const Main = ({ datasets }) => {
  const [year, setYear] = useState(2020);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
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

  const tootipContent = (country) => {
    if (!country) return;
    const name = hoveredCountry?.geo.properties.NAME;
    if (!country.data) return <p><h3>{name}</h3></p>
    const total = Object.values(country.data).reduce((acc, amount) => {
      return (acc += amount);
    }, 0);
    debugger;
    return <p>
      <h3>{name}</h3>
      <p>Population: <b>{(country.geo.properties.POP_EST / 1000000).toFixed(2)}M</b></p>
      <p>Total passengers by {transport} in {year}: <b>{(total / 1000).toFixed(2)}M</b></p>
    </p>
  };

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
        hoveredCountry={hoveredCountry}
        selectedCountries={selectedCountries}
        setHoveredCountry={setHoveredCountry}
        setSelected={setSelectedCountries}
      />
      <ReactTooltip>{tootipContent(hoveredCountry)}</ReactTooltip>
    </div>
  );
};

export default Main;
