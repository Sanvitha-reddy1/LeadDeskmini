import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#070b13]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
            <svg className="h-8 w-8 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z" fill="currentColor" />
            </svg>
            <span className="ml-2.5 font-bold text-xl tracking-tight text-white">
              LeadDesk<span className="text-brand-blue">mini</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-slate-350 hover:text-white transition-colors text-sm font-medium">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-slate-355 hover:text-white transition-colors text-sm font-medium">Services</button>
            <button onClick={() => scrollToSection('about')} className="text-slate-355 hover:text-white transition-colors text-sm font-medium">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-355 hover:text-white transition-colors text-sm font-medium">Contact</button>
            <Link to="/admin" className="text-slate-400 hover:text-brand-blue transition-colors text-sm font-semibold border-l border-white/10 pl-6">Admin Portal</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')} 
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold text-white brand-gradient hover:opacity-90 shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-[#0a0f1d] border-l border-white/5 p-6 flex flex-col space-y-6 shadow-2xl">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <button onClick={() => scrollToSection('home')} className="text-left text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-white/5">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-left text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-white/5">Services</button>
            <button onClick={() => scrollToSection('about')} className="text-left text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-white/5">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-white/5">Contact</button>
            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-left text-slate-400 hover:text-white text-lg font-semibold py-2 border-b border-white/5">Admin Portal</Link>
          </div>
          <button 
            onClick={() => {
              setIsOpen(false);
              scrollToSection('contact');
            }} 
            className="w-full text-center py-3 rounded-xl font-semibold text-white brand-gradient shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
