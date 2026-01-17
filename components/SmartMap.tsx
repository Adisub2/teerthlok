
import React, { useState } from 'react';
import { MapPin, Navigation, Wind, Users, Shield, HeartPulse, Search, Layers } from 'lucide-react';

const SmartMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState('crowd');

  return (
    <div className="h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Control Panel */}
      <div className="w-full md:w-96 bg-white shadow-xl z-10 flex flex-col">
        <div className="p-6 pt-24 border-b border-stone-100">
          <h1 className="text-2xl font-spiritual font-bold text-amber-900 mb-6">Smart Yatra Map</h1>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Destination or checkpoint..." 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-amber-500/20 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'crowd', label: 'Crowd Density', icon: Users },
              { id: 'weather', label: 'Weather Alerts', icon: Wind },
              { id: 'sos', label: 'Emergency Points', icon: HeartPulse },
              { id: 'route', label: 'Safe Routes', icon: Navigation },
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  activeLayer === layer.id 
                    ? 'bg-amber-50 border-amber-500 text-amber-600 shadow-sm' 
                    : 'bg-white border-stone-200 text-stone-500 hover:border-amber-300 hover:text-amber-600'
                }`}
              >
                <layer.icon size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{layer.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Active Checkpoints</h3>
          {[
            { name: 'Kedarnath Base', status: 'High Crowds', time: '2h wait', color: 'text-red-500' },
            { name: 'Sonprayag', status: 'Moderate', time: '30m wait', color: 'text-amber-500' },
            { name: 'Guptkashi', status: 'Clear', time: 'No wait', color: 'text-green-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-amber-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-800">{item.name}</div>
                  <div className={`text-[10px] font-bold uppercase ${item.color}`}>{item.status}</div>
                </div>
              </div>
              <div className="text-xs text-stone-500 font-medium">{item.time}</div>
            </div>
          ))}

          {/* Emergency SOS Button */}
          <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-red-600/20 hover:bg-red-700 transition transform active:scale-95">
            <Shield size={20} /> SEND SOS ALERT
          </button>
        </div>
      </div>

      {/* Map View */}
      <div className="flex-grow relative bg-stone-200 overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524662641025-5e650f78b9b7?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-50 grayscale"></div>
        
        {/* Interactive Visuals (Mock) */}
        <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 space-y-3">
          <button className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center text-stone-600 hover:text-amber-600"><Layers size={20} /></button>
          <button className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center text-stone-600 hover:text-amber-600"><Navigation size={20} /></button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-xl border border-stone-100 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-stone-600">HIGH DENSITY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-[10px] font-bold text-stone-600">SAFE PASSAGE</span>
          </div>
        </div>

        {/* Map Markers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
          <div className="relative">
            <div className="absolute -inset-4 bg-amber-500/20 rounded-full animate-ping"></div>
            <div className="bg-amber-600 p-2 rounded-full border-2 border-white shadow-2xl relative z-10">
              <MapPin size={24} className="text-white" />
            </div>
            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl p-4 w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <h4 className="font-bold text-sm mb-1">Kedarnath Summit</h4>
              <p className="text-[10px] text-stone-500 mb-2">Current Elevation: 3,583m</p>
              <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[85%]"></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[8px] text-stone-400">Crowd Level</span>
                <span className="text-[8px] font-bold text-amber-600">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartMap;
