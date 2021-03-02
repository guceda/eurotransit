
const Sidebar = ({countries, transport, year}) => {

  return (
    /* Sample content */
    <div style = {{backgroundColor: 'lightgrey', height: '100%'}}>
      {countries[0]?.geo.properties.NAME}
      <p>{transport}</p>
      <p>{year}</p>
    </div>
    /* -------------- */
  );
};

export default Sidebar;

