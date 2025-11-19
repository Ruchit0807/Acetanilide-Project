import React from 'react';
import { MATERIAL_BALANCE_DATA } from '../constants';
import { Download, FileText } from 'lucide-react';

const Report: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Material Balance Report</h2>
            <p className="text-slate-600 mt-1">Based on 3 batches/day (75 TPD Basis)</p>
          </div>
          
          <a 
            href="/assets/fluid_assignment_2.pdf" 
            download
            className="inline-flex items-center justify-center px-4 py-2 bg-navy-900 text-white rounded-md hover:bg-navy-800 transition-colors shadow-sm"
          >
            <Download size={18} className="mr-2" />
            Download Full PDF
          </a>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-slate-200 mb-8">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2">
              <FileText size={18} className="text-teal-500" />
              Daily Production Summary
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Component
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Mass (kg/day)
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Amount (kmol/day)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {MATERIAL_BALANCE_DATA.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-900">
                      {item.component}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-600 font-mono">
                      {item.massKg.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-600 font-mono">
                      {item.kmol.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 font-semibold text-navy-900">
                <tr>
                  <td className="px-6 py-4 text-sm">Reaction Efficiency</td>
                  <td colSpan={2} className="px-6 py-4 text-sm text-right">90%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Embedded PDF Preview Area (Mock) */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-navy-800 mb-4">Original Documentation</h3>
            <div className="aspect-[4/3] w-full bg-slate-100 rounded flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                <FileText size={48} className="mb-2" />
                <p>PDF Embed Placeholder</p>
                <p className="text-sm">Use the download button above to view the full document.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Report;