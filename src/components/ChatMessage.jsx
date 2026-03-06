import React from 'react';

const ChatMessage = ({ message, isUser, isTyping }) => {
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
          <p className="text-sm md:text-base leading-relaxed">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
