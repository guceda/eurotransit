import React from "react";
import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";
import geodata from "../geo.json";

const MapChart = ({ datasets, selectedTransport, selectedYear }) => {
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
              const p = datasets.[selectedTransport][selectedYear][geo.properties.ISO_A2];
              const amount =  p ? Object.values(
                  datasets.[selectedTransport][selectedYear][geo.properties.ISO_A2]
                ).reduce((acc, v) => acc + v || 0, 0) : 0;

                console.log(amount);
              return (
            
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill = {(amount > 10000000) ? "#11987F" : ((amount > 300000) ? "#14B89A" : "#323232")}
                  stroke="#EAEAEC"
                />
              );
            })
          }
        </Geographies>
        <Line
         /* from={[40.0457, 50.7128]}
          to={[19.3499, 48.0703]}
          stroke="#FF5533"
          strokeWidth={2}
          strokeLinecap="round"*/
        />
      </ComposableMap>
    </div>
  );
};

export default MapChart;
