import {Doughnut} from 'react-chartjs-2';
import DoughnutChart from './DoughnutChart';
import StackedBarChart from './StackedBarChart';

const Sidebar = ({ countries, transport, year, dataset}) => {
  return (
    /* Sample content */
    <div style={{ backgroundColor: "lightgrey", height: "100%" }}>
      <h1>{countries[0] ?.geo.properties.NAME}</h1>
      <span>{transport}</span>
      <span>{year}</span>
      <h2>Connections</h2>
      
<StackedBarChart />
<DoughnutChart countries={countries} />
    </div>
    /* -------------- */
  );
};

export default Sidebar;
