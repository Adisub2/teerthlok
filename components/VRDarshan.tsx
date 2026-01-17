
import React, { useState } from 'react';
import { Eye, Headset, Volume2, Maximize, PlayCircle, Info } from 'lucide-react';
import { useTranslation } from '../App';

const VRDarshan: React.FC = () => {
  const [activeTemple, setActiveTemple] = useState('Kedarnath');
  const { t } = useTranslation();

  const temples = [
    { name: 'Kedarnath', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=2000' },
    { name: 'Badrinath', img: 'https://images.unsplash.com/photo-1634710156942-df2167d4e13d?auto=format&fit=crop&q=80&w=2000' },
    { name: 'Har Ki Pauri', img: 'https://images.unsplash.com/photo-1590050752117-23a9d7f668ad?auto=format&fit=crop&q=80&w=2000' },
    { name: 'Gangotri', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=2000' },
  ];

  return (
    <div className="min-h-screen bg-stone-900 pt-20 flex flex-col overflow-hidden">
      <div className="px-10 py-10 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5">
        <div>
          <h1 className="text-5xl font-spiritual font-black text-amber-500 mb-2">Darshan 360</h1>
          <p className="text-stone-400 font-medium italic">Experience divine presence from anywhere.</p>
        </div>
        <button className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/20 text-white font-bold hover:bg-white/20 transition">
          <Headset size={20} /> Launch VR Mode
        </button>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row p-6 gap-6">
        <div className="flex-grow relative bg-black rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10">
          <img 
            src={temples.find(t => t.name === activeTemple)?.img} 
            alt="360 View" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[10s] ease-linear"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5">
              <button className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(217,119,6,0.5)]">
                <PlayCircle size={32} />
              </button>
              <div>
                <h2 className="text-white font-spiritual font-black text-3xl">{activeTemple}</h2>
                <div className="flex items-center gap-2 text-amber-500 font-bold uppercase text-[10px] tracking-widest mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> Live Atmosphere Stream
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition"><Volume2 size={24} /></button>
              <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition"><Maximize size={24} /></button>
            </div>
          </div>
          
          {/* Hotspot Indicators */}
          <div className="absolute top-1/2 left-1/3 animate-bounce">
             <div className="w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-lg relative cursor-pointer">
                <div className="absolute -inset-4 bg-amber-500/20 rounded-full animate-ping"></div>
             </div>
          </div>
        </div>

        <div className="w-full lg:w-96 flex flex-col gap-4 overflow-y-auto no-scrollbar max-h-[70vh] lg:max-h-full">
           <h3 className="text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border-l-2 border-amber-500 mb-2">Sacred Hotspots</h3>
           {temples.map((t) => (
            <button
              key={t.name}
              onClick={() => setActiveTemple(t.name)}
              className={`p-6 rounded-[2rem] flex items-center gap-5 transition-all text-left group ${
                activeTemple === t.name 
                  ? 'bg-amber-600 text-white shadow-[0_20px_40px_rgba(217,119,6,0.3)] ring-2 ring-amber-400/50' 
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              <img src={t.img} className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:rotate-3 transition-transform" />
              <div>
                <span className="font-bold text-lg block">{t.name}</span>
                <span className="text-[10px] uppercase font-black opacity-60 tracking-tighter">Enter Immersion</span>
              </div>
            </button>
          ))}
          
          <div className="mt-auto bg-amber-500/10 p-6 rounded-[2rem] border border-amber-500/20">
             <div className="flex items-center gap-3 text-amber-500 mb-4">
               <Info size={18} />
               <h4 className="font-bold text-sm uppercase tracking-widest">Ritual Audio</h4>
             </div>
             <p className="text-xs text-stone-400 leading-relaxed italic">
               Traditional Vedic chants recorded live at {activeTemple} will play automatically.
             </p>
          </div>
        </div>
      </div>
      <div className="p-4 text-center text-stone-600 text-[10px] font-bold uppercase tracking-widest">
        {t.devBy}
      </div>
    </div>
  );
};

export default VRDarshan;
