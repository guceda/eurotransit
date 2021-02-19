import { format } from "d3";

export const formatData = (dataset) => {
  const [header, ...data] = dataset;
  const meta = ["origin", "destination"];

  // Locate origin and destination columns;
  const origin = header.indexOf(meta[0]);
  const destination = header.indexOf(meta[1]);
  
  // Locate years
  const years = header.filter((x) => !meta.includes(x));
  
  // Create object with the available years;
  const formated = years.reduce((acc, year) => {
    acc[year] = {};
    return acc;
  }, {});
  
  const parseVal = (v) => isNaN(Number(v)) ? null : Number(v);

  // Fill object;
  Object.keys(formated).forEach((year) => {
    const yearIdx = header.indexOf(year);

    data.forEach((row) => {
      if(row === [""]) return; // weird error in a ds;

      if(row[origin] in formated[year]) {
        formated[year][row[origin]][row[destination]] = parseVal(row[yearIdx]);
      } else {
        formated[year][row[origin]] = {
          [row[destination]]: parseVal(row[yearIdx]) ,
        };
      }
      
    });
  });

  return formated;
};

export const formatDataSets = (datasets) => {
  return datasets.map(formatData);
};
