
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  rollNo: string;
}

export interface MaterialBalanceItem {
  component: string;
  massKg: number;
  kmol: number;
}

export interface CalculatorInputs {
  flowRate: number; // m3/hr
  density: number; // kg/m3
  viscosity: number; // cP
  pipeDiameter: number; // mm
  pipeLength: number; // m
  elevation: number; // m
  roughness: number; // mm
  elbows: number;
  valves: number;
  efficiency: number; // %
}

export interface CalculatorResults {
  velocity: number; // m/s
  reynolds: number;
  frictionFactor: number;
  headLoss: number; // m
  totalHead: number; // m
  hydraulicPower: number; // kW
  brakePower: number; // kW
  pressureDrop: number; // kPa
}

export interface YieldInputs {
  anilineMass: number; // kg
  aceticAnhydrideMass: number; // kg
  actualProductMass: number; // kg
}

export interface YieldResults {
  limitingReactant: string;
  theoreticalYield: number; // kg
  percentageYield: number; // %
  atomEconomy: number; // %
}

export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;
  description: string;
  details: string[];
}
