import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Home, Layers, Info, ChevronRight, Sparkles, Leaf } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Enhanced scroll effect with hide/show on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background blur effect with opacity transition
      setScrolled(currentScrollY > 20);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'Features', id: 'features', icon: Layers },
    { name: 'About', id: 'about', icon: Info },
  ];

  const handleClick = useCallback((id) => {
    setActiveLink(id);
    setIsOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    
        `}
      >
        {/* Gradient border bottom when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
          
            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              <div className="relative">
                {/* Background blur container */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl" />
                
                {/* Navigation items */}
                <div className="relative flex items-center space-x-1 p-1.5">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeLink === link.id;

                    return (
                      <button
                        key={link.id}
                        onClick={() => handleClick(link.id)}
                        className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 group overflow-hidden
                          ${isActive ? 'text-white' : 'text-[#063e2a] hover:text-black'}
                        `}
                      >
                        {/* Active background with morphing animation */}
                        {isActive && (
                          <span className="absolute inset-0 bg-[#063e2a] rounded-xl shadow-lg animate-in zoom-in-95 duration-300" />
                        )}
                        
                        {/* Hover glow effect */}
                        {!isActive && (
                          <>
                            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-xl transition-all duration-300" />
                            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/0 via-white/5 to-white/0" />
                          </>
                        )}
                        
                        {/* Indicator dot for active */}
                        {isActive && (
                          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#063e2a] rounded-full" />
                        )}
                        
                        <span className="relative z-10 flex items-center gap-2">
                          <Icon className={`w-4 h-4 transition-all duration-300 
                           
                          `} />
                          <span className={`transition-all duration-300 ${isActive ? 'font-semibold tracking-wide' : ''}`}>
                            {link.name}
                          </span>
                          
                          
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button with enhanced animation */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 flex items-center justify-center text-white rounded-xl hover:bg-white/10 active:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <div className="absolute inset-0 bg-white/0 hover:bg-white/10 rounded-xl transition-all duration-300" />
                <div className="relative w-6 h-6">
                  <Menu 
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ease-out
                      ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}
                    `} 
                  />
                  <X 
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ease-out
                      ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}
                    `} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full screen overlay with enhanced animations */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        {/* Backdrop with blur and gradient */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-md transition-opacity duration-500
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu panel with floating animation */}
        <div
          className={`absolute top-24 left-4 right-4 transition-all duration-500 ease-out
            ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95'}
          `}
        >
          <div className="bg-[#063e2a]/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Decorative header with pattern class */}
            <div className="relative h-20 bg-gradient-to-b from-white/5 to-transparent">
              <div className="absolute inset-0 pattern-dots opacity-20" />
            </div>

            <div className="p-6 space-y-3">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = activeLink === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleClick(link.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden
                      ${isActive
                        ? 'bg-white text-[#063e2a] shadow-lg'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }
                    `}
                    style={{
                      transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                      animation: isOpen ? `slideIn 0.5s ease-out ${index * 0.1}s both` : 'none',
                    }}
                  >
                    {/* Hover shine effect */}
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className={`p-2 rounded-xl transition-all duration-300 relative z-10
                      ${isActive 
                        ? 'bg-[#063e2a]/10 scale-110' 
                        : 'bg-white/10 group-hover:bg-white/20 group-hover:scale-105'
                      }
                    `}>
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    </div>
                    
                    <span className="font-semibold text-lg flex-1 relative z-10">{link.name}</span>
                    
                    {isActive && (
                      <div className="relative z-10 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#063e2a] rounded-full animate-pulse" />
                        <ChevronRight className="w-5 h-5 text-[#063e2a]" />
                      </div>
                    )}
                  </button>
                );
              })}

              <div className="pt-6 mt-4 border-t border-white/10">
                <button className="relative w-full py-4 bg-white text-[#063e2a] font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95 shadow-lg hover:shadow-xl overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animations and pattern styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .pattern-dots {
          background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </>
  );
};

export default Navbar;