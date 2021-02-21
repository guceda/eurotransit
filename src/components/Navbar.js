import React from 'react';

const Navbar = ({selectedTransport, setTransport}) => {
    return (
        <div className="navbar">
            <div className="tab">
                <button className={selectedTransport == "plane" ? "tab-active" : "tab-btn"} onClick={() => setTransport("plane")}>Flight</button>
                <button className={selectedTransport == "train" ? "tab-active" : "tab-btn"} onClick={() => setTransport("train")}>Train</button>
                <button className="tab-btn">About</button>
            </div>
        </div>
    );
};

export default Navbar;
