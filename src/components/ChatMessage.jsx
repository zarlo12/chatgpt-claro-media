import React from 'react';

/** Mini ecualizador que acompaña al mensaje mientras se está leyendo en voz alta. */
const Ecualizador = () => (
  <div className="flex items-end gap-[3px] h-4 mb-2" aria-hidden="true">
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        className="w-[3px] h-full rounded-full bg-claro-red origin-bottom animate-eq motion-reduce:animate-none"
        style={{ animationDelay: `${i * 120}ms` }}
      />
    ))}
  </div>
);

const ChatMessage = ({ message, isUser, isTyping, isSpeaking }) => {
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
        className={`max-w-[80%] rounded-2xl px-6 py-4 transition-shadow duration-500 ${
          isUser
            ? 'bg-claro-red text-white'
            : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
        } ${isSpeaking ? 'border-claro-red/70 shadow-[0_0_28px_rgba(227,6,19,0.3)]' : ''}`}
      >
        {isSpeaking && <Ecualizador />}
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
