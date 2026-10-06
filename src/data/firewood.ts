export type FirewoodSeasonId = 'short' | 'medium' | 'long';
export type FirewoodFireplaceId =
  | 'open'
  | 'stove'
  | 'insert'
  | 'efficiency';
export type FirewoodTemperatureId = 'cool' | 'comfort' | 'warm' | 'hot';

export type FirewoodOption<T extends string> = {
  id: T;
  label: string;
  factor: number;
};

export type FirewoodInputs = {
  area: number;
  seasonId: FirewoodSeasonId;
  fireplaceId: FirewoodFireplaceId;
  temperatureId: FirewoodTemperatureId;
};

export type FirewoodEstimate = {
  exact: number;
  rangeLow: number;
  rangeHigh: number;
  rangeLabel: string;
  seasonLabel: string;
  fireplaceLabel: string;
  temperatureLabel: string;
  area: number;
};

export const FIREWOOD_COPY = {
  header: 'Firewood Calculator',
  description:
    'Estimate your seasonal firewood needs by selecting the heating season length, your fireplace type, and your desired indoor temperature.',
  areaLabel: 'Room Area (m²)',
  areaPlaceholder: 'Enter area (10–300)',
  seasonLabel: 'Season Duration',
  fireplaceLabel: 'Fireplace Type',
  temperatureLabel: 'Desired Indoor Temperature',
  selectPlaceholder: 'Select an option',
  calculateHint: 'Select all options to enable calculation',
  note:
    'This is an estimate. Actual firewood use depends on home insulation, wood moisture, fireplace efficiency, outdoor temperature, and frequency of use.',
};

export const FIREWOOD_AREA_MIN = 10;
export const FIREWOOD_AREA_MAX = 300;

export const FIREWOOD_SEASONS: FirewoodOption<FirewoodSeasonId>[] = [
  {id: 'short', label: 'Short season: 1–2 months', factor: 0.05},
  {id: 'medium', label: 'Medium season: 3–4 months', factor: 0.1},
  {id: 'long', label: 'Long season: 5–6 months', factor: 0.15},
];

export const FIREWOOD_FIREPLACES: FirewoodOption<FirewoodFireplaceId>[] = [
  {id: 'open', label: 'Open fireplace', factor: 1.4},
  {id: 'stove', label: 'Traditional wood stove', factor: 1.0},
  {id: 'insert', label: 'Closed fireplace insert', factor: 0.75},
  {id: 'efficiency', label: 'High-efficiency fireplace', factor: 0.6},
];

export const FIREWOOD_TEMPERATURES: FirewoodOption<FirewoodTemperatureId>[] = [
  {id: 'cool', label: '16–18°C', factor: 0.8},
  {id: 'comfort', label: '19–21°C', factor: 1.0},
  {id: 'warm', label: '22–24°C', factor: 1.2},
  {id: 'hot', label: '25°C or higher', factor: 1.4},
];

export function parseRoomArea(value: string): number | null {
  const trimmed = value.trim().replace(',', '.');
  if (!trimmed) {
    return null;
  }
  const area = Number(trimmed);
  if (!Number.isFinite(area)) {
    return null;
  }
  if (area < FIREWOOD_AREA_MIN || area > FIREWOOD_AREA_MAX) {
    return null;
  }
  return area;
}

function findOption<T extends string>(
  options: FirewoodOption<T>[],
  id: T,
): FirewoodOption<T> {
  const match = options.find(option => option.id === id);
  if (!match) {
    throw new Error(`Unknown firewood option: ${id}`);
  }
  return match;
}

function formatCubicMeters(value: number): string {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return value.toFixed(1).replace(/\.0$/, '');
}

export function calculateFirewood(inputs: FirewoodInputs): FirewoodEstimate {
  const season = findOption(FIREWOOD_SEASONS, inputs.seasonId);
  const fireplace = findOption(FIREWOOD_FIREPLACES, inputs.fireplaceId);
  const temperature = findOption(FIREWOOD_TEMPERATURES, inputs.temperatureId);

  const exact =
    inputs.area * season.factor * fireplace.factor * temperature.factor;

  let rangeLow = Math.floor(exact);
  let rangeHigh = Math.ceil(exact);

  if (rangeLow === rangeHigh) {
    rangeHigh = rangeLow + 1;
  }
  if (rangeLow < 1) {
    rangeLow = 1;
  }
  if (rangeHigh < rangeLow) {
    rangeHigh = rangeLow;
  }

  const rangeLabel =
    rangeLow === rangeHigh
      ? formatCubicMeters(rangeLow)
      : `${rangeLow}–${rangeHigh}`;

  return {
    exact: Math.round(exact * 10) / 10,
    rangeLow,
    rangeHigh,
    rangeLabel,
    seasonLabel: season.label,
    fireplaceLabel: fireplace.label,
    temperatureLabel: temperature.label,
    area: inputs.area,
  };
}
