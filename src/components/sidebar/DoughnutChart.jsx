import { Doughnut } from "react-chartjs-2";
import { COUNTRY_COLORS } from "../../constants";

const DoughnutChart = ({ countries, codes }) => {

  const filteredCountries = Object.keys(countries[0].data).filter(
    (x) => countries[0].data[x]
  );

  // Remove own country
  countries[0].data[countries[0].geo.properties.ISO_A2] = null;

  const data = {
    labels: filteredCountries.map(country => codes[country]),
    datasets: [
      {
        label: `Outgoing passengers from ${countries[0].geo.properties.NAME}`,
        data: Object.values(countries[0].data).filter((x) => x),
        datasetKeyProvider: () => countries[0].geo.properties.NAME, 
        backgroundColor: (chart) => COUNTRY_COLORS[filteredCountries[chart.dataIndex]],
        borderColor: (chart) => COUNTRY_COLORS[filteredCountries[chart.dataIndex]],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    legend: { display: false },
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
