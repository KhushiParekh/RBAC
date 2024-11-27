// src/pages/UsersPage.jsx
import { useState } from 'react';
import { Search, Settings, Edit2, Trash2 } from 'lucide-react';
import { useUsers } from '../context/UserContext';
import { NavLink } from 'react-router-dom';



const RoleCard = ({ title, count, authorityLevel }) => {
  const getColorByRole = (role) => {
    switch (role) {
      case 'Administrator': return 'bg-emerald-500';
      case 'HR Manager': return 'bg-blue-500';
      case 'Security Analyst': return 'bg-sky-500';
      case 'Policy Manager': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-500">{count} users</div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500">Authority</span>
            <div className="ml-2 h-2 w-16 bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full ${getColorByRole(title)}`}
                style={{ width: `${authorityLevel}%` }}
              />
            </div>
          </div>
        </div>
        
        <NavLink to="/permissions" className="text-gray-400 hover:text-gray-600 px-4 py-2 bg-gray-100 rounded-md" >
          <Settings size={20} />
          </NavLink>
        
      </div>
    </div>
  );
};

const UserRow = ({ user, onToggleStatus, onEdit, onDelete, currentUserRole }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRoleStyles = (role) => {
    const styles = {
      'Security Analyst': 'bg-sky-100 text-sky-600',
      'HR Manager': 'bg-blue-100 text-blue-600',
      'Administrator': 'bg-emerald-100 text-emerald-600',
      'Policy Manager': 'bg-purple-100 text-purple-600',
    };
    return styles[role] || 'bg-gray-100 text-gray-600';
  };

  // Conditionally render based on role (only Admin can edit/delete)
  const canEditOrDelete = currentUserRole === 'Administrator';

  return (
    <tr className="border-b">
      <td className="py-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRoleStyles(user.role)}`}>
            {getInitials(user.name)}
          </div>
          <span className="ml-3">{user.name}</span>
        </div>
      </td>
      <td className="py-4">
        <span className={`px-3 py-1 rounded-full text-sm ${getRoleStyles(user.role)}`}>
          {user.role}
        </span>
      </td>
      <td className="py-4">{user.lastLogin}</td>
      <td className="py-4">
        <button
          onClick={() => onToggleStatus(user.id)}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
            user.status ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
            user.status ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </td>
      <td className="py-4">
        <div className="flex gap-2">
          {/* Show Edit and Delete only for Admin */}
          {canEditOrDelete && (
            <>
              <button onClick={() => onEdit(user)} className="text-gray-400 hover:text-gray-600">
                <Edit2 size={18} />
              </button>
              <button onClick={() => onDelete(user.id)} className="text-gray-400 hover:text-red-600">
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
const UsersPage = () => {
  const { users, setUsers, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Assume the current user role comes from the authentication context
  const currentUserRole = 'Administrator'; // This should be dynamically retrieved from context or state

  const roles = {
    'Administrator': { authorityLevel: 100 },
    'HR Manager': { authorityLevel: 75 },
    'Security Analyst': { authorityLevel: 40 },
    'Policy Manager': { authorityLevel: 30 }
  };

  const getRoleCount = (role) => {
    return users.filter(user => user.role === role).length;
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: !user.status } : user
    ));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleSave = (newRole) => {
    setUsers(users.map(user =>
      user.id === editingUser.id ? { ...user, role: newRole } : user
    ));
    setEditingUser(null);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(roles).map(([role, { authorityLevel }]) => (
          <RoleCard
            key={role}
            title={role}
            count={getRoleCount(role)}
            authorityLevel={authorityLevel}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">User Access</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search Users..."
                  className="pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border rounded-lg px-4 py-2"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">All Roles</option>
                {Object.keys(roles).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-4">Name</th>
                <th className="py-4">Role</th>
                <th className="py-4">Last Login</th>
                <th className="py-4">Active</th>
                <th className="py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <UserRow
                  key={user.id}
                  user={user}
                  onToggleStatus={toggleUserStatus}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  currentUserRole={currentUserRole} // Pass the current role
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Role for {editingUser.name}</h3>
            <select
              className="border rounded-lg px-4 py-2 w-full"
              value={editingUser.role}
              onChange={(e) => handleSave(e.target.value)}
            >
              {Object.keys(roles).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(editingUser.role)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
