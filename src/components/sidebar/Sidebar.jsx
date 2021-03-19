import DoughnutChart from "./DoughnutChart";
import StackedBarChart from "./StackedBarChart";

const Sidebar = ({ countries, dataset, codes, year, transport }) => {
  // Do not render if coming from About without any country selected
  if(countries.length === 0) return false;

  const countryInfo = countries[0]?.geo.properties;
  const countryCode = countries[0]?.ISO;
  const cc = countryCode === 'UK' ? 'GB' : countryCode;
  const imgUrl = `https://www.countryflags.io/${cc}/flat/64.png`;
  const total = Object.values(countries[0].data).reduce((acc, amount) => {
    return (acc += amount);
  }, 0);
  
  function ShowDoughnutChart() {
    return (year === 2020 && transport === 'train') ?
      <p className="notAvailable">No data available for train trips in 2020</p> :
      <DoughnutChart countries={countries} codes={codes} />
  }

  return (
    <div className="sidebar">
      <div className="countryNameContainer">
        <img alt={countryInfo.NAME} src={imgUrl}></img>
        <h2>{countries[0]?.geo.properties.NAME}</h2>
      </div>
      <div className="sidebarContent">
        <div className="indicatorContainer">
          <div>
            <h2>{(countryInfo.POP_EST / 1000000).toFixed(2)}M</h2>
            <p>
              Population
            </p>
          </div>
          <div className="indicator">
            <h2>{(total/1000000).toFixed(2)}M</h2>
            <p>
              Outgoing passengers
            </p>
          </div>
        </div>
        <div>
          <h5>Outgoing passengers from {countryInfo.NAME}</h5>
          <ShowDoughnutChart />
        </div>
        <div>
          <h5>Outgoing passengers by year</h5>
          <StackedBarChart dataset={dataset} countryCode={countryCode} codes={codes} transport={transport} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
