import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiUsers, FiBox, FiGrid, FiLayers, FiKey, FiTag, FiPackage, FiHome, FiBarChart2, FiDollarSign } from 'react-icons/fi';

const navLinks = [
  { to: 'analytics', text: 'Phân tích', icon: <FiBarChart2 /> },
  { to: 'users', text: 'Quản lý Users', icon: <FiUsers /> },
  { to: 'orders', text: 'Quản lý Orders', icon: <FiBox /> },
  { to: 'products', text: 'Quản lý Products', icon: <FiPackage /> },
  { to: 'categories', text: 'Quản lý Categories', icon: <FiGrid /> },
  { to: 'collections', text: 'Quản lý Collections', icon: <FiLayers /> },
  { to: 'roles', text: 'Quản lý Roles', icon: <FiKey /> },
  { to: 'vouchers', text: 'Quản lý Vouchers', icon: <FiTag /> },
  { to: 'payments', text: 'Quản lý Payments', icon: <FiDollarSign /> },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900/50 backdrop-blur-md text-white h-screen p-4 border-r border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-white">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {link.icon}
            {link.text}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-white/20">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
        >
          <FiHome />
          Quay lại trang Home
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 