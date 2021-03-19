import data from "../../about.json";

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
        <h2>About</h2>
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
          <h3>Eurotransit team</h3>
          {data.people.map((person) => (
            <div key={person.name} className="people-container">
              <div>
                <div className="img-container">
                  <img alt="profile" src={imgs[person.image]} />
                </div>
                <div className="info-container">
                  <div className="name">{person.name}</div>
                  <a className="mail link" href={`mailto: ${person.email}`}>
                    <u>{person.email}</u>
                  </a>
                </div>
              </div>
              {/* <HorizontalBar
              data={getContributionsData(person.contributions)}
              options={options}
            /> */}
            </div>
          ))}
          <h3>Description</h3>
          <div className="text">
            Travelling within the European Union has become a major part of
            citizen’s lives. With more and more routes and connections being
            available, it has become very easy for people to travel from and to
            different countries. Eurotransit is an interactive web application
            that visualizes this air and rail passenger data between EU
            countries. The goal of this project not only was to explore
            different correlations and relationships among states within the
            European Union in regard to travel preferences but also to display
            changes in international passenger flows over the course of the last
            couple of years.
          </div>
          <h3>Data provenance</h3>
          <div className="text">
            <ul>
              <li>
                <a
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                  href="https://ec.europa.eu/eurostat/databrowser/view/avia_paocc/default/table?lang=en"
                >
                  Air passenger transport
                </a>
              </li>
              <li>
                <a
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                  href="https://ec.europa.eu/eurostat/databrowser/view/rail_pa_intgong/default/table?lang=en"
                >
                  Rail passenger transport
                </a>
              </li>
              <li>
                <a
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                  href="https://ec.europa.eu/eurostat/databrowser/view/rail_pa_quartal/default/table?lang=en"
                >
                  Rail passenger transport 2020
                </a>
              </li>
            </ul>
          </div>
          <h3>Third party libraries</h3>
          <div className="text">
            <span>Made thanks to </span>
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://reactjs.org/"
            >
              React.js
            </a>
            <span>, </span>
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://www.chartjs.org/docs/latest/"
            >
              Chart.js
            </a>
            <span> and </span>
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://www.react-simple-maps.io/"
            >
              React Simple Maps
            </a>
            .<span>Fork us on our </span>
          </div>
          <h3>Our repo</h3>
          <div className="text">
            <span>Fork us on our </span>
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/dvcarrillo/eurotransit"
            >
              Github repository.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
