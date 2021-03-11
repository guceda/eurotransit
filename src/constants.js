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


export const COUNTRY_COLORS = {
  AT: '#1f9aff',
  BE: '#ff1f80',
  BG: '#23de90',
  CH: '#8e42ff',
  CY: '#ffc042',
  CZ: '#42c0ff',
  DE: '#ff4242',
  DK: '#99ff99',
  EE: '#ff99f5',
  EL: '#ffff99',
  ES: '#99fff0',
  FI: '#ff99b8',
  FR: '#2ca346',
  HR: '#a3622c',
  HU: '#7567e0',
  IE: '#1e79c9',
  IS: '#c91e5a',
  IT: '#5ac91e',
  LT: '#1e40c9',
  LU: '#fae848',
  LV: '#f448fa',
  ME: '#470063',
  MK: '#FFBC42',
  MT: '#218380',
  NL: '#D81159',
  NO: '#A3D9FF',
  PL: '#F2E94E',
  PT: '#A36D90',
  RO: '#FF6B35',
  RS: '#004E89',
  SE: '#00FDDC',
  SI: '#FF5666',
  SK: '#ADC698',
  TR: '#57467B',
  UK: '#5438DC',
}
