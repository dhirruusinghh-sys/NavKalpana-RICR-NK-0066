import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlayCircle,
  Calendar,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  HelpCircle,
  GraduationCap,
  MoreVertical,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Custom emerald color based on 063e2a
  const emeraldColor = '#063e2a';
  const emeraldLight = '#0d5c3f';
  const emeraldPale = '#e8f5f0';

  const menuItems = [
    { name: 'Fitness Assistant', icon: LayoutDashboard, badge: null },
    { name: 'Workout Plan', icon: PlayCircle, badge: '12' },
    { name: 'Diet Plan', icon: Calendar, badge: null },
    { name: ' Progress Tracking', icon: FileText, badge: '5' },
    { name: 'Body Measurement Tracking', icon: FileText, badge: '5' },
    { name: 'Habit Intelligence', icon: BarChart3, badge: null },
    { name: 'Energy & Recover', icon: MessageSquare, badge: '8' },
    { name: 'Progressive Overload', icon: Settings, badge: null },
    { name: 'Timeline Forecast', icon: HelpCircle, badge: null },
  ];

  // Handle resize for responsive collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1280) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-12 h-12 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: emeraldColor,
          boxShadow: '0 10px 25px -5px rgba(6, 62, 42, 0.4)'
        }}
      >
        {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      {/* Mobile Overlay with blur */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200/80 flex flex-col z-50 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0 shadow-2xl shadow-gray-200/50 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isCollapsed ? 'w-20' : 'w-72'}`}
      >


        {/* Search Bar - Hidden when collapsed */}
        {!isCollapsed && (
          <div className="px-4 py-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-hide">
          <div className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-4'}`}>
            {isCollapsed ? '•••' : 'Main Menu'}
          </div>

          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            const path = item.name === "Test" ? "/dashboard/test"
              : item.name === "Dashboard" ? "/dashboard"
                : item.name === "My Courses" ? "/dashboard/courses"
                  : `/dashboard/${item.name.toLowerCase().replace(/\s+/g, '-')}`;

            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(path);
                  setActiveItem(item.name);
                  if (window.innerWidth < 1024) {
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${isCollapsed ? 'justify-center' : ''
                  } ${isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                style={{
                  backgroundColor: isActive ? emeraldColor : 'transparent',
                  boxShadow: isActive ? `0 10px 20px -5px rgba(6, 62, 42, 0.4)` : 'none'
                }}
              >
                {/* Hover background animation */}
                {!isActive && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: emeraldPale }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-3 w-full">
                  <div className={`relative ${isCollapsed ? '' : ''}`}>
                    <Icon
                      size={20}
                      className={`transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-gray-400 group-hover:text-emerald-600'}`}
                    />
                    {/* Notification dot for collapsed state */}
                    {isCollapsed && item.badge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>

                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>

                    </>
                  )}
                </div>

                {/* Active indicator line */}
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="px-4 py-2">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Bell size={16} style={{ color: emeraldColor }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Notifications</p>
                  <p className="text-xs text-gray-500">You have {notifications} new</p>
                </div>
              </div>
              <button
                className="w-full py-2 text-xs font-semibold rounded-lg transition-all duration-200 hover:opacity-90 text-white"
                style={{ backgroundColor: emeraldColor }}
              >
                View All
              </button>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          >
            {isDarkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-500" />}
            {!isCollapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* User Profile */}
          <div
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Priya Sharma"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-emerald-400 transition-all duration-300"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">Priya Sharma</p>
                  <p className="text-xs text-gray-500 truncate">CSE, 3rd Year</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                    <LogOut size={16} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area (routes will render here) */}
      <main className={`min-h-screen bg-gray-50 transition-all duration-300 `} style={{ marginLeft: isCollapsed ? '5rem' : '18rem' }}>
        <div >
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Sidebar;