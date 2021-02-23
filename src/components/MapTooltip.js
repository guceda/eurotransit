import ReactTooltip from "react-tooltip";

const MapTooltip = ({country, transport, year}) => {

  const tootipContent = () => {
    if (!country) return;
    const name = country?.geo.properties.NAME;
    if (!country.data) {
      return (<p>
        <h3>{name}</h3>
        <p>No data available</p>
        </p>)
    }
    const total = Object.values(country.data).reduce((acc, amount) => {
      return (acc += amount);
    }, 0);

    const population = (country.geo.properties.POP_EST / 1000000).toFixed(2);
    const passengers = (total / 1000).toFixed(2);

    return <p>
      <h3>{name}</h3>
      <p>Population: <b>{population}M</b></p>
      <p>Total passengers by {transport} in {year}: <b>{passengers}M</b></p>
    </p>
  };

  return (<ReactTooltip>{tootipContent()}</ReactTooltip>)
};

export default MapTooltip;
