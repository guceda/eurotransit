import { HorizontalBar } from "react-chartjs-2";
import { useCallback } from "react";
import data from "../../about.json";
import { COUNTRY_COLORS } from "../../constants";

import fabian from "../../assets/imgs/fabian.png";
import david from "../../assets/imgs/david.png";
import yan from "../../assets/imgs/yan.png";
import gonzalo from "../../assets/imgs/gonzalo.png";

const About = () => {
  const imgs = { fabian, david, yan, gonzalo };

  // const getContributionsData = useCallback(
  //   (contributions) => ({
  //     labels: Object.keys(contributions),
  //     datasets: [
  //       {
  //         label: `Contributions to the project`,
  //         data: Object.values(contributions),
  //         backgroundColor: (chart) =>
  //           Object.values(COUNTRY_COLORS)[chart.dataIndex],
  //         borderColor: (chart) =>
  //           Object.values(COUNTRY_COLORS)[chart.dataIndex],
  //         borderWidth: 1,
  //       },
  //     ],
  //   }),
  //   []
  // );

  // const options = {
  //   legend: {
  //     display: false,
  //     labels: {
  //       fontColor: "white",
  //     },
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };

  return (
    <div className="sidebar">
      <div className="countryNameContainer">
        <h2>Eurotransit team</h2>
      </div>
      <div className="sidebarContent">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            paddingLeft: "10px",
          }}
        >
          {data.people.map((person) => (
            <div key={person.name} className="people-container">
              <div>
                <div className="img-container">
                  <img alt="profile" src={imgs[person.image]} />
                </div>
                <div className="info-container">
                  <div className="name">{person.name}</div>
                  <div
                    className="mail"
                    onClick={() =>
                      (window.location = `mailto: ${person.email}`)
                    }
                  >
                    <u>{person.email}</u>
                  </div>
                </div>
              </div>
              {/* <HorizontalBar
              data={getContributionsData(person.contributions)}
              options={options}
            /> */}
            </div>
          ))}
          <div className="footer">
            Made thanks to React.js and Chart.js. Fork us on our Github
            repository.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
