
import { TeamMember, MaterialBalanceItem, Hotspot, CalculatorInputs } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Rounak Jhawar', role: 'Team Member', rollNo: 'BT24CME002' },
  { id: '2', name: 'Mayuresh Ughade', role: 'Team Member', rollNo: 'BT24CME005' },
  { id: '3', name: 'Arya Takwale', role: 'Team Member', rollNo: 'BT24CME007' },
  { id: '4', name: 'Ruchit Sonawane', role: 'Team Member', rollNo: 'BT24CME009' },
  { id: '5', name: 'Vidhi Shende', role: 'Team Member', rollNo: 'BT24CME016' },
  { id: '6', name: 'Nikhil Vijay', role: 'Team Member', rollNo: 'BT24CME088' },
  { id: '7', name: 'Pratham Sharma', role: 'Team Member', rollNo: 'BT24CME082' },
  { id: '8', name: 'Tanishk Pilania', role: 'Team Member', rollNo: 'BT24CME056' },
  { id: '9', name: 'Tanmay Sharma', role: 'Team Member', rollNo: 'BT24CME087' },
];

export const PROJECT_GUIDE = {
  name: 'Dr. Sachin A. Mandavgane',
  department: 'Chemical Engineering Department',
  institute: 'Visvesvaraya National Institute of Technology, Nagpur'
};

export const MATERIAL_BALANCE_DATA: MaterialBalanceItem[] = [
  { component: 'Acetanilide Production', massKg: 75000, kmol: 554.85 },
  { component: 'Acetic Acid Formation', massKg: 33320.26, kmol: 554.85 },
  { component: 'Aniline Required', massKg: 57414.645, kmol: 616.5 },
  { component: 'Acetic Anhydride Required', massKg: 62938.485, kmol: 616.5 },
  { component: 'Unreacted Aniline', massKg: 5741.46, kmol: 61.65 },
  { component: 'Unreacted Acetic Anhydride', massKg: 6293.84, kmol: 61.65 },
];

// Seeded from Page 22 of PDF (Aniline Storage to Reactor)
export const PRESET_P101: CalculatorInputs = {
  flowRate: 18.726, // m3/hr (Calculated from 19138 kg batch / 1022 density / 0.5hr? Normalized to hourly)
  density: 1022,
  viscosity: 3.7, // cP
  pipeDiameter: 77.9, // mm (3 inch Sch 40)
  pipeLength: 25,
  elevation: 4,
  roughness: 0.046, // Commercial Steel default
  elbows: 3,
  valves: 1,
  efficiency: 60
};

export const PFD_HOTSPOTS: Hotspot[] = [
  {
    id: 'T-101',
    x: 10,
    y: 15,
    label: 'T-101',
    description: 'Aniline Storage Tank',
    details: ['Material: Stainless Steel', 'Capacity: ~56.179 m³', 'Temp: Ambient', 'Feeds Reactor R-101']
  },
  {
    id: 'T-102',
    x: 25,
    y: 15,
    label: 'T-102',
    description: 'Acetic Anhydride Storage',
    details: ['Material: HDPE', 'Capacity: ~58.27 m³', 'Temp: Ambient', 'Corrosion Resistant']
  },
  {
    id: 'E-101',
    x: 17.5,
    y: 47.5,
    label: 'E-101',
    description: 'Preheater',
    details: ['Type: Shell & Tube', 'Heats mixture to reaction temp', 'Uses steam utility', 'Maintains 80°C']
  },
  {
    id: 'R-101',
    x: 17.5,
    y: 65.6,
    label: 'R-101',
    description: 'Batch Reactor',
    details: ['Type: Six Blade Pitched Turbine', 'Vol: ~36.5 m³', 'Reaction Time: 8 hrs', 'Temp: 80°C', 'Exothermic Reaction']
  },
  {
    id: 'F-101',
    x: 42.5,
    y: 45,
    label: 'F-101',
    description: 'Rotary Vacuum Filter',
    details: ['Separates solid crystals', 'Feed from Crystallizer', 'Filtrate to T-103', 'Wash Cycle included']
  },
  {
    id: 'CR-101',
    x: 42.5,
    y: 68.8,
    label: 'CR-101',
    description: 'Crystallizer',
    details: ['Cooling: 80°C → 30°C', 'Material: SS 316L', 'Residence Time: 8 hrs', 'Promotes Crystal Growth']
  },
  {
    id: 'D-101',
    x: 42.5,
    y: 26.3,
    label: 'D-101',
    description: 'Rotary Dryer',
    details: ['Temp: 80°C', 'Moisture Removal: 20%', 'Heat Duty: 17,372 MJ', 'Counter-current flow']
  },
  {
    id: 'T-103',
    x: 61.5,
    y: 45,
    label: 'T-103',
    description: 'Filtrate Tank',
    details: ['Collects Mother Liquor', 'Intermediate Storage', 'Feeds Distillation Column', 'Material: SS 304']
  },
  {
    id: 'DC-101',
    x: 84,
    y: 53.1,
    label: 'DC-101',
    description: 'Distillation Column',
    details: ['Separates Acetic Acid', 'Reboiler Duty: 5,850 MJ', 'Condenser Duty: 4,680 MJ', 'Recovers Aniline']
  },
  {
    id: 'T-104',
    x: 70,
    y: 16.3,
    label: 'T-104',
    description: 'Acetic Acid Storage',
    details: ['Recovered By-product', 'Purity: ~98%', 'Capacity: ~20 m³']
  },
  {
    id: 'T-105',
    x: 94,
    y: 31.3,
    label: 'T-105',
    description: 'Aniline Recovery',
    details: ['Recycled Aniline', 'From Distillation Bottoms', 'Recycled to Process']
  },
  {
    id: 'PRODUCT',
    x: 62.5,
    y: 16.3,
    label: 'Product Storage',
    description: 'Acetanilide Packaging',
    details: ['Final Product', 'Solid Crystals', 'Purity > 99%', 'Packaging: 25kg Bags']
  }
];
