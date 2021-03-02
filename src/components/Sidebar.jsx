const Sidebar = ({ countries, transport, year }) => {
  debugger;
  return (
    /* Sample content */
    <div style={{ backgroundColor: "lightgrey", height: "100%" }}>
      <h1>{countries[0]?.geo.properties.NAME}</h1>
      <h3>{transport}</h3>
      <h3>{year}</h3>
      <h2>Connections</h2>
      {Object.keys(countries[0].data)
        .filter((x) => countries[0].data[x])
        .map((target) => (
          <div key={target}>{`${target}: ${countries[0].data[target]}`}</div>
        ))}
    </div>
    /* -------------- */
  );
};

export default Sidebar;
