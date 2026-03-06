import React from 'react';

const ChatMessage = ({ message, isUser, isTyping }) => {
  // Formatear mensaje con saltos de línea
  const formatMessage = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    return lines.map((line, index) => (
      <p key={index} className="text-sm md:text-base leading-relaxed mb-2 last:mb-0">
        {line}
      </p>
    ));
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-[80%] rounded-2xl px-6 py-4 ${
          isUser
            ? 'bg-claro-red text-white'
            : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
        }`}
      >
        {isTyping ? (
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : (
          <div>{formatMessage(message)}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
