import React, { useState } from 'react';

const initialRoles = {
  Administrator: {
    permissions: {
      'View Dashboard': true,
      'Manage Users': true,
      'Edit Roles': true,
      'View Reports': true,
      'Edit Profiles': true,
    },
    authorityLevel: 100,
  },
  'HR Manager': {
    permissions: {
      'View Dashboard': true,
      'Manage Users': false,
      'Edit Roles': false,
      'View Reports': true,
      'Edit Profiles': true,
    },
    authorityLevel: 70,
  },
  
  'Security Analyst': {
    permissions: {
      'View Dashboard': true,
      'Manage Users': true,
      'Edit Roles': false,
      'View Reports': true,
      'Edit Profiles': false,
    },
    authorityLevel: 40,
  },
  'Policy Manager': {
    permissions: {
      'View Dashboard': true,
      'Manage Users': false,
      'Edit Roles': false,
      'View Reports': false,
      'Edit Profiles': false,
    },
    authorityLevel: 30,
  },
};

const PermissionsPage = () => {
  const [roles, setRoles] = useState(initialRoles);

  const handlePermissionChange = (role, permission) => {
    setRoles((prev) => {
      const updatedPermissions = {
        ...prev[role].permissions,
        [permission]: !prev[role].permissions[permission],
      };

      // Calculate authority level dynamically (e.g., percentage of permissions enabled)
      const totalPermissions = Object.keys(updatedPermissions).length;
      const activePermissions = Object.values(updatedPermissions).filter(Boolean).length;
      const authorityLevel = Math.round((activePermissions / totalPermissions) * 100);

      return {
        ...prev,
        [role]: {
          ...prev[role],
          permissions: updatedPermissions,
          authorityLevel,
        },
      };
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Permissions</h1>
      <div className="space-y-6">
        {Object.entries(roles).map(([role, { permissions, authorityLevel }]) => (
          <div key={role} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{role}</h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Authority Level</span>
                <div className="w-32 h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-blue-600 rounded"
                    style={{ width: `${authorityLevel}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(permissions).map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={permissions[permission]}
                    onChange={() => handlePermissionChange(role, permission)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 focus:ring-opacity-50"
                  />
                  <span className="ml-2">{permission}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsPage;

