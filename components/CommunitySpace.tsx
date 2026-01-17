
import React, { useState } from 'react';
import { Camera, Heart, MessageCircle, Share2, Plus, Image as ImageIcon, Send } from 'lucide-react';
import { useTranslation } from '../App';

const MOCK_POSTS = [
  {
    id: 1,
    user: "Meera Dev",
    avatar: "https://i.pravatar.cc/150?u=meera",
    image: "https://images.unsplash.com/photo-1594911776915-d3600f983636?auto=format&fit=crop&q=80&w=800",
    location: "Valley of Flowers",
    text: "The silence here is the loudest prayer. Had a soul-stirring morning trek.",
    likes: 245,
    comments: 12
  },
  {
    id: 2,
    user: "Rahul Singh",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
    location: "Rishikesh",
    text: "Ganga Aarti was mesmerizing. The energy is indescribable.",
    likes: 890,
    comments: 54
  },
  {
    id: 3,
    user: "Aditya S.",
    avatar: "https://i.pravatar.cc/150?u=aditya",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
    location: "Kedarnath",
    text: "Jai Bhole Nath! The temple looks divine in this light.",
    likes: 1204,
    comments: 89
  }
];

const CommunitySpace: React.FC<{ user: any }> = ({ user }) => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [isUploading, setIsUploading] = useState(false);
  const [newPost, setNewPost] = useState({ text: '', location: '' });

  const handlePost = () => {
    if (!user) { alert("Please join Teerthlok to post."); return; }
    const postObj = {
      id: posts.length + 1,
      user: user.name,
      avatar: "https://i.pravatar.cc/150?u=" + user.name,
      image: "https://images.unsplash.com/photo-1621255152959-1e3550e5033c?auto=format&fit=crop&q=80&w=800",
      location: newPost.location || "Uttarakhand",
      text: newPost.text,
      likes: 0,
      comments: 0
    };
    setPosts([postObj, ...posts]);
    setIsUploading(false);
    setNewPost({ text: '', location: '' });
  };

  return (
    <div className="min-h-screen bg-stone-100 pb-20 pt-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-spiritual font-black text-amber-900">Satsang</h1>
            <p className="text-stone-500 font-medium italic">Spiritual community hub.</p>
          </div>
          <button 
            onClick={() => setIsUploading(true)}
            className="bg-amber-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition active:scale-95"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Upload Interface */}
        {isUploading && (
           <div className="bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 mb-10 animate-in zoom-in-95 duration-200">
              <h3 className="font-bold text-stone-800 mb-4">Share a Sacred Moment</h3>
              <textarea 
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm mb-4 focus:ring-2 focus:ring-amber-500/20"
                placeholder="Write your experience..."
                rows={4}
                value={newPost.text}
                onChange={(e) => setNewPost({...newPost, text: e.target.value})}
              />
              <div className="flex gap-4 mb-6">
                <input 
                   type="text" 
                   className="flex-grow bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm"
                   placeholder="Location (e.g. Haridwar)"
                   value={newPost.location}
                   onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                />
                <button className="p-3 bg-stone-100 rounded-xl text-stone-400 hover:text-amber-600"><ImageIcon size={20} /></button>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsUploading(false)} className="px-6 py-2 text-stone-400 font-bold">Cancel</button>
                <button onClick={handlePost} className="bg-amber-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg">Post</button>
              </div>
           </div>
        )}

        {/* Feed */}
        <div className="space-y-10">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-[2.5rem] shadow-sm border border-stone-200 overflow-hidden fade-up hover:shadow-xl transition-shadow duration-500">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={post.avatar} className="w-11 h-11 rounded-full border border-stone-100 shadow-inner" />
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm leading-none mb-1">{post.user}</h3>
                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">{post.location}</p>
                  </div>
                </div>
                <button className="text-stone-300 hover:text-amber-600 transition-colors"><Share2 size={18} /></button>
              </div>
              
              <div className="aspect-[4/5] bg-stone-50 overflow-hidden">
                <img src={post.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" loading="lazy" />
              </div>

              <div className="p-8">
                <p className="text-stone-700 leading-relaxed font-medium mb-8 text-sm">{post.text}</p>
                <div className="flex items-center gap-8 pt-6 border-t border-stone-50">
                  <button className="flex items-center gap-2 text-stone-400 hover:text-red-500 transition-colors">
                    <Heart size={20} /> <span className="text-xs font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-stone-400 hover:text-amber-600 transition-colors">
                    <MessageCircle size={20} /> <span className="text-xs font-black">{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center text-stone-300 font-spiritual text-xs font-bold uppercase tracking-[0.2em]">
          {t.devBy}
        </div>
      </div>
    </div>
  );
};

export default CommunitySpace;
