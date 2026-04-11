import React, { useState } from 'react';
 
interface DashboardHeaderProps {
  userInitials?: string;
}
 
/**
 * Responsive dashboard header with logo, nav links, and user avatar.
 * On mobile, show hamburger menu instead of full nav.
 *
 * Nav links: Portfolio, Trades, Algorithms
 */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userInitials = 'U' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  // TODO: Render header with:
  // - Logo/brand "PSLTP"
  // - Nav links (Portfolio, Trades, Algorithms) - hidden on mobile
  // - Hamburger menu button - visible only on mobile
  // - User avatar with initials in top-right
  // - Use Tailwind only, no CSS files
  // - Responsive breakpoints: md: for tablet+
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          PSLTP
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Portfolio</a>
          <a href="#" className="hover:text-blue-600">Trades</a>
          <a href="#" className="hover:text-blue-600">Algorithms</a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Hamburger (Mobile Only) */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-700"></div>
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {userInitials}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Portfolio</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Trades</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Algorithms</a>
        </div>
      )}
    </header>
  );
};