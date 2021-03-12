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
  AT: '#A5D6A7',
  BE: '#B3E5FC',
  BG: '#E57373',
  CH: '#81C784',
  CY: '#FFF176',
  CZ: '#BA68C8',
  DE: '#64B5F6',
  DK: '#DCE775',
  EE: '#FFB74D',
  EL: '#7986CB',
  ES: '#4DB6AC',
  FI: '#F06292',
  FR: '#4DD0E1',
  HR: '#FF8A65',
  HU: '#4FC3F7',
  IE: '#FFD54F',
  IS: '#AED581',
  IT: '#9575CD',
  LT: '#A1887F',
  LU: '#C62828',
  LV: '#2E7D32',
  ME: '#F9A825',
  MK: '#6A1B9A',
  MT: '#1565C0',
  NL: '#9E9D24',
  NO: '#EF6C00',
  PL: '#283593',
  PT: '#00695C',
  RO: '#AD1457',
  RS: '#00838F',
  SE: '#D84315',
  SI: '#0277BD',
  SK: '#FF8F00',
  TR: '#558B2F',
  UK: '#4527A0',
}
