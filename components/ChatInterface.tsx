
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import GlassCard from './GlassCard';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to ORION Intelligence. I am your personal concierge for the 2026 International Championship. How may I assist your operations today, Delegate Yi?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.models.generateContentStream({
        model: 'gemini-3-pro-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are the ORION Intelligence System (OIS), a sophisticated AI concierge for the 2026 International Sports Championship. You assist VIP delegates like Edward Yi. Your tone is professional, efficient, and slightly cinematic. Knowledge: You are in Pyongyang for the championships. Edward is a VIP Delegate. The Pyongyang Cup is tonight at 18:00. Be concise.",
          temperature: 0.7,
        },
      });

      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of chat) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Protocol Error: I'm experiencing a temporary link disruption with the core servers. Please try again shortly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-24 md:pb-32 sm:px-0 pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" 
        onClick={onClose}
      />
      
      <div className={`w-full max-w-xl h-[70vh] flex flex-col pointer-events-auto transition-transform duration-500 transform translate-y-0 relative`}>
        <GlassCard isDarkMode={isDarkMode} className="flex-1 flex flex-col p-0 border-amber-500/20 overflow-hidden shadow-2xl rounded-t-[2.5rem] rounded-b-none border-b-0">
          {/* Header */}
          <div className={`p-5 border-b ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50/50'} flex justify-between items-center`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <div>
                <h3 className={`text-sm font-black tracking-widest uppercase italic ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>ORION Intelligence</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">OIS-V3 Active</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-500 active:text-amber-500 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-black rounded-tr-none' 
                    : (isDarkMode ? 'bg-white/[0.03] text-zinc-300 border border-white/5 rounded-tl-none' : 'bg-zinc-100 text-zinc-800 rounded-tl-none')
                }`}>
                  {msg.text || (msg.role === 'model' && <div className="flex gap-1 py-1"><div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce"></div><div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></div><div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div></div>)}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className={`p-4 ${isDarkMode ? 'bg-black/40 border-t border-white/5' : 'bg-white border-t border-zinc-100'}`}>
            <div className="flex gap-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Direct command link..."
                className={`flex-1 bg-transparent border-none focus:ring-0 text-sm ${isDarkMode ? 'text-white placeholder-zinc-700' : 'text-zinc-900 placeholder-zinc-300'} font-bold uppercase tracking-widest`}
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${input.trim() ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : (isDarkMode ? 'bg-white/5 text-zinc-700' : 'bg-zinc-100 text-zinc-300')}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ChatInterface;
