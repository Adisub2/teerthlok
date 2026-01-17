
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Map as MapIcon, 
  Compass, 
  Eye, 
  Users, 
  Mic, 
  Menu, 
  X, 
  Globe,
  User,
  LogOut
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import AIAssistantPage from './components/AIAssistantPage';
import CommunitySpace from './components/CommunitySpace';
import DestinationDetails from './components/DestinationDetails';
import VRDarshan from './components/VRDarshan';
import SmartMap from './components/SmartMap';
import AuthModal from './components/AuthModal';
import { TRANSLATIONS } from './constants';

type Lang = 'en' | 'hi' | 'sa';
const LanguageContext = createContext<{lang: Lang, setLang: (l: Lang) => void, t: any}>({lang: 'en', setLang: () => {}, t: {}});
export const useTranslation = () => useContext(LanguageContext);

const Navbar = ({ onAuthClick, user, onLogout }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { name: t.home, path: '/', icon: HomeIcon },
    { name: t.explore, path: '/explore', icon: Compass },
    { name: t.assistant, path: '/assistant', icon: Mic },
    { name: t.community, path: '/community', icon: Users },
    { name: t.vr, path: '/vr', icon: Eye },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-2xl border-b border-stone-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-spiritual font-black tracking-tighter text-amber-900 group-hover:text-amber-600 transition-colors">TEERTHLOK</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold tracking-tight transition-all relative py-2 ${
                location.pathname === link.path ? 'text-amber-600' : 'text-stone-500 hover:text-amber-600'
              }`}
            >
              {link.name}
              {location.pathname === link.path && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-full animate-in fade-in zoom-in duration-300"></div>}
            </Link>
          ))}
          
          <div className="flex items-center gap-3">
            <div className="flex bg-stone-100 p-1 rounded-full border border-stone-200">
              {(['en', 'hi', 'sa'] as Lang[]).map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className={`w-8 h-8 rounded-full text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-600">Hi, {user.name}</span>
                <button onClick={onLogout} className="text-stone-400 hover:text-red-500 transition-colors"><LogOut size={18} /></button>
              </div>
            ) : (
              <button onClick={onAuthClick} className="bg-amber-600 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition transform active:scale-95">
                Join Now
              </button>
            )}
          </div>
        </div>

        <button className="lg:hidden text-stone-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center gap-3 font-bold text-stone-600 py-2">
              <link.icon size={20} className="text-amber-600" /> {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-stone-100 text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center">
            {t.devBy}
          </div>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const t = TRANSLATIONS[lang];

  const handleLogout = () => setUser(null);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <Router>
        <div className="min-h-screen flex flex-col smooth-scroll-fix bg-[#fafaf9]">
          <Navbar onAuthClick={() => setIsAuthOpen(true)} user={user} onLogout={handleLogout} />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore" element={<LandingPage showExplore />} />
              <Route path="/assistant" element={<AIAssistantPage />} />
              <Route path="/community" element={<CommunitySpace user={user} />} />
              <Route path="/destinations/:id" element={<DestinationDetails />} />
              <Route path="/vr" element={<VRDarshan />} />
              <Route path="/map" element={<SmartMap />} />
            </Routes>
          </main>
          <footer className="bg-white py-12 px-6 border-t border-stone-200 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-2xl font-spiritual font-black text-amber-900 mb-2">TEERTHLOK</span>
                <p className="text-stone-400 text-xs italic">A sacred journey to the abode of gods.</p>
              </div>
              <div className="text-stone-400 text-xs font-bold tracking-widest uppercase py-3 px-10 border border-stone-200 rounded-full bg-white shadow-sm hover:shadow-md transition cursor-default">
                {t.devBy}
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-stone-400 hover:text-amber-600 transition text-xs font-bold uppercase">Terms</a>
                <a href="#" className="text-stone-400 hover:text-amber-600 transition text-xs font-bold uppercase">Privacy</a>
              </div>
            </div>
          </footer>
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={setUser} />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
};

export default App;
