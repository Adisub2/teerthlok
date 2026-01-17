
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, Sparkles, Languages, ChevronRight, MicOff, Globe, Loader2, User, Bot } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { useTranslation } from '../App';

const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Namaste seeker. I am your Margdarshak. I have real-time access to Uttarakhand's spiritual routes, weather conditions, and sacred lore. Speak your heart—I am here to guide you. How can I serve your pilgrimage today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useTranslation();

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };
      
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const targetLang = lang === 'hi' ? 'hi-IN' : lang === 'sa' ? 'hi-IN' : 'en-IN';
    
    // Try to find a human-like voice for the locale
    const voice = voices.find(v => v.lang === targetLang && (v.name.includes('Google') || v.name.includes('Premium'))) || voices.find(v => v.lang.startsWith(targetLang)) || voices[0];
    
    if (voice) utterance.voice = voice;
    utterance.lang = targetLang;
    utterance.rate = 0.95;
    utterance.pitch = 0.95; // Slightly deeper, calmer tone
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (manualInput?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim()) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsTyping(true);

    const history = messages.slice(-10).map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await gemini.getChatResponse(textToSend, history);
    
    setIsTyping(false);
    if (response) {
      setMessages(prev => [...prev, { role: 'model', text: response }]);
      speakText(response);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="h-[calc(100vh-64px)] bg-[#fafaf9] flex flex-col lg:flex-row overflow-hidden relative">
      {/* Immersive Sidebar */}
      <div className="w-full lg:w-1/3 bg-amber-900 flex flex-col items-center justify-center p-12 text-center text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/mandala-ornament.png')] scale-150"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
         
         <div className={`w-40 h-40 rounded-full border-4 ${isListening ? 'border-red-500 scale-110 shadow-[0_0_80px_rgba(239,68,68,0.5)]' : 'border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.2)]'} flex items-center justify-center mb-10 transition-all duration-700 relative z-10 group cursor-pointer`} onClick={toggleListening}>
            {isListening ? (
              <div className="flex items-center gap-1">
                {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: `${i*0.1}s` }}></div>)}
              </div>
            ) : (isTyping ? <Loader2 className="animate-spin text-amber-400" size={56} /> : <div className="text-amber-400 flex flex-col items-center"><Mic size={48} className="group-hover:scale-110 transition-transform" /><span className="text-[10px] font-black uppercase tracking-widest mt-2">Speak</span></div>)}
         </div>
         
         <div className="relative z-10">
           <h2 className="text-4xl font-spiritual font-black mb-4 tracking-tighter text-amber-100">MARGDARSHAK</h2>
           <p className="text-amber-200/80 text-sm font-medium leading-relaxed max-w-xs italic mx-auto">
             "Your human voice in the mountains. I listen, I learn, I lead."
           </p>
         </div>

         <div className="mt-12 flex flex-col gap-3 w-full max-w-xs relative z-10">
            <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Live Insights</h4>
            {[
              "Is Kedarnath route open today?", 
              "Best time for evening Aarti in Haridwar?", 
              "Who built Teerthlok?",
              "Tell me a story about Tungnath"
            ].map(q => (
              <button 
                key={q}
                onClick={() => handleSend(q)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all text-left flex justify-between items-center group"
              >
                {q} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
         </div>
         
         <div className="mt-auto pt-10 text-[10px] text-amber-600 font-bold uppercase tracking-[0.2em] relative z-10">
           {t.devBy}
         </div>
      </div>

      {/* Margdarshak Interface */}
      <div className="flex-grow flex flex-col relative bg-stone-50 border-l border-stone-200 shadow-inner">
        <div ref={chatRef} className="flex-grow overflow-y-auto p-6 md:p-12 space-y-8 no-scrollbar pb-32">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in slide-in-from-bottom-4 duration-500`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${m.role === 'user' ? 'bg-stone-200 text-stone-600' : 'bg-amber-600 text-white'}`}>
                {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-[85%] px-8 py-5 rounded-[2rem] shadow-sm text-sm md:text-base leading-relaxed relative ${
                m.role === 'user' 
                  ? 'bg-amber-600 text-white rounded-tr-none' 
                  : 'bg-white border border-stone-100 text-stone-800 rounded-tl-none shadow-stone-200/50'
              }`}>
                {m.text}
                {m.role === 'model' && (
                  <button onClick={() => speakText(m.text)} className="absolute -bottom-2 -right-2 p-2 rounded-full bg-white shadow-lg border border-stone-100 hover:bg-stone-50 transition transform hover:scale-110">
                    <Volume2 size={16} className={isSpeaking ? 'text-amber-600 animate-pulse' : 'text-stone-400'} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md">
                 <Bot size={20} />
               </div>
               <div className="bg-white px-6 py-4 rounded-[1.5rem] rounded-tl-none border border-stone-100 flex gap-1.5 shadow-sm shadow-stone-200/50">
                 <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
             </div>
          )}
        </div>

        {/* Input Dock */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent">
          <div className="max-w-4xl mx-auto flex items-center gap-4 bg-white rounded-[2.5rem] shadow-2xl p-2.5 border border-stone-200 ring-8 ring-stone-100/50">
             <button 
               onClick={toggleListening}
               className={`p-5 rounded-full transition-all flex items-center justify-center ${isListening ? 'bg-red-500 text-white shadow-xl scale-110' : 'text-stone-400 hover:text-amber-600 bg-stone-50'}`}
             >
               {isListening ? <MicOff size={24} /> : <Mic size={24} />}
             </button>
             <input 
               type="text" 
               placeholder={isListening ? "I'm listening to you..." : "Talk to your human guide..."}
               className="flex-grow bg-transparent border-none focus:ring-0 font-medium text-stone-800 px-4 text-lg"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             />
             <button 
               onClick={() => handleSend()}
               className="bg-amber-600 text-white p-5 rounded-full shadow-2xl hover:bg-amber-700 transition transform active:scale-90"
             >
               <Send size={24} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
