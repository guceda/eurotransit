import { Bar } from "react-chartjs-2";
import { YEAR_OPTS } from "../constants";
import chroma from "chroma-js";

const StackedBarChart = ({ countries }) => {

  // const filteredCountries = Object.keys(countries[0].data).filter(
  //   (x) => countries[0].data[x]
  // );

  // const colors = chroma
  //   .scale(["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(75, 192, 192)"])
  //   .mode("lch")
  //   .colors(filteredCountries.length);

  const data = {
    labels: YEAR_OPTS.map((year) => year.value),
    datasets: [
      {
        label: "# of Red Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "# of Blue Votes",
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "# of Green Votes",
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    legend: { display: false },
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };
  
  return <Bar options={options} data={data} />;
};

export default StackedBarChart;
