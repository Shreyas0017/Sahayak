import React from 'react';
import { BookOpen, Menu, User, LogOut } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center ml-2 md:ml-0">
              <BookOpen className="h-8 w-8 text-orange-500" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Sahayak</h1>
                <p className="text-sm text-gray-600">AI Teaching Assistant</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Teacher'}</p>
                <p className="text-xs text-gray-600">{user?.school || 'Multi-Grade Classroom'}</p>
              </div>
              <div className="relative">
                <button className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-orange-600" />
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;