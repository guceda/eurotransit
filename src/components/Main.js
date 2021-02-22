import { useState } from "react";

import MapChart from "./MapChart";

const Main = ({ datasets }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <MapChart
        datasets={datasets}
        setSelected={setSelectedCountries}
        selectedCountries={selectedCountries}
      />
    </div>
  );
};

export default Main;
