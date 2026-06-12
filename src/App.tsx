import React, { useState, useEffect } from 'react';
import { Page } from './types';
import HomeView from './components/HomeView';
import ProposalView from './components/ProposalView';
import ProfileView from './components/ProfileView';
import ContactView from './components/ContactView';
import ServicesView from './components/ServicesView';
import AIConsultView from './components/AIConsultView';
import LeadsDashboardView from './components/LeadsDashboardView';
import { Menu, X, Users, BookOpen, Building2, Terminal, Phone, MapPin, Globe, MessageSquare, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ChatBot from './components/ChatBot';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load theme preference on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('primehub-theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('primehub-theme', nextTheme);
  };

  // SECURE HASH-BASED ROUTER
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'services', 'proposal', 'profile', 'contact', 'aiconsult', 'leads'].includes(hash)) {
        setCurrentPage(hash);
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // default to home if empty/wrong string
        if (window.location.hash !== '#home' && window.location.hash !== '') {
          window.location.hash = '#home';
        } else if (window.location.hash === '') {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial execution checks
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: Page) => {
    window.location.hash = `#${page}`;
  };

  const navItems = [
    { label: 'Home Portfolio', target: 'home' as Page },
    { label: 'Our Services', target: 'services' as Page },
    { label: '12-Week Proposal', target: 'proposal' as Page },
    { label: 'AI Partner Consult', target: 'aiconsult' as Page },
    { label: 'Contact Us', target: 'contact' as Page }
  ];

  return (
    <div 
      id="app_root" 
      className={`min-h-screen font-sans selection:bg-[#C9A23F]/30 selection:text-[#C9A23F] flex flex-col justify-between transition-colors duration-300 ${
        theme === 'light' 
          ? 'bg-[#F4F6F9] text-[#0C2440] theme-light' 
          : 'bg-[#0C2440] text-[#F4F6F9] theme-dark'
      }`}
    >
      {/* Header element */}
      <header id="primary_header" className="sticky top-0 bg-[#0C2440]/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Branding */}
          <div 
            id="brand_logo_main"
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#C9A23F] flex items-center justify-center relative bg-white/5">
              <div className="absolute w-2 h-2 bg-[#C9A23F] rounded-full"></div>
              <span className="text-xs font-bold text-[#C9A23F] relative z-10 font-sans">PH</span>
            </div>
            <div>
              <p className="font-bold text-lg leading-tight tracking-tight text-white group-hover:text-[#C9A23F] transition-colors font-sans">PRIMEHUB <span className="font-light opacity-80">HR</span></p>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#C9A23F] font-semibold font-sans">Consulting & People</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop_nav" className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const active = currentPage === item.target;
              return (
                <button
                  key={item.target}
                  id={`nav_btn_${item.target}`}
                  onClick={() => handleNavigate(item.target)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer outline-none ${
                    active 
                      ? 'text-[#C9A23F] font-bold bg-white/5' 
                      : 'text-white/70 hover:text-[#C9A23F] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA header button in desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="theme_toggle_desktop"
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C9A23F] border border-white/10 transition-all cursor-pointer outline-none flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              id="header_briefing_cta"
              onClick={() => handleNavigate('aiconsult')}
              className="bg-[#C9A23F] text-[#0C2440] px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer hover:bg-[#b58f33] transition-colors"
            >
              Book Discovery
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            id="mobile_menu_trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-[#C9A23F] transition-colors outline-none cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (with AnimatePresence) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile_nav_drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0C2440] border-b border-white/10 overflow-hidden z-40 relative px-4 py-4 space-y-2 card-shadow"
          >
            {navItems.map((item) => {
              const active = currentPage === item.target;
              return (
                <button
                  key={item.target}
                  id={`mobile_nav_btn_${item.target}`}
                  onClick={() => handleNavigate(item.target)}
                  className={`w-full text-left px-4 py-3 text-sm font-bold rounded-lg transition-colors outline-none cursor-pointer ${
                    active 
                      ? 'bg-[#C9A23F] text-[#0C2440]' 
                      : 'text-white/80 hover:bg-white/5 hover:text-[#C9A23F]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 flex gap-2">
              <button
                id="theme_toggle_mobile"
                onClick={toggleTheme}
                className="p-3 bg-white/5 border border-white/10 rounded-lg text-[#C9A23F] transition-all cursor-pointer outline-none flex items-center justify-center"
                title="Toggle visual style"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                id="mobile_header_briefing_cta"
                onClick={() => handleNavigate('aiconsult')}
                className="flex-grow text-center py-3 bg-[#C9A23F] hover:bg-[#b58f33] font-bold text-[#0C2440] text-xs rounded-lg transition-colors cursor-pointer"
              >
                Book Discovery
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main View Port / Section Transition Container */}
      <main id="main_content_portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: -15, y: -15 }}
            transition={{ duration: 0.3 }}
            className="font-sans"
          >
            {currentPage === 'home' && <HomeView onNavigate={handleNavigate} />}
            {currentPage === 'services' && <ServicesView />}
            {currentPage === 'proposal' && <ProposalView />}
            {currentPage === 'profile' && <ProfileView />}
            {currentPage === 'contact' && <ContactView />}
            {currentPage === 'aiconsult' && <AIConsultView />}
            {currentPage === 'leads' && <LeadsDashboardView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Primary Footer element (elegant corporate alignment) */}
      <footer id="primary_footer" className="bg-[#0A1828] text-[#F4F6F9] border-t border-white/10 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
          {/* Logo Alignment */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#C9A23F] flex items-center justify-center font-bold text-[#C9A23F] text-xs bg-white/5">
                PH
              </div>
              <div>
                <p className="font-bold text-base leading-tight tracking-tight text-white">PRIMEHUB <span className="font-light opacity-80">HR</span></p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#C9A23F] font-semibold">People. Performance. Partnership.</p>
              </div>
            </div>
            <p className="text-[#F4F6F9]/60 text-xs leading-relaxed max-w-sm">
              Nigeria-based workforce consulting and recruitment experts. Guiding scaleups and established companies through rapid staffing, SLA auditing, and state-level payroll compliance.
            </p>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#C9A23F] font-mono">Platform Directories</h4>
            <div className="flex flex-col gap-2 text-[#F4F6F9]/85 text-xs">
              <button onClick={() => handleNavigate('home')} className="hover:text-[#C9A23F] text-left cursor-pointer outline-none transition-colors justify-start">Home Portfolio</button>
              <button onClick={() => handleNavigate('services')} className="hover:text-[#C9A23F] text-left cursor-pointer outline-none transition-colors justify-start">Our Services</button>
              <button onClick={() => handleNavigate('proposal')} className="hover:text-[#C9A23F] text-left cursor-pointer outline-none transition-colors justify-start">12-Week Strategic Proposal</button>
              <button onClick={() => handleNavigate('aiconsult')} className="hover:text-[#C9A23F] text-left cursor-pointer outline-none transition-colors justify-start">AI Partner Consult</button>
              <button onClick={() => handleNavigate('contact')} className="hover:text-[#C9A23F] text-[#F4F6F9]/85 text-left cursor-pointer outline-none transition-colors justify-start">Contact Us / Request Proposal</button>
            </div>
          </div>

          {/* Core Contacts info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#C9A23F] font-mono font-sans">HQ contact details</h4>
            <div className="space-y-2.5 text-[#F4F6F9]/85 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A23F] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">19, Onanefe Schuler Street, GIG Estate, Addo, Ajah, Lagos, Nigeria.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A23F] flex-shrink-0" />
                <span>+234 (07036417393)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C9A23F] flex-shrink-0" />
                <span>primehubhr.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* copyright subbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F4F6F9]/40">
          <p>© {new Date().getFullYear()} PrimeHub Group. All legal operational rights reserved.</p>
          <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest text-[#C9A23F]/85">
            <span>SLA: 30-45 Days</span>
            <span>•</span>
            <span>LAGOS & ABUJA OFFICES</span>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}
