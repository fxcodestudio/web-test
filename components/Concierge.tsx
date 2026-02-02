import React, { useState, useRef, useEffect } from 'react';
import { askConcierge } from '../services/aiService';
import { ChatMessage } from '../types';

export const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '반갑습니다. 이상한 스테이의 컨시어지입니다. 무엇을 도와드릴까요?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await askConcierge(userText);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-strange-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Open Concierge"
      >
        {isOpen ? (
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 9-6 6-6-6"/></svg>
        ) : (
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white border border-gray-200 shadow-2xl z-40 flex flex-col h-[400px] animate-[slideUp_0.3s_ease-out]">
          <div className="p-4 border-b bg-strange-black text-white flex justify-between items-center">
            <h3 className="font-bold tracking-wider text-sm">STRANGE CONCIERGE</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-strange-black text-white' 
                      : 'bg-white border border-gray-200 text-strange-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white border border-gray-200 p-3 text-sm animate-pulse text-gray-400">
                   Typing...
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 text-sm outline-none px-2"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="text-xs font-bold uppercase hover:text-strange-accent disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};