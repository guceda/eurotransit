import { useState, useMemo, useEffect } from "react";
import chroma from "chroma-js";

import Navbar from "./main/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Header from "./main/Header";
import MapChart from "./main/MapChart";
import MapTooltip from "./main/MapTooltip";
import SidebarContainer from "./SidebarContainer";
import useDatasetsLimits from "../hooks/useDatasetLimits";
import useColorSet from "../hooks/useColorSet"

import theme from "../../src/theme.json";

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
    const rangeMin = (transport == 'plane') ? theme.map.plane_trips.min : theme.map.train_trips.min;
    const rangeMax = (transport == 'plane') ? theme.map.plane_trips.max : theme.map.train_trips.max;
    const range = [rangeMin, rangeMax];
    return chroma.scale(range).domain([min, max]);
  }, [max, min]);

  const colorSet = useColorSet(transport);

  useEffect(() => {
    const countries = selectedCountries.map(country => {
      return {
        ...country,
        data: dataset[country.ISO],
      }
    })
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
            colorSet={colorSet}
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
