
import React, { useState } from 'react';
import { Settings, RotateCcw, Info, Play, FlaskConical, Activity } from 'lucide-react';
import { PRESET_P101 } from '../constants';
import { calculatePumpParams, calculateYield } from '../services/calculatorService';
import { CalculatorInputs, CalculatorResults, YieldInputs, YieldResults } from '../types';

type CalculatorMode = 'pump' | 'yield';

const Calculator: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>('pump');

  // Pump State
  const [pumpInputs, setPumpInputs] = useState<CalculatorInputs>(PRESET_P101);
  const [pumpResults, setPumpResults] = useState<CalculatorResults | null>(null);

  // Yield State
  const [yieldInputs, setYieldInputs] = useState<YieldInputs>({
    anilineMass: 100,
    aceticAnhydrideMass: 120,
    actualProductMass: 130
  });
  const [yieldResults, setYieldResults] = useState<YieldResults | null>(null);

  const handlePumpCalculate = () => {
    try {
      const calculated = calculatePumpParams(pumpInputs);
      setPumpResults(calculated);
    } catch (e) {
      console.error("Calculation error", e);
    }
  };

  const handleYieldCalculate = () => {
    try {
      const calculated = calculateYield(yieldInputs);
      setYieldResults(calculated);
    } catch (e) {
      console.error("Calculation error", e);
    }
  };

  const handlePumpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPumpInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleYieldInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setYieldInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const resetPumpPreset = () => {
    setPumpInputs(PRESET_P101);
    setPumpResults(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Engineering Calculator
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Select a tool below to perform design calculations or reaction analysis.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 inline-flex">
            <button
              onClick={() => setMode('pump')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                mode === 'pump'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              <Activity size={18} />
              Pump Design
            </button>
            <button
              onClick={() => setMode('yield')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                mode === 'yield'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-navy-900 hover:bg-slate-50'
              }`}
            >
              <FlaskConical size={18} />
              Reaction Yield
            </button>
          </div>
        </div>

        {mode === 'pump' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Inputs Section */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
              <div className="bg-navy-900 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Settings size={18} className="text-teal-400" />
                  Pump Parameters
                </h3>
                <button 
                  onClick={resetPumpPreset}
                  className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded hover:bg-teal-500/30 transition-colors flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  Reset to P-101
                </button>
              </div>
              
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
                <InputGroup label="Flow Rate (m³/hr)" name="flowRate" value={pumpInputs.flowRate} onChange={handlePumpInputChange} />
                <InputGroup label="Density (kg/m³)" name="density" value={pumpInputs.density} onChange={handlePumpInputChange} />
                <InputGroup label="Viscosity (cP)" name="viscosity" value={pumpInputs.viscosity} onChange={handlePumpInputChange} />
                <InputGroup label="Pipe Diameter (mm)" name="pipeDiameter" value={pumpInputs.pipeDiameter} onChange={handlePumpInputChange} />
                <InputGroup label="Pipe Length (m)" name="pipeLength" value={pumpInputs.pipeLength} onChange={handlePumpInputChange} />
                <InputGroup label="Elevation Change (m)" name="elevation" value={pumpInputs.elevation} onChange={handlePumpInputChange} />
                <InputGroup label="Roughness (mm)" name="roughness" value={pumpInputs.roughness} onChange={handlePumpInputChange} />
                <InputGroup label="Pump Efficiency (%)" name="efficiency" value={pumpInputs.efficiency} onChange={handlePumpInputChange} />
                
                <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-6">
                  <InputGroup label="No. of Elbows (90°)" name="elbows" value={pumpInputs.elbows} onChange={handlePumpInputChange} />
                  <InputGroup label="No. of Valves" name="valves" value={pumpInputs.valves} onChange={handlePumpInputChange} />
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                <button
                  onClick={handlePumpCalculate}
                  className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-lg font-bold transition-colors shadow-sm hover:shadow"
                >
                  <Play size={20} fill="currentColor" />
                  Calculate Pump Parameters
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
              <div className="bg-teal-600 px-6 py-4 border-b border-teal-500">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Info size={18} className="text-white" />
                  Results
                </h3>
              </div>

              {pumpResults ? (
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Velocity" value={pumpResults.velocity} unit="m/s" />
                    <ResultCard label="Reynolds Number" value={pumpResults.reynolds} unit="" />
                    <ResultCard label="Friction Factor" value={pumpResults.frictionFactor} unit="" />
                    <ResultCard label="Pressure Drop" value={pumpResults.pressureDrop} unit="kPa" />
                  </div>

                  <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Power Requirements</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="text-slate-700">Total Dynamic Head (TDH)</span>
                        <span className="text-xl font-bold text-navy-900">{pumpResults.totalHead} <span className="text-sm font-normal text-slate-500">m</span></span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="text-slate-700">Hydraulic Power</span>
                        <span className="text-xl font-bold text-navy-900">{pumpResults.hydraulicPower} <span className="text-sm font-normal text-slate-500">kW</span></span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Brake Power (Motor)</span>
                        <span className="text-2xl font-bold text-amber-500">{pumpResults.brakePower} <span className="text-sm font-normal text-slate-500">kW</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 min-h-[400px]">
                    <Activity size={48} className="mb-4 opacity-50" />
                    <p>Enter parameters and click Calculate</p>
                 </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Yield Inputs */}
             <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
              <div className="bg-navy-900 px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <FlaskConical size={18} className="text-teal-400" />
                  Reaction Stoichiometry
                </h3>
              </div>
              
              <div className="p-6 space-y-6 flex-grow">
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-bold text-teal-800 mb-2">Reaction Equation</h4>
                    <p className="text-teal-900 font-mono text-sm overflow-x-auto whitespace-nowrap">
                        C₆H₅NH₂ + (CH₃CO)₂O  →  C₆H₅NHCOCH₃ + CH₃COOH
                    </p>
                    <div className="mt-2 flex gap-4 text-xs text-teal-700">
                        <span>MW Aniline: 93.13</span>
                        <span>MW Acetic Anhydride: 102.09</span>
                        <span>MW Product: 135.17</span>
                    </div>
                </div>

                <InputGroup label="Mass of Aniline (kg)" name="anilineMass" value={yieldInputs.anilineMass} onChange={handleYieldInputChange} />
                <InputGroup label="Mass of Acetic Anhydride (kg)" name="aceticAnhydrideMass" value={yieldInputs.aceticAnhydrideMass} onChange={handleYieldInputChange} />
                <div className="pt-4 border-t border-slate-100">
                   <InputGroup label="Actual Product Mass Obtained (kg)" name="actualProductMass" value={yieldInputs.actualProductMass} onChange={handleYieldInputChange} />
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                <button
                  onClick={handleYieldCalculate}
                  className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-lg font-bold transition-colors shadow-sm hover:shadow"
                >
                  <Play size={20} fill="currentColor" />
                  Calculate Yield
                </button>
              </div>
            </div>

            {/* Yield Results */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
              <div className="bg-teal-600 px-6 py-4 border-b border-teal-500">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Info size={18} className="text-white" />
                  Reaction Analysis
                </h3>
              </div>

              {yieldResults ? (
                <div className="p-6 flex-1 flex flex-col justify-center">
                   <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 mb-6">
                      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Process Efficiency</h4>
                      <div className="flex flex-col items-center justify-center py-4">
                          <div className="text-5xl font-bold text-teal-500 mb-2">{yieldResults.percentageYield}%</div>
                          <span className="text-slate-600 font-medium">Percentage Yield</span>
                      </div>
                   </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-slate-700 font-medium">Limiting Reactant</span>
                      <span className="text-lg font-bold text-amber-600">{yieldResults.limitingReactant}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-slate-700 font-medium">Theoretical Yield</span>
                      <span className="text-lg font-bold text-navy-900">{yieldResults.theoreticalYield} <span className="text-sm font-normal text-slate-500">kg</span></span>
                    </div>
                     <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Atom Economy</span>
                      <span className="text-lg font-bold text-navy-900">{yieldResults.atomEconomy}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-md text-sm text-amber-800">
                      <p><strong>Note:</strong> Atom economy represents the efficiency of the reaction in terms of utilizing reactant atoms in the desired product.</p>
                  </div>
                </div>
              ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 min-h-[400px]">
                    <FlaskConical size={48} className="mb-4 opacity-50" />
                    <p>Enter masses and click Calculate</p>
                 </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange }: { label: string, name: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex flex-col">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      type="number"
      step="any"
      name={name}
      value={value}
      onChange={onChange}
      className="focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border bg-slate-50"
    />
  </div>
);

const ResultCard = ({ label, value, unit }: { label: string, value: number, unit: string }) => (
  <div className="bg-white border border-slate-100 rounded-lg p-4 shadow-sm">
    <dt className="text-sm font-medium text-slate-500 truncate">{label}</dt>
    <dd className="mt-1 text-2xl font-semibold text-navy-900">
      {value} <span className="text-sm font-normal text-slate-400">{unit}</span>
    </dd>
  </div>
);

export default Calculator;
