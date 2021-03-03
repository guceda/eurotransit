import { useState, useMemo, useEffect } from "react";
import chroma from "chroma-js";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MapChart from "./MapChart";
import MapTooltip from "./MapTooltip";
import SidebarContainer from "./SidebarContainer";
import useDatasetsLimits from "../hooks/useDatasetLimits";

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

  const [max, min] = useDatasetsLimits(datasets[transport]);

  const scale = useMemo(() => {
    const range = ["lightgrey", "#11987F"];
    return chroma.scale(range).domain([min, max]);
  }, [max, min]);

  useEffect(() => {
    const countries = selectedCountries.map(country => {
      return {
      ...country,
      data: dataset[country.ISO],
    }})
    setSelectedCountries(countries);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transport, year])

  return (
    <SidebarContainer
      open={selectedCountries.length > 0}
      onClose={() => setSelectedCountries([])}
      sidebarContent={
        <Sidebar
          dataset={datasets[transport]}
          countries={selectedCountries}
          year={year}
          transport={transport}
        />
      }
      mainContent={
        <div className="main">
          <Header />
          <Navbar
            selected={transport}
            setSelected={setTransport}
            options={TRANSPORT_OPTS}
          />
          <MapChart
            dataset={dataset}
            scale={scale}
            hoveredCountry={hoveredCountry}
            selectedCountries={selectedCountries}
            setHoveredCountry={setHoveredCountry}
            setSelected={setSelectedCountries}
          />
          <MapTooltip
            country={hoveredCountry}
            transport={transport}
            year={year}
          />
          <Navbar selected={year} setSelected={setYear} options={YEAR_OPTS} />
        </div>
      }
    />
  );
};

export default Main;
