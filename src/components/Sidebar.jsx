import {Doughnut} from 'react-chartjs-2';
import DoughnutChart from './DoughnutChart';
import StackedBarChart from './StackedBarChart';

const Sidebar = ({ countries, transport, year, dataset}) => {
  return (
    /* Sample content */
    <div style={{ backgroundColor: "lightgrey", height: "100%" }}>

      <h1>{countries[0] ?.geo.properties.NAME}</h1>
      <div>
        <h2>Population: {countries[0]?.geo.properties.POP_EST}</h2>
        <h2>Passengers per 1M population:</h2>
      </div>
      <h2>Connections</h2>
      
<StackedBarChart />
<DoughnutChart countries={countries} />
    </div>
    /* -------------- */
  );
};

export default Sidebar;
