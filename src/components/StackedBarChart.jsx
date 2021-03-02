import chroma from "chroma-js";

import { Bar } from "react-chartjs-2";
import { YEAR_OPTS } from "../constants";

const StackedBarChart = ({ dataset, countryCode }) => {
  const countries = Object.keys(dataset[YEAR_OPTS[0].value]);
  const colors = chroma
    .scale(["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(75, 192, 192)"])
    .mode("lch")
    .colors(countries.length);

  const datasets = countries.map((country, idx) => {
    const years = [];

    YEAR_OPTS.forEach(({ value }) => {
      years.push(dataset[value][countryCode][country]);
    });

    return {
      label: country,
      data: years,
      backgroundColor: colors[idx],
    }
  });

  const data = {
    labels: YEAR_OPTS.map((year) => year.value),
    datasets: datasets
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
