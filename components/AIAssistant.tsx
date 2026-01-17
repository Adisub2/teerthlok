
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, History, Compass, ShieldAlert } from 'lucide-react';
import { gemini } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Namaste! I am Teerthlok AI, your spiritual guide. How may I help your soul today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, text: messageText }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    const history = newMessages.slice(-6).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await gemini.getChatResponse(messageText, history);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that." }]);
  };

  const toggleVoice = () => {
    if (!isListening) {
      // Mock Speech Recognition
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputValue("Tell me about Kedarnath's evening rituals");
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating Toggle */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-amber-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 animate-bounce"
        >
          <div className="relative">
            <MessageCircle size={30} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-amber-600"></span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[90vw] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-stone-200 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-amber-600 p-4 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Compass className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Teerthlok Guide</h3>
                <p className="text-[10px] text-amber-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online & Multilingual
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition">
              <X size={20} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 bg-stone-50 border-b border-stone-100 flex gap-2 overflow-x-auto no-scrollbar">
            {['Kedarnath Plan', 'Weather Update', 'Emergency SOS', 'Crowd Info'].map(action => (
              <button 
                key={action}
                onClick={() => handleSend(action)}
                className="whitespace-nowrap px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-600 hover:border-amber-400 hover:text-amber-600 transition"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 space-y-4 bg-stone-50/50"
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-amber-600 text-white shadow-md rounded-tr-none' 
                    : 'bg-white text-stone-800 shadow-sm border border-stone-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 px-4 py-2 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100">
            <div className="relative flex items-center gap-2">
              <button 
                onClick={toggleVoice}
                className={`p-2 rounded-xl transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-stone-100 text-stone-400 hover:text-amber-600'}`}
              >
                {isListening ? <Mic size={20} /> : <Mic size={20} />}
              </button>
              <input 
                type="text" 
                placeholder="Ask your guide anything..." 
                className="flex-grow bg-stone-100 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="p-2.5 bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-600/20 hover:bg-amber-700 disabled:opacity-50 transition"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-stone-400 mt-2">
              AI can make mistakes. Verify important travel safety info.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
