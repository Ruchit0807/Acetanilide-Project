import React from 'react';
import { TEAM_MEMBERS, PROJECT_GUIDE } from '../constants';
import { User, GraduationCap } from 'lucide-react';

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-navy-900">Project Team</h2>
          <p className="mt-2 text-slate-600">Visvesvaraya National Institute of Technology, Nagpur</p>
        </div>

        {/* Guide Section */}
        <div className="mb-16 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full border-t-4 border-teal-400 text-center">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="text-teal-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-navy-900">{PROJECT_GUIDE.name}</h3>
            <p className="text-slate-500 font-medium mt-1 uppercase tracking-wide text-sm">Project Guide</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-slate-700">{PROJECT_GUIDE.department}</p>
              <p className="text-slate-500 text-sm mt-1">{PROJECT_GUIDE.institute}</p>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <h3 className="text-xl font-bold text-navy-900 mb-8 border-l-4 border-amber-500 pl-4">Team Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center group-hover:bg-navy-900 transition-colors duration-300">
                <User className="text-navy-400 group-hover:text-teal-400 transition-colors duration-300" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-navy-900">{member.name}</h4>
                <p className="text-teal-600 font-mono text-sm">{member.rollNo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;