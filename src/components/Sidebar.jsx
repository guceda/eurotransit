import DoughnutChart from "./DoughnutChart";
import StackedBarChart from "./StackedBarChart";

const Sidebar = ({ countries, transport, year, dataset }) => {
  const countryName = countries[0]?.geo.properties.NAME;
  const countryCode = countries[0]?.ISO;
  const imgUrl = `https://www.countryflags.io/${countryCode}/flat/64.png`;
  return (
    <div style={{ backgroundColor: "lightgrey", height: "100%" }}>
      <img alt={countryName} src={imgUrl}></img>
      <h1>{countries[0]?.geo.properties.NAME}</h1>
      <div>
        <h2>Population: {countries[0]?.geo.properties.POP_EST}</h2>
        <h2>Passengers per 1M population:</h2>
      </div>
      <h2>Connections</h2>

      <StackedBarChart />
      <DoughnutChart countries={countries} />
    </div>
  );
};

export default Sidebar;
