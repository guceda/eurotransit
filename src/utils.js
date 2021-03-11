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

const formatCC = (codesDataset) => {
  // eslint-disable-next-line no-unused-vars
  const [_trash, ...data] = codesDataset.content
  const formatted = Object.values(data).reduce((acc, country) => {
    acc[country[1]] = country[0];
    return acc;
  }, {});

  return { ...codesDataset, content: formatted };
};

export const mergeDatasets = (datasets) => {
  const planes = datasets.find((ds) => ds.dataset === DATASETS.planes);
  const trainBig = datasets.find((ds) => ds.dataset === DATASETS.train);
  const train2020 = datasets.find((ds) => ds.dataset === DATASETS.train2020);
  const codes = datasets.find((ds) => ds.dataset === DATASETS.codes);

  return {
    plane: planes.content,
    train: { ...trainBig.content, ...train2020.content },
    codes: codes.content,
  };
};

export const formatDataSets = (datasets) => {
  const countryCodes = datasets.filter((x) => x.dataset === DATASETS.codes);
  const rest = datasets.filter((x) => x.dataset !== DATASETS.codes);
  const formated = rest.map(formatData);
  const countryCodesFormatted = formatCC(...countryCodes);
  const all = [countryCodesFormatted, ...formated];
  const merged = mergeDatasets(all);
  return merged;
};
