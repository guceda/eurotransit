import { useState } from "react";

import MapChart from "./MapChart";
import Navbar from "./Navbar";

import { TRANSPORT_OPTS, YEAR_OPTS } from "../constants";

const Main = ({ datasets }) => {
  const [selectedTransport, setTransport] = useState("plane");
  const [year, setYear] = useState(2020);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Navbar
        selected={selectedTransport}
        setSelected={setTransport}
        options={TRANSPORT_OPTS}
      />
      <Navbar selected={year} setSelected={setYear} options={YEAR_OPTS} />
      <MapChart
        datasets={datasets}
        selectedTransport={selectedTransport}
        selectedYear={year}
      />
    </div>
  );
};

export default Main;
