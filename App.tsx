import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Calculator from './views/Calculator';
import PFDViewer from './views/PFDViewer';
import Report from './views/Report';
import Team from './views/Team';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/pfd" element={<PFDViewer />} />
            <Route path="/report" element={<Report />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
        <footer className="bg-navy-900 text-slate-400 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p>© 2024 Acetanilide Manufacturing Project. Department of Chemical Engineering, VNIT Nagpur.</p>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;