// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import PermissionsPage from './pages/PermissionsPage';
import LeadsPage from './pages/LeadsPage';
import { UserProvider } from './context/UserContext';

const App = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  return (
    <UserProvider>
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/permissions" element={<PermissionsPage />} />
            <Route path="/leads" element={<LeadsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;