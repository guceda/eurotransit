import MapChart from "./MapChart";
import Navbar from "./Navbar";
import {useState} from "react";

const Main = ({ datasets }) => {
  const [selectedTransport, setTransport] = useState("plane");
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Navbar selectedTransport = {selectedTransport} setTransport = {setTransport}/>
      <MapChart datasets={datasets} selectedTransport={selectedTransport}/>
    </div>
  );
};

export default Main;
