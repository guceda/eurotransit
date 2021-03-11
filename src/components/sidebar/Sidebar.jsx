import chroma from "chroma-js";

import DoughnutChart from "./DoughnutChart";
import StackedBarChart from "./StackedBarChart";

const Sidebar = ({ countries, transport, year, dataset, codes }) => {
  const countryInfo = countries[0]?.geo.properties;
  const countryCode = countries[0]?.ISO;
  const imgUrl = `https://www.countryflags.io/${countryCode}/flat/64.png`;
  return (
    <div className="sidebar">
      <img alt={countryInfo.NAME} src={imgUrl}></img>
      <h2>{countries[0]?.geo.properties.NAME}</h2>
      <div>
        <p>
          Population: <b>{(countryInfo.POP_EST / 1000000).toFixed(2)}M</b>
        </p>
        {/* <p>
          Passengers per 1M population: <b>N/A</b>
        </p> */}
      </div>
      <div>
        <h5>Outgoing passengers from {countryInfo.NAME}</h5>
        <DoughnutChart countries={countries} codes={codes} />
      </div>
      <div>
        <h5>Outgoing passengers by year</h5>
        <StackedBarChart
          dataset={dataset}
          countryCode={countryCode}
          codes={codes}
        />
      </div>
    </div>
  );
};

export default Sidebar;
