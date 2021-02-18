import MapChart from "./MapChart";

const Main = ({ datasets }) => {
  return(
    <div style={{height: "100vh", overflow: "hidden"}}>
      <MapChart datasets = {datasets}/>
      </div>

  )
}

export default Main;
