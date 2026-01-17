
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Users, ArrowRight, Play, Globe, ShieldCheck, Filter, Compass, LayoutGrid, Mic } from 'lucide-react';
import { DESTINATIONS, DISTRICTS } from '../constants';
import { useTranslation } from '../App';

const LandingPage: React.FC<{showExplore?: boolean}> = ({ showExplore = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  useEffect(() => {
    if (showExplore) {
      document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showExplore]);

  const filteredDestinations = DESTINATIONS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict ? d.region === selectedDistrict : true;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="relative smooth-scroll-fix">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-[#fafaf9]"></div>

        <div className="relative z-10 text-center max-w-5xl px-6 fade-up">
          <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] text-amber-400 uppercase">
            <Globe size={14} /> The Future of Spiritual Travel
          </div>
          <h1 className="text-6xl md:text-[7rem] font-spiritual font-black text-white mb-10 leading-[0.9] tracking-tighter drop-shadow-2xl">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-stone-200/80 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
            {t.heroSub}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/assistant')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl shadow-amber-600/40 hover:-translate-y-1 flex items-center justify-center gap-3 group"
            >
              Talk to Margdarshak <Mic size={22} className="group-hover:rotate-12 transition-transform" />
            </button>
            <button 
              onClick={() => {
                document.getElementById('district-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-[2rem] font-black text-lg transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 hover:bg-white/20"
            >
              Explore Districts <LayoutGrid size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Presence */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-12 border border-stone-100">
          {[
            { label: 'Pilgrims Active', value: '1.2M+', icon: Users, color: 'text-blue-500' },
            { label: 'Sacred Sites', value: '100+', icon: MapPin, color: 'text-amber-500' },
            { label: 'Verified Safety', value: '100%', icon: ShieldCheck, color: 'text-green-500' },
            { label: 'Voice AI Status', value: 'Live', icon: Globe, color: 'text-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className={`${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div className="text-4xl font-black text-stone-900 mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* District Grid */}
      <section id="district-grid" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <div className="inline-block p-4 bg-amber-50 rounded-3xl text-amber-600 mb-4 shadow-inner">
            <Compass size={32} />
          </div>
          <h2 className="text-5xl font-spiritual font-black text-amber-900 mb-6">{t.districts}</h2>
          <p className="text-stone-500 max-w-xl mx-auto font-medium">Click on any district to uncover its spiritual landscape and hidden sacred treasures.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <button 
            onClick={() => setSelectedDistrict(null)}
            className={`px-6 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all border ${!selectedDistrict ? 'bg-amber-600 border-amber-600 text-white shadow-2xl' : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-amber-400 hover:text-amber-600 shadow-sm'}`}
          >
            All Uttarakhand
          </button>
          {DISTRICTS.map(dist => (
            <button 
              key={dist}
              onClick={() => {
                setSelectedDistrict(dist);
                document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-6 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all border ${selectedDistrict === dist ? 'bg-amber-600 border-amber-600 text-white shadow-2xl' : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-amber-400 hover:text-amber-600 shadow-sm'}`}
            >
              {dist}
            </button>
          ))}
        </div>
      </section>

      {/* Explore Grid */}
      <section id="explore-section" className="py-32 px-6 max-w-7xl mx-auto min-h-[600px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
              <div className="w-8 h-0.5 bg-amber-600"></div> {selectedDistrict || 'The State of Gods'}
            </div>
            <h2 className="text-5xl md:text-6xl font-spiritual font-black text-amber-900 leading-[0.9] tracking-tighter">
              {selectedDistrict ? `Explore ${selectedDistrict}` : t.shrines}
            </h2>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search temple, shrine, or peak..." 
              className="w-full bg-white border border-stone-200 rounded-[2rem] py-5 pl-16 pr-8 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 transition-all text-sm font-medium shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredDestinations.map((dest) => (
            <div 
              key={dest.id}
              className="group bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-3xl transition-all duration-700 border border-stone-100 cursor-pointer relative"
              onClick={() => navigate(`/destinations/${dest.id}`)}
            >
              <div className="h-[28rem] overflow-hidden relative">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-8 left-8 flex flex-col gap-2">
                   <span className="bg-white/95 backdrop-blur-xl px-5 py-2 rounded-full text-[10px] font-black text-amber-600 uppercase tracking-widest shadow-2xl">
                    {dest.category}
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                   <div className="flex items-center gap-2 mb-2">
                     <Star size={14} fill="#fbbf24" className="text-amber-400" />
                     <span className="text-xs font-black tracking-widest">{dest.rating}</span>
                   </div>
                   <h3 className="text-3xl font-spiritual font-black tracking-tighter group-hover:text-amber-400 transition-colors">{dest.name}</h3>
                </div>
              </div>
              <div className="p-10">
                <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed mb-8 font-medium">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between pt-8 border-t border-stone-50">
                   <div className="flex items-center gap-3 text-stone-400 font-black text-[10px] uppercase tracking-widest">
                    <MapPin size={16} className="text-amber-500" /> {dest.region}
                  </div>
                  <div className="w-14 h-14 rounded-[1.5rem] bg-stone-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-inner group-hover:shadow-xl group-hover:shadow-amber-600/30">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredDestinations.length === 0 && (
            <div className="col-span-full py-32 text-center bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200">
              <div className="text-amber-600/20 mb-6 flex justify-center"><Search size={80} /></div>
              <p className="text-stone-400 font-spiritual text-2xl font-black">No sacred sites found matching your search.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedDistrict(null); }} className="mt-6 text-amber-600 font-black uppercase tracking-widest text-xs hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Community Teaser */}
      <section className="bg-stone-900 py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/mandala-ornament.png')] scale-[3]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-24 h-24 bg-amber-600 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black mx-auto mb-12 shadow-3xl shadow-amber-600/40">T</div>
          <h2 className="text-5xl md:text-7xl font-spiritual font-black text-white mb-8 tracking-tighter">Become Part of the Legend</h2>
          <p className="text-stone-400 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">Join the world's most advanced spiritual digital ecosystem. Share your story, walk with Margdarshak.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => navigate('/community')}
              className="bg-white text-stone-900 px-14 py-6 rounded-[2rem] font-black text-lg hover:bg-amber-50 transition shadow-2xl shadow-white/5 active:scale-95"
            >
              Enter Satsang
            </button>
            <button 
              onClick={() => navigate('/vr')}
              className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-14 py-6 rounded-[2rem] font-black text-lg hover:bg-white/10 transition active:scale-95"
            >
              Virtual Darshan
            </button>
          </div>
          <div className="mt-32 text-stone-500 text-xs tracking-[0.5em] font-black uppercase py-4 px-12 border border-stone-800 rounded-full inline-block">
            {t.devBy}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
