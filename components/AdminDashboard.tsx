
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  IndianRupee, 
  BarChart2, 
  PieChart, 
  Map as MapIcon,
  Download,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', count: 4000 },
  { name: 'Tue', count: 3000 },
  { name: 'Wed', count: 2000 },
  { name: 'Thu', count: 2780 },
  { name: 'Fri', count: 1890 },
  { name: 'Sat', count: 2390 },
  { name: 'Sun', count: 3490 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 pt-20 px-6">
      <div className="max-w-7xl mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Government Portal</h1>
            <p className="text-stone-500 font-medium">Monitoring spiritual tourism across Uttarakhand region.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-stone-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-stone-50 transition">
              <Calendar size={18} /> Date Range
            </button>
            <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl shadow-amber-600/20 hover:bg-amber-700 transition">
              <Download size={18} /> Export Reports
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Footfall', value: '1.2M', trend: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Weekly Revenue', value: '₹4.2 Cr', trend: '+5.4%', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Emergency Alerts', value: '12', trend: '-20%', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'AI Resolution Rate', value: '94.2%', trend: '+2.1%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">{stat.value}</h3>
                <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend} from last month
                </span>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-stone-800 flex items-center gap-2">
                <BarChart2 size={20} className="text-amber-600" /> Daily Footfall Trends
              </h3>
              <select className="bg-stone-50 border-none text-xs font-bold text-stone-500 rounded-lg">
                <option>Kedarnath Circuit</option>
                <option>Badrinath Circuit</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="count" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-amber-900 p-8 rounded-3xl shadow-xl shadow-amber-900/20 text-white">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <PieChart size={20} /> Resource Allocation
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Medical Staff', value: 85, color: 'bg-blue-400' },
                { label: 'Security Personnel', value: 92, color: 'bg-amber-400' },
                { label: 'Transportation', value: 64, color: 'bg-green-400' },
                { label: 'Sanitation', value: 78, color: 'bg-purple-400' },
              ].map((res, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-amber-200 font-medium">{res.label}</span>
                    <span className="font-bold">{res.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${res.color}`} style={{ width: `${res.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 bg-white text-amber-900 py-3 rounded-xl font-bold text-sm hover:bg-amber-50 transition">
              Optimize Resources
            </button>
          </div>
        </div>

        {/* Real-time Incident Feed */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-8 border-b border-stone-50">
            <h3 className="font-bold text-stone-800">Real-time Emergency Feed</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-400 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-8 py-4">Incident</th>
                  <th className="px-8 py-4">Location</th>
                  <th className="px-8 py-4">Priority</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-stone-50">
                {[
                  { type: 'Medical Emergency', loc: 'Rudraprayag Sector 4', priority: 'Critical', status: 'Dispatched' },
                  { type: 'Crowd Anomaly', loc: 'Kedarnath Base', priority: 'High', status: 'Monitoring' },
                  { type: 'Weather Warning', loc: 'Gangotri Route', priority: 'Medium', status: 'Active' },
                  { type: 'Route Blockage', loc: 'NH-58 near Chamoli', priority: 'High', status: 'Clearing' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50/50 transition">
                    <td className="px-8 py-5 font-bold text-stone-700">{row.type}</td>
                    <td className="px-8 py-5 text-stone-500">{row.loc}</td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        row.priority === 'Critical' ? 'bg-red-100 text-red-600' : 
                        row.priority === 'High' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-stone-500 font-medium">{row.status}</td>
                    <td className="px-8 py-5">
                      <button className="text-amber-600 font-bold hover:underline">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
