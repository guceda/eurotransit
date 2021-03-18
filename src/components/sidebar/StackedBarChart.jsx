
import { Bar } from "react-chartjs-2";
import { YEAR_OPTS } from "../../constants";
import { COUNTRY_COLORS } from "../../constants";

const StackedBarChart = ({ dataset, countryCode, codes, transport }) => {
  const countries = Object.keys(dataset[YEAR_OPTS[0].value]);

  const datasets = countries.map((country, idx) => {

    const years = [];

    YEAR_OPTS.forEach(({ value }) => {

      // Remove own country
      if (country === countryCode) return;

      if (dataset?.[value]?.[countryCode]?.[country]) {
        years.push(dataset[value][countryCode][country]);
      }
    });

    return {
      key: `${country}-${idx}`,
      label: codes[country],
      data: years,
      backgroundColor: COUNTRY_COLORS[country],
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
          gridLines: {
            color: '#404040'
          },
          stacked: true,
          ticks: {
            callback: function (value, index, values) {
              if((value / 1000000) >= 1) return `${value / 1000000}M`;
              else return `${value / 1000}K`;
            },
            beginAtZero: true,
            fontColor: "lightgrey"
          },
          scaleLabel: {
            display: false,
            labelString: 'number of passengers',
            fontColor: "lightgrey"
          }
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: '#404040'
          },
          stacked: true,
          ticks: {
            fontColor: "lightgrey"
          },
        },
      ],
    },
  };

  return <Bar options={options} data={data} />;
};

export default StackedBarChart;
