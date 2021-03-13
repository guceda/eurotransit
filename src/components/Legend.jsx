import React from "react";
import chroma from "chroma-js";
import useDatasetsLimits from "../hooks/useDatasetLimits";

import theme from "../../src/theme.json";


const Legend = ({ dataset }) => {
    const [max, min] = useDatasetsLimits(dataset);
    const range = [theme.map.plane_trips.min, theme.map.plane_trips.max];
    const color_range = chroma.scale(range).domain([min, max]).colors(5);
    return (
        <div>
            <div className="legend">
                <div className="legend__colors">
                    {color_range.map((opt) => (
                        <div style={{ backgroundColor: opt, width: "40px", height: "20px" }}></div>
                    ))}
                </div>
                <div className="legend__description">
                    <div className="legend__text">[Min]</div>
                    <div className="legend__text">[Max]</div>
                </div>
            </div>
        </div>
    );
};

export default Legend;