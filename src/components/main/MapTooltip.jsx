import ReactTooltip from "react-tooltip";
import styled from "styled-components";

export const ReactTooltipStyled = styled(ReactTooltip)`
  &.type-dark.place-top {
    background-color: rgba(0, 0, 0, 0.85);
    padding: 0.3rem 1rem;
    border-radius: 0;
  }
`;

const MapTooltip = ({ country, link, transport, year }) => {
  const tooltipCountryContent = () => {
    const name = country?.geo.properties.NAME;
    if (!country.data) {
      return (
        <div>
          <h3>{name}</h3>
          <p>No data available</p>
        </div>
      );
    }
    const total = Object.values(country.data).reduce((acc, amount) => {
      return (acc += amount);
    }, 0);

    const population = (country.geo.properties.POP_EST / 1000000).toFixed(2);
    const passengers = (total / 1000000).toFixed(2);

    return (
      <div>
        <h3>{name}</h3>
        <p>
          Population: <b>{population}M</b>
        </p>
        <p>
          Total passengers leaving by {transport} in {year}:{" "}
          <b>{passengers}M</b>
        </p>
      </div>
    );
  };

  const tooltipLinkContent = () => {
    const { from, to, passengers } = link;
    debugger;
    return (
      <div>
        <p>
          From <b>{from.NAME}</b> to <b>{to.NAME}</b>
        </p>
        <p>
          Number of passengers: <b>{(passengers / 1000000).toFixed(2)}M</b>
        </p>
      </div>
    );
  };

  const getContent = () => {
    if (link) {
      return tooltipLinkContent();
    } else if (country) {
      return tooltipCountryContent();
    } else {
      return;
    }
  };

  return <ReactTooltipStyled>{getContent()}</ReactTooltipStyled>;
};

export default MapTooltip;
