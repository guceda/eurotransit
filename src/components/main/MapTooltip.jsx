import ReactTooltip from "react-tooltip";
import styled from 'styled-components';

export const ReactTooltipStyled = styled(ReactTooltip)`
  &.type-dark.place-top {
    background-color: rgba(0, 0, 0, 0.85);
    padding: 0.3rem 1rem;
    border-radius: 0;
  }
`;


const MapTooltip = ({ country, transport, year }) => {
  const tootipContent = () => {
    if (!country) return;
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
    const passengers = transport === 'train' ? total : (total / 1000000).toFixed(2);

    return (
      <div>
        <h3>{name}</h3>
        <p>
          Population: <b>{population}M</b>
        </p>
        <p>
          Total passengers leaving by {transport} in {year}:{" "}
          <b>{passengers}{transport === 'plane' ? 'M' : ''}</b>
        </p>
      </div>
    );
  };

  return <ReactTooltipStyled>{tootipContent()}</ReactTooltipStyled>;
};

export default MapTooltip;
