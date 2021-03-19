import React from "react";
import chroma from "chroma-js";
import useDatasetsLimits from "../hooks/useDatasetLimits";
import useColorSet from "../hooks/useColorSet";

import theme from "../../src/theme.json";


const Legend = ({ limits, transportation }) => {
    const [max, min] = limits
    const range = [theme.map[transportation].min, theme.map[transportation].max];
    const color_range = chroma.scale(range).domain([min, max]).colors(8);
    return (
        <div>
            <div className="legend">
                <div className="legend__colors">
                    {color_range.map((opt) => (
                        <div style={{ backgroundColor: opt, width: "50px", height: "20px" }}></div>
                    ))}
                </div>
                <div className="legend__description">
                    <div className="legend__text">{min} Passenger</div>
                    <div className="legend__text">{(max/1000000).toFixed(2)}M Passengers</div>
                </div>
            </div>
        </div>
    );
};

export default Legend;