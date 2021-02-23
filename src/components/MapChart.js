import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import geodata from "../geo.json";

const MapChart = ({ dataset, scale, selectedTransport, selectedYear }) => {
  
  const getAcc = (data) => {
    const amount = data
      ? Object.values(data).reduce((acc, v) => acc + v || 0, 0)
      : 0;
    return amount;
  };

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
              const amount = getAcc(dataset[geo.properties.ISO_A2]);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={scale(amount)}
                  stroke="#EAEAEC"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
