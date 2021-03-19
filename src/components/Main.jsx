import { useState, useMemo, useEffect } from "react";
import chroma from "chroma-js";

import Navbar from "./main/Navbar";
import YearSelector from "./main/YearSelector";
import Sidebar from "./sidebar/Sidebar";
import About from "./sidebar/About";
import MapChart from "./main/MapChart";
import MapTooltip from "./main/MapTooltip";
import Overlay from "./main/Overlay";
import SidebarContainer from "./SidebarContainer";
import useDatasetsLimits from "../hooks/useDatasetLimits";
import useColorSet from "../hooks/useColorSet";
import Legend from "./Legend";

import theme from "../../src/theme.json";

import { TRANSPORT_OPTS, YEAR_OPTS } from "../constants";

const Main = ({ datasets }) => {
  const [year, setYear] = useState(YEAR_OPTS[YEAR_OPTS.length - 1].value);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [transport, setTransport] = useState("plane");
  const [about, setAbout0] = useState(false);

  const setAbout = (flag) => {
    setSelectedCountries([]);
    setAbout0(flag);
  };

  const dataset = useMemo(() => datasets[transport][year], [
    datasets,
    transport,
    year,
  ]);

  const [max, min] = useDatasetsLimits(datasets[transport]);

  const scale = useMemo(() => {
    const rangeMin =
      transport == "plane" ? theme.map.plane.min : theme.map.train.min;
    const rangeMax =
      transport == "plane" ? theme.map.plane.max : theme.map.train.max;
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
      open={about || selectedCountries.length > 0}
      about={about}
      onClose={() => {
        setSelectedCountries([]);
        setAbout(false);
      }}
      sidebarContent={
        about ? (
          <About />
        ) : (
          <Sidebar
            dataset={datasets[transport]}
            countries={selectedCountries}
            year={year}
            transport={transport}
            codes={datasets.codes}
          />
        )
      }
      mainContent={
        <div className="main">
          {about && <Overlay />}
          {/* <Header /> */}
          <Navbar
            selected={transport}
            setSelected={(method) => setTransport(method)}
            options={TRANSPORT_OPTS}
            colorSet={colorSet}
            setAbout={setAbout}
            about={about}
          />
          <MapChart
            dataset={dataset}
            colorSet={colorSet}
            scale={scale}
            transport={transport}
            limits={[max, min]}
            setHoveredLink={setHoveredLink}
            hoveredCountry={hoveredCountry}
            selectedCountries={selectedCountries}
            setHoveredCountry={setHoveredCountry}
            setSelected={setSelectedCountries}
          />
          <MapTooltip
            country={hoveredCountry}
            link={hoveredLink}
            transport={transport}
            year={year}
          />
          {!about && (
            <>
              <YearSelector
                selected={year}
                setSelected={setYear}
                options={YEAR_OPTS}
              />
              <Legend
                limits={[max, min]}
                theme={theme}
                transportation={transport}
              />
            </>
          )}
        </div>
      }
    />
  );
};

export default Main;
