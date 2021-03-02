import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ countries }) => {
  const filteredCountries = Object.keys(countries[0].data).filter(
    (x) => countries[0].data[x]
  );
  
  const data = {
    labels: filteredCountries,
    datasets: [
      {
        label: `Outgoing passengers from ${countries[0].geo.properties.NAME}`,
        data: Object.values(countries[0].data).filter((x) => x),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
