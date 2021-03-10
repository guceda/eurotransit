import { useState, useMemo, useEffect } from "react";
import chroma from "chroma-js";

import Navbar from "./main/Navbar";
import YearSelector from "./main/YearSelector";
import Sidebar from "./sidebar/Sidebar";
import Header from "./main/Header";
import MapChart from "./main/MapChart";
import MapTooltip from "./main/MapTooltip";
import SidebarContainer from "./SidebarContainer";
import Autoplay from "./main/Autoplay";
import useDatasetsLimits from "../hooks/useDatasetLimits";
import useColorSet from "../hooks/useColorSet";

import theme from "../../src/theme.json";

import { TRANSPORT_OPTS, YEAR_OPTS } from "../constants";

const Main = ({ datasets }) => {
  const [year, setYear] = useState(YEAR_OPTS[YEAR_OPTS.length - 1].value);
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
    const rangeMin =
      transport == "plane"
        ? theme.map.plane_trips.min
        : theme.map.train_trips.min;
    const rangeMax =
      transport == "plane"
        ? theme.map.plane_trips.max
        : theme.map.train_trips.max;
    const range = [rangeMin, rangeMax];
    return chroma.scale(range).domain([min, max]);
  }, [max, min]);

  const colorSet = useColorSet(transport);

  useEffect(() => {
    const countries = selectedCountries.map((country) => {
      return {
        ...country,
        data: dataset[country.ISO],
      };
    });
    setSelectedCountries(countries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transport, year]);

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
          codes={datasets.codes}
        />
      }
      mainContent={
        <div className="main">
          {/* <Header /> */}
          <Navbar
            selected={transport}
            setSelected={setTransport}
            options={TRANSPORT_OPTS}
            colorSet={colorSet}
          />
          <MapChart
            dataset={dataset}
            colorSet={colorSet}
            scale={scale}
            transport={transport}
            limits={[max, min]}
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
          <YearSelector
            selected={year}
            setSelected={setYear}
            options={YEAR_OPTS}
          />
        </div>
      }
    />
  );
};

export default Main;
