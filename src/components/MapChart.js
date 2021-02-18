import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line
} from "react-simple-maps";
import geodata from "../geo.json";



const MapChart = ({datasets}) => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -40.0, 0],
        scale: 500
      }}
    >
      
      <Geographies geography={geodata}>
        {({ geographies }) =>
          geographies.map(geo => {
            debugger 
            return(
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#9998A3"
              stroke="#EAEAEC"
            />
          )})
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
  );
};

export default MapChart;