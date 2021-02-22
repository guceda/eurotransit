import React from "react";
import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";
import geodata from "../geo.json";

const getCentroid = (data) => {
  if(!data) return [0, 0];
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

const MapChart = ({ datasets, setSelected, selectedCountries }) => {

  const isSelected = (geo) =>
    selectedCountries?.find((c) => c.ISO === geo.properties.ISO_A2);

  const isTarget = (geo) => {
    const val = selectedCountries[0] && selectedCountries[0].data[geo.properties.ISO_A2];
    return !!val ;
  }

  return (
    <div style={{ width: "100vw" }}>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-20.0, -40.0, 0],
          scale: 500,
        }}
      >
        <Geographies geography={geodata}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const p = datasets.plane[2015][geo.properties.ISO_A2];
              const amount = p
                ? Object.values(
                    datasets.plane[2014][geo.properties.ISO_A2]
                  ).reduce((acc, v) => acc + v || 0, 0)
                : 0;
              return (
                <React.Fragment key={geo.rsmKey}>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#EAEAEC"
                    onClick={() => {
                      setSelected([
                        {
                          geo,
                          ISO: geo.properties.ISO_A2,
                          data: datasets.plane[2014][geo.properties.ISO_A2],
                        },
                      ]);
                    }}
                    style={{
                      default: {
                        fill: isSelected(geo)
                          ? "#E42"
                          : (isTarget(geo) ? '#FFAA98' : "#EAEAEC"),
                        opacity: 1,
                        outline: "none",
                      },
                      hover: {
                        fill: isSelected(geo) ? "#E42" : "salmon",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                </React.Fragment>
              );
            })
          }
        </Geographies>
        {/* <Geographies geography={geodata}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                isSelected(geo) &&
                selectedCountries.map((country) => {
                  return Object.keys(country.data).map((target) => {
                    const country = geographies.find(
                      (g) => g.properties.ISO_A2 === target
                    );
                    const coords = country?.geometry.coordinates[0];
                    return (
                      <Line
                        key={target}
                        from={getCentroid(geo.geometry.coordinates[0])}
                        to={getCentroid(coords)}
                        stroke="#FF5533"
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
        </Geographies> */}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
