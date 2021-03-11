export const BASE_URL =
  "https://raw.githubusercontent.com/dvcarrillo/eurotransit/dev/datasets/";

export const DATASETS = {
  train2020: "rail_passengers_2020_cleaned.csv",
  planes: "cleaned_planes.csv",
  train: "rail_trips_cleaned.csv",
  codes:"country_codes.csv",
};

export const TRANSPORT_OPTS = [
  { value: "plane", label: "Plane trips" },
  { value: "train", label: "Train trips" },
];

export const YEAR_OPTS = Array.from(
  { length: 2020 - 2004 + 1 },
  (_, i) => 2004 + i
).map((year) => ({
  value: year,
  label: year,
}));
