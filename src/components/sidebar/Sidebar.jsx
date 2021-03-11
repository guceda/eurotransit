import chroma from "chroma-js";

import DoughnutChart from "./DoughnutChart";
import StackedBarChart from "./StackedBarChart";

const Sidebar = ({ countries, transport, year, dataset, codes }) => {
  const countryInfo = countries[0]?.geo.properties;
  const countryCode = countries[0]?.ISO;
  const imgUrl = `https://www.countryflags.io/${countryCode}/flat/64.png`;
  return (
    <div className="sidebar">
      <div class="countryNameContainer">
        <img alt={countryInfo.NAME} src={imgUrl}></img>
        <h2>{countries[0]?.geo.properties.NAME}</h2>
      </div>
      <div class="sidebarContent">
        <div class="indicatorContainer">
          <div>
            <h2>{(countryInfo.POP_EST / 1000000).toFixed(2)}M</h2>
            <p>
              Population
            </p>
          </div>
          <div class="indicator">
            <h2>N/A</h2>
            <p>
              Passengers per 1M
            </p>
          </div>
        </div>
        <div>
          <h5>Outgoing passengers from {countryInfo.NAME}</h5>
          <DoughnutChart countries={countries} codes={codes} />
        </div>
        <div>
          <h5>Outgoing passengers by year</h5>
          <StackedBarChart dataset={dataset} countryCode={countryCode} codes={codes} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
