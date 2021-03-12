import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Line,
} from "react-simple-maps";
import geodata from "../../geo.json";
import theme from "../../theme.json";

const MapChart = ({
  dataset,
  colorSet,
  scale,
  limits,
  transport,
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
          rotate: [-15.0, -47.0, 0],
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
                    stroke={colorSet.background}
                    onClick={() => {
                      if (!dataset[geo.properties.ISO_A2]) return;
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
                          ? isSelected(geo)
                            ? colorSet.UIAccent
                            : scale(amount)
                          : colorSet.disabled,
                        opacity: 1,
                        outline: "none",
                        transition: "300ms",
                      },
                      hover: {
                        fill: dataset[geo.properties.ISO_A2]
                          ? colorSet.UIAccent
                          : colorSet.disabled,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: colorSet.UIAccent,
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

                        const originCoords = geo.geometry
                          .coordinates[0][0][0][0]
                          ? geo.geometry.coordinates[0][0]
                          : geo.geometry.coordinates[0];

                        const targetCoords = country?.geometry
                          .coordinates[0][0][0][0]
                          ? country?.geometry.coordinates[0][0]
                          : country?.geometry.coordinates[0];

                        if (!originCoords || !targetCoords) return false;

                        const [max, min] = limits;

                        const diff = max - min;

                        const originName = geo.properties.ISO_A2;
                        const targetName = country.properties.ISO_A2;
                        const passengers = dataset[originName][targetName];
                        const thickness = (passengers * 20) / diff;
                        const lineWidth = 
                            transport === "train"
                            ? thickness / 1.8
                            : thickness;

                        return (
                          <Line
                            key={target}
                            from={getCentroid(originCoords)}
                            to={getCentroid(targetCoords)}
                            stroke="#A379C9"
                            opacity={0.8}
                            strokeWidth={Math.min(Math.max(parseInt(lineWidth), 1), 30)}
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
