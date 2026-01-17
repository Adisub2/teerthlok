
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../constants';
import { 
  MapPin, 
  Clock, 
  Users, 
  ShieldCheck, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Heart,
  BookOpen,
  Info,
  Navigation
} from 'lucide-react';

const DestinationDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dest = DESTINATIONS.find(d => d.id === id);
  const [activeTab, setActiveTab] = useState('significance');

  if (!dest) return <div className="pt-24 text-center">Destination not found.</div>;

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={dest.image} 
          alt={dest.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-black/20 to-transparent"></div>
        <div className="absolute top-24 left-6 right-6 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition">
              <Share2 size={20} />
            </button>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              {dest.category}
            </span>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold">
              <MapPin size={12} /> {dest.region}
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-spiritual font-bold text-white mb-2 drop-shadow-xl">
            {dest.name}
          </h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex border-b border-stone-200 mb-8 overflow-x-auto no-scrollbar">
            {[
              { id: 'significance', label: 'Significance', icon: Info },
              { id: 'mythology', label: 'Mythology', icon: BookOpen },
              { id: 'rituals', label: 'Rituals', icon: Calendar },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-amber-600 text-amber-600' 
                    : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 min-h-[400px]">
            {activeTab === 'significance' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-spiritual font-bold text-amber-900 mb-6">Spiritual Essence</h2>
                <p className="text-stone-600 leading-relaxed text-lg mb-8">{dest.spiritualSignificance}</p>
                <h3 className="text-lg font-bold text-stone-800 mb-4">General Overview</h3>
                <p className="text-stone-600 leading-relaxed mb-6">{dest.description}</p>
              </div>
            )}
            {activeTab === 'mythology' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-spiritual font-bold text-amber-900 mb-6">Divine History</h2>
                <p className="text-stone-600 leading-relaxed text-lg">{dest.mythology}</p>
              </div>
            )}
            {activeTab === 'rituals' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-spiritual font-bold text-amber-900 mb-6">Daily Rituals & Practices</h2>
                <ul className="space-y-4">
                  {dest.rituals.map((r, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-bold text-amber-900">{r}</div>
                        <p className="text-sm text-amber-700/70">Performed daily with traditional Vedic chants.</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-amber-900 text-white p-8 rounded-3xl shadow-xl shadow-amber-900/20">
            <h3 className="text-xl font-spiritual font-bold mb-6">Yatra Tracker</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-stone-300">
                  <Users size={18} /> <span>Crowd Density</span>
                </div>
                <span className="font-bold text-amber-400">{dest.crowdLevel}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${dest.crowdLevel}%` }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-stone-300">
                  <Clock size={18} /> <span>Best Visiting Time</span>
                </div>
                <span className="text-xs font-bold text-white uppercase text-right">{dest.bestTime}</span>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button 
                  onClick={() => navigate('/map')}
                  className="w-full bg-white text-amber-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-50 transition"
                >
                  <Navigation size={18} /> Open Live Map
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-green-500" /> Pilgrim Safety
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-6">
              This destination is verified by Uttarakhand Tourism Board. Live GPS tracking and emergency SOS support available.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Medical Center nearby
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Oxygen Support available
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div> Elderly-friendly route
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
