
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, Sparkles, Languages, ChevronRight, MicOff, Globe } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { useTranslation } from '../App';

const AISagePage: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Blessings, seeker. I am the Teerthlok Sage. I am now connected to the real-time knowledge of the web. Ask me about weather, road conditions, or temple timings. How may I serve you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useTranslation();

  // Speech Recognition (STT)
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
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  const scrollToBottom = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select best localized voice
    const voices = window.speechSynthesis.getVoices();
    const targetLang = lang === 'hi' ? 'hi-IN' : lang === 'sa' ? 'hi-IN' : 'en-IN';
    const voice = voices.find(v => v.lang.startsWith(targetLang)) || voices[0];
    
    if (voice) utterance.voice = voice;
    utterance.lang = targetLang;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await gemini.getChatResponse(userText, history);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response || 'I sense a disturbance in the digital ether. Please ask again.' }]);
    if (response) speakText(response);
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-stone-50 flex flex-col lg:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex w-80 bg-white border-r border-stone-200 p-8 flex-col gap-8">
        <div>
          <h2 className="text-xl font-spiritual font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Globe size={20} className="text-amber-500" /> Grounded Intelligence
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed font-medium">
            Connected to Google Search. The Sage provides live weather and travel updates for your pilgrimage.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Divine Inquiries</h3>
          {["Current weather in Kedarnath?", "Latest road status for Badrinath", "Evening Aarti timing today", "Who developed Teerthlok?"].map(q => (
            <button 
              key={q}
              onClick={() => { setInput(q); }}
              className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-amber-50 border border-transparent hover:border-amber-200 text-xs font-semibold text-stone-600 transition-all flex items-center justify-between group"
            >
              {q} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
        
        <div className="mt-auto p-4 bg-amber-50 rounded-2xl border border-amber-100">
           <div className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-1">Platform Status</div>
           <div className="text-xs text-amber-900 font-medium">Safe passage monitored by Govt. Uttarakhand.</div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-grow flex flex-col relative">
        <div 
          ref={chatRef}
          className="flex-grow overflow-y-auto p-6 md:p-12 space-y-8 no-scrollbar"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className={`max-w-2xl px-6 py-4 rounded-3xl text-sm md:text-base leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-amber-600 text-white shadow-xl shadow-amber-600/20 rounded-tr-none' 
                  : 'bg-white text-stone-800 shadow-sm border border-stone-100 rounded-tl-none'
              }`}>
                {m.text}
                {m.role === 'model' && (
                  <button 
                    onClick={() => speakText(m.text)}
                    className="ml-2 mt-2 p-1.5 hover:bg-stone-100 rounded-full transition-colors inline-flex"
                  >
                    <Volume2 size={16} className={isSpeaking ? 'text-amber-500 animate-pulse' : 'text-stone-400'} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-6 py-4 rounded-3xl border border-stone-100 flex gap-2">
                <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 md:p-10 bg-gradient-to-t from-stone-50 via-stone-50/90 to-transparent">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-2 flex items-center border border-stone-200 ring-4 ring-stone-100">
            <button 
              onClick={toggleListening}
              className={`p-4 transition-colors rounded-xl ${isListening ? 'bg-red-50 text-red-600 animate-pulse' : 'text-stone-400 hover:text-amber-600'}`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <input 
              type="text" 
              placeholder={isListening ? "Listening to your voice..." : "Ask your divine guide..."} 
              className="flex-grow bg-transparent border-none focus:ring-0 text-stone-800 font-medium px-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-amber-600 text-white p-4 rounded-xl shadow-lg hover:bg-amber-700 transition transform active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="text-center mt-6 flex flex-col items-center gap-2">
             <div className="flex items-center gap-4 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Languages size={10} /> Hindi • English • Sanskrit</span>
                <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
                <span>Real-time Grounding Active</span>
              </div>
              <div className="text-[10px] text-amber-600 font-bold uppercase tracking-widest opacity-60">
                {t.devBy}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISagePage;
