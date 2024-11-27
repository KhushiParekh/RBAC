import { NavLink } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  Shield, 
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ expanded, onToggle }) => {
  const navItems = [
    { icon: <LayoutDashboard size={24} />, label: 'Dashboard', path: '/' },
    { icon: <Users size={24} />, label: 'Users', path: '/users' },
    { icon: <Shield size={24} />, label: 'Permissions', path: '/permissions' },
    { icon: <Target size={24} />, label: 'Leads', path: '/leads' },
  ];

  return (
    <div
      className={`bg-indigo-900 text-white transition-all duration-300 relative  ${
        expanded ? 'w-64' : 'w-20'
      } flex-shrink-0 h-full`}
    >
      <div className="p-4">
        <div className={`font-bold text-xl mb-8 ${expanded ? 'block' : 'hidden'}`}>
          VRV Security
        </div>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `
                flex items-center p-2 rounded cursor-pointer
                ${isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'}
              `}
            >
              {item.icon}
              <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
      <button
        onClick={onToggle}
        className="absolute top-1/2 -translate-y-1/2 right-0  bg-indigo-900  rounded-r-full p-4 transform translate-x-1/2"
      >
        {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;
