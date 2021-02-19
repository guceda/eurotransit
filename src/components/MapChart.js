import React from "react";
import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";
import geodata from "../geo.json";

const MapChart = ({ datasets }) => {
  console.log(datasets);
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
              const amount =  p ? Object.values(
                  datasets.plane[2014][geo.properties.ISO_A2]
                ).reduce((acc, v) => acc + v || 0, 0) : 0;

              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={amount && amount > 10000 ? "#9998A3" : "#EAEAEC"}
                  stroke="#EAEAEC"
                />
              );
            })
          }
        </Geographies>
        <Line
          from={[40.0457, 50.7128]}
          to={[19.3499, 48.0703]}
          stroke="#FF5533"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </ComposableMap>
    </div>
  );
};

export default MapChart;
