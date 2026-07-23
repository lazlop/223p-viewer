// Small QUDT unit local-name -> display symbol lookup. Falls back to the raw
// local name (e.g. "FT3-PER-MIN") for anything not listed here rather than
// trying to cover the entire QUDT unit vocabulary.
const UNIT_SYMBOLS: Record<string, string> = {
  DEG_F: "°F",
  DEG_C: "°C",
  K: "K",
  PERCENT: "%",
  PSI: "psi",
  LUX: "lx",
  "FT3-PER-MIN": "CFM",
  "M3-PER-SEC": "m³/s",
  NUM: "",
  W: "W",
  KiloW: "kW",
  V: "V",
  A: "A",
  HZ: "Hz",
  PA: "Pa",
};

export function unitSymbol(unitLocalName: string): string {
  return UNIT_SYMBOLS[unitLocalName] ?? unitLocalName;
}
