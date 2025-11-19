
import React, { useState } from 'react';
import { PFD_HOTSPOTS } from '../constants';
import { X, ZoomIn, ZoomOut, RotateCcw, MousePointer2 } from 'lucide-react';

const PFDViewer: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const currentHotspotData = PFD_HOTSPOTS.find(h => h.id === activeHotspot);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.6));
  const handleReset = () => setZoom(1);

  // Helper to check active state
  const isActive = (id: string) => activeHotspot === id;
  
  // Common active styles
  const ACTIVE_STROKE = "#0d9488"; // teal-600
  const ACTIVE_WIDTH = 4;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-6">
             <div>
                <h2 className="text-2xl font-bold text-navy-900">Process Flow Diagram</h2>
                <p className="text-sm text-slate-500 hidden sm:block">Click on the equipment containers to view engineering specifications.</p>
             </div>
             <div className="flex gap-2 bg-white rounded-lg shadow-sm p-1 border border-slate-200">
                 <button onClick={handleZoomOut} className="p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded" title="Zoom Out"><ZoomOut size={20}/></button>
                 <button onClick={handleReset} className="p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded" title="Reset"><RotateCcw size={20}/></button>
                 <button onClick={handleZoomIn} className="p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded" title="Zoom In"><ZoomIn size={20}/></button>
             </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow items-start">
          {/* Diagram Area */}
          <div 
            className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative h-[600px] bg-slate-50 group"
            onClick={() => setActiveHotspot(null)}
          >
             
             {/* SVG PFD Diagram */}
             <div 
                className="w-full h-full relative transition-transform duration-300 origin-top-left"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
             >
                <svg viewBox="0 0 1000 800" className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                      <feOffset dx="1" dy="2" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                      </feComponentTransfer>
                      <feMerge> 
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/> 
                      </feMerge>
                    </filter>
                    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* --- PIPING LAYER --- */}
                  <g stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinejoin="round">
                    {/* Aniline Feed */}
                    <path d="M100 180 L100 240" markerEnd="url(#arrow)" />
                    <path d="M100 270 L100 320 L150 320" />
                    
                    {/* Acetic Anhydride Feed */}
                    <path d="M250 180 L250 240" markerEnd="url(#arrow)" />
                    <path d="M250 270 L250 320 L200 320" />
                    
                    {/* Combined to Heater to Reactor */}
                    <path d="M175 320 L175 360" markerEnd="url(#arrow)" />
                    <path d="M175 400 L175 450" markerEnd="url(#arrow)" />

                    {/* Reactor to Crystallizer */}
                    <path d="M175 600 L175 660 L300 660" markerEnd="url(#arrow)" />
                    <path d="M330 660 L425 660 L425 600" markerEnd="url(#arrow)" />

                    {/* Crystallizer to Filter */}
                    <path d="M425 500 L425 460" markerEnd="url(#arrow)" /> 
                    <path d="M425 430 L425 410" markerEnd="url(#arrow)" />

                    {/* Filter to Dryer */}
                    <path d="M425 310 L425 260" markerEnd="url(#arrow)" />

                    {/* Filter to Filtrate Tank */}
                    <path d="M500 360 L550 360 L580 360" markerEnd="url(#arrow)" />

                    {/* Filtrate Tank to Column */}
                    <path d="M650 360 L700 360" markerEnd="url(#arrow)" />
                    <path d="M730 360 L780 360" markerEnd="url(#arrow)" />

                    {/* Column Outputs */}
                    <path d="M840 300 L840 250 L900 250" markerEnd="url(#arrow)" />
                    <path d="M840 250 L700 250 L700 180" markerEnd="url(#arrow)" />
                    
                    {/* Dryer to Product */}
                    <path d="M425 160 L425 130 L550 130" markerEnd="url(#arrow)" />
                  </g>

                  {/* --- EQUIPMENT LAYER --- */}

                  {/* T-101 Aniline Storage */}
                  <g 
                    transform="translate(50, 60)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('T-101')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="100" height="120" rx="4" 
                        fill="#d9f99d" 
                        stroke={isActive('T-101') ? ACTIVE_STROKE : "#84cc16"} 
                        strokeWidth={isActive('T-101') ? ACTIVE_WIDTH : 2} 
                        filter="url(#dropShadow)"
                    />
                    <text x="50" y="50" textAnchor="middle" className="text-xs font-bold fill-slate-800 pointer-events-none">Aniline</text>
                    <text x="50" y="65" textAnchor="middle" className="text-xs fill-slate-800 pointer-events-none">Storage</text>
                    <text x="50" y="90" textAnchor="middle" className="text-sm font-bold fill-slate-700 pointer-events-none">T-101</text>
                  </g>

                  {/* T-102 Acetic Anhydride Storage */}
                  <g 
                    transform="translate(200, 60)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('T-102')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="100" height="120" rx="4" 
                        fill="#d9f99d" 
                        stroke={isActive('T-102') ? ACTIVE_STROKE : "#84cc16"} 
                        strokeWidth={isActive('T-102') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-slate-800 pointer-events-none">Acetic</text>
                    <text x="50" y="60" textAnchor="middle" className="text-xs font-bold fill-slate-800 pointer-events-none">Anhydride</text>
                    <text x="50" y="90" textAnchor="middle" className="text-sm font-bold fill-slate-700 pointer-events-none">T-102</text>
                  </g>

                  {/* E-101 Preheater */}
                  <g 
                    transform="translate(125, 360)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('E-101')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                     <rect 
                        width="100" height="40" rx="4" 
                        fill="#fbcfe8" 
                        stroke={isActive('E-101') ? ACTIVE_STROKE : "#ec4899"} 
                        strokeWidth={isActive('E-101') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                     <text x="50" y="25" textAnchor="middle" className="text-xs font-bold fill-slate-800 pointer-events-none">PREHEATER</text>
                  </g>

                  {/* R-101 Batch Reactor */}
                  <g 
                    transform="translate(100, 450)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('R-101')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="150" height="150" 
                        fill="#bae6fd" 
                        stroke={isActive('R-101') ? ACTIVE_STROKE : "#0ea5e9"} 
                        strokeWidth={isActive('R-101') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="75" y="65" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">BATCH</text>
                    <text x="75" y="85" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">REACTOR</text>
                    <text x="75" y="110" textAnchor="middle" className="text-lg font-bold fill-slate-800 pointer-events-none">R-101</text>
                    <text x="75" y="130" textAnchor="middle" className="text-xs fill-slate-600 pointer-events-none">200 rpm, 80°C</text>
                  </g>

                  {/* CR-101 Crystallizer */}
                  <g 
                    transform="translate(350, 500)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('CR-101')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="150" height="100" 
                        fill="#bae6fd" 
                        stroke={isActive('CR-101') ? ACTIVE_STROKE : "#0ea5e9"} 
                        strokeWidth={isActive('CR-101') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="75" y="40" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">CRYSTALLIZER</text>
                    <text x="75" y="65" textAnchor="middle" className="text-lg font-bold fill-slate-800 pointer-events-none">CR-101</text>
                    <text x="75" y="85" textAnchor="middle" className="text-xs fill-slate-600 pointer-events-none">80°C → 30°C</text>
                  </g>

                  {/* F-101 Rotary Vacuum Filter */}
                  <g 
                    transform="translate(350, 310)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('F-101')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="150" height="100" 
                        fill="#d8b4fe" 
                        stroke={isActive('F-101') ? ACTIVE_STROKE : "#a855f7"} 
                        strokeWidth={isActive('F-101') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="75" y="40" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">ROTARY</text>
                    <text x="75" y="55" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">FILTER</text>
                    <text x="75" y="80" textAnchor="middle" className="text-lg font-bold fill-slate-800 pointer-events-none">F-101</text>
                  </g>

                  {/* D-101 Rotary Dryer */}
                  <g 
                    transform="translate(375, 160)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('D-101')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <path 
                        d="M0 100 L0 40 C0 -10, 100 -10, 100 40 L100 100 Z" 
                        fill="#fcd34d" 
                        stroke={isActive('D-101') ? ACTIVE_STROKE : "#f59e0b"} 
                        strokeWidth={isActive('D-101') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="50" y="50" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">ROTARY</text>
                    <text x="50" y="65" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">DRYER</text>
                    <text x="50" y="85" textAnchor="middle" className="text-sm font-bold fill-slate-800 pointer-events-none">D-101</text>
                  </g>

                  {/* Product */}
                  <g 
                    transform="translate(550, 80)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('PRODUCT')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                     <rect 
                        width="150" height="100" rx="4" 
                        fill="#bef264" 
                        stroke={isActive('PRODUCT') ? ACTIVE_STROKE : "#84cc16"} 
                        strokeWidth={isActive('PRODUCT') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                     <text x="75" y="45" textAnchor="middle" className="text-sm font-bold fill-slate-800 pointer-events-none">PRODUCT</text>
                     <text x="75" y="65" textAnchor="middle" className="text-sm font-bold fill-slate-800 pointer-events-none">ACETANILIDE</text>
                  </g>

                  {/* T-103 Filtrate Tank */}
                  <g 
                    transform="translate(580, 310)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('T-103')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="70" height="100" rx="35" 
                        fill="#bae6fd" 
                        stroke={isActive('T-103') ? ACTIVE_STROKE : "#0ea5e9"} 
                        strokeWidth={isActive('T-103') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="35" y="45" textAnchor="middle" className="text-xs font-bold fill-slate-900 pointer-events-none">FILTRATE</text>
                    <text x="35" y="60" textAnchor="middle" className="text-xs font-bold fill-slate-900 pointer-events-none">TANK</text>
                    <text x="35" y="80" textAnchor="middle" className="text-xs fill-slate-800 pointer-events-none">T-103</text>
                  </g>

                  {/* DC-101 Distillation Column */}
                  <g 
                    transform="translate(780, 300)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('DC-101')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="120" height="250" 
                        fill="#fbcfe8" 
                        stroke={isActive('DC-101') ? ACTIVE_STROKE : "#ec4899"} 
                        strokeWidth={isActive('DC-101') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="60" y="110" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">DISTILLATION</text>
                    <text x="60" y="130" textAnchor="middle" className="text-sm font-bold fill-slate-900 pointer-events-none">COLUMN</text>
                    <text x="60" y="160" textAnchor="middle" className="text-lg font-bold fill-slate-800 pointer-events-none">DC-101</text>
                  </g>
                  
                   {/* T-104 AC Acid */}
                  <g 
                    transform="translate(650, 80)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('T-104')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="100" height="100" rx="20" 
                        fill="#bae6fd" 
                        stroke={isActive('T-104') ? ACTIVE_STROKE : "#0ea5e9"} 
                        strokeWidth={isActive('T-104') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-slate-900 pointer-events-none">AC. ACID</text>
                    <text x="50" y="65" textAnchor="middle" className="text-sm font-bold fill-slate-800 pointer-events-none">T-104</text>
                  </g>

                  {/* T-105 Aniline Recovery */}
                   <g 
                    transform="translate(900, 200)" 
                    onClick={(e) => {e.stopPropagation(); setActiveHotspot('T-105')}}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <rect 
                        width="80" height="100" rx="40" 
                        fill="#bae6fd" 
                        stroke={isActive('T-105') ? ACTIVE_STROKE : "#0ea5e9"} 
                        strokeWidth={isActive('T-105') ? ACTIVE_WIDTH : 2}
                        filter="url(#dropShadow)"
                    />
                    <text x="40" y="45" textAnchor="middle" className="text-xs font-bold fill-slate-900 pointer-events-none">ANILINE</text>
                    <text x="40" y="65" textAnchor="middle" className="text-sm font-bold fill-slate-800 pointer-events-none">T-105</text>
                  </g>

                  {/* --- PUMPS --- */}
                  {[
                      {x: 100, y: 255, label: 'P-101'},
                      {x: 250, y: 255, label: 'P-102'},
                      {x: 315, y: 660, label: 'P-104'},
                      {x: 425, y: 445, label: 'P-107'},
                      {x: 425, y: 290, label: 'P-109'}, // Dryer pump
                      {x: 565, y: 360, label: 'P-108'},
                      {x: 715, y: 360, label: 'P-110'},
                  ].map((pump, i) => (
                      <g key={i} transform={`translate(${pump.x}, ${pump.y})`}>
                          <circle cx="0" cy="0" r="15" fill="#fde047" stroke="#eab308" strokeWidth="2" />
                          <path d="M-7 -5 L7 0 L-7 5 Z" fill="#854d0e" />
                          <text x="0" y="28" textAnchor="middle" className="text-xs font-bold fill-slate-600">{pump.label}</text>
                      </g>
                  ))}

                </svg>
             </div>
             
             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-md text-xs text-slate-500 border border-slate-200 shadow-sm flex items-center gap-2 pointer-events-none">
                <MousePointer2 size={14} />
                Click equipment to view details
             </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1 h-full">
            <div className={`bg-white rounded-xl shadow-lg border border-slate-200 p-6 transition-all duration-300 sticky top-24 min-h-[400px] ${activeHotspot ? 'ring-2 ring-teal-400' : ''}`}>
              {currentHotspotData ? (
                <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="inline-block px-2 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded mb-2">
                        SELECTED EQUIPMENT
                      </div>
                      <h3 className="text-3xl font-bold text-navy-900">{currentHotspotData.label}</h3>
                      <p className="text-teal-600 font-medium mt-1">{currentHotspotData.description}</p>
                    </div>
                    <button onClick={() => setActiveHotspot(null)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        Specifications
                    </h4>
                    <ul className="space-y-3">
                      {currentHotspotData.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-teal-200 transition-colors">
                          <div className="w-1.5 h-1.5 mt-2 rounded-full bg-teal-50 shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-slate-700 text-sm leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 animate-pulse">
                    <MousePointer2 className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 mb-2">No Selection</h3>
                  <p className="max-w-xs mx-auto text-sm">Click on any equipment in the diagram to view engineering specifications and design data.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PFDViewer;
