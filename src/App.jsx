import Main from "./components/Main";
import Loading from "./components/Loading";
import Error from "./components/Error";
import useColorSet from "./hooks/useColorSet"
import useDatasets from "./hooks/useDatasets";

import "./App.css";

function App() {
  const [data, error] = useDatasets();
  const appStyle = {
    background: useColorSet("plane").background
  };

  return (
    <div className="App" style={appStyle}>
      {error ? <Error /> : data ? <Main datasets={data} /> : <Loading />}
    </div>
  );
}

export default App;
