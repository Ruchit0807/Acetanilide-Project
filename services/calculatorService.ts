
import { CalculatorInputs, CalculatorResults, YieldInputs, YieldResults } from '../types';

export const calculatePumpParams = (inputs: CalculatorInputs): CalculatorResults => {
  const {
    flowRate, // m3/hr
    density, // kg/m3
    viscosity, // cP
    pipeDiameter, // mm
    pipeLength, // m
    elevation, // m
    roughness, // mm
    elbows,
    valves,
    efficiency
  } = inputs;

  // 1. Unit Conversions
  const flowRateSI = flowRate / 3600; // m3/s
  const viscositySI = viscosity / 1000; // Pa.s
  const diameterSI = pipeDiameter / 1000; // m
  const roughnessSI = roughness / 1000; // m
  const gravity = 9.81; // m/s2

  // 2. Velocity Calculation
  const area = Math.PI * Math.pow(diameterSI / 2, 2);
  const velocity = flowRateSI / area;

  // 3. Reynolds Number
  // Re = (rho * v * D) / mu
  const reynolds = (density * velocity * diameterSI) / viscositySI;

  // 4. Friction Factor (Swamee-Jain Equation for full turbulent/transition range)
  let frictionFactor = 0;
  if (reynolds < 2000) {
    frictionFactor = 64 / reynolds; // Laminar
  } else {
    // Swamee-Jain approximation of Colebrook-White
    const a = roughnessSI / (3.7 * diameterSI);
    const b = 5.74 / Math.pow(reynolds, 0.9);
    frictionFactor = 0.25 / Math.pow(Math.log10(a + b), 2);
  }

  // 5. Head Loss Calculation (Darcy-Weisbach)
  // Minor losses (K values estimated)
  const K_elbow = 0.9 * elbows; // Standard 90 deg elbow
  const K_valve = 0.2 * valves; // Gate valve fully open
  const K_total = K_elbow + K_valve + 0.5 /* entrance */ + 1.0 /* exit */;
  
  const velocityHead = Math.pow(velocity, 2) / (2 * gravity);
  
  const majorHeadLoss = frictionFactor * (pipeLength / diameterSI) * velocityHead;
  const minorHeadLoss = K_total * velocityHead;
  const totalDynamicHeadLoss = majorHeadLoss + minorHeadLoss;

  const totalHead = elevation + totalDynamicHeadLoss;

  // 6. Power Calculation
  // P (Watts) = rho * g * Q * H
  const hydraulicPowerWatts = density * gravity * flowRateSI * totalHead;
  const hydraulicPowerKW = hydraulicPowerWatts / 1000;
  const brakePowerKW = hydraulicPowerKW / (efficiency / 100);

  // 7. Pressure Drop
  // Delta P = rho * g * h_f (approx)
  const pressureDropPa = density * gravity * totalDynamicHeadLoss;

  return {
    velocity: parseFloat(velocity.toFixed(3)),
    reynolds: parseFloat(reynolds.toFixed(0)),
    frictionFactor: parseFloat(frictionFactor.toFixed(5)),
    headLoss: parseFloat(totalDynamicHeadLoss.toFixed(3)),
    totalHead: parseFloat(totalHead.toFixed(3)),
    hydraulicPower: parseFloat(hydraulicPowerKW.toFixed(3)),
    brakePower: parseFloat(brakePowerKW.toFixed(3)),
    pressureDrop: parseFloat((pressureDropPa / 1000).toFixed(3)) // kPa
  };
};

export const calculateYield = (inputs: YieldInputs): YieldResults => {
  const MW_ANILINE = 93.13;
  const MW_ACETIC_ANHYDRIDE = 102.09;
  const MW_ACETANILIDE = 135.17;

  const { anilineMass, aceticAnhydrideMass, actualProductMass } = inputs;

  const molesAniline = anilineMass / MW_ANILINE;
  const molesAA = aceticAnhydrideMass / MW_ACETIC_ANHYDRIDE;

  // Stoichiometry is 1:1 for Aniline + Acetic Anhydride -> Acetanilide + Acetic Acid
  let limitingReactant = '';
  let theoreticalMoles = 0;

  if (molesAniline < molesAA) {
    limitingReactant = 'Aniline';
    theoreticalMoles = molesAniline;
  } else {
    limitingReactant = 'Acetic Anhydride';
    theoreticalMoles = molesAA;
  }

  const theoreticalYield = theoreticalMoles * MW_ACETANILIDE;
  const percentageYield = theoreticalYield > 0 ? (actualProductMass / theoreticalYield) * 100 : 0;

  // Atom Economy = (MW Desired Product / MW Total Reactants) * 100
  // Reaction: C6H5NH2 + (CH3CO)2O -> C6H5NHCOCH3 + CH3COOH
  const atomEconomy = (MW_ACETANILIDE / (MW_ANILINE + MW_ACETIC_ANHYDRIDE)) * 100;

  return {
    limitingReactant,
    theoreticalYield: parseFloat(theoreticalYield.toFixed(2)),
    percentageYield: parseFloat(percentageYield.toFixed(2)),
    atomEconomy: parseFloat(atomEconomy.toFixed(2))
  };
};
