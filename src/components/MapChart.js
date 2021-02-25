import React from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import geodata from "../geo.json";

const MapChart = ({ dataset, scale, selectedCountries, setHoveredCountry, setSelected }) => {
  const getAcc = (data) => {
    const amount = data
      ? Object.values(data).reduce((acc, v) => acc + v || 0, 0)
      : 0;
    return amount;
  };

  return (
    <div className="map-chart">
      <ComposableMap
        data-tip=""
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-20.0, -40.0, 0],
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
                      setSelected([
                        {
                          geo,
                          ISO: geo.properties.ISO_A2,
                          data: dataset[geo.properties.ISO_A2],
                        },
                      ]);
                    }}
                    onMouseEnter = {() => {
                      setHoveredCountry({
                        geo,
                        ISO: geo.properties.ISO_A2,
                        data: dataset[geo.properties.ISO_A2],
                      });
                    }}
                    onMouseLeave = {() => {
                      setHoveredCountry(null);
                    }}
                    style={{
                      default: {
                        fill: scale(amount),
                        opacity: 1,
                        outline: "none",
                      },
                      hover: {
                        fill: "#0e755d",
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
