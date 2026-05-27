import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institutions from './pages/admin/Institutions';
import SelectInstitution from './pages/lecturer/SelectInstitution';
import Dashboard from './pages/lecturer/Dashboard';
import Employees from './pages/admin/Employees';
import LecturerProfile from './pages/admin/ecturerProfile';
function App() {
  return (
 <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* נתיבי מנהל */}
        <Route path="/admin/institutions" element={<Institutions />} />
        <Route path="/admin/employees" element={<Employees />} /> {/* <--- הוספת הנתיב */}
        <Route path="/admin/lecturer-profile" element={<LecturerProfile />} /> {/* <--- הוספת הנתיב */}
        
        {/* נתיבי מרצה */}
        <Route path="/lecturer/select-institution" element={<SelectInstitution />} />
        <Route path="/lecturer/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
