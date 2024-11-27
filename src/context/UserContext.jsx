// src/context/UserContext.jsx
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Khushi Parekh', role: 'Administrator', lastLogin: '06/30/2018 07:08 AM', status: true, initials: 'KP' },
    { id: 2, name: 'Vraj Parekh', role: 'HR Manager', lastLogin: '06/30/2018 07:08 AM', status: false, initials: 'VP' },
    { id: 3, name: 'Saachi Peswani', role: 'Security Analyst', lastLogin: '06/30/2018 07:08 AM', status: true, initials: 'SP' },
    { id: 4, name: 'Prakruti Doshi', role: 'Security Analyst', lastLogin: '06/30/2018 07:08 AM', status: true, initials: 'PD' },
    { id: 5, name: 'Meet Mehta', role: 'Policy Manager', lastLogin: '06/30/2018 07:08 AM', status: false, initials: 'MM' },
    { id: 6, name: 'Muskan Sharma', role: 'Policy Manager', lastLogin: '06/30/2018 07:08 AM', status: true, initials: 'MS' },
    { id: 7, name: 'Meera Nair', role: 'HR Manager', lastLogin: '06/30/2018 07:08 AM', status: true, initials: 'MN' },
  ]);
  const updateUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };
  
  const getRoleCount = (role) => {
    return users.filter(user => user.role === role).length;
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <UserContext.Provider value={{  users, setUsers, getRoleCount, deleteUser, updateUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);