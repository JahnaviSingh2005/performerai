import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const pageTitles = {
  '/': 'Dashboard',
  '/candidates': 'Employees',
  '/candidates/new': 'Register Employee',
  '/match': 'AI Recommendations',
};

/**
 * Top navigation bar with page title and search icon.
 */
export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const title = pageTitles[location.pathname] || 'PerformAI';

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface-950/80 backdrop-blur-xl border-b border-surface-700/50 flex items-center justify-between px-8">
      <div>
        <h2 className="text-lg font-semibold text-surface-100">{title}</h2>
        <p className="text-xs text-surface-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-surface-200">{user?.name || 'User'}</p>
          <p className="text-xs text-surface-500">{user?.email || ''}</p>
        </div>
        
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-lg border border-surface-700/50 shadow-lg shadow-primary-500/20">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>

        <div className="w-px h-6 bg-surface-700/50 mx-1"></div>

        <button 
          onClick={logout}
          className="relative p-2 rounded-xl text-surface-400 hover:text-danger-400 hover:bg-danger-500/10 transition-all duration-300 group"
          title="Logout"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
}
