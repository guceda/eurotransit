import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Line,
} from "react-simple-maps";
import geodata from "../../geo.json";

const MapChart = ({
  dataset,
  scale,
  selectedCountries,
  setHoveredCountry,
  setSelected,
}) => {
  const getAcc = (data) => {
    const amount = data
      ? Object.values(data).reduce((acc, v) => acc + v || 0, 0)
      : 0;
    return amount;
  };

  const isSelected = (geo) =>
    selectedCountries?.find((c) => c.ISO === geo.properties.ISO_A2);

  const getCentroid = (data) => {
    if (!data) return [0, 0];
    const sum = data.reduce(
      (acc, coord) => {
        acc.x += coord[0];
        acc.y += coord[1];
        return acc;
      },
      { x: 0, y: 0 }
    );
    return [sum.x / data.length, sum.y / data.length];
  };

  return (
    <div className="map-chart">
      <ComposableMap
        data-tip=""
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-15.0, -30.0, 0],
          scale: 500,
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geodata}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const amount = getAcc(dataset[geo.properties.ISO_A2]);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#EAEAEC"
                    onClick={() => {
                      if(!dataset[geo.properties.ISO_A2]) return
                      setSelected([
                        {
                          geo,
                          ISO: geo.properties.ISO_A2,
                          data: dataset[geo.properties.ISO_A2],
                        },
                      ]);
                    }}
                    onMouseEnter={() => {
                      setHoveredCountry({
                        geo,
                        ISO: geo.properties.ISO_A2,
                        data: dataset[geo.properties.ISO_A2],
                      });
                    }}
                    onMouseLeave={() => {
                      setHoveredCountry(null);
                    }}
                    style={{
                      default: {
                        fill: dataset[geo.properties.ISO_A2]
                          ? ( isSelected(geo) ? '#0e755d' : scale(amount))
                          : "#1a1a1a",
                        opacity: 1,
                        outline: "none",
                      },
                      hover: {
                        fill: dataset[geo.properties.ISO_A2]
                        ? "#0e755d"
                        : "#1a1a1a",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          <Geographies geography={geodata}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  isSelected(geo) &&
                  selectedCountries.map((country) => {
                    return Object.keys(country.data)
                      .filter((x) => country.data[x])
                      .map((target) => {
                        const country = geographies.find(
                          (g) => g.properties.ISO_A2 === target
                        );
                        const originCoords = geo.geometry.coordinates[0][0][0][0] ? geo.geometry.coordinates[0][0] : geo.geometry.coordinates[0];
                        const targetCoords = country?.geometry.coordinates[0][0][0][0] ? country?.geometry.coordinates[0][0] : country?.geometry.coordinates[0];
                        
                        if(!originCoords || !targetCoords) return false;
                        return (
                          <Line
                            key={target}
                            from={getCentroid(originCoords)}
                            to={getCentroid(targetCoords)}
                            stroke="rgb(75, 192, 192)"
                            strokeWidth={2}
                            opacity={0.5}
                            strokeLinecap="round"
                          />
                        );
                      });
                  })
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;