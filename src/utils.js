import { DATASETS } from "./constants";

export const formatData = (dataset) => {
  const [header, ...data] = dataset.content;
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

  const parseVal = (v) => (isNaN(Number(v)) ? null : Number(v));

  // Fill object;
  Object.keys(formated).forEach((year) => {
    const yearIdx = header.indexOf(year);

    data.forEach((row) => {
      if (row[destination] === undefined) return; // weird error in a ds;

      if (row[origin] in formated[year]) {
        formated[year][row[origin]][row[destination]] = parseVal(row[yearIdx]);
      } else {
        formated[year][row[origin]] = {
          [row[destination]]: parseVal(row[yearIdx]),
        };
      }
    });
  });

  return {
    content: formated,
    dataset: dataset.dataset,
  };
};

export const mergeDatasets = (datasets) => {
  const planes = datasets.find((ds) => ds.dataset === DATASETS.planes);
  const trainBig = datasets.find((ds) => ds.dataset === DATASETS.train);
  const train2020 = datasets.find((ds) => ds.dataset === DATASETS.train2020);

  return {
    plane: planes.content,
    train: { ...trainBig.content, ...train2020.content },
  };
};

export const formatDataSets = (datasets) => {
  const formated = datasets.map(formatData);
  const merged = mergeDatasets(formated);
  return merged;
};