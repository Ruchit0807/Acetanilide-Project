import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Database, Zap, User, GraduationCap } from 'lucide-react';
import { TEAM_MEMBERS, PROJECT_GUIDE } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Manufacturing of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                Acetanilide
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              A comprehensive engineering project analysis for the production of N-phenylacetamide via acetylation of aniline. Featuring process flow visualization, pump design calculations, and material balance reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/pfd"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-navy-900 bg-teal-400 hover:bg-teal-300 transition-colors"
              >
                View Process Flow
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Engineering Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mb-4">
              <Factory className="text-teal-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Process Design</h3>
            <p className="text-slate-600">
              Detailed analysis of the T-101 to R-101 flow path, including crystallizer and dryer thermodynamics.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-amber-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Energy Balance</h3>
            <p className="text-slate-600">
              Calculations for reactor cooling duty (13,956 MJ) and dryer heat load based on 25-tonne batch production.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
              <Database className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Material Data</h3>
            <p className="text-slate-600">
              Comprehensive material balance sheet for Aniline and Acetic Anhydride usage over 3 daily batches.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-24 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900">Project Team</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Developed by students of the Chemical Engineering Department, VNIT Nagpur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Guide Card */}
            <div className="lg:col-span-1">
               <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center border border-navy-700/50">
                  <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-teal-500/30">
                    <GraduationCap size={32} className="text-teal-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{PROJECT_GUIDE.name}</h3>
                  <p className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">Project Guide</p>
                  <p className="text-slate-300 text-sm leading-relaxed opacity-80">{PROJECT_GUIDE.department}</p>
               </div>
            </div>

            {/* Team Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center gap-4 hover:bg-white hover:shadow-md hover:border-teal-100 transition-all group">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                        <User size={18} />
                     </div>
                     <div className="min-w-0">
                        <p className="text-sm font-bold text-navy-900 truncate group-hover:text-teal-700 transition-colors">{member.name}</p>
                        <p className="text-xs text-slate-500 font-mono">{member.rollNo}</p>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;